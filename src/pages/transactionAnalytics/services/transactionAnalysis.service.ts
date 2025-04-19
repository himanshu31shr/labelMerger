import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../types/transaction.type";

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices: Map<string, ProductPrice>;
  private readonly EXPENSE_TYPES = [
    "adjustment",
    "refund",
    "service fee",
    "shipping services",
  ];
  private readonly SALE_TYPE = "order";

  constructor(transactions: Transaction[], productPrices: ProductPrice[] = []) {
    // Filter out header rows from CSV
    this.transactions = transactions.filter(
      (t) => t.type && !t.type.toLowerCase().includes("definition")
    );
    this.productPrices = new Map(productPrices.map((p) => [p.sku, p]));
  }

  private parseNumber(value: string | null | undefined): number {
    if (!value) return 0;
    const num = Number(value.replace(/[,₹]/g, ""));
    return isNaN(num) ? 0 : num;
  }

  private isExpense(type: string | null | undefined): boolean {
    if (!type) return false;
    return this.EXPENSE_TYPES.includes(type.toLowerCase());
  }

  private isSale(type: string | null | undefined): boolean {
    if (!type) return false;
    return type.toLowerCase() === this.SALE_TYPE;
  }

  analyze(): TransactionSummary {
    const summary: TransactionSummary = {
      totalSales: 0,
      totalExpenses: 0,
      expensesByCategory: {},
      salesByProduct: {},
      totalProfit: 0,
    };

    for (const transaction of this.transactions) {
      // Skip invalid transactions
      if (!transaction || !transaction.type) continue;

      const type = transaction.type;
      const sku = transaction.sku;
      //   const total = this.parseNumber(transaction.productSales);
      const quantity = this.parseNumber(transaction.quantity);
      const total = this.parseNumber(transaction.total);
      const sellingFees = this.parseNumber(transaction.sellingFees);
      const otherFees = this.parseNumber(transaction.otherTransactionFees);
      const fbaFees = this.parseNumber(transaction.fbaFees);
      const other = this.parseNumber(transaction.other);

      if (this.isExpense(type)) {
        const category = type.toLowerCase();
        const expenseAmount = Math.abs(total);
        summary.expensesByCategory[category] =
          (summary.expensesByCategory[category] || 0) + expenseAmount;
        summary.totalExpenses += expenseAmount;
      }

      if (this.isSale(type)) {
        summary.totalSales += total;

        // Sum up all fees for this sale
        const totalFees =
          Math.abs(sellingFees) +
          Math.abs(otherFees) +
          Math.abs(fbaFees) +
          Math.abs(other);
        summary.totalExpenses += totalFees;

        if (sku) {
          if (!summary.salesByProduct[sku]) {
            summary.salesByProduct[sku] = {
              units: 0,
              amount: 0,
              profit: 0,
              profitPerUnit: 0,
            };
          }

          const productSummary = summary.salesByProduct[sku];
          productSummary.units += quantity;
          productSummary.amount += total;
        }
      }
    }
    summary.totalProfit = summary.totalSales - summary.totalExpenses;
    return summary;
  }

  updateProductPrices(prices: ProductPrice[]): void {
    this.productPrices = new Map(prices.map((p) => [p.sku, p]));
  }

  getProductPrices(): ProductPrice[] {
    return Array.from(this.productPrices.values());
  }
}
