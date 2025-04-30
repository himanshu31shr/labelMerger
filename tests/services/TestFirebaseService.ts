import { FirebaseService } from '../../src/services/firebase.service';

export class TestFirebaseService extends FirebaseService {
  async testEnablePersistence(error: Error): Promise<void> {
    try {
      await this.enablePersistence(error);
    } catch (e) {
      throw e;
    }
  }

  protected async enablePersistence(error: Error): Promise<void> {
    if (error.message === 'Multiple tabs open' || error.message === 'Browser does not support persistence') {
      return;
    }
    throw error;
  }
}