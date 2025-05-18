import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { 
  Firestore, 
  getFirestore, 
  enableIndexedDbPersistence, 
  initializeFirestore, 
  CACHE_SIZE_UNLIMITED 
} from 'firebase/firestore';
import { getMessaging, isSupported, Messaging } from 'firebase/messaging';

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
let messaging: Messaging | null = null;

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
  
  // Enable offline persistence
  const enablePersistence = async () => {
    try {
      await enableIndexedDbPersistence(db, { 
        forceOwnership: false // Allow multiple tabs to share the same persistence
      });
      console.log('Firestore persistence enabled');
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required
        console.warn('Firestore persistence is not available in this browser');
      } else {
        console.error('Error enabling Firestore persistence:', err);
      }
    }
  };
  
  // Initialize persistence in the background
  enablePersistence();
  
  // Initialize messaging if supported by the browser
  const initMessaging = async () => {
    try {
      if (await isSupported()) {
        const serviceWorkerPath = `${import.meta.env.BASE_URL || ''}firebase-messaging-sw.js`;
        
        // Initialize messaging with the default app
        messaging = getMessaging(app);
        
        // Register service worker
        const registration = await navigator.serviceWorker.register(
          serviceWorkerPath, 
          { scope: import.meta.env.BASE_URL || '/' }
        );
        
        // You can use the registration for other purposes if needed
        // For example, you might want to store it in a variable or use it elsewhere
       }
    } catch (error) {
      console.error('Firebase messaging not supported:', error);
    }
  };
  
  initMessaging();
}

export { app, auth, db, messaging };
