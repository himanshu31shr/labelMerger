import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { 
  Firestore, 
  enableIndexedDbPersistence, 
  initializeFirestore, 
  CACHE_SIZE_UNLIMITED, 
  connectFirestoreEmulator,
  FirestoreError
} from 'firebase/firestore';

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
  
  // Initialize Firestore with custom configuration
  db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    experimentalForceLongPolling: true // Better for certain network conditions
  });
  
  // Connect to the emulator if the environment variables are set
  if (import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST && import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT) {
    console.log(`🔥 Connecting to Firestore emulator at ${import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST}:${import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT}`);
    connectFirestoreEmulator(
      db,
      import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST,
      parseInt(import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT, 10)
    );
    console.log('✅ Firebase emulator connection established');
  } else {
      console.log('🌐 Using production Firestore.');
  }
  
  // Enable offline persistence
  const enablePersistence = async () => {
    try {
      await enableIndexedDbPersistence(db, { 
        forceOwnership: false // Allow multiple tabs to share the same persistence
      });
      console.log('Firestore persistence enabled');
    } catch (err: unknown) {
      // Add type guard for unknown error type
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const firebaseError = err as FirestoreError;
        if (firebaseError.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time
          console.warn('Firestore persistence failed: Multiple tabs open');
        } else if (firebaseError.code === 'unimplemented') {
          // The current browser does not support all of the features required
          console.warn('Firestore persistence is not available in this browser');
        }
      }
    }
  };

  if(process.env.NODE_ENV !== 'development') {
    enablePersistence();
  }
}

export { app, auth, db };
