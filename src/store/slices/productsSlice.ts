import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilter, ProductService } from '../../services/product.service';
import { CACHE_DURATIONS, shouldFetchData, createOptimisticUpdate } from '../config';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilter;
  lastFetched: number | null;
  detailsCache: Record<string, Product>;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {},
  lastFetched: null,
  detailsCache: {},
};

const productService = new ProductService();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFilter, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { lastFetched, items } = state.products;
    
    if (!shouldFetchData(lastFetched, items, CACHE_DURATIONS.products)) {
      return items;
    }
    
    const response = await productService.getProducts(filters);
    return response;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (sku: string, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { detailsCache } = state.products;
    
    if (detailsCache[sku]) {
      return { sku, details: detailsCache[sku] };
    }
    
    const details = await productService.getProductDetails(sku);
    return { sku, details };
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
  async ({ sku, data }: { sku: string; data: Partial<Product> }, { dispatch, getState }) => {
    const state = getState() as { products: ProductsState };
    const { items } = state.products;
    
    // Optimistically update the UI
    const optimisticItems = createOptimisticUpdate(items, { sku, ...data }, 'sku');
    dispatch(setOptimisticUpdate(optimisticItems));
    
    try {
      await productService.updateProduct(sku, data);
      return { sku, data };
    } catch (error) {
      // Revert on failure
      dispatch(setOptimisticUpdate(items));
      throw error;
    }
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
    setOptimisticUpdate: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const { sku, details } = action.payload;
        state.detailsCache[sku] = details;
      })
      .addCase(importProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.filteredItems = state.items;
        state.lastFetched = Date.now();
      })
      .addCase(importProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to import products';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { sku, data } = action.payload;
        const index = state.items.findIndex((p) => p.sku === sku);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data };
          state.filteredItems = state.items;
          state.lastFetched = Date.now();
        }
      });
  },
});

export const { setFilters, clearFilters, setOptimisticUpdate } = productsSlice.actions;
export const productsReducer = productsSlice.reducer; 