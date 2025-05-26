import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductService } from '../../services/product.service';
import { CACHE_DURATIONS, shouldFetchData } from '../../utils/api';

export interface InventoryState {
  items: Product[];
  lowStockItems: Product[];
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  lastLowStockFetchTime: number | null;
}

const initialState: InventoryState = {
  items: [],
  lowStockItems: [],
  loading: false,
  error: null,
  lastFetchTime: null,
  lastLowStockFetchTime: null,
};

const productService = new ProductService();

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { getState }) => {
    const state = getState() as { inventory: InventoryState };
    const { lastFetchTime, items } = state.inventory;
    
    if (!shouldFetchData(lastFetchTime, items, CACHE_DURATIONS.products)) {
      return items;
    }
    
    const products = await productService.getProducts();
    return products;
  }
);

export const fetchLowStockItems = createAsyncThunk(
  'inventory/fetchLowStockItems',
  async () => {
    const products = await productService.getLowInventoryProducts();
    return products;
  }
);

export const updateProductInventory = createAsyncThunk(
  'inventory/updateProductInventory',
  async ({ sku, quantity }: { sku: string; quantity: number }) => {
    const updatedProduct = await productService.updateInventory(sku, quantity);
    return updatedProduct;
  }
);

export const reduceInventoryForOrder = createAsyncThunk(
  'inventory/reduceInventoryForOrder',
  async ({ sku, quantity }: { sku: string; quantity: number }) => {
    // Check if there's sufficient inventory first
    const hasSufficient = await productService.hasSufficientInventory(sku, quantity);
    
    if (!hasSufficient) {
      throw new Error(`Insufficient inventory for product with SKU ${sku}`);
    }
    
    const updatedProduct = await productService.reduceInventoryForOrder(sku, quantity);
    return updatedProduct;
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch inventory';
      })
      .addCase(fetchLowStockItems.fulfilled, (state, action) => {
        state.lowStockItems = action.payload;
        state.lastLowStockFetchTime = Date.now();
      })
      .addCase(updateProductInventory.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.items.findIndex((item) => item.sku === updatedProduct.sku);
        
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
        
        // Update low stock items if necessary
        if (updatedProduct.inventory && 
            updatedProduct.inventory.quantity <= updatedProduct.inventory.lowStockThreshold) {
          const lowStockIndex = state.lowStockItems.findIndex((item) => item.sku === updatedProduct.sku);
          
          if (lowStockIndex !== -1) {
            state.lowStockItems[lowStockIndex] = updatedProduct;
          } else {
            state.lowStockItems.push(updatedProduct);
          }
        } else {
          // Remove from low stock if it's no longer low stock
          state.lowStockItems = state.lowStockItems.filter((item) => item.sku !== updatedProduct.sku);
        }
      })
      .addCase(reduceInventoryForOrder.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.items.findIndex((item) => item.sku === updatedProduct.sku);
        
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
        
        // Update low stock items if necessary
        if (updatedProduct.inventory && 
            updatedProduct.inventory.quantity <= updatedProduct.inventory.lowStockThreshold) {
          const lowStockIndex = state.lowStockItems.findIndex((item) => item.sku === updatedProduct.sku);
          
          if (lowStockIndex !== -1) {
            state.lowStockItems[lowStockIndex] = updatedProduct;
          } else {
            state.lowStockItems.push(updatedProduct);
          }
        }
      })
      .addCase(reduceInventoryForOrder.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to reduce inventory';
      });
  },
});

export default inventorySlice.reducer;
