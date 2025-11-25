# Directive: Tech Stack

## Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript / React
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **Icons**: Lucide React

## Backend
- **Server**: Next.js Server Actions (preferred) or Node.js/Express
- **Database**: PostgreSQL (via Supabase or Neon) or MongoDB
- **ORM**: Prisma ORM
- **Auth**: Clerk or NextAuth.js (Seamless login)

## Infrastructure
- **Storage**: AWS S3 (or Firebase Storage) for media uploads
- **Payments**: Stripe Subscriptions API
- **Real-time**: Firebase Firestore or Socket.io (for Chat)

## Integration Strategy
- **Marketing Site**: `seojack.co.uk`
- **App (CRM)**: `app.seojack.co.uk`
- **Auth Flow**: Login on marketing site -> redirects to app.
