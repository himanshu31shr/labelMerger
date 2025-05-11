import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import { ordersReducer } from './slices/ordersSlice';
import { transactionsReducer } from './slices/transactionsSlice';
import { authReducer } from './slices/authSlice';
import { pdfMergerReducer } from './slices/pdfMergerSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    transactions: transactionsReducer,
    auth: authReducer,
    pdfMerger: pdfMergerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.customTheme'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'theme.customTheme'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks'; 