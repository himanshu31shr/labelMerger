export interface Transaction {
  transactionId: string;
  platform: 'amazon' | 'flipkart';
  orderDate: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
  description?: string;
  type?: string;
  marketplace?: string;
  orderStatus?: string;
  total?: number;
  productSales?: string | number;
  accNetSales?: number;
  sellingFees?: string | number;
  fbaFees?: string | number;
  otherTransactionFees?: string | number;
  other?: string | number;
  expenses: {
    shippingFee: number;
    marketplaceFee: number;
    otherFees: number;
  };
  product: {
    name: string;
    costPrice: number;
    basePrice: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
  hash: string;
}

export interface ProductPrice {
  sku: string;
  name?: string;
  description?: string;
  costPrice?: number;
  basePrice?: number;
}

export interface TransactionSummary {
  totalSales: number;
  totalExpenses: number;
  expensesByCategory: {
    [key: string]: number;
  };
  salesByProduct: {
    [sku: string]: {
      units: number;
      amount: number;
      profit: number;
      profitPerUnit: number;
      name: string;
      description?: string;
    };
  };
  totalProfit: number;
  totalUnits: number;
  totalCost: number;
}

export interface PriceMapping {
  [sku: string]: ProductPrice;
}