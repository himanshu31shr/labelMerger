import { configureStore } from '@reduxjs/toolkit';
import {
  productsReducer,
  setFilters,
  clearFilters,
  setOptimisticUpdate,
  fetchProducts,
  fetchProductDetails,
  importProducts,
  updateProduct,
  ProductsState
} from '../productsSlice';
import { RootState } from '../../types';
import { Product } from '../../../services/product.service';
import { Timestamp } from 'firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';

// Mock Firebase Timestamp
const mockTimestamp = {
  seconds: 1234567890,
  nanoseconds: 0,
  toDate: jest.fn(),
  toMillis: jest.fn(),
  isEqual: jest.fn(),
  toJSON: jest.fn(),
  valueOf: () => 'timestamp',
} as unknown as Timestamp;

jest.mock('firebase/firestore', () => ({
  Timestamp: jest.fn(() => mockTimestamp)
}));

// Mock the services
jest.mock('../../../services/product.service', () => ({
  ProductService: jest.fn().mockImplementation(() => ({
    getProducts: jest.fn(),
    getProductDetails: jest.fn(),
    parseProducts: jest.fn(),
    saveProducts: jest.fn(),
    updateProduct: jest.fn(),
  })),
}));

jest.mock('../../../services/category.service', () => ({
  CategoryService: jest.fn().mockImplementation(() => ({
    getCategories: jest.fn(),
    createCategory: jest.fn(),
  })),
}));

describe('productsSlice', () => {
  let store: ReturnType<typeof configureStore<{ products: RootState['products'] }>>;

  const mockProduct: Product = {
    sku: 'TEST-SKU-1',
    name: 'Test Product',
    description: 'Test description',
    sellingPrice: 100,
    costPrice: 50,
    platform: 'amazon' as const,
    visibility: 'visible' as const,
    inventory: {
      quantity: 10,
      lowStockThreshold: 5,
      lastUpdated: mockTimestamp,
    },
    metadata: {
      createdAt: mockTimestamp,
      updatedAt: mockTimestamp,
      listingStatus: 'active' as const,
      amazonSerialNumber: 'B123456789',
      moq: '1',
    },
  };

  const mockProduct2: Product = {
    sku: 'TEST-SKU-2',
    name: 'Test Product 2',
    description: 'Test description 2',
    sellingPrice: 200,
    costPrice: 100,
    platform: 'flipkart' as const,
    visibility: 'hidden' as const,
    inventory: {
      quantity: 5,
      lowStockThreshold: 2,
      lastUpdated: mockTimestamp,
    },
    metadata: {
      createdAt: mockTimestamp,
      updatedAt: mockTimestamp,
      listingStatus: 'inactive' as const,
      amazonSerialNumber: 'B987654321',
      moq: '5',
    },
  };

  const mockInitialState: ProductsState = {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    filters: {},
    lastFetched: null,
    detailsCache: {},
    categories: [],
    categoriesLoading: false,
    categoriesError: null,
    categoryProducts: [],
    categoryProductsLoading: false,
    categoryProductsError: null,
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
      preloadedState: { products: mockInitialState },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().products;
      
      expect(state).toEqual(mockInitialState);
    });
  });

  describe('setFilters', () => {
    it('should set filters and update filtered items', () => {
      // First set some items
      const initialState = {
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
        loading: false,
        error: null,
        filters: {},
        lastFetched: null,
        detailsCache: {},
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        categoryProducts: [],
        categoryProductsLoading: false,
        categoryProductsError: null,
      };

      const storeWithData = configureStore<{ products: RootState['products'] }>({
        reducer: { products: productsReducer },
        preloadedState: { products: initialState },
      });

      const filters = { platform: 'amazon' as const };
      storeWithData.dispatch(setFilters(filters));
      const state = storeWithData.getState().products;

      expect(state.filters).toEqual(filters);
      expect(state.filteredItems).toHaveLength(1);
      expect(state.filteredItems[0].platform).toBe('amazon');
    });

    it('should filter by search term', () => {
      const initialState = {
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
        loading: false,
        error: null,
        filters: {},
        lastFetched: null,
        detailsCache: {},
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        categoryProducts: [],
        categoryProductsLoading: false,
        categoryProductsError: null,
      };

      const storeWithData = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: initialState },
      });

      const filters = { search: 'Test Product 2' };
      storeWithData.dispatch(setFilters(filters));
      const state = storeWithData.getState().products;

      expect(state.filters).toEqual(filters);
      expect(state.filteredItems).toHaveLength(1);
      expect(state.filteredItems[0].name).toBe('Test Product 2');
    });
  });

  describe('clearFilters', () => {
    it('should clear filters and show all items', () => {
      const initialState = {
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct], // Only one item filtered
        loading: false,
        error: null,
        filters: { platform: 'amazon' as const },
        lastFetched: null,
        detailsCache: {},
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        categoryProducts: [],
        categoryProductsLoading: false,
        categoryProductsError: null,
      };

      const storeWithData = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: initialState },
      });

      storeWithData.dispatch(clearFilters());
      const state = storeWithData.getState().products;

      expect(state.filters).toEqual({});
      expect(state.filteredItems).toEqual([mockProduct, mockProduct2]);
    });
  });

  describe('setOptimisticUpdate', () => {
    it('should update both items and filteredItems', () => {
      const updatedProducts = [mockProduct2];
      
      store.dispatch(setOptimisticUpdate(updatedProducts));
      const state = store.getState().products;

      expect(state.items).toEqual(updatedProducts);
      expect(state.filteredItems).toEqual(updatedProducts);
    });
  });

  describe('async thunks', () => {
    describe('fetchProducts', () => {
      it('should set loading to true when pending', () => {
        const action: PayloadAction<undefined> = { type: fetchProducts.pending.type, payload: undefined };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should set items when fulfilled', () => {
        const products = [mockProduct, mockProduct2];
        const action: PayloadAction<Product[]> = { 
          type: fetchProducts.fulfilled.type, 
          payload: products 
        };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.items).toEqual(products);
      });

      it('should set error when rejected', () => {
        const action = { 
          type: fetchProducts.rejected.type, 
          error: { message: 'Failed to fetch' }
        };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to fetch');
      });
    });

    describe('fetchProductDetails', () => {
      it('should update details cache when fulfilled', () => {
        const action: PayloadAction<{ sku: string; details: Product }> = {
          type: fetchProductDetails.fulfilled.type,
          payload: { sku: 'TEST-SKU-1', details: mockProduct }
        };
        const state = productsReducer(undefined, action);

        expect(state.detailsCache['TEST-SKU-1']).toEqual(mockProduct);
      });
    });

    describe('importProducts', () => {
      it('should set loading to true when pending', () => {
        const action: PayloadAction<undefined> = {
          type: importProducts.pending.type,
          payload: undefined
        };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should update items when fulfilled', () => {
        const action: PayloadAction<Product[]> = {
          type: importProducts.fulfilled.type,
          payload: [mockProduct]
        };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.items).toContainEqual(mockProduct);
      });

      it('should set error when rejected', () => {
        const action = {
          type: importProducts.rejected.type,
          error: { message: 'Failed to import' }
        };
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to import');
      });
    });

    describe('updateProduct', () => {
      it('should update product when fulfilled', () => {
        const initialState: ProductsState = {
          items: [mockProduct],
          filteredItems: [mockProduct],
          loading: false,
          error: null,
          filters: {},
          lastFetched: null,
          detailsCache: {},
          categories: [],
          categoriesLoading: false,
          categoriesError: null,
          categoryProducts: [],
          categoryProductsLoading: false,
          categoryProductsError: null,
        };

        const updatedData = { name: 'Updated Product' };
        const action: PayloadAction<{ sku: string; data: Partial<Product> }> = {
          type: updateProduct.fulfilled.type,
          payload: { sku: 'TEST-SKU-1', data: updatedData }
        };
        const state = productsReducer(initialState, action);

        expect(state.items[0].name).toBe('Updated Product');
      });
    });
  });

  describe('combined operations', () => {
    it('should handle filtering and updates together', () => {
      // Set up initial state with products
      const initialState = {
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
        loading: false,
        error: null,
        filters: {},
        lastFetched: null,
        detailsCache: {},
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        categoryProducts: [],
        categoryProductsLoading: false,
        categoryProductsError: null,
      };

      const storeWithData = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: initialState },
      });

      // Apply filter
      storeWithData.dispatch(setFilters({ platform: 'amazon' }));
      expect(storeWithData.getState().products.filteredItems).toHaveLength(1);

      // Clear filters
      storeWithData.dispatch(clearFilters());
      expect(storeWithData.getState().products.filteredItems).toHaveLength(2);

      // Apply optimistic update
      const updatedProducts = [mockProduct];
      storeWithData.dispatch(setOptimisticUpdate(updatedProducts));
      const finalState = storeWithData.getState().products;

      expect(finalState.items).toEqual(updatedProducts);
      expect(finalState.filteredItems).toEqual(updatedProducts);
    });

    it('should filter products by platform', () => {
      const stateWithProducts: ProductsState = {
        ...mockInitialState,
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
      };
      
      store = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: stateWithProducts },
      });

      store.dispatch(setFilters({ platform: 'amazon' }));
      const state = store.getState().products;

      expect(state.filteredItems).toEqual([mockProduct]);
    });

    it('should filter products by search query', () => {
      const stateWithProducts: ProductsState = {
        ...mockInitialState,
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
        filters: { platform: 'amazon' },
      };
      
      store = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: stateWithProducts },
      });

      store.dispatch(setFilters({ search: 'Test Product 2' }));
      const state = store.getState().products;

      expect(state.filteredItems).toEqual([]);
    });

    it('should clear all filters', () => {
      const stateWithFilters: ProductsState = {
        ...mockInitialState,
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct],
        filters: { platform: 'amazon', search: 'test' },
      };
      
      store = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: stateWithFilters },
      });

      store.dispatch(clearFilters());
      const state = store.getState().products;

      expect(state.filters).toEqual({});
      expect(state.filteredItems).toEqual([mockProduct, mockProduct2]);
    });

    it('should update product when fulfilled', () => {
      const initialState: ProductsState = {
        ...mockInitialState,
        items: [mockProduct],
        filteredItems: [mockProduct],
      };

      const updatedData = { name: 'Updated Product' };
      const action: PayloadAction<{ sku: string; data: Partial<Product> }> = {
        type: updateProduct.fulfilled.type,
        payload: { sku: 'TEST-SKU-1', data: updatedData }
      };
      const state = productsReducer(initialState, action);

      expect(state.items[0].name).toBe('Updated Product');
    });

    it('should handle bulk operations', () => {
      const stateWithProducts: ProductsState = {
        ...mockInitialState,
        items: [mockProduct, mockProduct2],
        filteredItems: [mockProduct, mockProduct2],
      };
      
      store = configureStore({
        reducer: { products: productsReducer },
        preloadedState: { products: stateWithProducts },
      });

      store.dispatch(setOptimisticUpdate([{ ...mockProduct, name: 'Updated' }]));
      const state = store.getState().products;

      expect(state.items[0].name).toBe('Updated');
    });
  });
}); 