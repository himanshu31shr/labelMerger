import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

// Mock Firebase app
export const mockFirebaseApp: FirebaseApp = {
  name: 'test-app',
  options: {
    projectId: 'test-project',
  },
  automaticDataCollectionEnabled: false,
};

// Mock Firestore
export const mockFirestore: Firestore = {
  type: 'firestore',
  toJSON: () => ({}),
  app: mockFirebaseApp,
} as any;