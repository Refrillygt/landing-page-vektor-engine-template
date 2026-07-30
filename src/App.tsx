import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useStripeCheckout } from './hooks/useStripeCheckout';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProtectedDashboard } from './components/ProtectedDashboard';
import { StripeSuccessNotice } from './components/StripeSuccessNotice';
import { BillingInterval, PricingTier } from './types';

export default function App() {
  const { user, isAuthenticated, isLoading: authLoading, error: authError, login, signup, logout } = useAuth();
  const { checkout, loadingPriceId, checkoutError } = useStripeCheckout();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectPlan = async (tier: PricingTier, interval: BillingInterval) => {
    // If not authenticated, open signup modal first
    if (!isAuthenticated) {
      handleOpenAuth('signup');
      return;
    }

    // Call Stripe checkout backend endpoint
    const priceId = interval === 'annual' ? tier.priceIdAnnual : tier.priceIdMonthly;
    await checkout(priceId, tier.name, interval);
  };

  const handleOpenDashboard = () => {
    setView('dashboard');
  };

  const handleReturnToLanding = () => {
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E2E8F0] selection:bg-[#5C6BC0] selection:text-white relative">
      <StripeSuccessNotice />

      <Navbar
        onOpenAuth={handleOpenAuth}
        user={user}
        onOpenDashboard={handleOpenDashboard}
        onLogout={logout}
      />

      {view === 'dashboard' && user ? (
        <ProtectedDashboard
          user={user}
          onLogout={() => {
            logout();
            setView('landing');
          }}
          onReturnToLanding={handleReturnToLanding}
        />
      ) : (
        <main>
          <Hero onStartTrial={() => handleOpenAuth('signup')} />
          <Features />
          <Pricing
            onSelectPlan={handleSelectPlan}
            loadingPriceId={loadingPriceId}
            checkoutError={checkoutError}
          />
          <Testimonials />
          <FAQ />
        </main>
      )}

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
        error={authError}
        isLoading={authLoading}
      />
    </div>
  );
}
