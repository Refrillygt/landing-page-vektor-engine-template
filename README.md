# Vektor Engine — Production SaaS Platform

Vektor Engine is a production-ready, high-throughput SaaS landing page and interactive event streaming telemetry dashboard. Designed for infrastructure engineers, it provides a low-latency event streaming engine experience complete with real-time cluster monitoring, JWT httpOnly cookie authentication, and Stripe subscription payment integration.

---

## 🚀 Key Features

### 🎨 Visual & Motion Design

- **Dark Mode Architecture**: Base background (`#0A0A0C`) with cold white typography (`#F0F4F8`) and an electric indigo accent (`#5C6BC0`).
- **Framer Motion Integration**: Staggered word reveals on hero load, scroll-triggered section entrances, micro-interactions, layout transitions on billing toggles, and `AnimatePresence` FAQ accordions.
- **Anime.js Graphic Drawing**: Live SVG topology line-drawing animation on page load and a smooth, continuous horizontal marquee carousel for client testimonials.
- **Responsive Layout**: Designed for all device sizes, featuring a scroll-aware blurred navbar and mobile drawer menu.

### 🔐 Authentication & Security

- **JWT httpOnly Cookie Auth**: Server-side JWT token generation stored safely in `httpOnly` cookies (protecting against XSS token leakage).
- **Inline Form Validation**: Immediate error feedback for missing fields or weak passwords with password visibility toggle.
- **Protected Console Dashboard**: Secure route accessing live cluster throughput telemetry, active node partition matrices, and production API key management.
- **Demo Credentials**: One-click demo login (`demo@vektor.io` / `password123`).

### 💳 Stripe Checkout Integration

- **Subscription Tiers**: Starter ($29/mo), Pro ($79/mo), and Enterprise ($249/mo) with monthly and annual billing toggles (20% discount calculations).
- **Stripe Session API**: Direct integration with `@stripe/stripe-js` and the official Node `stripe` SDK to create server-side Stripe Checkout sessions.
- **Fallback Simulation Mode**: Robust sandbox fallback when running in local development without live Stripe keys.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons
- **Animations**: Framer Motion (`motion/react`), Anime.js
- **Backend**: Express.js (Node.js full-stack container), `tsx` (Dev), `esbuild` (Prod CJS bundle)
- **Security & Payments**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `@stripe/stripe-js`, `stripe`

---

## 💻 How to Install and Run on Your Local Computer

Follow these step-by-step instructions to get the application running locally on your machine.

### Prerequisites

Ensure you have the following installed on your laptop:

1. **Node.js**: Version 18.x or higher (Download at [nodejs.org](https://nodejs.org/))
2. **npm** (comes bundled with Node.js) or **yarn** / **pnpm**
3. **Git**: For cloning the repository

---

### Step 1: Clone or Extract the Repository

Open your terminal (Terminal on macOS/Linux, PowerShell or Command Prompt on Windows) and run:

```bash
git clone <your-repository-url>
cd vektor-engine
```

_(If you downloaded a ZIP archive, extract the contents to a folder and `cd` into that directory)._

---

### Step 2: Install Dependencies

Run `npm install` to download all client and server npm dependencies:

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create a local environment configuration file `.env.local` or `.env` in the root of your project directory:

```bash
cp .env.example .env
```

Open `.env` in your text editor (VS Code, Sublime, etc.) and configure the following:

```env
# Optional: Live Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# App Hosting Base URL
APP_URL="http://localhost:3000"

# Stripe API Keys (Optional — sandbox mode will activate automatically if omitted)
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_sample_key"
STRIPE_SECRET_KEY="sk_test_sample_key"

# JWT Cookie Signing Secret Key
JWT_SECRET="vektor_engine_super_secret_jwt_key_2026"
```

---

### Step 4: Run the Local Development Server

Start the full-stack Express + Vite development server by running:

```bash
npm run dev
```

You will see output similar to:

```bash
Vektor Engine server listening on http://0.0.0.0:3000
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

### Step 5: Building for Production Deployment

To test a production build on your laptop:

1. **Build the application**:

    ```bash
    npm run build
    ```

    This compiles the React frontend into static assets in `dist/` and bundles the Express server into `dist/server.cjs` using `esbuild`.

2. **Start the production server**:

    ```bash
    npm run start
    ```

3. Open **`http://localhost:3000`** in your browser to verify the production build.

---

## 📁 Project Structure

```
├── .env.example             # Documented environment variables
├── README.md                # Project documentation and setup guide
├── server.ts                # Express backend (Auth, Stripe API routes, Vite middleware)
├── metadata.json            # AI Studio applet configuration
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── src/
    ├── main.tsx             # Entry point
    ├── App.tsx              # Main application coordinator
    ├── index.css            # Tailwind CSS & global styles
    ├── types.ts             # Global TypeScript interfaces
    ├── hooks/
    │   ├── useAuth.ts       # Custom hook for JWT auth state management
    │   ├── useStripeCheckout.ts # Custom hook for Stripe Checkout sessions
    │   └── useScrollAware.ts# Custom hook for scroll-triggered navigation
    └── components/
        ├── Navbar.tsx       # Scroll-aware navigation bar
        ├── Hero.tsx         # Staggered hero section with SVG line animation
        ├── Features.tsx     # 6-card architectural advantages grid
        ├── Pricing.tsx      # Pricing table with billing toggle & Stripe CTA
        ├── Testimonials.tsx # Continuous Anime.js marquee carousel
        ├── FAQ.tsx          # AnimatePresence accordion component
        ├── Footer.tsx       # Multi-column footer & social links
        ├── AuthModal.tsx    # Sign In / Create Account modal
        ├── ProtectedDashboard.tsx # Protected cluster telemetry console
        └── StripeSuccessNotice.tsx # Stripe payment notification banner
```

---

## 🛡️ License

Licensed under the Apache 2.0 License.

AI
