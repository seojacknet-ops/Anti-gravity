# SEOJack CRM AI Agent Instructions

## Project Overview

**SEOJack CRM** is a Next.js 16 (App Router) client management platform for a web design agency. It provides a "digital concierge" experience where small business clients (tradespeople, local services) can onboard, manage their website projects, communicate via chat, and handle billing.

This is **not a generic CRM** - it's purpose-built for the SEOJack workflow: conversational onboarding → website generation → iteration → launch.

## Critical Architecture Patterns

### 1. Dual App Structure

The workspace contains TWO distinct Next.js applications:

- **Main App** (`src/`): Client-facing CRM with Firebase backend
- **Template Maker** (`template-maker-main/`): Standalone template gallery system for website previews

**Integration point**: Template system is designed to be embedded into the main app's website builder. See `template-maker-main/INTEGRATION_GUIDE.md` for migration steps.

### 2. Firebase-First Backend (No API Routes)

**Critical**: All data operations use Firebase client SDK directly from components/hooks. We do NOT use Next.js API routes for CRUD operations.

```typescript
// ✅ CORRECT: Direct Firestore access from client
import { firestoreService } from '@/lib/firebase/firestore';
const projects = await firestoreService.queryDocuments<ProjectDocument>('projects', []);

// ❌ WRONG: Don't create API routes for CRUD
// fetch('/api/projects') // Avoid this pattern
```

**Firebase Structure**:
- `src/lib/firebase/client.ts` - Client SDK (browser-safe)
- `src/lib/firebase/admin.ts` - Admin SDK (server-side only, for privileged operations)
- `src/lib/firebase/firestore.ts` - Generic CRUD service layer
- `src/lib/firebase/auth.ts` - Authentication helpers
- `src/lib/firebase/storage.ts` - File upload/download

**Environment Setup**: Firebase config lives in `.env.local` with `NEXT_PUBLIC_*` prefix for client SDK and `FIREBASE_ADMIN_*` for server SDK. See `directives/firebase_integration_directive.md` for complete setup.

### 3. State Management via Zustand Stores

All global state uses Zustand, NOT Context API for performance. Stores fetch data from Firebase and cache locally.

**Key stores** (`src/lib/store/`):
- `admin-store.ts` - Admin dashboard metrics and entities
- Other feature stores follow same pattern

**Pattern**:
```typescript
export const useAdminStore = create<AdminState>()((set) => ({
  projects: [],
  fetchDashboardData: async () => {
    const data = await firestoreService.queryDocuments(...);
    set({ projects: data });
  }
}));
```

### 4. "App Shell" Layout Pattern

The app uses a custom layout wrapper (`AppShell.tsx`) that conditionally renders sidebar/header based on route:

- **Client routes**: Sidebar + Header (dashboard experience)
- **Admin routes** (`/admin/*`): Full-width, custom admin UI
- **Public routes**: No chrome (e.g., onboarding)

**Do NOT modify** `src/app/layout.tsx` for per-page layouts - use `AppShell` logic instead.

### 5. Feature-Based Component Organization

Components are organized by feature domain, not UI primitives:

```
src/components/
├── features/          # Feature-specific components
│   ├── billing/
│   ├── chat/
│   ├── dashboard/
│   ├── onboarding/
│   ├── support/
│   └── vault/
├── layout/            # Shell components (AppShell, Header, Sidebar)
└── ui/                # Shadcn/ui primitives (do NOT edit manually)
```

When adding features, create a new folder under `features/` with all related components.

## Critical Developer Workflows

### Running the App

```powershell
# Install dependencies
npm install

# Development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint (ESLint configured for Next.js 16)
npm run lint
```

### Firebase Local Development

**Important**: Firebase services are remote (no emulators configured). Always test with staging Firebase project to avoid corrupting production data.

### Template System Development

The template gallery (`template-maker-main/`) runs independently:

```powershell
cd template-maker-main/template-maker-main
npm run dev  # Runs on different port
```

**Agent workflow for templates**: See `template-maker-main/AGENT_INSTRUCTIONS.md` for detailed enhancement instructions. This file contains the persona ("TemplateForge") and phase-by-phase upgrade checklist.

## Project-Specific Conventions

### 1. Directive-Driven Development

The `directives/` folder contains **SOPs (Standard Operating Procedures)** for AI agents. Always consult relevant directives before implementing features:

- `firebase_integration_directive.md` - Complete Firebase setup guide
- `onboarding_directive.md` - Conversational onboarding UX patterns
- `dashboard_reboot.md` - App shell and client dashboard architecture
- `premium_template_transformation.md` - Design system upgrade for templates
- `tech_stack.md` - Technology decisions and rationale

**Pattern**: When a user asks to implement a feature, search directives first for existing guidance.

### 2. Schema-First Data Modeling

All Firestore documents have strict TypeScript schemas in `src/lib/schemas/firebase.ts`:

```typescript
export interface UserDocument {
  id: string;
  email: string;
  plan: 'starter' | 'growth' | 'pro';
  onboardingComplete: boolean;
  // ... see file for complete schema
}
```

**Never assume field names** - always reference the schema. Use Zod validation for user inputs (schemas are in `src/lib/schemas.ts`).

### 3. Authentication via Context + Hook

Authentication uses a custom provider pattern:

```typescript
// In layout.tsx or providers
<AuthProvider>
  {children}
</AuthProvider>

// In components
const { user, userData, signIn, signOut } = useAuth();
```

**Critical**: `userData` is the Firestore user document (synced real-time), while `user` is the Firebase Auth object. Always use `userData` for subscription status, plan tier, etc.

### 4. Styling & Design System

**Tech stack**:
- Tailwind CSS 4 (uses `@tailwindcss/postcss`)
- Shadcn/ui components (installed, do NOT re-install)
- Lucide React icons
- Framer Motion for animations
- Next Themes for dark mode

**Brand colors** (use these, not generic Tailwind colors):
```css
/* From directives/tech_stack.md and component usage */
--brand-purple: /* primary brand */
--accent-pink: /* CTA accent */
```

**Important**: Dark mode is default. Always test in dark mode first.

### 5. Error Handling Pattern

Firebase operations should use try-catch with toast notifications:

```typescript
import { toast } from 'sonner';

try {
  await firestoreService.updateDocument('users', userId, data);
  toast.success('Saved successfully');
} catch (error) {
  console.error(error);
  toast.error('Failed to save');
}
```

The Toaster component is globally configured in `layout.tsx`.

## Integration Points & Data Flows

### Onboarding Flow
1. User signs up → `AuthProvider` creates Firebase Auth user
2. Redirect to `/onboarding` (multi-step form)
3. Form data collected via React Hook Form + Zod validation
4. On submit: Create `UserDocument` and `ProjectDocument` in Firestore
5. Redirect to dashboard with `onboardingComplete: true`

**Key file**: `src/app/onboarding/page.tsx` and `directives/onboarding_directive.md`

### Chat System
- Real-time messaging via Firestore `messages` collection
- Uses `useChat` hook with `onSnapshot` for live updates
- Messages grouped by `projectId` (threads per client project)
- File attachments stored in Firebase Storage, referenced in message docs

**Key files**: `src/hooks/useChat.ts`, `src/services/chat.service.ts`

### Media Vault
- Drag-and-drop upload to Firebase Storage (via `react-dropzone`)
- Files stored at path: `users/{userId}/media/{filename}`
- Metadata stored in Firestore `media` collection with auto-tagging
- Gallery UI uses masonry layout

**Key file**: `src/app/vault/page.tsx`

### Billing Integration
- Stripe for subscriptions (starter/growth/pro tiers)
- Customer ID stored in `UserDocument.stripeCustomerId`
- Checkout redirects to Stripe hosted pages
- Webhooks update Firestore (plan changes, cancellations)

**Key file**: `src/lib/stripe.ts`

### Admin Dashboard
- Separate route tree under `/admin`
- Bypasses AppShell layout (full-width)
- Uses `admin-store.ts` for aggregated metrics
- Admin SDK for privileged operations (user management, analytics)

**Access pattern**: Check `userData.role === 'admin'` (field not in current schema - add if implementing admin auth)

## Common Pitfalls & Solutions

### ❌ Don't: Use API routes for Firestore CRUD
This project follows Firebase's recommended pattern of client SDK usage. API routes add unnecessary latency and complexity.

### ❌ Don't: Manually edit Shadcn components
The `src/components/ui/` folder is auto-generated. Override via Tailwind classes or create wrapper components.

### ❌ Don't: Mix App Router and Pages Router
This project uses App Router exclusively. All routes are in `src/app/`.

### ❌ Don't: Hardcode URLs or paths
Use Next.js Link component and environment variables for external URLs.

### ✅ Do: Check directives before implementing
Many features have detailed UX/implementation specs in `directives/`.

### ✅ Do: Use TypeScript strictly
All Firebase documents, API responses, and component props should be fully typed. No `any` types.

### ✅ Do: Test in dark mode
The app defaults to dark theme - designs should look good in dark first.

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/firebase/client.ts` | Firebase client SDK initialization |
| `src/lib/firebase/firestore.ts` | Generic Firestore CRUD service |
| `src/lib/schemas/firebase.ts` | TypeScript schemas for all Firestore documents |
| `src/hooks/useAuth.tsx` | Authentication context and hook |
| `src/components/layout/AppShell.tsx` | Conditional layout wrapper |
| `directives/firebase_integration_directive.md` | Complete Firebase setup guide (1300+ lines) |
| `template-maker-main/AGENT_INSTRUCTIONS.md` | Template enhancement workflow (500+ lines) |

## Quick Start for AI Agents

1. **Read the relevant directive** in `directives/` for context
2. **Check existing schemas** in `src/lib/schemas/firebase.ts`
3. **Follow Firebase patterns** (client SDK, Zustand stores, real-time listeners)
4. **Use feature-based organization** (create `features/{feature-name}/` folder)
5. **Test in dark mode** and mobile-first
6. **Reference template system** (`template-maker-main/`) for design inspiration

## Questions to Clarify

When implementing new features, always ask:
- Which Firestore collections does this touch? (Check schemas)
- Does this need real-time updates? (Use `onSnapshot`)
- Is this client or admin functionality? (Affects layout/permissions)
- Are there existing patterns in directives? (Check `directives/README.md`)
