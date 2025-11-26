"use client"

import React from "react"
import { WizardLayout } from "./WizardLayout"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Palette, LayoutTemplate, Zap } from "lucide-react"

export const StepVibe = () => {
    const { data, updateVisualDirection, setStep } = useOnboardingStore()
    const [customColor, setCustomColor] = React.useState("")

    const styles = [
        {
            id: "modern-sleek",
            title: "Modern & Clean",
            description: "Minimalist, lots of whitespace, sans-serif fonts.",
            icon: LayoutTemplate,
        },
        {
            id: "traditional-trustworthy",
            title: "Classic & Trust",
            description: "Serif fonts, traditional layouts, corporate feel.",
            icon: Palette,
        },
        {
            id: "bold-confident",
            title: "Bold & Electric",
            description: "High contrast, vibrant colors, unique typography.",
            icon: Zap,
        },
    ] as const

    const handleNext = () => {
        setStep(2)
    }

    const addColor = () => {
        if (customColor && !data.visualDirection.customColors.includes(customColor)) {
            updateVisualDirection({ customColors: [...data.visualDirection.customColors, customColor] })
            setCustomColor("")
        }
    }

    return (
        <WizardLayout
            title="Let's set the Vibe"
            description="Choose a style that matches your brand personality."
            onNext={handleNext}
            isNextDisabled={!data.visualDirection.vibe}
        >
            <div className="space-y-8">
                {/* Style Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {styles.map((style) => (
                        <Card
                            key={style.id}
                            className={cn(
                                "cursor-pointer hover:border-brand-purple transition-all p-4 space-y-3",
                                data.visualDirection.vibe === style.id ? "border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple" : "border-input"
                            )}
                            onClick={() => updateVisualDirection({ vibe: style.id as any })}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                data.visualDirection.vibe === style.id ? "bg-brand-purple text-white" : "bg-secondary text-muted-foreground"
                            )}>
                                <style.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{style.title}</h3>
                                <p className="text-sm text-muted-foreground">{style.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Brand Colors */}
                <div className="space-y-4">
                    <Label>Brand Colors (Hex Codes)</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="#000000"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="max-w-[200px]"
                        />
                        <button
                            onClick={addColor}
                            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data.visualDirection.customColors.map((color, index) => (
                            <div key={index} className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
                                <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color }} />
                                <span className="text-sm font-mono">{color}</span>
                                <button
                                    onClick={() => updateVisualDirection({ customColors: data.visualDirection.customColors.filter((_, i) => i !== index) })}
                                    className="ml-1 text-muted-foreground hover:text-destructive"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WizardLayout>
    )
}
