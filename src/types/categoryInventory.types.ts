import { Timestamp } from 'firebase/firestore';

export interface CategoryInventory {
  totalQuantity: number;
  lowStockThreshold: number;
  lastUpdated: Date | Timestamp;
  productCount: number;
  reservedQuantity?: number; // For future use - inventory reserved for orders
}

export interface CategoryWithInventory {
  id: string;
  name: string;
  description?: string;
  tag?: string;
  costPrice?: number | null;
  inventory: CategoryInventory;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface InventoryOperation {
  id: string;
  categoryId: string;
  type: 'add' | 'remove' | 'transfer' | 'adjustment';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  performedBy: string;
  timestamp: Date | Timestamp;
  metadata?: Record<string, unknown>;
}

export interface MigrationResult {
  success: boolean;
  categoriesMigrated: number;
  totalProductsProcessed: number;
  errors: string[];
  warnings: string[];
  startTime: Date;
  endTime: Date;
  duration: number; // in milliseconds
}

export interface ValidationResult {
  isValid: boolean;
  totalDiscrepancies: number;
  categoryDiscrepancies: Array<{
    categoryId: string;
    categoryName: string;
    expectedQuantity: number;
    actualQuantity: number;
    difference: number;
  }>;
  orphanedProducts: string[]; // Products without valid categories
  duplicateProducts: string[]; // Products found in multiple categories
}

export interface MigrationRule {
  categoryId: string;
  categoryName: string;
  products: Array<{
    sku: string;
    name: string;
    quantity: number;
    lowStockThreshold: number;
  }>;
  aggregatedQuantity: number;
  lowStockThreshold: number;
  productCount: number;
}

export interface InventoryTransfer {
  fromCategoryId: string;
  toCategoryId: string;
  quantity: number;
  reason?: string;
  productSkus?: string[]; // If transfer is due to product category changes
}

export interface LowStockAlert {
  categoryId: string;
  categoryName: string;
  currentQuantity: number;
  lowStockThreshold: number;
  severity: 'low' | 'critical' | 'out-of-stock';
  productCount: number;
  lastRestocked?: Date | Timestamp;
}

export interface InventoryReport {
  totalCategories: number;
  totalQuantity: number;
  lowStockCategories: number;
  outOfStockCategories: number;
  categories: Array<{
    id: string;
    name: string;
    quantity: number;
    threshold: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
    productCount: number;
  }>;
  generatedAt: Date | Timestamp;
}

// Feature flag types
export interface FeatureFlags {
  USE_CATEGORY_INVENTORY: boolean;
  MIGRATION_MODE: boolean;
  SHOW_MIGRATION_UI: boolean;
  ENABLE_DUAL_SYSTEM: boolean;
}

// Migration status tracking
export interface MigrationStatus {
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'rolled-back';
  progress: number; // 0-100
  currentPhase: string;
  startedAt?: Date | Timestamp;
  completedAt?: Date | Timestamp;
  lastError?: string;
  categoriesProcessed: number;
  totalCategories: number;
} 