# Firebase Emulator Setup Guide

## Quick Start

1. **Copy environment file**:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Start development server with emulators**:
   ```bash
   npm run dev
   ```

3. **Login with demo user**:
   - Email: `demo@sacredsutra.com`
   - Password: `demo123456`

4. **Access Emulator UI**:
   - Open http://localhost:4000 in your browser

## What Happens When You Run `npm run dev`

1. **Firebase Emulators Start** (Port 8080 for Firestore, 9099 for Auth)
2. **Data Seeding** (Demo user, categories, products)
3. **Vite Dev Server** (Your React app with emulator connection)

## Available Scripts

- `npm run dev` - Start everything (emulators + seeding + dev server)
- `npm run seed:emulator` - Manually seed emulator data
- `npm run emulator:start` - Start only emulators
- `npm run emulator:ui` - Start emulators with UI
- `npm run emulator:reset` - Reset and reseed emulator data

## Emulator Ports

- **Firestore**: http://localhost:8080
- **Auth**: http://localhost:9099  
- **Emulator UI**: http://localhost:4000
- **Vite Dev Server**: http://localhost:5173

## Demo Data

### Demo User
- **Email**: demo@sacredsutra.com
- **Password**: demo123456
- **Role**: admin### Categories
- Electronics (150 items, threshold: 20)
- Books (200 items, threshold: 30)
- Clothing (100 items, threshold: 25)

### Products
- Smartphone Pro Max (Electronics)
- The Great Adventure (Books)

## Troubleshooting

### Port Already in Use
If you get port conflicts:
```bash
# Kill processes on emulator ports
lsof -ti:8080,9099,4000 | xargs kill -9
npm run dev
```

### Seeding Fails
```bash
# Reset and try again
npm run emulator:reset
```

### Connection Issues
Check that `.env.local` has the correct emulator settings:
```env
VITE_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost
VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080
VITE_FIREBASE_AUTH_EMULATOR_HOST=localhost
VITE_FIREBASE_AUTH_EMULATOR_PORT=9099
```