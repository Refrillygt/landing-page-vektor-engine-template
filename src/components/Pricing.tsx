import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BillingInterval, PricingTier } from '../types';

interface PricingProps {
  onSelectPlan: (tier: PricingTier, interval: BillingInterval) => void;
  loadingPriceId: string | null;
  checkoutError: string | null;
}

export const Pricing: React.FC<PricingProps> = ({
  onSelectPlan,
  loadingPriceId,
  checkoutError,
}) => {
  const [interval, setInterval] = useState<BillingInterval>('annual');

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 39,
      annualPrice: 29,
      priceIdMonthly: 'price_starter_monthly_39',
      priceIdAnnual: 'price_starter_annual_29',
      description: 'Ideal for early-stage teams and startup backend infrastructure.',
      features: [
        'Up to 10M events per month',
        '2 active cluster nodes',
        '100ms log retention audit',
        'Standard email support (24h SLA)',
        'Community Slack channel access',
      ],
      ctaText: 'Start 14-Day Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'RECOMMENDED',
      monthlyPrice: 99,
      annualPrice: 79,
      priceIdMonthly: 'price_pro_monthly_99',
      priceIdAnnual: 'price_pro_annual_79',
      description: 'High-throughput production engine for scaling engineering organizations.',
      features: [
        'Up to 250M events per month',
        '12 active high-availability nodes',
        '30-day deterministic state replay',
        '99.99% uptime SLA guarantee',
        'Priority 24/7 incident response (15m SLA)',
        'Dedicated SOC2 compliance reports',
        'Custom OpenTelemetry connectors',
      ],
      isPopular: true,
      ctaText: 'Deploy Pro Cluster',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 299,
      annualPrice: 249,
      priceIdMonthly: 'price_ent_monthly_299',
      priceIdAnnual: 'price_ent_annual_249',
      description: 'Dedicated bare-metal instances, VPC peering, and custom compliance.',
      features: [
        'Unlimited event throughput',
        'Dedicated multi-region clusters',
        'Infinite log replay storage',
        '99.999% uptime SLA with financial backing',
        'Dedicated Solutions Engineer',
        'Custom SSO (SAML/Okta/OIDC)',
        'On-premise hybrid cloud deployments',
      ],
      ctaText: 'Contact Enterprise Team',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0A0A0C] border-t border-[#141622] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono text-[#5C6BC0] tracking-wider uppercase mb-3">
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#F0F4F8] tracking-tight mb-4">
            Predictable cost scaling. No hidden bandwidth surcharges.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Choose the throughput tier that fits your pipeline workload. Switch or upgrade anytime.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center bg-[#10121A] border border-[#1E202C] rounded-full p-1">
            <button
              onClick={() => setInterval('monthly')}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                interval === 'monthly' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="pricing-toggle-monthly"
            >
              Monthly Billing
              {interval === 'monthly' && (
                <motion.div
                  layoutId="pricingInterval"
                  className="absolute inset-0 bg-[#1E2130] rounded-full -z-10 border border-[#2D3142]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => setInterval('annual')}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                interval === 'annual' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="pricing-toggle-annual"
            >
              Annual Billing
              <span className="text-[10px] font-mono font-semibold bg-[#5C6BC0]/20 text-[#7B8BE3] border border-[#5C6BC0]/40 px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
              {interval === 'annual' && (
                <motion.div
                  layoutId="pricingInterval"
                  className="absolute inset-0 bg-[#1E2130] rounded-full -z-10 border border-[#2D3142]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Error notification if Stripe checkout failed */}
        {checkoutError && (
          <div className="max-w-xl mx-auto mb-8 bg-rose-950/60 border border-rose-800 text-rose-200 text-sm p-4 rounded-lg text-center">
            {checkoutError}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const price = interval === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            const priceId = interval === 'annual' ? tier.priceIdAnnual : tier.priceIdMonthly;
            const isLoading = loadingPriceId === priceId;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.isPopular
                    ? 'bg-[#12141F] border-2 border-[#5C6BC0] shadow-xl shadow-[#5C6BC0]/10'
                    : 'bg-[#10121A] border border-[#1E202C] hover:border-[#2D3142]'
                }`}
                id={`pricing-card-${tier.id}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5C6BC0] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-[#F0F4F8]">{tier.name}</h3>
                  </div>

                  <p className="text-sm text-zinc-400 min-h-[40px] mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-[#F0F4F8] font-mono tracking-tight">
                      ${price}
                    </span>
                    <span className="text-zinc-400 text-sm ml-2 font-medium">
                      / month {interval === 'annual' ? '(billed yearly)' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono text-zinc-400 font-semibold tracking-wider uppercase">
                      INCLUDED CAPABILITIES:
                    </div>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#5C6BC0] shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm text-zinc-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  onClick={() => onSelectPlan(tier, interval)}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    tier.isPopular
                      ? 'bg-[#5C6BC0] hover:bg-[#4C5BA0] text-white shadow-md'
                      : 'bg-[#181A26] hover:bg-[#222536] text-zinc-200 border border-[#2B2E40]'
                  } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                  id={`pricing-cta-${tier.id}`}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Connecting to Stripe...</span>
                    </>
                  ) : (
                    <>
                      <span>{tier.ctaText}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Security & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-[#141622] flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Stripe SSL 256-Bit Encrypted Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#5C6BC0]">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Cancel or Switch Tiers Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-400">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>SOC2 Type II Certified Data Centers</span>
          </div>
        </div>

      </div>
    </section>
  );
};
