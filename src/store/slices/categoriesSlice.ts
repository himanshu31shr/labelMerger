import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryService } from '../../services/category.service';

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

const categoryService = new CategoryService();

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return await categoryService.getCategories();
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: Omit<Category, 'id'>, { rejectWithValue }) => {
    try {
      const id = await categoryService.createCategory(category);
      return { id, ...category };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (
    { id, ...updates }: Partial<Category> & { id: string },
    { rejectWithValue }
  ) => {
    try {
      await categoryService.updateCategory(id, updates);
      return { id, ...updates };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const isInUse = await categoryService.isCategoryInUse(id);
      if (isInUse) {
        throw new Error('Cannot delete category that is in use');
      }
      await categoryService.deleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch categories';
    });

    // Create Category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Update Category
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete Category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = null;
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { selectCategory, clearCategoriesError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
