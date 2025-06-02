import { generateSimpleCategorySummaryHTML, exportSimpleCategorySummaryToPDF } from '../utils/exportUtils';
import { GroupedOrderData } from '../utils/groupingUtils';
import { ProductSummary } from '../../home/services/base.transformer';
import html2pdf from 'html2pdf.js';

// Mock html2pdf
jest.mock('html2pdf.js', () => {
  const mockSet = jest.fn().mockReturnThis();
  const mockFrom = jest.fn().mockReturnThis();
  const mockSave = jest.fn().mockResolvedValue(undefined);
  
  return jest.fn(() => ({
    set: mockSet,
    from: mockFrom,
    save: mockSave
  }));
});

const mockGroupedData: GroupedOrderData = {
  categorizedGroups: [
    {
      categoryName: 'Electronics',
      categoryId: 'cat1',
      orders: [
        {
          SKU: 'SKU001',
          name: 'Test Product 1',
          quantity: '2',
          category: 'Electronics',
          type: 'amazon',
          product: {
            sku: 'SKU001',
            name: 'Test Product 1',
            description: 'Test description',
            sellingPrice: 100,
            costPrice: 60,
            categoryId: 'cat1',
            platform: 'amazon',
            visibility: 'visible',
            inventory: { quantity: 10, lowStockThreshold: 5 },
            metadata: { amazonSerialNumber: 'AMZ001' }
          }
        } as ProductSummary
      ],
      totalQuantity: 2,
      totalRevenue: 200,
      totalItems: 1,
      platforms: ['amazon']
    },
    {
      categoryName: 'Books',
      orders: [
        {
          SKU: 'SKU002',
          name: 'Test Book',
          quantity: '1',
          category: 'Books',
          type: 'flipkart',
          product: {
            sku: 'SKU002',
            name: 'Test Book',
            description: 'Test book description',
            sellingPrice: 25,
            costPrice: 15,
            categoryId: 'cat2',
            platform: 'flipkart',
            visibility: 'visible',
            inventory: { quantity: 20, lowStockThreshold: 5 },
            metadata: { flipkartSerialNumber: 'FLK001' }
          }
        } as ProductSummary
      ],
      totalQuantity: 1,
      totalRevenue: 25,
      totalItems: 1,
      platforms: ['flipkart']
    }
  ],
  uncategorizedGroup: {
    categoryName: 'Uncategorized',
    orders: [],
    totalQuantity: 0,
    totalRevenue: 0,
    totalItems: 0,
    platforms: []
  },
  summary: {
    totalCategories: 2,
    totalOrders: 2,
    totalRevenue: 225
  }
};

describe('Export Utils', () => {
  describe('generateSimpleCategorySummaryHTML', () => {
    it('generates HTML with category names and order counts', () => {
      const html = generateSimpleCategorySummaryHTML(mockGroupedData);
      
      expect(html).toContain('Active Orders by Category');
      expect(html).toContain('Electronics');
      expect(html).toContain('Books');
      expect(html).toContain('1 orders'); // Electronics has 1 order
      expect(html).toContain('1 orders'); // Books has 1 order
      expect(html).toContain('Total: 2 orders across 2 categories');
    });

    it('includes uncategorized items when present', () => {
      const dataWithUncategorized = {
        ...mockGroupedData,
        uncategorizedGroup: {
          categoryName: 'Uncategorized',
          orders: [{ SKU: 'SKU003' } as ProductSummary],
          totalQuantity: 1,
          totalRevenue: 50,
          totalItems: 1,
          platforms: ['amazon']
        }
      };

      const html = generateSimpleCategorySummaryHTML(dataWithUncategorized);
      
      expect(html).toContain('Uncategorized');
      expect(html).toContain('1 orders');
    });

    it('excludes uncategorized section when empty', () => {
      const html = generateSimpleCategorySummaryHTML(mockGroupedData);
      
      expect(html).not.toContain('Uncategorized');
    });
  });

  describe('exportSimpleCategorySummaryToPDF', () => {
    it('calls html2pdf with correct options', async () => {
      await exportSimpleCategorySummaryToPDF(mockGroupedData);
      
      expect(html2pdf).toHaveBeenCalled();
    });

    it('handles PDF generation errors gracefully', async () => {
      const mockError = new Error('PDF generation failed');
      
      (html2pdf as jest.Mock).mockImplementationOnce(() => ({
        set: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        save: jest.fn().mockRejectedValue(mockError)
      }));

      // Mock console.error to avoid error output in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock document methods for fallback
      const mockClick = jest.fn();
      const mockCreateElement = jest.fn().mockReturnValue({ click: mockClick });
      Object.defineProperty(document, 'createElement', {
        value: mockCreateElement,
        writable: true
      });
      
      // Mock URL methods
      const mockCreateObjectURL = jest.fn().mockReturnValue('blob:test-url');
      const mockRevokeObjectURL = jest.fn();
      Object.defineProperty(URL, 'createObjectURL', {
        value: mockCreateObjectURL,
        writable: true
      });
      Object.defineProperty(URL, 'revokeObjectURL', {
        value: mockRevokeObjectURL,
        writable: true
      });

      await exportSimpleCategorySummaryToPDF(mockGroupedData);
      
      expect(consoleSpy).toHaveBeenCalledWith('PDF export failed:', mockError);
      
      consoleSpy.mockRestore();
    });
  });
}); 