"use client"

import React, { useMemo } from "react"
import { useMediaStore } from "@/lib/store/media-store"
import { Button } from "@/components/ui/button"
import { Folder, Image, FileText, LayoutGrid, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export const FolderList = () => {
    const { folders, currentFolderId, setCurrentFolder, files } = useMediaStore()

    // Calculate file counts for each folder
    const folderCounts = useMemo(() => {
        const counts: Record<string, number> = {}

        folders.forEach(folder => {
            if (folder.id === 'all') {
                counts[folder.id] = files.length
            } else {
                counts[folder.id] = files.filter(f => f.folderId === folder.id).length
            }
        })

        return counts
    }, [files, folders])

    const getIcon = (id: string) => {
        switch (id) {
            case 'all': return LayoutGrid
            case 'logos': return Sparkles
            case 'images': return Image
            case 'documents': return FileText
            default: return Folder
        }
    }

    const getColor = (id: string) => {
        switch (id) {
            case 'all': return 'text-gray-600'
            case 'logos': return 'text-purple-600'
            case 'images': return 'text-blue-600'
            case 'documents': return 'text-red-600'
            default: return 'text-gray-600'
        }
    }

    return (
        <div className="space-y-2">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Folders
            </h3>
            <div className="space-y-1">
                {folders.map((folder) => {
                    const Icon = getIcon(folder.id)
                    const isActive = currentFolderId === folder.id
                    const count = folderCounts[folder.id] || 0

                    return (
                        <Button
                            key={folder.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-between group transition-all",
                                isActive
                                    ? "bg-brand-purple/10 text-brand-purple font-medium"
                                    : "text-gray-700 hover:text-brand-purple hover:bg-gray-100"
                            )}
                            onClick={() => setCurrentFolder(folder.id)}
                        >
                            <div className="flex items-center gap-2">
                                <Icon
                                    className={cn(
                                        "w-4 h-4 transition-colors",
                                        isActive
                                            ? "text-brand-purple"
                                            : getColor(folder.id)
                                    )}
                                />
                                <span>{folder.name}</span>
                            </div>

                            {/* File Count Badge */}
                            <span
                                className={cn(
                                    "text-xs px-2 py-0.5 rounded-full transition-colors",
                                    isActive
                                        ? "bg-brand-purple text-white"
                                        : "bg-gray-200 text-gray-600 group-hover:bg-brand-purple/20 group-hover:text-brand-purple"
                                )}
                            >
                                {count}
                            </span>
                        </Button>
                    )
                })}
            </div>

            {/* Storage Info */}
            <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Storage Used</span>
                    <span className="text-xs font-semibold text-gray-900">
                        {((files.reduce((acc, f) => acc + parseFloat(f.size), 0)) / 1024).toFixed(1)} MB
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-brand-purple to-brand-purple-dark h-2 rounded-full transition-all"
                        style={{ width: '23%' }} // Mock percentage
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    2.3 GB of 10 GB used
                </p>
            </div>
        </div>
    )
}
