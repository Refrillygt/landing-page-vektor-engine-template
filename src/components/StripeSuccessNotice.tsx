import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const StripeSuccessNotice: React.FC = () => {
  const [notice, setNotice] = useState<{ plan: string; sessionId: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('payment_status');
    const plan = params.get('plan') || 'Pro Plan';
    const sessionId = params.get('session_id') || 'cs_test_mock';

    if (status === 'success') {
      setNotice({ plan, sessionId });
      // Clean query params from URL without reload
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  if (!notice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
        id="stripe-success-notice"
      >
        <div className="bg-[#0F1A15] border border-emerald-700/80 text-emerald-200 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-white">
                Stripe Subscription Activated!
              </div>
              <div className="text-xs font-mono text-emerald-300">
                Tier: {notice.plan} • Session: {notice.sessionId.substring(0, 16)}...
              </div>
            </div>
          </div>

          <button
            onClick={() => setNotice(null)}
            className="text-emerald-400 hover:text-white p-1 rounded hover:bg-emerald-950 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
