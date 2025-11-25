import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OnboardingData {
    // Step 1: The Vibe
    style: 'modern' | 'classic' | 'bold' | null
    brandColors: string[]
    exampleSites: string

    // Step 2: The Content
    logo: string | null // Mock URL for now
    bio: string

    // Step 3: The Goal
    goal: 'leads' | 'sales' | 'awareness' | null
}

interface OnboardingState {
    currentStep: number
    data: OnboardingData
    setData: (data: Partial<OnboardingData>) => void
    setStep: (step: number) => void
    reset: () => void
}

const initialData: OnboardingData = {
    style: null,
    brandColors: [],
    exampleSites: '',
    logo: null,
    bio: '',
    goal: null,
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            currentStep: 1,
            data: initialData,
            setData: (newData) =>
                set((state) => ({
                    data: { ...state.data, ...newData },
                })),
            setStep: (step) => set({ currentStep: step }),
            reset: () => set({ currentStep: 1, data: initialData }),
        }),
        {
            name: 'seojack-onboarding-storage',
        }
    )
)
