import { Transaction, TransactionSummary, ProductPrice } from '../types/transaction.type';

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices: ProductPrice[];

  constructor(transactions: Transaction[], productPrices: ProductPrice[] = []) {
    this.transactions = transactions.filter(t => t && t.type);
    this.productPrices = productPrices;
  }

  private parseNumber(value: string | number | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    const num = Number(String(value).replace(/[₹,]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  private isFlipkartSale(status?: string): boolean {
    if (!status) return false;
    return ['delivered', 'shipped', 'in transit'].includes(status.toLowerCase());
  }

  private isAmazonSale(type: string): boolean {
    return type.toLowerCase() === 'order';
  }

  private isSale(transaction: Transaction): boolean {
    if (transaction.marketplace === 'Flipkart') {
      return this.isFlipkartSale(transaction.orderStatus);
    }
    return this.isAmazonSale(transaction.type);
  }

  private isExpense(transaction: Transaction): boolean {
    const type = transaction.type.toLowerCase();
    if (transaction.marketplace === 'Flipkart') {
      return !this.isFlipkartSale(transaction.orderStatus);
    }
    return type.includes('refund') || 
           type.includes('service') || 
           type.includes('fee');
  }

  analyze(): TransactionSummary {
    const summary: TransactionSummary = {
      totalSales: 0,
      totalExpenses: 0,
      totalUnits: 0,
      totalCost: 0,
      expensesByCategory: {},
      salesByProduct: {},
      totalProfit: 0
    };

    for (const transaction of this.transactions) {
      const quantity = this.parseNumber(transaction.quantity);
      const total = transaction.marketplace === 'Flipkart' ? 
        (transaction.accNetSales || 0) : 
        this.parseNumber(transaction.total);

      if (this.isExpense(transaction)) {
        const category = transaction.marketplace === 'Flipkart' ? 
          `Flipkart-${transaction.orderStatus}` : transaction.type.toLowerCase();
        const expenseAmount = Math.abs(total);
        summary.expensesByCategory[category] = 
          (summary.expensesByCategory[category] || 0) + expenseAmount;
        summary.totalExpenses += expenseAmount;
      }

      if (this.isSale(transaction)) {
        summary.totalSales += total;

        if (transaction.marketplace === 'Amazon') {
          const fees =
            this.parseNumber(transaction.sellingFees) +
            this.parseNumber(transaction.fbaFees) +
            this.parseNumber(transaction.otherTransactionFees) +
            this.parseNumber(transaction.other);
          summary.totalExpenses += Math.abs(fees);
        } else if (transaction.marketplace === 'Flipkart') {
          summary.totalExpenses += transaction.expenses || 0;
        }

        if (transaction.sku) {
          const sku = transaction.sku;
          if (!summary.salesByProduct[sku]) {
            summary.salesByProduct[sku] = {
              units: 0,
              amount: 0,
              profit: 0,
              profitPerUnit: 0,
              description: transaction.description
            };
          }

          const productSummary = summary.salesByProduct[sku];
          productSummary.units += quantity;
          productSummary.amount += total;
          summary.totalUnits += quantity;

          const price = this.productPrices.find(p => p.sku === sku);
          if (price) {
            const totalCost = price.costPrice * quantity;
            summary.totalCost += totalCost;
            productSummary.profit = productSummary.amount - totalCost;
            productSummary.profitPerUnit = productSummary.profit / productSummary.units;
          }
        }
      }
    }

    summary.totalProfit = summary.totalSales - summary.totalExpenses - summary.totalCost;
    return summary;
  }

  updateProductPrices(prices: ProductPrice[]): void {
    this.productPrices = prices;
  }

  getProductPrices(): ProductPrice[] {
    return [...this.productPrices];
  }
}
