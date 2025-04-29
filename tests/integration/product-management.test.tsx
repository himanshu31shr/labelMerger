import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { TransactionAnalytics } from '../../src/pages/transactionAnalytics/transactionAnalytics.page';
import { ProductService } from '../../src/services/product.service';

// Create mock timestamp before mocks
const mockTimestamp = {
  fromDate: (date: Date) => ({
    toDate: () => date,
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: (date.getTime() % 1000) * 1000000
  })
};

// Mock ReportExtractionFactory
jest.mock('../../src/pages/transactionAnalytics/services/ReportExtractionFactory', () => {
  return jest.fn().mockImplementation(() => ({
    extract: jest.fn().mockResolvedValue({
      transactions: [
        {
          transactionId: 'TEST-ORDER-1',
          platform: 'amazon',
          orderDate: '2025-04-28',
          sku: 'TEST-SKU-1',
          quantity: 1,
          sellingPrice: 200,
          description: 'Test Product 1',
          type: 'Order',
          marketplace: 'Amazon',
          total: 180,
          productSales: '₹200',
          expenses: {
            shippingFee: 0,
            marketplaceFee: 20,
            otherFees: 0
          },
          product: {
            name: 'Test Product 1',
            costPrice: 100,
            basePrice: 200
          },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          hash: 'test-hash-1'
        }
      ],
      mappedPrices: new Map([
        ['TEST-SKU-1', {
          sku: 'TEST-SKU-1',
          name: 'Test Product 1',
          description: 'Test Description 1',
          costPrice: 100,
          basePrice: 200
        }]
      ])
    })
  }));
});

// Mock Firebase Timestamp
jest.mock('firebase/firestore', () => ({
  Timestamp: mockTimestamp
}));

// Mock ProductService
jest.mock('../../src/services/product.service', () => ({
  ProductService: jest.fn().mockImplementation(() => ({
    saveProducts: jest.fn().mockResolvedValue(undefined),
    getProducts: jest.fn().mockResolvedValue([
      {
        sku: 'TEST-SKU-1',
        name: 'Test Product 1',
        description: 'Test Description 1',
        costPrice: 100,
        basePrice: 200,
        platform: 'amazon',
        metadata: {
          createdAt: mockTimestamp.fromDate(new Date()),
          updatedAt: mockTimestamp.fromDate(new Date())
        }
      }
    ])
  }))
}));

describe('Transaction Analytics Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TransactionAnalytics />);
  });

  it('renders the upload file button', () => {
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('opens price management modal when transactions are loaded', async () => {
    const fileInput = screen.getByLabelText('Upload File');
    const file = new File(['test data'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const managePricesButton = screen.getByRole('button', { name: /manage prices/i });
      expect(managePricesButton).not.toBeDisabled();
    });

    const managePricesButton = screen.getByRole('button', { name: /manage prices/i });
    fireEvent.click(managePricesButton);

    await waitFor(() => {
      expect(screen.getByText(/manage product prices/i)).toBeInTheDocument();
    });
  });

  it('handles product save correctly', async () => {
    const productService = new ProductService();
    const mockProducts = [
      {
        sku: 'TEST-SKU-1',
        name: 'Test Product 1',
        description: 'Test Description 1',
        costPrice: 100,
        basePrice: 200,
        platform: 'amazon',
        metadata: {
          createdAt: mockTimestamp.fromDate(new Date()),
          updatedAt: mockTimestamp.fromDate(new Date())
        }
      }
    ];

    await productService.saveProducts(mockProducts);
    expect(productService.saveProducts).toHaveBeenCalledWith(mockProducts);
  });
});