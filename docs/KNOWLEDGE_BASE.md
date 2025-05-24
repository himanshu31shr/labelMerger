# Knowledge Base for Label Merger and Analytics Tool

This file serves as a centralized repository for common knowledge, recurring instructions, and standard practices to be followed in the project. It ensures consistency and efficiency in development and maintenance tasks.

---

## 0. Hidden Products & Price Management

### 0.1. Overview
The application provides a dedicated interface for managing hidden products and price competitiveness across platforms. This feature helps sellers identify and take action on products that are either hidden or have uncompetitive pricing.

### 0.2. Key Features

#### Hidden Products Tab
- Displays products that are not visible on the seller's storefront
- Shows key metrics including SKU, product name, platform, cost price, and selling price
- Provides quick actions for each product:
  - View/edit product details
  - View on Amazon/Flipkart
  - Additional actions through the action menu

#### Price Management Tab
- Identifies products where your price is higher than competitors
- Highlights the price difference for quick assessment
- Shows competitor price for comparison
- Enables quick price adjustments to stay competitive

### 0.3. Implementation Details
- **Component Structure**:
  - `HiddenProductsPage`: Main container component with tab navigation
  - `HiddenProducts`: Reusable component that handles both hidden products and price management views
  - `DataTable`: Generic table component for displaying product data

- **State Management**:
  - Uses Redux for state management
  - Filters products based on visibility and pricing criteria
  - Handles loading states and error handling

- **Key Dependencies**:
  - Material-UI for UI components
  - Redux for state management
  - Custom formatters for currency and data display

### 0.4. Usage Guidelines
- Navigate to the Hidden Products section from the main menu
- Switch between "Hidden Products" and "Price Management" tabs as needed
- Use the filter functionality to find specific products
- Take appropriate actions using the action buttons for each product

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

## 8. Navigation System

### 8.1. Drawer Implementation
```typescript
// Drawer structure with collapsible sections
const drawerItems = [
  {
    title: 'Dashboard',
    path: '/flipkart-amazon-tools/',
    icon: <DashboardIcon />,
    standalone: true
  },
  {
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    items: [
      {
        title: 'Merge Labels',
        path: '/flipkart-amazon-tools/home/',
        icon: <MergeOutlined />
      },
      {
        title: 'Active Orders',
        path: '/flipkart-amazon-tools/activeOrders/',
        icon: <ReceiptIcon />
      }
    ]
  },
  // ... other sections
];

// State management for drawer sections
const [ordersOpen, setOrdersOpen] = useState(false);
const [productsOpen, setProductsOpen] = useState(false);
const [managementOpen, setManagementOpen] = useState(false);

// Route-based section expansion
useEffect(() => {
  const path = location.pathname;
  setOrdersOpen(path.includes('/home/') || path.includes('/activeOrders/'));
  setProductsOpen(path.includes('/products/') || path.includes('/hidden-products/'));
  setManagementOpen(path.includes('/categories/') || path.includes('/inventory/'));
}, [location]);
```

### 8.2. Route Protection
```typescript
// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <CircularProgress />;
  }

  if (!authenticated) {
    return <Navigate to="/flipkart-amazon-tools/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### 8.3. Theme Integration
```typescript
// Theme-aware drawer styling
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  }),
  ...(!open && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
  }),
}));
```

### 8.4. Mobile Responsiveness
```typescript
// Responsive drawer behavior
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const handleDrawerToggle = () => {
  if (isMobile) {
    setOpen(false);
  }
};

// Drawer component with responsive behavior
<StyledDrawer
  variant={isMobile ? 'temporary' : 'permanent'}
  open={open}
  onClose={handleDrawerToggle}
  ModalProps={{
    keepMounted: true, // Better mobile performance
  }}
>
  {/* Drawer content */}
</StyledDrawer>
```

### 8.5. Active Route Highlighting
```typescript
// Active route detection
const isActiveRoute = (path: string) => {
  return location.pathname === path;
};

// Styled list item with active state
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 0),
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
```

### 8.6. Best Practices
1. **Component Organization**:
   - Keep navigation-related components in a dedicated directory
   - Use consistent naming conventions
   - Implement proper TypeScript types

2. **State Management**:
   - Use local state for drawer sections
   - Implement route-based expansion
   - Handle mobile responsiveness

3. **Performance**:
   - Lazy load route components
   - Optimize re-renders with proper hooks
   - Implement proper memoization

4. **Accessibility**:
   - Use proper ARIA labels
   - Implement keyboard navigation
   - Ensure proper focus management

5. **Theme Integration**:
   - Use theme-aware styling
   - Implement proper transitions
   - Maintain consistent spacing

## 9. Performance Optimization Guidelines

### 9.1. React Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Use useCallback for event handlers
- Implement virtualization for long lists

### 9.2. Firebase Performance
- Use proper indexing for queries
- Implement pagination for large datasets
- Use batch operations for bulk updates
- Cache frequently accessed data

### 9.3. Bundle Optimization
- Implement code splitting
- Use dynamic imports for large components
- Optimize third-party dependencies
- Monitor bundle size regularly

## 10. Security Best Practices

### 10.1. Authentication
- Implement proper session management
- Use secure password policies
- Implement rate limiting
- Handle token refresh properly

### 10.2. Data Security
- Validate all user inputs
- Implement proper access control
- Use secure data transmission
- Implement proper error handling

### 10.3. Firebase Security
- Use proper security rules
- Implement role-based access
- Validate data structure
- Handle offline security