import { getOrderById, getOrders, saveOrders } from "../../../storage/db";
import { ProductGroup } from "../constants/product";
import { Group } from "../types/group.type";
import { OrderItem } from "../types/order.type";

export class OrderAggregationService {
  private rows: OrderItem[];

  constructor(rows: OrderItem[]) {
    this.rows = rows;
  }

  private SUCCESS_ORDERS = ["DELIVERED", "READY_TO_SHIP", "APPROVED"];

  private RETURNS = ["RETURNED", "RETURN_REQUESTED"];

  private async countByProductGroup(): Promise<Group[]> {
    const groupedCountMap = new Map<string, Group>();

    for (const row of this.rows) {
      const existingOrder = await getOrderById(row.order_id);
      if (!existingOrder) {
        await saveOrders([row]); // Save new orders to IndexedDB
      }

      const group = ProductGroup.getProductGroupBySKU(row.sku) || "unknown";

      if (!groupedCountMap.has(group)) {
        groupedCountMap.set(group, {
          orders: 0,
          returns: 0,
          skus: {},
        } as Group);
      }

      const groupCount = groupedCountMap.get(group);

      if (this.RETURNS.includes(row.order_item_status)) {
        groupCount!.returns += Number(row.quantity);
        if (!groupCount!.skus[row.sku]) {
          groupCount!.skus[row.sku] = {
            orders: 0,
            returns: 0,
            title: row.product_title.replaceAll(/\"\"\"/gi, ""),
          };
        }
        groupCount!.skus[row.sku].returns += Number(row.quantity);
      } else if (this.SUCCESS_ORDERS.includes(row.order_item_status)) {
        groupCount!.orders += Number(row.quantity);
        if (!groupCount!.skus[row.sku]) {
          groupCount!.skus[row.sku] = {
            orders: 0,
            returns: 0,
            title: row.product_title.replaceAll(/\"\"\"/gi, ""),
          };
        }
        groupCount!.skus[row.sku].orders += Number(row.quantity);
      }
    }

    return Array.from(
      groupedCountMap,
      ([group, counts]) =>
        ({
          group,
          orders: counts.orders,
          returns: counts.returns,
          skus: counts.skus,
        } as Group)
    );
  }

  getDates(): { start?: string; end?: string } {
    const sorted = this.rows.sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    return {
      start: sorted.at(0)?.order_date,
      end: sorted.at(sorted.length - 1)?.order_date,
    };
  }


  async process(): Promise<Group[]> {
    await saveOrders(this.rows); // Save new orders to IndexedDB
    return this.countByProductGroup();
  }
}
