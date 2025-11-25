import React from 'react';
import { useOnboardingStore } from '../store';

export const VibeStep = () => {
    const { vibe, setVibe } = useOnboardingStore();

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-purple">Step 1: The Vibe</h2>
            <p className="text-gray-600">Let's define the look and feel of your new site.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand Colors</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple p-2 border"
                        placeholder="e.g. #FF5733, Navy Blue"
                        value={vibe.colors}
                        onChange={(e) => setVibe({ colors: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Style Preference</label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple p-2 border"
                        value={vibe.style}
                        onChange={(e) => setVibe({ style: e.target.value })}
                    >
                        <option value="">Select a style...</option>
                        <option value="modern">Modern & Clean</option>
                        <option value="classic">Classic & Professional</option>
                        <option value="bold">Bold & Creative</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Websites you like</label>
                    <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple p-2 border"
                        rows={3}
                        placeholder="Paste URLs here..."
                        value={vibe.examples}
                        onChange={(e) => setVibe({ examples: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};
