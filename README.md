# E-commerce Management Dashboard

## Overview
A comprehensive e-commerce management platform built with React, TypeScript, and Material-UI. The application provides tools for managing products, orders, inventory, and analytics across multiple e-commerce platforms including Amazon and Flipkart.

## Features

### Core Features
- **Multi-platform Integration**
  - Unified dashboard for Amazon and Flipkart
  - Platform-specific product management
  - Cross-platform inventory synchronization

### Product Management
- **Product Catalog**
  - Bulk import/export (CSV/Excel)
  - SKU management with custom attributes
  - Product variations and bundles
  - Image gallery management

### Inventory & Pricing
- **Real-time Inventory Tracking**
  - Stock level monitoring
  - Low stock alerts
  - Multi-warehouse support
- **Competitive Pricing**
  - Price comparison with competitors
  - Automated repricing rules
  - Margin calculation

### Order Processing
- **Unified Order Management**
  - Order status tracking
  - Bulk order processing
  - Shipping label generation
- **PDF Label Management**
  - Multi-platform label merging
  - Batch processing
  - Print optimization

### Analytics & Reporting
- **Sales Analytics**
  - Revenue and profit tracking
  - Sales performance by SKU/category
  - Custom report generation
- **Business Intelligence**
  - Trend analysis
  - Inventory forecasting
  - Sales predictions

## Tech Stack

### Core Technologies
- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 6
- **Package Manager**: npm / Yarn
- **Language**: TypeScript 5.x

### UI & Styling
- **Component Library**: Material-UI (MUI) v6+
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons
- **Theming**: Custom theme with light/dark mode support

### State Management
- **Global State**: Redux Toolkit with Redux Persist
- **Local State**: React Hooks (useState, useReducer, useContext)
- **Data Fetching**: RTK Query

### Backend & Storage
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore with offline persistence
- **File Storage**: Firebase Storage
- **Hosting**: Firebase Hosting

### Data Processing
- **PDF Generation**: @react-pdf/renderer, pdf-lib
- **Spreadsheet Handling**: xlsx, papaparse
- **Data Visualization**: Recharts
- **Date Handling**: date-fns

### Development Tools
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint with TypeScript support
- **Code Formatting**: Prettier
- **Version Control**: Git with GitHub
- **CI/CD**: GitHub Actions
- **Performance**: React.memo, useMemo, useCallback

## Getting Started

### Prerequisites
- Node.js v18 or later
- npm v9+ or Yarn 1.22+
- Firebase account with a project
- Git (for version control)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-dashboard.git
   cd ecommerce-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update with your Firebase configuration:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
     ```

4. **Initialize Firebase**
   - Enable Authentication (Email/Password)
   - Set up Firestore in production mode
   - Configure Storage rules

5. **Start development server**
   ```bash
   # Standard development
   npm run dev
   
   # Development with custom host
   npm run dev:local
   
   # Or with Yarn
   yarn dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Application Settings
VITE_APP_NAME="E-commerce Dashboard"
VITE_API_BASE_URL=/api/v1
VITE_ENABLE_ANALYTICS=false
VITE_DEFAULT_PAGE_SIZE=25
```

### Firebase Setup

1. **Authentication**
   - Enable Email/Password authentication
   - Configure password reset templates
   - Set up OAuth providers if needed (Google, Facebook, etc.)

2. **Firestore Database**
   - Create collections: `products`, `orders`, `inventory`, `transactions`
   - Set up security rules
   - Configure indexes for complex queries

3. **Storage**
   - Set up rules for file uploads
   - Configure CORS settings

### Theme Customization

Edit `src/theme/theme.ts` to customize:

```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    mode: 'light', // or 'dark'
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    // ... other typography settings
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
    // ... other component overrides
  },
});
```

### Feature Flags

Enable/disable features in `src/config/features.ts`:

```typescript
export const featureFlags = {
  enableAdvancedAnalytics: false,
  enableMultiCurrency: false,
  enableBulkActions: true,
  // ... other feature flags
};
```

### API Configuration

Configure API endpoints in `src/services/api/endpoints.ts`:

```typescript
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  INVENTORY: '/inventory',
  // ... other endpoints
};
```

## Available Scripts

### Development
```bash
# Start development server
npm run dev

# Start with custom host configuration
npm run dev:local

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint and formatting issues
npm run lint:fix

# Check TypeScript types
npm run type-check

# Run full code quality check (lint + type check)
npm run check
```

### Build & Deploy
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Build and deploy to Firebase Hosting
npm run deploy

# Deploy only Firestore rules
npm run deploy:firestore

# Deploy only Firebase functions
npm run deploy:functions
```

### Utilities
```bash
# Generate component boilerplate
npm run generate:component ComponentName

# Generate page boilerplate
npm run generate:page PageName

# Generate Redux slice
npm run generate:slice sliceName
```

## Project Structure

```
src/
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # Reusable UI components
│   ├── common/           # Common components (buttons, inputs, etc.)
│   ├── layout/           # Layout components (header, sidebar, etc.)
│   └── ui/               # Basic UI elements
├── config/               # App configuration
│   ├── features.ts       # Feature flags
│   └── routes.tsx        # Route configurations
├── constants/            # Application constants
│   ├── api.ts            # API endpoints
│   └── theme.ts          # Theme constants
├── features/             # Feature modules
│   ├── auth/             # Authentication
│   ├── products/         # Product management
│   ├── orders/           # Order processing
│   └── analytics/        # Analytics and reporting
├── hooks/                # Custom React hooks
├── layouts/              # Page layouts
├── pages/                # Application pages
│   ├── Dashboard/        # Main dashboard
│   ├── Products/         # Product management
│   ├── Orders/           # Order management
│   ├── Inventory/        # Inventory tracking
│   └── Settings/         # Application settings
├── services/             # API and business logic
│   ├── api/              # API client setup
│   ├── auth/             # Authentication services
│   ├── products/         # Product services
│   └── firebase/         # Firebase services
├── store/                # State management
│   ├── slices/           # Redux slices
│   ├── hooks.ts          # Typed hooks
│   └── store.ts          # Store configuration
├── theme/                # Theme configuration
│   ├── components/       # Component overrides
│   └── theme.ts          # Theme definition
├── types/                # TypeScript type definitions
│   ├── api/              # API types
│   └── models/           # Data models
└── utils/                # Utility functions
    ├── formatters/       # Data formatting utils
    └── validators/       # Validation utils
```

### Key Components

#### Features
- **Authentication**: Secure login, registration, and password management
- **Product Management**: CRUD operations, bulk actions, and inventory tracking
- **Order Processing**: Order management and fulfillment
- **Analytics**: Sales reports, inventory analytics, and business insights
- **Settings**: User preferences and application configuration

#### State Management
- **Redux Toolkit**: Centralized state management
- **RTK Query**: Data fetching and caching
- **Local State**: React Context and hooks for component-level state

#### UI/UX
- **Material-UI**: Comprehensive component library
- **Responsive Design**: Mobile-first approach
- **Theming**: Customizable themes with dark/light mode
- **Accessibility**: WCAG 2.1 AA compliance

#### Performance
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: On-demand component loading
- **Optimized Builds**: Production-optimized builds with Vite
## Development Guide

### Code Style
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for all new code
- Write functional components with hooks
- Follow the existing project structure and naming conventions

### Git Workflow

1. **Branch Naming**
   - `feature/feature-name` for new features
   - `bugfix/description` for bug fixes
   - `hotfix/description` for critical fixes
   - `chore/description` for maintenance tasks

2. **Commit Messages**
   - Use the [Conventional Commits](https://www.conventionalcommits.org/) specification
   - Example: `feat(products): add bulk edit functionality`

### Testing

Write tests for:
- All new components (React Testing Library)
- Complex utility functions
- Redux reducers and actions
- Custom hooks

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### API Integration

1. **API Client**
   - Use `src/services/api/client.ts` for all API calls
   - Configure base URL and headers in `src/config/api.ts`

2. **RTK Query**
   - Define API endpoints in `src/services/api/endpoints/`
   - Export hooks from feature-specific API slices

## Deployment

### Prerequisites
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project set up
- Required permissions for deployment

### Deployment Process

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**
   ```bash
   firebase login
   firebase use your-project-id
   npm run deploy
   ```

3. **Deploy Firebase Functions (if applicable)**
   ```bash
   cd functions
   npm run deploy:functions
   ```

### Environment Configuration

1. **Production**
   - Set up in Firebase Console
   - Configure environment variables in `.env.production`

2. **Staging**
   - Use a separate Firebase project
   - Configure in `.env.staging`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

### Code Review Process
- All PRs require at least one approval
- Ensure all tests pass
- Update documentation as needed
- Follow the established coding standards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact [your-email@example.com](mailto:your-email@example.com) or open an issue in the repository.

## Acknowledgments

- [Material-UI](https://mui.com/) for the UI components
- [Firebase](https://firebase.google.com/) for backend services
- [Vite](https://vitejs.dev/) for the build tooling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
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
This project is licensed under the MIT License.

## Future Enhancements
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Integration with more e-commerce platforms
- [ ] Mobile app version
- [ ] Automated testing with CI/CD
- [ ] Enhanced data export options
- [ ] Custom report builder
