import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Phase 1: Business Info
export interface BusinessInfo {
    businessName: string
    industry: string | null // plumber, electrician, cleaner, builder, landscaper, other
    customIndustry?: string
    location: string
    serviceType: 'travel' | 'onsite' | 'both' | null
    yearsInBusiness: 'starting' | '1-2' | '3-5' | '5+' | null
}

// Phase 2: What Makes You Different
export interface BrandVoice {
    pubDescription: string // The "Pub Test" answer
    services: string[] // Selected services
    customServices: string[]
    secretSauce: string[] // Top 3 customer feedback points
    certifications: string[] // Trust signals
    jobsCompleted: '50+' | '100+' | '500+' | '1000+' | 'lost-count' | null
}

// Phase 3: Target Customer
export interface TargetCustomer {
    customerType: ('homeowners' | 'businesses' | 'tradespeople' | 'elderly' | 'mixed')[]
    serviceAreaMiles: number | null
    specificAreas: string[]
    pricePositioning: 'budget' | 'mid-range' | 'premium' | null
    dreamJob: string
}

// Phase 4: Visual Direction
export interface VisualDirection {
    inspirationUrls: string[]
    vibe: 'clean-professional' | 'friendly-approachable' | 'bold-confident' | 'traditional-trustworthy' | 'modern-sleek' | null
    colorPalette: 'ocean' | 'forest' | 'sunset' | 'slate' | 'midnight' | 'custom' | null
    customColors: string[]
    hasLogo: boolean
    logoUrl: string | null
    hasBusinessCards: boolean
    hasVanLivery: boolean
    hasSocialGraphics: boolean
    hasWorkPhotos: boolean
}

// Phase 5: Essentials
export interface Essentials {
    contactMethods: ('phone' | 'email' | 'whatsapp' | 'contact-form' | 'messenger')[]
    phone: string
    email: string
    businessHours: string
    showHours: boolean
    socialMedia: {
        facebook?: string
        instagram?: string
        tiktok?: string
        youtube?: string
        linkedin?: string
        googleBusiness?: string
    }
    hasExistingWebsite: boolean
    existingWebsiteUrl?: string
    hasDomain: boolean
    domainName?: string
    photos: string[] // URLs or file references
    reviewSources: string[]
    testimonials: string
}

// Phase 6: Goals
export interface Goals {
    primaryGoal: 'phone-ringing' | 'online-booking' | 'look-professional' | 'google-ranking' | 'win-bigger-jobs' | null
    timeline: 'yesterday' | '2-weeks' | '1-month' | 'no-rush' | null
    additionalNotes: string
}

// Complete onboarding data structure
export interface OnboardingData {
    businessInfo: BusinessInfo
    brandVoice: BrandVoice
    targetCustomer: TargetCustomer
    visualDirection: VisualDirection
    essentials: Essentials
    goals: Goals
}

interface OnboardingState {
    currentStep: number
    data: OnboardingData
    setData: (data: Partial<OnboardingData>) => void
    updateBusinessInfo: (data: Partial<BusinessInfo>) => void
    updateBrandVoice: (data: Partial<BrandVoice>) => void
    updateTargetCustomer: (data: Partial<TargetCustomer>) => void
    updateVisualDirection: (data: Partial<VisualDirection>) => void
    updateEssentials: (data: Partial<Essentials>) => void
    updateGoals: (data: Partial<Goals>) => void
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    reset: () => void

    // Firebase Actions
    isSaving: boolean
    saveProject: () => Promise<string | null>
}

const initialData: OnboardingData = {
    businessInfo: {
        businessName: '',
        industry: null,
        location: '',
        serviceType: null,
        yearsInBusiness: null,
    },
    brandVoice: {
        pubDescription: '',
        services: [],
        customServices: [],
        secretSauce: [],
        certifications: [],
        jobsCompleted: null,
    },
    targetCustomer: {
        customerType: [],
        serviceAreaMiles: null,
        specificAreas: [],
        pricePositioning: null,
        dreamJob: '',
    },
    visualDirection: {
        inspirationUrls: [],
        vibe: null,
        colorPalette: null,
        customColors: [],
        hasLogo: false,
        logoUrl: null,
        hasBusinessCards: false,
        hasVanLivery: false,
        hasSocialGraphics: false,
        hasWorkPhotos: false,
    },
    essentials: {
        contactMethods: [],
        phone: '',
        email: '',
        businessHours: '',
        showHours: true,
        socialMedia: {},
        hasExistingWebsite: false,
        hasDomain: false,
        photos: [],
        reviewSources: [],
        testimonials: '',
    },
    goals: {
        primaryGoal: null,
        timeline: null,
        additionalNotes: '',
    },
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            currentStep: 1,
            data: initialData,
            setData: (newData) =>
                set((state) => ({
                    data: { ...state.data, ...newData },
                })),
            updateBusinessInfo: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        businessInfo: { ...state.data.businessInfo, ...newData },
                    },
                })),
            updateBrandVoice: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        brandVoice: { ...state.data.brandVoice, ...newData },
                    },
                })),
            updateTargetCustomer: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        targetCustomer: { ...state.data.targetCustomer, ...newData },
                    },
                })),
            updateVisualDirection: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        visualDirection: { ...state.data.visualDirection, ...newData },
                    },
                })),
            updateEssentials: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        essentials: { ...state.data.essentials, ...newData },
                    },
                })),
            updateGoals: (newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        goals: { ...state.data.goals, ...newData },
                    },
                })),
            setStep: (step) => set({ currentStep: step }),
            nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
            prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
            reset: () => set({ currentStep: 1, data: initialData }),

            // Firebase Migration
            isSaving: false,
            saveProject: async () => {
                const { data } = get()
                set({ isSaving: true })

                try {
                    // Import services dynamically to avoid circular dependencies or initialization issues
                    const { firestoreService } = await import('@/lib/firebase/firestore')
                    const { authService } = await import('@/lib/firebase/auth')

                    // Get current user or use placeholder
                    const user = authService.getCurrentUser()
                    const userId = user?.uid || 'test-user-123'

                    // Construct Project Document
                    const projectData = {
                        userId,
                        businessName: data.businessInfo.businessName,
                        industry: data.businessInfo.industry || 'other',
                        location: data.businessInfo.location,
                        serviceArea: data.targetCustomer.specificAreas.join(', '),

                        brief: {
                            pubDescription: data.brandVoice.pubDescription,
                            services: data.brandVoice.services,
                            uniqueSellingPoints: data.brandVoice.secretSauce,
                            certifications: data.brandVoice.certifications,
                            targetCustomer: data.targetCustomer.customerType.join(', '),
                            pricePositioning: data.targetCustomer.pricePositioning || 'mid-range',

                            inspirationUrls: data.visualDirection.inspirationUrls,
                            vibe: data.visualDirection.vibe || 'modern-sleek',
                            colorPalette: data.visualDirection.colorPalette || 'blue',

                            phone: data.essentials.phone,
                            email: data.essentials.email,
                            businessHours: data.essentials.businessHours,
                            socialLinks: data.essentials.socialMedia,
                        },

                        status: 'onboarding',
                        currentPhase: 1,

                        logoUrl: data.visualDirection.logoUrl,
                        photos: data.essentials.photos,

                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }

                    const projectId = await firestoreService.createDocument('projects', projectData)
                    console.log('Project saved with ID:', projectId)

                    set({ isSaving: false })
                    return projectId
                } catch (error) {
                    console.error('Failed to save project:', error)
                    set({ isSaving: false })
                    return null
                }
            }
        }),
        {
            name: 'seojack-onboarding-storage',
        }
    )
)
