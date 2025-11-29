"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, Loader2, CheckCircle, XCircle, Image, FileText } from "lucide-react"
import { useMediaStore } from "@/lib/store/media-store"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface UploadingFile {
    file: File
    progress: number
    status: 'uploading' | 'success' | 'error'
    error?: string
}

export const MediaUploader = () => {
    const { uploadFile, isUploading } = useMediaStore()
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Initialize uploading files
        const newUploads: UploadingFile[] = acceptedFiles.map(file => ({
            file,
            progress: 0,
            status: 'uploading' as const
        }))

        setUploadingFiles(prev => [...prev, ...newUploads])

        // Upload each file
        for (let i = 0; i < acceptedFiles.length; i++) {
            const file = acceptedFiles[i]

            try {
                // Simulate progress (in real app, use storage.uploadFile with progress callback)
                const progressInterval = setInterval(() => {
                    setUploadingFiles(prev => prev.map((uf, idx) => {
                        if (uf.file === file && uf.progress < 90) {
                            return { ...uf, progress: uf.progress + 10 }
                        }
                        return uf
                    }))
                }, 200)

                await uploadFile(file)

                clearInterval(progressInterval)

                // Mark as complete
                setUploadingFiles(prev => prev.map(uf =>
                    uf.file === file
                        ? { ...uf, progress: 100, status: 'success' as const }
                        : uf
                ))

                // Remove from list after 2 seconds
                setTimeout(() => {
                    setUploadingFiles(prev => prev.filter(uf => uf.file !== file))
                }, 2000)

            } catch (error) {
                setUploadingFiles(prev => prev.map(uf =>
                    uf.file === file
                        ? {
                            ...uf,
                            status: 'error' as const,
                            error: error instanceof Error ? error.message : 'Upload failed'
                        }
                        : uf
                ))
            }
        }
    }, [uploadFile])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: true
    })

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
                    "flex flex-col items-center justify-center gap-4 min-h-[200px]",
                    isDragActive
                        ? "border-brand-purple bg-brand-purple/10 scale-[1.02]"
                        : "border-gray-300 hover:border-brand-purple hover:bg-gray-50",
                    isUploading && "opacity-50 pointer-events-none"
                )}
            >
                <input {...getInputProps()} />

                {isUploading ? (
                    <Loader2 className="w-12 h-12 text-brand-purple animate-spin" />
                ) : (
                    <div className="p-4 bg-brand-purple/10 rounded-full">
                        <Upload className="w-8 h-8 text-brand-purple" />
                    </div>
                )}

                <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">
                        {isDragActive
                            ? "Drop files here"
                            : "Drag & drop files here"}
                    </p>
                    <p className="text-sm text-gray-600">
                        or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                        Supports: Images, PDFs, Documents (Max 10MB each)
                    </p>
                </div>

                {/* Supported File Types */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        <span>Images</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <File className="w-4 h-4" />
                        <span>PDFs</span>
                    </div>
                </div>
            </div>

            {/* Upload Progress List */}
            {uploadingFiles.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900">Uploading Files</h3>
                    {uploadingFiles.map((upload, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-4 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {upload.status === 'uploading' && (
                                        <Loader2 className="w-4 h-4 text-brand-purple animate-spin flex-shrink-0" />
                                    )}
                                    {upload.status === 'success' && (
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    )}
                                    {upload.status === 'error' && (
                                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {upload.file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(upload.file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>

                                <div className="text-xs font-medium text-gray-600">
                                    {upload.status === 'uploading' && `${upload.progress}%`}
                                    {upload.status === 'success' && 'Complete'}
                                    {upload.status === 'error' && 'Failed'}
                                </div>
                            </div>

                            {upload.status === 'uploading' && (
                                <Progress value={upload.progress} className="h-1" />
                            )}

                            {upload.status === 'error' && upload.error && (
                                <p className="text-xs text-red-600">{upload.error}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
