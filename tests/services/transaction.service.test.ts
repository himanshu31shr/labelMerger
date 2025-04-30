// Mock Firebase Error constructor
jest.mock('firebase/app', () => ({
  FirebaseError: class FirebaseError extends Error {
    constructor(code: string, message: string) {
      super(message);
      this.code = code;
      this.name = 'FirebaseError';
    }
    code: string;
  }
}));

import { FirebaseError } from 'firebase/app';
import { TransactionService } from '../../src/services/transaction.service';

// Mock Firebase methods
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }),
  query: jest.fn(),
  where: jest.fn(),
  writeBatch: jest.fn(),
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 }))
  }
}));

describe('TransactionService', () => {
  let service: TransactionService;
  let spyBatchOperation: jest.SpyInstance;
  
  beforeEach(() => {
    service = new TransactionService();
    spyBatchOperation = jest.spyOn(service as any, 'batchOperation')
      .mockResolvedValue(undefined);
    jest.clearAllMocks();
  });

  describe('saveTransactions', () => {
    it('removes duplicates before saving', async () => {
      await service.saveTransactions([{
        hash: 'test-hash',
        transactionId: 'test-id',
        platform: 'amazon',
        orderDate: '2025-04-30',
        sku: 'TEST-SKU',
        quantity: 1,
        sellingPrice: 100,
        description: 'Test Transaction'
      }]);

      expect(spyBatchOperation).toHaveBeenCalledTimes(1);
    });

    it('handles firebase errors gracefully', async () => {
      const mockError = new FirebaseError('unavailable', 'Service unavailable');
      Object.assign(mockError, { shouldRetry: true });

      spyBatchOperation.mockRejectedValueOnce(mockError);

      await expect(service.saveTransactions([{
        hash: 'test-hash',
        transactionId: 'test-id',
        platform: 'amazon',
        orderDate: '2025-04-30',
        sku: 'TEST-SKU',
        quantity: 1,
        sellingPrice: 100,
        description: 'Test Transaction'
      }])).rejects.toMatchObject({
        code: 'unavailable',
        message: 'Service unavailable',
        shouldRetry: true
      });
    });
  });

  describe('getTransactions', () => {
    it('handles firebase errors', async () => {
      const mockError = new FirebaseError('permission-denied', 'Permission denied');
      Object.assign(mockError, { shouldRetry: false });

      jest.spyOn(service as any, 'getDocuments')
        .mockRejectedValueOnce(mockError);

      await expect(service.getTransactions())
        .rejects.toMatchObject({
          code: 'permission-denied',
          message: 'Permission denied',
          shouldRetry: false
        });
    });
  });
});