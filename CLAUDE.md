# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is a Label Merger and Analytics Tool designed to process, merge, and analyze transaction data from e-commerce platforms (Amazon and Flipkart). The application provides secure authentication, role-based access control, and features for merging PDF labels and analyzing financial data.

## Common Commands

### Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run predeploy
npm run deploy
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run a specific test file
npm test -- path/to/test/file.test.tsx

# Test with coverage report
npm run test -- --coverage
```

### Linting and Type Checking

```bash
# Run ESLint
npm run lint

# Run TypeScript type checking
npm run type-check 

# Run both type checking and linting
npm run lint-full
```

## Architecture

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI v5
- **Build Tool**: Vite
- **Authentication**: Firebase Auth
- **Data Storage**: Firebase Firestore
- **PDF Processing**: pdf-lib
- **Data Parsing**: papaparse, xlsx
- **Testing**: Jest with React Testing Library
- **State Management**: Redux Toolkit with Redux Persist

### Core Architecture Components

1. **Firebase Services**
   - Base `FirebaseService` class for all Firebase operations
   - Authentication managed through `AuthService`
   - Offline persistence enabled for better UX
   - Batch operations for large datasets
   - Error handling with retries

2. **Factory Pattern for Data Processing**
   - `ReportExtractionFactory` to process different report formats
   - Platform-specific implementations (Amazon, Flipkart)
   - Common interface for all extractors

3. **Redux Store Structure**
   - Slices for auth, products, orders, transactions, and PDF merging
   - Redux Persist for offline data caching
   - Optimistic updates for real-time UI feedback
   - Custom caching logic to reduce API calls

4. **Protected Routes**
   - Role-based access control
   - Authentication state management
   - Redirect handling

5. **PDF Processing Pipeline**
   - File upload handling
   - Data extraction and transformation
   - PDF generation with pdf-lib
   - Preview and download functionality

## Firebase Integration

When working with Firebase in this codebase:

1. Always extend `FirebaseService` for new Firebase-related functionality
2. Handle offline/online state correctly
3. Use batch operations for large data sets
4. Always clean up listeners in useEffect cleanup functions
5. For testing, use the mock implementations in `/tests/__mocks__/firebase/`

Example Firebase operation pattern:

```typescript
// For Firestore listeners
useEffect(() => {
  const unsubscribe = serviceInstance.subscribeToData(
    (data) => {
      // Handle data updates
    }
  );
  return () => unsubscribe();
}, [dependencies]);

// For batch operations
async function processBatchedData(items) {
  const batchSize = 500;
  const batches = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  
  for (const batch of batches) {
    await serviceInstance.batchOperation(batch, 'collectionName', 'create', getItemId);
  }
}
```

## Testing Approach

1. Mock Firebase using Jest mock system
2. Use React Testing Library for component testing
3. Properly handle authentication in tests
4. Test both success and error paths
5. Mock data transformations for PDF and Excel processing

Key testing patterns:

```typescript
// Component with Firebase dependency
test('component with Firebase dependency', async () => {
  // Setup mocks
  jest.spyOn(serviceInstance, 'methodName').mockResolvedValueOnce(mockData);
  
  // Render with required providers
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ComponentToTest />
      </BrowserRouter>
    </Provider>
  );
  
  // Assert UI state or interactions
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

## Code Organization Patterns

1. **Component Structure**
   - Functional components with hooks
   - Shared UI components in `/src/components`
   - Page-specific components in `/src/pages/{feature}/components`

2. **Service Structure**
   - Base services in `/src/services`
   - Feature-specific services in `/src/pages/{feature}/services`
   - Factory pattern for data processing

3. **State Management**
   - Redux for global state
   - Local component state with useState
   - Context API for theme and authentication state

## Performance Guidelines

1. Implement React.memo for expensive components
2. Use proper dependency arrays in useEffect
3. Optimize Firebase queries with proper indexing
4. Cache frequently accessed data
5. Use batch operations for bulk updates
6. Monitor bundle size with code splitting