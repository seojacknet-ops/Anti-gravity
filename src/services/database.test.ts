import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FirestoreDatabaseService } from './database';
import {
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

// Mock Firebase SDK
vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    addDoc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    onSnapshot: vi.fn(),
    Timestamp: class {
        seconds: number;
        nanoseconds: number;
        constructor(seconds: number, nanoseconds: number) {
            this.seconds = seconds;
            this.nanoseconds = nanoseconds;
        }
        toDate() { return new Date(); }
        static now() { return new this(0, 0); }
    }
}));

vi.mock('@/lib/firebase/client', () => ({
    db: {}
}));

describe('FirestoreDatabaseService', () => {
    let service: FirestoreDatabaseService;

    beforeEach(() => {
        service = new FirestoreDatabaseService();
        vi.clearAllMocks();
    });

    it('should create a document', async () => {
        const mockData = { name: 'Test' };
        const mockRef = { id: '123' };
        (addDoc as any).mockResolvedValue(mockRef);

        const result = await service.create('test-collection', mockData);

        expect(addDoc).toHaveBeenCalled();
        expect(result).toEqual({
            ...mockData,
            id: '123',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    });

    it('should read a document', async () => {
        const mockData = { name: 'Test', createdAt: new Date(), updatedAt: new Date() };
        (getDoc as any).mockResolvedValue({
            exists: () => true,
            data: () => mockData,
            id: '123'
        });

        const result = await service.read('test-collection', '123');

        expect(getDoc).toHaveBeenCalled();
        expect(result).toEqual({
            ...mockData,
            id: '123'
        });
    });

    it('should return null if document does not exist', async () => {
        (getDoc as any).mockResolvedValue({
            exists: () => false
        });

        const result = await service.read('test-collection', '123');

        expect(result).toBeNull();
    });

    it('should update a document', async () => {
        const mockData = { name: 'Updated' };
        (updateDoc as any).mockResolvedValue(undefined);
        (getDoc as any).mockResolvedValue({
            exists: () => true,
            data: () => ({ ...mockData, createdAt: new Date(), updatedAt: new Date() }),
            id: '123'
        });

        const result = await service.update('test-collection', '123', mockData);

        expect(updateDoc).toHaveBeenCalled();
        expect(result.name).toBe('Updated');
    });

    it('should delete a document', async () => {
        (deleteDoc as any).mockResolvedValue(undefined);

        await service.delete('test-collection', '123');

        expect(deleteDoc).toHaveBeenCalled();
    });
});
