# 🔥 ELITE TEMPLATE OVERHAUL DIRECTIVE

**Mission**: Transform 30+ generic templates into jaw-dropping, premium designs that make people say "SHUT UP AND TAKE MY MONEY"

**Time Budget**: 4-6 hours autonomous execution  
**Target Quality**: Linear, Vercel, Stripe, Raycast level  
**Value Created**: Templates worth $500-1000 each  

---

## ⚡ BRUTAL REALITY CHECK

### What We Have (Trash Tier)

Looking at `template-renderer.tsx` and `templates-data.ts`:

```
❌ Using system-ui, -apple-system fonts (BORING)
❌ Flat linear gradients from 2015
❌ Zero glassmorphism or depth
❌ Basic color schemes like:
   - professional: '#1e3a5f', '#2c5282' (corporate snooze)
   - modern: '#6366f1', '#8b5cf6' (generic purple)
   - warm: '#dc2626', '#f97316' (ketchup & mustard)
❌ No floating elements or parallax
❌ Simple hover:scale-105 (everyone does this)
❌ White/light backgrounds (dated look)
❌ Stats section is just colored boxes
❌ Testimonials carousel is basic
❌ CTA buttons don't GLOW
❌ No animated gradient backgrounds
❌ No micro-interactions that delight
❌ Mobile menu slides in like it's 2018
```

### What We Need (S-Tier Premium)

```
✅ Space Grotesk / Manrope / Satoshi fonts (DISTINCTIVE)
✅ Dark mode FIRST with proper depth layers
✅ Glassmorphic cards with blur + gradient borders
✅ Animated gradient orbs floating in background
✅ Grid/dot patterns as subtle overlays
✅ Gradient text on headlines that SHIMMER
✅ CTAs with glow effects that PULSE
✅ Stats with animated counters + sparkle effects
✅ Testimonials with gradient avatar rings
✅ Navigation with backdrop-blur + pill indicators
✅ Scroll-triggered reveals that feel EXPENSIVE
✅ Bento grid layouts (not boring 3-column)
✅ 3D tilt effects on card hover
✅ Noise texture overlays for premium feel
```

---

## 🎯 DESIGN DNA: STEAL LIKE AN ARTIST

### Study These Sites OBSESSIVELY

| Site | What to Steal |
|------|---------------|
| **Linear.app** | Dark theme, navigation blur, gradient cards, keyboard shortcut badges |
| **Vercel.com** | Hero typography, animated gradients, trust badges, clean spacing |
| **Stripe.com** | Stats presentation, gradient mesh backgrounds, pricing tables |
| **Raycast.com** | Glassmorphism, command bar aesthetic, purple accents |
| **Resend.com** | Minimal dark UI, email-like aesthetic, subtle animations |
| **Railway.app** | Purple gradients, neon accents, dev-focused aesthetic |
| **Planetscale.com** | Green accents, database aesthetic, animated illustrations |
| **Liveblocks.io** | Collaborative cursor animations, real-time indicators |
| **Cal.com** | Clean scheduling UI, gradient buttons, testimonial cards |
| **Dub.co** | Link shortener aesthetic, analytics visualizations |

---

## 🏗️ PHASE 1: FOUNDATION OVERHAUL (90 min)

### 1.1 Install Premium Fonts

```powershell
cd template-maker-main/template-maker-main
npm install @fontsource-variable/space-grotesk @fontsource-variable/inter clsx tailwind-merge framer-motion
```

### 1.2 Replace `globals.css` COMPLETELY

**File**: `src/app/globals.css`

Replace the ENTIRE file with:

```css
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/inter';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================
   ELITE DESIGN SYSTEM
   ======================================== */

:root {
  /* TYPOGRAPHY - Premium Stack */
  --font-display: 'Space Grotesk Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  
  /* FLUID TYPOGRAPHY SCALE */
  --text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem);
  --text-base: clamp(1rem, 0.95rem + 0.4vw, 1.1rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.3rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.8rem + 2vw, 3.5rem);
  --text-5xl: clamp(3rem, 2.2rem + 3vw, 4.5rem);
  --text-6xl: clamp(3.75rem, 2.5rem + 4vw, 6rem);
  --text-hero: clamp(4rem, 3rem + 5vw, 8rem);
  
  /* LETTER SPACING */
  --tracking-tighter: -0.04em;
  --tracking-tight: -0.02em;
  --tracking-normal: -0.01em;
  --tracking-wide: 0.02em;
  
  /* DARK MODE COLORS (Premium Default) */
  --bg-base: #000000;
  --bg-surface: #0A0A0A;
  --bg-elevated: #111111;
  --bg-muted: #1A1A1A;
  --bg-subtle: #222222;
  
  --text-primary: #FAFAFA;
  --text-secondary: #A1A1A1;
  --text-muted: #666666;
  --text-subtle: #444444;
  
  /* ACCENT COLORS */
  --accent-violet: #8B5CF6;
  --accent-fuchsia: #D946EF;
  --accent-cyan: #22D3EE;
  --accent-emerald: #10B981;
  --accent-amber: #F59E0B;
  --accent-rose: #F43F5E;
  
  /* PREMIUM GRADIENTS */
  --gradient-primary: linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #F43F5E 100%);
  --gradient-secondary: linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%);
  --gradient-subtle: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(217, 70, 239, 0.15) 100%);
  --gradient-mesh: radial-gradient(at 40% 20%, hsla(270, 90%, 60%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(330, 80%, 50%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 90%, 50%, 0.2) 0px, transparent 50%);
  
  /* BORDERS */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);
  --border-accent: rgba(139, 92, 246, 0.5);
  
  /* SHADOWS */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  --shadow-glow-violet: 0 0 60px rgba(139, 92, 246, 0.5);
  --shadow-glow-fuchsia: 0 0 60px rgba(217, 70, 239, 0.5);
  --shadow-glow-cyan: 0 0 60px rgba(34, 211, 238, 0.4);
  
  /* BLUR VALUES */
  --blur-sm: 4px;
  --blur-md: 8px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  
  /* ANIMATION EASINGS */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
}

/* ========================================
   BASE STYLES
   ======================================== */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  letter-spacing: var(--tracking-normal);
  color: var(--text-primary);
  background-color: var(--bg-base);
}

/* ========================================
   PREMIUM TYPOGRAPHY UTILITIES
   ======================================== */

.font-display {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
}

.font-display-bold {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: var(--tracking-tighter);
}

.text-balance {
  text-wrap: balance;
}

/* GRADIENT TEXT - The Money Maker */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-animated {
  background: linear-gradient(
    90deg,
    #8B5CF6 0%,
    #D946EF 25%,
    #F43F5E 50%,
    #D946EF 75%,
    #8B5CF6 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s linear infinite;
}

.gradient-text-white {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ========================================
   GLASSMORPHISM UTILITIES
   ======================================== */

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(var(--blur-lg));
  -webkit-backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--border-subtle);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(var(--blur-xl));
  -webkit-backdrop-filter: blur(var(--blur-xl));
  border: 1px solid var(--border-default);
}

.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(var(--blur-lg));
  -webkit-backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--border-subtle);
  border-radius: 1.5rem;
}

.glass-card-hover {
  transition: all 0.4s var(--ease-out-expo);
}

.glass-card-hover:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  border-color: var(--border-strong);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* GRADIENT BORDER EFFECT */
.gradient-border {
  position: relative;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: var(--gradient-primary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
}

.gradient-border:hover::before {
  opacity: 1;
}

/* ========================================
   BACKGROUND PATTERNS
   ======================================== */

.bg-grid {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.bg-dots {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

.bg-noise {
  position: relative;
}

.bg-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

/* ========================================
   GLOW EFFECTS
   ======================================== */

.glow-violet {
  box-shadow: var(--shadow-glow-violet);
}

.glow-fuchsia {
  box-shadow: var(--shadow-glow-fuchsia);
}

.glow-cyan {
  box-shadow: var(--shadow-glow-cyan);
}

.glow-text {
  text-shadow: 0 0 40px currentColor;
}

/* BUTTON GLOW ON HOVER */
.btn-glow {
  position: relative;
  overflow: hidden;
  transition: all 0.3s var(--ease-out-expo);
}

.btn-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-primary);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s var(--ease-out-expo);
  z-index: -1;
}

.btn-glow:hover::before {
  opacity: 0.6;
}

.btn-glow:hover {
  transform: translateY(-2px);
}

/* ========================================
   ANIMATIONS
   ======================================== */

@keyframes gradient-flow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-2deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-morph {
  animation: morph 8s ease-in-out infinite;
}

/* ========================================
   PREMIUM BUTTON STYLES
   ======================================== */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  color: white;
  background: var(--gradient-primary);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-primary);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s var(--ease-out-expo);
  z-index: -1;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
}

.btn-primary:hover::before {
  opacity: 0.6;
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

/* ========================================
   SECTION SPACING SYSTEM
   ======================================== */

.section-padding {
  padding-top: clamp(4rem, 8vw, 8rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
}

.section-padding-lg {
  padding-top: clamp(6rem, 12vw, 12rem);
  padding-bottom: clamp(6rem, 12vw, 12rem);
}

.container-narrow {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.container-default {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.container-wide {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s var(--ease-out-expo);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
.reveal-delay-5 { transition-delay: 0.5s; }

/* ========================================
   REDUCED MOTION
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### 1.3 Update Tailwind Config

**File**: `tailwind.config.ts`

Replace with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk Variable', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: '#000000',
        surface: '#0A0A0A',
        elevated: '#111111',
        muted: '#1A1A1A',
        subtle: '#222222',
        accent: {
          violet: '#8B5CF6',
          fuchsia: '#D946EF',
          cyan: '#22D3EE',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 40px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.6)',
        'glow-xl': '0 0 80px rgba(139, 92, 246, 0.7)',
      },
      animation: {
        'gradient': 'gradient-flow 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(270, 90%, 60%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(330, 80%, 50%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 90%, 50%, 0.2) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 🏗️ PHASE 2: CREATE PREMIUM COMPONENTS (60 min)

### 2.1 Create Premium Effects Library

**File**: `src/lib/premium-effects.ts` (CREATE NEW)

```typescript
import { Variants } from 'framer-motion';

// ========================================
// ANIMATION VARIANTS
// ========================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// ========================================
// HOVER EFFECTS
// ========================================

export const cardHover3D = {
  rest: { 
    scale: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const linkHover = {
  rest: { x: 0 },
  hover: { 
    x: 4,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// ========================================
// SPECIAL EFFECTS
// ========================================

export const floatingAnimation = {
  y: [0, -20, 0],
  rotate: [0, 2, -2, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const pulseGlow = {
  opacity: [0.5, 0.8, 0.5],
  scale: [1, 1.05, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const rotatingGradient = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const glassMorphism = (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
  const intensities = {
    light: { bg: 0.03, blur: 12, border: 0.06 },
    medium: { bg: 0.05, blur: 16, border: 0.1 },
    strong: { bg: 0.08, blur: 24, border: 0.15 }
  };
  
  const { bg, blur, border } = intensities[intensity];
  
  return {
    background: `rgba(255, 255, 255, ${bg})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${border})`
  };
};

export const gradientText = (
  gradient: 'primary' | 'secondary' | 'white' = 'primary'
) => {
  const gradients = {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #F43F5E 100%)',
    secondary: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
    white: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)'
  };
  
  return {
    background: gradients[gradient],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
};

export const glowEffect = (color: 'violet' | 'fuchsia' | 'cyan' = 'violet') => {
  const colors = {
    violet: 'rgba(139, 92, 246, 0.5)',
    fuchsia: 'rgba(217, 70, 239, 0.5)',
    cyan: 'rgba(34, 211, 238, 0.4)'
  };
  
  return {
    boxShadow: `0 0 60px ${colors[color]}`
  };
};
```

---

### 2.2 Create GlassCard Component

**File**: `src/components/ui/GlassCard.tsx` (CREATE NEW)

```typescript
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover3D } from '@/lib/premium-effects';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glow';
  hover?: boolean;
  className?: string;
}

export function GlassCard({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}: GlassCardProps) {
  
  const baseStyles = `
    relative overflow-hidden rounded-3xl p-8
    backdrop-blur-xl border transition-all duration-500
  `;
  
  const variantStyles = {
    default: 'bg-white/[0.03] border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/[0.08]',
    glow: 'bg-white/[0.03] border-white/[0.08] hover:shadow-glow'
  };

  return (
    <motion.div
      variants={hover ? cardHover3D : undefined}
      initial="rest"
      whileHover={hover ? "hover" : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(217, 70, 239, 0.5) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
```

---

### 2.3 Create PremiumButton Component

**File**: `src/components/ui/PremiumButton.tsx` (CREATE NEW)

```typescript
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function PremiumButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  glow = true,
  icon,
  iconPosition = 'right',
  className = '',
  ...props 
}: PremiumButtonProps) {
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5'
  };
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose
      text-white font-semibold
      hover:shadow-glow-lg
    `,
    secondary: `
      bg-white/[0.05] border border-white/[0.1]
      text-white font-medium
      hover:bg-white/[0.08] hover:border-white/[0.15]
    `,
    ghost: `
      bg-transparent
      text-white/70 font-medium
      hover:text-white hover:bg-white/[0.05]
    `
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative inline-flex items-center justify-center
        rounded-full overflow-hidden
        font-display tracking-tight
        transition-all duration-300
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Glow effect */}
      {glow && variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  );
}
```

---

### 2.4 Create FloatingOrbs Component

**File**: `src/components/ui/FloatingOrbs.tsx` (CREATE NEW)

```typescript
'use client';

import { motion } from 'framer-motion';

interface FloatingOrbsProps {
  variant?: 'hero' | 'section' | 'subtle';
}

export function FloatingOrbs({ variant = 'hero' }: FloatingOrbsProps) {
  const configs = {
    hero: [
      { size: 'w-[600px] h-[600px]', color: 'bg-accent-violet/20', position: 'top-0 left-1/4', delay: 0, duration: 15 },
      { size: 'w-[500px] h-[500px]', color: 'bg-accent-fuchsia/15', position: 'bottom-0 right-1/4', delay: 2, duration: 18 },
      { size: 'w-[400px] h-[400px]', color: 'bg-accent-cyan/10', position: 'top-1/2 right-0', delay: 4, duration: 20 },
    ],
    section: [
      { size: 'w-[400px] h-[400px]', color: 'bg-accent-violet/15', position: 'top-1/4 left-0', delay: 0, duration: 12 },
      { size: 'w-[300px] h-[300px]', color: 'bg-accent-fuchsia/10', position: 'bottom-1/4 right-0', delay: 1, duration: 14 },
    ],
    subtle: [
      { size: 'w-[300px] h-[300px]', color: 'bg-accent-violet/10', position: 'top-0 right-1/4', delay: 0, duration: 10 },
      { size: 'w-[200px] h-[200px]', color: 'bg-accent-fuchsia/8', position: 'bottom-0 left-1/4', delay: 2, duration: 12 },
    ],
  };

  const orbs = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.color} ${orb.position} rounded-full blur-3xl`}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
```

---

### 2.5 Create GradientText Component

**File**: `src/components/ui/GradientText.tsx` (CREATE NEW)

```typescript
'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'white' | 'animated';
  className?: string;
}

export function GradientText({ 
  children, 
  variant = 'primary',
  className = '' 
}: GradientTextProps) {
  
  const gradientStyles = {
    primary: 'bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose',
    secondary: 'bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia',
    white: 'bg-gradient-to-b from-white to-white/50',
    animated: 'bg-gradient-to-r from-accent-violet via-accent-fuchsia via-accent-rose via-accent-fuchsia to-accent-violet bg-[length:200%_auto] animate-gradient',
  };

  return (
    <span 
      className={`
        ${gradientStyles[variant]}
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}
```

---

### 2.6 Create AnimatedSection Component

**File**: `src/components/ui/AnimatedSection.tsx` (CREATE NEW)

```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/premium-effects';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className = '',
  stagger = false,
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger ? staggerContainer : fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export animated child for use within staggered sections
export function AnimatedItem({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

### 2.7 Create UI Components Index

**File**: `src/components/ui/index.ts` (CREATE NEW)

```typescript
export { GlassCard } from './GlassCard';
export { PremiumButton } from './PremiumButton';
export { FloatingOrbs } from './FloatingOrbs';
export { GradientText } from './GradientText';
export { AnimatedSection, AnimatedItem } from './AnimatedSection';
export { AnimatedCounter } from './AnimatedCounter';
export { Carousel } from './Carousel';
export { Accordion } from './Accordion';
export { Modal } from './Modal';
```

---

## 🏗️ PHASE 3: TEMPLATE RENDERER TRANSFORMATION (120 min)

This is the BIG ONE. We're completely overhauling `src/components/template-renderer.tsx`.

### 3.1 Import Premium Components

At the top of `template-renderer.tsx`, update imports:

```typescript
'use client';

import { Template, CATEGORY_CONFIG } from '@/types/template';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PhoneIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  StarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Premium components
import { 
  GlassCard, 
  PremiumButton, 
  FloatingOrbs, 
  GradientText,
  AnimatedSection,
  AnimatedItem 
} from './ui';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { fadeInUp, staggerContainer, staggerItem, cardHover3D } from '@/lib/premium-effects';
```

### 3.2 Navigation Section - COMPLETE REPLACEMENT

Replace the entire navigation section with:

```tsx
{/* ========================================
    PREMIUM NAVIGATION
    ======================================== */}
<motion.nav
  className="fixed top-0 w-full z-50"
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  {/* Glassmorphic background */}
  <div 
    className={`
      absolute inset-0 transition-all duration-500
      ${scrolled 
        ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.08]' 
        : 'bg-transparent'
      }
    `}
  />
  
  <div className="relative max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      
      {/* Logo with glow effect */}
      <motion.a 
        href="#"
        className="group flex items-center gap-3 relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/20 to-accent-fuchsia/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="text-3xl relative z-10">{config.icon}</span>
        <span className="font-display font-bold text-xl text-white relative z-10 tracking-tight">
          {businessName}
        </span>
      </motion.a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {['Home', 'Services', 'About', 'Contact'].map((item, idx) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
            {/* Active indicator */}
            {idx === 0 && (
              <motion.div 
                layoutId="navIndicator"
                className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </div>

      {/* CTA Section */}
      <div className="hidden md:flex items-center gap-4">
        {phone && (
          <motion.a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05, x: 2 }}
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center">
              <PhoneIcon className="w-4 h-4" />
            </div>
            <span className="hidden lg:inline">{phone}</span>
          </motion.a>
        )}
        
        <PremiumButton variant="primary" size="sm">
          Get Started
          <ArrowRightIcon className="w-4 h-4" />
        </PremiumButton>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm"
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bars3Icon className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>

    {/* Premium Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden mt-4 pb-4 overflow-hidden"
        >
          <div className="p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            {['Home', 'Services', 'About', 'Contact'].map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="flex items-center justify-between p-4 text-white/80 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="font-medium">{item}</span>
                <ArrowRightIcon className="w-4 h-4 text-white/40" />
              </motion.a>
            ))}
          </div>
          
          {phone && (
            <motion.a
              href={`tel:${phone}`}
              className="flex items-center gap-3 p-4 mt-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-accent-violet/20 flex items-center justify-center">
                <PhoneIcon className="w-5 h-5 text-accent-violet" />
              </div>
              <div>
                <div className="text-xs text-white/50">Call us now</div>
                <div className="font-semibold">{phone}</div>
              </div>
            </motion.a>
          )}
          
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PremiumButton variant="primary" size="lg" className="w-full">
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </PremiumButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</motion.nav>
```

### 3.3 Hero Section - COMPLETE REPLACEMENT

Replace the entire hero section with:

```tsx
{/* ========================================
    PREMIUM HERO SECTION
    ======================================== */}
<section
  id="home"
  className="relative min-h-screen flex items-center overflow-hidden bg-base"
>
  {/* Background layers */}
  <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/5 via-base to-base" />
  <FloatingOrbs variant="hero" />
  <div className="absolute inset-0 bg-grid opacity-30" />
  <div className="absolute inset-0 bg-noise" />
  
  {/* Content */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Floating badge */}
      <motion.div variants={fadeInUp} className="mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm cursor-pointer group"
          whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)' }}
        >
          <SparklesIcon className="w-4 h-4 text-accent-violet animate-pulse" />
          <span className="text-sm text-white/60 font-medium">
            Trusted by <span className="text-white">10,000+</span> businesses worldwide
          </span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRightIcon className="w-4 h-4 text-white/40 group-hover:text-white/60" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Main headline */}
      <motion.h1 
        variants={fadeInUp}
        className="font-display font-bold tracking-tighter mb-6"
        style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05 }}
      >
        <GradientText variant="white">
          {businessName}
        </GradientText>
        <br />
        <GradientText variant="animated">
          {tagline}
        </GradientText>
      </motion.h1>
      
      {/* Subheadline */}
      <motion.p 
        variants={fadeInUp}
        className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Premium templates designed to convert visitors into customers. 
        Launch your stunning website in minutes, not months.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <PremiumButton variant="primary" size="lg" glow>
          Start Free Trial
          <ArrowRightIcon className="w-5 h-5" />
        </PremiumButton>
        
        <PremiumButton variant="secondary" size="lg">
          <PlayIcon className="w-5 h-5" />
          Watch Demo
        </PremiumButton>
      </motion.div>
      
      {/* Trust indicators */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/40"
      >
        {[
          { icon: CheckCircleIcon, text: 'No credit card required' },
          { icon: CheckCircleIcon, text: '14-day free trial' },
          { icon: CheckCircleIcon, text: 'Cancel anytime' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <item.icon className="w-5 h-5 text-emerald-400" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
  
  {/* Scroll indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
  >
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
        <motion.div
          className="w-1 h-2 rounded-full bg-white/40"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  </motion.div>
</section>
```

### 3.4 Stats Section - COMPLETE REPLACEMENT

```tsx
{/* ========================================
    PREMIUM STATS SECTION
    ======================================== */}
{sections.find(s => s.type === 'stats') && (
  <section className="relative py-24 bg-base overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-dots opacity-20" />
    <FloatingOrbs variant="subtle" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <AnimatedSection stagger>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(sections.find(s => s.type === 'stats')?.content as { stats: { value: string; label: string }[] })?.stats?.map((stat, idx) => {
            const { prefix, number, suffix } = parseStatValue(stat.value);
            const icons = [SparklesIcon, ShieldCheckIcon, BoltIcon];
            const colors = ['text-accent-violet', 'text-accent-fuchsia', 'text-accent-cyan'];
            const Icon = icons[idx % icons.length];
            
            return (
              <motion.div key={idx} variants={staggerItem}>
                <GlassCard variant="gradient" className="group">
                  {/* Icon */}
                  <div className={`mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-7 h-7 ${colors[idx % colors.length]}`} />
                  </div>
                  
                  {/* Number */}
                  <div className="mb-2">
                    <span className="font-display font-bold text-5xl tracking-tighter">
                      <GradientText variant="white">
                        {prefix}
                        <AnimatedCounter end={number} duration={2500} />
                        {suffix}
                      </GradientText>
                    </span>
                  </div>
                  
                  {/* Label */}
                  <p className="text-white/50 font-medium">{stat.label}</p>
                  
                  {/* Hover sparkle */}
                  <motion.div
                    className="absolute top-6 right-6 text-accent-violet opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <SparklesIcon className="w-5 h-5" />
                  </motion.div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  </section>
)}
```

---

## 🎯 PHASE 4: QA & POLISH CHECKLIST

### Visual Quality Check
- [ ] All text uses premium fonts (Space Grotesk for headings, Inter for body)
- [ ] Dark theme is consistent across all sections
- [ ] Glassmorphism effects have proper blur and transparency
- [ ] Gradients are smooth and not over-saturated
- [ ] Floating orbs animate smoothly
- [ ] All hover states have micro-interactions
- [ ] Buttons have glow effects
- [ ] Stats animate on scroll-into-view

### Technical Quality Check
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Animations run at 60fps
- [ ] Mobile menu works correctly
- [ ] All links are functional
- [ ] Responsive at all breakpoints

### Performance Check
- [ ] Add `will-change: transform` to animated elements
- [ ] Use `transform` instead of `top/left` for animations
- [ ] Lazy load images below the fold
- [ ] Reduce motion for `prefers-reduced-motion`

---

## 📊 EXECUTION TIMELINE

| Phase | Time | Tasks |
|-------|------|-------|
| **Phase 1** | 90 min | Foundation (globals.css, tailwind.config, fonts) |
| **Phase 2** | 60 min | Premium components (GlassCard, PremiumButton, etc.) |
| **Phase 3** | 120 min | Template renderer transformation |
| **Phase 4** | 30 min | QA & polish |

**Total: ~5 hours of autonomous work**

---

## 🏆 SUCCESS METRICS

### The "Holy Shit" Test
When you finish, show the templates to someone. If they don't say "holy shit" or "wow" within 3 seconds, you need to do more work.

### Visual Benchmarks
- [ ] Looks like it belongs on Awwwards
- [ ] Could be mistaken for Linear, Vercel, or Stripe
- [ ] Makes other template marketplaces look dated
- [ ] Converts visitors into "I NEED THIS" buyers

### Technical Benchmarks
- [ ] Lighthouse Performance: 90+
- [ ] No layout shifts (CLS = 0)
- [ ] Smooth 60fps animations
- [ ] Mobile-first responsive

---

## 🚀 GO TIME

**Agent Authorization**: Execute autonomously for 4-6 hours
**Quality Standard**: Premium or nothing
**Failure Condition**: If templates don't look like $500+ products, iterate until they do

**START NOW. MAKE IT LEGENDARY.** 🔥

