import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../types/transaction.type";

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices: Map<string, ProductPrice>;

  constructor(transactions: Transaction[], productPrices: ProductPrice[] = []) {
    // Only include transactions that have a valid type
    this.transactions = transactions.filter(transaction => transaction && transaction.type !== undefined);
    this.productPrices = new Map(productPrices.map((p) => [p.sku, p]));
  }

  private parseNumber(value: string | number | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    const num = Number(value.replace(/[,₹]/g, ""));
    return isNaN(num) ? 0 : num;
  }

  private isExpense(type: string | null | undefined): boolean {
    if (!type) return false;
    return [
      "adjustment",
      "refund",
      "service fee",
      "shipping services",
    ].includes(type.toLowerCase());
  }

  private isSale(type: string | null | undefined): boolean {
    if (!type) return false;
    return type.toLowerCase() === "order";
  }

  private calculateProductProfit(
    sku: string | null | undefined,
    saleAmount: number,
    quantity: number
  ): { profit: number; profitPerUnit: number } {
    if (!sku) return { profit: 0, profitPerUnit: 0 };

    const pricing = this.productPrices.get(sku);
    if (!pricing) {
      return { profit: 0, profitPerUnit: 0 };
    }

    const totalCost = pricing.costPrice * quantity;
    const profit = saleAmount - totalCost;
    return {
      profit,
      profitPerUnit: quantity > 0 ? profit / quantity : 0,
    };
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
      const transactionType = transaction.type || '';
      const sku = transaction.sku;
      const quantity = transaction.quantity;
      const amount = transaction.sellingPrice;

      if (this.isExpense(transactionType)) {
        const category = transactionType.toLowerCase();
        const totalExpenses = 
          transaction.expenses.shippingFee + 
          transaction.expenses.marketplaceFee + 
          transaction.expenses.otherFees;
        summary.expensesByCategory[category] = (summary.expensesByCategory[category] || 0) + totalExpenses;
        summary.totalExpenses += totalExpenses;
      }

      if (this.isSale(transactionType) && sku) {
        summary.totalSales += amount;

        // Add expenses for this sale
        const totalExpenses = 
          transaction.expenses.shippingFee + 
          transaction.expenses.marketplaceFee + 
          transaction.expenses.otherFees;
        summary.totalExpenses += totalExpenses;

        if (!summary.salesByProduct[sku]) {
          const productPrice = this.productPrices.get(sku);
          summary.salesByProduct[sku] = {
            units: 0,
            amount: 0,
            profit: 0,
            profitPerUnit: 0,
            name: productPrice?.name || sku
          };
        }

        const productSummary = summary.salesByProduct[sku];
        productSummary.units += quantity;
        productSummary.amount += amount;
        summary.totalUnits += quantity;

        const costPrice = this.productPrices.get(sku)?.costPrice || 0;
        const totalCost = costPrice * quantity;
        summary.totalCost += totalCost;
      }
    }

    summary.totalProfit = summary.totalSales - summary.totalExpenses - summary.totalCost;
    return summary;
  }

  updateProductPrices(prices: ProductPrice[]): void {
    this.productPrices = new Map(prices.map((p) => [p.sku, p]));
  }

  getProductPrices(): ProductPrice[] {
    return Array.from(this.productPrices.values());
  }
}
