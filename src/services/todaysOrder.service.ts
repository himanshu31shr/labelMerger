import { format } from "date-fns";
import { ProductSummary } from "../pages/home/services/base.transformer";
import { FirebaseService } from "./firebase.service";
import { Product, ProductService } from "./product.service";
import { CategoryInventoryService } from "./categoryInventory.service";

export type ActiveOrder = ProductSummary;

export interface ActiveOrderSchema {
  id: string;
  orders: ActiveOrder[];
  date: string;
}

export class TodaysOrder extends FirebaseService {
  private readonly COLLECTION_NAME = "active-orders";
  private productService: ProductService;
  private categoryInventoryService: CategoryInventoryService;
  private products: Product[] = [];

  constructor() {
    super();
    this.productService = new ProductService();
    this.categoryInventoryService = new CategoryInventoryService();
  }

  async mapProductsToActiveOrder() {
    this.products = await this.productService.getProducts({});
  }

  async getTodaysOrders(): Promise<ActiveOrderSchema | undefined> {
    await this.mapProductsToActiveOrder();
    const activeOrder = await this.getDocument<ActiveOrderSchema>(
      this.COLLECTION_NAME,
      format(new Date(), "yyyy-MM-dd")
    );
    if (activeOrder) {
      activeOrder.orders.map((order) => {
        const product = this.products.find((p) => p.sku === order.SKU && p.platform === order.type);
        if (product) {
          order.product = product;
        }
      });
    }

    return activeOrder;
  }

  async getLastThirtyDaysOrders(): Promise<ActiveOrderSchema[]> {
    await this.mapProductsToActiveOrder();
    const orders: ActiveOrderSchema[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = format(date, "yyyy-MM-dd");

      try {
        const dayOrder = await this.getDocument<ActiveOrderSchema>(
          this.COLLECTION_NAME,
          dateStr
        );

        if (dayOrder) {
          dayOrder.orders.forEach((order) => {
            const product = this.products.find((p) => p.sku === order.SKU);
            if (product) {
              order.product = product;
            }
          });
          orders.push(dayOrder);
        } else {
          orders.push({
            id: dateStr,
            orders: [],
            date: dateStr
          });
        }
      } catch {
        orders.push({
          id: dateStr,
          orders: [],
          date: dateStr
        });
      }
    }

    return orders;
  }

  /**
   * Check if there's sufficient inventory for all products in the order
   * @param orders List of orders to check
   * @returns Boolean indicating if all products have sufficient inventory
   */
  async checkInventoryForOrders(orders: ActiveOrder[]): Promise<boolean> {
    for (const order of orders) {
      try {
        // Skip orders without a valid SKU
        if (!order.SKU) {
          console.warn('Order missing SKU, skipping inventory check');
          continue;
        }
        
        const hasSufficient = await this.productService.hasSufficientInventory(order.SKU, Number(order.quantity) || 1);
        if (!hasSufficient) {
          return false;
        }
      } catch (error) {
        console.error(`Error checking inventory for SKU ${order.SKU || 'unknown'}:`, error);
        return false;
      }
    }
    return true;
  }

  /**
   * Reduce inventory for all products in the order
   * Also updates category inventory for each product
   * @param orders List of orders to process
   */
  async reduceInventoryForOrders(orders: ActiveOrder[]): Promise<void> {
    for (const order of orders) {
      try {
        // Skip orders without a valid SKU
        if (!order.SKU) {
          console.warn('Order missing SKU, skipping inventory reduction');
          continue;
        }
        
        const quantity = Number(order.quantity) || 1;
        
        // Reduce product inventory
        const updatedProduct = await this.productService.reduceInventoryForOrder(order.SKU, quantity);
        
        // Also reduce category inventory if product has a category
        if (updatedProduct.categoryId) {
          try {
            await this.categoryInventoryService.updateCategoryInventory(
              updatedProduct.categoryId,
              -quantity, // Negative quantity to reduce inventory
              `Order fulfilled - SKU: ${order.SKU}`,
              'system-order-processing'
            );
            
            console.log(`✅ Reduced category inventory for ${updatedProduct.categoryId} by ${quantity} (SKU: ${order.SKU})`);
          } catch (categoryError) {
            console.error(`❌ Failed to update category inventory for ${updatedProduct.categoryId}:`, categoryError);
            // Don't throw here - product inventory was already updated successfully
          }
        } else {
          console.warn(`⚠️ Product ${order.SKU} has no categoryId - skipping category inventory update`);
        }
        
      } catch (error) {
        console.error(`Error reducing inventory for SKU ${order.SKU || 'unknown'}:`, error);
        // Continue with other orders even if one fails
      }
    }
  }

  async updateTodaysOrder(
    order: ActiveOrderSchema
  ): Promise<ActiveOrderSchema | undefined> {

    const existingOrder = await this.getTodaysOrders();
    
    // Process the order
    if (existingOrder) {
      await this.updateDocument<ActiveOrderSchema>(
        this.COLLECTION_NAME,
        existingOrder.id,
        {
          ...order,
          orders: [...existingOrder.orders, ...order.orders],
        }
      );
    } else {
      await this.batchOperation<ActiveOrderSchema>(
        [order],
        this.COLLECTION_NAME,
        "create",
        (item) => item.id
      );
    }
    
    // Reduce inventory after the order is successfully processed
    await this.reduceInventoryForOrders(order.orders);
    
    return (await this.getTodaysOrders());
  }
}
