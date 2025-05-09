import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'test-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'test-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'test-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'test-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'test-messaging-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'test-app-id',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'test-measurement-id'
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Check if we're in a test environment
if (process.env.NODE_ENV === 'test') {
  // Mock Firebase for tests
  app = {
    name: '[DEFAULT]',
    options: firebaseConfig
  } as FirebaseApp;
  
  auth = {
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn()
  } as unknown as Auth;
  
  db = {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      })),
      get: jest.fn(),
      where: jest.fn(),
      orderBy: jest.fn()
    }))
  } as unknown as Firestore;
} else {
  // Real Firebase initialization for non-test environments
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };