"use client"

import React, { useState, useMemo } from "react"
import { useMediaStore } from "@/lib/store/media-store"
import { FileCard } from "./FileCard"
import { FolderOpen, Upload, Search, Grid3x3, List, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type ViewMode = 'grid' | 'list'

export const FileGrid = () => {
    const { files, currentFolderId, deleteFile } = useMediaStore()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<ViewMode>('grid')

    // Filter files by folder and search query
    const filteredFiles = useMemo(() => {
        return files.filter((file) => {
            // Filter by folder
            const matchesFolder = currentFolderId === 'all' || file.folderId === currentFolderId

            // Filter by search query
            const matchesSearch = searchQuery === '' ||
                file.name.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesFolder && matchesSearch
        })
    }, [files, currentFolderId, searchQuery])

    const handleSelectFile = (fileId: string) => {
        setSelectedFiles(prev =>
            prev.includes(fileId)
                ? prev.filter(id => id !== fileId)
                : [...prev, fileId]
        )
    }

    const handleSelectAll = () => {
        if (selectedFiles.length === filteredFiles.length) {
            setSelectedFiles([])
        } else {
            setSelectedFiles(filteredFiles.map(f => f.id))
        }
    }

    const handleBatchDelete = async () => {
        if (selectedFiles.length === 0) return

        if (confirm(`Delete ${selectedFiles.length} file(s)?`)) {
            try {
                await Promise.all(selectedFiles.map(id => deleteFile(id)))
                setSelectedFiles([])
                toast.success(`${selectedFiles.length} file(s) deleted`)
            } catch (error) {
                toast.error('Failed to delete some files')
            }
        }
    }

    const handleBatchDownload = () => {
        if (selectedFiles.length === 0) return

        selectedFiles.forEach(fileId => {
            const file = files.find(f => f.id === fileId)
            if (file) {
                const link = document.createElement('a')
                link.href = file.url
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        })

        toast.success(`Downloading ${selectedFiles.length} file(s)`)
    }

    if (filteredFiles.length === 0 && searchQuery === '') {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-6 bg-gray-100 rounded-full mb-6">
                    <FolderOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-sm">
                    Upload your logo, images, or documents to get started. Drag and drop files into the upload area above.
                </p>
                <Button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Upload Files
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Batch Actions Bar */}
            {selectedFiles.length > 0 && (
                <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-brand-purple">
                            {selectedFiles.length} file(s) selected
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSelectAll}
                        >
                            {selectedFiles.length === filteredFiles.length ? 'Deselect All' : 'Select All'}
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBatchDownload}
                            className="gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBatchDelete}
                            className="gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}

            {/* File Count */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <p>
                    {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                </p>
            </div>

            {/* Files Grid/List */}
            {filteredFiles.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No files found matching "{searchQuery}"</p>
                    <Button
                        variant="link"
                        onClick={() => setSearchQuery('')}
                        className="mt-2"
                    >
                        Clear search
                    </Button>
                </div>
            ) : (
                <div className={
                    viewMode === 'grid'
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in"
                        : "space-y-2 animate-fade-in"
                }>
                    {filteredFiles.map((file) => (
                        <FileCard
                            key={file.id}
                            file={file}
                            isSelected={selectedFiles.includes(file.id)}
                            onSelect={handleSelectFile}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
