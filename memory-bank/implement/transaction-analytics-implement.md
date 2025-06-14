# IMPLEMENTATION GUIDE: TRANSACTION ANALYTICS REPAIR

## 1. TransactionAnalysisService Updates

### File: src/services/transactionAnalysis.service.ts

```typescript
import { CostPriceResolutionService, CostPriceResolution } from "./costPrice.service";
import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../types/transaction.type";

export class TransactionAnalysisService {
  private transactions: Transaction[];
  private productPrices?: Map<string, ProductPrice>;
  private costPriceResolutions: Map<string, CostPriceResolution> = new Map();

  constructor(
    transactions: Transaction[],
    productPrices: Map<string, ProductPrice>,
    private costPriceService: CostPriceResolutionService
  ) {
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
    ].includes(type.toLowerCase());
  }

  private async resolveCostPrices(): Promise<void> {
    for (const transaction of this.transactions) {
      const sku = transaction.sku;
      if (!this.costPriceResolutions.has(sku)) {
        const resolution = await this.costPriceService.getProductCostPrice(sku);
        this.costPriceResolutions.set(sku, resolution);
      }
    }
  }

  async analyze(): Promise<TransactionSummary> {
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

        // Get cost price from resolution service
        const costPriceResolution = this.costPriceResolutions.get(sku);
        const costPrice = costPriceResolution?.value || 0;
        const costPriceSource = costPriceResolution?.source || "default";

        // Calculate total cost based on quantity and resolved cost price
        const totalCost = costPrice * quantity;

        // Update product summary with cost price source
        productSummary.costPriceSource = costPriceSource;
        productSummary.costPrice = costPrice;
        
        summary.totalCost += totalCost;
        summary.profitBeforeCost += amount + totalExpenses;
        
        // Calculate profit using quantity * costPrice
        const profit = amount + totalExpenses - totalCost;
        summary.totalProfit += profit;
        
        // Update product-specific profit
        productSummary.profit = productSummary.amount - (costPrice * productSummary.units);
        productSummary.profitPerUnit = productSummary.units > 0 ? 
          productSummary.profit / productSummary.units : 0;
      }
    }

    return summary;
  }
}
```

## 2. FlipkartFactory Updates

### File: src/pages/transactionAnalytics/services/FlipkartFactory.ts

```typescript
private rowToTransaction(order: FlipkartOrderData): Transaction | null {
  if (!order["Order ID"]) return null;

  return {
    transactionId: order["Order ID"],
    sku: order["SKU Name"],
    description: order["SKU Name"],
    platform: "flipkart",
    marketplace: "Flipkart",
    type: "delivered",
    orderDate: order["Order Date"],
    quantity: order["Gross Units"],
    sellingPrice: this.parseCurrencyValue(
      order["Final Selling Price (incl. seller opted in default offers)"]
    ),
    orderStatus: order["Order Status"],
    total: this.parseCurrencyValue(order["Net Earnings (INR)"]),
    productSales: this.parseCurrencyValue(order["Accounted Net Sales (INR)"]),
    accNetSales: this.parseCurrencyValue(
      order["Bank Settlement [Projected] (INR)"]
    ),
    expenses: {
      shippingFee: this.parseCurrencyValue(order["Shipping Fee (INR)"]),
      marketplaceFee: this.parseCurrencyValue(order["Commission (INR)"]),
      otherFees: this.parseCurrencyValue(order["Total Expenses (INR)"]),
    },
    product: {
      name: order["SKU Name"] || "",
      sku: order["SKU Name"],
      description: order["SKU Name"] || "",
      platform: "flipkart",
      customCostPrice: null, // Use null to enable inheritance from category
      categoryId: order["Category ID"] || undefined, // Extract category ID if available
      metadata: {},
      visibility: "visible",
      sellingPrice: this.parseCurrencyValue(
        order["Final Selling Price (incl. seller opted in default offers)"]
      ),
      inventory: {
        quantity: 0,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now()
      },
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hash:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  };
}
```

## 3. UI Components Updates

### File: src/pages/transactionAnalytics/components/product-list.component.tsx

```tsx
// Import statements...

const ProductList: React.FC<{ products: any[] }> = ({ products }) => {
  // Existing code...
  
  const getCostPriceSourceLabel = (source: string) => {
    switch(source) {
      case "category":
        return "Category";
      case "product":
        return "Product";
      case "default":
        return "Default";
      default:
        return "Unknown";
    }
  };
  
  const getCostPriceSourceColor = (source: string) => {
    switch(source) {
      case "category":
        return "info.main";
      case "product":
        return "success.main";
      case "default":
        return "warning.main";
      default:
        return "text.secondary";
    }
  };
  
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader
        title="Products Performance"
        subheader={`${products.length} products analyzed`}
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Units</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Profit</TableCell>
                <TableCell align="right">Profit/Unit</TableCell>
                <TableCell>Cost Price Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.sku}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">{product.units}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(product.amount)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: product.profit >= 0 ? "success.main" : "error.main"
                    }}
                  >
                    {formatCurrency(product.profit)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: product.profitPerUnit >= 0 ? "success.main" : "error.main"
                    }}
                  >
                    {formatCurrency(product.profitPerUnit)}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography 
                        component="span" 
                        sx={{ 
                          color: getCostPriceSourceColor(product.costPriceSource),
                          fontWeight: "medium"
                        }}
                      >
                        {getCostPriceSourceLabel(product.costPriceSource)}
                      </Typography>
                      <Tooltip title="Cost price source indicates whether the price comes from the product directly, is inherited from a category, or uses a default value.">
                        <InfoIcon fontSize="small" sx={{ ml: 1, fontSize: 16, color: "action.active" }} />
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ProductList;
```
