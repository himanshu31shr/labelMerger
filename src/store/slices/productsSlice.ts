import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilter, ProductService } from '../../services/product.service';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilter;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {},
};

const productService = new ProductService();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFilter) => {
    const response = await productService.getProducts(filters);
    return response;
  }
);

export const importProducts = createAsyncThunk(
  'products/importProducts',
  async (file: File) => {
    const importedProducts = await productService.parseProducts(file);
    await productService.saveProducts(importedProducts);
    return importedProducts;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ sku, data }: { sku: string; data: Partial<Product> }) => {
    await productService.updateProduct(sku, data);
    return { sku, data };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.filteredItems = state.items.filter(
        (product) =>
          (state.filters.platform ? product.platform === state.filters.platform : true) &&
          (state.filters.search
            ? product.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
              product.sku.toLowerCase().includes(state.filters.search.toLowerCase())
            : true)
      );
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(importProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.filteredItems = state.items;
      })
      .addCase(importProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to import products';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.sku === action.payload.sku);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.data };
          state.filteredItems = state.items;
        }
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export const productsReducer = productsSlice.reducer; 