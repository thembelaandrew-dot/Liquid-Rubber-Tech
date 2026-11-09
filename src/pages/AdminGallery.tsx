import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Layers, 
  Settings, 
  Search, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  ExternalLink, 
  AlertCircle, 
  BarChart3, 
  PieChart, 
  Activity, 
  Check, 
  ChevronRight, 
  RefreshCw, 
  Grid, 
  List, 
  ShieldCheck, 
  Menu,
  Image as ImageIcon,
  Calendar,
  Globe,
  Lock,
  Save,
  ArrowLeft,
  KeyRound,
  Send
} from 'lucide-react';
import SEO from '../components/SEO';
import { galleryData, GalleryProject } from '../data';
import { 
  ALLOWED_CATEGORIES, 
  AllowedCategory, 
  AUTHORIZED_ADMIN_UUID,
  isAuthorizedAdmin,
  getSupabaseConfig, 
  saveManualSupabaseConfig, 
  clearManualSupabaseConfig, 
  isSupabaseConfigured,
  createAndSaveProject,
  updateProjectPublishStatus,
  fetchPublishedProjects,
  uploadImageFile,
  deleteImageFile,
  getSupabase,
  signInAdmin,
  signOutAdmin,
  sendPasswordResetEmail,
  testSupabaseConnection,
  ConnectionDiagnostics,
  deleteProjectFromSupabase,
  replaceProjectImage
} from '../lib/supabase';

// Rich Admin Project Data Interface
export interface AdminProject {
  id: string;
  title?: string | null;
  category: AllowedCategory;
  display_type: 'single' | 'sequence';
  is_published: boolean;
  created_at: string;
  views: number;
  images: {
    id: string;
    stage: 'Before' | 'During' | 'After' | 'Combined' | 'Final';
    url: string;
    storage_path: string;
  }[];
}

// Convert existing static gallery projects to rich dashboard demonstration data
function initializeDemoProjects(): AdminProject[] {
  const dates = [
    '2026-11-04', '2026-11-02', '2026-10-28', '2026-10-24',
    '2026-10-18', '2026-10-12', '2026-10-05', '2026-09-29',
    '2026-09-22', '2026-09-15', '2026-09-08', '2026-09-01',
    '2026-08-25', '2026-08-18', '2026-08-10', '2026-08-03'
  ];

  return galleryData.map((p, idx) => {
    let cat: AllowedCategory = 'Roof Restoration';
    if (ALLOWED_CATEGORIES.includes(p.category as AllowedCategory)) {
      cat = p.category as AllowedCategory;
    } else if (p.category.includes('Roof')) {
      cat = 'Roof Restoration';
    } else if (p.category.includes('Waterproof')) {
      cat = 'Waterproofing & Restoration';
    } else if (p.category.includes('Paint')) {
      cat = 'Painting & Restoration';
    } else if (p.category.includes('Epoxy') || p.category.includes('Floor')) {
      cat = 'Epoxy & Flooring';
    } else if (p.category.includes('Paving')) {
      cat = 'Paving';
    } else if (p.category.includes('Plumbing')) {
      cat = 'Plumbing & Bathroom Restoration';
    } else {
      cat = 'Property Finishing & Renovation';
    }

    // Set 4 projects as drafts for realistic visual statistics & filter testing
    const isDraft = idx === 4 || idx === 11 || idx === 17 || idx === 22;

    return {
      id: String(p.id),
      title: p.title,
      category: cat,
      display_type: p.type,
      is_published: !isDraft,
      created_at: dates[idx % dates.length],
      views: 120 + ((idx * 37) % 450),
      images: p.images.map((img, imgIdx) => ({
        id: `${p.id}-${imgIdx}`,
        stage: img.stage,
        url: img.url,
        storage_path: `projects/${p.id}/${img.stage.toLowerCase()}-${imgIdx}.jpg`,
      }))
    };
  });
}

// Category Color Palette for Charts & Tags
const CATEGORY_COLORS: Record<AllowedCategory, { hex: string; bg: string; text: string; border: string }> = {
  'Roof Restoration': { hex: '#39FF14', bg: 'bg-[#39FF14]/10', text: 'text-[#39FF14]', border: 'border-[#39FF14]/30' },
  'Waterproofing & Restoration': { hex: '#00F0FF', bg: 'bg-[#00F0FF]/10', text: 'text-[#00F0FF]', border: 'border-[#00F0FF]/30' },
  'Painting & Restoration': { hex: '#A855F7', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Epoxy & Flooring': { hex: '#F59E0B', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Property Finishing & Renovation': { hex: '#EC4899', bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
  'Plumbing & Bathroom Restoration': { hex: '#06B6D4', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'Paving': { hex: '#94A3B8', bg: 'bg-slate-500/10', text: 'text-slate-300', border: 'border-slate-500/30' },
};

export default function AdminGallery() {
  // Navigation active tab
  const [currentTab, setCurrentTab] = useState<'overview' | 'projects' | 'add' | 'categories' | 'settings'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Connection settings state
  const [supabaseUrl, setSupabaseUrl] = useState(getSupabaseConfig().url);
  const [supabaseKey, setSupabaseKey] = useState(getSupabaseConfig().anonKey);
  const [configSavedNotice, setConfigSavedNotice] = useState('');

  // Projects State
  const [projects, setProjects] = useState<AdminProject[]>(() => {
    const saved = localStorage.getItem('lrt_demo_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initializeDemoProjects();
      }
    }
    return initializeDemoProjects();
  });

  // Save to local storage whenever projects change
  useEffect(() => {
    localStorage.setItem('lrt_demo_projects', JSON.stringify(projects));
  }, [projects]);

  // Supabase Authentication & Admin Session State
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalView, setLoginModalView] = useState<'login' | 'forgot_password'>('login');
  const [loginEmail, setLoginEmail] = useState('thembelaandrew@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // In-app Toast Notification State (replaces window.alert)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 5000);
  };

  // Password Recovery Flow State
  const [forgotEmail, setForgotEmail] = useState('thembelaandrew@gmail.com');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Diagnostics State
  const [diagnostics, setDiagnostics] = useState<ConnectionDiagnostics | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  // Sync with live Supabase database
  const loadFromSupabase = React.useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data: dbProjects, error: pErr } = await supabase
        .from('gallery_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (pErr || !dbProjects || dbProjects.length === 0) return;

      const pIds = dbProjects.map(p => p.id);
      const { data: dbImages, error: iErr } = await supabase
        .from('gallery_images')
        .select('*')
        .in('project_id', pIds)
        .order('display_order', { ascending: true });

      if (iErr) return;

      const fetchedMap = new Map<string, AdminProject>();

      dbProjects.forEach(p => {
        fetchedMap.set(p.id, {
          id: p.id,
          title: p.title || p.category,
          category: p.category as AllowedCategory,
          display_type: p.display_type || 'sequence',
          is_published: p.is_published !== false,
          created_at: p.created_at ? p.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          views: 45,
          images: [],
        });
      });

      if (dbImages) {
        dbImages.forEach(img => {
          const proj = fetchedMap.get(img.project_id);
          if (proj) {
            let url = img.image_url;
            if (!url && img.storage_path) {
              url = supabase.storage.from('gallery-images').getPublicUrl(img.storage_path).data.publicUrl;
            }
            proj.images.push({
              id: img.id,
              stage: img.stage,
              url,
              storage_path: img.storage_path,
            });
          }
        });
      }

      const supabaseList = Array.from(fetchedMap.values());
      if (supabaseList.length > 0) {
        setProjects(prev => {
          const dbIds = new Set(supabaseList.map(p => p.id));
          const remainingLocal = prev.filter(p => !dbIds.has(p.id));
          return [...supabaseList, ...remainingLocal];
        });
      }
    } catch (err) {
      console.warn('Could not sync with Supabase:', err);
    }
  }, []);

  // Listen to Supabase Auth State Changes & initial session
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setAuthChecking(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      if (data?.user && isAuthorizedAdmin(data.user.id)) {
        setAdminUser(data.user);
      } else {
        setAdminUser(null);
      }
      setAuthChecking(false);
    }).catch(() => {
      setAuthChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && isAuthorizedAdmin(session.user.id)) {
        setAdminUser(session.user);
        loadFromSupabase();
      } else {
        setAdminUser(null);
      }
      setAuthChecking(false);
    });

    loadFromSupabase();

    // Check if user came from password reset with ?login=true
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('login') === 'true') {
        setShowLoginModal(true);
        setLoginModalView('login');
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [loadFromSupabase]);

  // Auth Handler: Login with strict UUID verification
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const res = await signInAdmin(loginEmail, loginPassword);
    setLoginLoading(false);

    if (res.success && res.user) {
      if (!isAuthorizedAdmin(res.user.id)) {
        await signOutAdmin();
        setAdminUser(null);
        setLoginError(`Access Denied: The authenticated account (${res.user.email}) has UUID ${res.user.id}, which is not the authorized administrator for Liquid Rubber Tech. Required UUID: ${AUTHORIZED_ADMIN_UUID}`);
        return;
      }
      setAdminUser(res.user);
      setIsDemoMode(false);
      setShowLoginModal(false);
      setLoginPassword('');
      showToast('Welcome, Thembela Andrew. Authenticated with Supabase RLS.', 'success');
      loadFromSupabase();
    } else {
      setLoginError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Auth Handler: Send Password Recovery Email
  const handleSendForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    const res = await sendPasswordResetEmail(forgotEmail);
    setForgotLoading(false);

    if (res.success) {
      setForgotSuccess(`A secure password recovery email has been sent to ${forgotEmail}. Please open the email and click the recovery link to set your new password.`);
      showToast('Password recovery email dispatched successfully via Supabase.', 'success');
    } else {
      setForgotError(res.error || 'Could not send recovery email. Please check the address or try again.');
    }
  };

  // Auth Handler: Logout
  const handleAdminLogout = async () => {
    await signOutAdmin();
    setAdminUser(null);
    setIsDemoMode(false);
    showToast('Signed out of Liquid Rubber Tech administrator session.', 'info');
  };

  // Diagnostics Runner
  const handleRunDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    try {
      const diag = await testSupabaseConnection();
      setDiagnostics(diag);
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'published' | 'draft'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Add Project Form State (TITLE IS NOW EXPLICITLY OPTIONAL)
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AllowedCategory>('Roof Restoration');
  const [newDisplayType, setNewDisplayType] = useState<'single' | 'sequence'>('sequence');

  // Form Image Files & Previews
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [singleImagePreview, setSingleImagePreview] = useState<string>('');

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [beforeImagePreview, setBeforeImagePreview] = useState<string>('');

  const [duringFile, setDuringFile] = useState<File | null>(null);
  const [duringImagePreview, setDuringImagePreview] = useState<string>('');

  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [afterImagePreview, setAfterImagePreview] = useState<string>('');

  const [fileWarning, setFileWarning] = useState<string>('');

  // Form submission feedback
  const [isUploading, setIsUploading] = useState(false);
  const [uploadActionType, setUploadActionType] = useState<'save' | 'publish'>('publish');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  // Edit Project Modal State
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<AllowedCategory>('Roof Restoration');
  const [editIsPublished, setEditIsPublished] = useState(true);

  // Replace Image Modal State
  const [replacingImageInfo, setReplacingImageInfo] = useState<{
    project: AdminProject;
    imageId: string;
    stage: string;
    currentUrl: string;
    currentPath: string;
  } | null>(null);
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [replacementPreview, setReplacementPreview] = useState<string>('');
  const [isReplacing, setIsReplacing] = useState(false);

  // Delete Project Confirmation State
  const [projectToDelete, setProjectToDelete] = useState<AdminProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Image Zoom Modal
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string; stage: string } | null>(null);

  // File Input References
  const singleInputRef = useRef<HTMLInputElement>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const duringInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // --- STATS COMPUTATION ---
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter(p => p.is_published).length;
    const drafts = total - published;
    const totalImages = projects.reduce((acc, p) => acc + p.images.length, 0);
    return { total, published, drafts, totalImages };
  }, [projects]);

  // Category counts for charts
  const categoryStats = useMemo(() => {
    const counts: Record<AllowedCategory, number> = {
      'Roof Restoration': 0,
      'Waterproofing & Restoration': 0,
      'Painting & Restoration': 0,
      'Epoxy & Flooring': 0,
      'Property Finishing & Renovation': 0,
      'Plumbing & Bathroom Restoration': 0,
      'Paving': 0,
    };
    projects.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, [projects]);

  // Filtered Projects for Management View
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const titleMatch = (p.title || p.category).toLowerCase().includes(searchQuery.toLowerCase());
      const catMatch = p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = titleMatch || catMatch;
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = statusFilter === 'All' 
        ? true 
        : statusFilter === 'published' 
          ? p.is_published 
          : !p.is_published;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, statusFilter]);

  // --- HANDLERS: FILE SELECTION WITH 10MB CHECK ---
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>, stage: 'single' | 'before' | 'during' | 'after' | 'replace') => {
    setFileWarning('');
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // 10MB limit enforcement
    if (file.size > 10 * 1024 * 1024) {
      setFileWarning(`Warning: "${file.name}" exceeds 10MB (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose an image under 10MB.`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    if (stage === 'single') {
      setSingleFile(file);
      setSingleImagePreview(objectUrl);
    }
    if (stage === 'before') {
      setBeforeFile(file);
      setBeforeImagePreview(objectUrl);
    }
    if (stage === 'during') {
      setDuringFile(file);
      setDuringImagePreview(objectUrl);
    }
    if (stage === 'after') {
      setAfterFile(file);
      setAfterImagePreview(objectUrl);
    }
    if (stage === 'replace') {
      setReplacementFile(file);
      setReplacementPreview(objectUrl);
    }
  };

  // --- HANDLER: CREATE PROJECT (SAVE AS DRAFT OR PUBLISH LIVE) ---
  const handleProjectSubmit = async (publishToLive: boolean) => {
    setFormErrorMessage('');
    setFormSuccessMessage('');
    setUploadActionType(publishToLive ? 'publish' : 'save');

    // Title is optional! If empty, defaults to category
    const effectiveTitle = newTitle.trim() || newCategory;

    // Validate images based on display format
    if (newDisplayType === 'single' && !singleFile) {
      setFormErrorMessage('Please select a showcase photo file for this single-image project.');
      return;
    }

    if (newDisplayType === 'sequence') {
      if (!beforeFile) {
        setFormErrorMessage('Please select a "Before" photo file for the transformation sequence.');
        return;
      }
      if (!afterFile) {
        setFormErrorMessage('Please select an "After" photo file for the transformation sequence.');
        return;
      }
    }

    // Pre-flight check: Supabase connection & Auth
    if (!isSupabaseConfigured()) {
      setFormErrorMessage('Supabase is not configured. Please supply your Supabase URL and Anon Key in Settings before saving.');
      return;
    }

    if (!adminUser) {
      setFormErrorMessage(
        `Supabase Authentication Required: Row-Level Security (RLS) policies require an active administrator session (UUID: ${AUTHORIZED_ADMIN_UUID}). Please click "Sign In (Admin)" in the top bar or use the login panel in Settings.`
      );
      setShowLoginModal(true);
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 15;
      });
    }, 200);

    try {
      const result = await createAndSaveProject({
        title: effectiveTitle,
        category: newCategory,
        displayType: newDisplayType,
        isPublished: publishToLive,
        singleFile,
        singlePreview: singleImagePreview,
        beforeFile,
        beforePreview: beforeImagePreview,
        duringFile,
        duringPreview: duringImagePreview,
        afterFile,
        afterPreview: afterImagePreview,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!result.success) {
        setFormErrorMessage(result.error || 'Failed to save project to Supabase.');
        setFormSuccessMessage('');
        return;
      }

      // Success: genuinely saved in Supabase
      const newProjModel: AdminProject = {
        id: result.projectId,
        title: effectiveTitle,
        category: newCategory,
        display_type: newDisplayType,
        is_published: publishToLive,
        created_at: new Date().toISOString().split('T')[0],
        views: 0,
        images: newDisplayType === 'single' ? [
          { id: `${result.projectId}-1`, stage: 'Combined', url: singleImagePreview, storage_path: `projects/${result.projectId}/combined.jpg` }
        ] : [
          { id: `${result.projectId}-before`, stage: 'Before', url: beforeImagePreview, storage_path: `projects/${result.projectId}/before.jpg` },
          ...(duringImagePreview ? [{ id: `${result.projectId}-during`, stage: 'During' as const, url: duringImagePreview, storage_path: `projects/${result.projectId}/during.jpg` }] : []),
          { id: `${result.projectId}-after`, stage: 'After', url: afterImagePreview, storage_path: `projects/${result.projectId}/after.jpg` },
        ]
      };

      setProjects(prev => [newProjModel, ...prev]);
      setFormSuccessMessage(result.message);
      setFormErrorMessage('');

      // Reset form
      setNewTitle('');
      setSingleFile(null);
      setSingleImagePreview('');
      setBeforeFile(null);
      setBeforeImagePreview('');
      setDuringFile(null);
      setDuringImagePreview('');
      setAfterFile(null);
      setAfterImagePreview('');

      // Reload from Supabase
      loadFromSupabase();
    } catch (err: any) {
      clearInterval(progressInterval);
      setFormErrorMessage(err.message || 'An unexpected error occurred during project submission.');
      setFormSuccessMessage('');
    } finally {
      setIsUploading(false);
    }
  };

  // --- HANDLER: SAVE EDITED PROJECT DETAILS ---
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const effectiveTitle = editTitle.trim() || editCategory;
    const supabase = getSupabase();

    if (supabase) {
      try {
        const { error } = await supabase
          .from('gallery_projects')
          .update({
            title: effectiveTitle,
            category: editCategory,
            is_published: editIsPublished,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProject.id);

        if (error) {
          showToast(`Database update error: ${error.message}`, 'error');
          return;
        } else {
          showToast(`Project updated successfully in Supabase!`, 'success');
        }
      } catch (err: any) {
        console.warn('Supabase edit warning:', err);
      }
    }

    setProjects(prev => prev.map(p => {
      if (p.id === editingProject.id) {
        return {
          ...p,
          title: effectiveTitle,
          category: editCategory,
          is_published: editIsPublished,
        };
      }
      return p;
    }));

    setEditingProject(null);
  };

  // --- HANDLER: TOGGLE PUBLISHED STATUS WITH REAL SUPABASE SYNC ---
  const handleTogglePublish = async (projectId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const result = await updateProjectPublishStatus(projectId, newStatus);

    if (!result.success) {
      showToast(`Could not update publish status: ${result.error || 'Database error'}`, 'error');
      return;
    }

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, is_published: newStatus };
      }
      return p;
    }));
    showToast(`Project status updated: ${newStatus ? 'Published to live gallery' : 'Saved as Draft'}`, 'success');
  };

  // --- HANDLER: EXECUTE IMAGE REPLACEMENT ---
  const handleConfirmReplaceImage = async () => {
    if (!replacingImageInfo || !replacementFile) return;

    setIsReplacing(true);
    const res = await replaceProjectImage(
      replacingImageInfo.project.id,
      replacingImageInfo.imageId,
      replacingImageInfo.stage,
      replacementFile,
      replacingImageInfo.currentPath
    );

    if (!res.success) {
      showToast(`Image replacement error: ${res.error}`, 'error');
      setIsReplacing(false);
      return;
    }

    const newUrl = res.newUrl || replacementPreview;

    setProjects(prev => prev.map(p => {
      if (p.id === replacingImageInfo.project.id) {
        return {
          ...p,
          images: p.images.map(img => {
            if (img.id === replacingImageInfo.imageId) {
              return { 
                ...img, 
                url: newUrl, 
                storage_path: res.newStoragePath || img.storage_path 
              };
            }
            return img;
          })
        };
      }
      return p;
    }));

    setIsReplacing(false);
    setReplacingImageInfo(null);
    setReplacementFile(null);
    setReplacementPreview('');
    showToast('Replacement image uploaded and saved successfully!', 'success');
  };

  // --- HANDLER: DELETE PROJECT ---
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);

    const storagePaths = projectToDelete.images.map(img => img.storage_path);
    const delRes = await deleteProjectFromSupabase(projectToDelete.id, storagePaths);

    if (!delRes.success && isSupabaseConfigured() && adminUser) {
      showToast(`Deletion failed in Supabase: ${delRes.error}`, 'error');
      setIsDeleting(false);
      return;
    }

    setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
    setIsDeleting(false);
    setProjectToDelete(null);
    showToast('Project removed successfully from gallery.', 'info');
  };

  // --- HANDLER: RESET DEMO DATA ---
  const handleResetData = () => {
    const defaults = initializeDemoProjects();
    setProjects(defaults);
    localStorage.setItem('lrt_demo_projects', JSON.stringify(defaults));
    showToast('Local preview data reset to default 28 gallery projects.', 'info');
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <SEO 
          title="Liquid Rubber Tech | Gallery Administration Portal"
          description="Liquid Rubber Tech project gallery dashboard for managing commercial and residential waterproofing, roofing, and property restoration projects."
          url="https://liquidrubbertech.co.za/admin/gallery"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin"></div>
          <span className="text-xs text-gray-400 font-medium">Verifying administrator session...</span>
        </div>
      </div>
    );
  }

  if (!adminUser && !isDemoMode) {
    return (
      <div className="min-h-screen bg-[#080808] text-gray-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        <SEO 
          title="Administrator Login | Liquid Rubber Tech Gallery Portal"
          description="Sign in to the Liquid Rubber Tech Project Gallery Administration Portal."
          url="https://liquidrubbertech.co.za/admin/gallery"
        />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex items-center gap-3 mx-auto group">
              <img 
                src="https://i.imgur.com/96Q9RnA.jpeg" 
                alt="Liquid Rubber Tech Logo" 
                className="h-12 w-12 rounded-full ring-2 ring-brand-green/40 object-cover group-hover:ring-brand-green transition-all shadow-lg shadow-brand-green/20"
              />
              <div className="text-left">
                <span className="font-display font-bold text-lg text-white tracking-wide block leading-none">
                  Liquid Rubber Tech
                </span>
                <span className="text-[10px] text-brand-green font-semibold tracking-wider uppercase">
                  Gallery Administration
                </span>
              </div>
            </Link>

            <h1 className="text-2xl font-display font-bold text-white tracking-tight pt-1">
              {loginModalView === 'login' ? 'Administrator Login' : 'Password Recovery'}
            </h1>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {loginModalView === 'login' 
                ? 'Sign in with your administrator credentials to manage and publish projects under Row-Level Security (RLS).'
                : 'Enter your registered administrator email to receive a secure recovery link.'}
            </p>
          </div>

          {/* Login / Recovery Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 shadow-2xl space-y-5">
            {loginModalView === 'login' ? (
              <>
                {loginError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                      Administrator Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="thembelaandrew@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                      required
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginModalView('forgot_password');
                          setForgotEmail(loginEmail);
                          setForgotError('');
                          setForgotSuccess('');
                        }}
                        className="text-[10px] text-brand-green hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green pr-10"
                        required
                        autoFocus
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Target UUID Badge */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 text-[10px]">Authorized Admin UUID:</span>
                    <span className="font-mono text-[10px] text-brand-green font-bold">
                      {AUTHORIZED_ADMIN_UUID.slice(0, 12)}...
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                  >
                    {loginLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Administrator Account...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In as Administrator</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Forgot password form */
              <div className="space-y-4 text-xs">
                {forgotSuccess && (
                  <div className="p-3.5 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Recovery Link Dispatched</span>
                      <p className="mt-1 text-gray-300 leading-relaxed text-[11px]">{forgotSuccess}</p>
                    </div>
                  </div>
                )}

                {forgotError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                {!forgotSuccess ? (
                  <form onSubmit={handleSendForgotPassword} className="space-y-3.5">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                        Registered Administrator Email
                      </label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="thembelaandrew@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full py-2.5 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Recovery Link...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Password Recovery Link</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="pt-2">
                    <Link
                      to="/admin/update-password"
                      className="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors"
                    >
                      Proceed to Password Update Page
                    </Link>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginModalView('login');
                      setForgotError('');
                      setForgotSuccess('');
                    }}
                    className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <Link
                to="/"
                className="text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsDemoMode(true);
                  showToast('Entered Dashboard Preview (Read-Only Demo Mode).', 'info');
                }}
                className="text-[11px] text-gray-400 hover:text-brand-green underline transition-colors"
              >
                Preview Dashboard (Demo Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 flex flex-col font-sans">
      <SEO 
        title="Liquid Rubber Tech | Gallery Administration Portal"
        description="Liquid Rubber Tech project gallery dashboard for managing commercial and residential waterproofing, roofing, and property restoration projects."
        url="https://liquidrubbertech.co.za/admin/gallery"
      />

      {/* Demo Mode Notice Banner */}
      {isDemoMode && (
        <div className="bg-yellow-400/10 border-b border-yellow-400/30 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-yellow-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-yellow-400" />
            <span>
              <strong>Demo Preview Mode (Read-Only):</strong> You are inspecting the dashboard layout. Database write operations require signing in with your administrator account.
            </span>
          </div>
          <button
            onClick={() => {
              setIsDemoMode(false);
              setShowLoginModal(true);
            }}
            className="px-3 py-1 rounded-lg bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 transition-colors shrink-0"
          >
            Sign In as Administrator
          </button>
        </div>
      )}

      {/* ==============================================================
          TOP ADMIN APPLICATION HEADER
          ============================================================== */}
      <header className="h-16 bg-[#0e0e0e] border-b border-white/10 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Liquid Rubber Tech Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <img 
              src="https://i.imgur.com/96Q9RnA.jpeg" 
              alt="Liquid Rubber Tech Logo" 
              className="h-8 w-8 rounded-full ring-2 ring-brand-green/40 object-cover"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-sm text-white tracking-wide block leading-none">
                Liquid Rubber Tech
              </span>
              <span className="text-[10px] text-brand-green font-semibold tracking-wider uppercase">
                Gallery Management Portal
              </span>
            </div>
          </Link>

          <span className="hidden md:inline-block text-gray-600">/</span>
          <span className="hidden md:inline-block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {currentTab === 'overview' && 'Dashboard Overview'}
            {currentTab === 'projects' && `Gallery Projects (${projects.length})`}
            {currentTab === 'add' && 'Add New Project'}
            {currentTab === 'categories' && 'Categories'}
            {currentTab === 'settings' && 'Settings & Integration'}
          </span>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Action: New Project */}
          <button
            onClick={() => setCurrentTab('add')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-all duration-200 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>

          {/* View Live Public Gallery Link */}
          <Link
            to="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            title="Open public gallery in new tab"
          >
            <Globe className="w-3.5 h-3.5 text-brand-green" />
            <span className="hidden md:inline">Public Gallery</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </Link>

          {/* Technical Maintainer Profile Badge (Explicitly developer identity, not owner) */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue font-bold text-xs">
              TA
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <span className="text-xs font-bold text-white block">Thembela Andrew</span>
              <span className="text-[10px] text-brand-green">Technical Maintainer & Developer</span>
            </div>
          </div>

          {/* Supabase Authentication Status / Button */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            {adminUser ? (
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  adminUser.id === AUTHORIZED_ADMIN_UUID 
                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/30' 
                    : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                }`}>
                  {adminUser.id === AUTHORIZED_ADMIN_UUID ? 'Admin Verified' : 'Logged In'}
                </span>
                <button
                  onClick={handleAdminLogout}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                  title="Sign out of Supabase"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-xs font-bold border border-yellow-400/30 transition-colors"
                title="Authenticate with Supabase for RLS database writes"
              >
                <Lock className="w-3 h-3" />
                <span>Sign In (Admin)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==============================================================
          MAIN APPLICATION SHELL: SIDEBAR + CONTENT
          ============================================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION (Desktop & Mobile Slide-over) */}
        <aside className={`
          fixed inset-y-16 left-0 z-30 w-64 bg-[#0d0d0d] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Storage Bucket Status Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Storage Target</span>
                <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <p className="text-xs font-mono text-white truncate">gallery-images</p>
              <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
                <span>Projects: {stats.total}</span>
                <span>Max: 10MB/photo</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-3 block mb-2">
                Navigation
              </span>

              <button
                onClick={() => { setCurrentTab('overview'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  currentTab === 'overview'
                    ? 'bg-brand-green text-black font-bold shadow-md shadow-brand-green/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Overview</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${currentTab === 'overview' ? 'text-black' : 'text-gray-600'}`} />
              </button>

              <button
                onClick={() => { setCurrentTab('projects'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  currentTab === 'projects'
                    ? 'bg-brand-green text-black font-bold shadow-md shadow-brand-green/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 shrink-0" />
                  <span>Gallery Projects</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  currentTab === 'projects' ? 'bg-black text-white' : 'bg-white/10 text-gray-300'
                }`}>
                  {stats.total}
                </span>
              </button>

              <button
                onClick={() => { setCurrentTab('add'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  currentTab === 'add'
                    ? 'bg-brand-green text-black font-bold shadow-md shadow-brand-green/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-4 h-4 shrink-0" />
                  <span>Add New Project</span>
                </div>
                <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider">New</span>
              </button>

              <button
                onClick={() => { setCurrentTab('categories'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  currentTab === 'categories'
                    ? 'bg-brand-green text-black font-bold shadow-md shadow-brand-green/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Categories (7)</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${currentTab === 'categories' ? 'text-black' : 'text-gray-600'}`} />
              </button>

              <button
                onClick={() => { setCurrentTab('settings'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  currentTab === 'settings'
                    ? 'bg-brand-green text-black font-bold shadow-md shadow-brand-green/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Settings & Status</span>
                </div>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 bg-[#0a0a0a] space-y-3">
            <div className="text-[11px] text-gray-500 leading-tight">
              <span className="font-semibold text-gray-400 block mb-0.5">Liquid Rubber Tech</span>
              <span>Maintainer Access: Active</span>
              <span className="block font-mono text-[9px] text-brand-green truncate">55acb5d8-b8ff-447a...</span>
            </div>

            <button
              onClick={handleResetData}
              className="w-full py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3 text-brand-green" />
              <span>Reset Sample Projects</span>
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* ==============================================================
            MAIN DASHBOARD CONTENT AREA
            ============================================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#090909]">
          
          {/* ============================================================
              TAB 1: OVERVIEW DASHBOARD
              ============================================================ */}
          {currentTab === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Header Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    Liquid Rubber Tech — Gallery Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Live overview of published and draft portfolio projects stored in Supabase.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('add')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-all shadow-lg shadow-brand-green/20"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Project
                  </button>
                  <button
                    onClick={() => setCurrentTab('projects')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs border border-white/10 transition-all"
                  >
                    <FolderKanban className="w-4 h-4" /> View All ({stats.total})
                  </button>
                </div>
              </div>

              {/* 4 STATISTIC CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Total Projects */}
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 relative overflow-hidden group hover:border-brand-green/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full blur-xl group-hover:bg-brand-green/10 transition-all"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Projects</span>
                    <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <FolderKanban className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                    {stats.total}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-green font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In portfolio database</span>
                  </div>
                </div>

                {/* Published Projects */}
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 relative overflow-hidden group hover:border-brand-green/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full blur-xl group-hover:bg-brand-green/10 transition-all"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Published</span>
                    <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-brand-green tracking-tight">
                    {stats.published}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Live on liquidrubbertech.co.za</span>
                  </div>
                </div>

                {/* Draft Projects */}
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 relative overflow-hidden group hover:border-yellow-400/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-xl group-hover:bg-yellow-400/10 transition-all"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drafts</span>
                    <div className="w-9 h-9 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-yellow-400 tracking-tight">
                    {stats.drafts}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Private &bull; Not visible to public</span>
                  </div>
                </div>

                {/* Total Gallery Images */}
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 relative overflow-hidden group hover:border-brand-blue/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl group-hover:bg-brand-blue/10 transition-all"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Images</span>
                    <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
                    {stats.totalImages}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Stored in gallery-images</span>
                  </div>
                </div>
              </div>

              {/* CHARTS SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. DOUGHNUT CHART */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-white text-base">Projects by Category</h3>
                      <p className="text-xs text-gray-400">Distribution across the 7 company service lines</p>
                    </div>
                    <PieChart className="w-4 h-4 text-brand-green" />
                  </div>

                  {/* SVG Doughnut Visualization */}
                  <div className="py-2 flex items-center justify-center relative">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      {(() => {
                        let accumulatedPercent = 0;
                        const total = stats.total || 1;
                        return ALLOWED_CATEGORIES.map((cat) => {
                          const count = categoryStats[cat];
                          const percent = (count / total) * 100;
                          const strokeDasharray = `${percent} ${100 - percent}`;
                          const strokeDashoffset = -accumulatedPercent;
                          accumulatedPercent += percent;

                          return (
                            <circle
                              key={cat}
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke={CATEGORY_COLORS[cat].hex}
                              strokeWidth="14"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-500 hover:opacity-80"
                            />
                          );
                        });
                      })()}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-display font-bold text-white">{stats.total}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Projects</span>
                    </div>
                  </div>

                  {/* Category Legend */}
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {ALLOWED_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentTab('projects');
                        }}
                        className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: CATEGORY_COLORS[cat].hex }}
                          />
                          <span className="text-gray-300 group-hover:text-white truncate text-[11px] font-medium">
                            {cat}
                          </span>
                        </div>
                        <span className="font-mono text-gray-400 group-hover:text-brand-green font-bold text-[11px] ml-1">
                          {categoryStats[cat]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. BAR CHART */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-white text-base">Category Volume Comparison</h3>
                      <p className="text-xs text-gray-400">Total project count per service classification</p>
                    </div>
                    <BarChart3 className="w-4 h-4 text-brand-blue" />
                  </div>

                  {/* Horizontal Bar Chart Items */}
                  <div className="space-y-3.5 my-auto">
                    {ALLOWED_CATEGORIES.map(cat => {
                      const count = categoryStats[cat];
                      const max = Math.max(...(Object.values(categoryStats) as number[]), 1);
                      const widthPercent = Math.max(12, Math.round((count / max) * 100));

                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium text-gray-300 text-[11px] sm:text-xs truncate max-w-[280px]">
                              {cat}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-white font-bold">{count} projects</span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                ({Math.round((count / (stats.total || 1)) * 100)}%)
                              </span>
                            </div>
                          </div>
                          
                          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <div 
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{ 
                                width: `${widthPercent}%`,
                                backgroundColor: CATEGORY_COLORS[cat].hex 
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Activity className="w-3.5 h-3.5 text-brand-green" /> Service volume leader: Roof Restoration
                    </span>
                    <button 
                      onClick={() => setCurrentTab('categories')}
                      className="text-brand-green hover:underline text-[11px] font-semibold flex items-center gap-1"
                    >
                      Inspect Categories &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* RECENT PROJECTS TABLE */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">Recent Portfolio Activity</h3>
                    <p className="text-xs text-gray-400">Latest showcase projects uploaded for Liquid Rubber Tech</p>
                  </div>
                  
                  <button
                    onClick={() => setCurrentTab('projects')}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-green hover:underline font-bold self-start sm:self-auto"
                  >
                    View All {stats.total} Projects &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="py-3 font-bold">Project Title</th>
                        <th className="py-3 font-bold">Category</th>
                        <th className="py-3 font-bold">Format</th>
                        <th className="py-3 font-bold">Images</th>
                        <th className="py-3 font-bold">Publication Status</th>
                        <th className="py-3 font-bold">Date Added</th>
                        <th className="py-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projects.slice(0, 7).map(project => {
                        const coverImg = project.images.find(img => img.stage === 'After' || img.stage === 'Combined') || project.images[0];
                        const displayTitle = project.title?.trim() || project.category;

                        return (
                          <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                            {/* Project Title & Thumbnail */}
                            <td className="py-3.5 pr-4">
                              <div className="flex items-center gap-3">
                                <div 
                                  onClick={() => coverImg && setZoomedImage({ url: coverImg.url, title: displayTitle, stage: coverImg.stage })}
                                  className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black cursor-pointer group-hover:border-brand-green/50 transition-colors"
                                >
                                  {coverImg ? (
                                    <img src={coverImg.url} alt={displayTitle} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                      <ImageIcon className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                                <span className="font-semibold text-white group-hover:text-brand-green transition-colors line-clamp-1 max-w-[200px] sm:max-w-[280px]">
                                  {displayTitle}
                                </span>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 pr-4">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${CATEGORY_COLORS[project.category]?.bg} ${CATEGORY_COLORS[project.category]?.text} ${CATEGORY_COLORS[project.category]?.border}`}>
                                {project.category}
                              </span>
                            </td>

                            {/* Display Format */}
                            <td className="py-3.5 pr-4">
                              <span className="font-mono text-gray-400 text-[11px] uppercase">
                                {project.display_type}
                              </span>
                            </td>

                            {/* Number of Images */}
                            <td className="py-3.5 pr-4">
                              <span className="font-mono font-bold text-gray-300">
                                {project.images.length} photos
                              </span>
                            </td>

                            {/* Publication Status (Live vs Draft) */}
                            <td className="py-3.5 pr-4">
                              <button
                                onClick={() => handleTogglePublish(project.id, project.is_published)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                                  project.is_published
                                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-brand-green/20'
                                    : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20'
                                }`}
                                title={project.is_published ? 'Click to unpublish (hide from website)' : 'Click to publish (make live on website)'}
                              >
                                {project.is_published ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                                    <span>● Live</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                                    <span>○ Draft</span>
                                  </>
                                )}
                              </button>
                            </td>

                            {/* Date */}
                            <td className="py-3.5 pr-4 text-gray-400 font-mono text-[11px]">
                              {project.created_at}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setEditingProject(project);
                                  setEditTitle(project.title || '');
                                  setEditCategory(project.category);
                                  setEditIsPublished(project.is_published);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                title="Edit project details"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                              </button>

                              <button
                                onClick={() => setProjectToDelete(project)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-colors"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 2: GALLERY PROJECT MANAGEMENT
              ============================================================ */}
          {currentTab === 'projects' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    Liquid Rubber Tech — Project Management
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Manage portfolio items, update titles and categories, replace images, and toggle live publication.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('add')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-all shadow-md shadow-brand-green/20"
                  >
                    <PlusCircle className="w-4 h-4" /> Add New Project
                  </button>
                </div>
              </div>

              {/* SEARCH, CATEGORY & STATUS FILTERS TOOLBAR */}
              <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  
                  {/* Search Input (5 cols) */}
                  <div className="sm:col-span-5 relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search projects by title or category..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Dropdown Filter (4 cols) */}
                  <div className="sm:col-span-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-green transition-colors"
                    >
                      <option value="All">All Categories (7)</option>
                      {ALLOWED_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                          {cat} ({categoryStats[cat]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter (3 cols) */}
                  <div className="sm:col-span-3 flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setStatusFilter('All')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                        statusFilter === 'All' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      All ({stats.total})
                    </button>
                    <button
                      onClick={() => setStatusFilter('published')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                        statusFilter === 'published' ? 'bg-brand-green text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Live ({stats.published})
                    </button>
                    <button
                      onClick={() => setStatusFilter('draft')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                        statusFilter === 'draft' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Draft ({stats.drafts})
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Results Count and Grid/Table Switch */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span>Showing <strong className="text-white">{filteredProjects.length}</strong> of {stats.total} projects</span>
                    {(selectedCategory !== 'All' || statusFilter !== 'All' || searchQuery) && (
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setStatusFilter('All');
                          setSearchQuery('');
                        }}
                        className="text-brand-green hover:underline text-[11px] font-semibold"
                      >
                        Reset filters
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/40 p-0.5 rounded-lg border border-white/10">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-brand-green' : 'text-gray-500 hover:text-white'}`}
                      title="Grid Card View"
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white/10 text-brand-green' : 'text-gray-500 hover:text-white'}`}
                      title="Table List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PROJECT CARDS: GRID VIEW */}
              {viewMode === 'grid' ? (
                filteredProjects.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#121212] border border-white/10">
                    <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="font-bold text-white text-base">No matching projects found</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-4">
                      No project matches your active search query or filters. Try adjusting your parameters.
                    </p>
                    <button
                      onClick={() => { setSelectedCategory('All'); setStatusFilter('All'); setSearchQuery(''); }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => {
                      const coverImg = project.images.find(img => img.stage === 'After' || img.stage === 'Combined') || project.images[0];
                      const displayTitle = project.title?.trim() || project.category;

                      return (
                        <div 
                          key={project.id}
                          className="rounded-2xl bg-[#121212] border border-white/10 overflow-hidden flex flex-col group hover:border-brand-green/30 transition-all duration-300 shadow-lg"
                        >
                          {/* Image Cover Banner */}
                          <div className="relative h-48 bg-black/60 overflow-hidden">
                            {coverImg ? (
                              <img 
                                src={coverImg.url} 
                                alt={displayTitle} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <ImageIcon className="w-8 h-8" />
                              </div>
                            )}

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-md ${CATEGORY_COLORS[project.category]?.bg} ${CATEGORY_COLORS[project.category]?.text} border ${CATEGORY_COLORS[project.category]?.border}`}>
                                {project.category}
                              </span>
                              <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase">
                                {project.display_type}
                              </span>
                            </div>

                            {/* Status Pill Toggle */}
                            <button
                              onClick={() => handleTogglePublish(project.id, project.is_published)}
                              className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-md transition-all ${
                                project.is_published
                                  ? 'bg-brand-green/90 text-black hover:bg-brand-green'
                                  : 'bg-yellow-400/90 text-black hover:bg-yellow-400'
                              }`}
                              title={project.is_published ? 'Click to unpublish from live site' : 'Click to publish to live site'}
                            >
                              {project.is_published ? '● Live' : '○ Draft'}
                            </button>

                            {/* Quick Zoom Preview Icon */}
                            {coverImg && (
                              <button
                                onClick={() => setZoomedImage({ url: coverImg.url, title: displayTitle, stage: coverImg.stage })}
                                className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/70 text-white hover:text-brand-green backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Expand photo preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {/* Content Details */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-base text-white mb-1.5 line-clamp-1 group-hover:text-brand-green transition-colors">
                                {displayTitle}
                              </h3>
                              <p className="text-[11px] text-gray-400 flex items-center gap-1.5 font-mono mb-4">
                                <Calendar className="w-3 h-3" />
                                <span>Added {project.created_at}</span>
                                <span>&bull;</span>
                                <span>{project.views} views</span>
                              </p>

                              {/* Stage Thumbnails & Replacement Actions */}
                              <div className="border-t border-white/10 pt-3 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    Stage Photos ({project.images.length})
                                  </span>
                                  <span className="text-[10px] text-gray-500">Tap to replace</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                  {project.images.map(img => (
                                    <div 
                                      key={img.id} 
                                      className="relative rounded-lg overflow-hidden border border-white/10 group/thumb h-16 bg-black"
                                    >
                                      <img src={img.url} alt={img.stage} className="w-full h-full object-cover" />
                                      <button
                                        onClick={() => {
                                          setReplacingImageInfo({
                                            project,
                                            imageId: img.id,
                                            stage: img.stage,
                                            currentUrl: img.url,
                                            currentPath: img.storage_path,
                                          });
                                          setReplacementPreview('');
                                          setReplacementFile(null);
                                        }}
                                        className="absolute inset-0 bg-black/80 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[9px] font-bold text-brand-green"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                        <span>Replace</span>
                                      </button>
                                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-gray-300 py-0.5">
                                        {img.stage}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Card Footer Actions: Explicit Publish / Unpublish + Edit + Delete */}
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleTogglePublish(project.id, project.is_published)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                                    project.is_published
                                      ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 border border-yellow-400/20'
                                      : 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20 border border-brand-green/20'
                                  }`}
                                  title={project.is_published ? 'Hide from public website' : 'Make visible on public website'}
                                >
                                  {project.is_published ? (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5" />
                                      <span>Unpublish</span>
                                    </>
                                  ) : (
                                    <>
                                      <Globe className="w-3.5 h-3.5" />
                                      <span>Publish Live</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => {
                                    setEditingProject(project);
                                    setEditTitle(project.title || '');
                                    setEditCategory(project.category);
                                    setEditIsPublished(project.is_published);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-brand-blue" /> Edit
                                </button>
                              </div>

                              <button
                                onClick={() => setProjectToDelete(project)}
                                className="inline-flex items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                /* TABLE VIEW */
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="py-3 font-bold">Project Title</th>
                        <th className="py-3 font-bold">Category</th>
                        <th className="py-3 font-bold">Format</th>
                        <th className="py-3 font-bold">Images</th>
                        <th className="py-3 font-bold">Publication Status</th>
                        <th className="py-3 font-bold">Added Date</th>
                        <th className="py-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProjects.map(project => {
                        const coverImg = project.images[0];
                        const displayTitle = project.title?.trim() || project.category;
                        return (
                          <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                {coverImg && (
                                  <img 
                                    src={coverImg.url} 
                                    alt="" 
                                    className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0" 
                                  />
                                )}
                                <span className="font-bold text-white text-xs">{displayTitle}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${CATEGORY_COLORS[project.category]?.bg} ${CATEGORY_COLORS[project.category]?.text} ${CATEGORY_COLORS[project.category]?.border}`}>
                                {project.category}
                              </span>
                            </td>
                            <td className="py-3 pr-4 font-mono uppercase text-gray-400 text-[11px]">{project.display_type}</td>
                            <td className="py-3 pr-4 font-mono font-bold text-gray-300">{project.images.length} photos</td>
                            <td className="py-3 pr-4">
                              <button
                                onClick={() => handleTogglePublish(project.id, project.is_published)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  project.is_published 
                                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/30' 
                                    : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                                }`}
                              >
                                {project.is_published ? '● Live' : '○ Draft'}
                              </button>
                            </td>
                            <td className="py-3 pr-4 font-mono text-gray-400">{project.created_at}</td>
                            <td className="py-3 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProject(project);
                                  setEditTitle(project.title || '');
                                  setEditCategory(project.category);
                                  setEditIsPublished(project.is_published);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-blue"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setProjectToDelete(project)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-red-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============================================================
              TAB 3: ADD NEW PROJECT PAGE (TITLE IS OPTIONAL)
              ============================================================ */}
          {currentTab === 'add' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header */}
              <div className="pb-4 border-b border-white/10">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Add New Gallery Project
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Upload photos for Liquid Rubber Tech. Title is optional—it will default to the selected service category if left empty.
                </p>
              </div>

              {/* Supabase Connection & Authentication Live Status Indicator */}
              <div className="p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    !isSupabaseConfigured()
                      ? 'bg-red-400 animate-pulse'
                      : !adminUser
                        ? 'bg-yellow-400 animate-pulse'
                        : 'bg-brand-green'
                  }`} />
                  <div>
                    <span className="font-bold text-white block">
                      {!isSupabaseConfigured() && 'Supabase Configuration Missing'}
                      {isSupabaseConfigured() && !adminUser && 'Administrator Authentication Required for Database Writes'}
                      {isSupabaseConfigured() && adminUser && 'Authenticated & Ready for Supabase Storage & Database'}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {!isSupabaseConfigured() && 'Please enter VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Settings & Status.'}
                      {isSupabaseConfigured() && !adminUser && `Database RLS policy requires UUID ${AUTHORIZED_ADMIN_UUID}. Please sign in before saving.`}
                      {isSupabaseConfigured() && adminUser && `Signed in as ${adminUser.email} (${adminUser.id === AUTHORIZED_ADMIN_UUID ? 'RLS Policy Verified' : 'UUID: ' + adminUser.id})`}
                    </span>
                  </div>
                </div>

                {!adminUser && isSupabaseConfigured() && (
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 transition-colors shrink-0"
                  >
                    Sign In to Supabase
                  </button>
                )}
              </div>

              {/* Form Success Banner */}
              {formSuccessMessage && (
                <div className="p-4 sm:p-5 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-green flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">Project Processed Successfully!</h4>
                    <p className="text-xs text-gray-300">{formSuccessMessage}</p>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() => setCurrentTab('projects')}
                        className="px-3 py-1.5 rounded-lg bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors"
                      >
                        View in Gallery Projects
                      </button>
                      <Link
                        to="/gallery"
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 font-bold text-xs hover:bg-white/20 transition-colors flex items-center gap-1.5"
                      >
                        <Globe className="w-3 h-3 text-brand-green" />
                        <span>View on Public Website</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Error Banner */}
              {formErrorMessage && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold mb-0.5">Please check project details</h4>
                    <p>{formErrorMessage}</p>
                  </div>
                </div>
              )}

              {/* File Warning */}
              {fileWarning && (
                <div className="p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-start gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{fileWarning}</p>
                </div>
              )}

              {/* Project Creation Form */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 space-y-6">
                
                {/* 1. Title (EXPLICITLY OPTIONAL) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                      Project Title
                    </label>
                    <span className="text-[11px] text-gray-500 uppercase font-semibold">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={`e.g. Commercial Flat Roof Restoration (leave empty to use "${newCategory}")`}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-green text-sm"
                  />
                  <p className="text-[11px] text-gray-500 mt-1.5">
                    💡 If left empty, the project will automatically display as <strong>"{newCategory}"</strong> on the public gallery.
                  </p>
                </div>

                {/* 2. Category Dropdown (Exact 7 Categories) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Category <span className="text-brand-green">* Required</span>
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as AllowedCategory)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-brand-green text-sm"
                  >
                    {ALLOWED_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Display Format Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Display Format <span className="text-brand-green">* Required</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setNewDisplayType('sequence')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        newDisplayType === 'sequence'
                          ? 'bg-brand-green/10 border-brand-green text-white shadow-md shadow-brand-green/10'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">Sequence (Transformation)</span>
                        {newDisplayType === 'sequence' && <Check className="w-4 h-4 text-brand-green" />}
                      </div>
                      <p className="text-xs text-gray-400">
                        Showcases Before, During (optional), and After stages. Recommended for restoration work.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewDisplayType('single')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        newDisplayType === 'single'
                          ? 'bg-brand-green/10 border-brand-green text-white shadow-md shadow-brand-green/10'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">Single Image</span>
                        {newDisplayType === 'single' && <Check className="w-4 h-4 text-brand-green" />}
                      </div>
                      <p className="text-xs text-gray-400">
                        One combined hero image showcasing the finished project.
                      </p>
                    </button>
                  </div>
                </div>

                {/* 4. Image Upload Area */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-sm text-white">Upload Photos</h3>
                      <p className="text-xs text-gray-400">JPG, PNG, WebP &bull; Maximum 10MB per file</p>
                    </div>
                  </div>

                  {newDisplayType === 'single' ? (
                    /* SINGLE IMAGE UPLOADER */
                    <div>
                      <input
                        ref={singleInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        className="hidden"
                        onChange={(e) => handleSelectImage(e, 'single')}
                      />
                      {singleImagePreview ? (
                        <div className="relative rounded-2xl overflow-hidden border border-white/20 h-72 group">
                          <img src={singleImagePreview} alt="Showcase Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => singleInputRef.current?.click()}
                              className="px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs"
                            >
                              Change Photo
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSingleFile(null);
                                setSingleImagePreview('');
                              }}
                              className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
                            >
                              Remove
                            </button>
                          </div>
                          <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 text-brand-green font-bold text-xs uppercase">
                            Showcase Photo (Combined)
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => singleInputRef.current?.click()}
                          className="w-full h-60 rounded-2xl border-2 border-dashed border-white/20 hover:border-brand-green/50 bg-black/40 hover:bg-black/60 transition-all flex flex-col items-center justify-center p-6 text-center group"
                        >
                          <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-brand-green/10 flex items-center justify-center text-gray-400 group-hover:text-brand-green mb-3 transition-colors">
                            <Upload className="w-7 h-7" />
                          </div>
                          <p className="font-bold text-sm text-white mb-1">Tap to select Showcase Image</p>
                          <p className="text-xs text-gray-500">Pick from camera roll or desktop files (max 10MB)</p>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* SEQUENCE UPLOADER (BEFORE / DURING / AFTER) */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      
                      {/* Before Photo */}
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-blue mb-2">
                          1. Before Photo <span className="text-red-400">* Required</span>
                        </span>
                        <input
                          ref={beforeInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={(e) => handleSelectImage(e, 'before')}
                        />
                        {beforeImagePreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/20 h-52 group">
                            <img src={beforeImagePreview} alt="Before Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => beforeInputRef.current?.click()}
                                className="p-2 rounded-lg bg-brand-green text-black"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setBeforeFile(null);
                                  setBeforeImagePreview('');
                                }}
                                className="p-2 rounded-lg bg-red-600 text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-brand-blue font-bold text-[11px]">
                              Before
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => beforeInputRef.current?.click()}
                            className="w-full h-52 rounded-xl border-2 border-dashed border-white/20 hover:border-brand-blue/50 bg-black/40 flex flex-col items-center justify-center p-4 text-center group"
                          >
                            <Upload className="w-6 h-6 text-gray-500 group-hover:text-brand-blue mb-2 transition-colors" />
                            <span className="font-bold text-xs text-white">Upload Before Photo</span>
                            <span className="text-[10px] text-gray-500 mt-1">Required</span>
                          </button>
                        )}
                      </div>

                      {/* During Photo (Optional) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                            2. During Photo
                          </span>
                          <span className="text-[10px] text-gray-500 uppercase font-semibold">Optional</span>
                        </div>
                        <input
                          ref={duringInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={(e) => handleSelectImage(e, 'during')}
                        />
                        {duringImagePreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/20 h-52 group">
                            <img src={duringImagePreview} alt="During Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => duringInputRef.current?.click()}
                                className="p-2 rounded-lg bg-brand-green text-black"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setDuringFile(null);
                                  setDuringImagePreview('');
                                }}
                                className="p-2 rounded-lg bg-red-600 text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-yellow-400 font-bold text-[11px]">
                              During
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => duringInputRef.current?.click()}
                            className="w-full h-52 rounded-xl border-2 border-dashed border-white/20 hover:border-yellow-400/50 bg-black/40 flex flex-col items-center justify-center p-4 text-center group"
                          >
                            <Upload className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 mb-2 transition-colors" />
                            <span className="font-bold text-xs text-white">Upload During Photo</span>
                            <span className="text-[10px] text-gray-500 mt-1">In-progress stage</span>
                          </button>
                        )}
                      </div>

                      {/* After Photo */}
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-green mb-2">
                          3. After Photo <span className="text-brand-green">* Required</span>
                        </span>
                        <input
                          ref={afterInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={(e) => handleSelectImage(e, 'after')}
                        />
                        {afterImagePreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/20 h-52 group">
                            <img src={afterImagePreview} alt="After Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => afterInputRef.current?.click()}
                                className="p-2 rounded-lg bg-brand-green text-black"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setAfterFile(null);
                                  setAfterImagePreview('');
                                }}
                                className="p-2 rounded-lg bg-red-600 text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-brand-green font-bold text-[11px]">
                              After (Completed)
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => afterInputRef.current?.click()}
                            className="w-full h-52 rounded-xl border-2 border-dashed border-white/20 hover:border-brand-green/50 bg-black/40 flex flex-col items-center justify-center p-4 text-center group"
                          >
                            <Upload className="w-6 h-6 text-gray-500 group-hover:text-brand-green mb-2 transition-colors" />
                            <span className="font-bold text-xs text-white">Upload After Photo</span>
                            <span className="text-[10px] text-gray-500 mt-1">Required</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* TWO DISTINCT SUBMISSION ACTIONS: SAVE DRAFT vs PUBLISH LIVE */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  {isUploading && (
                    <div className="space-y-1.5 p-4 rounded-xl bg-black/50 border border-white/10">
                      <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>
                          {uploadActionType === 'publish' ? 'Uploading images & publishing project...' : 'Uploading images & saving draft...'}
                        </span>
                        <span className="text-brand-green font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-black/80 rounded-full overflow-hidden border border-white/10">
                        <div 
                          className="h-full bg-brand-green transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* BUTTON 1: SAVE AS DRAFT */}
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => handleProjectSubmit(false)}
                      className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 font-bold text-xs sm:text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading && uploadActionType === 'save' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
                          <span>Saving Draft...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 text-yellow-400" />
                          <span>Save as Draft (Private)</span>
                        </>
                      )}
                    </button>

                    {/* BUTTON 2: PUBLISH TO LIVE GALLERY */}
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => handleProjectSubmit(true)}
                      className="py-3.5 px-4 rounded-xl bg-brand-green text-black font-bold text-xs sm:text-sm hover:bg-brand-blue transition-all duration-200 shadow-lg shadow-brand-green/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading && uploadActionType === 'publish' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Publishing to Live...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Publish to Live Gallery</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: CATEGORIES
              ============================================================ */}
          {currentTab === 'categories' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-white/10">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Portfolio Service Categories
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  The exact 7 approved categories configured for Liquid Rubber Tech.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALLOWED_CATEGORIES.map((cat, idx) => {
                  const catProjects = projects.filter(p => p.category === cat);
                  const totalCatImages = catProjects.reduce((acc, p) => acc + p.images.length, 0);
                  const sampleImages = catProjects.flatMap(p => p.images).slice(0, 4);

                  return (
                    <div 
                      key={cat} 
                      className="p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col justify-between group hover:border-brand-green/40 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs text-gray-500 font-bold">0{idx + 1}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${CATEGORY_COLORS[cat].bg} ${CATEGORY_COLORS[cat].text} ${CATEGORY_COLORS[cat].border}`}>
                            Active Category
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-brand-green transition-colors">
                          {cat}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
                          <div>
                            <span className="text-gray-500 block text-[10px] uppercase font-bold">Projects</span>
                            <span className="text-white font-bold text-base">{catProjects.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[10px] uppercase font-bold">Photos</span>
                            <span className="text-brand-blue font-bold text-base">{totalCatImages}</span>
                          </div>
                        </div>

                        {/* Collage Preview */}
                        <div className="grid grid-cols-4 gap-1.5 mb-4 h-16 rounded-xl overflow-hidden border border-white/5">
                          {sampleImages.map((img, i) => (
                            <img key={i} src={img.url} alt="" className="w-full h-full object-cover" />
                          ))}
                          {sampleImages.length < 4 && Array.from({ length: 4 - sampleImages.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="w-full h-full bg-black/40 flex items-center justify-center text-gray-700">
                              <ImageIcon className="w-3 h-3" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentTab('projects');
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-brand-green hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Filter Projects in this Category</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 5: SETTINGS & SUPABASE INTEGRATION STATUS
              ============================================================ */}
          {currentTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  System Settings & Supabase Configuration
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Database parameters, developer maintenance profile, and storage credentials.
                </p>
              </div>

              {/* Developer / Maintainer Profile Card */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Project Maintainer & Developer Access</h3>
                    <p className="text-xs text-gray-400">Technical administration for Liquid Rubber Tech</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/30 text-xs font-bold font-mono">
                    Developer Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px] block font-bold mb-1">Maintainer Email</span>
                    <span className="text-white font-mono font-semibold">thembelaandrew@gmail.com</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px] block font-bold mb-1">Role & Responsibility</span>
                    <span className="text-brand-green font-semibold">Technical Maintainer & Developer</span>
                  </div>
                  <div className="col-span-full p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px] block font-bold mb-1">Database Policy Authorized UUID</span>
                    <span className="text-brand-green font-mono text-[11px] break-all">55acb5d8-b8ff-447a-b09d-33bf621bceca</span>
                  </div>
                </div>
              </div>

              {/* Supabase Connection Setup */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Supabase Connection Parameters</h3>
                    <p className="text-xs text-gray-400">Credentials can be supplied via Netlify environment variables or browser storage</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                    isSupabaseConfigured() ? 'bg-brand-green/10 text-brand-green border border-brand-green/30' : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                  }`}>
                    {isSupabaseConfigured() ? 'Connected' : 'Credentials Needed'}
                  </span>
                </div>

                {configSavedNotice && (
                  <div className="p-3 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{configSavedNotice}</span>
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                      Project URL (VITE_SUPABASE_URL)
                    </label>
                    <input
                      type="url"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                      Anon / Publishable Key (VITE_SUPABASE_ANON_KEY)
                    </label>
                    <textarea
                      rows={2}
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        clearManualSupabaseConfig();
                        setSupabaseUrl('');
                        setSupabaseKey('');
                        setConfigSavedNotice('Cleared local credentials.');
                        setTimeout(() => setConfigSavedNotice(''), 3000);
                      }}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Clear Stored Credentials
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        saveManualSupabaseConfig(supabaseUrl, supabaseKey);
                        setConfigSavedNotice('Supabase credentials saved successfully!');
                        setTimeout(() => setConfigSavedNotice(''), 4000);
                        handleRunDiagnostics();
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors"
                    >
                      Save & Test Connection
                    </button>
                  </div>
                </div>
              </div>

              {/* Administrator Authentication (Supabase Auth) Card */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Administrator Authentication (Supabase Auth)</h3>
                    <p className="text-xs text-gray-400">Required by database Row-Level Security (RLS) to insert, update, or delete records</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                    adminUser 
                      ? adminUser.id === AUTHORIZED_ADMIN_UUID
                        ? 'bg-brand-green/10 text-brand-green border border-brand-green/30'
                        : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                      : 'bg-red-400/10 text-red-400 border border-red-400/30'
                  }`}>
                    {adminUser ? (adminUser.id === AUTHORIZED_ADMIN_UUID ? 'RLS Authorized' : 'Logged In (UUID mismatch)') : 'Unauthenticated'}
                  </span>
                </div>

                {adminUser ? (
                  <div className="space-y-3 text-xs bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Admin Email:</span>
                      <span className="text-white font-mono font-bold">{adminUser.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Session User UUID:</span>
                      <span className="text-brand-green font-mono text-[11px]">{adminUser.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">RLS Policy Target UUID:</span>
                      <span className="text-brand-blue font-mono text-[11px]">{AUTHORIZED_ADMIN_UUID}</span>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                    {loginError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 font-bold mb-1 uppercase text-[10px]">
                          Administrator Email
                        </label>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="thembelaandrew@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                          required
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-gray-400 font-bold uppercase text-[10px]">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setForgotEmail(loginEmail);
                              setLoginModalView('forgot_password');
                              setShowLoginModal(true);
                              setForgotError('');
                              setForgotSuccess('');
                            }}
                            className="text-[10px] text-brand-green hover:underline font-semibold"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-gray-500">
                        Public registration is disabled per security specifications.
                      </span>
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="px-5 py-2.5 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {loginLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <span>Sign In to Admin</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Live Supabase & RLS Diagnostics Panel */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Live Supabase & RLS Diagnostics</h3>
                    <p className="text-xs text-gray-400">Real-time health check across Database, Storage bucket, and RLS permissions</p>
                  </div>
                  <button
                    type="button"
                    disabled={isRunningDiagnostics}
                    onClick={handleRunDiagnostics}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRunningDiagnostics ? 'animate-spin text-brand-green' : ''}`} />
                    <span>Run Live Check</span>
                  </button>
                </div>

                {diagnostics && (
                  <div className="space-y-2.5 text-xs">
                    {/* Database Health */}
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      diagnostics.dbAccessible ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      <span className="font-semibold">Postgres Table (gallery_projects):</span>
                      <span className="font-mono text-[11px]">{diagnostics.dbMessage}</span>
                    </div>

                    {/* Storage Bucket Health */}
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      diagnostics.storageAccessible ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      <span className="font-semibold">Storage Bucket (gallery-images):</span>
                      <span className="font-mono text-[11px]">{diagnostics.storageMessage}</span>
                    </div>

                    {/* Auth & RLS Policy Health */}
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      diagnostics.isAuthorizedAdmin ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' : 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
                    }`}>
                      <span className="font-semibold">RLS Admin Permission:</span>
                      <span className="font-mono text-[11px]">{diagnostics.authMessage}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Database & Storage Architecture Status */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <h3 className="font-bold text-white text-base">Database & Storage Architecture Status</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-300">Table: <code className="text-brand-green font-mono">public.gallery_projects</code></span>
                    <span className="text-brand-green font-bold text-[10px] uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ready (Title optional)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-300">Table: <code className="text-brand-green font-mono">public.gallery_images</code></span>
                    <span className="text-brand-green font-bold text-[10px] uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ready (Cascade Delete)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-300">Storage Bucket: <code className="text-brand-blue font-mono">gallery-images</code></span>
                    <span className="text-brand-blue font-bold text-[10px] uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 10MB Limit / Public Read
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset Prototype Cache */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Reset Sample Projects Cache</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Restores the default showcase projects in local cache.</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0"
                >
                  Reset Local Cache
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==============================================================
          MODAL 1: EDIT PROJECT INFORMATION (TITLE OPTIONAL)
          ============================================================== */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/20 max-w-lg w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">Edit Project Details</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block uppercase tracking-wider text-gray-400 font-bold">
                    Project Title
                  </label>
                  <span className="text-[10px] text-gray-500 uppercase">Optional</span>
                </div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder={`Leave empty to display as "${editCategory}"`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as AllowedCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                >
                  {ALLOWED_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                  Publication Status
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditIsPublished(true)}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      editIsPublished ? 'bg-brand-green text-black' : 'bg-black/40 text-gray-400 border border-white/10'
                    }`}
                  >
                    ● Live (Published)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditIsPublished(false)}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      !editIsPublished ? 'bg-yellow-400 text-black' : 'bg-black/40 text-gray-400 border border-white/10'
                    }`}
                  >
                    ○ Draft (Private)
                  </button>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-green text-black font-bold hover:bg-brand-blue"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL 2: REPLACE INDIVIDUAL STAGE IMAGE
          ============================================================== */}
      {replacingImageInfo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/20 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => {
                setReplacingImageInfo(null);
                setReplacementPreview('');
                setReplacementFile(null);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">
                Replace {replacingImageInfo.stage} Photo
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Project: {replacingImageInfo.project.title || replacingImageInfo.project.category}
              </p>
            </div>

            <input
              ref={replaceInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => handleSelectImage(e, 'replace')}
            />

            {replacementPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-white/20 h-52">
                <img src={replacementPreview} alt="New Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => replaceInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1 rounded-lg bg-black/80 text-brand-green text-xs font-bold"
                >
                  Change Selection
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-gray-400">Current Photo:</div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 h-36">
                  <img src={replacingImageInfo.currentUrl} alt="Current" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-gray-300 text-[10px] font-mono">
                    Current {replacingImageInfo.stage}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => replaceInputRef.current?.click()}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-white/20 hover:border-brand-green/50 bg-black/40 flex items-center justify-center gap-2 text-xs font-bold text-white transition-colors"
                >
                  <Upload className="w-4 h-4 text-brand-green" />
                  <span>Choose Replacement Image from Phone/PC</span>
                </button>
              </div>
            )}

            <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setReplacingImageInfo(null);
                  setReplacementPreview('');
                  setReplacementFile(null);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!replacementFile || isReplacing}
                onClick={handleConfirmReplaceImage}
                className="px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue disabled:opacity-40 flex items-center gap-2"
              >
                {isReplacing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Confirm Replacement</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL 3: DELETE PROJECT CONFIRMATION
          ============================================================== */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-red-500/30 max-w-md w-full relative shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Delete Project?</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">"{projectToDelete.title || projectToDelete.category}"</strong>? This will remove all associated stage photos from the gallery.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold text-xs hover:bg-white/20 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Project</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL 4: IMAGE ZOOM PREVIEW
          ============================================================== */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={zoomedImage.url} 
              alt={zoomedImage.title} 
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10" 
            />
            <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
              <div>
                <span className="font-bold text-white">{zoomedImage.title}</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-white/10 text-[10px] uppercase font-mono">{zoomedImage.stage}</span>
              </div>
              <button 
                onClick={() => setZoomedImage(null)}
                className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL 5: ADMINISTRATOR AUTHENTICATION (SUPABASE LOGIN)
          ============================================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/20 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setLoginError('');
                setForgotError('');
                setForgotSuccess('');
                setLoginModalView('login');
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {loginModalView === 'login' ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/30 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Administrator Login</h3>
                    <p className="text-xs text-gray-400">Authenticate for Row-Level Security (RLS) write access</p>
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4 text-xs pt-1">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                      Administrator Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="thembelaandrew@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-gray-400 font-bold uppercase text-[10px]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginModalView('forgot_password');
                          setForgotEmail(loginEmail);
                          setForgotError('');
                          setForgotSuccess('');
                        }}
                        className="text-[10px] text-brand-green hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">
                      Target UUID: <code className="text-brand-green">{AUTHORIZED_ADMIN_UUID.slice(0, 8)}...</code>
                    </span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setLoginError('');
                          setLoginModalView('login');
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold hover:bg-white/20"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="px-5 py-2 rounded-xl bg-brand-green text-black font-bold hover:bg-brand-blue disabled:opacity-50 flex items-center gap-2 transition-colors"
                      >
                        {loginLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <span>Sign In</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* FORGOT PASSWORD VIEW IN MODAL */
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/30 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Reset Administrator Password</h3>
                    <p className="text-xs text-gray-400">Receive a secure link to set your new password</p>
                  </div>
                </div>

                {forgotSuccess && (
                  <div className="p-3.5 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Recovery Email Sent</span>
                      <p className="mt-0.5 text-gray-300 leading-relaxed text-[11px]">{forgotSuccess}</p>
                    </div>
                  </div>
                )}

                {forgotError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <form onSubmit={handleSendForgotPassword} className="space-y-4 text-xs pt-1">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                      Registered Administrator Email
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="thembelaandrew@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                      required
                      autoFocus
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                      Supabase Auth will dispatch a time-limited recovery link directing to the dedicated password update page.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginModalView('login');
                        setForgotError('');
                        setForgotSuccess('');
                      }}
                      className="text-xs text-brand-green hover:underline font-semibold"
                    >
                      &larr; Back to Sign In
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setLoginModalView('login');
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold hover:bg-white/20"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="px-5 py-2 rounded-xl bg-brand-green text-black font-bold hover:bg-brand-blue disabled:opacity-50 flex items-center gap-2 transition-colors"
                      >
                        {forgotLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending Link...</span>
                          </>
                        ) : (
                          <span>Send Recovery Link</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification (replaces window.alert) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`p-4 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-[#0f1f12]/95 border-brand-green/40 text-brand-green'
              : toast.type === 'error'
                ? 'bg-[#251010]/95 border-red-500/40 text-red-300'
                : 'bg-[#141414]/95 border-white/20 text-gray-200'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-brand-green mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 shrink-0 text-brand-blue mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <span className="font-bold block capitalize text-white mb-0.5">
                {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Notice' : 'Information'}
              </span>
              <p className="leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-white p-1 rounded"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
