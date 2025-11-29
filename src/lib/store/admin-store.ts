import { create } from 'zustand'
import { UserDocument, ProjectDocument, TicketDocument } from '@/lib/schemas/firebase'
import { databaseService } from '@/services/database'

interface AdminState {
    projects: ProjectDocument[]
    users: UserDocument[]
    tickets: TicketDocument[]
    isLoading: boolean
    stats: {
        totalRevenue: number
        activeProjects: number
        openTickets: number
        unreadMessages: number
    }

    fetchDashboardData: () => Promise<void>
}

export const useAdminStore = create<AdminState>()((set, get) => ({
    projects: [],
    users: [],
    tickets: [],
    isLoading: false,
    stats: {
        totalRevenue: 0,
        activeProjects: 0,
        openTickets: 0,
        unreadMessages: 0
    },

    fetchDashboardData: async () => {
        set({ isLoading: true })
        try {
            // Parallel fetch
            const [projects, users, tickets] = await Promise.all([
                databaseService.query<any>('projects'),
                databaseService.query<any>('users'),
                databaseService.query<any>('tickets')
            ])

            // Calculate stats
            // Revenue: Sum of 'pro' plan users * price (mock calculation)
            // Starter: 299, Growth: 599, Pro: 999
            let revenue = 0
            users.forEach(u => {
                if (u.plan === 'starter') revenue += 299
                if (u.plan === 'growth') revenue += 599
                if (u.plan === 'pro') revenue += 999
            })

            const activeProjects = projects.length
            const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length

            // Mock unread messages for now as we don't have a global message query yet
            const unreadMessages = 12

            set({
                projects,
                users,
                tickets,
                stats: {
                    totalRevenue: revenue,
                    activeProjects,
                    openTickets,
                    unreadMessages
                },
                isLoading: false
            })

        } catch (error) {
            console.error('Failed to fetch admin dashboard data:', error)
            set({ isLoading: false })
        }
    }
}))
