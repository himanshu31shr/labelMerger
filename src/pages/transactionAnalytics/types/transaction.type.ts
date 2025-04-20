export interface Transaction {
  date: string;
  type: string;
  orderId: string;
  sku: string;
  description: string;
  quantity: string;
  marketplace: 'Amazon' | 'Flipkart';
  orderStatus?: string;
  accNetSales?: number;
  expenses?: number;
  // Amazon specific fields
  settlementId?: string;
  accountType?: string;
  fulfillment?: string;
  orderCity?: string;
  orderState?: string;
  orderPostal?: string;
  productSales?: string;
  shippingCredits?: string;
  giftWrapCredits?: string;
  promotionalRebates?: string;
  totalSalesTaxLiable?: string;
  tcsCgst?: string;
  tcsSgst?: string;
  tcsIgst?: string;
  tds?: string;
  sellingFees?: string;
  fbaFees?: string;
  otherTransactionFees?: string;
  other?: string;
  total?: string;
}

export interface ProductPrice {
  sku: string;
  description?: string;
  basePrice: number;
  costPrice: number;
}

export interface TransactionSummary {
  totalSales: number;
  totalExpenses: number;
  totalUnits: number;
  totalCost: number;
  expensesByCategory: {
    [key: string]: number;
  };
  salesByProduct: {
    [sku: string]: {
      units: number;
      amount: number;
      profit: number;
      profitPerUnit: number;
      description?: string;
    };
  };
  totalProfit: number;
}