# Knowledge Base for Label Merger and Analytics Tool

This file serves as a centralized repository for common knowledge, recurring instructions, and standard practices to be followed in the project. It ensures consistency and efficiency in development and maintenance tasks.

---

## 1. General Instructions

1. **Follow TDD (Test-Driven Development):**
   - Every new feature or change must include corresponding unit tests.
   - Ensure all tests pass before considering the task complete.

2. **Update Documentation:**
   - Update the `PRD.md` file to reflect any new features, changes, or enhancements.
   - Update the `README.md` file to include usage instructions, implementation details, and testing information for new features.

3. **Code Quality:**
   - Follow standard coding practices and ensure code readability.
   - Use meaningful variable and function names.
   - Avoid code duplication and ensure modularity.

4. **Testing Standards:**
   - Use Jest and `@testing-library/react` for unit and integration tests.
   - Mock external dependencies (e.g., `pdf-lib`, `papaparse`) as needed.
   - Ensure 100% test coverage for critical components and services.

5. **Version Control:**
   - Commit changes with clear and descriptive messages.
   - Use feature branches for new features and merge them into the main branch after review.

---

## 2. Standard Coding Practices

1. **React Components:**
   - Use functional components with hooks (e.g., `useState`, `useEffect`).
   - Ensure components are reusable and modular.
   - Use Material-UI for consistent styling and theming.

2. **State Management:**
   - Use React's `useState` and `useContext` for local and shared state
   - Use Firebase Firestore for persistent storage
   - Implement proper cleanup for Firebase listeners

3. **Theming:**
   - Use Material-UI's `ThemeProvider` and `createTheme` for theming.
   - Ensure support for both light and dark modes.

4. **File Structure:**
   - Organize files by feature (e.g., `pages`, `components`, `services`).
   - Use descriptive file and folder names.

5. **Error Handling:**
   - Handle errors gracefully and provide meaningful feedback to users.
   - Log errors for debugging purposes.

---

## 3. Recurring Instructions

1. **Dark Mode Integration:**
   - Use Material-UI's `ThemeProvider` and `createTheme`.
   - Provide a toggle switch for users to switch between light and dark modes.
   - Ensure the toggle state is persistent across sessions (e.g., using localStorage).

2. **Firebase Operations:**
   - Use the Firebase service for data persistence
   - Handle offline/online states appropriately
   - Implement proper error handling
   - Clean up listeners when components unmount

3. **PDF Generation:**
   - Use `pdf-lib` for PDF generation and manipulation.
   - Ensure compatibility with both Amazon and Flipkart label formats.

4. **CSV Parsing:**
   - Use `papaparse` for parsing CSV files.
   - Validate and sanitize input data before processing.

5. **Transaction Analytics**:
   - Use the `TransactionAnalyticsPage` for uploading and analyzing transaction data.
   - Ensure the `TransactionAnalysisService` is used for processing and summarizing transaction data.
   - Validate uploaded CSV files for correct formatting and required fields.
   - Use the price management modal to update product prices dynamically.
   - Support both Amazon and Flipkart transaction formats.
   - Implement market-specific calculations:
     - Handle different fee structures for each marketplace
     - Process marketplace-specific fields correctly
     - Calculate profits based on marketplace rules
   - Maintain separate summaries for each marketplace
   - Support real-time price updates with dynamic calculation

---

## 4. Testing Guidelines

1. **Unit Testing:**
   - Test components in isolation.
   - Use meaningful test descriptions.
   - Follow the Arrange-Act-Assert pattern.

2. **Integration Testing:**
   - Test component interactions.
   - Test data flow between components.
   - Test routing functionality.

3. **Mock Testing:**
   - Mock external dependencies.
   - Create meaningful test data.
   - Handle asynchronous operations properly.

---

## 5. Documentation Updates

1. **PRD.md:**
   - Add a new section for every new feature or enhancement.
   - Include implementation details, testing requirements, and usage instructions.

2. **README.md:**
   - Update the `Features` section to include new features.
   - Add usage instructions and implementation details for new features.
   - Ensure the `Testing` section is up-to-date.

---

## 6. Future Enhancements

1. **Multi-Platform Support:**
   - Add support for additional e-commerce platforms.
   - Implement standardized data transformation pipeline.
   - Create platform-specific adapters for new marketplaces.

2. **Export Functionality:**
   - Provide options to export analytics data in various formats (CSV, PDF).
   - Support bulk export operations.
   - Implement progress tracking for large exports.

3. **User Authentication:**
   - Implement user authentication for multi-user support.
   - Add role-based access control.
   - Support team collaboration features.

4. **Performance Optimization:**
   - PDF generation:
     - Implement worker threads for PDF processing
     - Add progress tracking for large PDF operations
   - UI optimizations:
     - Implement virtualization for large tables
     - Use React.memo for expensive components
     - Implement progressive loading
   - Data visualization:
     - Add charts and graphs for analytics
     - Implement real-time data updates
     - Support customizable dashboards

---

## 7. Development Workflow

1. **Feature Development:**
   - Create feature branch from main
   - Write tests first (TDD approach)
   - Implement feature
   - Ensure test coverage
   - Document changes in PRD and README
   - Submit pull request

2. **Code Review Process:**
   - Verify test coverage
   - Check performance impact
   - Review documentation updates
   - Ensure accessibility compliance
   - Validate browser compatibility

3. **Release Process:**
   - Update version numbers
   - Generate changelog
   - Create release notes
   - Deploy to staging
   - Perform regression testing
   - Deploy to production

---

## 8. Firebase Integration Guidelines

### 8.1 Authentication Implementation
1. **User Management**:
   - Use AuthService for all authentication operations
   - Implement proper session persistence
   - Handle auth state changes with cleanup
   - Validate user roles and permissions

2. **Security Best Practices**:
   - Never store passwords or sensitive data
   - Use secure session management
   - Implement proper token handling
   - Follow Firebase security guidelines

3. **Route Protection**:
   - Use ProtectedRoute component
   - Handle auth state loading
   - Implement proper redirects
   - Preserve return paths

4. **Error Handling**:
   - Provide clear error messages
   - Handle network issues gracefully
   - Implement retry mechanisms
   - Log authentication failures

### 8.2 Role-Based Access Control
1. **User Roles**:
   - Admin: Full system access
   - User: Limited access based on ownership
   - Define clear role hierarchies
   - Implement role validation

2. **Permission Management**:
   - Use Firestore security rules
   - Validate at service level
   - Implement UI-level controls
   - Regular permission audits

3. **Data Access Control**:
   - Enforce user data isolation
   - Implement proper queries
   - Validate ownership
   - Handle unauthorized access

---

## 9. Data Storage Guidelines

### 9.1 Firebase Firestore
1. **Collection Structure**:
   - `transactions/`: Main collection for transaction data
   - `productPrices/`: Collection for product pricing data

2. **Data Models**:
   ```typescript
   // Transaction Document
   interface TransactionDoc {
     transactionId: string;
     platform: 'amazon' | 'flipkart';
     orderDate: Timestamp;
     sku: string;
     quantity: number;
     sellingPrice: number;
     expenses: {
       shippingFee: number;
       marketplaceFee: number;
       otherFees: number;
     };
     product: {
       name: string;
       costPrice: number;
       basePrice: number;
     };
     metadata: {
       createdAt: Timestamp;
       updatedAt: Timestamp;
     };
   }

   // Product Price Document
   interface ProductPriceDoc {
     sku: string;
     name: string;
     costPrice: number;
     basePrice: number;
     updatedAt: Timestamp;
   }
   ```

3. **Query Patterns**:
   - Get transactions by date range
   - Get transactions by platform
   - Get product prices by SKU list
   - Get latest price updates

4. **Indexing**:
   - Single-field indexes:
     - transactions/orderDate
     - transactions/platform
     - transactions/sku
     - productPrices/sku
   - Compound indexes:
     - transactions/platform + orderDate
     - transactions/sku + orderDate

### 9.2 Performance Optimization
1. **Batch Operations**:
   - Use batched writes for multiple documents
   - Group related updates
   - Monitor batch size limits

2. **Query Optimization**:
   - Use pagination
   - Implement cursor-based pagination
   - Limit query result sizes

3. **Real-time Updates**:
   - Use snapshot listeners efficiently
   - Detach listeners when not needed
   - Implement debouncing

4. **Caching Strategy**:
   - Cache frequently accessed data
   - Implement LRU cache
   - Clear cache periodically

### 9.3 Error Handling
1. **Network Errors**:
   - Implement exponential backoff
   - Queue failed operations
   - Show appropriate user feedback

2. **Data Validation Errors**:
   - Validate data before write
   - Show detailed error messages
   - Log validation failures

3. **Concurrency Issues**:
   - Use transactions for atomic operations
   - Handle conflicts gracefully
   - Implement optimistic updates

## 9. DataTable Component Guidelines

### 9.1. Component Structure
```typescript
interface Column<T> {
  id: keyof T | string;
  label: string;
  filter?: boolean;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown, row: T | undefined) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  defaultSortColumn: string;
  defaultSortDirection: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}
```

### 9.2. Usage Patterns

1. **Basic Table with Pagination**:
   ```tsx
   const columns: Column<YourType>[] = [
     { id: 'field', label: 'Field Name', filter: true },
     { id: 'numericField', label: 'Number', align: 'right' }
   ];

   <DataTable
     columns={columns}
     data={yourData}
     defaultSortColumn="field"
     defaultSortDirection="asc"
     rowsPerPageOptions={[10, 25, 50]}
     defaultRowsPerPage={25}
   />
   ```

2. **Formatted Values**:
   ```tsx
   {
     id: 'price',
     label: 'Price',
     align: 'right',
     format: (value) => <FormattedCurrency value={value as number} />
   }
   ```

3. **Interactive Rows**:
   ```tsx
   <DataTable
     columns={columns}
     data={data}
     onRowClick={(row) => handleRowClick(row)}
     // ...other props
   />
   ```

### 9.3. Features

1. **Pagination**:
   - Configurable page sizes via `rowsPerPageOptions`
   - Default page size setting with `defaultRowsPerPage`
   - Automatic page reset on filter/sort changes

2. **Filtering**:
   - Column-level filtering with `filter: true`
   - Case-insensitive text search
   - Support for nested object properties
   - Auto-resets to first page on filter change

3. **Sorting**:
   - Click column headers to sort
   - Supports multiple data types (string, number, Date, boolean)
   - Smart comparison for different data types
   - Handles nested object properties
   - Null/undefined handling

### 9.4. Best Practices

1. **Performance**:
   - Use appropriate page sizes for data volume
   - Enable filters only on searchable columns
   - Memoized sorting and filtering
   - Efficient data structure updates

2. **User Experience**:
   - Consistent column alignment (right for numbers)
   - Clear filter input fields
   - Responsive pagination controls
   - Proper null value handling

3. **Type Safety**:
   - Properly typed column definitions
   - Type-safe row click handlers
   - Consistent data formatting

4. **Customization**:
   - Custom cell formatters
   - Flexible alignment options
   - Configurable page sizes

### 9.5. Known Limitations

1. **Sorting**:
   - Complex object comparisons may need custom formatters
   - Date comparison requires proper Date objects

2. **Filtering**:
   - Basic text-based filtering only
   - No advanced filter combinations
   - Case-insensitive matching only

---

## 10. Performance Optimization Guidelines

### 10.1 Firebase Operations
1. **Batch Processing**:
   ```typescript
   // Example batch operation
   const batch = db.batch();
   transactions.forEach(tx => {
     const ref = db.collection('transactions').doc();
     batch.set(ref, tx);
   });
   await batch.commit();
   ```

2. **Query Optimization**:
   - Use composite indexes for complex queries
   - Implement cursor-based pagination
   - Cache frequently accessed data locally

### 10.2 React Component Optimization
1. **Memoization**:
   - Use React.memo for expensive components
   - Implement useMemo for complex calculations
   - Use useCallback for event handlers

2. **Data Loading**:
   - Implement skeleton loading states
   - Use progressive loading for large datasets
   - Prefetch data based on user behavior

---

## 11. Error Handling Standards

### 11.1 Firebase Errors
```typescript
// Standard error handling pattern
try {
  await saveTransactions(data);
} catch (error) {
  if (error.code === 'permission-denied') {
    handleAuthError(error);
  } else if (error.code === 'unavailable') {
    queueForRetry(data);
  } else {
    logError(error);
  }
}
```

### 11.2 User Feedback
1. **Progress Indicators**:
   - Show progress for long operations
   - Implement cancelable operations
   - Provide detailed error messages

2. **Recovery Actions**:
   - Offer retry options for failed operations
   - Implement auto-save for form data
   - Provide offline capabilities

## 12. Monitoring and Analytics

### 12.1 Performance Metrics
- Track initial load time
- Monitor Firebase operation latency
- Measure PDF generation time
- Record offline sync success rate

### 12.2 Error Tracking
- Log all Firebase operation errors
- Track PDF generation failures
- Monitor network connectivity issues
- Record user interaction errors

### 12.3 Usage Analytics
- Track feature adoption rates
- Monitor resource usage patterns
- Record user navigation flows
- Measure response times

---

## 13. Product Management Guidelines

### 13.1 XLSX File Processing
1. **File Format Handling**:
   - Support both Amazon and Flipkart XLSX formats
   - Validate required columns presence
   - Handle empty rows and cells gracefully
   - Process files in chunks for large datasets

2. **Data Validation**:
   - Validate SKUs for uniqueness
   - Ensure required fields are present
   - Validate numeric values (prices, quantities)
   - Handle special characters in text fields

3. **Import Process**:
   - Use batch operations for Firebase writes
   - Implement progress tracking
   - Handle duplicate SKUs
   - Maintain import history

### 13.2 Product Data Management
1. **CRUD Operations**:
   - Implement optimistic updates
   - Validate data before saves
   - Use transactions for related updates
   - Handle concurrent edits

2. **Real-time Updates**:
   - Use Firebase listeners efficiently
   - Update UI immediately on changes
   - Handle offline scenarios
   - Implement proper cleanup

3. **Performance Optimization**:
   - Cache frequently accessed products
   - Use pagination for large lists
   - Implement efficient search
   - Optimize Firebase queries

### 13.3 Product-Transaction Integration
1. **SKU Mapping**:
   - Map products to transactions in real-time
   - Handle missing product scenarios
   - Update transaction analysis with product data
   - Maintain referential integrity

2. **Data Consistency**:
   - Ensure price history is maintained
   - Track product changes
   - Handle product deletions properly
   - Validate cross-references

---

## 14. Firebase Service Implementation Guide

### 14.1 Authentication Service
```typescript
// Standard authentication pattern
class AuthService {
  // Initialize with proper persistence
  constructor() {
    setPersistence(auth, browserLocalPersistence);
  }

  // Handle auth state changes
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged((user) => {
      // Clean up subscriptions if needed
      callback(user);
    });
  }

  // Implement proper error handling
  async handleAuthError(error) {
    switch (error.code) {
      case 'auth/wrong-password':
        throw new Error('Invalid credentials');
      case 'auth/user-not-found':
        throw new Error('User not found');
      default:
        throw error;
    }
  }
}
```

### 14.2 Security Implementation
```typescript
// Security rule patterns
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Validate user role
    function hasRole(role) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }

    // Validate data format
    function isValidData(data) {
      return data.keys().hasAll(['required', 'fields']) &&
             data.someField is string;
    }
  }
}
```

### 14.3 Firestore Service Example
```typescript
class TransactionService extends FirebaseService {
  constructor() {
    super('transactions');
  }

  async getTransactionsByUser(userId: string) {
    return this.collection.where('userId', '==', userId).get();
  }
}
```

### 14.4 Batch Operation Example
```typescript
async function batchAddTransactions(transactions: TransactionDoc[]) {
  const batch = db.batch();
  transactions.forEach(transaction => {
    const ref = db.collection('transactions').doc(transaction.transactionId);
    batch.set(ref, transaction);
  });
  await batch.commit();
}
```

### 14.5 Query Operation Example
```typescript
async function getRecentTransactions(limit: number) {
  return db.collection('transactions')
    .orderBy('orderDate', 'desc')
    .limit(limit)
    .get();
}
```

### 14.6 Testing Firebase Services
- Mock Firebase operations in tests
- Test error handling scenarios
- Verify batch operation behavior
- Test type safety of operations

---

## 15. Practical Implementation Examples

### 15.1 Firebase Real-time Updates
```typescript
// Example of setting up real-time product price updates
const setupPriceListener = (onUpdate: (prices: ProductPrice[]) => void) => {
  const unsubscribe = db.collection('productPrices')
    .onSnapshot((snapshot) => {
      const prices = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(prices);
    }, (error) => {
      console.error('Price listener error:', error);
    });
  
  return unsubscribe;
};

// Usage in component
useEffect(() => {
  const unsubscribe = setupPriceListener(setPrices);
  return () => unsubscribe();
}, []);
```

### 15.2 Batch Processing Large Datasets
```typescript
// Example of processing large XLSX imports
const processBatchedProducts = async (products: Product[]) => {
  const batchSize = 500;
  const batches = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    batches.push(batch);
  }
  
  for (const batch of batches) {
    const writeBatch = db.batch();
    batch.forEach(product => {
      const ref = db.collection('products').doc(product.sku);
      writeBatch.set(ref, product, { merge: true });
    });
    await writeBatch.commit();
  }
};
```

### 15.3 Offline Support Implementation
```typescript
// Example of handling offline/online state
const setupOfflineHandler = () => {
  db.enablePersistence()
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab
      } else if (err.code === 'unimplemented') {
        // Browser doesn't support persistence
      }
    });

  // Listen for online/offline changes
  window.addEventListener('online', () => {
    // Trigger sync operations
    syncPendingChanges();
  });
};

const syncPendingChanges = async () => {
  const pendingOps = await getPendingOperations();
  for (const op of pendingOps) {
    await processPendingOperation(op);
  }
};
```

## 16. Recent Implementation Updates

### 16.1 Performance Optimizations
- Implemented virtual scrolling for large datasets
- Added data caching for frequently accessed products
- Optimized Firebase queries with compound indexes
- Improved PDF generation performance with web workers

### 16.2 Error Handling Improvements
- Added retry mechanism for failed Firebase operations
- Implemented better error messages for user feedback
- Added error boundary components for UI recovery
- Enhanced validation for file uploads

### 16.3 Testing Enhancements
- Added integration tests for Firebase operations
- Improved mock implementations for external services
- Added performance benchmarking tests
- Enhanced test coverage for critical paths

## 17. Development Guidelines

### 17.1 Code Quality Standards
- Use TypeScript strict mode
- Implement proper error boundaries
- Follow React hooks best practices
- Use proper type definitions

### 17.2 Performance Guidelines
- Implement proper React.memo usage
- Use IndexedDB for large dataset caching
- Optimize Firebase queries
- Implement proper cleanup for subscriptions

### 17.3 Testing Requirements
- Maintain minimum 80% test coverage
- Include integration tests for critical flows
- Mock external services properly
- Test error scenarios thoroughly

## 18. Transaction Analytics Implementation

### 18.1 Component Architecture
1. **Main Page (`transactionAnalytics.page.tsx`)**:
   - Manages global state and data fetching
   - Handles file upload and processing
   - Coordinates between child components
   - Implements tab-based navigation

2. **Summary Tiles (`summary-tiles.component.tsx`)**:
   - Displays key metrics in visual tiles:
     - Total Sales
     - Total Expenses
     - Total Units Sold
     - Total Cost
     - Total Profit
   - Material-UI Paper components with icons
   - Color-coded for different metrics

3. **Order List (`order-list.component.tsx`)**:
   - Tabular view of individual transactions
   - Implements DataTable with filtering and sorting
   - Columns:
     - Transaction ID
     - SKU
     - Product Name
     - Platform
     - Selling Price
     - Earnings
     - Product Cost
     - Type

4. **Product List (`product-list.component.tsx`)**:
   - Product-wise performance summary
   - Aggregated metrics by SKU
   - DataTable implementation with:
     - SKU
     - Description
     - Units
     - Sales
     - Cost
     - Profit

### 18.2 Data Flow
1. **Initial Load**:
   ```typescript
   // Load existing transactions and prices
   const loadData = async () => {
     const [transactions, products] = await Promise.all([
       transactionService.getTransactions(),
       productService.getProducts()
     ]);
     // Process and update state
   };
   ```

2. **File Upload Process**:
   - User selects CSV/XLSX file
   - Factory pattern processes file based on platform
   - Data saved to Firebase
   - UI updates with new data
   - Analytics recalculated

3. **Price Management**:
   - Direct navigation to product management
   - Real-time price updates
   - Automatic analytics recalculation

### 18.3 State Management
1. **Component State**:
   - Transactions array
   - Product prices map
   - Summary data
   - Loading states
   - Error handling
   - Tab selection
   - Date range tracking

2. **Firebase Integration**:
   - Real-time data persistence
   - Batch operations for uploads
   - Optimistic updates
   - Offline support

### 18.4 Error Handling
1. **Upload Validation**:
   - File format checking
   - Required fields validation
   - Data format verification

2. **User Feedback**:
   - Loading indicators
   - Error alerts
   - Process status updates

3. **Recovery Actions**:
   - Offer retry options for failed operations
   - Implement auto-save for form data
   - Provide offline capabilities

### 18.5 Factory Pattern Implementation
1. **Platform Detection**:
   ```typescript
   class ReportExtractionFactory {
     private identify() {
       if (this.file?.name.endsWith(".xlsx")) {
         this.reportType = "Flipkart";
       } else {
         this.reportType = "Amazon";
       }
     }
   }
   ```

2. **Processor Selection**:
   - Automatic format detection based on file extension
   - Dynamic instantiation of appropriate processor
   - Error handling for unsupported formats
   - Memory-efficient processing strategy

3. **Data Standardization**:
   ```typescript
   interface AbstractFactory {
     file: File;
     process(): Promise<Transaction[]>;
     transactions: Transaction[];
     prices: ProductPrice[];
   }
   ```

### 18.6 Data Processing
1. **Amazon CSV Processing**:
   - Header line skipping (11 lines)
   - Custom field mapping
   - Currency format normalization
   - Dynamic SKU-price mapping

2. **Flipkart XLSX Processing**:
   - Multi-sheet parsing (Orders P&L, SKU-level P&L)
   - Required sheet validation
   - Price extraction from SKU sheet
   - Order data transformation

3. **Price Integration**:
   - Real-time price mapping
   - Cost calculation per transaction
   - SKU-based relationship tracking
   - Profit calculation with latest prices

### 18.7 Performance Optimizations
1. **Memory Management**:
   - Stream processing for large files
   - Efficient data structures (Map for price lookup)
   - Cleanup of temporary data
   - Resource release after processing

2. **State Updates**:
   - Batch state updates
   - Memoized calculations
   - Efficient re-renders
   - Loading state management