import { create } from 'zustand'
import { toast } from 'sonner'
import { authService } from '@/services/auth'
import { databaseService } from '@/services/database'
import { storageService } from '@/services/storage'

export type FileType = 'image' | 'document' | 'other'

export interface MediaFile {
    id: string
    name: string
    url: string
    type: FileType
    size: string
    folderId: string
    createdAt: string
}

export interface Folder {
    id: string
    name: string
    icon?: string
}

interface MediaState {
    files: MediaFile[]
    folders: Folder[]
    currentFolderId: string
    isUploading: boolean

    setCurrentFolder: (folderId: string) => void
    uploadFile: (file: File) => Promise<void>
    deleteFile: (fileId: string) => Promise<void>
    fetchFiles: () => Promise<void>
}

const initialFolders: Folder[] = [
    { id: 'all', name: 'All Files' },
    { id: 'logos', name: 'Logos' },
    { id: 'images', name: 'Images' },
    { id: 'documents', name: 'Documents' },
]

export const useMediaStore = create<MediaState>()((set, get) => ({
    files: [],
    folders: initialFolders,
    currentFolderId: 'all',
    isUploading: false,

    setCurrentFolder: (folderId) => set({ currentFolderId: folderId }),

    fetchFiles: async () => {
        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            // Use real-time listener from databaseService
            // Note: databaseService.subscribe expects a single doc, but we need a collection query.
            // For now, let's just do a one-time fetch or implement subscribeQuery in databaseService.
            // Given the interface, let's use query() for now.
            // TODO: Add subscribeQuery to DatabaseService for real-time updates.

            const files = await databaseService.query<any>(`clients/${user.id}/media`, {
                orderBy: 'createdAt',
                orderDirection: 'desc'
            })

            const mappedFiles: MediaFile[] = files.map(data => ({
                id: data.id,
                name: data.name || 'Unnamed',
                url: data.url || '#',
                type: data.type || 'other',
                size: data.size || '0 KB',
                folderId: data.folderId || 'all',
                createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString(),
            }))

            set({ files: mappedFiles })
            console.log(`📁 Fetched ${mappedFiles.length} files`)

        } catch (error) {
            console.error('Failed to fetch files:', error)
        }
    },

    uploadFile: async (file) => {
        set({ isUploading: true })

        try {
            const user = await authService.getCurrentUser()
            if (!user) throw new Error('User not authenticated')

            const path = `clients/${user.id}/media/${Date.now()}_${file.name}`
            const uploadedFile = await storageService.upload(file, { folder: `clients/${user.id}/media` })

            const newFile: MediaFile = {
                id: uploadedFile.id, // Will be replaced by Firestore ID
                name: file.name,
                url: uploadedFile.url,
                type: file.type.startsWith('image/') ? 'image' : 'document',
                size: `${(file.size / 1024).toFixed(1)} KB`,
                folderId: get().currentFolderId === 'all' ? 'images' : get().currentFolderId,
                createdAt: new Date().toISOString(),
            }

            // Save metadata to Firestore
            const savedDoc = await databaseService.create(`clients/${user.id}/media`, newFile)
            newFile.id = savedDoc.id

            set((state) => ({
                files: [newFile, ...state.files],
                isUploading: false,
            }))

            toast.success(`${file.name} uploaded successfully!`)
        } catch (error) {
            console.error('Upload failed:', error)
            set({ isUploading: false })
            toast.error('Upload failed. Please try again.')
        }
    },

    deleteFile: async (fileId) => {
        const file = get().files.find(f => f.id === fileId)
        if (!file) return

        try {
            const user = await authService.getCurrentUser()
            if (!user) return

            // Delete from Firestore
            await databaseService.delete(`clients/${user.id}/media`, fileId)

            // Delete from Storage (optional, if we stored the path or ID correctly)
            // storageService.delete(file.storagePath) 

            set((state) => ({
                files: state.files.filter((f) => f.id !== fileId),
            }))

            toast.success(`${file.name} deleted`)
        } catch (error) {
            console.error('Delete failed:', error)
            toast.error('Failed to delete file')
        }
    },
}))
