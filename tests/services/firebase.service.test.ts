import {
    collection,
    doc,
    DocumentData,
    FirestoreError,
    getDocs,
    query,
    QueryConstraint,
    writeBatch
} from 'firebase/firestore';
import { db } from '../../src/services/firebase.config';
import { FirebaseService } from '../../src/services/firebase.service';

// Mock Firebase modules
const mockBatchCommit = jest.fn();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  writeBatch: jest.fn(() => ({
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    commit: mockBatchCommit
  }))
}));

// Mock Firebase config
jest.mock('../../src/services/firebase.config', () => ({
  db: {}
}));

class TestFirebaseService extends FirebaseService {
  public async testGetDocuments<T extends DocumentData>(
    collectionName: string,
    queryConstraints: QueryConstraint[] = []
  ): Promise<T[]> {
    return this.getDocuments(collectionName, queryConstraints);
  }

  public async testSetDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
  ): Promise<void> {
    return this.setDocument(collectionName, docId, data);
  }

  public async testBatchOperation<T extends DocumentData>(
    items: T[],
    collectionName: string,
    operation: 'create' | 'update' | 'delete',
    getDocId: (item: T) => string
  ): Promise<void> {
    return this.batchOperation(items, collectionName, operation, getDocId);
  }
}

describe('FirebaseService', () => {
  let service: TestFirebaseService;

  beforeEach(() => {
    service = new TestFirebaseService();
    jest.clearAllMocks();
  });

  describe('getDocuments', () => {
    it('should fetch documents from Firestore', async () => {
      const mockDocs = [
        { id: '1', data: () => ({ name: 'Test 1' }) },
        { id: '2', data: () => ({ name: 'Test 2' }) }
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({ docs: mockDocs });

      const result = await service.testGetDocuments('test-collection');

      expect(collection).toHaveBeenCalledWith(db, 'test-collection');
      expect(query).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();
      expect(result).toEqual([
        { id: '1', name: 'Test 1' },
        { id: '2', name: 'Test 2' }
      ]);
    });

    it('should handle errors properly', async () => {
      const error = new Error('Test error') as FirestoreError;
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.testGetDocuments('test-collection'))
        .rejects
        .toThrow('Test error');
    });
  });

  describe('batchOperation', () => {
    it('should handle batch operations correctly', async () => {
      const items = [{ id: '1', name: 'Test 1' }, { id: '2', name: 'Test 2' }];
      mockBatchCommit.mockResolvedValueOnce(undefined);

      await service.testBatchOperation(
        items,
        'test-collection',
        'create',
        (item) => item.id
      );

      expect(writeBatch).toHaveBeenCalledWith(db);
      expect(doc).toHaveBeenCalledTimes(2);
      expect(mockBatchCommit).toHaveBeenCalled();
    });
  });
});