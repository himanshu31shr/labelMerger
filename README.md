# Sacred Sutra Tools

An e-commerce inventory and transaction management application built with React, TypeScript, and Firebase.

## Features

- Product inventory management with category-based organization
- Cost price inheritance system (products can inherit cost prices from categories)
- Transaction analytics with cost price resolution
- Today's orders tracking
- Dashboard with inventory alerts and sales metrics
- CSV import/export functionality
- Firebase integration for authentication and data storage

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

The application uses Firebase for authentication and Firestore for data storage. You need to configure your Firebase project:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Update the Firebase configuration in `src/services/firebase.config.ts`

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
