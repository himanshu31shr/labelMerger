import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CategoryInventoryTable from '../CategoryInventoryTable';
import categoryInventoryReducer from '../../../../store/slices/categoryInventorySlice';
import { CategoryWithInventory } from '../../../../types/categoryInventory.types';
import { Timestamp } from 'firebase/firestore';

// Mock Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
  },
}));

const mockCategories: CategoryWithInventory[] = [
  {
    id: 'cat1',
    name: 'Electronics',
    description: 'Electronic products',
    tag: 'electronics',
    inventory: {
      totalQuantity: 100,
      lowStockThreshold: 10,
      lastUpdated: Timestamp.now(),
      productCount: 5,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'cat2',
    name: 'Books',
    description: 'Book products',
    tag: 'books',
    inventory: {
      totalQuantity: 5,
      lowStockThreshold: 10,
      lastUpdated: Timestamp.now(),
      productCount: 3,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'cat3',
    name: 'Clothing',
    description: 'Clothing products',
    tag: 'clothing',
    inventory: {
      totalQuantity: 0,
      lowStockThreshold: 5,
      lastUpdated: Timestamp.now(),
      productCount: 2,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      categoryInventory: categoryInventoryReducer,
    },
    preloadedState: {
      categoryInventory: {
        categories: mockCategories,
        lowStockCategories: [],
        loading: false,
        error: null,
        migrationStatus: 'completed' as const,
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

describe('CategoryInventoryTable', () => {
  describe('rendering', () => {
    it('should display category inventory data in table format', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Books')).toBeInTheDocument();
      expect(screen.getByText('Clothing')).toBeInTheDocument();
      
      // Check inventory quantities - be more specific to avoid multiple matches
      const electronicsRow = screen.getByText('Electronics').closest('tr');
      const booksRow = screen.getByText('Books').closest('tr');
      const clothingRow = screen.getByText('Clothing').closest('tr');
      
      expect(electronicsRow).toHaveTextContent('100');
      expect(booksRow).toHaveTextContent('5');
      expect(clothingRow).toHaveTextContent('0');
    });

    it('should display table headers correctly', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Total Quantity')).toBeInTheDocument();
      expect(screen.getByText('Low Stock Threshold')).toBeInTheDocument();
      expect(screen.getByText('Product Count')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('should show loading state when data is being fetched', () => {
      // Arrange
      const store = createMockStore({ loading: true, categories: [] });

      // Act
      renderWithProvider(<CategoryInventoryTable />, store);

      // Assert
      expect(screen.getByText('Loading inventory data...')).toBeInTheDocument();
    });

    it('should show error message when there is an error', () => {
      // Arrange
      const store = createMockStore({ 
        loading: false, 
        categories: [], 
        error: 'Failed to fetch categories' 
      });

      // Act
      renderWithProvider(<CategoryInventoryTable />, store);

      // Assert
      expect(screen.getByText('Error: Failed to fetch categories')).toBeInTheDocument();
    });

    it('should show empty state when no categories exist', () => {
      // Arrange
      const store = createMockStore({ categories: [] });

      // Act
      renderWithProvider(<CategoryInventoryTable />, store);

      // Assert
      expect(screen.getByText('No categories found')).toBeInTheDocument();
    });
  });

  describe('status indicators', () => {
    it('should show "In Stock" status for categories with sufficient inventory', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      // Electronics has 100 quantity with 10 threshold, should be "In Stock"
      const electronicsRow = screen.getByText('Electronics').closest('tr');
      expect(electronicsRow).toHaveTextContent('In Stock');
    });

    it('should show "Low Stock" status for categories below threshold', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      // Books has 5 quantity with 10 threshold, should be "Low Stock"
      const booksRow = screen.getByText('Books').closest('tr');
      expect(booksRow).toHaveTextContent('Low Stock');
    });

    it('should show "Out of Stock" status for categories with zero inventory', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      // Clothing has 0 quantity, should be "Out of Stock"
      const clothingRow = screen.getByText('Clothing').closest('tr');
      expect(clothingRow).toHaveTextContent('Out of Stock');
    });
  });

  describe('actions', () => {
    it('should have edit button for each category', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      const editButtons = screen.getAllByText('Edit');
      expect(editButtons).toHaveLength(3); // One for each category
    });

    it('should open edit modal when edit button is clicked', async () => {
      // Arrange
      renderWithProvider(<CategoryInventoryTable />);
      const editButton = screen.getAllByText('Edit')[0];

      // Act
      fireEvent.click(editButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Edit Category Inventory')).toBeInTheDocument();
      });
    });

    it('should have view history button for each category', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      const historyButtons = screen.getAllByText('History');
      expect(historyButtons).toHaveLength(3); // One for each category
    });
  });

  describe('sorting and filtering', () => {
    it('should allow sorting by category name', async () => {
      // Arrange
      renderWithProvider(<CategoryInventoryTable />);
      const nameHeader = screen.getByText('Category');

      // Act
      fireEvent.click(nameHeader);

      // Assert
      await waitFor(() => {
        const tableBody = screen.getByRole('table').querySelector('tbody');
        const firstRowCategoryName = tableBody?.querySelector('tr:first-child td:first-child')?.textContent;
        // After clicking once (desc order), "Electronics" should be first
        expect(firstRowCategoryName).toContain('Electronics');
      });
    });

    it('should allow sorting by quantity', async () => {
      // Arrange
      renderWithProvider(<CategoryInventoryTable />);
      const quantityHeader = screen.getByText('Total Quantity');

      // Act
      fireEvent.click(quantityHeader);

      // Assert
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        // Should sort by quantity ascending (0, 5, 100)
        expect(rows[1]).toHaveTextContent('Clothing'); // 0 quantity
      });
    });

    it('should allow filtering by stock status', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryTable />);
      const statusFilter = screen.getByLabelText('Filter by status');

      // Act
      await user.click(statusFilter);
      await user.click(screen.getByRole('option', { name: 'Low Stock' }));

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Books')).toBeInTheDocument();
        expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
        expect(screen.queryByText('Clothing')).not.toBeInTheDocument();
      });
    });
  });

  describe('refresh functionality', () => {
    it('should have refresh button', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryTable />);

      // Assert
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    it('should dispatch fetch action when refresh button is clicked', () => {
      // Arrange
      const store = createMockStore();
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      renderWithProvider(<CategoryInventoryTable />, store);
      const refreshButton = screen.getByText('Refresh');

      // Act
      fireEvent.click(refreshButton);

      // Assert
      expect(dispatchSpy).toHaveBeenCalled();
      const dispatchedAction = dispatchSpy.mock.calls[0][0];
      expect(typeof dispatchedAction).toBe('function'); // It's a thunk
    });
  });
}); 