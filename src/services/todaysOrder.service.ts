import { ProductSummary } from "../pages/home/services/base.transformer";
import { FirebaseService } from "./firebase.service";
import { Product, ProductService } from "./product.service";

export type ActiveOrder = ProductSummary;

export interface ActiveOrderSchema {
  id: string;
  orders: ActiveOrder[];
  date: string;
}

export class TodaysOrder extends FirebaseService {
  private readonly COLLECTION_NAME = "active-orders";

  private products: Product[] = [];

  async mapProductsToActiveOrder() {
    this.products = await new ProductService().getProducts({});
  }

  async getTodaysOrders(): Promise<ActiveOrderSchema[]> {
    await this.mapProductsToActiveOrder();
    const activeOrder = await this.getDocuments<ActiveOrderSchema>(
      this.COLLECTION_NAME,
      []
    );
    if (activeOrder && activeOrder.length > 0) {
      activeOrder.at(0)?.orders.map((order) => {
        const product = this.products.find((p) => p.sku === order.SKU);
        if (product) {
          order.product = product;
        }
      });
    }

    return activeOrder;
  }

  async updateTodaysOrder(
    order: ActiveOrderSchema
  ): Promise<ActiveOrderSchema | undefined> {
    const existingOrders = await this.getTodaysOrders();
    const existingOrder = existingOrders.find((o) => o.date === order.date);
    if (existingOrder) {
      this.updateDocument<ActiveOrderSchema>(
        this.COLLECTION_NAME,
        existingOrder.id,
        {
          ...order,
          orders: [...existingOrder.orders, ...order.orders],
        }
      );
    } else {
      this.batchOperation<ActiveOrderSchema>(
        [order],
        this.COLLECTION_NAME,
        "create",
        (item) => item.id
      );
    }
    return (await this.getTodaysOrders())?.at(0);
  }
}
