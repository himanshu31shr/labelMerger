import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import LowInventoryWidget from '../LowInventoryWidget';
import { Product } from '../../../../services/product.service';
import { Timestamp } from 'firebase/firestore';

// Mock Firebase Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
  },
}));

const theme = createTheme();

const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  sku: 'TEST-SKU-001',
  name: 'Test Product',
  platform: 'amazon',
  sellingPrice: 100,
  customCostPrice: 50,
  description: 'Test description',
  visibility: 'visible',
  inventory: {
    quantity: 5,
    lowStockThreshold: 10,
    lastUpdated: Timestamp.now(),
  },
  metadata: {
    amazonSerialNumber: 'B123456789',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    listingStatus: 'active',
    moq: '1',
  },
  ...overrides,
});

const renderLowInventoryWidget = (props: { items: Product[]; loading: boolean }) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LowInventoryWidget {...props} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('LowInventoryWidget', () => {
  describe('loading state', () => {
    it('should show loading spinner when loading is true', () => {
      renderLowInventoryWidget({ items: [], loading: true });
      
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should not show content when loading', () => {
      renderLowInventoryWidget({ items: [], loading: true });
      
      expect(screen.queryByText('Low Stock Alerts')).not.toBeInTheDocument();
      expect(screen.queryByText('No low stock items found.')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should show empty message when no items and not loading', () => {
      renderLowInventoryWidget({ items: [], loading: false });
      
      expect(screen.getByText('No low stock items found.')).toBeInTheDocument();
    });

    it('should not show header when no items', () => {
      renderLowInventoryWidget({ items: [], loading: false });
      
      expect(screen.queryByText('Low Stock Alerts')).not.toBeInTheDocument();
    });
  });

  describe('with items', () => {
    const mockProducts = [
      createMockProduct({
        sku: 'PROD-001',
        name: 'Low Stock Product 1',
        inventory: { quantity: 2, lowStockThreshold: 10, lastUpdated: Timestamp.now() },
      }),
      createMockProduct({
        sku: 'PROD-002',
        name: 'Low Stock Product 2',
        inventory: { quantity: 1, lowStockThreshold: 5, lastUpdated: Timestamp.now() },
      }),
    ];

    it('should render header with warning icon', () => {
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      expect(screen.getByText('Low Stock Alerts')).toBeInTheDocument();
      expect(screen.getByTestId('WarningIcon')).toBeInTheDocument();
    });

    it('should render product list', () => {
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      expect(screen.getByText('Low Stock Product 1')).toBeInTheDocument();
      expect(screen.getByText('Low Stock Product 2')).toBeInTheDocument();
    });

    it('should show inventory quantities', () => {
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      expect(screen.getByText('2 in stock')).toBeInTheDocument();
      expect(screen.getByText('1 in stock')).toBeInTheDocument();
    });

    it('should show SKU information', () => {
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      expect(screen.getByText('SKU: PROD-001')).toBeInTheDocument();
      expect(screen.getByText('SKU: PROD-002')).toBeInTheDocument();
    });

    it('should show "Manage Inventory" link when items <= 5', () => {
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      const manageLink = screen.getByText('Manage Inventory');
      expect(manageLink).toBeInTheDocument();
      expect(manageLink.closest('a')).toHaveAttribute('href', '/flipkart-amazon-tools/inventory/');
    });
  });

  describe('product name truncation', () => {
    it('should truncate long product names', () => {
      const longNameProduct = createMockProduct({
        name: 'This is a very long product name that should be truncated because it exceeds the limit',
        sku: 'LONG-NAME',
      });

      renderLowInventoryWidget({ items: [longNameProduct], loading: false });
      
      expect(screen.getByText('This is a very long product na...')).toBeInTheDocument();
    });

    it('should not truncate short product names', () => {
      const shortNameProduct = createMockProduct({
        name: 'Short Name',
        sku: 'SHORT',
      });

      renderLowInventoryWidget({ items: [shortNameProduct], loading: false });
      
      expect(screen.getByText('Short Name')).toBeInTheDocument();
    });

    it('should show full name in title attribute', () => {
      const longNameProduct = createMockProduct({
        name: 'This is a very long product name that should be truncated because it exceeds the limit',
        sku: 'LONG-NAME',
      });

      renderLowInventoryWidget({ items: [longNameProduct], loading: false });
      
      const truncatedElement = screen.getByText('This is a very long product na...');
      expect(truncatedElement).toHaveAttribute('title', 'This is a very long product name that should be truncated because it exceeds the limit');
    });
  });

  describe('inventory status colors', () => {
    it('should show error color for negative inventory', () => {
      const negativeInventoryProduct = createMockProduct({
        inventory: { quantity: -5, lowStockThreshold: 10, lastUpdated: Timestamp.now() },
      });

      renderLowInventoryWidget({ items: [negativeInventoryProduct], loading: false });
      
      const chip = screen.getByText('-5 in stock');
      expect(chip).toBeInTheDocument();
    });

    it('should show warning color for low positive inventory', () => {
      const lowInventoryProduct = createMockProduct({
        inventory: { quantity: 3, lowStockThreshold: 10, lastUpdated: Timestamp.now() },
      });

      renderLowInventoryWidget({ items: [lowInventoryProduct], loading: false });
      
      const chip = screen.getByText('3 in stock');
      expect(chip).toBeInTheDocument();
    });

    it('should handle missing inventory data', () => {
      const noInventoryProduct = createMockProduct({
        inventory: undefined,
      });

      renderLowInventoryWidget({ items: [noInventoryProduct], loading: false });
      
      expect(screen.getByText('0 in stock')).toBeInTheDocument();
    });
  });

  describe('pagination and overflow', () => {
    it('should show only first 5 items when more than 5 items provided', () => {
      const manyProducts = Array.from({ length: 8 }, (_, i) =>
        createMockProduct({
          sku: `PROD-${i + 1}`,
          name: `Product ${i + 1}`,
        })
      );

      renderLowInventoryWidget({ items: manyProducts, loading: false });
      
      // Should show first 5
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 5')).toBeInTheDocument();
      
      // Should not show 6th and beyond
      expect(screen.queryByText('Product 6')).not.toBeInTheDocument();
      expect(screen.queryByText('Product 8')).not.toBeInTheDocument();
    });

    it('should show "View X more" button when more than 5 items', () => {
      const manyProducts = Array.from({ length: 8 }, (_, i) =>
        createMockProduct({
          sku: `PROD-${i + 1}`,
          name: `Product ${i + 1}`,
        })
      );

      renderLowInventoryWidget({ items: manyProducts, loading: false });
      
      const viewMoreButton = screen.getByText('View 3 more low stock items');
      expect(viewMoreButton).toBeInTheDocument();
      expect(viewMoreButton.closest('a')).toHaveAttribute('href', '/flipkart-amazon-tools/inventory/');
    });

    it('should not show "View more" button when 5 or fewer items', () => {
      const fewProducts = Array.from({ length: 3 }, (_, i) =>
        createMockProduct({
          sku: `PROD-${i + 1}`,
          name: `Product ${i + 1}`,
        })
      );

      renderLowInventoryWidget({ items: fewProducts, loading: false });
      
      expect(screen.queryByText(/View \d+ more low stock items/)).not.toBeInTheDocument();
    });

    it('should show "Manage Inventory" link when exactly 5 items', () => {
      const exactlyFiveProducts = Array.from({ length: 5 }, (_, i) =>
        createMockProduct({
          sku: `PROD-${i + 1}`,
          name: `Product ${i + 1}`,
        })
      );

      renderLowInventoryWidget({ items: exactlyFiveProducts, loading: false });
      
      expect(screen.getByText('Manage Inventory')).toBeInTheDocument();
      expect(screen.queryByText(/View \d+ more low stock items/)).not.toBeInTheDocument();
    });
  });

  describe('platform handling', () => {
    it('should handle different platforms', () => {
      const multiPlatformProducts = [
        createMockProduct({
          sku: 'AMZ-001',
          name: 'Amazon Product',
          platform: 'amazon',
        }),
        createMockProduct({
          sku: 'FLP-001',
          name: 'Flipkart Product',
          platform: 'flipkart',
        }),
      ];

      renderLowInventoryWidget({ items: multiPlatformProducts, loading: false });
      
      expect(screen.getByText('Amazon Product')).toBeInTheDocument();
      expect(screen.getByText('Flipkart Product')).toBeInTheDocument();
    });

    it('should use unique keys for products with same SKU on different platforms', () => {
      const sameSkuProducts = [
        createMockProduct({
          sku: 'SAME-SKU',
          name: 'Amazon Version',
          platform: 'amazon',
        }),
        createMockProduct({
          sku: 'SAME-SKU',
          name: 'Flipkart Version',
          platform: 'flipkart',
        }),
      ];

      renderLowInventoryWidget({ items: sameSkuProducts, loading: false });
      
      expect(screen.getByText('Amazon Version')).toBeInTheDocument();
      expect(screen.getByText('Flipkart Version')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      const mockProducts = [createMockProduct()];
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      const heading = screen.getByRole('heading', { name: 'Low Stock Alerts' });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible list structure', () => {
      const mockProducts = [createMockProduct(), createMockProduct({ sku: 'PROD-002' })];
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('should have accessible links', () => {
      const mockProducts = [createMockProduct()];
      renderLowInventoryWidget({ items: mockProducts, loading: false });
      
      const manageLink = screen.getByRole('link', { name: 'Manage Inventory' });
      expect(manageLink).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle products with missing inventory quantity', () => {
      const productWithoutQuantity = createMockProduct({
        inventory: {
          quantity: undefined as unknown as number, // Simulating missing quantity
          lowStockThreshold: 10,
          lastUpdated: Timestamp.now(),
        },
      });

      renderLowInventoryWidget({ items: [productWithoutQuantity], loading: false });
      
      expect(screen.getByText('0 in stock')).toBeInTheDocument();
    });

    it('should handle products with zero inventory', () => {
      const zeroInventoryProduct = createMockProduct({
        inventory: { quantity: 0, lowStockThreshold: 10, lastUpdated: Timestamp.now() },
      });

      renderLowInventoryWidget({ items: [zeroInventoryProduct], loading: false });
      
      expect(screen.getByText('0 in stock')).toBeInTheDocument();
    });

    it('should handle empty product names', () => {
      const emptyNameProduct = createMockProduct({
        name: '',
        sku: 'EMPTY-NAME',
      });

      renderLowInventoryWidget({ items: [emptyNameProduct], loading: false });
      
      expect(screen.getByText('SKU: EMPTY-NAME')).toBeInTheDocument();
    });
  });

  describe('theme integration', () => {
    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const mockProducts = [createMockProduct()];

      render(
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <LowInventoryWidget items={mockProducts} loading={false} />
          </ThemeProvider>
        </BrowserRouter>
      );
      
      expect(screen.getByText('Low Stock Alerts')).toBeInTheDocument();
    });
  });
}); 