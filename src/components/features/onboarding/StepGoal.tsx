"use client"

import React from "react"
import { WizardLayout } from "./WizardLayout"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, ShoppingBag, Megaphone } from "lucide-react"
import { useRouter } from "next/navigation"

export const StepGoal = () => {
    const { data, setData, setStep, reset } = useOnboardingStore()
    const router = useRouter()

    const goals = [
        {
            id: "leads",
            title: "Generate Leads",
            description: "Capture emails, contact forms, and inquiries.",
            icon: TrendingUp,
        },
        {
            id: "sales",
            title: "Drive Sales",
            description: "Sell products or services directly online.",
            icon: ShoppingBag,
        },
        {
            id: "awareness",
            title: "Brand Awareness",
            description: "Showcase portfolio, expertise, and content.",
            icon: Megaphone,
        },
    ] as const

    const handleNext = () => {
        // In a real app, we'd submit the data to the backend here
        console.log("Form Submitted:", data)
        alert("Onboarding Complete! Redirecting to Dashboard...")
        reset()
        router.push("/")
    }

    const handleBack = () => {
        setStep(2)
    }

    return (
        <WizardLayout
            title="Primary Goal"
            description="What is the #1 thing you want this website to achieve?"
            onNext={handleNext}
            onBack={handleBack}
            isNextDisabled={!data.goal}
            nextLabel="Finish Setup"
        >
            <div className="grid grid-cols-1 gap-4">
                {goals.map((goal) => (
                    <Card
                        key={goal.id}
                        className={cn(
                            "cursor-pointer hover:border-brand-purple transition-all p-6 flex items-center gap-6",
                            data.goal === goal.id ? "border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple" : "border-input"
                        )}
                        onClick={() => setData({ goal: goal.id })}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                            data.goal === goal.id ? "bg-brand-purple text-white" : "bg-secondary text-muted-foreground"
                        )}>
                            <goal.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground text-lg">{goal.title}</h3>
                            <p className="text-muted-foreground">{goal.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </WizardLayout>
    )
}
