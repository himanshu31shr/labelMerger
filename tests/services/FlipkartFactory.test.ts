import FlipkartFactory from '../../src/pages/transactionAnalytics/services/FlipkartFactory';
import * as XLSX from 'xlsx';
import { FlipkartOrderData } from '../../src/types/types';

// Mock XLSX with specific implementation
jest.mock('xlsx', () => {
  const actualXLSX = jest.requireActual('xlsx');
  return {
    ...actualXLSX,
    read: jest.fn(),
    utils: {
      ...actualXLSX.utils,
      sheet_to_json: jest.fn()
    }
  };
});

describe('FlipkartFactory', () => {
  const mockXlsxData: FlipkartOrderData[] = [
    {
      'Order ID': 'OD123',
      'Order Date': '2023-01-01',
      'SKU': 'TEST-SKU-1',
      'SKU Name': 'Test Product',
      'Gross Units': 1,
      'Final Selling Price (incl. seller opted in default offers)': '₹1,234.56',
      'Order Status': 'delivered',
      'Net Earnings (INR)': '₹950.00',
      'Accounted Net Sales (INR)': '₹1,234.56',
      'Bank Settlement [Projected] (INR)': '₹950.00',
      'Commission (INR)': '₹123.45',
      'Shipping Fee (INR)': '₹0.00',
      'Total Expenses (INR)': '₹161.11',
      'Type': 'order'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    const mockWorkbook = {
      SheetNames: ['Orders P&L'],
      Sheets: {
        'Orders P&L': {
          'A1': { v: 'Order ID' },
          'B1': { v: 'Order Date' },
          'C1': { v: 'SKU' },
          'D1': { v: 'SKU Name' },
          'E1': { v: 'Gross Units' },
          'F1': { v: 'Final Selling Price (incl. seller opted in default offers)' },
          'G1': { v: 'Order Status' },
          'H1': { v: 'Net Earnings (INR)' },
          'I1': { v: 'Accounted Net Sales (INR)' },
          'J1': { v: 'Bank Settlement [Projected] (INR)' },
          'K1': { v: 'Commission (INR)' },
          'L1': { v: 'Shipping Fee (INR)' },
          'M1': { v: 'Total Expenses (INR)' },
          'N1': { v: 'Type' },
          'A2': { v: 'OD123' },
          'B2': { v: '2023-01-01' },
          'C2': { v: 'TEST-SKU-1' },
          'D2': { v: 'Test Product' },
          'E2': { v: 1 },
          'F2': { v: '₹1,234.56' },
          'G2': { v: 'delivered' },
          'H2': { v: '₹950.00' },
          'I2': { v: '₹1,234.56' },
          'J2': { v: '₹950.00' },
          'K2': { v: '₹123.45' },
          'L2': { v: '₹0.00' },
          'M2': { v: '₹161.11' },
          'N2': { v: 'order' },
          '!ref': 'A1:N2'
        }
      }
    };
    (XLSX.read as jest.Mock).mockReturnValue(mockWorkbook);
    (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockXlsxData);
  });

  it('should transform Flipkart order data correctly', async () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    Object.defineProperty(file, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    const factory = new FlipkartFactory(file);
    const result = await factory.process();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      transactionId: 'OD123',
      platform: 'flipkart',
      orderDate: '2023-01-01',
      sku: 'TEST-SKU-1',
      quantity: 1,
      sellingPrice: 1234.56,
      description: 'Test Product',
      type: 'delivered',
      marketplace: 'Flipkart',
      orderStatus: 'delivered',
      total: 950,
      productSales: 1234.56,
      accNetSales: 950,
      expenses: {
        shippingFee: 0,
        marketplaceFee: 123.45,
        otherFees: 161.11
      },
      product: {
        name: 'Test Product',
        costPrice: 0,
        sku: 'TEST-SKU-1',
        description: 'Test Product',
        platform: 'flipkart',
        metadata: {}
      },
      metadata: {
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      },
      hash: expect.any(String)
    });
  });

  it('should handle missing data gracefully', async () => {
    const incompleteData: FlipkartOrderData[] = [{
      'Order ID': '',
      'Order Date': '',
      'SKU': '',
      'SKU Name': '',
      'Gross Units': 0,
      'Final Selling Price (incl. seller opted in default offers)': '',
      'Order Status': '',
      'Net Earnings (INR)': '',
      'Accounted Net Sales (INR)': '',
      'Bank Settlement [Projected] (INR)': '',
      'Commission (INR)': '',
      'Shipping Fee (INR)': '',
      'Total Expenses (INR)': '',
      'Type': ''
    }];

    (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(incompleteData);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    Object.defineProperty(file, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    const factory = new FlipkartFactory(file);
    const result = await factory.process();

    expect(result).toHaveLength(0);
  });

  it('should handle invalid sheet name', async () => {
    const mockWorkbookWithoutSheet = {
      SheetNames: ['Wrong Sheet'],
      Sheets: {}
    };
    (XLSX.read as jest.Mock).mockReturnValue(mockWorkbookWithoutSheet);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    Object.defineProperty(file, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    const factory = new FlipkartFactory(file);
    await expect(factory.process()).rejects.toThrow("Required sheet 'Orders P&L' not found");
  });
});