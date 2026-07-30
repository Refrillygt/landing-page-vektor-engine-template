import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollAware } from '../hooks/useScrollAware';
import { User } from '../types';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  user: User | null;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  user,
  onOpenDashboard,
  onLogout,
}) => {
  const { isScrolled, activeSection } = useScrollAware();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#1A1C26] py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-2.5 group"
            id="nav-logo"
          >
            <div className="w-8 h-8 rounded-md bg-[#161824] border border-[#2D3142] flex items-center justify-center transition-colors group-hover:border-[#5C6BC0]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#5C6BC0]"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-wider text-[#F0F4F8]">
              VEKTOR<span className="text-[#5C6BC0] font-normal">.IO</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 border border-[#1E202C] bg-[#10121A]/80 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-[#F0F4F8]' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#5C6BC0] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenDashboard}
                  className="text-xs font-mono bg-[#161824] border border-[#2A2E40] text-zinc-200 px-3 py-2 rounded-lg hover:border-[#5C6BC0] transition-colors flex items-center gap-2"
                  id="nav-user-dashboard"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{user.name.split(' ')[0]}'s Workspace</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs font-medium text-zinc-400 hover:text-zinc-200 px-2 py-1.5 transition-colors"
                  id="nav-logout-btn"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 transition-colors"
                  id="nav-login-btn"
                >
                  Log in
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenAuth('signup')}
                  className="text-sm font-medium bg-[#5C6BC0] hover:bg-[#4C5BA0] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                  id="nav-signup-btn"
                >
                  Start Free Trial
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#1E202C] text-zinc-300 hover:text-white bg-[#10121A]"
            aria-label="Toggle Navigation Menu"
            id="nav-mobile-hamburger"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#1E202C] bg-[#0A0A0C]/98 backdrop-blur-xl px-4 pt-3 pb-6"
            id="nav-mobile-menu"
          >
            <div className="flex flex-col space-y-3 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-medium text-zinc-300 hover:text-white py-2 px-3 rounded-lg hover:bg-[#161824]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-[#1E202C] flex flex-col gap-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="w-full text-center py-2.5 rounded-lg bg-[#161824] border border-[#2D3142] text-zinc-200 font-medium text-sm"
                  >
                    Open Workspace
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-center py-2.5 text-zinc-400 hover:text-zinc-200 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full text-center py-2.5 rounded-lg border border-[#1E202C] text-zinc-200 font-medium text-sm"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="w-full text-center py-2.5 rounded-lg bg-[#5C6BC0] text-white font-medium text-sm"
                  >
                    Start Free Trial
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
