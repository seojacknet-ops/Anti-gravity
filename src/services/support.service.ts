import { databaseService } from './database';
import { TicketDocument } from '@/lib/schemas/firebase';
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    arrayUnion
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

class SupportService {
    private collectionName = 'tickets';

    /**
     * Create a new support ticket
     */
    async createTicket(userId: string, projectId: string, data: Pick<TicketDocument, 'title' | 'description' | 'type' | 'priority'>) {
        return await addDoc(collection(db, this.collectionName), {
            ...data,
            userId,
            projectId,
            status: 'open',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    }

    /**
     * Subscribe to tickets for a user
     */
    subscribeToTickets(userId: string, callback: (tickets: TicketDocument[]) => void) {
        const q = query(
            collection(db, this.collectionName),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        return onSnapshot(q, (snapshot) => {
            const tickets = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as TicketDocument));
            callback(tickets);
        });
    }

    /**
     * Add a comment to a ticket (using a subcollection or array - let's use subcollection for scalability)
     * Note: The schema didn't explicitly define comments, but we'll add it as a subcollection.
     */
    async addComment(ticketId: string, userId: string, text: string, isStaff: boolean = false) {
        const commentRef = collection(db, this.collectionName, ticketId, 'comments');
        await addDoc(commentRef, {
            text,
            userId,
            isStaff,
            createdAt: serverTimestamp()
        });

        // Update ticket updated timestamp
        await updateDoc(doc(db, this.collectionName, ticketId), {
            updatedAt: serverTimestamp(),
            status: isStaff ? 'awaiting_info' : 'open' // Simple status logic
        });
    }

    /**
     * Subscribe to comments for a ticket
     */
    subscribeToComments(ticketId: string, callback: (comments: any[]) => void) {
        const q = query(
            collection(db, this.collectionName, ticketId, 'comments'),
            orderBy('createdAt', 'asc')
        );

        return onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(comments);
        });
    }
}

export const supportService = new SupportService();
