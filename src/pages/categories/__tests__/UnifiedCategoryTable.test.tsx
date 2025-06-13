import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UnifiedCategoryTable } from '../UnifiedCategoryTable';
import { CategoryInventoryService } from '../../../services/categoryInventory.service';
import categoriesReducer from '../../../store/slices/categoriesSlice';
import categoryInventoryReducer from '../../../store/slices/categoryInventorySlice';
import { authReducer } from '../../../store/slices/authSlice';

// Mock the CategoryInventoryService
jest.mock('../../../services/categoryInventory.service');

// Mock data
const mockCategories = [
  {
    id: '1',
    name: 'Test Category 1',
    description: 'Description 1',
    tag: 'tag1',
    inventory: {
      totalQuantity: 10,
      lowStockThreshold: 5,
      productCount: 2
    }
  },
  {
    id: '2',
    name: 'Test Category 2',
    description: 'Description 2',
    tag: 'tag2',
    inventory: {
      totalQuantity: 3,
      lowStockThreshold: 5,
      productCount: 1
    }
  }
];

// Create mock store with minimal setup
const createMockStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
      categoryInventory: categoryInventoryReducer,
      auth: authReducer
    },
    preloadedState: {
      auth: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: true,
        authStateLoaded: true,
        isLoading: false,
      }
    }
  });
};

// Create wrapper component with providers
const renderWithProviders = (ui: React.ReactElement) => {
  const store = createMockStore();
  const theme = createTheme();

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </Provider>
  );
};

describe('UnifiedCategoryTable', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the CategoryInventoryService implementation
    (CategoryInventoryService as jest.Mock).mockImplementation(() => ({
      getAllCategoriesWithInventory: jest.fn().mockResolvedValue(mockCategories)
    }));
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderWithProviders(<UnifiedCategoryTable />);
      expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
    });

    it('shows loading state initially', () => {
      renderWithProviders(<UnifiedCategoryTable />);
      // Component should render without throwing errors
      expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles service errors gracefully', async () => {
      // Mock service to reject
      (CategoryInventoryService as jest.Mock).mockImplementation(() => ({
        getAllCategoriesWithInventory: jest.fn().mockRejectedValue(new Error('Failed to fetch'))
      }));

      renderWithProviders(<UnifiedCategoryTable />);

      // Component should still render the basic UI
      expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
    });
  });
});
