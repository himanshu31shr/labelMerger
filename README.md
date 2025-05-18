# E-commerce Tools Suite

## Overview
The E-commerce Tools Suite is a comprehensive web application designed to help e-commerce sellers manage their business across multiple platforms. The application provides tools for processing orders, analyzing transactions, and managing product catalogs with a focus on platforms like Amazon and Flipkart.

## Features
- **Authentication** ✅
  - Secure email/password authentication
  - Remember Me functionality
  - Password reset capabilities
  - Role-based access control
  - Protected routes

- **PDF Label Management** ✅
  - Upload and merge shipping labels from multiple platforms
  - Support for Amazon and Flipkart label formats
  - Preview and download merged PDFs
  - Batch processing capabilities

- **Transaction Analytics** ✅
  - Upload and process transaction data from CSV/Excel
  - Real-time price and sales analytics
  - Financial summary and reporting
  - Interactive data visualization with Recharts
  - Platform-wise performance comparison

- **Product Management** ✅
  - Import/export product catalogs
  - Bulk price updates
  - Inventory tracking
  - Real-time synchronization with Firestore
  - SKU management

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI v6 with styled-components
- **State Management**: Redux Toolkit with Redux Persist
- **Build Tool**: Vite 6
- **Authentication**: Firebase Authentication
- **Data Storage**: Firebase Firestore with offline support
- **PDF Processing**: pdf-lib, pdfjs-dist, @react-pdf/renderer
- **Data Handling**: papaparse, xlsx
- **Data Visualization**: Recharts
- **Testing**: Jest, React Testing Library
- **Progressive Web App**: Vite PWA plugin
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git
- Firebase account with a project
- GitHub account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/himanshu31shr/flipkart-amazon-tools.git
   cd flipkart-amazon-tools
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with email/password provider
   - Set up Firestore Database in production mode
   - Create a web app in your Firebase project
   - Copy `.env.example` to `.env.local`
   - Update the Firebase configuration in `.env.local`:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. For local development with custom host:
   ```bash
   npm run dev:local
   ```

### Configuration Options

#### Authentication Configuration
- Customize session persistence in `src/services/auth.service.ts`
- Modify password requirements in Firebase Console
- Configure authentication providers in Firebase Console

#### Firebase Configuration

To enable offline persistence in your Firebase application, update the `firebase.config.ts` file as follows:

1. First, modify the imports to include `enableIndexedDbPersistence`:
   ```typescript
   import { FirebaseApp, initializeApp } from 'firebase/app';
   import { Auth, getAuth } from 'firebase/auth';
   import { Firestore, getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
   import { getMessaging, isSupported, Messaging } from 'firebase/messaging';
   ```

2. Then, after initializing Firestore, add the persistence configuration:
   ```typescript
   // Initialize Firebase
   app = initializeApp(firebaseConfig);
   auth = getAuth(app);
   db = getFirestore(app);
   
   // Enable offline persistence
   enableIndexedDbPersistence(db)
     .catch((err) => {
       if (err.code === 'failed-precondition') {
         console.warn('Offline persistence can only be enabled in one tab at a time.');
       } else if (err.code === 'unimplemented') {
         console.warn('The current browser does not support all of the features required to enable offline persistence.');
       }
     });
   ```

3. For more advanced caching strategies, you can also configure:
   ```typescript
   import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
   
   // Initialize Firestore with custom settings
   const db = initializeFirestore(app, {
     cacheSizeBytes: CACHE_SIZE_UNLIMITED, // or a specific number of bytes
     experimentalForceLongPolling: true // useful for certain network conditions
   });
   ```

#### Theme Customization
- Modify `src/theme.tsx` to customize:
  - Color palette
  - Typography
  - Component styles
  - Dark mode preferences

#### Performance Settings
- Adjust batch sizes for large operations in `src/services/firebase.service.ts`
- Configure cache settings in `firebase.config.ts`
- Modify pagination settings in DataTable components

### Available Scripts

- `npm run dev` or `yarn dev` - Start development server
- `npm run dev:local` - Start dev server with custom host configuration
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint and formatting issues
- `npm run type-check` - Check TypeScript types
- `npm run deploy` - Deploy to GitHub Pages
- `npm run predeploy` - Build for production before deployment

## Project Structure

```
src/
├── components/       # Reusable UI components
├── constants/        # Application constants
├── containers/       # Container components
├── pages/            # Application pages
│   ├── Auth/         # Authentication pages
│   ├── Dashboard/    # Main dashboard
│   ├── Products/     # Product management
│   └── Transactions/ # Transaction analysis
├── services/         # API and business logic
│   ├── auth.service.ts
│   ├── firebase.service.ts
│   ├── merge.service.ts
│   └── transactionAnalysis.service.ts
├── store/            # Redux store configuration
│   ├── slices/       # Redux slices
│   └── index.ts      # Store configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Key Components

#### Pages
- **Authentication**: Login, Registration, Password Reset
- **Dashboard**: Overview and quick actions
- **Products**: Catalog management, bulk updates
- **Transactions**: Sales analysis, reports
- **Label Manager**: PDF label merging

#### Services
- **Firebase Service**: Handles all Firebase operations
- **Auth Service**: Authentication and user management
- **PDF Service**: PDF generation and merging
- **Data Service**: Data import/export and processing

#### State Management
- Redux Toolkit for global state
- Redux Persist for state persistence
- RTK Query for data fetching and caching

## Deployment

The application is configured for deployment to GitHub Pages:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. The application will be available at:
   ```
   https://himanshu31shr.github.io/flipkart-amazon-tools/
   ```

## Progressive Web App (PWA)

The application includes PWA support with:
- Offline capabilities
- Installable on devices
- Caching strategies for assets and API calls
- Automatic updates

## Security Features
- Firebase Authentication with email/password
- Role-based access control (RBAC)
- Protected routes and API endpoints
- Input validation and sanitization
- Secure Firebase security rules
- Environment variables for sensitive data

## Testing

Run the test suite with:
```bash
npm test
```

Test coverage report:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Integration with more e-commerce platforms
- [ ] Mobile app version
- [ ] Automated testing with CI/CD
- [ ] Enhanced data export options
- [ ] Custom report builder

## License
This project is licensed under the MIT License.
