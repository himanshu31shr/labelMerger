import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { testEnv } from './testEnv';

const firebaseConfig = {
  apiKey: testEnv.VITE_FIREBASE_API_KEY,
  authDomain: testEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: testEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: testEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: testEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: testEnv.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);