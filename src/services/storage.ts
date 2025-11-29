/**
 * Storage Service Interface
 * 
 * This service abstracts file storage operations, making it easy to swap
 * implementations (e.g., from mock to AWS S3 or Firebase Storage).
 */

export interface StorageFile {
    id: string
    name: string
    url: string
    size: number
    type: string
    uploadedAt: Date
}

export interface UploadOptions {
    folder?: string
    maxSize?: number
    allowedTypes?: string[]
}

export interface StorageService {
    /**
     * Upload a file to storage
     */
    upload(file: File, options?: UploadOptions): Promise<StorageFile>

    /**
     * Delete a file from storage
     */
    delete(fileId: string): Promise<void>

    /**
     * List files in a folder
     */
    list(folder?: string): Promise<StorageFile[]>

    /**
     * Get a download URL for a file
     */
    getDownloadUrl(fileId: string): Promise<string>

    /**
     * Get file metadata
     */
    getMetadata(fileId: string): Promise<StorageFile>
}

/**
 * Mock implementation for development
 */
/**
 * Firebase Storage implementation for production
 */
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    listAll,
    getMetadata
} from 'firebase/storage';
import { storage } from '@/lib/firebase/client';

export class FirebaseStorageService implements StorageService {

    async upload(file: File, options?: UploadOptions): Promise<StorageFile> {
        // Validate file size
        if (options?.maxSize && file.size > options.maxSize) {
            throw new Error(`File size exceeds ${options.maxSize} bytes`);
        }

        // Validate file type
        if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not allowed`);
        }

        const folder = options?.folder || 'uploads';
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `${folder}/${fileName}`);

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        return {
            id: snapshot.ref.fullPath,
            name: file.name,
            url: url,
            size: file.size,
            type: file.type,
            uploadedAt: new Date()
        };
    }

    async delete(fileId: string): Promise<void> {
        const storageRef = ref(storage, fileId);
        await deleteObject(storageRef);
    }

    async list(folder?: string): Promise<StorageFile[]> {
        const listRef = ref(storage, folder || 'uploads');
        const res = await listAll(listRef);

        const files = await Promise.all(res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);

            return {
                id: itemRef.fullPath,
                name: itemRef.name,
                url: url,
                size: metadata.size,
                type: metadata.contentType || 'unknown',
                uploadedAt: new Date(metadata.timeCreated)
            };
        }));

        return files;
    }

    async getDownloadUrl(fileId: string): Promise<string> {
        const storageRef = ref(storage, fileId);
        return await getDownloadURL(storageRef);
    }

    async getMetadata(fileId: string): Promise<StorageFile> {
        const storageRef = ref(storage, fileId);
        const metadata = await getMetadata(storageRef);
        const url = await getDownloadURL(storageRef);

        return {
            id: storageRef.fullPath,
            name: metadata.name,
            url: url,
            size: metadata.size,
            type: metadata.contentType || 'unknown',
            uploadedAt: new Date(metadata.timeCreated)
        };
    }
}

// Export singleton instance
export const storageService = new FirebaseStorageService();
