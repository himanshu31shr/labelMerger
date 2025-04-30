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

## 3. Firebase Integration Best Practices

### 3.1. Base Service Usage
- Always extend FirebaseService for Firebase operations
- Use strongly typed methods for all Firebase operations
- Implement proper error handling and retries
- Clean up listeners in useEffect cleanup functions

### 3.2. Authentication Flow
```typescript
// Use AuthService for all auth operations
const auth = new AuthService();

// In components
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    // Handle auth state
  });
  return () => unsubscribe();
}, []);

// Login with proper error handling
try {
  await auth.signIn(email, password, rememberMe);
} catch (error) {
  // Handle specific error cases
}
```

### 3.3. Data Operations
```typescript
// Batch operations for large datasets
const processBatchedProducts = async (products: Product[]) => {
  const batchSize = 500;
  const batches = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    batches.push(batch);
  }
  
  for (const batch of batches) {
    await batchOperation(batch, 'products', 'create', item => item.sku);
  }
};

// Real-time updates
const setupPriceListener = (onUpdate: (prices: ProductPrice[]) => void) => {
  return db.collection('productPrices')
    .onSnapshot((snapshot) => {
      const prices = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(prices);
    });
};
```

### 3.4. Offline Support
```typescript
// Enable persistence in service constructor
protected async enableOfflinePersistence() {
  if (!FirebaseService.persistenceEnabled) {
    try {
      await enableIndexedDbPersistence(this.db);
      FirebaseService.persistenceEnabled = true;
    } catch (err) {
      // Handle failed-precondition and unimplemented errors
    }
  }
}

// Handle offline/online state
window.addEventListener('online', () => {
  // Trigger sync operations
  syncPendingChanges();
});
```

### 3.5. Security Rules
- Always validate user authentication
- Implement role-based access control
- Validate data structure and types
- Use composite rules for complex validations

### 3.6. Performance Optimization
- Use pagination for large datasets
- Implement proper indexing
- Cache frequently accessed data
- Use batch operations for bulk updates

---

## 4. Testing Guidelines

### 4.1. Firebase Mocking
```typescript
// Mock Firebase instance
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => mockApp)
}));

// Mock auth functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => mockAuth),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn()
}));
```

### 4.2. Test Patterns
- Test service methods in isolation
- Mock Firebase responses
- Test error scenarios
- Verify cleanup functions

---

## 5. Error Handling Standards

### 5.1. Service Layer
```typescript
protected handleError(error: unknown, context: string): never {
  if (error instanceof FirebaseError) {
    // Handle specific Firebase errors
  } else if (error instanceof Error) {
    // Handle generic errors
  }
  throw error;
}
```

### 5.2. Component Layer
```typescript
try {
  await service.operation();
} catch (error) {
  if (error.code === 'permission-denied') {
    // Handle auth errors
  } else if (error.code === 'unavailable') {
    // Handle offline scenarios
  }
}
```

---

## 6. Data Models

### 6.1. Base Types
```typescript
interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface UserData extends BaseDocument {
  email: string;
  role: 'user' | 'admin';
  lastLoginAt: Date;
}

interface TransactionDoc extends BaseDocument {
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
  hash: string;
}
```

### 6.2. Service Types
```typescript
interface FirebaseServiceOptions {
  enablePersistence?: boolean;
  cacheSizeBytes?: number;
}

interface QueryOptions {
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  where?: [string, FirebaseFirestore.WhereFilterOp, any][];
}
```

---

## 7. Component Integration

### 7.1. Protected Routes
```typescript
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
```

### 7.2. Real-time Updates
```typescript
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const unsubscribe = setupProductListener(setProducts);
    return () => unsubscribe();
  }, []);
  
  return (/* render products */);
};
```

---

## 8. Performance Guidelines

### 8.1. Query Optimization
- Use compound queries for complex filters
- Implement cursor-based pagination
- Create necessary indexes
- Monitor query performance

### 8.2. Batch Processing
- Use batch operations for bulk updates
- Implement chunking for large datasets
- Monitor batch operation size
- Handle partial failures

### 8.3. Caching Strategy
- Cache frequently accessed data
- Implement LRU cache for large datasets
- Clear cache periodically
- Handle cache invalidation

---

## 9. Deployment Checklist

### 9.1. Pre-deployment
- Verify security rules
- Test offline functionality
- Check error handling
- Validate data models

### 9.2. Post-deployment
- Monitor performance metrics
- Track error rates
- Verify data consistency
- Check cache effectiveness