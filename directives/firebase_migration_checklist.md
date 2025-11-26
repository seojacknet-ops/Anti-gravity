# Firebase Migration Checklist

This document tracks the migration of mock data and placeholder code to real Firebase integrations.

## 1. Authentication & User Data
- [ ] **Login/Signup Pages**: Connect `useAuth` hook to `src/app/(auth)/login/page.tsx` and `signup/page.tsx`.
- [ ] **Protected Routes**: Replace any mock auth checks in `layout.tsx` or middleware with `useAuth` state.
- [ ] **User Profile**: Sync user profile updates (name, avatar) to Firestore `users` collection.

## 2. Onboarding Flow
- [ ] **Store Integration**: Update `src/lib/store/onboarding-store.ts` to save data to Firestore `projects` collection upon completion.
- [ ] **File Uploads**: Replace mock file handling in `StepContent.tsx` with `storage.service.ts` (uploading to `projects/{projectId}/assets`).
- [ ] **Completion Action**: Ensure "Finish" button triggers both Firestore save and User status update (e.g., `onboardingComplete: true`).

## 3. Billing & Subscriptions
- [ ] **Billing Store**: Refactor `src/lib/store/billing-store.ts` to fetch subscription data from Firestore `users/{userId}/subscriptions` (synced via Stripe).
- [ ] **Invoices**: Fetch invoice history from Firestore `users/{userId}/invoices`.
- [ ] **Plan Upgrades**: Connect "Upgrade" buttons to a Firebase Cloud Function (or API route) that creates a Stripe Checkout session.

## 4. Media Vault
- [ ] **Media Store**: Refactor `src/lib/store/media-store.ts` to fetch file lists from Firestore `projects/{projectId}/assets`.
- [ ] **Upload Component**: Connect `FileUploader` to `storage.service.ts`.
- [ ] **Delete Action**: Implement file deletion using `storage.service.ts` and update Firestore metadata.

## 5. Support Tickets
- [ ] **Ticket Store**: Refactor `src/lib/store/ticket-store.ts` to fetch/create tickets in Firestore `tickets` collection.
- [ ] **Real-time Updates**: Use `onSnapshot` in the store or a hook to get real-time ticket status updates.

## 6. Chat System
- [ ] **Chat Widget**: Ensure `ChatWidget.tsx` uses `useChat` hook for sending/receiving messages.
- [ ] **Message History**: Verify message history loads correctly from Firestore `conversations/{conversationId}/messages`.

## 7. Admin Dashboard
- [ ] **Client List**: Update `src/app/admin/clients/page.tsx` to fetch all users/projects from Firestore.
- [ ] **Project Status**: Allow admins to update project status (e.g., "Design" -> "Development") in Firestore.

## 8. Cleanup
- [ ] **Delete Mock Services**: Remove `src/services/auth.ts`, `src/services/database.ts`, `src/services/storage.ts` once fully replaced.
- [ ] **Remove Mock Data**: Delete hardcoded arrays in stores (e.g., `MOCK_INVOICES` in `billing-store.ts`).
