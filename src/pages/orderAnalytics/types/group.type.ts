export type Group = {
  group: string;
  orders: number;
  returns: number;
  skus: { [sku: string]: { orders: number; returns: number, title: string } };
};
