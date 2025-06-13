export interface Product {
  sku: string;
  name: string;
  description: string;
  categoryId: string; // Required for cost price inheritance from category
  platform: "amazon" | "flipkart";
  visibility: "visible" | "hidden";
  sellingPrice: number;
  customCostPrice: number | null; // Custom cost price that overrides category cost price
  inventory?: {
    quantity: number;
    lowStockThreshold: number;
    lastUpdated: Date;
  };
  metadata: {
    createdAt?: Date;
    updatedAt?: Date;
    lastImportedFrom?: string;
    listingStatus?: string;
    moq?: string;
    flipkartSerialNumber?: string;
    amazonSerialNumber?: string;
    existsOnSellerPage?: boolean;
  };
  competitionAnalysis?: {
    competitorName: string;
    competitorPrice: string;
    ourPrice: number;
    visibility: string;
    existsOnSellerPage: boolean;
    totalSellers: number;
  };
  existsOnSellerPage?: boolean;
}
