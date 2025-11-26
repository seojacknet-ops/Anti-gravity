'use client';

import { useState, useEffect, useCallback } from 'react';
import { chatService } from '@/services/chat.service';
import { useAuth } from './useAuth';
import { MessageDocument } from '@/lib/schemas/firebase';

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
