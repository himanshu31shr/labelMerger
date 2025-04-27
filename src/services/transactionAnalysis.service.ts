import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../types/transaction.type";

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices?: Map<string, ProductPrice>;

  constructor(transactions: Transaction[], productPrices: Map<string, ProductPrice>) {
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

  analyze(): TransactionSummary {
    const summary: TransactionSummary = {
      totalSales: 0,
      totalExpenses: 0,
      expensesByCategory: {},
      salesByProduct: {},
      totalProfit: 0,
      totalUnits: 0,
      totalCost: 0,
    };

    for (const transaction of this.transactions) {
      // Type safety is guaranteed by the filter in constructor
      const transactionType = transaction.type || "";
      const sku = transaction.sku;
      const quantity = transaction.quantity;
      const amount = transaction.sellingPrice;
      const earnings = transaction.total || 0;

      if (this.isExpense(transactionType)) {
        const category = transactionType?.toLowerCase();
        const totalExpenses =
          transaction.expenses.shippingFee +
          transaction.expenses.marketplaceFee +
          transaction.expenses.otherFees;
        summary.expensesByCategory[category] =
          (summary.expensesByCategory[category] || 0) + totalExpenses;
        summary.totalExpenses += totalExpenses;
      }

      if (this.isSale(transactionType)) {
        summary.totalSales += amount;

        // Add expenses for this sale
        const totalExpenses =
          transaction.expenses.shippingFee +
          transaction.expenses.marketplaceFee +
          transaction.expenses.otherFees;
        summary.totalExpenses += totalExpenses;

        if (!summary.salesByProduct[sku]) {
          const productPrice = this.productPrices?.get(sku);
          summary.salesByProduct[sku] = {
            units: 0,
            amount: 0,
            profit: 0,
            profitPerUnit: 0,
            name: productPrice?.name || sku,
          };
        }

        const productSummary = summary.salesByProduct[sku];
        productSummary.units += quantity;
        productSummary.amount += earnings;
        summary.totalUnits += quantity;

        const costPrice = this.productPrices?.get(sku)?.costPrice || 0;
        console.log("🚀 ~ TransactionAnalysisService ~ analyze ~ this.productPrices?.get(sku):", this.productPrices?.get(sku))

        const totalCost = costPrice * quantity;
        summary.totalCost += totalCost;
        summary.totalProfit += amount - totalCost;
        transaction.product.costPrice =
          this.productPrices?.get(sku)?.costPrice || 0;
      }
    }

    summary.totalProfit += summary.totalExpenses;
    return summary;
  }

  updateProductPrices(prices: ProductPrice[]): void {
    this.productPrices = new Map(prices.map((p) => [p.sku, p]));
  }

  getProductPrices(): ProductPrice[] {
    if (!this.productPrices) {
      return [];
    }
    return Array.from(this.productPrices.values());
  }
}
