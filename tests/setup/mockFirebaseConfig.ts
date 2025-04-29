import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { testEnv } from './testEnv';

export const mockApp = {
  name: '[DEFAULT]',
  automaticDataCollectionEnabled: false,
  options: {
    apiKey: testEnv.VITE_FIREBASE_API_KEY,
    authDomain: testEnv.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: testEnv.VITE_FIREBASE_PROJECT_ID,
    storageBucket: testEnv.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: testEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: testEnv.VITE_FIREBASE_APP_ID,
    measurementId: testEnv.VITE_FIREBASE_MEASUREMENT_ID,
  }
} as FirebaseApp;

export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  setPersistence: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updatePassword: jest.fn(),
} as unknown as Auth;

export const mockDb = {
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
  })),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
} as unknown as Firestore;