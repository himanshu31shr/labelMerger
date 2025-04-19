export interface Transaction {
  date: string;
  settlementId: string;
  type: string;
  orderId: string;
  sku: string;
  description: string;
  quantity: string;
  marketplace: string;
  accountType: string;
  fulfillment: string;
  orderCity: string;
  orderState: string;
  orderPostal: string;
  productSales: string;
  shippingCredits: string;
  giftWrapCredits: string;
  promotionalRebates: string;
  totalSalesTaxLiable: string;
  tcsCgst: string;
  tcsSgst: string;
  tcsIgst: string;
  tds: string;
  sellingFees: string;
  fbaFees: string;
  otherTransactionFees: string;
  other: string;
  total: string;
}

export interface ProductPrice {
  sku: string;
  basePrice: number;
  costPrice: number;
  description?: string;
}

export interface ProductPriceFormData {
  sku: string;
  basePrice: string;
  costPrice: string;
  description: string;
}

export interface PriceManagementModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (prices: ProductPrice[]) => void;
  initialPrices: ProductPrice[];
  availableProducts: { sku: string; description: string }[];
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