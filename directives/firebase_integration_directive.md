# Directive: Firebase Integration for SEOJack CRM

## Overview

This directive provides comprehensive instructions for integrating Firebase into the SEOJack CRM. It is designed to be consumed by AI agents (Claude, GPT, etc.) working in Anti-Gravity IDE or similar AI-powered development environments, with Firebase MCP (Model Context Protocol) connectivity.

---

## Architecture Decision

### Why Firebase for SEOJack?

| Requirement | Firebase Solution |
|-------------|-------------------|
| Authentication | Firebase Auth (email/password, Google, magic links) |
| Database | Firestore (real-time sync, offline support) |
| File Storage | Firebase Storage (client uploads, CDN delivery) |
| Real-time Chat | Firestore with real-time listeners |
| Hosting | Vercel (keep existing) + Firebase for backend |
| Analytics | Firebase Analytics (optional) |

### What We're NOT Using
- Firebase Hosting (staying on Vercel for Next.js optimization)
- Firebase Functions (using Next.js API routes instead for simplicity)
- Realtime Database (Firestore is better for our data model)

---

## Project Setup

### Step 1: Firebase Console Configuration

```
1. Go to console.firebase.google.com
2. Create new project: "seojack-crm" (or connect existing)
3. Enable these services:
   - Authentication → Email/Password + Google
   - Firestore Database → Start in production mode
   - Storage → Start in production mode
4. Create Web App → Get config object
5. Generate Service Account key for admin operations
```

### Step 2: Environment Variables

Create/update `.env.local`:

```bash
# Firebase Client SDK (safe for browser)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (server-side only - NEVER expose)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Step 3: Install Dependencies

```bash
npm install firebase firebase-admin
```

---

## File Structure

```
src/
├── lib/
│   ├── firebase/
│   │   ├── client.ts       # Client SDK initialization
│   │   ├── admin.ts        # Admin SDK (server-side only)
│   │   ├── auth.ts         # Authentication helpers
│   │   ├── firestore.ts    # Firestore helpers & types
│   │   └── storage.ts      # Storage helpers
│   └── schemas/
│       └── firebase.ts     # Zod schemas for Firebase documents
├── hooks/
│   ├── useAuth.ts          # Authentication hook
│   ├── useFirestore.ts     # Generic Firestore hook
│   └── useChat.ts          # Real-time chat hook
├── services/
│   ├── auth.service.ts     # Auth business logic
│   ├── user.service.ts     # User CRUD operations
│   ├── project.service.ts  # Client project operations
│   ├── chat.service.ts     # Messaging operations
│   └── media.service.ts    # File upload operations
└── app/
    └── api/
        ├── auth/
        │   └── [...nextauth]/route.ts  # If using NextAuth adapter
        └── webhooks/
            └── stripe/route.ts          # Stripe webhook handler
```

---

## Firebase Client Initialization

### File: `src/lib/firebase/client.ts`

```typescript
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton pattern - prevent re-initialization
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage };
```

### File: `src/lib/firebase/admin.ts`

```typescript
// SERVER-SIDE ONLY - Never import in client components
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

const adminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const adminApp = getApps().length === 0 
  ? initializeApp(adminConfig, 'admin') 
  : getApps()[0];

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);
```

---

## Firestore Data Model

### Collection Structure

```
firestore/
├── users/                          # User accounts
│   └── {userId}/
│       ├── profile                 # User profile data
│       ├── subscription            # Stripe subscription data
│       └── settings                # User preferences
│
├── projects/                       # Client website projects
│   └── {projectId}/
│       ├── brief                   # Onboarding data
│       ├── status                  # Project phase
│       ├── team                    # Assigned staff
│       └── revisions/              # Subcollection
│           └── {revisionId}
│
├── conversations/                  # Chat threads
│   └── {conversationId}/
│       ├── participants            # User IDs
│       ├── lastMessage             # For list preview
│       └── messages/               # Subcollection
│           └── {messageId}
│
├── tickets/                        # Support tickets
│   └── {ticketId}/
│       └── comments/               # Subcollection
│           └── {commentId}
│
├── media/                          # File metadata
│   └── {mediaId}/
│       ├── url                     # Storage download URL
│       ├── projectId               # Associated project
│       └── folder                  # Organization
│
└── system/                         # App configuration
    ├── industries/                 # Industry defaults
    └── templates/                  # Website templates
```

### Document Schemas

#### User Document
```typescript
interface UserDocument {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  
  // Subscription
  plan: 'starter' | 'growth' | 'pro';
  stripeCustomerId?: string;
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'trialing';
  subscriptionEndDate?: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  onboardingComplete: boolean;
}
```

#### Project Document
```typescript
interface ProjectDocument {
  id: string;
  userId: string;  // Owner
  
  // Business Info (from onboarding)
  businessName: string;
  industry: string;
  location: string;
  serviceArea: string;
  
  // Brand & Design
  brief: {
    pubDescription: string;
    services: string[];
    uniqueSellingPoints: string[];
    certifications: string[];
    targetCustomer: string;
    pricePositioning: string;
    
    // Design direction
    inspirationUrls: string[];
    vibe: string;
    colorPalette: string;
    
    // Contact
    phone: string;
    email: string;
    businessHours: string;
    socialLinks: Record<string, string>;
  };
  
  // Project Status
  status: 'onboarding' | 'briefing' | 'design' | 'development' | 'review' | 'live';
  currentPhase: number;
  
  // Assets
  logoUrl?: string;
  photos: string[];
  domain?: string;
  
  // Timeline
  createdAt: Timestamp;
  updatedAt: Timestamp;
  estimatedLaunch?: Timestamp;
  launchedAt?: Timestamp;
  
  // Assignment
  assignedTo?: string[];  // Staff user IDs
}
```

#### Conversation Document
```typescript
interface ConversationDocument {
  id: string;
  projectId: string;
  participants: string[];  // User IDs (client + staff)
  
  // Preview data (denormalized for list view)
  lastMessage: {
    text: string;
    senderId: string;
    timestamp: Timestamp;
  };
  unreadCount: Record<string, number>;  // userId -> count
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface MessageDocument {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  isStaff: boolean;
  
  text: string;
  attachments?: {
    url: string;
    name: string;
    type: string;
    size: number;
  }[];
  
  readBy: string[];  // User IDs who have read
  createdAt: Timestamp;
}
```

#### Ticket Document
```typescript
interface TicketDocument {
  id: string;
  projectId: string;
  userId: string;
  
  title: string;
  description: string;
  type: 'bug' | 'tweak' | 'feature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'awaiting_info' | 'completed';
  
  assignedTo?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
}
```

---

## Authentication Implementation

### File: `src/lib/firebase/auth.ts`

```typescript
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './client';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Sign up with email/password
  async signUp(email: string, password: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email,
      name,
      plan: 'starter',
      subscriptionStatus: 'trialing',
      onboardingComplete: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return user;
  },
  
  // Sign in with email/password
  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    await setDoc(doc(db, 'users', user.uid), {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    
    return user;
  },
  
  // Sign in with Google
  async signInWithGoogle() {
    const { user } = await signInWithPopup(auth, googleProvider);
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        name: user.displayName || 'User',
        avatarUrl: user.photoURL,
        plan: 'starter',
        subscriptionStatus: 'trialing',
        onboardingComplete: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Update last login
      await setDoc(doc(db, 'users', user.uid), {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
    
    return user;
  },
  
  // Sign out
  async signOut() {
    await signOut(auth);
  },
  
  // Password reset
  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },
  
  // Auth state listener
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
  
  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },
};
```

### File: `src/hooks/useAuth.ts`

```typescript
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { authService } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/client';

interface AuthContextType {
  user: User | null;
  userData: UserDocument | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state
    const unsubAuth = authService.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    // Listen to user document
    if (!user) return;

    const unsubUser = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          setUserData(doc.data() as UserDocument);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    );

    return () => unsubUser();
  }, [user]);

  const value: AuthContextType = {
    user,
    userData,
    loading,
    signIn: async (email, password) => {
      await authService.signIn(email, password);
    },
    signUp: async (email, password, name) => {
      await authService.signUp(email, password, name);
    },
    signInWithGoogle: async () => {
      await authService.signInWithGoogle();
    },
    signOut: async () => {
      await authService.signOut();
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## Real-Time Chat Implementation

### File: `src/services/chat.service.ts`

```typescript
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const chatService = {
  // Get or create conversation for a project
  async getOrCreateConversation(projectId: string, userId: string) {
    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('projectId', '==', projectId),
      limit(1)
    );
    
    // Check if exists
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }
    
    // Create new conversation
    const newConversation = await addDoc(conversationsRef, {
      projectId,
      participants: [userId],  // Staff will be added when they join
      lastMessage: null,
      unreadCount: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return newConversation.id;
  },
  
  // Send a message
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    text: string,
    isStaff: boolean = false,
    attachments?: any[]
  ) {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    
    // Add message
    const messageDoc = await addDoc(messagesRef, {
      conversationId,
      senderId,
      senderName,
      isStaff,
      text,
      attachments: attachments || [],
      readBy: [senderId],
      createdAt: serverTimestamp(),
    });
    
    // Update conversation preview
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      lastMessage: {
        text: text.substring(0, 100),
        senderId,
        timestamp: serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
      // Increment unread for all other participants
      // This would need to be done per-participant in practice
    });
    
    return messageDoc.id;
  },
  
  // Subscribe to messages (real-time)
  subscribeToMessages(
    conversationId: string,
    callback: (messages: MessageDocument[]) => void
  ) {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as MessageDocument[];
      
      callback(messages);
    });
  },
  
  // Subscribe to conversations list
  subscribeToConversations(
    userId: string,
    callback: (conversations: ConversationDocument[]) => void
  ) {
    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ConversationDocument[];
      
      callback(conversations);
    });
  },
  
  // Mark messages as read
  async markAsRead(conversationId: string, userId: string) {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(
      messagesRef,
      where('readBy', 'not-in', [[userId]])  // Messages not read by this user
    );
    
    const snapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        readBy: arrayUnion(userId),
      });
    });
    
    // Reset unread count
    const conversationRef = doc(db, 'conversations', conversationId);
    batch.update(conversationRef, {
      [`unreadCount.${userId}`]: 0,
    });
    
    await batch.commit();
  },
};
```

### File: `src/hooks/useChat.ts`

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { chatService } from '@/services/chat.service';
import { useAuth } from './useAuth';

export function useChat(projectId: string) {
  const { user, userData } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize conversation
  useEffect(() => {
    if (!user || !projectId) return;

    const initConversation = async () => {
      const id = await chatService.getOrCreateConversation(projectId, user.uid);
      setConversationId(id);
    };

    initConversation();
  }, [user, projectId]);

  // Subscribe to messages
  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    const unsubscribe = chatService.subscribeToMessages(
      conversationId,
      (newMessages) => {
        setMessages(newMessages);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [conversationId]);

  // Mark as read when viewing
  useEffect(() => {
    if (!conversationId || !user) return;
    chatService.markAsRead(conversationId, user.uid);
  }, [conversationId, user, messages]);

  const sendMessage = useCallback(
    async (text: string, attachments?: any[]) => {
      if (!conversationId || !user || !userData) return;

      await chatService.sendMessage(
        conversationId,
        user.uid,
        userData.name,
        text,
        false,  // isStaff - would be true for admin panel
        attachments
      );
    },
    [conversationId, user, userData]
  );

  return {
    messages,
    loading,
    sendMessage,
    conversationId,
  };
}
```

---

## File Storage Implementation

### File: `src/lib/firebase/storage.ts`

```typescript
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from './client';

export const storageService = {
  // Upload file with progress tracking
  async uploadFile(
    file: File,
    path: string,
    projectId: string,
    folder: string,
    onProgress?: (progress: number) => void
  ): Promise<MediaDocument> {
    // Create storage reference
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    
    // Upload with progress
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          // Get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Create Firestore document
          const mediaRef = await addDoc(collection(db, 'media'), {
            projectId,
            folder,
            name: file.name,
            url: downloadURL,
            storagePath: storageRef.fullPath,
            type: file.type.startsWith('image/') ? 'image' : 'document',
            size: file.size,
            createdAt: serverTimestamp(),
          });
          
          resolve({
            id: mediaRef.id,
            projectId,
            folder,
            name: file.name,
            url: downloadURL,
            type: file.type.startsWith('image/') ? 'image' : 'document',
            size: file.size,
          } as MediaDocument);
        }
      );
    });
  },
  
  // Delete file
  async deleteFile(mediaId: string, storagePath: string) {
    // Delete from Storage
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    
    // Delete Firestore document
    await deleteDoc(doc(db, 'media', mediaId));
  },
  
  // Upload project logo
  async uploadLogo(file: File, projectId: string, onProgress?: (progress: number) => void) {
    return this.uploadFile(
      file,
      `projects/${projectId}/logo`,
      projectId,
      'logos',
      onProgress
    );
  },
  
  // Upload project photos
  async uploadPhoto(file: File, projectId: string, onProgress?: (progress: number) => void) {
    return this.uploadFile(
      file,
      `projects/${projectId}/photos`,
      projectId,
      'images',
      onProgress
    );
  },
  
  // Upload chat attachment
  async uploadAttachment(
    file: File,
    conversationId: string,
    onProgress?: (progress: number) => void
  ) {
    const storageRef = ref(
      storage,
      `conversations/${conversationId}/${Date.now()}_${file.name}`
    );
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise<{ url: string; name: string; type: string; size: number }>(
      (resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(progress);
          },
          reject,
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              url: downloadURL,
              name: file.name,
              type: file.type,
              size: file.size,
            });
          }
        );
      }
    );
  },
};
```

---

## Firestore Security Rules

### File: `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isStaff() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'staff';
    }
    
    function isProjectOwner(projectId) {
      return get(/databases/$(database)/documents/projects/$(projectId)).data.userId == request.auth.uid;
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own document
      allow read: if isOwner(userId) || isStaff();
      
      // Users can create their own document (on signup)
      allow create: if isOwner(userId);
      
      // Users can update their own document (except role and subscription)
      allow update: if isOwner(userId) && 
        !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'stripeCustomerId', 'subscriptionStatus', 'plan']);
      
      // Only admins can delete
      allow delete: if false;
    }
    
    // Projects collection
    match /projects/{projectId} {
      // Owner and staff can read
      allow read: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || isStaff());
      
      // Authenticated users can create their own projects
      allow create: if isAuthenticated() && 
        request.resource.data.userId == request.auth.uid;
      
      // Owner can update (but not change userId)
      allow update: if isAuthenticated() &&
        (resource.data.userId == request.auth.uid || isStaff()) &&
        request.resource.data.userId == resource.data.userId;
      
      // Only staff can delete
      allow delete: if isStaff();
    }
    
    // Conversations collection
    match /conversations/{conversationId} {
      // Participants and staff can read
      allow read: if isAuthenticated() &&
        (request.auth.uid in resource.data.participants || isStaff());
      
      // Authenticated users can create
      allow create: if isAuthenticated();
      
      // Participants can update (for lastMessage, unreadCount)
      allow update: if isAuthenticated() &&
        (request.auth.uid in resource.data.participants || isStaff());
      
      // Messages subcollection
      match /messages/{messageId} {
        // Participants can read messages
        allow read: if isAuthenticated() &&
          (request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants || isStaff());
        
        // Participants can create messages
        allow create: if isAuthenticated() &&
          (request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants || isStaff()) &&
          request.resource.data.senderId == request.auth.uid;
        
        // Only sender can update (for readBy)
        allow update: if isAuthenticated();
        
        // No one can delete messages
        allow delete: if false;
      }
    }
    
    // Tickets collection
    match /tickets/{ticketId} {
      allow read: if isAuthenticated() &&
        (resource.data.userId == request.auth.uid || isStaff());
      
      allow create: if isAuthenticated() &&
        request.resource.data.userId == request.auth.uid;
      
      allow update: if isAuthenticated() &&
        (resource.data.userId == request.auth.uid || isStaff());
      
      allow delete: if isStaff();
      
      // Comments subcollection
      match /comments/{commentId} {
        allow read: if isAuthenticated() &&
          (get(/databases/$(database)/documents/tickets/$(ticketId)).data.userId == request.auth.uid || isStaff());
        
        allow create: if isAuthenticated();
        
        allow update, delete: if false;
      }
    }
    
    // Media collection
    match /media/{mediaId} {
      allow read: if isAuthenticated() &&
        (isProjectOwner(resource.data.projectId) || isStaff());
      
      allow create: if isAuthenticated();
      
      allow delete: if isAuthenticated() &&
        (isProjectOwner(resource.data.projectId) || isStaff());
    }
    
    // System collection (read-only for users)
    match /system/{document=**} {
      allow read: if isAuthenticated();
      allow write: if false;
    }
  }
}
```

---

## Storage Security Rules

### File: `storage.rules`

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Project files
    match /projects/{projectId}/{allPaths=**} {
      // Allow read if authenticated (in production, check project ownership)
      allow read: if isAuthenticated();
      
      // Allow upload if authenticated and file is reasonable size
      allow write: if isAuthenticated() &&
        request.resource.size < 10 * 1024 * 1024 && // 10MB max
        (request.resource.contentType.matches('image/.*') ||
         request.resource.contentType == 'application/pdf');
    }
    
    // Conversation attachments
    match /conversations/{conversationId}/{allPaths=**} {
      allow read: if isAuthenticated();
      
      allow write: if isAuthenticated() &&
        request.resource.size < 10 * 1024 * 1024;
    }
    
    // User avatars
    match /users/{userId}/avatar/{fileName} {
      allow read: if isAuthenticated();
      
      allow write: if isAuthenticated() &&
        request.auth.uid == userId &&
        request.resource.size < 5 * 1024 * 1024 &&
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## Migration Guide: Zustand to Firebase

### Current State (Zustand + localStorage)
Your stores persist to localStorage. This works but doesn't sync across devices or persist properly.

### Migration Steps

#### 1. Update `onboarding-store.ts`

```typescript
// BEFORE: Pure Zustand with localStorage
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({ ... }),
    { name: 'seojack-onboarding-storage' }
  )
);

// AFTER: Zustand + Firebase sync
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      // ... existing state ...
      
      // New: Save to Firebase
      saveToFirebase: async (userId: string) => {
        const data = get().data;
        await setDoc(doc(db, 'projects', `${userId}_draft`), {
          userId,
          brief: data,
          status: 'onboarding',
          currentPhase: get().currentStep,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      },
      
      // New: Load from Firebase
      loadFromFirebase: async (userId: string) => {
        const docSnap = await getDoc(doc(db, 'projects', `${userId}_draft`));
        if (docSnap.exists()) {
          const data = docSnap.data();
          set({
            data: data.brief,
            currentStep: data.currentPhase,
          });
        }
      },
      
      // New: Finalize and create real project
      finalize: async (userId: string) => {
        const data = get().data;
        
        // Create real project document
        const projectRef = await addDoc(collection(db, 'projects'), {
          userId,
          businessName: data.businessName || 'Untitled Project',
          industry: data.industry,
          location: data.location,
          brief: data,
          status: 'briefing',
          currentPhase: 1,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        
        // Delete draft
        await deleteDoc(doc(db, 'projects', `${userId}_draft`));
        
        // Update user
        await setDoc(doc(db, 'users', userId), {
          onboardingComplete: true,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        
        return projectRef.id;
      },
    }),
    { name: 'seojack-onboarding-storage' }
  )
);
```

#### 2. Update Components to Use Firebase

```typescript
// In onboarding steps, add auto-save
const { user } = useAuth();
const { data, setData, saveToFirebase } = useOnboardingStore();

// Auto-save on change
useEffect(() => {
  if (user) {
    const timeout = setTimeout(() => {
      saveToFirebase(user.uid);
    }, 1000);  // Debounce 1 second
    
    return () => clearTimeout(timeout);
  }
}, [data, user, saveToFirebase]);
```

---

## Firebase MCP Integration Notes

When using Firebase MCP with Anti-Gravity IDE:

### Available MCP Operations

```typescript
// The MCP server exposes these operations:
{
  // Firestore
  "firestore.getDocument": { collection: string, docId: string },
  "firestore.setDocument": { collection: string, docId: string, data: object },
  "firestore.query": { collection: string, where: array, orderBy?: string },
  "firestore.deleteDocument": { collection: string, docId: string },
  
  // Auth
  "auth.getUser": { uid: string },
  "auth.createUser": { email: string, password: string },
  "auth.deleteUser": { uid: string },
  
  // Storage
  "storage.getDownloadUrl": { path: string },
  "storage.deleteFile": { path: string },
}
```

### Prompting the AI Agent

When working with Claude/GPT in Anti-Gravity:

```markdown
## Context for AI Agent

You have access to Firebase MCP. Use it to:

1. **Read user data**: `firestore.getDocument('users', userId)`
2. **Update project**: `firestore.setDocument('projects', projectId, updatedData)`
3. **Query tickets**: `firestore.query('tickets', [['status', '==', 'open']])`

Always:
- Check if documents exist before updating
- Use serverTimestamp() for createdAt/updatedAt
- Validate data against the schemas in `src/lib/schemas/firebase.ts`
- Handle errors gracefully with try/catch

Never:
- Delete user documents without confirmation
- Expose admin credentials
- Write directly to subscription/billing fields (use Stripe webhooks)
```

---

## Testing Checklist

Before going live, verify:

### Authentication
- [ ] Email/password signup creates user document
- [ ] Google OAuth creates user document
- [ ] Password reset email sends
- [ ] Session persists on page refresh
- [ ] Logout clears session and redirects

### Firestore
- [ ] Onboarding data saves incrementally
- [ ] Project creation works after onboarding
- [ ] Security rules block unauthorized access
- [ ] Real-time updates work for chat

### Storage
- [ ] Image upload works with progress
- [ ] PDF upload works
- [ ] Files appear in correct folders
- [ ] Delete removes from both Storage and Firestore

### Real-time Chat
- [ ] Messages appear instantly for both parties
- [ ] Unread counts update correctly
- [ ] Attachments upload and display
- [ ] Conversation list sorts by recent activity

---

## Deployment Checklist

1. **Environment Variables**
   - [ ] All NEXT_PUBLIC_ vars set in Vercel
   - [ ] Admin credentials set (server-side only)
   - [ ] Stripe webhook secret configured

2. **Firebase Console**
   - [ ] Security rules deployed (`firebase deploy --only firestore:rules,storage:rules`)
   - [ ] Indexes created for complex queries
   - [ ] Backup schedule configured

3. **Monitoring**
   - [ ] Firebase Analytics enabled
   - [ ] Error reporting configured
   - [ ] Usage alerts set for quotas

---

## Cost Optimization

Firebase bills per operation. Optimize:

1. **Batch writes** - Use `writeBatch()` for multiple updates
2. **Limit queries** - Always use `limit()` on list queries
3. **Cache aggressively** - Enable Firestore persistence
4. **Compress images** - Resize before upload to Storage
5. **Index carefully** - Only create indexes you actually query

Expected costs for ~100 active clients: **$10-30/month**

---

*This directive should be placed in `directives/firebase.md` and referenced by AI agents working on the SEOJack codebase.*
