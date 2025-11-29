'use client'

import React, { useState } from 'react'
import { geminiService } from '@/services/gemini'
import { Sparkles, Download, RefreshCw, Loader2, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

// Lazy import storage service to avoid Firebase initialization errors
let storageService: any = null
try {
    storageService = require('@/lib/firebase/storage').storageService
} catch (error) {
    console.warn('Firebase Storage not configured. Save to Vault feature will be disabled.')
}

interface LogoGeneratorProps {
    businessName?: string
    brandAdjectives?: string[]
    onLogoGenerated?: (logoUrl: string) => void
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({
    businessName,
    brandAdjectives,
    onLogoGenerated,
}) => {
    const [prompt, setPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedLogos, setGeneratedLogos] = useState<string[]>([])
    const [selectedLogo, setSelectedLogo] = useState<string | null>(null)

    // Prompt suggestions based on common logo styles
    const promptSuggestions = [
        'A geometric abstract symbol with clean lines',
        'A minimalist icon combining letters and shapes',
        'An elegant monogram with flowing curves',
        'A bold modern emblem with strong shapes',
        'A nature-inspired organic symbol',
        'A tech-focused futuristic icon',
    ]

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a logo description')
            return
        }

        setIsGenerating(true)
        setGeneratedLogos([])
        setSelectedLogo(null)

        try {
            toast.loading('🎨 Creating your logo with AI...', { id: 'logo-gen' })

            // Generate a single logo
            const base64Image = await geminiService.generateLogo(
                prompt,
                businessName,
                brandAdjectives
            )

            // Convert to data URL for display
            const dataUrl = `data:image/png;base64,${base64Image}`
            setGeneratedLogos([dataUrl])
            setSelectedLogo(dataUrl)

            toast.success('✨ Logo generated successfully!', { id: 'logo-gen' })
        } catch (error) {
            console.error('Logo generation error:', error)
            toast.error(
                error instanceof Error ? error.message : 'Failed to generate logo',
                { id: 'logo-gen' }
            )
        } finally {
            setIsGenerating(false)
        }
    }

    const handleGenerateVariations = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a logo description')
            return
        }

        setIsGenerating(true)
        setGeneratedLogos([])
        setSelectedLogo(null)

        try {
            toast.loading('🎨 Creating 3 logo variations...', { id: 'logo-var' })

            const variations = await geminiService.generateLogoVariations(
                prompt,
                businessName,
                brandAdjectives,
                3
            )

            const dataUrls = variations.map((base64) => `data:image/png;base64,${base64}`)
            setGeneratedLogos(dataUrls)
            setSelectedLogo(dataUrls[0])

            toast.success('✨ 3 variations generated!', { id: 'logo-var' })
        } catch (error) {
            console.error('Logo variation error:', error)
            toast.error(
                error instanceof Error ? error.message : 'Failed to generate variations',
                { id: 'logo-var' }
            )
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = () => {
        if (!selectedLogo) return

        const link = document.createElement('a')
        link.href = selectedLogo
        link.download = `${businessName || 'logo'}-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success('Logo downloaded!')
    }

    const handleSaveToVault = async () => {
        if (!selectedLogo) return

        if (!storageService) {
            toast.error('Firebase Storage is not configured. Please download the logo instead.', { id: 'save-logo' })
            return
        }

        try {
            toast.loading('Saving to Media Vault...', { id: 'save-logo' })

            // Convert data URL to File
            const base64Data = selectedLogo.split(',')[1]
            const filename = `logo-${Date.now()}.png`
            const file = geminiService.base64ToFile(base64Data, filename)

            // Upload to Firebase Storage
            const userId = 'current-user-id' // TODO: Get from auth context
            const path = `media/${userId}/${filename}`
            const downloadUrl = await storageService.uploadFile(path, file)

            // Notify parent component
            if (onLogoGenerated) {
                onLogoGenerated(downloadUrl)
            }

            toast.success('✅ Logo saved to Media Vault!', { id: 'save-logo' })
        } catch (error) {
            console.error('Save logo error:', error)
            toast.error('Failed to save logo', { id: 'save-logo' })
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">AI Logo Generator</h3>
                    <p className="text-sm text-gray-600">
                        Powered by Google Gemini - Create unique logos in seconds
                    </p>
                </div>
            </div>

            {/* Business Context */}
            {(businessName || brandAdjectives) && (
                <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                        Generating for:
                    </p>
                    {businessName && (
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Business:</span> {businessName}
                        </p>
                    )}
                    {brandAdjectives && brandAdjectives.length > 0 && (
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Brand Style:</span>{' '}
                            {brandAdjectives.join(', ')}
                        </p>
                    )}
                </div>
            )}

            {/* Prompt Input */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Describe your ideal logo
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A modern geometric symbol with clean lines and a tech feel..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none"
                    rows={3}
                    disabled={isGenerating}
                />

                {/* Prompt Suggestions */}
                <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Quick ideas:</p>
                    <div className="flex flex-wrap gap-2">
                        {promptSuggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPrompt(suggestion)}
                                disabled={isGenerating}
                                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-brand-purple/10 hover:text-brand-purple rounded-full transition-colors disabled:opacity-50"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-purple text-white rounded-lg font-medium hover:bg-brand-purple-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-purple/30"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5" />
                            Generate Logo
                        </>
                    )}
                </button>

                <button
                    onClick={handleGenerateVariations}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-brand-purple text-brand-purple rounded-lg font-medium hover:bg-brand-purple/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw className="w-5 h-5" />
                    3 Variations
                </button>
            </div>

            {/* Generated Logos Display */}
            {generatedLogos.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="border-t pt-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Generated Logos
                        </h4>

                        {/* Logo Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {generatedLogos.map((logo, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedLogo(logo)}
                                    className={`aspect-square rounded-xl border-4 transition-all overflow-hidden bg-gray-50 hover:scale-105 ${selectedLogo === logo
                                        ? 'border-brand-purple shadow-lg shadow-brand-purple/30'
                                        : 'border-gray-200 hover:border-brand-purple/50'
                                        }`}
                                >
                                    <img
                                        src={logo}
                                        alt={`Logo variation ${idx + 1}`}
                                        className="w-full h-full object-contain p-4"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Selected Logo Preview */}
                        {selectedLogo && (
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-200">
                                <div className="max-w-md mx-auto">
                                    <img
                                        src={selectedLogo}
                                        alt="Selected logo"
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Action Buttons for Selected Logo */}
                                <div className="flex gap-3 mt-6 justify-center">
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                    <button
                                        onClick={handleSaveToVault}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-brand-purple text-white rounded-lg font-medium hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/30"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Save to Vault
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {generatedLogos.length === 0 && !isGenerating && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                        Describe your logo and click Generate to see AI magic ✨
                    </p>
                </div>
            )}
        </div>
    )
}
