import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilter, ProductService } from '../../services/product.service';

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
  async (filters: ProductFilter) => {
    return await productService.getProducts(filters);
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
  async ({ sku, data }: { sku: string; data: Partial<Product> }) => {
    await productService.updateProduct(sku, data);
    return { sku, data };
  }
);

export const bulkUpdateProducts = createAsyncThunk(
  'products/bulkUpdateProducts',
  async ({ skus, data }: { skus: string[]; data: Partial<Product> }) => {
    const updates = skus.map(sku => productService.updateProduct(sku, data));
    await Promise.all(updates);
    return { skus, data };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = state.items.filter(product => {
        if (state.filters.platform && product.platform !== state.filters.platform) {
          return false;
        }
        if (state.filters.search) {
          const searchLower = state.filters.search.toLowerCase();
          return (
            product.sku.toLowerCase().includes(searchLower) ||
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
          );
        }
        return true;
      });
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
        state.loading = true;
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
        state.filteredItems = [...state.filteredItems, ...action.payload];
      })
      .addCase(importProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to import products';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { sku, data } = action.payload;
        const index = state.items.findIndex(p => p.sku === sku);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data };
          state.filteredItems = state.items.filter(product => {
            if (state.filters.platform && product.platform !== state.filters.platform) {
              return false;
            }
            if (state.filters.search) {
              const searchLower = state.filters.search.toLowerCase();
              return (
                product.sku.toLowerCase().includes(searchLower) ||
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
              );
            }
            return true;
          });
        }
      })
      .addCase(bulkUpdateProducts.fulfilled, (state, action) => {
        const { skus, data } = action.payload;
        state.items = state.items.map(product => {
          if (skus.includes(product.sku)) {
            return { ...product, ...data };
          }
          return product;
        });
        state.filteredItems = state.items.filter(product => {
          if (state.filters.platform && product.platform !== state.filters.platform) {
            return false;
          }
          if (state.filters.search) {
            const searchLower = state.filters.search.toLowerCase();
            return (
              product.sku.toLowerCase().includes(searchLower) ||
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower)
            );
          }
          return true;
        });
      });
  },
});

export const { setFilters, clearFilters, setOptimisticUpdate } = productsSlice.actions;
export const productsReducer = productsSlice.reducer; 