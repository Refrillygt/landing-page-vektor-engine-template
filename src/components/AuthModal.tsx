import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onSignup: (name: string, email: string, pass: string) => Promise<boolean>;
  error: string | null;
  isLoading: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLogin,
  onSignup,
  error,
  isLoading,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (mode === 'signup' && !name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Valid work email is required';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      const success = await onLogin(email, password);
      if (success) onClose();
    } else {
      const success = await onSignup(name, email, password);
      if (success) onClose();
    }
  };

  const handleUseDemoAccount = async () => {
    setEmail('demo@vektor.io');
    setPassword('password123');
    const success = await onLogin('demo@vektor.io', 'password123');
    if (success) onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#10121A] border border-[#222536] rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
          id="auth-modal-card"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-[#181A26] transition-colors"
            id="auth-modal-close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#181A26] border border-[#2D3142] flex items-center justify-center text-[#5C6BC0]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                </svg>
              </div>
              <span className="font-semibold text-sm tracking-wider text-[#F0F4F8]">
                VEKTOR<span className="text-[#5C6BC0]">.IO</span>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#F0F4F8]">
              {mode === 'login' ? 'Sign in to Vektor' : 'Create your trial account'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {mode === 'login'
                ? 'Access your event clusters and real-time streaming console.'
                : 'Get instant access to a 14-day free trial on our Pro cluster.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#0A0A0C] p-1 rounded-lg border border-[#1E202C] mb-6">
            <button
              onClick={() => {
                setMode('login');
                setFormErrors({});
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                mode === 'login'
                  ? 'bg-[#181A26] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="auth-tab-login"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setFormErrors({});
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                mode === 'signup'
                  ? 'bg-[#181A26] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="auth-tab-signup"
            >
              Create Account
            </button>
          </div>

          {/* Server / Auth Error Alert */}
          {error && (
            <div className="mb-4 bg-rose-950/60 border border-rose-800 text-rose-200 text-xs p-3 rounded-lg flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-[#0A0A0C] border ${
                    formErrors.name ? 'border-rose-500' : 'border-[#222536] focus:border-[#5C6BC0]'
                  } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors`}
                  id="auth-input-name"
                />
                {formErrors.name && (
                  <p className="text-[11px] text-rose-400 mt-1 font-mono">{formErrors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                Work Email Address
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#0A0A0C] border ${
                  formErrors.email ? 'border-rose-500' : 'border-[#222536] focus:border-[#5C6BC0]'
                } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors`}
                id="auth-input-email"
              />
              {formErrors.email && (
                <p className="text-[11px] text-rose-400 mt-1 font-mono">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-[#0A0A0C] border ${
                    formErrors.password ? 'border-rose-500' : 'border-[#222536] focus:border-[#5C6BC0]'
                  } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors pr-10`}
                  id="auth-input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs font-mono"
                  id="auth-toggle-password-visibility"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-[11px] text-rose-400 mt-1 font-mono">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-[#5C6BC0] hover:bg-[#4C5BA0] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 mt-2 shadow-md shadow-[#5C6BC0]/20 ${
                isLoading ? 'opacity-80 cursor-wait' : ''
              }`}
              id="auth-submit-btn"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In to Console' : 'Complete Registration'}</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Button */}
          <div className="mt-6 pt-4 border-t border-[#181A26]">
            <button
              onClick={handleUseDemoAccount}
              className="w-full py-2 bg-[#161824] hover:bg-[#1C1F30] border border-[#272A3C] text-zinc-300 text-xs font-mono rounded-lg transition-colors flex items-center justify-center gap-2"
              id="auth-demo-fill-btn"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Fill Demo Credentials (demo@vektor.io)</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-zinc-500 mt-4 font-mono">
            Secured with HTTP-Only JWT Cookie Authentication
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
