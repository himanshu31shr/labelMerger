# Implementation Plan for Transaction Analytics Repair

## 1. TransactionAnalysisService Updates
- Add CostPriceResolutionService as a dependency
- Create method to resolve cost prices
- Make analyze() method async
- Update profit calculations using quantity x resolved price
- Include cost price source information in output

## 2. FlipkartFactory Updates
- Update rowToTransaction method to extract category information
- Set customCostPrice to null to enable inheritance
- Add validation for required fields
- Ensure proper field mapping with import file

## 3. UI Component Updates
- Update product-list.component.tsx to display cost price source
- Add tooltips for explaining price inheritance
- Update transactionAnalytics.page.tsx to handle async analyze() method
- Add loading indicators during price resolution

## 4. Implementation Steps
1. Update TransactionAnalysisService
   - Add dependency
   - Implement price resolution
   - Update calculations

2. Update FlipkartFactory
   - Update product mapping
   - Add category extraction

3. Update UI components
   - Handle async operations
   - Add price source display

4. Test with Flipkart import file
   - Verify calculations
   - Check UI display

## 5. Testing Strategy
- Create test cases with known category inheritance patterns
- Test with products having custom cost prices
- Test with products inheriting from category
- Test with products having no valid cost price
- Verify UI displays correct information for all cases
- Validate calculations match expected values
