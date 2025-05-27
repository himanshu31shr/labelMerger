import { configureStore } from '@reduxjs/toolkit';
import categoryInventoryReducer, {
  fetchCategoriesWithInventory,
  updateCategoryInventory,
  fetchLowStockCategories,
  CategoryInventoryState,
} from '../categoryInventorySlice';
import { CategoryWithInventory, LowStockAlert } from '../../../types/categoryInventory.types';
import { Timestamp } from 'firebase/firestore';

// Mock Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
  },
}));

// Mock the category inventory service
jest.mock('../../../services/categoryInventory.service', () => ({
  categoryInventoryService: {
    getAllCategoriesWithInventory: jest.fn(),
    updateCategoryInventory: jest.fn(),
    getLowStockCategories: jest.fn(),
  },
}));

const mockCategoryWithInventory: CategoryWithInventory = {
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

const mockLowStockAlert: LowStockAlert = {
  categoryId: 'cat2',
  categoryName: 'Books',
  currentQuantity: 5,
  lowStockThreshold: 10,
  severity: 'low',
  productCount: 3,
};

describe('categoryInventorySlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categoryInventory: categoryInventoryReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      // Arrange & Act
      const state = store.getState().categoryInventory;

      // Assert
      expect(state).toEqual({
        categories: [],
        lowStockCategories: [],
        operations: [],
        loading: false,
        error: null,
        migrationStatus: 'pending',
        lastUpdated: null,
      });
    });
  });

  describe('fetchCategoriesWithInventory', () => {
    it('should set loading to true when pending', () => {
      // Arrange
      const action = { type: fetchCategoriesWithInventory.pending.type };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update categories when fulfilled', () => {
      // Arrange
      const categories = [mockCategoryWithInventory];
      const action = {
        type: fetchCategoriesWithInventory.fulfilled.type,
        payload: categories,
      };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.categories).toEqual(categories);
      expect(state.error).toBe(null);
    });

    it('should set error when rejected', () => {
      // Arrange
      const errorMessage = 'Failed to fetch categories';
      const action = {
        type: fetchCategoriesWithInventory.rejected.type,
        error: { message: errorMessage },
      };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.categories).toEqual([]);
    });
  });

  describe('updateCategoryInventory', () => {
    it('should set loading to true when pending', () => {
      // Arrange
      const action = { type: updateCategoryInventory.pending.type };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update specific category inventory when fulfilled', () => {
      // Arrange
      const initialState: CategoryInventoryState = {
        categories: [mockCategoryWithInventory],
        lowStockCategories: [],
        operations: [],
        loading: false,
        error: null,
        migrationStatus: 'pending',
        lastUpdated: null,
      };

      const updatedCategory = {
        ...mockCategoryWithInventory,
        inventory: {
          ...mockCategoryWithInventory.inventory,
          totalQuantity: 95,
        },
      };

      const action = {
        type: updateCategoryInventory.fulfilled.type,
        payload: updatedCategory,
      };

      // Act
      const state = categoryInventoryReducer(initialState, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.categories[0].inventory.totalQuantity).toBe(95);
      expect(state.error).toBe(null);
    });

    it('should set error when rejected', () => {
      // Arrange
      const errorMessage = 'Failed to update inventory';
      const action = {
        type: updateCategoryInventory.rejected.type,
        error: { message: errorMessage },
      };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchLowStockCategories', () => {
    it('should set loading to true when pending', () => {
      // Arrange
      const action = { type: fetchLowStockCategories.pending.type };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update low stock categories when fulfilled', () => {
      // Arrange
      const lowStockCategories = [mockLowStockAlert];
      const action = {
        type: fetchLowStockCategories.fulfilled.type,
        payload: lowStockCategories,
      };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.lowStockCategories).toEqual(lowStockCategories);
      expect(state.error).toBe(null);
    });

    it('should set error when rejected', () => {
      // Arrange
      const errorMessage = 'Failed to fetch low stock categories';
      const action = {
        type: fetchLowStockCategories.rejected.type,
        error: { message: errorMessage },
      };

      // Act
      const state = categoryInventoryReducer(undefined, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.lowStockCategories).toEqual([]);
    });
  });

  describe('migration status', () => {
    it('should update migration status', () => {
      // Arrange
      const initialState: CategoryInventoryState = {
        categories: [],
        lowStockCategories: [],
        operations: [],
        loading: false,
        error: null,
        migrationStatus: 'pending',
        lastUpdated: null,
      };

      // This test will fail because we haven't implemented the action yet
      // We need a setMigrationStatus action
      const action = {
        type: 'categoryInventory/setMigrationStatus',
        payload: 'in-progress' as const,
      };

      // Act
      const state = categoryInventoryReducer(initialState, action);

      // Assert
      expect(state.migrationStatus).toBe('in-progress');
    });
  });
}); 