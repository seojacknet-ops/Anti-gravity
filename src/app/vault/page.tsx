import React from 'react';
import { FileUploader } from '@/components/features/vault/FileUploader';
import { Folder, Image, FileText } from 'lucide-react';

export default function VaultPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Media Vault</h1>
                        <p className="text-gray-600">Securely store and share your brand assets.</p>
                    </div>
                    <button className="bg-brand-purple text-white px-4 py-2 rounded-lg hover:bg-brand-purple-dark transition-colors">
                        New Folder
                    </button>
                </div>

                {/* Upload Area */}
                <div className="mb-12">
                    <FileUploader />
                </div>

                {/* Folders / Files Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Example Folders */}
                    {['Logos', 'Images', 'Documents', 'Contracts'].map((folder) => (
                        <div key={folder} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                            <Folder className="w-10 h-10 text-brand-purple mb-4" />
                            <h3 className="font-medium text-gray-900">{folder}</h3>
                            <p className="text-xs text-gray-500">0 items</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
