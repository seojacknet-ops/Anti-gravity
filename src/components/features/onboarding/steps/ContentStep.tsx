import React from 'react';
import { useOnboardingStore } from '../store';

export const ContentStep = () => {
    const { content, setContent } = useOnboardingStore();

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-purple">Step 2: The Content</h2>
            <p className="text-gray-600">Upload your assets and tell us about yourself.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-brand-purple hover:text-brand-purple-dark focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input type="file" className="sr-only" onChange={(e) => setContent({ logo: e.target.files?.[0] || null })} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    {content.logo && <p className="text-sm text-green-600 mt-2">Selected: {content.logo.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">About Us Bio</label>
                    <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple p-2 border"
                        rows={4}
                        placeholder="Tell us your story..."
                        value={content.bio}
                        onChange={(e) => setContent({ bio: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};
