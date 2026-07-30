import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { BillingInterval } from '../types';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample_key';
const stripePromise = loadStripe(publishableKey);

export function useStripeCheckout() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const checkout = async (priceId: string, planName: string, billingInterval: BillingInterval) => {
    setLoadingPriceId(priceId);
    setCheckoutError(null);

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, planName, billingInterval }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment checkout.');
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.sessionId && stripePromise) {
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await (stripe as any).redirectToCheckout({ sessionId: data.sessionId });
          if (error) {
            setCheckoutError(error.message || 'Stripe redirect error');
          }
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || 'Payment server unreachable');
    } finally {
      setLoadingPriceId(null);
    }
  };

  return {
    checkout,
    loadingPriceId,
    checkoutError,
  };
}
