# Sample Test Data for Transaction Analytics

## 1. Test Scenario Setup

- Create three sets of test products:
  - Products with custom cost prices
  - Products with category inheritance
  - Products with no valid cost price (default)

- Create test categories with defined cost prices

- Create sample transactions for each product type

- Verify analytics displays correct price sources

## 2. Expected Results

### Cost Price Sources
- Custom price products should show 'product' as source
- Category inheriting products should show 'category' as source
- Products without custom or category price should show 'default'

### Summary Tiles
- Should accurately show count of each price source type
- Total profit should match expected calculation

### Price Calculations
- Custom price products: use customCostPrice for calculations
- Category products: use category's costPrice
- Default products: use 0 as cost price

## 3. Test Instructions

1. Create or import test products with the three price scenarios
2. Create test categories with defined cost prices
3. Import test transactions for the products
4. Check the transaction analytics page
5. Verify cost price source indicators in product list
6. Verify summary tiles show correct cost price distribution
7. Validate profit calculations against expected values

## 4. Create Flipkart Import File for Testing

Create an Excel file with the following structure:

1. **Orders P&L sheet**
   - Add test transactions with various SKUs
   - Include required fields: Order ID, Order Date, SKU Name, Gross Units, etc.

2. **Categories sheet** (optional)
   - Map SKUs to category IDs
   - Format: SKU, CategoryID

Use this file to test the updated FlipkartFactory implementation and category price inheritance.
