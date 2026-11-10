import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  ArrowLeft, 
  ShieldCheck, 
  Send,
  KeyRound
} from 'lucide-react';
import SEO from '../components/SEO';
import { 
  getSupabase, 
  isSupabaseConfigured, 
  updateAdminPassword, 
  sendPasswordResetEmail,
  isAuthorizedAdmin,
  getAdminRoleInfo,
  AUTHORIZED_ADMIN_UUIDS
} from '../lib/supabase';

export default function AdminResetPassword() {
  const navigate = useNavigate();

  // Authentication & Recovery state
  const [authChecking, setAuthChecking] = useState(true);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryUser, setRecoveryUser] = useState<any | null>(null);

  // Form states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fallback request recovery state if user arrived without valid token
  const [fallbackEmail, setFallbackEmail] = useState('');
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackSuccess, setFallbackSuccess] = useState('');
  const [fallbackError, setFallbackError] = useState('');

  // Detect Supabase PASSWORD_RECOVERY event & active session
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage('Supabase is not configured. Please supply your Supabase URL and Anon Key in Settings.');
      setAuthChecking(false);
      return;
    }

    // 1. Check existing session on mount (Supabase-js automatically parses URL hash/code on load)
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Session query error:', error.message);
      }
      if (session?.user) {
        setRecoveryUser(session.user);
        setIsRecoveryMode(true);
      }
      setAuthChecking(false);
    });

    // 2. Explicitly listen for the PASSWORD_RECOVERY auth event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryMode(true);
        setRecoveryUser(session?.user || null);
        setErrorMessage('');
      } else if (event === 'SIGNED_IN' && session?.user) {
        setIsRecoveryMode(true);
        setRecoveryUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setIsRecoveryMode(false);
        setRecoveryUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handler: Update Password using supabase.auth.updateUser({ password })
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and re-type.');
      return;
    }

    setIsSubmitting(true);
    const res = await updateAdminPassword(newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage('Administrator password has been updated successfully! You can now sign in with your new password.');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setErrorMessage(res.error || 'Failed to update password. Your recovery link may have expired or is invalid.');
    }
  };

  // Handler: Proceed to Login cleanly
  const handleProceedToLogin = async () => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error before redirect:', e);
      }
    }
    navigate('/admin/gallery?login=true');
  };

  // Handler: Request a new recovery email
  const handleRequestRecoveryEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setFallbackError('');
    setFallbackSuccess('');
    setFallbackLoading(true);

    const res = await sendPasswordResetEmail(fallbackEmail);
    setFallbackLoading(false);

    if (res.success) {
      setFallbackSuccess(`Password recovery email sent to ${fallbackEmail}. Please check your inbox and click the link.`);
    } else {
      setFallbackError(res.error || 'Could not send recovery email.');
    }
  };

  const isAuthorized = isAuthorizedAdmin(recoveryUser?.id);
  const roleInfo = getAdminRoleInfo(recoveryUser?.id);

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <SEO 
        title="Set New Administrator Password | Liquid Rubber Tech"
        description="Secure password recovery and update portal for Liquid Rubber Tech Gallery Administration."
        url="https://liquidrubbertech.co.za/admin/update-password"
      />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 mx-auto group">
            <img 
              src="https://i.imgur.com/96Q9RnA.jpeg" 
              alt="Liquid Rubber Tech Logo" 
              className="h-10 w-10 rounded-full ring-2 ring-brand-green/40 object-cover group-hover:ring-brand-green transition-all"
            />
            <div className="text-left">
              <span className="font-display font-bold text-base text-white tracking-wide block leading-none">
                Liquid Rubber Tech
              </span>
              <span className="text-[10px] text-brand-green font-semibold tracking-wider uppercase">
                Gallery Administration
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-display font-bold text-white tracking-tight pt-2">
            Administrator Password Recovery
          </h1>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Set a new secure password for your Supabase administrator account to manage projects under Row-Level Security (RLS).
          </p>
        </div>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 shadow-2xl space-y-5">
          
          {/* Loading state */}
          {authChecking && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-brand-green" />
              <p className="text-xs text-gray-400">Verifying secure recovery token...</p>
            </div>
          )}

          {/* Error Message */}
          {!authChecking && errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Update Failed</span>
                <p className="mt-0.5 text-red-300 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {!authChecking && successMessage && (
            <div className="p-4 sm:p-5 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <h4 className="font-bold text-sm text-white">Password Updated!</h4>
                <p className="text-gray-300 leading-relaxed">{successMessage}</p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleProceedToLogin}
                    className="px-4 py-2 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors text-center shadow-md shadow-brand-green/20"
                  >
                    Sign In with New Password
                  </button>
                  <button
                    onClick={() => navigate('/admin/gallery')}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-xs text-center"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE RECOVERY SESSION: PASSWORD UPDATE FORM */}
          {!authChecking && isRecoveryMode && !successMessage && (
            <form onSubmit={handlePasswordUpdate} className="space-y-4 text-xs">
              
              {/* Account identity verification badge */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Account:</span>
                  <span className="text-white font-mono font-bold">{recoveryUser?.email || roleInfo.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-brand-green font-semibold">{roleInfo.role}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Administrator UUID:</span>
                  <span className={`font-mono text-[10px] ${isAuthorized ? 'text-brand-green font-bold' : 'text-yellow-400'}`}>
                    {recoveryUser?.id ? `${recoveryUser.id.slice(0, 12)}...` : 'Verified Admin'}
                  </span>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-brand-green font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticated for Password Update</span>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                  New Password <span className="text-brand-green">* Minimum 6 chars</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green pr-10"
                    required
                    minLength={6}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                  required
                  minLength={6}
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Updating Password in Supabase...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Save New Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* NO ACTIVE RECOVERY TOKEN: FALLBACK LINK REQUEST */}
          {!authChecking && !isRecoveryMode && !successMessage && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">No Active Recovery Session</span>
                  <p className="mt-0.5 text-yellow-200/90 leading-relaxed text-[11px]">
                    To set a new password, you need to open the recovery link sent to your administrator email address.
                  </p>
                </div>
              </div>

              {fallbackSuccess && (
                <div className="p-3 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{fallbackSuccess}</span>
                </div>
              )}

              {fallbackError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fallbackError}</span>
                </div>
              )}

              <form onSubmit={handleRequestRecoveryEmail} className="space-y-3 text-xs pt-1">
                <div>
                  <label className="block text-gray-400 font-bold mb-1.5 uppercase text-[10px]">
                    Administrator Email Address
                  </label>
                  <input
                    type="email"
                    value={fallbackEmail}
                    onChange={(e) => setFallbackEmail(e.target.value)}
                    placeholder="Enter your administrator email"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={fallbackLoading}
                  className="w-full py-2.5 rounded-xl bg-brand-green text-black font-bold text-xs hover:bg-brand-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {fallbackLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Recovery Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Recovery Link</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Navigation Link back to Admin Dashboard */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <Link
              to="/admin/gallery"
              className="text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Portal</span>
            </Link>

            <span className="text-[10px] text-gray-500 font-mono">
              Authorized Portal
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
