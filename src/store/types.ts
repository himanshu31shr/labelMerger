import { CategoriesState } from './slices/categoriesSlice';

// Define a simplified RootState with just the categories for now
export interface RootState {
  categories: CategoriesState;
}

export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState
) => Promise<void>;

export interface AppDispatch {
  (action: any): any;
  <T>(thunk: (dispatch: AppDispatch, getState: () => RootState) => T): T;
}
