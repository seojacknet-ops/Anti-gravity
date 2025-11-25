# Directive: SEOJack Hub Dashboard (Project Reboot)

## Context
We are discarding the linear flow in favor of a dedicated **Client Dashboard**.
**Goal**: Build a cohesive, single-page application (SPA) feel where the user logs in and sees a "Mission Control".

## 1. Design System (Strict Adherence)
- **Colors**: Use ONLY `tailwind.config.ts` variables (`brand-purple`, `accent-pink`, etc.). No generic colors.
- **Typography**: Match marketing site font stack.
- **Shadcn**: Override default radii/colors to match brand.
- **Theme**: Default to Dark Mode if marketing site is bold.

## 2. Architecture: "App Shell"
- **Sidebar**: Fixed left. Links: Home, My Website, Messages, Media Vault, Billing. Collapsible on mobile.
- **Header**: Minimalist. Breadcrumbs, User Profile, Notifications.
- **Main Canvas**: Dynamic content area.

## 3. Views
### Home (The Concierge)
- **Hero**: Welcome & Status.
- **Next Action**: Dynamic button (Upload -> View Draft -> Revision).
- **Progress**: Visual Stepper.
- **Stats**: Plan & Billing info.

### Messages (Embedded Chat)
- **Route**: `/messages`
- **Layout**: Slack/WhatsApp style (Threads left, Chat right).
- **Features**: Drag-and-drop to Media Vault.

### Media Vault (Asset Management)
- **Route**: `/vault` (or `/media`)
- **Layout**: Gallery (Masonry/Grid).
- **Features**: Auto-tagging.

### Billing
- **Route**: `/billing`
- **Features**: Current Tier card, Upgrade/Manage buttons (Stripe Portal).
