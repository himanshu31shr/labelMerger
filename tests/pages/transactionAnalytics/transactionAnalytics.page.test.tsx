import { MockTimestamp } from '../../mocks/mockTimestamp';

// Mock firestore next
jest.mock('firebase/firestore', () => ({
  Timestamp: MockTimestamp,
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  limit: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn()
}));

// Mock product service to avoid orderBy issues
jest.mock('../../../src/services/product.service', () => ({
  ProductService: jest.fn().mockImplementation(() => ({
    getProducts: jest.fn().mockResolvedValue([
      {
        id: 'PROD1',
        sku: 'TEST-SKU',
        costPrice: 80,
        description: 'Test Product',
        platform: 'amazon'
      }
    ])
  }))
}));

// Mock TransactionAnalysisService
jest.mock('../../../src/services/transactionAnalysis.service', () => ({
  TransactionAnalysisService: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      totalTransactions: 1,
      totalRevenue: 100,
      totalCost: 80,
      totalProfit: 20,
      averageOrderValue: 100,
      profitMargin: 20
    })
  }))
}));

// Then import React and testing utilities
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TransactionAnalytics } from '../../../src/pages/transactionAnalytics/transactionAnalytics.page';

// Mock transaction service
jest.mock('../../../src/services/transaction.service', () => ({
  TransactionService: jest.fn().mockImplementation(() => ({
    getTransactions: jest.fn().mockResolvedValue([
      {
        transactionId: 'TX1',
        platform: 'amazon',
        type: 'order',
        sku: 'TEST-SKU',
        quantity: 1,
        sellingPrice: 100,
        description: 'Test Product',
        orderDate: '2025-01-01',
        expenses: {
          marketplaceFee: 10,
          otherFees: 5,
          shippingFee: 0
        },
        total: 85
      }
    ])
  }))
}));

describe('TransactionAnalytics Page', () => {
  it('displays transaction data', async () => {
    render(
      <BrowserRouter>
        <TransactionAnalytics />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });
});