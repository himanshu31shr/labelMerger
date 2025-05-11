import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ActiveOrder, TodaysOrder } from '../../services/todaysOrder.service';
import { ProductSummary } from '../../pages/home/services/base.transformer';

interface OrdersState {
  items: ActiveOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

const orderService = new TodaysOrder();

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await orderService.getTodaysOrders();
    return response?.orders || [];
  }
);

export const updateOrders = createAsyncThunk(
  'orders/updateOrders',
  async ({ orders, date }: { orders: ProductSummary[]; date: string }) => {
    await orderService.updateTodaysOrder({
      orders,
      date,
      id: date,
    });
    return { orders, date };
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(updateOrders.fulfilled, (state, action) => {
        // Refresh orders after update
        state.loading = true;
      });
  },
});

export const ordersReducer = ordersSlice.reducer; 