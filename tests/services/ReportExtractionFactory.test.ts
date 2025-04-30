import ReportExtractionFactory from '../../src/pages/transactionAnalytics/services/ReportExtractionFactory';
import { AmazonFactory } from '../../src/pages/transactionAnalytics/services/AmazonFactory';
import FlipkartFactory from '../../src/pages/transactionAnalytics/services/FlipkartFactory';

jest.mock('../../src/pages/transactionAnalytics/services/AmazonFactory');
jest.mock('../../src/pages/transactionAnalytics/services/FlipkartFactory');

describe('ReportExtractionFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock implementations to reject unsupported types
    (AmazonFactory as jest.Mock).mockImplementation(() => ({
      process: () => Promise.reject(new Error('Unsupported file type'))
    }));
    (FlipkartFactory as jest.Mock).mockImplementation(() => ({
      process: () => Promise.reject(new Error('Unsupported file type'))
    }));
  });

  describe('platform detection', () => {
    it('should detect Amazon platform for CSV files', () => {
      const file = new File([''], 'test.csv', { type: 'text/csv' });
      const factory = new ReportExtractionFactory(file);
      expect(factory['reportType']).toBe('Amazon');
    });

    it('should detect Flipkart platform for XLSX files', () => {
      const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const factory = new ReportExtractionFactory(file);
      expect(factory['reportType']).toBe('Flipkart');
    });

    it('should throw error for unsupported file types', async () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const factory = new ReportExtractionFactory(file);
      await expect(factory.extract()).rejects.toThrow('Unsupported file type');
    });
  });

  describe('file validation', () => {
    it('should throw error when no file is provided', () => {
      expect(() => new ReportExtractionFactory(undefined)).toThrow('No file selected');
    });

    it('should initialize with valid file', () => {
      const file = new File([''], 'test.csv', { type: 'text/csv' });
      expect(() => new ReportExtractionFactory(file)).not.toThrow();
    });
  });

  describe('factory instantiation', () => {
    beforeEach(() => {
      // Reset mock implementations for successful cases
      (AmazonFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.resolve([])
      }));
      (FlipkartFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.resolve([])
      }));
    });

    it('should create AmazonFactory for CSV files', async () => {
      const file = new File([''], 'test.csv', { type: 'text/csv' });
      const factory = new ReportExtractionFactory(file);
      await factory.extract();
      expect(AmazonFactory).toHaveBeenCalledWith(file);
    });

    it('should create FlipkartFactory for XLSX files', async () => {
      const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const factory = new ReportExtractionFactory(file);
      await factory.extract();
      expect(FlipkartFactory).toHaveBeenCalledWith(file);
    });
  });

  describe('error handling', () => {
    it('should handle processing errors from Amazon factory', async () => {
      const file = new File([''], 'test.csv', { type: 'text/csv' });
      const factory = new ReportExtractionFactory(file);
      const error = new Error('Processing failed');
      (AmazonFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.reject(error)
      }));
      await expect(factory.extract()).rejects.toThrow('Processing failed');
    });

    it('should handle processing errors from Flipkart factory', async () => {
      const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const factory = new ReportExtractionFactory(file);
      const error = new Error('Processing failed');
      (FlipkartFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.reject(error)
      }));
      await expect(factory.extract()).rejects.toThrow('Processing failed');
    });
  });

  describe('successful processing', () => {
    const mockTransactions = [
      {
        id: 1,
        platform: 'amazon',
        // ... other transaction fields
      }
    ];

    it('should return processed transactions from Amazon factory', async () => {
      const file = new File([''], 'test.csv', { type: 'text/csv' });
      const factory = new ReportExtractionFactory(file);
      (AmazonFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.resolve(mockTransactions)
      }));
      const result = await factory.extract();
      expect(result).toEqual(mockTransactions);
    });

    it('should return processed transactions from Flipkart factory', async () => {
      const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const factory = new ReportExtractionFactory(file);
      (FlipkartFactory as jest.Mock).mockImplementation(() => ({
        process: () => Promise.resolve(mockTransactions)
      }));
      const result = await factory.extract();
      expect(result).toEqual(mockTransactions);
    });
  });
});