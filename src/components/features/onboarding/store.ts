import { create } from 'zustand';

interface OnboardingState {
    step: number;
    vibe: {
        colors: string;
        style: string;
        examples: string;
    };
    content: {
        logo: File | null;
        bio: string;
    };
    goal: string;
    setStep: (step: number) => void;
    setVibe: (vibe: Partial<OnboardingState['vibe']>) => void;
    setContent: (content: Partial<OnboardingState['content']>) => void;
    setGoal: (goal: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    step: 1,
    vibe: { colors: '', style: '', examples: '' },
    content: { logo: null, bio: '' },
    goal: '',
    setStep: (step) => set({ step }),
    setVibe: (vibe) => set((state) => ({ vibe: { ...state.vibe, ...vibe } })),
    setContent: (content) => set((state) => ({ content: { ...state.content, ...content } })),
    setGoal: (goal) => set({ goal }),
}));
