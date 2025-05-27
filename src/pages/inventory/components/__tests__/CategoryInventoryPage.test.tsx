import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CategoryInventoryPage from '../../CategoryInventoryPage';

// Mock the CategoryInventoryTable component
jest.mock('../CategoryInventoryTable', () => {
  return function MockCategoryInventoryTable() {
    return <div data-testid="category-inventory-table">Category Inventory Table</div>;
  };
});

// Create a simple mock reducer
const mockCategoryInventoryReducer = (state = {
  categories: [],
  lowStockCategories: [],
  operations: [],
  loading: false,
  error: null,
  migrationStatus: 'pending',
  lastUpdated: null,
}, action: { type: string; payload?: Record<string, unknown> }) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      categoryInventory: mockCategoryInventoryReducer,
    },
    preloadedState: {
      categoryInventory: {
        categories: [],
        lowStockCategories: [],
        operations: [],
        loading: false,
        error: null,
        migrationStatus: 'pending',
        lastUpdated: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('CategoryInventoryPage', () => {
  describe('rendering', () => {
    it('should display page title and description', () => {
      // Act
      renderWithProvider(<CategoryInventoryPage />);

      // Assert
      expect(screen.getByText('Category Inventory Management')).toBeInTheDocument();
      expect(screen.getByText('Manage inventory levels by category with real-time tracking and alerts')).toBeInTheDocument();
    });

    it('should render CategoryInventoryTable component', () => {
      // Act
      renderWithProvider(<CategoryInventoryPage />);

      // Assert
      expect(screen.getByTestId('category-inventory-table')).toBeInTheDocument();
    });

    it('should display refresh floating action button', () => {
      // Act
      renderWithProvider(<CategoryInventoryPage />);

      // Assert
      expect(screen.getByLabelText('refresh')).toBeInTheDocument();
    });
  });

  describe('migration status', () => {
    it('should not show migration alert when status is completed', () => {
      // Arrange
      const store = createMockStore({ migrationStatus: 'completed' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.queryByText(/migration/i)).not.toBeInTheDocument();
    });

    it('should show migration alert when status is pending', () => {
      // Arrange
      const store = createMockStore({ migrationStatus: 'pending' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.getByText('Migration Status: Pending')).toBeInTheDocument();
    });

    it('should show migration alert when status is in-progress', () => {
      // Arrange
      const store = createMockStore({ migrationStatus: 'in-progress' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.getByText('Migration Status: In-progress')).toBeInTheDocument();
    });

    it('should show error migration alert when status is failed', () => {
      // Arrange
      const store = createMockStore({ migrationStatus: 'failed' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.getByText(/migration failed/i)).toBeInTheDocument();
    });

    it('should show migration alert when status is rolled-back', () => {
      // Arrange
      const store = createMockStore({ migrationStatus: 'rolled-back' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.getByText(/migration was rolled back/i)).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should display error alert when there is an error', () => {
      // Arrange
      const store = createMockStore({ error: 'Failed to load data' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });

    it('should not display error alert when there is no error', () => {
      // Arrange
      const store = createMockStore({ error: null, migrationStatus: 'completed' });

      // Act
      renderWithProvider(<CategoryInventoryPage />, store);

      // Assert
      expect(screen.queryByText(/Migration Status:/)).not.toBeInTheDocument();
    });
  });
}); 