import { Transaction } from '../../src/types/transaction.type';

export const mockTransactions: Transaction[] = [
  {
    transactionId: 'TX1',
    sku: 'TEST-1',
    platform: 'amazon',
    orderDate: '2025-01-01',
    quantity: 1,
    sellingPrice: 200,
    description: 'Test Product',
    type: 'order',
    marketplace: 'Amazon',
    total: 180,
    productSales: '200',
    expenses: {
      shippingFee: 0,
      marketplaceFee: 20,
      otherFees: 0
    },
    product: {
      name: 'Test Product',
      costPrice: 150,
      sku: 'TEST-1',
      description: 'Test Product',
      platform: 'amazon',
      metadata: {}
    },
    metadata: {
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01'
    },
    hash: 'test-hash'
  }
];

export const TransactionServiceMock = {
  getTransactions: jest.fn().mockResolvedValue(mockTransactions),
  saveTransactions: jest.fn().mockResolvedValue(undefined)
};