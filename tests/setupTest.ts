import '@testing-library/jest-dom';
import { testEnv } from './setup/testEnv';

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      VITE_FIREBASE_API_KEY: 'test-api-key',
      VITE_FIREBASE_AUTH_DOMAIN: 'test-domain',
      VITE_FIREBASE_PROJECT_ID: 'test-project',
      VITE_FIREBASE_STORAGE_BUCKET: 'test-bucket',
      VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-sender',
      VITE_FIREBASE_APP_ID: 'test-app-id',
      MODE: 'test'
    }
  }
};

// Store original env
const originalEnv = process.env;

beforeAll(() => {
  // Set up test environment variables
  process.env = {
    ...originalEnv,
    NODE_ENV: 'test',
    ...testEnv
  };
});

afterAll(() => {
  // Restore original env
  process.env = originalEnv;
});

// Mock Firebase methods
const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockGetDocs = jest.fn();
const mockAddDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockWriteBatch = jest.fn();
const mockWhere = jest.fn();
const mockOrderBy = jest.fn();

jest.mock('firebase/firestore', () => ({
  collection: (...args) => mockCollection(...args),
  doc: (...args) => mockDoc(...args),
  getDocs: (...args) => mockGetDocs(...args),
  addDoc: (...args) => mockAddDoc(...args),
  updateDoc: (...args) => mockUpdateDoc(...args),
  writeBatch: (...args) => mockWriteBatch(...args),
  getFirestore: jest.fn(),
  enableIndexedDbPersistence: jest.fn(),
  where: (...args) => mockWhere(...args),
  orderBy: (...args) => mockOrderBy(...args),
  query: jest.fn()
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn()
}));