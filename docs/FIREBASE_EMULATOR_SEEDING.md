# Firebase Emulator Seeding Documentation

## Overview
This document describes the Firebase emulator seeding system that automatically populates the local Firebase emulator with test data when the development server starts.

## Features
- Automatic data seeding when dev server starts
- Firebase Authentication emulator integration
- Demo user with constant credentials
- Seed data for categories, products, and orders
- Configurable seeding through environment variables

## Architecture

### Components
1. **Emulator Configuration** (`firebase.json`)
   - Firestore emulator on port 8080
   - Authentication emulator on port 9099
   
2. **Seeding Script** (`scripts/seed-emulator.js`)
   - Populates emulator with test data
   - Creates demo user
   - Seeds sample categories, products, and orders
   
3. **Firebase Configuration** (`src/services/firebase.config.ts`)
   - Detects emulator environment
   - Connects to appropriate emulator endpoints
   
4. **Environment Variables**
   - Controls emulator connection
   - Enables/disables seeding

## Demo User Credentials
- **Email**: `demo@sacredsutra.com`
- **Password**: `demo123456`
- **Role**: Admin
- **Name**: Demo User

## Seed Data Structure

### Categories
- Electronics
- Books
- Clothing
- Home & Garden
- Sports & Outdoors### Products
- Sample products for each category
- Realistic pricing and inventory
- Product descriptions and tags

### Orders
- Historical order data
- Various order statuses
- Transaction records

## Usage

### Development Server
The seeding happens automatically when running:
```bash
npm run dev
```

### Manual Seeding
To seed the emulator manually:
```bash
npm run seed:emulator
```

### Reset Emulator Data
To clear and reseed:
```bash
npm run emulator:reset
```

## Configuration

### Environment Variables
Add to `.env.local`:
```env
# Enable emulator mode
VITE_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost
VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080
VITE_FIREBASE_AUTH_EMULATOR_HOST=localhost
VITE_FIREBASE_AUTH_EMULATOR_PORT=9099

# Seeding configuration
VITE_ENABLE_EMULATOR_SEEDING=true
VITE_DEMO_USER_EMAIL=demo@sacredsutra.com
VITE_DEMO_USER_PASSWORD=demo123456
```

### Firebase Configuration
The emulator automatically detects environment variables and connects to local emulators when available.

## Security Considerations
- Demo credentials are only for local development
- Emulator data is ephemeral
- Production environment is unaffected
- Firestore rules still apply in emulator

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 8080 and 9099 are available
2. **Connection errors**: Check if emulator is running
3. **Seeding failures**: Check script logs for errors

### Reset Steps
1. Stop the development server
2. Run `npm run emulator:reset`
3. Restart with `npm run dev`

## Future Enhancements
- Configurable seed data through JSON files
- User-specific seeding scenarios
- Integration with CI/CD for testing
- Performance optimization for large datasets