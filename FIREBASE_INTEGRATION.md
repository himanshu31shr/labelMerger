# Firebase Integration Action Plan

## Overview
This document outlines the step-by-step plan for integrating Firebase into the Transaction Analytics feature of the Label Merger and Analytics Tool, focusing on storing and visualizing transaction data.

## Phase 1: Firebase Setup and Configuration ✅

### Task 1.1: Project Setup (Completed)
1. Dependencies installed:
   - firebase
   - @firebase/app
   - @firebase/firestore

2. Firebase Configuration
   - Created `firebase.config.ts` with environment variables support
   - Implemented offline persistence
   - Added proper error handling

3. Base Service Implementation
   - Created `FirebaseService` class with common operations:
     - Document creation/update/deletion
     - Batch operations with size limits
     - Query support with constraints
     - Error handling with context
   - Added comprehensive unit tests
   - Implemented type-safe operations

4. Environment Configuration
   - Added `.env.local` for Firebase credentials
   - Created `.env.example` for documentation
   - Updated `.gitignore` for security

### Task 1.2: Testing Implementation (Completed)
- Unit tests covering:
  - Document operations
  - Batch operations
  - Error handling
  - Type safety
- All tests passing with proper mocking

## Phase 2: Product Management Integration

### Task 2.1: Product Data Structure
1. Design Firestore collection:
   - products
     - sku: string (unique identifier)
     - name: string
     - description: string
     - costPrice: number
     - platform: 'amazon' | 'flipkart'
     - metadata: {
       createdAt: timestamp
       updatedAt: timestamp
       lastImportedFrom: string // filename of last import
     }

2. Update database rules to include products collection:
   ```typescript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```

3. Create necessary indexes for product queries:
   - Single field: sku, platform, updatedAt
   - Compound: platform + updatedAt

### Task 2.2: Product Service Implementation
1. Create ProductService:
   ```typescript
   interface ProductService {
     parseXLSXFile(file: File): Promise<Product[]>;
     saveProducts(products: Product[]): Promise<void>;
     updateProduct(productId: string, data: Partial<Product>): Promise<void>;
     getProducts(filters?: ProductFilter): Promise<Product[]>;
     mapTransactionToProduct(transaction: Transaction): Promise<Product | null>;
   }
   ```

2. Implement XLSX parsing utilities:
   - Support both Flipkart and Amazon format parsing
   - Data validation and transformation
   - Error handling for malformed data
   - Batch processing for large files

### Task 2.3: Product Management UI
1. Create new components:
   - ProductManagementPage
   - ProductTable (using DataTable component)
   - ProductEditModal
   - ProductImportSection

2. Implement features:
   - XLSX file upload and parsing
   - Product listing with search and filters
   - Inline and modal editing for products
   - Batch update capabilities
   - Real-time updates using Firebase listeners

### Task 2.4: Product-Transaction Integration
1. Update Transaction schema to reference products:
   ```typescript
   interface Transaction {
     // ...existing fields...
     product: {
       sku: string;
       ref: DocumentReference; // Reference to product document
     }
   }
   ```

2. Implement product mapping:
   - Link transactions to products using SKU
   - Update transaction analysis to use product data
   - Add product details to transaction views

### Task 2.5: Testing
1. Unit tests:
   - XLSX parsing functions
   - Product CRUD operations
   - Product-Transaction mapping

2. Integration tests:
   - End-to-end product import flow
   - Product management UI
   - Real-time updates
   - Transaction integration

## Phase 3: Transaction Data Structure

### Task 3.1: Database Schema Design
1. Design Firestore collections:
   - transactions
     - transactionId: string
     - platform: 'amazon' | 'flipkart'
     - orderDate: timestamp
     - sku: string
     - quantity: number
     - sellingPrice: number
     - shippingFee: number
     - marketplaceFee: number
     - otherFees: number
     - product: {
       name: string
       purchasePrice: number
       currentPrice: number
     }
     - createdAt: timestamp
     - updatedAt: timestamp

   - productPrices
     - sku: string
     - name: string
     - purchasePrice: number
     - currentPrice: number
     - updatedAt: timestamp

2. Set up database rules
3. Create database indexes for efficient queries
4. Plan data migration strategy for existing data

## Phase 4: Transaction Analytics Integration

### Task 4.1: Data Service Implementation
1. Create TransactionFirebaseService:
   - saveTransactions(transactions: Transaction[]): Promise<void>
   - getTransactions(filters: TransactionFilter): Promise<Transaction[]>
   - updateProductPrices(prices: ProductPrice[]): Promise<void>
   - getProductPrices(): Promise<ProductPrice[]>

2. Update TransactionAnalysisService:
   - Modify to use Firebase for data persistence
   - Implement caching for better performance
   - Add real-time updates for price changes

### Task 4.2: Transaction Analytics Page Updates
1. Modify file upload flow:
   - Parse CSV data
   - Save transactions to Firebase
   - Update UI to show upload progress

2. Update visualization components:
   - Fetch data from Firebase instead of memory
   - Implement pagination for large datasets
   - Add real-time updates when data changes

3. Enhance price management:
   - Store price updates in Firebase
   - Reflect price changes in real-time across all views
   - Implement optimistic updates for better UX

## Phase 5: Testing Implementation

### Task 5.1: Unit Tests
1. Firebase service tests:
   - Test CRUD operations for transactions
   - Test price update operations
   - Test data transformation
   - Test error handling

2. Component tests:
   - Test file upload with Firebase integration
   - Test visualization with Firebase data
   - Test price management updates

### Task 5.2: Integration Tests
1. End-to-end flow testing:
   - File upload to Firebase storage
   - Data retrieval and visualization
   - Real-time updates
   - Price management

## Implementation Notes

### Best Practices
- Use batch writes for uploading multiple transactions
- Implement proper error handling and retries
- Cache frequently accessed data
- Use Firebase offline persistence
- Implement proper cleanup for subscriptions
- Use batch operations for product imports
- Implement proper SKU validation
- Handle duplicate products gracefully

### Performance Considerations
- Implement pagination for large datasets
- Use compound queries for efficient filtering
- Cache product prices locally
- Optimize real-time updates
- Optimize XLSX parsing for large files
- Index frequently queried product fields
- Cache product data locally

### Security Rules
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
    match /products/{productId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

## Success Criteria
1. Transaction data successfully stored in Firebase
2. Visualization components working with Firebase data
3. Real-time price updates reflected in UI
4. Performance metrics meet requirements:
   - Initial load time < 2s
   - Update latency < 500ms
5. All tests passing with good coverage
6. Product import and management working efficiently
7. Successful product-transaction mapping
8. Product updates reflected in real-time