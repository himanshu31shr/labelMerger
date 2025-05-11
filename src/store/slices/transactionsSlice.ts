import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../../types/transaction.type';
import { TransactionService } from '../../services/transaction.service';
import { CACHE_DURATIONS, shouldFetchData, createOptimisticUpdate } from '../config';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  pendingTransactions: Record<string, Transaction>;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
  pendingTransactions: {},
};

const transactionService = new TransactionService();

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { getState }) => {
    const state = getState() as { transactions: TransactionsState };
    const { lastFetched, items } = state.transactions;
    
    if (!shouldFetchData(lastFetched, items, CACHE_DURATIONS.transactions)) {
      return items;
    }
    
    const response = await transactionService.getTransactions();
    return response;
  }
);

export const saveTransactions = createAsyncThunk(
  'transactions/saveTransactions',
  async (transactions: Transaction[], { dispatch, getState }) => {
    const state = getState() as { transactions: TransactionsState };
    const currentItems = state.transactions.items;
    
    // Optimistically update the UI
    const optimisticItems = [...currentItems, ...transactions];
    dispatch(setOptimisticUpdate(optimisticItems));
    
    try {
      await transactionService.saveTransactions(transactions);
      return transactions;
    } catch (error) {
      // Revert on failure
      dispatch(setOptimisticUpdate(currentItems));
      throw error;
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setOptimisticUpdate: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(saveTransactions.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.lastFetched = Date.now();
      });
  },
});

export const { setOptimisticUpdate } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer; 