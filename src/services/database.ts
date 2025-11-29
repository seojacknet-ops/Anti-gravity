/**
 * Database Service Interface
 * 
 * This service provides generic CRUD operations, making it easy to swap
 * implementations (e.g., from mock to Firestore or PostgreSQL).
 */

export interface DatabaseDocument {
    id: string
    createdAt: Date
    updatedAt: Date
    [key: string]: any
}

export interface QueryOptions {
    limit?: number
    orderBy?: string
    orderDirection?: 'asc' | 'desc'
    where?: Array<{
        field: string
        operator: '==' | '!=' | '>' | '<' | '>=' | '<='
        value: any
    }>
}

export interface DatabaseService {
    /**
     * Create a new document
     */
    create<T extends DatabaseDocument>(
        collection: string,
        data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T>

    /**
     * Create or overwrite a document with a specific ID
     */
    set<T extends DatabaseDocument>(
        collection: string,
        id: string,
        data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T>

    /**
     * Read a document by ID
     */
    read<T extends DatabaseDocument>(
        collection: string,
        id: string
    ): Promise<T | null>

    /**
     * Update a document
     */
    update<T extends DatabaseDocument>(
        collection: string,
        id: string,
        data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<T>

    /**
     * Delete a document
     */
    delete(collection: string, id: string): Promise<void>

    /**
     * Query documents with filters
     */
    query<T extends DatabaseDocument>(
        collection: string,
        options?: QueryOptions
    ): Promise<T[]>

    /**
     * Subscribe to real-time updates
     */
    subscribe<T extends DatabaseDocument>(
        collection: string,
        id: string,
        callback: (doc: T | null) => void
    ): () => void
}

/**
 * Mock implementation for development
 */
/**
 * Firestore implementation for production
 */
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    Timestamp,
    DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export class FirestoreDatabaseService implements DatabaseService {

    private convertDate(date: Date | Timestamp): Date {
        if (date instanceof Timestamp) {
            return date.toDate();
        }
        return date;
    }

    private mapDocument<T extends DatabaseDocument>(docSnap: DocumentData): T {
        const data = docSnap.data();
        return {
            ...data,
            id: docSnap.id,
            createdAt: data.createdAt ? this.convertDate(data.createdAt) : new Date(),
            updatedAt: data.updatedAt ? this.convertDate(data.updatedAt) : new Date(),
        } as T;
    }

    async create<T extends DatabaseDocument>(
        collectionName: string,
        data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T> {
        const now = new Date();
        const docData = {
            ...data,
            createdAt: now,
            updatedAt: now
        };

        // If 'users' collection, we might want to use setDoc with a specific ID if provided in data (not typical for create but good for auth users)
        // For generic create, we use addDoc
        const docRef = await addDoc(collection(db, collectionName), docData);

        return {
            ...docData,
            id: docRef.id
        } as T;
    }

    // Overload for creating with a specific ID (useful for users)
    async set<T extends DatabaseDocument>(
        collectionName: string,
        id: string,
        data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T> {
        const now = new Date();
        const docData = {
            ...data,
            createdAt: now,
            updatedAt: now
        };

        await setDoc(doc(db, collectionName, id), docData);

        return {
            ...docData,
            id
        } as T;
    }

    async read<T extends DatabaseDocument>(
        collectionName: string,
        id: string
    ): Promise<T | null> {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return this.mapDocument<T>(docSnap);
        }
        return null;
    }

    async update<T extends DatabaseDocument>(
        collectionName: string,
        id: string,
        data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<T> {
        const docRef = doc(db, collectionName, id);
        const updateData = {
            ...data,
            updatedAt: new Date()
        };

        await updateDoc(docRef, updateData);

        // Fetch updated doc to return full object
        const updatedSnap = await getDoc(docRef);
        return this.mapDocument<T>(updatedSnap);
    }

    async delete(collectionName: string, id: string): Promise<void> {
        await deleteDoc(doc(db, collectionName, id));
    }

    async query<T extends DatabaseDocument>(
        collectionName: string,
        options?: QueryOptions
    ): Promise<T[]> {
        const constraints = [];

        if (options?.where) {
            options.where.forEach(w => {
                constraints.push(where(w.field, w.operator, w.value));
            });
        }

        if (options?.orderBy) {
            constraints.push(orderBy(options.orderBy, options.orderDirection || 'asc'));
        }

        if (options?.limit) {
            constraints.push(limit(options.limit));
        }

        const q = query(collection(db, collectionName), ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => this.mapDocument<T>(doc));
    }

    subscribe<T extends DatabaseDocument>(
        collectionName: string,
        id: string,
        callback: (doc: T | null) => void
    ): () => void {
        const docRef = doc(db, collectionName, id);

        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback(this.mapDocument<T>(docSnap));
            } else {
                callback(null);
            }
        });
    }
}

// Export singleton instance
export const databaseService = new FirestoreDatabaseService();
