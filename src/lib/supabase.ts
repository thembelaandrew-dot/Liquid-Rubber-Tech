import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GalleryProject, galleryData } from '../data';

// Standard 7 categories specified in project brief
export const ALLOWED_CATEGORIES = [
  'Roof Restoration',
  'Waterproofing & Restoration',
  'Painting & Restoration',
  'Epoxy & Flooring',
  'Property Finishing & Renovation',
  'Plumbing & Bathroom Restoration',
  'Paving'
] as const;

export type AllowedCategory = typeof ALLOWED_CATEGORIES[number];

// Authorized Administrator UUIDs
export const MAINTAINER_ADMIN_UUID = '55acb5d8-b8ff-447a-b09d-33bf621bceca'; // Thembela Andrew (Technical Maintainer & Developer)
export const CLIENT_ADMIN_UUID = '1e0b310c-dd9a-4c35-a120-b1dcc5f77b23';     // Liquid Rubber Tech Client Administrator

// Backward compatibility export for single-UUID references
export const AUTHORIZED_ADMIN_UUID = MAINTAINER_ADMIN_UUID;

// Whitelist of authorized administrator UUIDs (both maintainer and client admin)
export const AUTHORIZED_ADMIN_UUIDS: readonly string[] = [
  MAINTAINER_ADMIN_UUID, // Thembela Andrew (Technical Maintainer & Developer)
  CLIENT_ADMIN_UUID,     // Liquid Rubber Tech Client Administrator
];

export interface AdminRoleInfo {
  name: string;
  role: string;
  initials: string;
  isClient: boolean;
  isMaintainer: boolean;
}

export function getAdminRoleInfo(userId?: string | null): AdminRoleInfo {
  if (userId === CLIENT_ADMIN_UUID) {
    return {
      name: 'Liquid Rubber Tech',
      role: 'Administrator',
      initials: 'LRT',
      isClient: true,
      isMaintainer: false,
    };
  }
  if (userId === MAINTAINER_ADMIN_UUID) {
    return {
      name: 'Thembela Andrew',
      role: 'Technical Maintainer & Developer',
      initials: 'TA',
      isClient: false,
      isMaintainer: true,
    };
  }
  return {
    name: 'Administrator',
    role: 'Authorized Administrator',
    initials: 'LRT',
    isClient: false,
    isMaintainer: false,
  };
}

export function isAuthorizedAdmin(userId?: string | null): boolean {
  if (!userId) return false;
  return AUTHORIZED_ADMIN_UUIDS.includes(userId);
}

export interface DbProject {
  id: string;
  title?: string | null;
  category: string;
  display_type: 'single' | 'sequence';
  is_published?: boolean;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface DbImage {
  id: string;
  project_id: string;
  stage: 'Before' | 'During' | 'After' | 'Combined' | 'Final';
  storage_path: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

// Stage ranking to enforce strict transformation sequence order
const STAGE_RANK: Record<string, number> = {
  'Before': 1,
  'During': 2,
  'After': 3,
  'Combined': 1,
  'Final': 2,
};

/**
 * Standard RFC4122 v4 compliant UUID generator for PostgreSQL compatibility
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Retrieve configuration from env vars or localStorage fallback
export function getSupabaseConfig(): { url: string; anonKey: string } {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  // Local storage fallback allows client to connect before updating Netlify environment variables
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('lrt_supabase_url') || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('lrt_supabase_key') || '' : '';

  const rawUrl = (envUrl || localUrl || '').trim();
  const cleanUrl = rawUrl.replace(/\/+$/, '');
  const cleanKey = (envKey || localKey || '').trim();

  return {
    url: cleanUrl,
    anonKey: cleanKey,
  };
}

let supabaseInstance: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    return null;
  }

  if (!supabaseInstance || lastUrl !== url || lastKey !== anonKey) {
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    lastUrl = url;
    lastKey = anonKey;
  }

  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}

export function saveManualSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lrt_supabase_url', url.trim());
    localStorage.setItem('lrt_supabase_key', anonKey.trim());
    supabaseInstance = null; // force re-instantiation
  }
}

export function clearManualSupabaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lrt_supabase_url');
    localStorage.removeItem('lrt_supabase_key');
    supabaseInstance = null;
  }
}

/**
 * Authentication Helpers for Administrator Login / Session Management
 */
export async function signInAdmin(email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials missing. Please configure URL and Anon key in Settings.' };
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login request failed.' };
  }
}

export async function signOutAdmin(): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { success: true };
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getCurrentUser(): Promise<any | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user || null;
  } catch {
    return null;
  }
}

/**
 * Send Password Recovery Email via Supabase Auth resetPasswordForEmail()
 */
export async function sendPasswordResetEmail(
  email: string,
  redirectTo?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials missing. Please configure URL and Anon key in Settings.' };
  }

  try {
    const redirectUrl = redirectTo || (typeof window !== 'undefined' && window.location?.origin
      ? `${window.location.origin}/admin/update-password`
      : '/admin/update-password');

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send password recovery email.' };
  }
}

/**
 * Save New Password for the authenticated recovery user via supabase.auth.updateUser()
 */
export async function updateAdminPassword(newPassword: string): Promise<{ success: boolean; user?: any; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials missing. Please configure URL and Anon key in Settings.' };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update password.' };
  }
}

export interface ConnectionDiagnostics {
  connected: boolean;
  clientInitialized: boolean;
  dbAccessible: boolean;
  dbMessage: string;
  storageAccessible: boolean;
  storageMessage: string;
  authStatus: 'unauthenticated' | 'authenticated' | 'error';
  authUserEmail?: string;
  authUserId?: string;
  isAuthorizedAdmin: boolean;
  authMessage: string;
}

export async function testSupabaseConnection(): Promise<ConnectionDiagnostics> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      connected: false,
      clientInitialized: false,
      dbAccessible: false,
      dbMessage: 'Supabase client not initialized. Missing URL or Anon key.',
      storageAccessible: false,
      storageMessage: 'Storage client not initialized.',
      authStatus: 'unauthenticated',
      isAuthorizedAdmin: false,
      authMessage: 'Client not configured.',
    };
  }

  // 1. Test Auth Session
  let authStatus: 'unauthenticated' | 'authenticated' | 'error' = 'unauthenticated';
  let authUserEmail: string | undefined;
  let authUserId: string | undefined;
  let isAuthorizedAdmin = false;
  let authMessage = '';

  try {
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData?.user) {
      authStatus = 'unauthenticated';
      authMessage = 'Unauthenticated (Anon mode). RLS policies require signing in with an authorized administrator account to insert/edit/delete.';
    } else {
      authStatus = 'authenticated';
      authUserEmail = authData.user.email;
      authUserId = authData.user.id;
      isAuthorizedAdmin = AUTHORIZED_ADMIN_UUIDS.includes(authData.user.id);
      const role = getAdminRoleInfo(authData.user.id);
      authMessage = isAuthorizedAdmin
        ? `Authenticated as ${role.name} (${role.role} - ${authData.user.email}). Matches authorized administrator UUID.`
        : `Authenticated as ${authData.user.email} (${authData.user.id}), but database requires an authorized administrator UUID (${AUTHORIZED_ADMIN_UUIDS.join(', ')}).`;
    }
  } catch (err: any) {
    authStatus = 'error';
    authMessage = `Auth verification failed: ${err.message}`;
  }

  // 2. Test DB Read
  let dbAccessible = false;
  let dbMessage = '';
  try {
    const { data, error } = await supabase
      .from('gallery_projects')
      .select('id, title, is_published')
      .limit(5);

    if (error) {
      dbAccessible = false;
      dbMessage = `Database query error: ${error.message} (Code: ${error.code || 'unknown'})`;
    } else {
      dbAccessible = true;
      dbMessage = `Connected to public.gallery_projects. (${data?.length || 0} visible records)`;
    }
  } catch (err: any) {
    dbAccessible = false;
    dbMessage = `Database network error: ${err.message}`;
  }

  // 3. Test Storage Bucket
  let storageAccessible = false;
  let storageMessage = '';
  try {
    const { error } = await supabase.storage
      .from('gallery-images')
      .list('', { limit: 1 });

    if (error) {
      storageAccessible = false;
      storageMessage = `Storage bucket error: ${error.message}`;
    } else {
      storageAccessible = true;
      storageMessage = `Connected to bucket 'gallery-images'. Ready for uploads.`;
    }
  } catch (err: any) {
    storageAccessible = false;
    storageMessage = `Storage check failed: ${err.message}`;
  }

  return {
    connected: dbAccessible,
    clientInitialized: true,
    dbAccessible,
    dbMessage,
    storageAccessible,
    storageMessage,
    authStatus,
    authUserEmail,
    authUserId,
    isAuthorizedAdmin,
    authMessage,
  };
}

/**
 * Fetch all published projects and their images.
 * Queries Supabase when configured, ensures correct sequence order, fallback titles,
 * and seamlessly includes local demo/preview projects with is_published = true.
 */
export async function fetchPublishedProjects(): Promise<GalleryProject[]> {
  const supabase = getSupabase();
  const projectsMap = new Map<string, GalleryProject>();

  // 1. Fetch from Supabase if configured
  if (supabase) {
    try {
      const { data: projects, error: projectsError } = await supabase
        .from('gallery_projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.warn('Supabase projects query returned error:', projectsError.message);
      } else if (projects && projects.length > 0) {
        const projectIds = projects.map(p => p.id);
        const { data: images, error: imagesError } = await supabase
          .from('gallery_images')
          .select('*')
          .in('project_id', projectIds)
          .order('display_order', { ascending: true });

        if (imagesError) {
          console.warn('Supabase images query returned error:', imagesError.message);
        }

        projects.forEach(p => {
          // Fallback title to category if title is empty or omitted
          const effectiveTitle = p.title?.trim() || p.category || 'Featured Work';
          projectsMap.set(p.id, {
            id: p.id,
            category: p.category,
            title: effectiveTitle,
            type: (p.display_type as 'single' | 'sequence') || 'sequence',
            images: [],
          });
        });

        if (images && images.length > 0) {
          images.forEach(img => {
            const proj = projectsMap.get(img.project_id);
            if (proj) {
              // Ensure valid public URL
              let imageUrl = img.image_url;
              if (!imageUrl && img.storage_path) {
                const { data } = supabase.storage.from('gallery-images').getPublicUrl(img.storage_path);
                imageUrl = data.publicUrl;
              }
              if (imageUrl) {
                proj.images.push({
                  stage: (img.stage as any) || 'Combined',
                  url: imageUrl,
                });
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn('Error fetching projects from Supabase:', err);
    }
  }

  // 2. Also check local storage (lrt_demo_projects) for any published items created in the dashboard
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('lrt_demo_projects');
      if (saved) {
        const localItems = JSON.parse(saved);
        if (Array.isArray(localItems)) {
          localItems.forEach((p: any) => {
            // Only published projects
            if (p.is_published === true && !projectsMap.has(String(p.id))) {
              const isOriginalStatic = galleryData.some(g => String(g.id) === String(p.id));
              if (!isOriginalStatic && p.images && p.images.length > 0) {
                projectsMap.set(String(p.id), {
                  id: p.id,
                  category: p.category,
                  title: p.title?.trim() || p.category || 'Featured Work',
                  type: p.display_type || (p.images.length > 1 ? 'sequence' : 'single'),
                  images: p.images.map((img: any) => ({
                    stage: img.stage || 'Combined',
                    url: img.url,
                  })),
                });
              }
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not read local projects storage:', e);
    }
  }

  // 3. Format and enforce strict sequence ordering for every project
  const result: GalleryProject[] = [];
  projectsMap.forEach(proj => {
    if (proj.images.length > 0) {
      // Sort images: Before (1) -> During (2) -> After (3)
      proj.images.sort((a, b) => (STAGE_RANK[a.stage] || 99) - (STAGE_RANK[b.stage] || 99));
      result.push(proj);
    }
  });

  return result;
}

/**
 * Generate a unique file name for safe storage
 */
export function generateSafeFileName(originalName: string, prefix: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}.${cleanExt}`;
}

/**
 * Upload an image file to Supabase Storage bucket 'gallery-images'
 */
export async function uploadImageFile(file: File, path: string): Promise<{ publicUrl: string; storagePath: string } | null> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase is not configured.');

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    throw new Error(`Invalid file type "${file.type}". Please upload JPG, PNG, or WebP images.`);
  }

  // Validate size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`Image file "${file.name}" exceeds 10MB (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 10MB.`);
  }

  const { error: uploadError } = await supabase.storage
    .from('gallery-images')
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Storage upload failed to gallery-images/${path}: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(path);

  return {
    publicUrl: urlData.publicUrl,
    storagePath: path,
  };
}

/**
 * Delete an image file from Supabase Storage
 */
export async function deleteImageFile(path: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase.storage.from('gallery-images').remove([path]);
  if (error) {
    console.warn(`Failed to delete storage file ${path}:`, error.message);
    return false;
  }
  return true;
}

export interface SaveProjectPayload {
  title?: string;
  category: AllowedCategory;
  displayType: 'single' | 'sequence';
  isPublished: boolean;
  singleFile?: File | null;
  singlePreview?: string;
  beforeFile?: File | null;
  beforePreview?: string;
  duringFile?: File | null;
  duringPreview?: string;
  afterFile?: File | null;
  afterPreview?: string;
}

export interface SaveProjectResult {
  success: boolean;
  projectId: string;
  savedToSupabase: boolean;
  isPublished: boolean;
  message: string;
  error?: string;
  details?: {
    dbProjectCreated?: boolean;
    storageFilesUploaded?: number;
    dbImagesLinked?: number;
  };
}

/**
 * Unified helper: Genuinely persists a project to Supabase with proper sequence,
 * parent/child atomicity, rollback on failure, and explicit error reporting.
 */
export async function createAndSaveProject(payload: SaveProjectPayload): Promise<SaveProjectResult> {
  const supabase = getSupabase();
  const effectiveTitle = payload.title?.trim() || payload.category;
  const projectId = generateUUID();

  // 1. Check Supabase Configuration
  if (!supabase) {
    return {
      success: false,
      projectId: '',
      savedToSupabase: false,
      isPublished: payload.isPublished,
      message: '',
      error: 'Supabase credentials missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be provided in environment variables or in Settings & Status before submitting.',
    };
  }

  // 2. Check Supabase Authentication (Required by strict RLS policies)
  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user;

  if (authError || !user) {
    return {
      success: false,
      projectId: '',
      savedToSupabase: false,
      isPublished: payload.isPublished,
      message: '',
      error: 'Supabase Authentication Required: The database Row-Level Security (RLS) policies require an authenticated administrator session. Please sign in with your email and password via the Admin Login panel or Settings before saving.',
    };
  }

  if (!isAuthorizedAdmin(user.id)) {
    return {
      success: false,
      projectId: '',
      savedToSupabase: false,
      isPublished: payload.isPublished,
      message: '',
      error: `Access Denied: The authenticated account (${user.email}) has user ID ${user.id}, which is not an authorized administrator for Liquid Rubber Tech.`,
    };
  }

  // 3. Validate image files exist as original browser File objects
  if (payload.displayType === 'single') {
    if (!payload.singleFile) {
      return {
        success: false,
        projectId: '',
        savedToSupabase: false,
        isPublished: payload.isPublished,
        message: '',
        error: 'A showcase image file (JPG, PNG, or WebP) is required.',
      };
    }
  } else {
    if (!payload.beforeFile || !payload.afterFile) {
      return {
        success: false,
        projectId: '',
        savedToSupabase: false,
        isPublished: payload.isPublished,
        message: '',
        error: 'Both "Before" and "After" image files are required for a transformation sequence.',
      };
    }
  }

  const uploadedStoragePaths: string[] = [];
  let dbProjectCreated = false;

  try {
    // 4. Step 1: Insert parent project record into public.gallery_projects
    // foreign key user_id references auth.users(id)
    const { error: projErr } = await supabase
      .from('gallery_projects')
      .insert({
        id: projectId,
        title: effectiveTitle,
        category: payload.category,
        display_type: payload.displayType,
        user_id: user.id,
        is_published: payload.isPublished,
      });

    if (projErr) {
      const isRlsError = projErr.code === '42501' || projErr.message?.toLowerCase().includes('row-level security');
      const rlsHint = isRlsError
        ? ` — Row Level Security violation: Current authenticated UID (${user.id}) is not among the authorized administrator accounts.`
        : '';
      return {
        success: false,
        projectId,
        savedToSupabase: false,
        isPublished: payload.isPublished,
        message: '',
        error: `Database project insertion failed (public.gallery_projects): ${projErr.message}${rlsHint} (Code: ${projErr.code || 'unknown'})`,
      };
    }

    dbProjectCreated = true;

    // 5. Step 2: Upload images to Supabase Storage bucket 'gallery-images' under 'projects/{projectId}/...'
    const imageRows: any[] = [];
    const localProjectImages: any[] = [];

    if (payload.displayType === 'single' && payload.singleFile) {
      const filename = generateSafeFileName(payload.singleFile.name, 'combined');
      const storagePath = `projects/${projectId}/${filename}`;
      const uploadRes = await uploadImageFile(payload.singleFile, storagePath);
      if (!uploadRes) {
        throw new Error('Failed to obtain public URL for uploaded single image.');
      }
      uploadedStoragePaths.push(storagePath);

      imageRows.push({
        project_id: projectId,
        stage: 'Combined',
        storage_path: uploadRes.storagePath,
        image_url: uploadRes.publicUrl,
        display_order: 1,
      });
      localProjectImages.push({
        id: `${projectId}-1`,
        stage: 'Combined',
        url: uploadRes.publicUrl,
        storage_path: uploadRes.storagePath,
      });
    } else {
      // Sequence: Before
      if (payload.beforeFile) {
        const filename = generateSafeFileName(payload.beforeFile.name, 'before');
        const storagePath = `projects/${projectId}/${filename}`;
        const uploadRes = await uploadImageFile(payload.beforeFile, storagePath);
        if (!uploadRes) throw new Error('Failed to obtain URL for Before image.');
        uploadedStoragePaths.push(storagePath);

        imageRows.push({
          project_id: projectId,
          stage: 'Before',
          storage_path: uploadRes.storagePath,
          image_url: uploadRes.publicUrl,
          display_order: 1,
        });
        localProjectImages.push({
          id: `${projectId}-before`,
          stage: 'Before',
          url: uploadRes.publicUrl,
          storage_path: uploadRes.storagePath,
        });
      }

      // Sequence: During (Optional)
      if (payload.duringFile) {
        const filename = generateSafeFileName(payload.duringFile.name, 'during');
        const storagePath = `projects/${projectId}/${filename}`;
        const uploadRes = await uploadImageFile(payload.duringFile, storagePath);
        if (!uploadRes) throw new Error('Failed to obtain URL for During image.');
        uploadedStoragePaths.push(storagePath);

        imageRows.push({
          project_id: projectId,
          stage: 'During',
          storage_path: uploadRes.storagePath,
          image_url: uploadRes.publicUrl,
          display_order: 2,
        });
        localProjectImages.push({
          id: `${projectId}-during`,
          stage: 'During',
          url: uploadRes.publicUrl,
          storage_path: uploadRes.storagePath,
        });
      }

      // Sequence: After
      if (payload.afterFile) {
        const filename = generateSafeFileName(payload.afterFile.name, 'after');
        const storagePath = `projects/${projectId}/${filename}`;
        const uploadRes = await uploadImageFile(payload.afterFile, storagePath);
        if (!uploadRes) throw new Error('Failed to obtain URL for After image.');
        uploadedStoragePaths.push(storagePath);

        imageRows.push({
          project_id: projectId,
          stage: 'After',
          storage_path: uploadRes.storagePath,
          image_url: uploadRes.publicUrl,
          display_order: 3,
        });
        localProjectImages.push({
          id: `${projectId}-after`,
          stage: 'After',
          url: uploadRes.publicUrl,
          storage_path: uploadRes.storagePath,
        });
      }
    }

    // 6. Step 3: Insert child records into public.gallery_images
    if (imageRows.length > 0) {
      const { error: imgsErr } = await supabase
        .from('gallery_images')
        .insert(imageRows);

      if (imgsErr) {
        throw new Error(`Database child record creation failed (public.gallery_images): ${imgsErr.message}`);
      }
    }

    // 7. Update local storage cache so it reflects immediately in the dashboard
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lrt_demo_projects');
        const existing = saved ? JSON.parse(saved) : [];
        const newProj = {
          id: projectId,
          title: effectiveTitle,
          category: payload.category,
          display_type: payload.displayType,
          is_published: payload.isPublished,
          created_at: new Date().toISOString().split('T')[0],
          views: 0,
          images: localProjectImages,
        };
        localStorage.setItem('lrt_demo_projects', JSON.stringify([newProj, ...existing]));
      } catch (e) {
        console.warn('Could not update localStorage cache:', e);
      }
    }

    const actionText = payload.isPublished ? 'published to live gallery' : 'saved as draft';

    return {
      success: true,
      projectId,
      savedToSupabase: true,
      isPublished: payload.isPublished,
      message: `Project "${effectiveTitle}" successfully ${actionText} in Supabase! It is safely persisted with ${imageRows.length} image(s) in bucket gallery-images.`,
      details: {
        dbProjectCreated: true,
        storageFilesUploaded: uploadedStoragePaths.length,
        dbImagesLinked: imageRows.length,
      },
    };

  } catch (err: any) {
    // ATOMIC ROLLBACK: Clean up uploaded files and project row so no orphaned objects remain
    console.error('Project submission failed, executing rollback:', err);

    if (uploadedStoragePaths.length > 0) {
      try {
        await supabase.storage.from('gallery-images').remove(uploadedStoragePaths);
      } catch (cleanupErr) {
        console.error('Storage rollback error:', cleanupErr);
      }
    }

    if (dbProjectCreated) {
      try {
        await supabase.from('gallery_projects').delete().eq('id', projectId);
      } catch (cleanupErr) {
        console.error('Database project rollback error:', cleanupErr);
      }
    }

    return {
      success: false,
      projectId,
      savedToSupabase: false,
      isPublished: payload.isPublished,
      message: '',
      error: err.message || 'Unknown error occurred while persisting project to Supabase.',
    };
  }
}

/**
 * Update the publish status of a project in Supabase and local cache
 */
export async function updateProjectPublishStatus(projectId: string, isPublished: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase client not configured.' };
  }

  try {
    const { error } = await supabase
      .from('gallery_projects')
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId);

    if (error) {
      return { success: false, error: `Update failed: ${error.message} (Code: ${error.code || 'unknown'})` };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }

  // Update in local storage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('lrt_demo_projects');
      if (saved) {
        const list = JSON.parse(saved);
        const updated = list.map((p: any) => p.id === projectId ? { ...p, is_published: isPublished } : p);
        localStorage.setItem('lrt_demo_projects', JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Failed to update local storage publish status:', e);
    }
  }

  return { success: true };
}

/**
 * Delete a project from Supabase database and storage with cascade
 */
export async function deleteProjectFromSupabase(projectId: string, storagePaths: string[]): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false, error: 'Supabase client not configured.' };

  try {
    // 1. Remove storage files
    if (storagePaths && storagePaths.length > 0) {
      const validPaths = storagePaths.filter(p => Boolean(p && !p.startsWith('http') && !p.startsWith('blob:')));
      if (validPaths.length > 0) {
        await supabase.storage.from('gallery-images').remove(validPaths);
      }
    }

    // 2. Delete project from DB (ON DELETE CASCADE removes gallery_images)
    const { error } = await supabase
      .from('gallery_projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      return { success: false, error: `Database deletion failed: ${error.message} (Code: ${error.code || 'unknown'})` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Replace an image in Supabase Storage and update public.gallery_images record
 */
export async function replaceProjectImage(
  projectId: string,
  imageId: string,
  stage: string,
  newFile: File,
  oldStoragePath?: string
): Promise<{ success: boolean; newUrl?: string; newStoragePath?: string; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false, error: 'Supabase client not configured.' };

  try {
    const filename = generateSafeFileName(newFile.name, stage.toLowerCase());
    const newStoragePath = `projects/${projectId}/${filename}`;
    const uploadRes = await uploadImageFile(newFile, newStoragePath);
    if (!uploadRes) throw new Error('Could not upload replacement image.');

    const { error: updateErr } = await supabase
      .from('gallery_images')
      .update({
        storage_path: uploadRes.storagePath,
        image_url: uploadRes.publicUrl,
      })
      .eq('id', imageId);

    if (updateErr) {
      // Rollback newly uploaded file
      await deleteImageFile(uploadRes.storagePath);
      return { success: false, error: `Image update failed: ${updateErr.message}` };
    }

    // Remove old storage file if present and not external
    if (oldStoragePath && !oldStoragePath.startsWith('http') && !oldStoragePath.startsWith('blob:')) {
      await deleteImageFile(oldStoragePath);
    }

    return {
      success: true,
      newUrl: uploadRes.publicUrl,
      newStoragePath: uploadRes.storagePath,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
