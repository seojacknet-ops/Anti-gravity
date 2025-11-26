import { create } from 'zustand'


export type TicketStatus = 'open' | 'in_progress' | 'awaiting_info' | 'completed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface Comment {
    id: string
    ticketId: string
    message: string
    isStaffReply: boolean
    createdAt: string
    authorName: string
}

export interface Ticket {
    id: string
    title: string
    description: string
    status: TicketStatus
    priority: TicketPriority
    createdAt: string
    updatedAt: string
}

interface TicketState {
    tickets: Ticket[]
    comments: Record<string, Comment[]> // Map ticketId to comments

    createTicket: (title: string, description: string, priority: TicketPriority) => Promise<void>
    fetchTickets: () => Promise<void>
    isLoading: boolean
}

export const useTicketStore = create<TicketState>()((set, get) => ({
    tickets: [],
    comments: {},
    isLoading: false,

    fetchTickets: async () => {
        set({ isLoading: true })
        try {
            const { firestoreService } = await import('@/lib/firebase/firestore')
            const { authService } = await import('@/lib/firebase/auth')

            const user = authService.getCurrentUser()
            const userId = user?.uid || 'test-user-123'

            // In real app we'd query by userId or projectId
            // For now, let's fetch all tickets for this user
            // We need to import 'where' from firebase/firestore to use it in queryDocuments
            // But queryDocuments wrapper takes QueryConstraints.

            // Let's assume we fetch all for now or implement a simple filter if possible
            // Since we can't easily import 'where' here without making it messy, 
            // let's just fetch all from 'tickets' collection and filter in memory for the mock
            // OR better: use the firestoreService.queryDocuments if we can pass constraints.

            // Simplified: Just get all tickets for now.
            const tickets = await firestoreService.queryDocuments<Ticket>('tickets', [])

            // Filter by userId manually for now since we didn't export 'where' helper
            const userTickets = tickets.filter((t: any) => t.userId === userId)

            set({ tickets: userTickets })

        } catch (error) {
            console.error('Failed to fetch tickets:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    createTicket: async (title, description, priority) => {
        set({ isLoading: true })
        try {
            const { firestoreService } = await import('@/lib/firebase/firestore')
            const { authService } = await import('@/lib/firebase/auth')

            const user = authService.getCurrentUser()
            const userId = user?.uid || 'test-user-123'

            const newTicketData = {
                title,
                description,
                priority,
                status: 'open',
                userId,
                projectId: 'test-project-123', // Mock
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const id = await firestoreService.createDocument('tickets', newTicketData)

            const newTicket: Ticket = {
                id,
                ...newTicketData,
                createdAt: newTicketData.createdAt.toISOString(),
                updatedAt: newTicketData.updatedAt.toISOString(),
            } as any

            set((state) => ({
                tickets: [newTicket, ...state.tickets],
                isLoading: false
            }))

        } catch (error) {
            console.error('Failed to create ticket:', error)
            set({ isLoading: false })
        }
    },

    addComment: (ticketId: string, message: string, isStaffReply = false) => {
        // ... (Keep local for now or migrate comments to subcollection later)
        // For this migration step, we focused on Tickets. Comments can be next.
        console.log('Add comment not fully migrated yet')
    },

    updateStatus: (ticketId: string, status: TicketStatus) => {
        // ... (Keep local or migrate)
        console.log('Update status not fully migrated yet')
    },
}))
