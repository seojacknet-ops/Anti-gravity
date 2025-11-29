'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

import { toast } from "sonner";

import { useMediaStore } from '@/lib/store/media-store';

export const FileUploader = () => {
    const { uploadFile, isUploading } = useMediaStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Upload each file
        acceptedFiles.forEach(file => {
            uploadFile(file);
        });
    }, [uploadFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-300 hover:border-brand-purple'
                }`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-full">
                    <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-brand-purple' : 'text-gray-400'}`} />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-900">
                        {isUploading ? 'Uploading...' : isDragActive ? 'Drop files here...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                </div>
            </div>
        </div>
    );
};
