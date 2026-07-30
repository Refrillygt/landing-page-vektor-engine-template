import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'vektor_engine_super_secret_jwt_key_2026';

// Middleware
app.use(express.json());
app.use(cookieParser());

// In-memory store for demo users & subscriptions
interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  plan?: string;
  createdAt: string;
}

const usersDb: Map<string, StoredUser> = new Map();

// Seed initial demo user
const seedDemoUser = async () => {
  const hash = await bcrypt.hash('password123', 10);
  usersDb.set('demo@vektor.io', {
    id: 'usr_demo_8932',
    email: 'demo@vektor.io',
    name: 'Alex Vance',
    passwordHash: hash,
    plan: 'Pro Plan (Annual)',
    createdAt: new Date().toISOString(),
  });
};
seedDemoUser();

// Lazy Stripe initialization
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  if (!stripeClient && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_sample_key') {
    try {
      stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24' as Stripe.LatestApiVersion,
      });
    } catch (e) {
      console.warn('Stripe SDK initialization notice:', e);
    }
  }
  return stripeClient;
}

// ==========================================
// AUTHENTICATION ROUTES (JWT + httpOnly Cookie)
// ==========================================

// Helper to sign JWT and set cookie
function setAuthCookie(res: Response, user: { id: string; email: string; name: string; plan?: string }) {
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, plan: user.plan },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
}

// POST /api/auth/signup
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (usersDb.has(normalizedEmail)) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: StoredUser = {
      id: `usr_${Math.random().toString(36).substring(2, 10)}`,
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
      plan: 'Starter Plan',
      createdAt: new Date().toISOString(),
    };

    usersDb.set(normalizedEmail, newUser);

    setAuthCookie(res, {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      plan: newUser.plan,
    });

    return res.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        plan: newUser.plan,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error during signup.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let existingUser = usersDb.get(normalizedEmail);

    // If demo credentials attempt
    if (!existingUser && (normalizedEmail === 'demo@vektor.io' || normalizedEmail === 'user@example.com')) {
      const hash = await bcrypt.hash(password, 10);
      existingUser = {
        id: 'usr_demo_auto',
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        passwordHash: hash,
        plan: 'Pro Plan (Annual)',
        createdAt: new Date().toISOString(),
      };
      usersDb.set(normalizedEmail, existingUser);
    }

    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    setAuthCookie(res, {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      plan: existingUser.plan,
    });

    return res.json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        plan: existingUser.plan,
        createdAt: existingUser.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userInDb = usersDb.get(decoded.email);

    return res.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        plan: userInDb?.plan || decoded.plan || 'Free Tier',
      },
    });
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid or expired session.' });
  }
});

// POST /api/auth/logout
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('token', { path: '/' });
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// STRIPE INTEGRATION ROUTES
// ==========================================

// POST /api/stripe/create-checkout-session
app.post('/api/stripe/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { priceId, planName, billingInterval } = req.body;
    const host = req.headers.host || 'localhost:3000';
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = `${protocol}://${host}`;

    const stripe = getStripe();

    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${baseUrl}/?payment_status=success&session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(
            planName
          )}`,
          cancel_url: `${baseUrl}/?payment_status=cancelled`,
        });

        return res.json({ url: session.url, sessionId: session.id });
      } catch (stripeError: any) {
        console.warn('Stripe checkout error fallback to demo mode:', stripeError.message);
      }
    }

    // Fallback sandbox simulation URL when standard API key isn't provisioned or for testing
    const mockSessionId = `cs_demo_${Math.random().toString(36).substring(2, 12)}`;
    const redirectUrl = `${baseUrl}/?payment_status=success&session_id=${mockSessionId}&plan=${encodeURIComponent(
      planName || 'Pro Tier'
    )}&interval=${billingInterval || 'annual'}`;

    return res.json({
      url: redirectUrl,
      sessionId: mockSessionId,
      isDemo: true,
      message: 'Demo checkout session generated successfully.',
    });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Failed to initiate checkout.' });
  }
});

// POST /api/stripe/webhook
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const stripe = getStripe();

  if (stripe && process.env.STRIPE_WEBHOOK_SECRET && sig) {
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('Stripe Webhook Event Received:', event.type);
      return res.json({ received: true });
    } catch (err: any) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  // Demo fallback
  return res.json({ received: true, demo: true });
});

// ==========================================
// SERVER INITIALIZATION & VITE MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vektor Engine server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
