#!/usr/bin/env node

// Simple test to verify the setup works
console.log('🧪 Testing Firebase emulator setup...');

// Test 1: Check if Firebase SDK can be imported
try {
  const { initializeApp } = await import('firebase/app');
  console.log('✅ Firebase SDK import successful');
} catch (error) {
  console.error('❌ Firebase SDK import failed:', error.message);
  process.exit(1);
}

// Test 2: Check if the seeding script can be imported
try {
  const { DEMO_USER } = await import('./seed-emulator.js');
  console.log('✅ Seeding script import successful');
  console.log(`📧 Demo user email: ${DEMO_USER.email}`);
} catch (error) {
  console.error('❌ Seeding script import failed:', error.message);
  process.exit(1);
}

console.log('🎉 All tests passed! Setup is ready.');
console.log('');
console.log('Next steps:');
console.log('1. Copy .env.local.example to .env.local');
console.log('2. Run: npm run dev');
console.log('3. Login with demo@sacredsutra.com / demo123456');