# Product Requirements Document (PRD)

## Project Name: Label Merger and Analytics Tool

---

## 1. Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to merge PDF labels and analyze transaction data from both platforms.

---

## 2. Core Features

### 2.1. Label Merging
- **Input**: CSV files containing order data for Amazon and Flipkart.
- **Output**: A merged PDF containing labels for both platforms.
- **Key Functionalities**:
  - Parse and process uploaded CSV files.
  - Transform Amazon and Flipkart-specific data into a unified format.
  - Generate a merged PDF with labels for both platforms.

### 2.2. Transaction Analytics
- **Input**: Transaction data from uploaded CSV files
- **Output**: Comprehensive financial analytics
- **Key Functionalities**:
  - Process and analyze transaction data from both platforms
  - Calculate sales, expenses, and profits
  - Display marketplace-specific analytics
  - Manage product prices dynamically
  - Generate SKU-wise performance reports

---

## 3. Technical Requirements

### 3.1. Frontend
- **Framework**: React with TypeScript.
- **Styling**: Material-UI for UI components.
- **Routing**: React Router for navigation.
- **Theming**: Material-UI ThemeProvider with light/dark mode support.

### 3.2. Backend (Browser-based)
- **Data Storage**: 
  - Firebase Firestore for transaction data and product prices
  - Real-time updates and offline support via Firebase
- **Libraries**:
  - `pdf-lib` for PDF generation and manipulation
  - `papaparse` for parsing CSV files
  - `firebase` for cloud data storage and real-time updates

### 3.3. Testing
- **Framework**: Jest with `@testing-library/react`.
- **Mocking**:
  - Mock `pdf-lib` and `papaparse` for unit tests.

### 3.4. Data Persistence
- **Firebase Collections**:
  - transactions: Store all transaction data from both platforms
  - productPrices: Store and manage product pricing information
- **Real-time Updates**:
  - Live price updates across all connected clients
  - Automatic UI refresh on data changes
- **Offline Support**:
  - Firebase offline persistence
  - Automatic sync when connection is restored

---

## 4. Key Components

### 4.1. Pages
1. **Home Page**:
   - File input for uploading Amazon and Flipkart CSV files
   - Button to generate and download merged PDF labels

2. **Transaction Analytics Page**:
   - File input for uploading transaction data
   - Multiple views for different analytics perspectives
   - Price management functionality
   - Detailed product-wise analysis

### 4.2. Components
1. **FileInput**:
   - Reusable component for file uploads
   - Props: `onChange`, `name`, `accepts`, `selected`

2. **PriceManagementModal**:
   - Modal for managing product prices
   - Dynamic price updates with real-time calculations

3. **TransactionFirebaseService**:
   - Handle all Firebase data operations
   - Manage real-time data subscriptions
   - Handle offline/online synchronization
   - Cache management for better performance

### 4.3. Services
1. **merge.service.ts**:
   - Merges Amazon and Flipkart labels into a single PDF

2. **TrasformAmazonPages.ts**:
   - Processes Amazon-specific data for PDF generation

3. **TrasformFlipkartPages.ts**:
   - Processes Flipkart-specific data for PDF generation

4. **transactionAnalysis.service.ts**:
   - Processes and analyzes transaction data
   - Calculates sales, expenses, and profits

---

## 5. APIs and Libraries

### 5.1. External Libraries
- `pdf-lib`: For PDF generation and manipulation.
- `papaparse`: For parsing CSV files.
- `@mui/material`: For UI components.
- `firebase`: For cloud data storage and real-time updates.
- `xlsx`: For processing Excel files.

### 5.2. Internal APIs
- **Firebase Service**:
  - `saveTransactions`: Saves transaction data to Firestore
  - `getTransactions`: Fetches transactions with optional filters
  - `updateProductPrices`: Updates product prices with real-time sync
  - `getProductPrices`: Fetches current product prices
  - `setupRealtimeListeners`: Sets up data change subscriptions

### 5.3. Firebase Integration
- **Authentication**: Anonymous auth for initial phase
- **Firestore**: 
  - Collections for transactions and product prices
  - Real-time listeners for data updates
  - Batch operations for bulk uploads
- **Security Rules**:
  - Basic read/write access control
  - Data validation rules
  - Rate limiting for operations

### 5.4. Performance Requirements
- **Initial Load Time**: < 2 seconds
- **Update Latency**: < 500ms for real-time updates
- **PDF Generation**: < 5 seconds for up to 100 labels
- **Offline Support**: Full functionality with cached data
- **Data Sync**: Automatic background sync when connection is restored

### 5.5. Firebase Security Rules
```typescript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{transactionId} {
      allow read: if true;
      allow write: if true;
    }
    match /productPrices/{priceId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

---

## 6. Testing Requirements

### 6.1. Unit Tests
- **Components**:
  - `FileInput`: Test file upload functionality.
  - `ProductGroupTable`: Test table rendering, sorting, and row expansion.
  - `SkuTable`: Test sub-table rendering.
  - `Loader`: Test loader visibility.
  - `PriceManagementModal`: Test price management functionality.

- **Services**:
  - `merge.service.ts`: Test PDF merging functionality.
  - `TrasformAmazonPages.ts`: Test Amazon-specific data processing.
  - `TrasformFlipkartPages.ts`: Test Flipkart-specific data processing.
  - `transactionAnalysis.service.ts`: Test data aggregation and analysis.
  - `firebase.service.ts`: Test Firebase CRUD operations and real-time updates.

### 6.2. Integration Tests
- Test end-to-end flow for uploading files, generating PDFs, and displaying analytics.
- Test Firebase data synchronization and offline functionality.
- Test real-time price updates across components.
- Test data persistence and recovery scenarios.

### 6.3. Mocking
- Mock `pdf-lib` for PDF generation tests
- Mock `papaparse` for CSV parsing tests
- Mock `firebase` for Firestore operations tests
- Mock `xlsx` for Excel file processing tests

---

## 8. Future Enhancements
- Add support for additional e-commerce platforms.
- Provide export functionality for analytics data in multiple formats (CSV, PDF).
- Optimize performance for large datasets:
  - Implement pagination for large tables
  - Optimize Firestore queries and indexes
  - Improve PDF generation performance
  - Implement efficient data caching
- Add data visualization features for analytics

- **Data Persistence Improvements**:
  - Implement user authentication for data access control
  - Add data backup and restore functionality
  - Enable data export to various formats
  - Implement data archival strategy
  - Add multi-device sync support
  - Implement concurrent edit resolution
  - Enhance offline capabilities
  - Add batch processing for large datasets

---

## 9. Glossary
- **SKU**: Stock Keeping Unit, a unique identifier for products.
- **Firebase**: A cloud-based platform that provides database, authentication, and hosting services.
- **Firestore**: A NoSQL document database provided by Firebase for storing and syncing data.
- **PDF**: Portable Document Format, used for generating labels.

## 10. Success Metrics
- **User Adoption**: Track daily active users
- **Performance**:
  - Initial load time < 2s
  - Update latency < 500ms
  - PDF generation time < 5s for 100 labels
- **Data Quality**:
  - Zero data loss during sync
  - 100% accuracy in transaction processing
- **Availability**:
  - 99.9% uptime
  - Full offline functionality
- **User Experience**:
  - < 1% error rate in file processing
  - < 2s response time for all operations