# Knowledge Base for Label Merger and Analytics Tool

This file serves as a centralized repository for common knowledge, recurring instructions, and standard practices to be followed in the project. It ensures consistency and efficiency in development and maintenance tasks.

---

## 1. Notification System

### 1.1. Service Worker Registration
```typescript
// Service worker registration handles both secure (HTTPS) and ngrok environments
const registerFirebaseServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      console.log('Found existing service worker registration');
      return registration;
    }

    const swPath = '/firebase-messaging-sw.js';
    const newRegistration = await navigator.serviceWorker.register(swPath, {
      scope: '/',
      updateViaCache: 'none'
    });

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service worker registered successfully');
    return newRegistration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
};
```

### 1.2. Firebase Cloud Messaging (FCM)
- **VAPID Key**: Stored in environment variables as `VITE_FIREBASE_VAPID_KEY`
- **Message Handling**: Service worker processes push notifications even when the app is in background
- **Token Management**: Automatically refreshes FCM tokens when necessary

### 1.3. Permission Handling
```typescript
// Request notification permission
const requestNotificationPermission = async (): Promise<boolean> => {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};
```

### 1.4. Environment Variables
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_VAPID_KEY=
```

---

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

---

## 1. General Instructions

1. **Follow TDD (Test-Driven Development):**
   - Every new feature or change must include corresponding unit tests.
   - Ensure all tests pass before considering the task complete.
   - Maintain test coverage above 90% for critical components.

2. **Update Documentation:**
   - Update the `PRD.md` file to reflect any new features, changes, or enhancements.
   - Update the `README.md` file to include usage instructions, implementation details, and testing information for new features.
   - Keep the Knowledge Base up to date with new patterns and practices.

3. **Code Quality:**
   - Follow standard coding practices and ensure code readability.
   - Use meaningful variable and function names.
   - Avoid code duplication and ensure modularity.
   - Follow TypeScript best practices and maintain strict type checking.

4. **Testing Standards:**
   - Use Jest and `@testing-library/react` for unit and integration tests.
   - Mock external dependencies (e.g., `pdf-lib`, `papaparse`) as needed.
   - Ensure 100% test coverage for critical components and services.
   - Write tests for both success and error scenarios.

5. **Version Control:**
   - Commit changes with clear and descriptive messages.
   - Use feature branches for new features and merge them into the main branch after review.
   - Follow conventional commits format.

---

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

---

## 2. Standard Coding Practices

1. **React Components:**
   - Use functional components with hooks (e.g., `useState`, `useEffect`).
   - Ensure components are reusable and modular.
   - Use Material-UI for consistent styling and theming.
   - Implement proper cleanup in useEffect hooks.
   - Split components into smaller, focused units (e.g., `HiddenProducts` component).
   - Use TypeScript for type safety and better developer experience.
   - Ensure proper color contrast for UI elements to maintain accessibility.
   - Use consistent styling patterns for alert widgets (background, border, icon, text).

2. **State Management:**
   - Use React's `useState` and `useContext` for local and shared state
   - Use Redux for global state management with proper slices and actions
   - Implement proper cleanup for Firebase listeners
   - Use selectors for efficient state access
   - Handle loading states and errors consistently
   - Create dedicated slices for specific features (e.g., `inventorySlice` for inventory management)
   - Use async thunks for data fetching operations with proper loading and error states

3. **Theming:**
   - Use Material-UI's `ThemeProvider` and `createTheme` for theming.
   - Ensure support for both light and dark modes.
   - Maintain consistent color palette and typography.

4. **File Structure:**
   - Organize files by feature (e.g., `pages`, `components`, `services`).
   - Use descriptive file and folder names.
   - Keep related files together in feature folders.
   - Follow a consistent naming convention (e.g., `.page.tsx` for pages).
   - Place shared components in a common directory.
   - Keep component-specific files in their own directories.

5. **Error Handling:**
   - Handle errors gracefully and provide meaningful feedback to users.
   - Log errors for debugging purposes.
   - Implement proper error boundaries.
   - Add null checks and optional chaining for potentially undefined properties.
   - Provide fallback values for missing data (e.g., `product.inventory?.quantity || 0`).

---

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

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

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

---

## 8. Performance Optimization Best Practices

### 8.1. React Component Optimization
```typescript
// Use React.memo for expensive components
const ProductCard = React.memo(({ product }: ProductCardProps) => {
  // Component implementation
});

// Use useMemo for expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}, [products, searchTerm]);

// Use useCallback for event handlers passed to child components
const handleProductSelect = useCallback((productId: string) => {
  // Handle product selection
}, [/* dependencies */]);

// Avoid unnecessary re-renders with proper dependency arrays
useEffect(() => {
  // Only runs when products or filters change
  applyFilters();
}, [products, filters]);
```

### 8.2. Redux Optimization
```typescript
// Use createSelector for memoized selectors
const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    return products.filter(product => {
      // Apply filters
    });
  }
);

// Use proper normalization for state
const initialState = {
  products: {
    entities: {},
    ids: []
  }
};

// Use Redux Toolkit's createEntityAdapter
const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.sku,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
```

### 8.3. Firebase Performance Optimization
```typescript
// Use compound queries instead of client-side filtering
const q = query(
  collection(db, 'products'),
  where('platform', '==', 'amazon'),
  where('inventory.quantity', '<=', 5),
  orderBy('updatedAt', 'desc'),
  limit(20)
);

// Use batched writes for multiple operations
const batch = writeBatch(db);
products.forEach(product => {
  const docRef = doc(db, 'products', product.sku);
  batch.set(docRef, product);
});
await batch.commit();

// Use transaction for atomic operations
const updateInventory = async (sku: string, quantity: number) => {
  const docRef = doc(db, 'products', sku);
  await runTransaction(db, async (transaction) => {
    const docSnap = await transaction.get(docRef);
    if (!docSnap.exists()) throw new Error('Product not found');
    
    const product = docSnap.data();
    const newQuantity = (product.inventory?.quantity || 0) + quantity;
    
    transaction.update(docRef, {
      'inventory.quantity': newQuantity,
      'inventory.lastUpdated': serverTimestamp()
    });
  });
};
```

### 8.4. Bundle Size Optimization
- Use dynamic imports for code splitting
- Implement tree shaking with proper module imports
- Optimize image assets with proper formats and sizes
- Use lazy loading for routes and heavy components
- Configure proper chunking in Vite build configuration

### 8.5. Rendering Optimization
- Implement virtualized lists for large datasets
- Use skeleton loaders for content that's loading
- Implement proper loading states for async operations
- Defer non-critical rendering with useDeferred value
- Use CSS transitions instead of JavaScript animations when possible

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

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => mockFirestore),
  collection: jest.fn(() => mockCollection),
  doc: jest.fn(() => mockDoc),
  getDocs: jest.fn(() => Promise.resolve(mockQuerySnapshot)),
  getDoc: jest.fn(() => Promise.resolve(mockDocSnapshot)),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(() => mockQuery),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn(() => mockUnsubscribe)
}));
```

### 4.2. Test Patterns
- Test service methods in isolation
- Mock Firebase responses
- Test error scenarios
- Verify cleanup functions
- Use testing-library/react for component tests
- Test both success and error paths
- Use proper assertions for async operations
- Implement snapshot testing for UI components
- Test Redux actions and reducers separately
- Use mock timers for time-dependent tests

---

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

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

## 6. Inventory Management System

### 6.1. Data Structure
```typescript
// Product inventory structure
interface Inventory {
  quantity: number;        // Can be negative for backorders
  lowStockThreshold: number;
  lastUpdated: Timestamp;
}

interface Product {
  sku: string;
  name: string;
  platform: string;
  // ... other product fields
  inventory?: Inventory;  // Optional inventory field
}
```

### 6.2. Inventory Operations
```typescript
// Update inventory quantity
async updateInventory(sku: string, quantityChange: number): Promise<Product> {
  const product = await this.getProductDetails(sku);
  if (!product.inventory) {
    // Initialize inventory if it doesn't exist
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        quantity: quantityChange,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      }
    });
  } else {
    // Update existing inventory
    const newQuantity = product.inventory.quantity + quantityChange;
    await this.updateDocument(this.COLLECTION_NAME, sku, {
      inventory: {
        ...product.inventory,
        quantity: newQuantity,  // Allow negative values for backorders
        lastUpdated: Timestamp.now()
      }
    });
  }
  return this.getProductDetails(sku);
}

// Check for low stock items
async getLowStockItems(): Promise<Product[]> {
  const products = await this.getAllProducts();
  return products.filter(product => {
    if (!product.inventory) return false;
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  });
}
```

### 6.3. Inventory Status Handling
```typescript
// Get inventory status color
const getInventoryStatusColor = (product: Product) => {
  if (!product.inventory) return 'error';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'error';
  if (quantity === 0) return 'error';
  if (quantity <= lowStockThreshold) return 'warning';
  return 'success';
};

// Get inventory status text
const getInventoryStatusText = (product: Product) => {
  if (!product.inventory) return 'No Inventory Data';
  const { quantity, lowStockThreshold } = product.inventory;
  if (quantity < 0) return 'Backorder';
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};
```

---

## 7. Dashboard Widgets

### 7.1. Widget Design Pattern
- Use consistent styling for alert widgets:
  - Appropriate background color with good contrast
  - Matching border color
  - Consistent icon placement
  - Clear, readable text with proper contrast
  - Count indicators with appropriate colors
  - Limited number of items with "View more" option

### 7.2. Widget Implementation
```typescript
// Example widget structure
<Paper sx={{ p: 2, height: '100%', backgroundColor: '#fff3e0', border: '1px solid #ed6c02' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <WarningIcon sx={{ mr: 1, color: '#ed6c02' }} />
    <Typography variant="h6" component="h2" sx={{ color: '#9a0007', fontWeight: 'bold' }}>
      Low Stock Alerts
    </Typography>
  </Box>
  
  <Divider sx={{ mb: 2 }} />
  
  {/* Widget content */}
  <List dense sx={{ mb: 1 }}>
    {items.map((item) => (
      <ListItem key={item.id}>
        {/* Item content */}
      </ListItem>
    ))}
  </List>
  
  {/* View more link/button */}
  <Box sx={{ textAlign: 'center' }}>
    <Button 
      variant="outlined" 
      size="small"
      component={RouterLink}
      to="/relevant-page"
    >
      View more items
    </Button>
  </Box>
</Paper>
```

### 7.3. Dashboard Layout
- Use Grid system for responsive layout
- Organize widgets by importance and relation
- Ensure consistent spacing between widgets
- Group related widgets together
- Use appropriate size for each widget based on content

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
  where?: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
}
```

## 7. Performance Optimization Guidelines

### 7.1. React Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Use useCallback for event handlers
- Implement virtualization for long lists

### 7.2. Firebase Performance
- Use proper indexing for queries
- Implement pagination for large datasets
- Use batch operations for bulk updates
- Cache frequently accessed data

### 7.3. Bundle Optimization
- Implement code splitting
- Use dynamic imports for large components
- Optimize third-party dependencies
- Monitor bundle size regularly

## 8. Security Best Practices

### 8.1. Authentication
- Implement proper session management
- Use secure password policies
- Implement rate limiting
- Handle token refresh properly

### 8.2. Data Security
- Validate all user inputs
- Implement proper access control
- Use secure data transmission
- Implement proper error handling

### 8.3. Firebase Security
- Use proper security rules
- Implement role-based access
- Validate data structure
- Handle offline security