import { format } from "date-fns";
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

  async getTodaysOrders(): Promise<ActiveOrderSchema | undefined> {
    await this.mapProductsToActiveOrder();
    const activeOrder = await this.getDocument<ActiveOrderSchema>(
      this.COLLECTION_NAME,
      format(new Date(), "yyyy-MM-dd")
    );
    if (activeOrder) {
      activeOrder.orders.map((order) => {
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
    const existingOrder = await this.getTodaysOrders();
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
    return (await this.getTodaysOrders());
  }
}
