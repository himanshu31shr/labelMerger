# Product Requirements Document (PRD)

## Project Name: Label Merger and Analytics Tool

## 1. Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to merge PDF labels and analyze transaction data from both platforms.

## 2. Core Features

### 2.1. Navigation System ✅
- **Responsive Drawer**: Collapsible navigation with theme support
- **Route Protection**: Authentication-based access control
- **Features**:
  - Collapsible sections for better organization
  - Active route highlighting
  - Theme-aware styling
  - Mobile-responsive design
  - Automatic section expansion based on route
  - Route-based title updates

### 2.3. Label Merging ✅
- **Input**: PDF files containing labels for Amazon and Flipkart orders.
- **Output**: A merged PDF containing labels for both platforms.
- **Key Functionalities**:
  - Parse and process uploaded CSV files
  - Transform Amazon and Flipkart-specific data into a unified format
  - Generate a merged PDF with labels for both platforms
  - Support for large file processing
  - Error handling and validation

### 2.4. Product Management ✅
- **Input**: 
  - XLSX files containing product data from Amazon and Flipkart
  - Manual product entries and updates
- **Output**: 
  - Organized product catalog with pricing and details
  - Product data integrated with transaction analysis
  - Separate views for hidden products and pricing updates
- **Key Functionalities**:
  - Import products from platform-specific XLSX files
  - Edit product details (cost price, name, description)
  - Map products to transactions using SKUs
  - Real-time product data updates
  - Product search and filtering
  - Offline support with synchronization
  - Toggle product visibility (hidden/visible)
  - Dedicated interface for managing hidden products
  - Bulk pricing updates with validation
  - Product categorization (create, read, update, delete categories and check if a category is in use)
  - Dedicated Price Management Modal for editing product prices

### 2.5. Inventory Management ✅
- **Input**: 
  - Product data with inventory fields
  - Manual inventory updates
- **Output**: 
  - Comprehensive inventory management interface
  - Dashboard alerts for low stock items
  - Dashboard alerts for hidden products
  - Dashboard alerts for high-priced products
- **Key Functionalities**:
  - Track inventory levels for all products
  - Support for negative inventory (backorders)
  - Real-time inventory updates
  - Low stock threshold configuration
  - Visual indicators for inventory status
  - Quick inventory adjustment options
  - Dashboard widgets for inventory alerts
  - Inventory reduction on order processing
  - Hidden products monitoring
  - Price comparison with competitors

### 2.6. Transaction Analytics ✅
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

### 2.7. Today's Orders ✅
- **Input**:
  - Real-time order data
  - Product catalog with pricing information
- **Output**:
  - Summary of today's orders (Total Orders, Total Revenue, Total Cost, Profit Margin)
  - List of individual orders for the current day
- **Key Features**:
  - Display key metrics for today's sales
  - Provide a detailed list of all orders placed today
  - Integration with product data for cost and revenue calculation

### 2.8. Dashboard ✅
- **Output**:
  - High-level summary of key application metrics
  - Visual representation of order trends
  - Alerts for low inventory, hidden products, and potentially high-priced products
- **Key Features**:
  - Display summary cards for Total Orders, Total Revenue, Recent Orders, and Total Products
  - Visualize daily order history with a line chart
  - Provide quick access to alerts for Low Inventory, Hidden Products, and High-Priced Products

### 2.9. Order Analytics ✅
- **Input**:
  - Filtered order data
  - Product and category data
- **Output**:
  - Filtered view of order metrics, distributions, and top products
  - Visualizations of order data by category and SKU
- **Key Features**:
  - Filter orders by date range, category, SKU, platform, and product
  - Display summary metrics for filtered orders
  - Analyze order distribution by category with a table and chart
  - Identify top-performing products with a dedicated table
  - Visualize order trends by SKU with a chart

## 3. Technical Implementation

### 3.1. Frontend ✅
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **UI Library**: Material-UI (MUI) v6+
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v6 with lazy loading
- **Theming**: Material-UI ThemeProvider with light/dark mode
- **Component Structure**:
  - Modular, reusable components
  - Feature-based organization
  - TypeScript with strict mode
  - Custom hooks for shared functionality
- **Navigation**:
  - Responsive drawer with collapsible sections
  - Route protection and authentication
  - Theme-aware styling
  - Mobile-first design

### 3.2. Service Worker ✅
- **File**: `/public/firebase-messaging-sw.js`
- **Registration**: Automatic on page load
- **Features**:
  - Handles push notifications in background
  - Supports both production and development environments
  - Implements Firebase Cloud Messaging
  - Manages notification display and interaction

### 3.3. Firebase Integration ✅
- **Services Used**:
  - Firebase Cloud Messaging (FCM)
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Storage
  - Firebase Hosting (for application deployment)
  - Cloud Functions for Firebase (for serverless backend logic)
- **Security**:
  - Environment variables for sensitive data
  - Secure token handling
  - CORS and domain restrictions

### 3.4. Performance ✅
- **Optimizations**:
  - Service worker caching strategy
  - Lazy loading of notification components
  - Minimal bundle size impact
  - Efficient token management
- **Framework**: React 18 with TypeScript 4.9+
- **Styling**: Material-UI v5 with custom theming
- **Routing**: React Router v6 with lazy loading
- **Theming**: Material-UI ThemeProvider with light/dark mode support and custom color palettes
- **State Management**: Redux Toolkit with proper slices, actions, and selectors
- **Component Structure**:
  - Modular, reusable components with proper prop typing
  - Feature-based organization with clear separation of concerns
  - Consistent naming conventions following best practices
  - TypeScript for type safety with strict mode enabled
  - Custom hooks for shared functionality
- **Dashboard Widgets**:
  - Low inventory alerts with color-coded status indicators and auto-refresh
  - Hidden products monitoring widget with direct management capabilities
  - High-priced products comparison widget with competitor analysis
  - Order overview charts with trend visualization
  - Performance metrics dashboard with real-time updates

## 4. Security Implementation ✅

### 4.1. Authentication
- Email/password authentication with Remember Me
- Role-based access control (RBAC)
- Protected routes and navigation
- Session management and persistence
- Password reset functionality

### 4.2. Authorization
- Role-based permissions (Admin/User)
- Data access control
- Operation validation
- Security rules enforcement

### 4.3. Data Validation
- Input sanitization
- Type checking
- Schema validation
- Error handling

## 5. Performance Optimization ✅

### 5.1. Target Metrics
- Initial load time: < 1s
- Firebase operation latency: < 100ms
- Batch operation throughput: 1000 items/batch
- Offline sync success rate: 99.9%
- PDF generation time: < 500ms for up to 50 labels
- Component render time: < 80ms for complex data tables

## 6. Future Enhancements 🚀

### 6.1. Technical Improvements (Q3-Q4 2025)
- Enhanced offline capabilities with full IndexedDB integration
- Advanced data visualization with interactive charts
- Performance monitoring and analytics
- Comprehensive automated testing
- Expanded product management features
- Enhanced bulk operations
- Real-time collaboration features
- Optimized build system
- Progressive Web App (PWA) implementation

### 6.2. Feature Enhancements (Q3-Q4 2025)
- Additional e-commerce platform support
- Advanced reporting capabilities
- Bulk operations enhancements
- Enhanced navigation features:
  - Customizable drawer sections
  - User preferences for navigation
  - Advanced search functionality
  - Quick access shortcuts
  - Navigation history tracking

### 6.3. Integration Enhancements (Q1-Q2 2026)
- Direct API integration with e-commerce platforms
- Shipping carrier integration for real-time tracking
- Accounting software integration (QuickBooks, Xero)
- Payment gateway integration for order processing
- Email marketing platform integration for customer communications
- CRM integration for customer management
- Marketplace analytics integration for competitive insights
- Mobile app for inventory management on the go

## 7. Success Metrics

### 7.1. Technical Metrics
- Code coverage > 90%
- Zero critical bugs
- Performance targets met
- Security compliance achieved

### 7.2. User Experience Metrics
- < 1% error rate in file processing
- < 2s response time for operations
- 99.9% uptime
- Positive user feedback
