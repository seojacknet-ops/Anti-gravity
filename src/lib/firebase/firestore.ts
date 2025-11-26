import {
    collection,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    DocumentData,
    QueryConstraint,
} from 'firebase/firestore';
import { db } from './client';

export const firestoreService = {
    // Generic get document
    async getDocument<T = DocumentData>(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T;
        }
        return null;
    },

    // Generic create document (auto ID)
    async createDocument<T = DocumentData>(collectionName: string, data: any) {
        const colRef = collection(db, collectionName);
        const docRef = await addDoc(colRef, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    },

    // Generic set document (specific ID)
    async setDocument<T = DocumentData>(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    },

    // Generic update document
    async updateDocument(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    },

    // Generic delete document
    async deleteDocument(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    },

    // Generic query
    async queryDocuments<T = DocumentData>(collectionName: string, constraints: QueryConstraint[]) {
        const colRef = collection(db, collectionName);
        const q = query(colRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as T[];
    }
};
