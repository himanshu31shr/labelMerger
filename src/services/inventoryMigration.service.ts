import { 
  collection, 
  doc, 
  getDocs, 
  query, 
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
import { Product } from './product.service';
import { Category } from './category.service';
import { categoryInventoryService } from './categoryInventory.service';

export class InventoryMigrationService {
  private readonly productsCollection = 'products';
  private readonly categoriesCollection = 'categories';
  private readonly migrationStatusCollection = 'migrationStatus';
  private readonly UNCATEGORIZED_CATEGORY_ID = 'uncategorized';

  /**
   * Analyze current product inventory and create migration rules
   */
  async analyzeMigration(): Promise<MigrationRule[]> {
    try {
      console.log('🔍 Analyzing current inventory for migration...');
      
      // Get all products with inventory
      const productsSnapshot = await getDocs(collection(db, this.productsCollection));
      const products = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as Product[];

      // Get all categories
      const categoriesSnapshot = await getDocs(collection(db, this.categoriesCollection));
      const categories = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];

      // Create category map for quick lookup
      const categoryMap = new Map(categories.map(cat => [cat.id, cat]));

      // Ensure uncategorized category exists
      if (!categoryMap.has(this.UNCATEGORIZED_CATEGORY_ID)) {
        console.log('📁 Creating "Uncategorized" category...');
        await this.createUncategorizedCategory();
        categoryMap.set(this.UNCATEGORIZED_CATEGORY_ID, {
          id: this.UNCATEGORIZED_CATEGORY_ID,
          name: 'Uncategorized',
          description: 'Products without assigned categories',
          tag: 'uncategorized',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }

      // Group products by category
      const categoryGroups = new Map<string, Product[]>();
      
      products.forEach(product => {
        const categoryId = product.categoryId || this.UNCATEGORIZED_CATEGORY_ID;
        
        if (!categoryGroups.has(categoryId)) {
          categoryGroups.set(categoryId, []);
        }
        categoryGroups.get(categoryId)!.push(product);
      });

      // Create migration rules
      const migrationRules: MigrationRule[] = [];
      
      for (const [categoryId, categoryProducts] of categoryGroups) {
        const category = categoryMap.get(categoryId);
        if (!category) {
          console.warn(`⚠️ Category ${categoryId} not found, moving products to uncategorized`);
          continue;
        }

        const productsWithInventory = categoryProducts.filter(p => p.inventory);
        const aggregatedQuantity = productsWithInventory.reduce(
          (sum, product) => sum + (product.inventory?.quantity || 0), 
          0
        );

        // Calculate low stock threshold (minimum from products or default)
        const thresholds = productsWithInventory
          .map(p => p.inventory?.lowStockThreshold || 5)
          .filter(t => t > 0);
        const lowStockThreshold = thresholds.length > 0 ? Math.min(...thresholds) : 5;

        migrationRules.push({
          categoryId,
          categoryName: category.name,
          products: productsWithInventory.map(p => ({
            sku: p.sku,
            name: p.name,
            quantity: p.inventory?.quantity || 0,
            lowStockThreshold: p.inventory?.lowStockThreshold || 5
          })),
          aggregatedQuantity,
          lowStockThreshold,
          productCount: categoryProducts.length
        });
      }

      console.log(`📊 Migration analysis complete: ${migrationRules.length} categories to migrate`);
      return migrationRules;
    } catch (error) {
      console.error('❌ Error analyzing migration:', error);
      throw new Error('Failed to analyze migration');
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
      console.log('🚀 Starting inventory migration...');
      
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
      const migrationRules = await this.analyzeMigration();
      
      await this.updateMigrationStatus({
        status: 'in-progress',
        progress: 10,
        currentPhase: 'Migrating inventory data',
        totalCategories: migrationRules.length,
        categoriesProcessed: 0
      });

      // Process migration in batches
      const batchSize = 10;
      for (let i = 0; i < migrationRules.length; i += batchSize) {
        const batch = migrationRules.slice(i, i + batchSize);
        
        try {
          await this.migrateBatch(batch);
          categoriesMigrated += batch.length;
          totalProductsProcessed += batch.reduce((sum, rule) => sum + rule.productCount, 0);
          
          const progress = Math.min(90, 10 + (categoriesMigrated / migrationRules.length) * 80);
          await this.updateMigrationStatus({
            status: 'in-progress',
            progress,
            currentPhase: `Migrated ${categoriesMigrated}/${migrationRules.length} categories`,
            categoriesProcessed: categoriesMigrated
          });
          
          console.log(`✅ Migrated batch ${Math.floor(i / batchSize) + 1}: ${categoriesMigrated}/${migrationRules.length} categories`);
        } catch (error) {
          const errorMsg = `Failed to migrate batch starting at index ${i}: ${error}`;
          errors.push(errorMsg);
          console.error('❌', errorMsg);
        }
      }

      // Validate migration
      console.log('🔍 Validating migration...');
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

      console.log('🎉 Migration completed:', result);
      return result;
    } catch (error) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      
      await this.updateMigrationStatus({
        status: 'failed',
        progress: 0,
        currentPhase: 'Migration failed',
        completedAt: Timestamp.fromDate(endTime),
        lastError: error instanceof Error ? error.message : 'Unknown error'
      });

      console.error('❌ Migration failed:', error);
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
      console.log('🔍 Validating migration...');
      
      const migrationRules = await this.analyzeMigration();
      const categories = await categoryInventoryService.getAllCategoriesWithInventory();
      
      const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
      const discrepancies: ValidationResult['categoryDiscrepancies'] = [];
      let totalDiscrepancies = 0;

      migrationRules.forEach(rule => {
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

      console.log('📊 Validation result:', result);
      return result;
    } catch (error) {
      console.error('❌ Error validating migration:', error);
      throw new Error('Failed to validate migration');
    }
  }

  /**
   * Rollback migration by removing inventory data from categories
   */
  async rollbackMigration(): Promise<void> {
    try {
      console.log('🔄 Rolling back migration...');
      
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

      console.log('✅ Migration rollback completed');
    } catch (error) {
      console.error('❌ Error rolling back migration:', error);
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
    const statusRef = doc(db, this.migrationStatusCollection, 'current');
    await runTransaction(db, async (transaction) => {
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
      const statusDoc = await getDocs(query(collection(db, this.migrationStatusCollection)));
      
      if (statusDoc.empty) {
        return null;
      }

      return statusDoc.docs[0].data() as MigrationStatus;
    } catch (error) {
      console.error('Error getting migration status:', error);
      return null;
    }
  }
}

export const inventoryMigrationService = new InventoryMigrationService(); 