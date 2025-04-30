import { TestFirebaseService } from './TestFirebaseService';

class FirebaseError extends Error {
  constructor(public code: string, public message: string) {
    super(message);
    this.name = 'FirebaseError';
  }
}

describe('FirebaseService', () => {
  let service: TestFirebaseService;

  beforeEach(() => {
    service = new TestFirebaseService();
  });

  describe('offline persistence', () => {
    it('handles failed-precondition error gracefully', async () => {
      const mockError = new FirebaseError('failed-precondition', 'Multiple tabs open');
      await expect(service.testEnablePersistence(mockError))
        .resolves.toBeUndefined();
    });

    it('handles unimplemented error gracefully', async () => {
      const mockError = new FirebaseError('unimplemented', 'Browser does not support persistence');
      await expect(service.testEnablePersistence(mockError))
        .resolves.toBeUndefined();
    });

    it('throws other errors', async () => {
      const mockError = new FirebaseError('unknown', 'Unknown error');
      await expect(service.testEnablePersistence(mockError))
        .rejects.toThrow('Unknown error');
    });
  });
});