# Transaction Analytics Testing Plan

## 1. Unit Testing

### 1.1 TransactionAnalysisService Tests

- **Test price resolution method**
  - Verify correct cost prices are resolved for products with custom prices
  - Verify correct cost prices are resolved for products inheriting from category
  - Verify fallback to default price when no custom or category price is available

- **Test async analyze() method**
  - Verify correct calculation of total sales
  - Verify correct calculation of costs using resolved prices × quantity
  - Verify correct profit calculations
  - Verify correct cost price source tracking

### 1.2 FlipkartFactory Tests

- **Test category extraction**
  - Verify correct parsing of Categories sheet
  - Verify correct mapping of SKU to category ID
  - Verify fallback when category information is missing

## 2. Integration Testing

### 2.1 End-to-End Import Flow

- **Test with sample Flipkart import file**
  - Upload file with known category information
  - Verify transactions are created with correct data
  - Verify cost prices are correctly resolved

### 2.2 UI Integration

- **Test async data flow**
  - Verify loading indicators appear during price resolution
  - Verify UI updates correctly when analysis completes

- **Test cost price source display**
  - Verify correct display of source indicators in ProductList
  - Verify correct source counts in SummaryTiles
  - Verify tooltips provide clear explanations

## 3. Test Cases

### 3.1 Custom Cost Price Test Case

Create test data with products having custom cost prices:
1. Create products with SKUs: "CUSTOM-1", "CUSTOM-2"
2. Set customCostPrice values (not null)
3. Import transactions for these products
4. Verify "product" source is displayed
5. Verify calculations use the custom prices

### 3.2 Category Inheritance Test Case

Create test data with products inheriting from category:
1. Create products with SKUs: "CAT-1", "CAT-2"
2. Set customCostPrice to null
3. Assign to categories with defined cost prices
4. Import transactions for these products
5. Verify "category" source is displayed
6. Verify calculations use the category prices

## 4. Manual Test Checklist

- [ ] Upload sample Flipkart file
- [ ] Verify transaction data is imported correctly
- [ ] Check cost price source indicators in product list
- [ ] Verify summary tiles show correct cost price source counts
- [ ] Validate profit calculations match expected values
- [ ] Test with custom price products
- [ ] Test with category inheritance products
- [ ] Test with default price products
