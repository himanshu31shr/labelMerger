import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsReducer } from './slices/productsSlice';
import { ordersReducer } from './slices/ordersSlice';
import { transactionsReducer } from './slices/transactionsSlice';
import { authReducer } from './slices/authSlice';
import { pdfMergerReducer } from './slices/pdfMergerSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['products', 'orders', 'transactions'], // Only persist these reducers
  blacklist: ['auth', 'pdfMerger'], // Don't persist these reducers
};

const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  transactions: transactionsReducer,
  auth: authReducer,
  pdfMerger: pdfMergerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.customTheme'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'theme.customTheme'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks'; 