'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { authService } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/client';
import { UserDocument } from '@/lib/schemas/firebase';

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

export function AuthProvider({ children }: { children: ReactNode }) {
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
        <AuthContext.Provider value= { value } >
        { children }
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
