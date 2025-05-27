import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CategoryInventoryEditModal from '../CategoryInventoryEditModal';
import categoryInventoryReducer from '../../../../store/slices/categoryInventorySlice';
import { CategoryWithInventory } from '../../../../types/categoryInventory.types';
import { Timestamp } from 'firebase/firestore';

// Mock Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
  },
}));

const mockCategory: CategoryWithInventory = {
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
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      categoryInventory: categoryInventoryReducer,
    },
    preloadedState: {
      categoryInventory: {
        categories: [mockCategory],
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

const defaultProps = {
  open: true,
  category: mockCategory,
  onClose: jest.fn(),
  onSave: jest.fn(),
};

describe('CategoryInventoryEditModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should display modal when open is true', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);

      // Assert
      expect(screen.getByText('Edit Category Inventory')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });

    it('should not display modal when open is false', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} open={false} />);

      // Assert
      expect(screen.queryByText('Edit Category Inventory')).not.toBeInTheDocument();
    });

    it('should display category information', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);

      // Assert
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Electronic products')).toBeInTheDocument();
      expect(screen.getByText('Current Quantity: 100')).toBeInTheDocument(); // Current quantity in chip
      expect(screen.getByDisplayValue('10')).toBeInTheDocument(); // Low stock threshold in input
    });

    it('should display form fields with current values', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);

      // Assert
      expect(screen.getByLabelText('Quantity Adjustment')).toBeInTheDocument();
      expect(screen.getByLabelText('Low Stock Threshold')).toBeInTheDocument();
      expect(screen.getByLabelText('Reason for Change')).toBeInTheDocument();
      expect(screen.getByLabelText('Performed By')).toBeInTheDocument();
    });

    it('should display action buttons', () => {
      // Arrange & Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);

      // Assert
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('should allow entering quantity adjustment', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '25');

      // Assert
      expect(quantityInput).toHaveValue('25');
    });

    it('should allow entering low stock threshold', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const thresholdInput = screen.getByLabelText('Low Stock Threshold');

      // Act
      await user.clear(thresholdInput);
      await user.type(thresholdInput, '15');

      // Assert
      expect(thresholdInput).toHaveValue('15');
    });

    it('should allow entering reason for change', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const reasonInput = screen.getByLabelText('Reason for Change');

      // Act
      await user.type(reasonInput, 'Stock adjustment after audit');

      // Assert
      expect(reasonInput).toHaveValue('Stock adjustment after audit');
    });

    it('should allow entering performed by', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const performedByInput = screen.getByLabelText('Performed By');

      // Act
      await user.type(performedByInput, 'John Doe');

      // Assert
      expect(performedByInput).toHaveValue('John Doe');
    });

    it('should show calculated new quantity', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '25');

      // Assert
      await waitFor(() => {
        expect(screen.getByText('New Quantity: 125')).toBeInTheDocument();
      });
    });

    it('should handle negative adjustments', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '-20');

      // Assert
      await waitFor(() => {
        expect(screen.getByText('New Quantity: 80')).toBeInTheDocument();
      });
    });
  });

  describe('form validation', () => {
    it('should show error for invalid quantity adjustment', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');
      const saveButton = screen.getByText('Save Changes');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, 'invalid');
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid number')).toBeInTheDocument();
      });
    });

    it('should show error for negative resulting quantity', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');
      const saveButton = screen.getByText('Save Changes');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '-150'); // Would result in -50
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Resulting quantity cannot be negative')).toBeInTheDocument();
      });
    });

    it('should show error for invalid low stock threshold', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const thresholdInput = screen.getByLabelText('Low Stock Threshold');
      const saveButton = screen.getByText('Save Changes');

      // Act
      await user.clear(thresholdInput);
      await user.type(thresholdInput, '-5');
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Low stock threshold must be 0 or greater')).toBeInTheDocument();
      });
    });

    it('should require reason for change', async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />);
      const quantityInput = screen.getByLabelText('Quantity Adjustment');
      const saveButton = screen.getByText('Save Changes');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '10');
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Reason for change is required')).toBeInTheDocument();
      });
    });
  });

  describe('actions', () => {
    it('should call onClose when cancel button is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      const onClose = jest.fn();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} onClose={onClose} />);
      const cancelButton = screen.getByText('Cancel');

      // Act
      await user.click(cancelButton);

      // Assert
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      const onClose = jest.fn();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} onClose={onClose} />);
      const backdrop = document.querySelector('.MuiBackdrop-root');

      // Act
      if (backdrop) {
        await user.click(backdrop);
      }

      // Assert
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onSave with correct data when form is valid', async () => {
      // Arrange
      const user = userEvent.setup();
      const onSave = jest.fn();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} onSave={onSave} />);
      
      const quantityInput = screen.getByLabelText('Quantity Adjustment');
      const thresholdInput = screen.getByLabelText('Low Stock Threshold');
      const reasonInput = screen.getByLabelText('Reason for Change');
      const performedByInput = screen.getByLabelText('Performed By');
      const saveButton = screen.getByText('Save Changes');

      // Act
      await user.clear(quantityInput);
      await user.type(quantityInput, '25');
      await user.clear(thresholdInput);
      await user.type(thresholdInput, '15');
      await user.type(reasonInput, 'Stock adjustment');
      await user.type(performedByInput, 'John Doe');
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith({
          categoryId: 'cat1',
          quantityAdjustment: 25,
          newLowStockThreshold: 15,
          reason: 'Stock adjustment',
          performedBy: 'John Doe',
        });
      });
    });

    it('should not call onSave when form is invalid', async () => {
      // Arrange
      const user = userEvent.setup();
      const onSave = jest.fn();
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} onSave={onSave} />);
      
      const quantityInput = screen.getByLabelText('Quantity Adjustment');
      const saveButton = screen.getByText('Save Changes');

      // Act - Enter invalid text that will result in NaN
      await user.clear(quantityInput);
      await user.type(quantityInput, 'abc');
      await user.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(onSave).not.toHaveBeenCalled();
      });
    });
  });

  describe('loading state', () => {
    it('should show loading state when saving', () => {
      // Arrange
      const store = createMockStore({ loading: true });

      // Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />, store);

      // Assert
      expect(screen.getByText('Saving...')).toBeInTheDocument();
      expect(screen.getByText('Saving...')).toBeDisabled();
    });

    it('should disable form inputs when loading', () => {
      // Arrange
      const store = createMockStore({ loading: true });

      // Act
      renderWithProvider(<CategoryInventoryEditModal {...defaultProps} />, store);

      // Assert
      expect(screen.getByLabelText('Quantity Adjustment')).toBeDisabled();
      expect(screen.getByLabelText('Low Stock Threshold')).toBeDisabled();
      expect(screen.getByLabelText('Reason for Change')).toBeDisabled();
      expect(screen.getByLabelText('Performed By')).toBeDisabled();
    });
  });
}); 