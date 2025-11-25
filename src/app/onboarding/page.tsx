"use client"

import React from "react"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { StepVibe } from "@/components/features/onboarding/StepVibe"
import { StepContent } from "@/components/features/onboarding/StepContent"
import { StepGoal } from "@/components/features/onboarding/StepGoal"

export default function OnboardingPage() {
    const { currentStep } = useOnboardingStore()
    const [mounted, setMounted] = React.useState(false)

    // Prevent hydration mismatch for persisted state
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6 md:p-12">
                {currentStep === 1 && <StepVibe />}
                {currentStep === 2 && <StepContent />}
                {currentStep === 3 && <StepGoal />}
            </main>
        </div>
    )
}
