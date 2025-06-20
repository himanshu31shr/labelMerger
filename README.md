# Sacred Sutra Tools

An e-commerce inventory and transaction management application built with React, TypeScript, and Firebase.

## Features

- Product inventory management with category-based organization
- Cost price inheritance system (products can inherit cost prices from categories)
- Transaction analytics with cost price resolution
- Today's orders tracking
- Dashboard with inventory alerts and sales metrics
- CSV import/export functionality
- PDF merger tool with automatic category-based sorting
- Firebase integration for authentication, data storage, and file storage
- Cloud storage for PDF files with configurable access controls and expiration

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server with Firebase emulators:
   ```bash
   npm run dev
   ```
   This will start both the Firebase emulators and the Vite development server.

## Building for Production

To build the application for production:

```bash
npm run build:prod
```

This will create a production-ready build in the `dist` directory.

## Deployment

The application is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will build the application and deploy it to GitHub Pages.

## Firebase Configuration

The application uses Firebase for authentication, Firestore for data storage, and Firebase Storage for file storage:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Set up Storage security rules in the Firebase Console or deploy the included `storage.rules` file
4. Update the Firebase configuration in `src/services/firebase.config.ts`

### Environment Variables

Create a `.env.local` file with the following Firebase configuration:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Firebase Emulators

For local development, the application is configured to use Firebase emulators:

```bash
npm run emulator:start
```

This will start the Auth, Firestore, and Storage emulators. You can access the emulator UI at `http://localhost:4000`.

## PDF Storage System

The application includes a PDF storage system that:

- Automatically sorts PDFs by category and SKU
- Uploads PDFs to Firebase Storage with configurable expiration dates
- Supports access controls (private, organization, or public visibility)
- Tracks metadata about stored PDFs (categories, products, etc.)
- Provides easy download links for stored PDFs

## Cost Price Inheritance System

The application implements a category-based cost price inheritance system:

- Products can have their own custom cost price
- If no custom cost price is set, products inherit cost price from their category
- The CostPriceResolutionService handles the resolution logic

To migrate existing data to use the new cost price system:

```bash
npm run migrate:cost-price
```

To rollback the migration:

```bash
npm run migrate:cost-price:rollback
```

## Testing

Run tests with:

```bash
npm test
```

## License

This project is licensed under the MIT License.
