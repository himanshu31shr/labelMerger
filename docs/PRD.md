# Product Requirements Document (PRD)

## Project Name: Label Merger and Analytics Tool

## 1. Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to merge PDF labels and analyze transaction data from both platforms.

## 2. Core Features

### 2.1. Label Merging
- **Input**: CSV files containing order data for Amazon and Flipkart.
- **Output**: A merged PDF containing labels for both platforms.
- **Key Functionalities**:
  - Parse and process uploaded CSV files.
  - Transform Amazon and Flipkart-specific data into a unified format.
  - Generate a merged PDF with labels for both platforms.

### 2.2. Product Management
- **Input**: 
  - XLSX files containing product data from Amazon and Flipkart
  - Manual product entries and updates
- **Output**: 
  - Organized product catalog with pricing and details
  - Product data integrated with transaction analysis
- **Key Functionalities**:
  - Import products from platform-specific XLSX files
  - Edit product details (cost price, name, description)
  - Map products to transactions using SKUs
  - Real-time product data updates
  - Product search and filtering

### 2.3. Transaction Analytics
- **Input**: 
  - Transaction data files (.csv for Amazon, .xlsx for Flipkart)
  - Product catalog with pricing information
- **Output**: 
  - Comprehensive financial analytics dashboard
  - Order-level transaction details
  - Product-wise performance metrics
- **Key Features**:
  - Multi-platform data processing (Amazon and Flipkart)
  - Real-time data persistence with Firebase
  - Dynamic price management integration
  - Financial metrics:
    - Total sales and expenses
    - Units sold tracking
    - Product-wise profitability
    - Cost analysis
  - Interactive data views:
    - Order list with filtering and sorting
    - Product performance summary
    - Visual metrics dashboard
  - Date range tracking for transactions
  - Error handling and validation
  - Loading state management
  - Direct navigation to price management

## 3. Technical Requirements

### 3.1. Frontend
- **Framework**: React with TypeScript.
- **Styling**: Material-UI for UI components.
- **Routing**: React Router for navigation.
- **Theming**: Material-UI ThemeProvider with light/dark mode support.

### 3.2. Backend (Browser-based)
- **Data Storage**: 
  - Firebase Firestore for transaction data, product prices, and product catalog
  - Real-time updates and offline support via Firebase
- **Libraries**:
  - `xlsx` for parsing Excel files
  - `pdf-lib` for PDF generation and manipulation
  - `papaparse` for parsing CSV files
  - `firebase` for cloud data storage and real-time updates

### 3.3. Testing
- **Framework**: Jest with `@testing-library/react`.
- **Mocking**:
  - Mock `pdf-lib` and `papaparse` for unit tests.

### 3.4. Data Persistence
- **Firebase Collections**:
  - products: Store product catalog with platform-specific details
  - transactions: Store all transaction data from both platforms
  - productPrices: Store and manage product pricing information
- **Real-time Updates**:
  - Live price updates across all connected clients
  - Automatic UI refresh on data changes
- **Offline Support**:
  - Firebase offline persistence
  - Automatic sync when connection is restored

## 4. Key Components

### 4.1. Pages
1. **Home Page**:
   - File input for uploading Amazon and Flipkart CSV files
   - Button to generate and download merged PDF labels

2. **Product Management Page**:
   - XLSX file upload for product imports
   - Enhanced DataTable for product listing with the following features:
     - Platform-based filtering (Amazon/Flipkart/All)
     - Global search functionality across all fields
     - Sortable columns with clear visual indicators
     - Direct product link integration:
       - Amazon: Direct link to product page using SKU
       - Flipkart: View and Edit actions with inline icons
     - Columns display:
       - SKU (sortable, filterable)
       - Platform (sortable, filterable)
       - Name (sortable, filterable)
       - Status (sortable, filterable)
       - Description (sortable, filterable)
       - Cost Price (right-aligned with currency formatting)
       - Product Link (platform-specific actions)
   - Real-time updates with Firebase integration
   - Material-UI components for consistent styling
   - Responsive design for various screen sizes

3. **Transaction Analytics Page**:
   - File input for uploading transaction data
   - Multiple views for different analytics perspectives
   - Price management functionality
   - Detailed product-wise analysis
   - Enhanced with product details from product catalog
   - SKU-based product mapping

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

4. **ProductTable**:
   - Based on DataTable component
   - Sortable and filterable columns
   - Inline editing capabilities
   - Real-time updates

5. **ProductEditModal**:
   - Form for editing product details
   - Validation and error handling
   - Real-time preview

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

5. **ProductService**:
   - Handles XLSX file parsing
   - Manages product data in Firestore
   - Provides product-transaction mapping
   - Real-time data synchronization

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
- **Authentication**: 
  - Email/password authentication with Remember Me
  - Password reset functionality
  - Session management and persistence
  - Role-based access control
- **Firestore**: 
  - Collections for users, transactions, and product prices
  - Real-time listeners for data updates
  - Batch operations for bulk uploads
- **Security Rules**:
  - Role-based access control
  - Data validation rules
  - User ownership validation
  - Collection-level security

### 5.4. Performance Requirements
- **Initial Load Time**: < 2 seconds
- **Authentication**: < 500ms for login/logout operations
- **Update Latency**: < 500ms for real-time updates
- **PDF Generation**: < 5 seconds for up to 100 labels
- **Offline Support**: Full functionality with cached data
- **Data Sync**: Automatic background sync when connection is restored

### 5.5. Firebase Security Rules
```typescript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Common functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isValidUserData(data) {
      return data.keys().hasAll(['email', 'role', 'createdAt', 'lastLoginAt']) &&
        data.role in ['user', 'admin'] &&
        data.email is string &&
        data.email.matches('^[^@]+@[^@]+\\.[^@]+$');
    }
    
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAdmin();
      allow update: if (isOwner(userId) || isAdmin()) && isValidUserData(request.resource.data);
      allow delete: if isAdmin();
    }
    
    match /transactions/{transactionId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (request.resource.data.userId == request.auth.uid || isAdmin());
    }
    
    match /products/{productId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isAdmin();
    }
    
    match /productPrices/{priceId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isAdmin();
    }
  }
}
```

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

### 6.4 Transaction Analytics Testing

#### Factory Pattern Tests
1. **ReportExtractionFactory**:
   - Platform detection accuracy
   - File format validation
   - Error handling for invalid files
   - Memory management for large files

2. **Platform-Specific Processors**:
   - Amazon CSV parsing
     - Header detection
     - Line skipping logic
     - Currency format handling
     - Field mapping validation
   - Flipkart XLSX parsing
     - Sheet structure validation
     - Multi-sheet processing
     - Price extraction accuracy
     - SKU mapping validation

#### Integration Tests
1. **Data Processing Flow**:
   - End-to-end file processing
   - Firebase persistence verification
   - Price mapping accuracy
   - Analytics recalculation
   - Error recovery scenarios

2. **UI Component Tests**:
   - Summary tile updates
   - Table sorting and filtering
   - Date range calculations
   - Loading state management
   - Error display handling

3. **Performance Tests**:
   - Large file processing
   - Batch operation efficiency
   - Memory usage monitoring
   - UI responsiveness checks

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

## 11. Implementation Status

### Completed Features ✅
- Label merging functionality with PDF generation
- Product management system with XLSX import
- Transaction analytics with real-time updates
- Firebase integration for data persistence
- Material-UI theming with dark mode support
- DataTable component with advanced features
- File upload and processing system
- Product price management
- Authentication system with role-based access
- Security rules implementation
- Protected routes and navigation
- User session management

### In Progress 🔄
- Enhanced offline capabilities
- Performance optimizations for large datasets

### Planned Features 🚀
- OAuth provider integration
- Multi-user support expansion
- Additional e-commerce platform support
- Advanced data visualization
- Bulk export functionality
- Automated testing improvements
- Enhanced error handling and recovery
- Data archival and backup system

## 12. Performance Metrics

### Current Performance
- Initial load time: ~1.5s
- PDF generation: ~3s for 100 labels
- Firebase operation latency: ~200ms
- UI update latency: ~100ms
- Offline sync success rate: 98%

### Target Metrics
- Initial load time: < 1s
- PDF generation: < 2s for 100 labels
- Firebase operation latency: < 150ms
- UI update latency: < 50ms
- Offline sync success rate: 99.9%