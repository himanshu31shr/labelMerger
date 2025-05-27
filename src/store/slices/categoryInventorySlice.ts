import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { CategoryWithInventory, LowStockAlert, InventoryOperation } from '../../types/categoryInventory.types';
import { categoryInventoryService } from '../../services/categoryInventory.service';

export interface CategoryInventoryState {
  categories: CategoryWithInventory[];
  lowStockCategories: LowStockAlert[];
  operations: InventoryOperation[];
  loading: boolean;
  error: string | null;
  migrationStatus: 'pending' | 'in-progress' | 'completed' | 'failed' | 'rolled-back';
  lastUpdated: string | null;
}

const initialState: CategoryInventoryState = {
  categories: [],
  lowStockCategories: [],
  operations: [],
  loading: false,
  error: null,
  migrationStatus: 'pending',
  lastUpdated: null,
};

// Async thunks with better error handling
export const fetchCategoriesWithInventory = createAsyncThunk(
  'categoryInventory/fetchCategoriesWithInventory',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryInventoryService.getAllCategoriesWithInventory();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

export const updateCategoryInventory = createAsyncThunk(
  'categoryInventory/updateCategoryInventory',
  async ({ categoryId, quantity, reason, performedBy }: {
    categoryId: string;
    quantity: number;
    reason?: string;
    performedBy?: string;
  }, { rejectWithValue }) => {
    try {
      await categoryInventoryService.updateCategoryInventory(categoryId, quantity, reason, performedBy);
      const updatedCategory = await categoryInventoryService.getCategoryInventory(categoryId);
      if (!updatedCategory) {
        throw new Error('Category not found after update');
      }
      return updatedCategory;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update inventory');
    }
  }
);

export const fetchLowStockCategories = createAsyncThunk(
  'categoryInventory/fetchLowStockCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryInventoryService.getLowStockCategories();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch low stock categories');
    }
  }
);

const categoryInventorySlice = createSlice({
  name: 'categoryInventory',
  initialState,
  reducers: {
    setMigrationStatus: (state, action: PayloadAction<CategoryInventoryState['migrationStatus']>) => {
      state.migrationStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchCategoriesWithInventory
      .addCase(fetchCategoriesWithInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesWithInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCategoriesWithInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch categories';
        state.categories = [];
      })
      // updateCategoryInventory
      .addCase(updateCategoryInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        } else {
          // If category not found in current list, add it
          state.categories.push(action.payload);
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCategoryInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update inventory';
      })
      // fetchLowStockCategories
      .addCase(fetchLowStockCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLowStockCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.lowStockCategories = action.payload;
        state.error = null;
      })
      .addCase(fetchLowStockCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch low stock categories';
        state.lowStockCategories = [];
      });
  },
});

// Selectors
export const selectCategoryInventory = (state: { categoryInventory: CategoryInventoryState }) => state.categoryInventory;

export const selectCategoriesWithInventory = createSelector(
  [selectCategoryInventory],
  (categoryInventory) => categoryInventory.categories
);

export const selectLowStockCategories = createSelector(
  [selectCategoryInventory],
  (categoryInventory) => categoryInventory.lowStockCategories
);

export const selectCategoryInventoryLoading = createSelector(
  [selectCategoryInventory],
  (categoryInventory) => categoryInventory.loading
);

export const selectCategoryInventoryError = createSelector(
  [selectCategoryInventory],
  (categoryInventory) => categoryInventory.error
);

export const selectMigrationStatus = createSelector(
  [selectCategoryInventory],
  (categoryInventory) => categoryInventory.migrationStatus
);

export const selectCategoryById = createSelector(
  [selectCategoriesWithInventory, (_: unknown, categoryId: string) => categoryId],
  (categories, categoryId) => categories.find(cat => cat.id === categoryId)
);

export const selectTotalInventoryValue = createSelector(
  [selectCategoriesWithInventory],
  (categories) => categories.reduce((total, category) => total + category.inventory.totalQuantity, 0)
);

export const selectOutOfStockCategoriesCount = createSelector(
  [selectCategoriesWithInventory],
  (categories) => categories.filter(cat => cat.inventory.totalQuantity === 0).length
);

export const { setMigrationStatus, clearError, resetState } = categoryInventorySlice.actions;
export default categoryInventorySlice.reducer; 