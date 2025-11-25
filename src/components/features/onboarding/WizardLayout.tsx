"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { cn } from "@/lib/utils"

interface WizardLayoutProps {
    title: string
    description: string
    children: React.ReactNode
    onNext: () => void
    onBack?: () => void
    isNextDisabled?: boolean
    nextLabel?: string
}

export const WizardLayout = ({
    title,
    description,
    children,
    onNext,
    onBack,
    isNextDisabled = false,
    nextLabel = "Next Step",
}: WizardLayoutProps) => {
    const { currentStep } = useOnboardingStore()
    const totalSteps = 3
    const progress = (currentStep / totalSteps) * 100

    return (
        <div className="max-w-2xl mx-auto w-full space-y-8 animate-fade-in">
            {/* Progress Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Main Content Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
                    <p className="text-muted-foreground text-lg">{description}</p>
                </div>

                <div className="py-4">
                    {children}
                </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    disabled={!onBack}
                    className={cn(!onBack && "invisible")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="flex items-center gap-4">
                    <Button variant="outline" className="hidden sm:flex" onClick={() => window.open('/chat', '_blank')}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask for Help
                    </Button>

                    <Button onClick={onNext} disabled={isNextDisabled} className="min-w-[120px]">
                        {nextLabel}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
