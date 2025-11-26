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
    getDocs,
    writeBatch,
    arrayUnion,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { ConversationDocument, MessageDocument } from '@/lib/schemas/firebase';

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
