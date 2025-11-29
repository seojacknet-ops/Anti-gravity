import { create } from 'zustand'
import { authService } from '@/services/auth'
import { databaseService } from '@/services/database'

export type PlanTier = 'starter' | 'growth' | 'pro'

export interface PlanDetails {
    id: PlanTier
    name: string
    price: number
    pages: number
    features: string[]
}

export const PLANS: Record<PlanTier, PlanDetails> = {
    starter: {
        id: 'starter',
        name: 'Starter',
        price: 97,
        pages: 5,
        features: ['5 Pages', 'Basic SEO', 'Standard Support', '1 Revision Round'],
    },
    growth: {
        id: 'growth',
        name: 'Growth',
        price: 197,
        pages: 10,
        features: ['10 Pages', 'Advanced SEO', 'Priority Support', '3 Revision Rounds', 'Blog Setup'],
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        price: 297,
        pages: 15,
        features: ['15 Pages', 'Premium SEO', '24/7 Concierge', 'Unlimited Revisions', 'E-commerce Ready'],
    },
}

interface BillingState {
    currentPlan: PlanTier
    status: 'active' | 'past_due' | 'canceled'
    nextBillingDate: string
    paymentMethod: string // Mocked "Visa ending in 4242"

    upgradePlan: (plan: PlanTier) => Promise<void>
    downgradePlan: (plan: PlanTier) => Promise<void>
    cancelPlan: () => Promise<void>
    fetchSubscription: () => Promise<void>
    isLoading: boolean
}

export const useBillingStore = create<BillingState>()((set, get) => ({
    currentPlan: 'starter',
    status: 'active',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'Visa ending in 4242',
    isLoading: false,

    fetchSubscription: async () => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            const userDoc = await databaseService.read<any>('users', user.id)

            if (userDoc && userDoc.plan) {
                set({
                    currentPlan: userDoc.plan as PlanTier,
                    status: userDoc.subscriptionStatus as any || 'active',
                    nextBillingDate: userDoc.subscriptionEndDate ? new Date(userDoc.subscriptionEndDate).toISOString() : new Date().toISOString()
                })
            }
        } catch (error) {
            console.error('Failed to fetch subscription:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    upgradePlan: async (plan) => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            // Simulate Stripe Checkout process
            console.log(`Redirecting to Stripe for ${plan}...`)
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Update Firestore directly for now (mocking webhook)
            await databaseService.update('users', user.id, {
                plan,
                subscriptionStatus: 'active',
                updatedAt: new Date()
            })

            set({ currentPlan: plan, status: 'active' })
        } catch (error) {
            console.error('Failed to upgrade plan:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    downgradePlan: async (plan) => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            console.log(`Downgrading to ${plan}...`)
            await new Promise(resolve => setTimeout(resolve, 1000))

            await databaseService.update('users', user.id, {
                plan,
                updatedAt: new Date()
            })

            set({ currentPlan: plan })
        } catch (error) {
            console.error('Failed to downgrade plan:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    cancelPlan: async () => {
        set({ isLoading: true })
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            await databaseService.update('users', user.id, {
                subscriptionStatus: 'canceled',
                updatedAt: new Date()
            })

            set({ status: 'canceled' })
        } catch (error) {
            console.error('Failed to cancel plan:', error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
