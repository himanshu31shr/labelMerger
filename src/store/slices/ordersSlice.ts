import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ActiveOrder, TodaysOrder } from '../../services/todaysOrder.service';
import { ProductSummary } from '../../pages/home/services/base.transformer';
import { CACHE_DURATIONS, shouldFetchData, createOptimisticUpdate } from '../config';

interface OrdersState {
  items: ActiveOrder[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  pendingUpdates: Record<string, ProductSummary[]>;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
  pendingUpdates: {},
};

const orderService = new TodaysOrder();

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { getState }) => {
    const state = getState() as { orders: OrdersState };
    const { lastFetched, items } = state.orders;
    
    if (!shouldFetchData(lastFetched, items, CACHE_DURATIONS.orders)) {
      return items;
    }
    
    const response = await orderService.getTodaysOrders();
    return response?.orders || [];
  }
);

export const updateOrders = createAsyncThunk(
  'orders/updateOrders',
  async ({ orders, date }: { orders: ProductSummary[]; date: string }, { dispatch, getState }) => {
    const state = getState() as { orders: OrdersState };
    
    // Optimistically update the UI
    dispatch(setPendingUpdate({ date, orders }));
    
    try {
      await orderService.updateTodaysOrder({
        orders,
        date,
        id: date,
      });
      return { orders, date };
    } catch (error) {
      // Revert on failure
      dispatch(clearPendingUpdate(date));
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPendingUpdate: (state, action) => {
      const { date, orders } = action.payload;
      state.pendingUpdates[date] = orders;
    },
    clearPendingUpdate: (state, action) => {
      const date = action.payload;
      delete state.pendingUpdates[date];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(updateOrders.fulfilled, (state, action) => {
        const { date } = action.payload;
        delete state.pendingUpdates[date];
        state.lastFetched = null; // Force refresh on next fetch
      });
  },
});

export const { setPendingUpdate, clearPendingUpdate } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer; 