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
  bulkUpdateProducts
} from '../productsSlice';

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
  let store: ReturnType<typeof configureStore>;

  const mockProduct = {
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
      lastUpdated: { seconds: 1234567890, nanoseconds: 0 },
    },
    metadata: {
      createdAt: { seconds: 1234567890, nanoseconds: 0 },
      updatedAt: { seconds: 1234567890, nanoseconds: 0 },
      listingStatus: 'active' as const,
      amazonSerialNumber: 'B123456789',
      moq: '1',
    },
  };

  const mockProduct2 = {
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
      lastUpdated: { seconds: 1234567890, nanoseconds: 0 },
    },
    metadata: {
      createdAt: { seconds: 1234567890, nanoseconds: 0 },
      updatedAt: { seconds: 1234567890, nanoseconds: 0 },
      listingStatus: 'inactive' as const,
      amazonSerialNumber: 'B987654321',
      moq: '5',
    },
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().products;
      
      expect(state).toEqual({
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
      });
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
      };

      const storeWithData = configureStore({
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
        const action = { type: fetchProducts.pending.type } as any;
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should set items when fulfilled', () => {
        const products = [mockProduct, mockProduct2];
        const action = { 
          type: fetchProducts.fulfilled.type, 
          payload: products 
        } as any;
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.items).toEqual(products);
        expect(state.filteredItems).toEqual(products);
        expect(state.lastFetched).toBeDefined();
      });

      it('should set error when rejected', () => {
        const action = { 
          type: fetchProducts.rejected.type, 
          error: { message: 'Failed to fetch' }
        } as any;
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to fetch');
      });
    });

    describe('fetchProductDetails', () => {
      it('should cache product details when fulfilled', () => {
        const action = { 
          type: fetchProductDetails.fulfilled.type, 
          payload: { sku: 'TEST-SKU-1', details: mockProduct }
        } as any;
        const state = productsReducer(undefined, action);

        expect(state.detailsCache['TEST-SKU-1']).toEqual(mockProduct);
      });
    });

    describe('importProducts', () => {
      it('should set loading when pending', () => {
        const action = { type: importProducts.pending.type } as any;
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should add imported products when fulfilled', () => {
        const initialState = {
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
        };

        const newProducts = [mockProduct2];
        const action = { 
          type: importProducts.fulfilled.type, 
          payload: newProducts 
        } as any;
        const state = productsReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.items).toHaveLength(2);
        expect(state.items).toContain(mockProduct);
        expect(state.items).toContain(mockProduct2);
      });

      it('should set error when rejected', () => {
        const action = { 
          type: importProducts.rejected.type, 
          error: { message: 'Failed to import' }
        } as any;
        const state = productsReducer(undefined, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to import');
      });
    });

    describe('updateProduct', () => {
      it('should update existing product when fulfilled', () => {
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
        };

        const updateData = { name: 'Updated Product' };
        const action = { 
          type: updateProduct.fulfilled.type, 
          payload: { sku: 'TEST-SKU-1', data: updateData }
        } as any;
        const state = productsReducer(initialState, action);

        expect(state.items[0].name).toBe('Updated Product');
        expect(state.items[1]).toEqual(mockProduct2); // Should remain unchanged
      });

      it('should not update if product not found', () => {
        const initialState = {
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
        };

        const updateData = { name: 'Updated Product' };
        const action = { 
          type: updateProduct.fulfilled.type, 
          payload: { sku: 'NON-EXISTENT', data: updateData }
        } as any;
        const state = productsReducer(initialState, action);

        expect(state.items).toEqual([mockProduct]); // Should remain unchanged
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
  });
}); 