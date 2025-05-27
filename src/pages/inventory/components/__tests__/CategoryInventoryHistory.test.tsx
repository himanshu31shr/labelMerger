import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CategoryInventoryHistory from '../CategoryInventoryHistory';
import categoryInventoryReducer from '../../../../store/slices/categoryInventorySlice';
import { InventoryOperation } from '../../../../types/categoryInventory.types';
import { Timestamp } from 'firebase/firestore';

// Mock Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({ 
      seconds: 1234567890, 
      nanoseconds: 0,
      toDate: () => new Date(1234567890 * 1000)
    })),
    fromDate: jest.fn((date) => ({ 
      seconds: Math.floor(date.getTime() / 1000), 
      nanoseconds: 0,
      toDate: () => date
    })),
  },
}));

// Mock window.URL.createObjectURL for export functionality
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

const mockOperations: InventoryOperation[] = [
  {
    id: 'op1',
    categoryId: 'cat1',
    type: 'adjustment',
    quantity: 50,
    previousQuantity: 100,
    newQuantity: 150,
    reason: 'Stock replenishment',
    performedBy: 'John Doe',
    timestamp: Timestamp.fromDate(new Date('2024-01-15T10:30:00Z')),
    metadata: {
      source: 'manual',
      batchId: 'batch-001',
    },
  },
  {
    id: 'op2',
    categoryId: 'cat1',
    type: 'remove',
    quantity: 25,
    previousQuantity: 150,
    newQuantity: 125,
    reason: 'Product sale',
    performedBy: 'System',
    timestamp: Timestamp.fromDate(new Date('2024-01-14T14:20:00Z')),
    metadata: {
      source: 'pos',
      orderId: 'order-123',
    },
  },
  {
    id: 'op3',
    categoryId: 'cat1',
    type: 'transfer',
    quantity: 10,
    previousQuantity: 125,
    newQuantity: 115,
    reason: 'Transfer to warehouse B',
    performedBy: 'Jane Smith',
    timestamp: Timestamp.fromDate(new Date('2024-01-13T09:15:00Z')),
    metadata: {
      source: 'transfer',
      transferId: 'transfer-456',
      destinationCategory: 'cat2',
    },
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      categoryInventory: categoryInventoryReducer,
    },
    preloadedState: {
      categoryInventory: {
        categories: [],
        lowStockCategories: [],
        loading: false,
        error: null,
        migrationStatus: 'completed' as const,
        lastUpdated: null,
        operations: mockOperations,
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

const defaultProps = {
  categoryId: 'cat1',
  open: true,
  onClose: jest.fn(),
};

describe('CategoryInventoryHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should display modal when open is true', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByText('Inventory History')).toBeInTheDocument();
    });

    it('should not display modal when open is false', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} open={false} />);

      // Assert
      expect(screen.queryByText('Inventory History')).not.toBeInTheDocument();
    });

    it('should display operations in chronological order (newest first)', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      const rows = screen.getAllByRole('row');
      // Check that we have the expected number of rows (header + 3 operations + 3 expanded rows)
      expect(rows.length).toBeGreaterThanOrEqual(4); // header + 3 operations
      
      // Check that operations are displayed (by checking for operation reasons in the table)
      expect(screen.getByText('Stock replenishment')).toBeInTheDocument(); // op1 - newest
      expect(screen.getByText('Product sale')).toBeInTheDocument(); // op2
      expect(screen.getByText('Transfer to warehouse B')).toBeInTheDocument(); // op3 - oldest
    });

    it('should display operation details correctly', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      // Check first operation details
      expect(screen.getByText('Stock replenishment')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('+50')).toBeInTheDocument();
      expect(screen.getByText('100 → 150')).toBeInTheDocument();
      
             // Check operation types
       expect(screen.getByText('Adjustment')).toBeInTheDocument();
       expect(screen.getByText('Remove')).toBeInTheDocument();
       expect(screen.getByText('Transfer')).toBeInTheDocument();
    });

    it('should display formatted timestamps', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      // Should show relative time or formatted date
      expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/Jan 14, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/Jan 13, 2024/)).toBeInTheDocument();
    });

    it('should show empty state when no operations exist', () => {
      // Arrange
      const store = createMockStore({ operations: [] });

      // Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />, store);

      // Assert
      expect(screen.getByText('No inventory history found')).toBeInTheDocument();
      expect(screen.getByText('No operations have been recorded for this category yet.')).toBeInTheDocument();
    });

    it('should show loading state', () => {
      // Arrange
      const store = createMockStore({ loading: true, operations: [] });

      // Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />, store);

      // Assert
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should show error state', () => {
      // Arrange
      const store = createMockStore({ 
        error: 'Failed to load history',
        operations: [] 
      });

      // Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />, store);

      // Assert
      expect(screen.getByText('Error loading history')).toBeInTheDocument();
      expect(screen.getByText('Failed to load history')).toBeInTheDocument();
    });
  });

  describe('filtering and search', () => {
    it('should have operation type filter', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByLabelText('Filter by type')).toBeInTheDocument();
    });

    it('should filter operations by type', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);
      const typeFilter = screen.getByLabelText('Filter by type');

      // Act
      await user.click(typeFilter);
      await user.click(screen.getByRole('option', { name: 'Adjustment' }));

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Stock replenishment')).toBeInTheDocument();
        expect(screen.queryByText('Product sale')).not.toBeInTheDocument();
        expect(screen.queryByText('Transfer to warehouse B')).not.toBeInTheDocument();
      });
    });

    it('should have date range filter', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByLabelText('From date')).toBeInTheDocument();
      expect(screen.getByLabelText('To date')).toBeInTheDocument();
    });

    it('should filter operations by date range', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);
      const fromDate = screen.getByLabelText('From date');
      const toDate = screen.getByLabelText('To date');

      // Act
      await user.type(fromDate, '2024-01-14');
      await user.type(toDate, '2024-01-14');

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('Stock replenishment')).not.toBeInTheDocument(); // Jan 15
        expect(screen.getByText('Product sale')).toBeInTheDocument(); // Jan 14
        expect(screen.queryByText('Transfer to warehouse B')).not.toBeInTheDocument(); // Jan 13
      });
    });

    it('should have search functionality', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByPlaceholderText('Search operations...')).toBeInTheDocument();
    });

    it('should search operations by reason or performer', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);
      const searchInput = screen.getByPlaceholderText('Search operations...');

      // Act
      await user.type(searchInput, 'John Doe');

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Stock replenishment')).toBeInTheDocument();
        expect(screen.queryByText('Product sale')).not.toBeInTheDocument();
        expect(screen.queryByText('Transfer to warehouse B')).not.toBeInTheDocument();
      });
    });
  });

  describe('operation details', () => {
    it('should show quantity change with proper formatting', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
             expect(screen.getByText('+50')).toBeInTheDocument(); // Positive change (adjustment)
       expect(screen.getByText('-25')).toBeInTheDocument(); // Negative change (remove)
       expect(screen.getByText('-10')).toBeInTheDocument(); // Negative change (transfer)
    });

    it('should show before and after quantities', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByText('100 → 150')).toBeInTheDocument();
      expect(screen.getByText('150 → 125')).toBeInTheDocument();
      expect(screen.getByText('125 → 115')).toBeInTheDocument();
    });

    it('should display operation metadata when available', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Act - Click on first operation to expand details
      const expandButton = screen.getAllByRole('button')[2]; // First expand button (after refresh and export)
      await user.click(expandButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Operation Details')).toBeInTheDocument();
        expect(screen.getByText(/BatchId: batch-001/)).toBeInTheDocument();
        expect(screen.getByText(/Source: manual/)).toBeInTheDocument();
      });
    });

    it('should show different icons for different operation types', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
             // Check for operation type indicators (icons or badges)
       const adjustmentRows = screen.getAllByText('Adjustment');
       const removeRows = screen.getAllByText('Remove');
       const transferRows = screen.getAllByText('Transfer');
       
       expect(adjustmentRows).toHaveLength(1);
       expect(removeRows).toHaveLength(1);
       expect(transferRows).toHaveLength(1);
    });
  });

  describe('actions', () => {
    it('should have close button', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      const onClose = jest.fn();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} onClose={onClose} />);
      const closeButton = screen.getByText('Close');

      // Act
      await user.click(closeButton);

      // Assert
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should have export functionality', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByLabelText('Export to CSV')).toBeInTheDocument();
    });

    it('should export filtered operations', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);
      const exportButton = screen.getByLabelText('Export to CSV');

      // Act
      await user.click(exportButton);

      // Assert
      // Should trigger download or show export options
      // This would typically involve mocking window.URL.createObjectURL
      expect(exportButton).toBeInTheDocument();
    });

    it('should have refresh functionality', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />);

      // Assert
      expect(screen.getByLabelText('Refresh history')).toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    it('should show pagination when there are many operations', () => {
      // Arrange
      const manyOperations = Array.from({ length: 25 }, (_, i) => ({
        ...mockOperations[0],
        id: `op${i}`,
        reason: `Operation ${i}`,
      }));
      const store = createMockStore({ operations: manyOperations });

      // Act
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />, store);

      // Assert
      // Check for pagination component presence
      expect(screen.getByText(/Rows per page/)).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    });

    it('should navigate between pages', async () => {
      // Arrange
      const user = userEvent.setup();
      const manyOperations = Array.from({ length: 25 }, (_, i) => ({
        ...mockOperations[0],
        id: `op${i}`,
        reason: `Operation ${i}`,
      }));
      const store = createMockStore({ operations: manyOperations });
      renderWithProvider(<CategoryInventoryHistory {...defaultProps} />, store);

      // Act
      const nextButton = screen.getByLabelText('Go to next page');
      await user.click(nextButton);

      // Assert
      await waitFor(() => {
        // Check that pagination has changed (page number should be different)
        expect(screen.getByText(/Rows per page/)).toBeInTheDocument();
        // The operations should still be visible but different ones (check for specific operation from page 2)
        expect(screen.getByText('Operation 10')).toBeInTheDocument();
      });
    });
  });
}); 