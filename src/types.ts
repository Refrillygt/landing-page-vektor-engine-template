export interface User {
  id: string;
  email: string;
  name: string;
  plan?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export type BillingInterval = 'monthly' | 'annual';

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  priceIdMonthly: string;
  priceIdAnnual: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'zap' | 'shield' | 'cpu' | 'layers' | 'activity' | 'database';
  tag: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metric: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CheckoutSessionRequest {
  priceId: string;
  planName: string;
  billingInterval: BillingInterval;
}
