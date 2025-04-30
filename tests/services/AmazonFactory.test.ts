import { AmazonFactory } from '../../src/pages/transactionAnalytics/services/AmazonFactory';
import Papa from 'papaparse';

jest.mock('papaparse');

describe('AmazonFactory', () => {
  describe('currency handling', () => {
    it('should parse Indian currency format correctly', async () => {
      const mockData = {
        data: [{
          'order id': 'ORDER123',
          'date/time': '2023-01-01',
          'type': 'order',
          'sku': 'TEST-SKU',
          'quantity': '1',
          'product sales': '₹1,234.56',
          'total': '₹950.00',
          'selling fees': '-₹123.45',
          'fba fees': '-₹161.11',
          'other transaction fees': '-₹0.00',
          'description': 'Test Product'
        }]
      };

      (Papa.parse as jest.Mock).mockImplementation((_, options) => {
        options.complete(mockData);
      });

      const file = new File([''], 'test.csv', { type: 'text/csv' });
      const factory = new AmazonFactory(file);
      const result = await factory.process();
      
      expect(result[0]).toMatchObject({
        transactionId: 'ORDER123',
        platform: 'amazon',
        sku: 'TEST-SKU',
        quantity: 1,
        sellingPrice: 1234.56,
        total: 950.00,
        expenses: {
          marketplaceFee: 123.45,
          otherFees: 161.11,
          shippingFee: 0
        }
      });
    });
  });
});