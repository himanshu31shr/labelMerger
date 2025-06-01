import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AllOrdersForAnalyticsService } from '../../services/allOrdersForAnalytics.service';
import { ProductSummary } from '../../pages/home/services/base.transformer';
import { SerializedError } from '@reduxjs/toolkit';

// Define the structure of an individual order item, using ProductSummary for product details
interface OrderItem extends ProductSummary {
  date: string; // Add date information from the daily document
  // Keep other fields from ProductSummary (SKU, name, quantity, type, product, etc.)
}

// Define the state structure for this slice
interface AllOrdersForAnalyticsState {
  items: OrderItem[]; // Aggregated list of all order items
  loading: boolean;
  error: string | null;
}

const initialState: AllOrdersForAnalyticsState = {
  items: [],
  loading: false,
  error: null,
};

// Create an instance of the new service
const allOrdersService = new AllOrdersForAnalyticsService();

// Async thunk to fetch all daily order documents and aggregate orders
export const fetchAllOrdersForAnalytics = createAsyncThunk<
  OrderItem[], // Return type of the payload
  void, // Argument type (none)
  { rejectValue: string } // ThunkAPI config
>(
  'allOrdersForAnalytics/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const dailyOrderDocs = await allOrdersService.fetchAllDailyOrderDocuments();

      // Aggregate all order items from all daily documents
      const allOrderItems: OrderItem[] = dailyOrderDocs.reduce((acc, dailyDoc) => {
        // Ensure each order item includes the date from the daily document
        const ordersWithDate = dailyDoc.orders.map(order => ({
          ...order,
          date: dailyDoc.date,
        }));
        return [...acc, ...ordersWithDate];
      }, [] as OrderItem[]);

      return allOrderItems;
    } catch (error: unknown) {
      // Safely extract error message or use a default message
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define the meta type for rejected actions from this specific thunk
interface FetchAllOrdersRejectedMeta {
    arg: void;
    requestId: string;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
    rejectedWithValue: boolean;
}

// Create the slice
const allOrdersForAnalyticsSlice = createSlice({
  name: 'allOrdersForAnalytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersForAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrdersForAnalytics.fulfilled, (state, action: PayloadAction<OrderItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Correctly type the rejected action using the inferred payload and the refined meta
      .addCase(fetchAllOrdersForAnalytics.rejected, (state, action: PayloadAction<string | undefined, string, FetchAllOrdersRejectedMeta, SerializedError>) => {
        state.loading = false;
        // Use action.payload safely as it could be undefined if the thunk itself threw an error
        state.error = action.payload || action.error?.message || 'Failed to fetch all orders for analytics';
      });
  },
});

export default allOrdersForAnalyticsSlice.reducer; 