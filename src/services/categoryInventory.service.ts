import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  runTransaction,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase.config';
import { 
  CategoryWithInventory, 
  CategoryInventory, 
  InventoryOperation, 
  LowStockAlert, 
  InventoryTransfer,
  InventoryReport
} from '../types/categoryInventory.types';

export class CategoryInventoryService {
  private readonly categoriesCollection = 'categories';
  private readonly inventoryOperationsCollection = 'inventoryOperations';

  /**
   * Get category with inventory information
   */
  async getCategoryInventory(categoryId: string): Promise<CategoryWithInventory | null> {
    try {
      const categoryDoc = await getDoc(doc(db, this.categoriesCollection, categoryId));
      
      if (!categoryDoc.exists()) {
        return null;
      }

      const data = categoryDoc.data();
      return {
        id: categoryDoc.id,
        name: data.name,
        description: data.description,
        tag: data.tag,
        inventory: data.inventory || {
          totalQuantity: 0,
          lowStockThreshold: 5,
          lastUpdated: Timestamp.now(),
          productCount: 0
        },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as CategoryWithInventory;
    } catch (error: unknown) {
      throw new Error(`Failed to fetch category inventory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get all categories with inventory information
   */
  async getAllCategoriesWithInventory(): Promise<CategoryWithInventory[]> {
    try {
      const categoriesSnapshot = await getDocs(collection(db, this.categoriesCollection));
      
      return categoriesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          tag: data.tag,
          inventory: data.inventory || {
            totalQuantity: 0,
            lowStockThreshold: 5,
            lastUpdated: Timestamp.now(),
            productCount: 0
          },
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as CategoryWithInventory;
      });
    } catch (error: unknown) {
      throw new Error(`Failed to fetch categories with inventory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update category inventory quantity
   */
  async updateCategoryInventory(
    categoryId: string, 
    quantityChange: number, 
    reason?: string,
    performedBy?: string
  ): Promise<void> {
    try {
      await runTransaction(db, async (transaction) => {
        const categoryRef = doc(db, this.categoriesCollection, categoryId);
        const categoryDoc = await transaction.get(categoryRef);

        if (!categoryDoc.exists()) {
          throw new Error('Category not found');
        }

        const categoryData = categoryDoc.data();
        const currentInventory = categoryData.inventory || {
          totalQuantity: 0,
          lowStockThreshold: 5,
          lastUpdated: Timestamp.now(),
          productCount: 0
        };

        const previousQuantity = currentInventory.totalQuantity;
        const newQuantity = Math.max(0, previousQuantity + quantityChange);

        // Update category inventory
        const updatedInventory: CategoryInventory = {
          ...currentInventory,
          totalQuantity: newQuantity,
          lastUpdated: Timestamp.now()
        };

        transaction.update(categoryRef, {
          inventory: updatedInventory,
          updatedAt: Timestamp.now()
        });

        // Log the operation
        if (performedBy) {
          const operationRef = doc(collection(db, this.inventoryOperationsCollection));
          const operation: Omit<InventoryOperation, 'id'> = {
            categoryId,
            type: quantityChange > 0 ? 'add' : 'remove',
            quantity: Math.abs(quantityChange),
            previousQuantity,
            newQuantity,
            reason,
            performedBy,
            timestamp: Timestamp.now()
          };

          transaction.set(operationRef, operation);
        }
      });
    } catch (error: unknown) {
      throw new Error(`Failed to update category inventory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Set category inventory threshold
   */
  async updateCategoryThreshold(categoryId: string, threshold: number): Promise<void> {
    try {
      const categoryRef = doc(db, this.categoriesCollection, categoryId);
      const categoryDoc = await getDoc(categoryRef);

      if (!categoryDoc.exists()) {
        throw new Error('Category not found');
      }

      const categoryData = categoryDoc.data();
      const currentInventory = categoryData.inventory || {
        totalQuantity: 0,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now(),
        productCount: 0
      };

      const updatedInventory: CategoryInventory = {
        ...currentInventory,
        lowStockThreshold: Math.max(1, threshold),
        lastUpdated: Timestamp.now()
      };

      await updateDoc(categoryRef, {
        inventory: updatedInventory,
        updatedAt: Timestamp.now()
      });
    } catch (error: unknown) {
      throw new Error(`Failed to update category threshold: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get categories with low stock
   */
  async getLowStockCategories(): Promise<LowStockAlert[]> {
    try {
      const categories = await this.getAllCategoriesWithInventory();
      
      return categories
        .filter(category => {
          const { totalQuantity, lowStockThreshold } = category.inventory;
          return totalQuantity <= lowStockThreshold;
        })
        .map(category => {
          const { totalQuantity, lowStockThreshold, productCount } = category.inventory;
          
          let severity: 'low' | 'critical' | 'out-of-stock';
          if (totalQuantity === 0) {
            severity = 'out-of-stock';
          } else if (totalQuantity <= lowStockThreshold * 0.5) {
            severity = 'critical';
          } else {
            severity = 'low';
          }

          return {
            categoryId: category.id,
            categoryName: category.name,
            currentQuantity: totalQuantity,
            lowStockThreshold,
            severity,
            productCount
          } as LowStockAlert;
        })
        .sort((a, b) => {
          // Sort by severity (out-of-stock first, then critical, then low)
          const severityOrder = { 'out-of-stock': 0, 'critical': 1, 'low': 2 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        });
    } catch (error: unknown) {
      throw new Error(`Failed to fetch low stock categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Transfer inventory between categories
   */
  async transferInventory(transfer: InventoryTransfer, performedBy: string): Promise<void> {
    try {
      await runTransaction(db, async (transaction) => {
        const fromCategoryRef = doc(db, this.categoriesCollection, transfer.fromCategoryId);
        const toCategoryRef = doc(db, this.categoriesCollection, transfer.toCategoryId);

        const [fromDoc, toDoc] = await Promise.all([
          transaction.get(fromCategoryRef),
          transaction.get(toCategoryRef)
        ]);

        if (!fromDoc.exists() || !toDoc.exists()) {
          throw new Error('One or both categories not found');
        }

        const fromData = fromDoc.data();
        const toData = toDoc.data();

        const fromInventory = fromData.inventory || { totalQuantity: 0, lowStockThreshold: 5, lastUpdated: Timestamp.now(), productCount: 0 };
        const toInventory = toData.inventory || { totalQuantity: 0, lowStockThreshold: 5, lastUpdated: Timestamp.now(), productCount: 0 };

        if (fromInventory.totalQuantity < transfer.quantity) {
          throw new Error('Insufficient inventory in source category');
        }

        // Update source category
        const updatedFromInventory: CategoryInventory = {
          ...fromInventory,
          totalQuantity: fromInventory.totalQuantity - transfer.quantity,
          lastUpdated: Timestamp.now()
        };

        // Update destination category
        const updatedToInventory: CategoryInventory = {
          ...toInventory,
          totalQuantity: toInventory.totalQuantity + transfer.quantity,
          lastUpdated: Timestamp.now()
        };

        transaction.update(fromCategoryRef, {
          inventory: updatedFromInventory,
          updatedAt: Timestamp.now()
        });

        transaction.update(toCategoryRef, {
          inventory: updatedToInventory,
          updatedAt: Timestamp.now()
        });

        // Log the transfer operation
        const operationRef = doc(collection(db, this.inventoryOperationsCollection));
        const operation: Omit<InventoryOperation, 'id'> = {
          categoryId: transfer.fromCategoryId,
          type: 'transfer',
          quantity: transfer.quantity,
          previousQuantity: fromInventory.totalQuantity,
          newQuantity: fromInventory.totalQuantity - transfer.quantity,
          reason: transfer.reason || `Transfer to ${toData.name}`,
          performedBy,
          timestamp: Timestamp.now(),
          metadata: {
            transferTo: transfer.toCategoryId,
            transferToCategoryName: toData.name,
            productSkus: transfer.productSkus
          }
        };

        transaction.set(operationRef, operation);
      });
    } catch (error: unknown) {
      throw new Error(`Failed to transfer inventory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate inventory report
   */
  async generateInventoryReport(): Promise<InventoryReport> {
    try {
      const categories = await this.getAllCategoriesWithInventory();
      
      const totalQuantity = categories.reduce((sum, cat) => sum + cat.inventory.totalQuantity, 0);
      const lowStockCategories = categories.filter(cat => 
        cat.inventory.totalQuantity <= cat.inventory.lowStockThreshold && cat.inventory.totalQuantity > 0
      ).length;
      const outOfStockCategories = categories.filter(cat => 
        cat.inventory.totalQuantity === 0
      ).length;

      const categoryReports = categories.map(category => {
        const { totalQuantity, lowStockThreshold, productCount } = category.inventory;
        
        let status: 'in-stock' | 'low-stock' | 'out-of-stock';
        if (totalQuantity === 0) {
          status = 'out-of-stock';
        } else if (totalQuantity <= lowStockThreshold) {
          status = 'low-stock';
        } else {
          status = 'in-stock';
        }

        return {
          id: category.id,
          name: category.name,
          quantity: totalQuantity,
          threshold: lowStockThreshold,
          status,
          productCount
        };
      });

      return {
        totalCategories: categories.length,
        totalQuantity,
        lowStockCategories,
        outOfStockCategories,
        categories: categoryReports,
        generatedAt: Timestamp.now()
      };
    } catch (error: unknown) {
      throw new Error(`Failed to generate inventory report: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get inventory operations history for a category
   */
  async getCategoryInventoryHistory(categoryId: string, limitCount = 50): Promise<InventoryOperation[]> {
    try {
      const operationsQuery = query(
        collection(db, this.inventoryOperationsCollection),
        where('categoryId', '==', categoryId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const operationsSnapshot = await getDocs(operationsQuery);
      
      return operationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryOperation[];
    } catch (error: unknown) {
      throw new Error(`Failed to fetch inventory history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Bulk update category inventory (for migration purposes)
   */
  async bulkUpdateCategoryInventory(updates: Array<{
    categoryId: string;
    inventory: CategoryInventory;
  }>): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ categoryId, inventory }) => {
        const categoryRef = doc(db, this.categoriesCollection, categoryId);
        batch.update(categoryRef, {
          inventory,
          updatedAt: Timestamp.now()
        });
      });

      await batch.commit();
    } catch (error: unknown) {
      throw new Error(`Failed to bulk update category inventory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const categoryInventoryService = new CategoryInventoryService(); 