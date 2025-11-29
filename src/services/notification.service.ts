import { databaseService } from './database';
import { NotificationDocument } from '@/lib/schemas/firebase';
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    limit,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

class NotificationService {
    private collectionName = 'notifications';

    /**
     * Subscribe to real-time notifications for a user
     */
    subscribeToNotifications(userId: string, callback: (notifications: NotificationDocument[]) => void) {
        const q = query(
            collection(db, this.collectionName),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(20)
        );

        return onSnapshot(q, (snapshot) => {
            const notifications = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as NotificationDocument));
            callback(notifications);
        });
    }

    /**
     * Mark a notification as read
     */
    async markAsRead(notificationId: string) {
        const ref = doc(db, this.collectionName, notificationId);
        await updateDoc(ref, { read: true });
    }

    /**
     * Mark all notifications as read for a user
     */
    async markAllAsRead(userId: string) {
        // Note: In a real app, this should be a batch operation or a cloud function
        // For now, we'll just query the unread ones and update them
        const q = query(
            collection(db, this.collectionName),
            where('userId', '==', userId),
            where('read', '==', false)
        );

        // We can't easily do this client-side efficiently without batching, 
        // but for the MVP this is a placeholder. 
        // A better approach is to have a 'lastReadAt' timestamp on the user profile.
        console.log('Mark all as read not fully implemented for client-side efficiency');
    }

    /**
     * Create a notification (Internal/Admin use)
     */
    async createNotification(data: Omit<NotificationDocument, 'id' | 'createdAt' | 'read'>) {
        await addDoc(collection(db, this.collectionName), {
            ...data,
            read: false,
            createdAt: serverTimestamp()
        });
    }
}

export const notificationService = new NotificationService();
