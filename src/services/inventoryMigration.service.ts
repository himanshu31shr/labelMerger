import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  Timestamp,
  runTransaction,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase.config';
import { 
  MigrationResult, 
  ValidationResult, 
  MigrationRule, 
  CategoryInventory,
  MigrationStatus
} from '../types/categoryInventory.types';
import { Product, ProductService } from './product.service';
import { Category, CategoryService } from './category.service';
import { categoryInventoryService } from './categoryInventory.service';

interface MigrationAnalysis {
  totalCategories: number;
  categoriesWithProducts: number;
  uncategorizedProducts: number;
  migrationRules: MigrationRule[];
  uncategorizedCategoryId: string;
}

export class InventoryMigrationService {
  private readonly productsCollection = 'products';
  private readonly categoriesCollection = 'categories';
  private readonly migrationStatusCollection = 'migrationStatus';
  private readonly UNCATEGORIZED_CATEGORY_ID = 'uncategorized';
  private readonly categoryService: CategoryService;
  private readonly productService: ProductService;

  constructor() {
    this.categoryService = new CategoryService();
    this.productService = new ProductService();
  }

  /**
   * Analyze current product inventory and create migration rules
   */
  async analyzeMigration(): Promise<MigrationAnalysis> {
    try {
      const categories = await this.categoryService.getCategories();
      const products = await this.productService.getProducts();

      // Create "Uncategorized" category if it doesn't exist
      let uncategorizedCategory = categories.find((cat: Category) => cat.name.toLowerCase() === 'uncategorized');
      if (!uncategorizedCategory) {
        const categoryId = await this.categoryService.createCategory({ name: 'Uncategorized', description: 'Products without assigned categories' });
        uncategorizedCategory = { id: categoryId, name: 'Uncategorized', description: 'Products without assigned categories' };
      }

      // Analyze products and create migration rules
      const migrationRules: MigrationRule[] = [];
      const categoryProductCounts = new Map<string, { products: Product[], totalQuantity: number }>();

      for (const product of products) {
        if (!product.categoryId) {
          // Product has no category, will be moved to uncategorized
          continue;
        }

        const category = categories.find((cat: Category) => cat.id === product.categoryId);
        if (!category) {
          // Category doesn't exist, move product to uncategorized
          continue;
        }

        // Aggregate products per category
        const existing = categoryProductCounts.get(product.categoryId) || { products: [], totalQuantity: 0 };
        existing.products.push(product);
        existing.totalQuantity += product.inventory?.quantity || 0;
        categoryProductCounts.set(product.categoryId, existing);
      }

      // Create migration rules for categories with products
      for (const [categoryId, data] of categoryProductCounts) {
        const category = categories.find((cat: Category) => cat.id === categoryId);
        if (category) {
          migrationRules.push({
            categoryId,
            categoryName: category.name,
            products: data.products.map(p => ({
              sku: p.sku,
              name: p.name,
              quantity: p.inventory?.quantity || 0,
              lowStockThreshold: p.inventory?.lowStockThreshold || 5
            })),
            aggregatedQuantity: data.totalQuantity,
            lowStockThreshold: Math.min(...data.products.map(p => p.inventory?.lowStockThreshold || 5)),
            productCount: data.products.length
          });
        }
      }

      return {
        totalCategories: categories.length,
        categoriesWithProducts: migrationRules.length,
        uncategorizedProducts: products.filter((p: Product) => !p.categoryId || !categories.find((cat: Category) => cat.id === p.categoryId)).length,
        migrationRules,
        uncategorizedCategoryId: uncategorizedCategory.id || this.UNCATEGORIZED_CATEGORY_ID,
      };
    } catch (error: unknown) {
      throw new Error(`Migration analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute the migration from product-based to category-based inventory
   */
  async executeMigration(): Promise<MigrationResult> {
    const startTime = new Date();
    let categoriesMigrated = 0;
    let totalProductsProcessed = 0;
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Update migration status
      await this.updateMigrationStatus({
        status: 'in-progress',
        progress: 0,
        currentPhase: 'Analyzing data',
        startedAt: Timestamp.fromDate(startTime),
        categoriesProcessed: 0,
        totalCategories: 0
      });

      // Get migration rules
      const migrationAnalysis = await this.analyzeMigration();
      
      await this.updateMigrationStatus({
        status: 'in-progress',
        progress: 10,
        currentPhase: 'Migrating inventory data',
        totalCategories: migrationAnalysis.migrationRules.length,
        categoriesProcessed: 0
      });

      // Process migration in batches
      const batchSize = 10;
      for (let i = 0; i < migrationAnalysis.migrationRules.length; i += batchSize) {
        const batch = migrationAnalysis.migrationRules.slice(i, i + batchSize);
        
        try {
          await this.migrateBatch(batch);
          categoriesMigrated += batch.length;
          totalProductsProcessed += batch.reduce((sum, rule) => sum + rule.productCount, 0);
          
          const progress = Math.min(90, 10 + (categoriesMigrated / migrationAnalysis.migrationRules.length) * 80);
          await this.updateMigrationStatus({
            status: 'in-progress',
            progress,
            currentPhase: `Migrated ${categoriesMigrated}/${migrationAnalysis.migrationRules.length} categories`,
            categoriesProcessed: categoriesMigrated
          });
        } catch (error) {
          const errorMsg = `Failed to migrate batch starting at index ${i}: ${error}`;
          errors.push(errorMsg);
        }
      }

      // Validate migration
      await this.updateMigrationStatus({
        status: 'in-progress',
        progress: 95,
        currentPhase: 'Validating migration',
        categoriesProcessed: categoriesMigrated
      });

      const validationResult = await this.validateMigration();
      if (!validationResult.isValid) {
        warnings.push(`Migration validation found ${validationResult.totalDiscrepancies} discrepancies`);
        validationResult.categoryDiscrepancies.forEach(disc => {
          warnings.push(`Category ${disc.categoryName}: expected ${disc.expectedQuantity}, got ${disc.actualQuantity}`);
        });
      }

      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      // Update final migration status
      await this.updateMigrationStatus({
        status: errors.length > 0 ? 'failed' : 'completed',
        progress: 100,
        currentPhase: 'Migration completed',
        completedAt: Timestamp.fromDate(endTime),
        categoriesProcessed: categoriesMigrated,
        lastError: errors.length > 0 ? errors[errors.length - 1] : undefined
      });

      const result: MigrationResult = {
        success: errors.length === 0,
        categoriesMigrated,
        totalProductsProcessed,
        errors,
        warnings,
        startTime,
        endTime,
        duration
      };

      return result;
    } catch (error) {
      const endTime = new Date();
      
      await this.updateMigrationStatus({
        status: 'failed',
        progress: 0,
        currentPhase: 'Migration failed',
        completedAt: Timestamp.fromDate(endTime),
        lastError: error instanceof Error ? error.message : 'Unknown error'
      });

      throw new Error('Migration failed');
    }
  }

  /**
   * Migrate a batch of categories
   */
  private async migrateBatch(migrationRules: MigrationRule[]): Promise<void> {
    const batch = writeBatch(db);
    
    migrationRules.forEach(rule => {
      const categoryRef = doc(db, this.categoriesCollection, rule.categoryId);
      const inventory: CategoryInventory = {
        totalQuantity: rule.aggregatedQuantity,
        lowStockThreshold: rule.lowStockThreshold,
        lastUpdated: Timestamp.now(),
        productCount: rule.productCount
      };

      batch.update(categoryRef, {
        inventory,
        updatedAt: Timestamp.now()
      });
    });

    await batch.commit();
  }

  /**
   * Validate the migration by comparing expected vs actual inventory
   */
  async validateMigration(): Promise<ValidationResult> {
    try {
      const migrationAnalysis = await this.analyzeMigration();
      const categories = await categoryInventoryService.getAllCategoriesWithInventory();
      
      const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
      const discrepancies: ValidationResult['categoryDiscrepancies'] = [];
      let totalDiscrepancies = 0;

      migrationAnalysis.migrationRules.forEach(rule => {
        const category = categoryMap.get(rule.categoryId);
        if (!category) {
          discrepancies.push({
            categoryId: rule.categoryId,
            categoryName: rule.categoryName,
            expectedQuantity: rule.aggregatedQuantity,
            actualQuantity: 0,
            difference: rule.aggregatedQuantity
          });
          totalDiscrepancies++;
          return;
        }

        const actualQuantity = category.inventory.totalQuantity;
        const expectedQuantity = rule.aggregatedQuantity;
        
        if (actualQuantity !== expectedQuantity) {
          discrepancies.push({
            categoryId: rule.categoryId,
            categoryName: rule.categoryName,
            expectedQuantity,
            actualQuantity,
            difference: Math.abs(actualQuantity - expectedQuantity)
          });
          totalDiscrepancies++;
        }
      });

      // Check for orphaned products (products without valid categories)
      const productsSnapshot = await getDocs(collection(db, this.productsCollection));
      const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as Product[];
      
      const orphanedProducts = products
        .filter(product => product.categoryId && !categoryMap.has(product.categoryId))
        .map(product => product.sku);

      // Check for duplicate products (shouldn't happen but good to verify)
      const skuCounts = new Map<string, number>();
      products.forEach(product => {
        skuCounts.set(product.sku, (skuCounts.get(product.sku) || 0) + 1);
      });
      
      const duplicateProducts = Array.from(skuCounts.entries())
        .filter(([, count]) => count > 1)
        .map(([sku]) => sku);

      const result: ValidationResult = {
        isValid: totalDiscrepancies === 0 && orphanedProducts.length === 0,
        totalDiscrepancies,
        categoryDiscrepancies: discrepancies,
        orphanedProducts,
        duplicateProducts
      };

      return result;
    } catch {
      throw new Error('Failed to validate migration');
    }
  }

  /**
   * Rollback migration by removing inventory data from categories
   */
  async rollbackMigration(): Promise<void> {
    try {
      await this.updateMigrationStatus({
        status: 'in-progress',
        progress: 0,
        currentPhase: 'Rolling back migration'
      });

      const categories = await categoryInventoryService.getAllCategoriesWithInventory();
      const batch = writeBatch(db);
      
      categories.forEach(category => {
        const categoryRef = doc(db, this.categoriesCollection, category.id);
        batch.update(categoryRef, {
          inventory: null, // Remove inventory field
          updatedAt: Timestamp.now()
        });
      });

      await batch.commit();
      
      await this.updateMigrationStatus({
        status: 'rolled-back',
        progress: 100,
        currentPhase: 'Migration rolled back',
        completedAt: Timestamp.now()
      });
    } catch {
      throw new Error('Failed to rollback migration');
    }
  }

  /**
   * Create the default "Uncategorized" category
   */
  private async createUncategorizedCategory(): Promise<void> {
    const categoryRef = doc(db, this.categoriesCollection, this.UNCATEGORIZED_CATEGORY_ID);
    await runTransaction(db, async (transaction) => {
      const categoryDoc = await transaction.get(categoryRef);
      
      if (!categoryDoc.exists()) {
        transaction.set(categoryRef, {
          name: 'Uncategorized',
          description: 'Products without assigned categories',
          tag: 'uncategorized',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
    });
  }

  /**
   * Update migration status
   */
  private async updateMigrationStatus(status: Partial<MigrationStatus>): Promise<void> {
    await runTransaction(db, async (transaction) => {
      const statusRef = doc(db, this.migrationStatusCollection, 'current');
      const statusDoc = await transaction.get(statusRef);
      const currentStatus = statusDoc.exists() ? statusDoc.data() as MigrationStatus : {};
      
      transaction.set(statusRef, {
        ...currentStatus,
        ...status
      }, { merge: true });
    });
  }

  /**
   * Get current migration status
   */
  async getMigrationStatus(): Promise<MigrationStatus | null> {
    try {
      const statusRef = doc(db, this.migrationStatusCollection, 'current');
      const statusDoc = await getDoc(statusRef);
      
      if (!statusDoc.exists()) {
        return null;
      }

      return statusDoc.data() as MigrationStatus;
    } catch {
      return null;
    }
  }
}

export const inventoryMigrationService = new InventoryMigrationService(); 