import { create } from 'zustand'
import { toast } from 'sonner'
import { MessageDocument as Message } from '@/lib/schemas/firebase'

interface ChatState {
    messages: Message[]
    isOpen: boolean
    isLoading: boolean

    setIsOpen: (isOpen: boolean) => void
    sendMessage: (content: string) => Promise<void>
    subscribeToMessages: () => () => void // Returns unsubscribe function
}

export const useChatStore = create<ChatState>()((set, get) => ({
    messages: [],
    isOpen: false,
    isLoading: false,

    setIsOpen: (isOpen) => set({ isOpen }),

    subscribeToMessages: () => {
        // We need to import these dynamically to avoid circular deps if any, 
        // but mainly to keep the store clean until used.
        // However, for subscription we need to set up the listener.

        let unsubscribe = () => { }

        import('@/lib/firebase/firestore').then(async ({ firestoreService }) => {
            import('@/lib/firebase/auth').then(({ authService }) => {
                import('firebase/firestore').then(({ onSnapshot, collection, query, orderBy, where }) => {
                    import('@/lib/firebase/client').then(({ db }) => {
                        const user = authService.getCurrentUser()
                        // For migration, use test user if not logged in
                        const userId = user?.uid || 'test-user-123'

                        // We need a conversation ID. For now, let's assume a single conversation per user.
                        // In a real app, we'd query for the active conversation or create one.
                        // Let's use a deterministic ID for the test user: `conv_${userId}`
                        const conversationId = `conv_${userId}`

                        const messagesRef = collection(db, `conversations/${conversationId}/messages`)
                        const q = query(messagesRef, orderBy('createdAt', 'asc'))

                        unsubscribe = onSnapshot(q, (snapshot) => {
                            const messages = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            })) as Message[]

                            set({ messages })
                        }, (error) => {
                            console.error("Chat subscription error:", error)
                        })
                    })
                })
            })
        })

        return () => unsubscribe()
    },

    sendMessage: async (content) => {
        if (!content.trim()) return

        try {
            const { firestoreService } = await import('@/lib/firebase/firestore')
            const { authService } = await import('@/lib/firebase/auth')

            const user = authService.getCurrentUser()
            const userId = user?.uid || 'test-user-123'
            const conversationId = `conv_${userId}`

            // Ensure conversation exists (idempotent-ish)
            // In a real app, we'd check existence first or use setDoc with merge
            await firestoreService.setDocument('conversations', conversationId, {
                participants: [userId, 'support-agent'],
                updatedAt: new Date(),
                lastMessage: {
                    text: content,
                    senderId: userId,
                    timestamp: new Date()
                },
                unreadCount: {
                    'support-agent': 1
                }
            })

            // Add message
            await firestoreService.createDocument(`conversations/${conversationId}/messages`, {
                text: content,
                senderId: userId,
                senderName: user?.displayName || 'User',
                isStaff: false,
                readBy: [userId],
                createdAt: new Date()
            })

        } catch (error) {
            console.error('Failed to send message:', error)
            toast.error('Failed to send message')
        }
    }
}))
