import {
  Transaction,
  TransactionSummary
} from "../types/transaction.type";
import { Product } from "./product.service";

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices?: Map<string, Product>;

  constructor(transactions: Transaction[], productPrices: Map<string, Product>) {
    // Only include transactions that have a valid type
    this.transactions = transactions.filter(
      (transaction) => !!transaction && !!transaction.type
    );

    this.productPrices = productPrices;
  }

  private isExpense(type: string | null | undefined): boolean {
    if (!type) return false;
    return [
      "adjustment",
      "refund",
      "service fee",
      "shipping services",
      "returned",
      "return_requested",
    ].includes(type.toLowerCase());
  }

  private isSale(type: string | null | undefined): boolean {
    if (!type) return false;

    return [
      "order",
      "delivered",
      "in_transit",
      "return_cancelled",
      "return_requested",
    ].includes(type.toLowerCase());
  }

  analyze(transactions: Transaction[]): TransactionAnalysis {
    const totalTransactions = transactions.length;
    let totalRevenue = 0;
    let totalCost = 0;
    let totalProfit = 0;

    transactions.forEach((transaction) => {
      totalRevenue += transaction.total || 0;
      if (transaction.product) {
        totalCost += (transaction.product.costPrice || 0) * (transaction.quantity || 1);
      }
    });

    totalProfit = totalRevenue - totalCost;

    return {
      totalTransactions,
      totalRevenue,
      totalCost,
      totalProfit,
      averageOrderValue: totalTransactions ? totalRevenue / totalTransactions : 0,
      profitMargin: totalRevenue ? (totalProfit / totalRevenue) * 100 : 0,
    };
  }

  updateProductPrices(prices: Product[]): void {
    this.productPrices = new Map(prices.map((p) => [p.sku, p]));
  }

  getProductPrices(): Product[] {
    if (!this.productPrices) {
      return [];
    }
    return Array.from(this.productPrices.values());
  }
}
