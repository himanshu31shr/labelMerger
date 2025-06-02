# Sacred Sutra Tools

A comprehensive business management application for e-commerce operations built with React, TypeScript, and Material-UI.

## Features

### Multi-Category Selection and Product Management
- **Category Management**: Advanced multi-select functionality with inline tag application
- **Product Organization**: Comprehensive product categorization with automatic inventory tracking
- **Bulk Operations**: Select multiple categories and apply tags efficiently
- **Product Search**: Category-specific product viewing with advanced search and filtering

### Active Orders Management  
- **Real-time Order Tracking**: View today's orders with complete product information
- **Category Display**: Properly resolved category names for all order items
- **Action Buttons**: Direct links to marketplace listings (Amazon & Flipkart) when available
- **Inventory Integration**: Automatic inventory updates when orders are processed
- **Analytics Dashboard**: Revenue, cost, and profit margin calculations

### Inventory Management
- **Real-time Tracking**: Live inventory levels with low stock alerts  
- **Category-based Views**: Inventory organized by product categories
- **Automatic Updates**: Inventory adjustments on order fulfillment
- **Historical Data**: Track inventory changes over time

### Analytics and Reporting
- **Order Analytics**: Comprehensive order tracking and analysis
- **Transaction Analytics**: Financial reporting and profit analysis  
- **Dashboard Overview**: Key metrics and performance indicators
- **Export Capabilities**: Data export for external analysis

## Recent Updates

### Active Orders Page Fixes (Latest)
- ✅ **Fixed Category Display**: Categories now properly resolve from categoryId to category names
- ✅ **Enhanced Action Buttons**: Buttons only appear when marketplace serial numbers are available
- ✅ **Improved Data Validation**: Better handling of missing or empty product metadata
- ✅ **Comprehensive Testing**: 40+ tests covering SummaryTable and ActionButtons functionality
- ✅ **Bug Fixes**: Corrected data-testid issues and improved accessibility

### Multi-Category Selection Feature
- ✅ **DataTable Enhancement**: Added checkbox-based multi-selection functionality
- ✅ **Category Management**: Integrated CategoryInventoryService for product counts
- ✅ **Product Sidesheet**: View category-specific products with search and pagination
- ✅ **Redux Integration**: Full state management for category products
- ✅ **Comprehensive Testing**: 41+ tests covering all feature functionality

## Technology Stack

- **Frontend**: React 18, TypeScript, Material-UI v5
- **State Management**: Redux Toolkit with RTK Query
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Testing**: Jest, React Testing Library
- **Build Tools**: Vite, ESLint, Prettier
- **PWA**: Service Worker, Offline Support

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sacred-sutra-tools

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env.local
# Edit .env.local with your Firebase configuration

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Environment Configuration

Create a `.env.local` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm test -- --testPathPattern="SummaryTable"
npm test -- --testPathPattern="ActionButtons"
```

### Test Coverage
- **40+ Component Tests**: Comprehensive UI component testing
- **Integration Tests**: Full feature workflow testing  
- **Accessibility Tests**: WCAG compliance verification
- **Edge Case Testing**: Robust error handling validation

## Architecture

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── DataTable/      # Enhanced table with multi-select
│   └── ...
├── pages/              # Application pages
│   ├── categories/     # Category management
│   ├── todaysOrders/   # Active orders page  
│   └── ...
├── services/           # Business logic and API services
├── shared/             # Shared utilities and components
├── store/              # Redux store and slices
└── types/              # TypeScript type definitions
```

### Key Services
- **TodaysOrder Service**: Order management and category resolution
- **Product Service**: Product CRUD operations with filtering
- **Category Service**: Category management and organization
- **CategoryInventory Service**: Category-based inventory tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests for new features
- Use Material-UI components consistently
- Maintain proper documentation

## License

This project is proprietary software for Sacred Sutra business operations.

## Support

For support and questions, please contact the development team.
