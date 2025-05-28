#!/usr/bin/env node
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  Timestamp 
} from 'firebase/firestore';

// Firebase configuration for emulator
const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators
try {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('🔥 Connected to Firebase emulators');
} catch (error) {
  console.warn('⚠️  Emulators already connected or connection failed:', error.message);
}

// Demo user credentials
const DEMO_USER = {
  email: 'demo@sacredsutra.com',
  password: 'demo123456',
  displayName: 'Demo User',
  role: 'admin'
};

// Categories seed data
const CATEGORIES_SEED_DATA = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    tags: ['tech', 'gadgets', 'devices'],
    totalQuantity: 150,
    lowStockThreshold: 20,
    productCount: 3,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Books and literature',
    tags: ['reading', 'education', 'literature'],
    totalQuantity: 200,
    lowStockThreshold: 30,
    productCount: 3,
    lastUpdated: new Date(),
    isActive: true
  }
];