import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TodaysOrder, ActiveOrderSchema } from '../../services/todaysOrder.service';
import { CACHE_DURATIONS, shouldFetchData } from '../../utils/api';
import { ProductSummary } from '../../pages/home/services/base.transformer';

interface OrderHistoryState {
  dailyOrders: ActiveOrderSchema[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: OrderHistoryState = {
  dailyOrders: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const orderService = new TodaysOrder();

export const fetchOrderHistory = createAsyncThunk(
  'orderHistory/fetchOrderHistory',
  async (_, { getState }) => {
    const state = getState() as { orderHistory: OrderHistoryState };
    const { lastFetched, dailyOrders } = state.orderHistory;
    
    if (!shouldFetchData(lastFetched, dailyOrders, CACHE_DURATIONS.orders)) {
      return dailyOrders;
    }
    
    const orders = await orderService.getLastThirtyDaysOrders();
    return orders;
  }
);

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyOrders = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order history';
      });
  },
});

export default orderHistorySlice.reducer;
