import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../../types/transaction.type';
import { TransactionService } from '../../services/transaction.service';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
};

const transactionService = new TransactionService();

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await transactionService.getTransactions();
    return response;
  }
);

export const saveTransactions = createAsyncThunk(
  'transactions/saveTransactions',
  async (transactions: Transaction[]) => {
    await transactionService.saveTransactions(transactions);
    return transactions;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(saveTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer; 