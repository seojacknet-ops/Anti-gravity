# ⚠️ DEPRECATED

This directory (`src/lib/firebase`) contains legacy Firebase service implementations.

**New Code should use:**

- `@/services/auth` (FirebaseAuthService)
- `@/services/database` (FirestoreDatabaseService)
- `@/services/storage` (FirebaseStorageService)

**Action Required:**
Existing stores (`ticket-store.ts`, `media-store.ts`, etc.) need to be refactored to use the new services in `src/services/`.
Once refactored, this directory can be deleted (except for `client.ts` if it's used as the singleton initializer).
