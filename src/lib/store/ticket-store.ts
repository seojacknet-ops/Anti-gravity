import { create } from 'zustand'
import { supportService } from '@/services/support.service'
import { authService } from '@/services/auth'
import { TicketDocument } from '@/lib/schemas/firebase'

export type TicketStatus = 'open' | 'in_progress' | 'awaiting_info' | 'completed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface Comment {
    id: string
    ticketId: string
    text: string
    isStaff: boolean
    createdAt: any
    userId: string
}

export type Ticket = TicketDocument

interface TicketState {
    tickets: Ticket[]
    comments: Record<string, Comment[]>
    isLoading: boolean

    fetchTickets: () => Promise<void>
    createTicket: (title: string, description: string, priority: TicketPriority, type: 'bug' | 'tweak' | 'feature') => Promise<void>
    fetchComments: (ticketId: string) => void
    addComment: (ticketId: string, text: string) => Promise<void>
}

export const useTicketStore = create<TicketState>()((set, get) => ({
    tickets: [],
    comments: {},
    isLoading: false,

    fetchTickets: async () => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            // Subscribe to tickets
            supportService.subscribeToTickets(user.id, (tickets) => {
                set({ tickets, isLoading: false })
            })
        } catch (error) {
            console.error('Failed to fetch tickets:', error)
            set({ isLoading: false })
        }
    },

    createTicket: async (title, description, priority, type) => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) throw new Error('User not authenticated')

            await supportService.createTicket(user.id, user.id, {
                title,
                description,
                priority,
                type
            })
            // Subscription will update the list
        } catch (error) {
            console.error('Failed to create ticket:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    fetchComments: (ticketId: string) => {
        supportService.subscribeToComments(ticketId, (comments) => {
            set((state) => ({
                comments: {
                    ...state.comments,
                    [ticketId]: comments
                }
            }))
        })
    },

    addComment: async (ticketId: string, text: string) => {
        const user = await authService.getCurrentUser()
        if (!user) return

        await supportService.addComment(ticketId, user.id, text, false)
    }
}))
