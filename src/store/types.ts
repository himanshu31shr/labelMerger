import { CategoriesState } from './slices/categoriesSlice';
import { ProductsState } from './slices/productsSlice';

// Define the RootState with both categories and products
export interface RootState {
  categories: CategoriesState;
  products: ProductsState;
}

export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState
) => Promise<void>;

export interface AppDispatch {
  (action: {type: string; payload?: unknown}): {type: string; payload?: unknown};
  <T>(thunk: (dispatch: AppDispatch, getState: () => RootState) => T): T;
}
