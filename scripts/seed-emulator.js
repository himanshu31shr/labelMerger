#!/usr/bin/env node
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
};// Seed data
const CATEGORIES_SEED_DATA = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    tags: ['tech', 'gadgets', 'devices'],
    totalQuantity: 150,
    lowStockThreshold: 20,
    productCount: 5,
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
    productCount: 8,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Apparel and fashion items',
    tags: ['fashion', 'apparel', 'style'],
    totalQuantity: 100,
    lowStockThreshold: 25,
    productCount: 6,
    lastUpdated: new Date(),
    isActive: true
  }
];

const PRODUCTS_SEED_DATA = [
  {
    id: 'smartphone-001',
    name: 'Smartphone Pro Max',
    categoryId: 'electronics',
    description: 'Latest smartphone with advanced features',
    tags: ['mobile', 'communication', 'tech'],
    flipkartPrice: 45000,
    amazonPrice: 44500,
    costPrice: 35000,
    suggestedSellingPrice: 42000,
    isActive: true,
    existsOnSellerPage: true,
    sku: 'SPM-001',
    inventory: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'novel-001',
    name: 'The Great Adventure',
    categoryId: 'books',
    description: 'An exciting adventure novel',
    tags: ['fiction', 'adventure', 'bestseller'],
    flipkartPrice: 450,
    amazonPrice: 420,
    costPrice: 250,
    suggestedSellingPrice: 380,
    isActive: true,
    existsOnSellerPage: true,
    sku: 'NOV-001',
    inventory: 80,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'laptop-001',
    name: 'Gaming Laptop Ultra',
    categoryId: 'electronics',
    description: 'High-performance gaming laptop',
    tags: ['laptop', 'gaming', 'computer'],
    flipkartPrice: 85000,
    amazonPrice: 83000,
    costPrice: 65000,
    suggestedSellingPrice: 80000,
    isActive: true,
    existsOnSellerPage: true,
    sku: 'LAP-001',
    inventory: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'tshirt-001',
    name: 'Premium Cotton T-Shirt',
    categoryId: 'clothing',
    description: 'Comfortable premium cotton t-shirt',
    tags: ['casual', 'cotton', 'comfortable'],
    flipkartPrice: 800,
    amazonPrice: 750,
    costPrice: 400,
    suggestedSellingPrice: 650,
    isActive: true,
    existsOnSellerPage: true,
    sku: 'TSHIRT-001',
    inventory: 45,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];// Seeding functions
async function createDemoUser() {
  try {
    console.log('👤 Creating demo user...');
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      DEMO_USER.email, 
      DEMO_USER.password
    );
    
    // Add user document to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: DEMO_USER.email,
      displayName: DEMO_USER.displayName,
      role: DEMO_USER.role,
      createdAt: Timestamp.now(),
      lastLoginAt: Timestamp.now(),
      isActive: true
    });
    
    console.log('✅ Demo user created successfully');
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Demo user already exists');
      return null;
    }
    console.error('❌ Error creating demo user:', error);
    throw error;
  }
}

async function seedCategories() {
  try {
    console.log('📦 Seeding categories...');
    
    for (const category of CATEGORIES_SEED_DATA) {
      await setDoc(doc(db, 'categories', category.id), {
        ...category,
        lastUpdated: Timestamp.fromDate(category.lastUpdated)
      });
    }
    
    console.log(`✅ Seeded ${CATEGORIES_SEED_DATA.length} categories`);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
}

async function seedProducts() {
  try {
    console.log('🛍️ Seeding products...');
    
    for (const product of PRODUCTS_SEED_DATA) {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        createdAt: Timestamp.fromDate(product.createdAt),
        updatedAt: Timestamp.fromDate(product.updatedAt)
      });
    }
    
    console.log(`✅ Seeded ${PRODUCTS_SEED_DATA.length} products`);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}// Orders seed data
const ORDERS_SEED_DATA = [
  {
    id: 'order-001',
    orderNumber: 'ORD-2025-001',
    customerName: 'John Doe',
    items: [{ sku: 'SPM-001', name: 'Smartphone Pro Max', quantity: 1, price: 42000 }],
    totalAmount: 42000,
    status: 'completed',
    platform: 'flipkart',
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-2025-002',
    customerName: 'Jane Smith',
    items: [{ sku: 'NOV-001', name: 'The Great Adventure', quantity: 2, price: 380 }],
    totalAmount: 760,
    status: 'completed',
    platform: 'amazon',
    orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

// Active orders seed data
const ACTIVE_ORDERS_SEED_DATA = [
  {
    id: 'active-001',
    orderNumber: 'ORD-2025-003',
    customerName: 'Sarah Wilson',
    sku: 'TSHIRT-001',
    name: 'Premium Cotton T-Shirt',
    quantity: 2,
    platform: 'amazon',
    status: 'pending',
    orderDate: new Date(),
    createdAt: new Date()
  }
];

async function seedOrders() {
  try {
    console.log('📋 Seeding orders...');
    for (const order of ORDERS_SEED_DATA) {
      await setDoc(doc(db, 'orders', order.id), {
        ...order,
        orderDate: Timestamp.fromDate(order.orderDate),
        createdAt: Timestamp.fromDate(order.createdAt)
      });
    }
    console.log(`✅ Seeded ${ORDERS_SEED_DATA.length} orders`);
  } catch (error) {
    console.error('❌ Error seeding orders:', error);
  }
}

async function seedActiveOrders() {
  try {
    console.log('⚡ Seeding active orders...');
    for (const order of ACTIVE_ORDERS_SEED_DATA) {
      await setDoc(doc(db, 'activeOrders', order.id), {
        ...order,
        orderDate: Timestamp.fromDate(order.orderDate),
        createdAt: Timestamp.fromDate(order.createdAt)
      });
    }
    console.log(`✅ Seeded ${ACTIVE_ORDERS_SEED_DATA.length} active orders`);
  } catch (error) {
    console.error('❌ Error seeding active orders:', error);
  }
}

// Main seeding function
async function seedEmulatorData() {
  try {
    console.log('🌱 Starting Firebase emulator seeding...');
    
    // Create demo user first
    const user = await createDemoUser();
    
    // If user was created, sign in to get authentication context
    if (user || DEMO_USER.email) {
      try {
        console.log('🔐 Signing in for seeding operations...');
        await auth.signInWithEmailAndPassword(DEMO_USER.email, DEMO_USER.password);
        console.log('✅ Authenticated for seeding');
      } catch (signInError) {
        console.log('ℹ️  Using existing authentication context');
      }
    }
    
    // Seed categories
    await seedCategories();
    
    // Seed products
    await seedProducts();
    
    // Seed orders
    await seedOrders();
    
    // Seed active orders
    await seedActiveOrders();
    
    console.log('🎉 Firebase emulator seeding completed successfully!');
    console.log(`📧 Demo User: ${DEMO_USER.email}`);
    console.log(`🔑 Password: ${DEMO_USER.password}`);
    console.log(`📦 Categories: ${CATEGORIES_SEED_DATA.length}`);
    console.log(`🛍️ Products: ${PRODUCTS_SEED_DATA.length}`);
    console.log(`📋 Orders: ${ORDERS_SEED_DATA.length}`);
    console.log(`⚡ Active Orders: ${ACTIVE_ORDERS_SEED_DATA.length}`);
    console.log('🔥 Emulator UI: http://localhost:4000');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding when script is executed directly
// Check if this script is being run directly (not imported)
if (process.argv[1].includes('seed-emulator.js')) {
  seedEmulatorData();
}

export { seedEmulatorData, DEMO_USER };