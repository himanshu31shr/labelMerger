import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../types/transaction.type";
import { CostPriceResolution, CostPriceResolutionService } from "./costPrice.service";

// Extend the Product interface to include resolvedCostPrice
import "./product.service";
declare module "./product.service" {
  interface Product {
    resolvedCostPrice?: CostPriceResolution;
  }
}

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices?: Map<string, ProductPrice>;
  private costPriceService: CostPriceResolutionService;
  private resolvedCostPrices: Map<string, CostPriceResolution> = new Map();

  constructor(
    transactions: Transaction[],
    productPrices: Map<string, ProductPrice>,
    costPriceService?: CostPriceResolutionService
  ) {
    // Only include transactions that have a valid type
    this.transactions = transactions.filter(
      (transaction) => !!transaction && !!transaction.type
    );

    this.productPrices = productPrices;
    this.costPriceService = costPriceService || new CostPriceResolutionService();
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
    ].includes(type.toLowerCase());
  }

  /**
   * Resolve cost prices for all transactions
   */
  private async resolveCostPrices(): Promise<void> {
    // Create a list of unique products from transactions
    const uniqueProducts = new Map<string, { 
      sku: string, 
      categoryId?: string, 
      customCostPrice: number | null 
    }>();

    this.transactions.forEach(transaction => {
      if (!uniqueProducts.has(transaction.sku)) {
        uniqueProducts.set(transaction.sku, {
          sku: transaction.sku,
          categoryId: transaction.product.categoryId,
          customCostPrice: transaction.product.customCostPrice
        });
      }
    });

    // Convert to array for batch processing
    const products = Array.from(uniqueProducts.values());

    try {
      // Use the CostPriceResolutionService to resolve cost prices in batch
      const resolvedPrices = await this.costPriceService.initializeCostPrices(products);
      this.resolvedCostPrices = resolvedPrices;
    } catch (error) {
      console.error("Error resolving cost prices:", error);
      // Create default resolutions as fallback
      products.forEach(product => {
        this.resolvedCostPrices.set(product.sku, {
          value: 0,
          source: 'default',
          categoryId: null,
          sku: product.sku
        });
      });
    }
  }

  /**
   * Get cost price resolution for a product
   */
  private getResolvedCostPrice(sku: string): CostPriceResolution {
    // Return the resolved price if available
    if (this.resolvedCostPrices.has(sku)) {
      return this.resolvedCostPrices.get(sku)!;
    }

    // Fallback to product's direct cost price or 0
    const productPrice = this.productPrices?.get(sku.toLowerCase());
    const costPrice = productPrice?.costPrice || 0;

    return {
      value: costPrice,
      source: 'default',
      categoryId: null,
      sku
    };
  }

  async analyze(): Promise<TransactionSummary> {
    // First resolve all cost prices
    await this.resolveCostPrices();

    const summary: TransactionSummary = {
      totalSales: 0,
      totalExpenses: 0,
      expensesByCategory: {},
      salesByProduct: {},
      totalProfit: 0,
      totalUnits: 0,
      totalCost: 0,
      profitBeforeCost: 0,
      costPriceSources: {
        product: 0,
        category: 0,
        default: 0
      }
    };

    for (const transaction of this.transactions) {
      // Type safety is guaranteed by the filter in constructor
      const transactionType = transaction.type || "";
      const sku = transaction.sku;
      const quantity = transaction.quantity;
      const amount = transaction.sellingPrice;
      const earnings = transaction.total || 0;

      // Get the resolved cost price and attach it to the product
      const costPriceResolution = this.getResolvedCostPrice(sku);
      
      // Add the resolved cost price to the transaction's product object
      if (transaction.product) {
        transaction.product.resolvedCostPrice = costPriceResolution;
      }

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

        const resolvedCostPrice = costPriceResolution.value;
        
        // Track cost price source - ensure costPriceSources is defined
        if (summary.costPriceSources && costPriceResolution.source) {
          summary.costPriceSources[costPriceResolution.source]++;
        }

        if (!summary.salesByProduct[sku]) {
          const productPrice = this.productPrices?.get(sku.toLowerCase());
          summary.salesByProduct[sku] = {
            units: 0,
            amount: 0,
            profit: 0,
            profitPerUnit: 0,
            name: productPrice?.name || sku,
            costPriceSource: costPriceResolution.source
          };
        }

        const productSummary = summary.salesByProduct[sku];
        productSummary.units += quantity;
        productSummary.amount += earnings;
        summary.totalUnits += quantity;

        // Calculate costs correctly using quantity * resolved cost price
        const totalCost = resolvedCostPrice * quantity;
        summary.totalCost += totalCost;
        
        // Calculate profit
        const profit = earnings - totalCost;
        productSummary.profit += profit;
        
        // Calculate profit per unit
        if (productSummary.units > 0) {
          productSummary.profitPerUnit = productSummary.profit / productSummary.units;
        }

        summary.profitBeforeCost += earnings;
        summary.totalProfit += profit;
      }
    }

    return summary;
  }
}
