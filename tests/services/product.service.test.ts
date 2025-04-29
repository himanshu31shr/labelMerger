import { Timestamp } from 'firebase/firestore';
import { ProductService } from '../../src/services/product.service';
import * as XLSX from 'xlsx';

// Mock Firebase modules
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 }))
  }
}));

jest.mock('xlsx', () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn()
  }
}));

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  describe('parseXLSXFile', () => {
    it('should parse Amazon format correctly', async () => {
      const mockFile = {
        name: 'test.xlsx',
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8))
      } as unknown as File;
      
      const mockData = [{
        sku: 'TEST-SKU',
        description: 'Test Product'
      }];

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockData);

      const result = await service.parseXLSXFile(mockFile);

      expect(result[0]).toEqual({
        sku: 'TEST-SKU',
        name: 'Test Product',
        description: 'Test Product',
        costPrice: 0,
        platform: 'amazon',
        metadata: {
          createdAt: expect.any(Object),
          updatedAt: expect.any(Object),
          lastImportedFrom: 'amazon_import'
        }
      });
    });

    it('should parse Flipkart format correctly', async () => {
      const mockFile = {
        name: 'test.xlsx',
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8))
      } as unknown as File;

      const mockData = [{
        'Seller SKU Id': 'TEST-SKU',
        'Product Title': 'Test Product',
        'Product Name': 'Test Product',
        'Your Selling Price': '100',
        'Listing Status': 'Active',
        'Minimum Order Quantity': '1',
        'Flipkart Serial Number': 'FSN123'
      }];

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockData);

      const result = await service.parseXLSXFile(mockFile);

      expect(result[0]).toEqual({
        sku: 'TEST-SKU',
        name: 'Test Product',
        description: 'Test Product',
        sellingPrice: 100,
        costPrice: 0,
        platform: 'flipkart',
        metadata: {
          listingStatus: 'Active',
          moq: '1',
          flipkartSerialNumber: 'FSN123'
        }
      });
    });

    it('should throw error for unsupported format', async () => {
      const mockFile = {
        name: 'test.xlsx',
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8))
      } as unknown as File;
      
      const mockData = [{ unsupported: 'format' }];

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockData);

      await expect(service.parseXLSXFile(mockFile)).rejects.toThrow('Unsupported file format');
    });
  });

  describe('getProducts', () => {
    it('should apply filters correctly', async () => {
      const mockProducts = [
        {
          sku: 'TEST-1',
          name: 'Test Product 1',
          platform: 'amazon'
        }
      ];

      (service as any).getDocuments = jest.fn().mockResolvedValue(mockProducts);

      const result = await service.getProducts({
        platform: 'amazon',
        search: 'test'
      });

      expect(result).toEqual(mockProducts);
    });
  });
});