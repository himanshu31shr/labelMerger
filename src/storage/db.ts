// db.ts
import { deleteDB, openDB } from "idb";
import { OrderItem } from "../pages/orderAnalytics/types/order.type";

const DB_NAME = "OrderAnalyticsDB";
const STORE_NAME = "orders";

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "order_id" });
        store.createIndex("order_id", "order_id", { unique: true });
      }
    },
  });
  return db;
};

export const saveOrders = async (orders: OrderItem[]) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const order of orders) {
    await tx.objectStore(STORE_NAME).put(order);
  }
  await tx.done;
};

export const getOrders = async (): Promise<OrderItem[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const orders = await tx.objectStore(STORE_NAME).getAll();
  await tx.done;
  return orders;
};

export const getOrderById = async (
  orderId: string
): Promise<OrderItem | undefined> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const order = await tx.objectStore(STORE_NAME).get(orderId);
  await tx.done;
  return order;
};

export const deleteDatabase = async () => {
  await deleteDB(DB_NAME);
};