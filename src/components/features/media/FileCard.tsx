"use client"

import React, { useState } from "react"
import { MediaFile, useMediaStore } from "@/lib/store/media-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    FileText,
    Image as ImageIcon,
    Download,
    Trash2,
    Eye,
    File,
    FileImage,
    FileVideo,
    Music,
    Archive
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface FileCardProps {
    file: MediaFile
    isSelected?: boolean
    onSelect?: (fileId: string) => void
}

export const FileCard = ({ file, isSelected, onSelect }: FileCardProps) => {
    const { deleteFile } = useMediaStore()
    const [imageError, setImageError] = useState(false)

    const handleDownload = async () => {
        try {
            // In production, this would download from Firebase Storage
            const link = document.createElement('a')
            link.href = file.url
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            toast.success(`Downloading ${file.name}`)
        } catch (error) {
            toast.error('Failed to download file')
        }
    }

    const handleDelete = async () => {
        if (confirm(`Delete ${file.name}?`)) {
            await deleteFile(file.id)
        }
    }

    const getFileIcon = () => {
        const type = file.type.toLowerCase()

        if (type === 'image') return <FileImage className="w-12 h-12 text-blue-500" />
        if (type === 'video') return <FileVideo className="w-12 h-12 text-purple-500" />
        if (type === 'audio') return <Music className="w-12 h-12 text-green-500" />
        if (type === 'archive') return <Archive className="w-12 h-12 text-orange-500" />
        if (type === 'document') return <FileText className="w-12 h-12 text-red-500" />

        return <File className="w-12 h-12 text-gray-500" />
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return 'Today'
        } else if (diffInHours < 48) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
    }

    return (
        <Card
            className={cn(
                "group relative overflow-hidden transition-all cursor-pointer",
                "hover:shadow-lg hover:scale-[1.02]",
                isSelected && "ring-2 ring-brand-purple border-brand-purple",
                !isSelected && "hover:border-brand-purple/50"
            )}
            onClick={() => onSelect?.(file.id)}
        >
            {/* Selection Checkbox */}
            {onSelect && (
                <div className="absolute top-2 left-2 z-10">
                    <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                        isSelected
                            ? "bg-brand-purple border-brand-purple"
                            : "bg-white border-gray-300 group-hover:border-brand-purple"
                    )}>
                        {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {/* Preview Area */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                {file.type === 'image' && !imageError ? (
                    <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex items-center justify-center">
                        {getFileIcon()}
                    </div>
                )}

                {/* Hover Overlay with Actions */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={(e) => {
                            e.stopPropagation()
                            window.open(file.url, '_blank')
                        }}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDownload()
                        }}
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="destructive"
                        className="rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete()
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* File Type Badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    {file.type.toUpperCase()}
                </div>
            </div>

            {/* File Info */}
            <div className="p-3 space-y-1">
                <p
                    className="font-medium text-sm truncate"
                    title={file.name}
                >
                    {file.name}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>{formatDate(file.createdAt)}</span>
                </div>
            </div>
        </Card>
    )
}
