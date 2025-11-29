'use client'

import React from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'
import { COLOR_PALETTES, VIBE_OPTIONS } from '@/lib/config/industry-defaults'

export const Step4VisualDirection = () => {
    const { data, updateVisualDirection } = useOnboardingStore()
    const { visualDirection } = data

    const addInspirationUrl = (url: string) => {
        if (url.trim() && visualDirection.inspirationUrls.length < 3) {
            updateVisualDirection({
                inspirationUrls: [...visualDirection.inspirationUrls, url.trim()],
            })
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">The Look & Feel 🎨</h2>
                <p className="text-gray-600">
                    Now for the fun part - let's design how this looks. No technical jargon, just vibes.
                </p>
            </div>

            {/* Website Inspiration */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Website Inspiration (Most Important!)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                    Pick 2-3 websites you like the look of (any industry). We'll analyze the style.
                </p>
                <input
                    type="url"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                    placeholder="Paste a website URL and press Enter..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addInspirationUrl(e.currentTarget.value)
                            e.currentTarget.value = ''
                        }
                    }}
                />
                {visualDirection.inspirationUrls.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {visualDirection.inspirationUrls.map((url, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-brand-purple hover:underline truncate"
                                >
                                    {url}
                                </a>
                                <button
                                    onClick={() =>
                                        updateVisualDirection({
                                            inspirationUrls: visualDirection.inspirationUrls.filter(
                                                (_, i) => i !== idx
                                            ),
                                        })
                                    }
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <p className="mt-2 text-xs text-gray-500">
                    {visualDirection.inspirationUrls.length}/3 websites added
                </p>
            </div>

            {/* Vibe Check */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Vibe Check</label>
                <p className="text-sm text-gray-600 mb-4">
                    How should your website feel to visitors?
                </p>
                <div className="space-y-3">
                    {VIBE_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            onClick={() =>
                                updateVisualDirection({
                                    vibe: option.id as
                                        | 'clean-professional'
                                        | 'friendly-approachable'
                                        | 'bold-confident'
                                        | 'traditional-trustworthy'
                                        | 'modern-sleek',
                                })
                            }
                            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${visualDirection.vibe === option.id
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-16 h-16 ${option.preview} flex-shrink-0`}></div>
                                <div>
                                    <div className="font-semibold text-gray-900">{option.name}</div>
                                    <div className="text-sm text-gray-600">{option.description}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>


            {/* Typography */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Typography</label>
                <p className="text-sm text-gray-600 mb-4">
                    Which font style do you prefer?
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        {
                            id: 'modern-sans',
                            label: 'Modern Sans',
                            desc: 'Clean & Minimal',
                            preview: 'Aa',
                            fontClass: 'font-sans',
                        },
                        {
                            id: 'classic-serif',
                            label: 'Classic Serif',
                            desc: 'Trustworthy & Traditional',
                            preview: 'Aa',
                            fontClass: 'font-serif',
                        },
                        {
                            id: 'bold-display',
                            label: 'Bold Display',
                            desc: 'Loud & Confident',
                            preview: 'Aa',
                            fontClass: 'font-black',
                        },
                        {
                            id: 'handwritten',
                            label: 'Handwritten',
                            desc: 'Personal & Creative',
                            preview: 'Aa',
                            fontClass: 'italic',
                        },
                    ].map((font) => (
                        <button
                            key={font.id}
                            onClick={() =>
                                updateVisualDirection({
                                    fontPreference: font.id as any,
                                })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${visualDirection.fontPreference === font.id
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`text-3xl ${font.fontClass} text-gray-900`}>
                                    {font.preview}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{font.label}</div>
                                    <div className="text-sm text-gray-600">{font.desc}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Preference */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Pick a color family
                </label>
                <p className="text-sm text-gray-600 mb-4">
                    Choose a palette that feels right for your brand
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
                        <button
                            key={key}
                            onClick={() =>
                                updateVisualDirection({
                                    colorPalette: key as
                                        | 'ocean'
                                        | 'forest'
                                        | 'sunset'
                                        | 'slate'
                                        | 'midnight'
                                        | 'custom',
                                })
                            }
                            className={`p-4 border-2 rounded-lg transition-all ${visualDirection.colorPalette === key
                                ? 'border-brand-purple ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{palette.emoji}</div>
                            <div className="font-semibold text-gray-900 mb-1">{palette.name}</div>
                            <div className="text-xs text-gray-600 mb-3">{palette.description}</div>
                            {palette.colors.length > 0 && (
                                <div className="flex gap-1">
                                    {palette.colors.map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="w-8 h-8 rounded"
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
                {visualDirection.colorPalette === 'custom' && (
                    <div className="mt-4">
                        <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            placeholder="Enter your brand colors (e.g. #FF5733, Navy Blue)"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                    updateVisualDirection({
                                        customColors: [
                                            ...visualDirection.customColors,
                                            e.currentTarget.value.trim(),
                                        ],
                                    })
                                    e.currentTarget.value = ''
                                }
                            }}
                        />
                        {visualDirection.customColors.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {visualDirection.customColors.map((color, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                                    >
                                        {color}
                                        <button
                                            onClick={() =>
                                                updateVisualDirection({
                                                    customColors: visualDirection.customColors.filter(
                                                        (_, i) => i !== idx
                                                    ),
                                                })
                                            }
                                            className="hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Existing Brand Assets */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Do you already have any of these?
                </label>
                <div className="space-y-3">
                    {[
                        { key: 'hasLogo', label: 'Logo', desc: 'Upload or send later' },
                        { key: 'hasBusinessCards', label: 'Business cards', desc: 'We can match the style' },
                        { key: 'hasVanLivery', label: 'Van livery', desc: 'Brand consistency' },
                        {
                            key: 'hasSocialGraphics',
                            label: 'Social media graphics',
                            desc: 'Existing brand assets',
                        },
                        { key: 'hasWorkPhotos', label: 'Photos of your work', desc: 'Essential for impact' },
                    ].map((asset) => (
                        <button
                            key={asset.key}
                            onClick={() =>
                                updateVisualDirection({
                                    [asset.key]: !visualDirection[
                                        asset.key as keyof typeof visualDirection
                                    ],
                                })
                            }
                            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${visualDirection[asset.key as keyof typeof visualDirection]
                                ? 'border-brand-purple bg-brand-purple/10'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${visualDirection[asset.key as keyof typeof visualDirection]
                                        ? 'bg-brand-purple border-brand-purple'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {visualDirection[asset.key as keyof typeof visualDirection] && (
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{asset.label}</div>
                                    <div className="text-sm text-gray-600">{asset.desc}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
