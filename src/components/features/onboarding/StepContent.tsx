"use client"

import React from "react"
import { WizardLayout } from "./WizardLayout"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileImage } from "lucide-react"

export const StepContent = () => {
    const { data, setData, setStep } = useOnboardingStore()

    const handleNext = () => {
        setStep(3)
    }

    const handleBack = () => {
        setStep(1)
    }

    // Mock file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // In a real app, we'd upload to S3 here
            setData({ logo: file.name })
        }
    }

    return (
        <WizardLayout
            title="Content & Assets"
            description="Upload your logo and tell us a bit about your business."
            onNext={handleNext}
            onBack={handleBack}
            isNextDisabled={!data.bio}
        >
            <div className="space-y-8">
                {/* Logo Upload */}
                <div className="space-y-4">
                    <Label>Upload Logo</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-surface-hover transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <div className="flex flex-col items-center gap-2">
                            {data.logo ? (
                                <>
                                    <FileImage className="w-10 h-10 text-brand-purple" />
                                    <p className="text-sm font-medium text-foreground">{data.logo}</p>
                                    <p className="text-xs text-muted-foreground">Click to replace</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 text-muted-foreground" />
                                    <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
                                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG (Max 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio Input */}
                <div className="space-y-4">
                    <Label>About Us (Bio)</Label>
                    <Textarea
                        placeholder="We are a digital agency focused on..."
                        className="min-h-[150px]"
                        value={data.bio}
                        onChange={(e) => setData({ bio: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        This will be used for the initial "About" section on your site.
                    </p>
                </div>
            </div>
        </WizardLayout>
    )
}
