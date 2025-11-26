import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { storage } from './client';

export const storageService = {
    // Upload file
    async uploadFile(path: string, file: File, onProgress?: (progress: number) => void) {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) onProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    },

    // Delete file
    async deleteFile(path: string) {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    },

    // Get download URL
    async getFileUrl(path: string) {
        const storageRef = ref(storage, path);
        return await getDownloadURL(storageRef);
    }
};
