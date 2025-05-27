# Inventory Migration Plan: Product-Based to Category-Based

## Overview
This document outlines the migration strategy to move inventory tracking from individual products to categories, providing better inventory management and reporting capabilities.

## Current State
- Inventory stored in `product.inventory` field
- Individual product tracking with SKU-based operations
- Low stock alerts per product
- Inventory operations: `updateProductInventory(sku, quantity)`

## Target State
- Inventory stored in `category.inventory` field
- Category-level tracking with aggregated quantities
- Low stock alerts per category
- Inventory operations: `updateCategoryInventory(categoryId, quantity)`

## Migration Phases

### Phase 1: Preparation (Week 1)
**Objectives**: Set up infrastructure and data structures

**Tasks**:
1. **Data Structure Design**
   ```typescript
   interface CategoryWithInventory extends Category {
     inventory: {
       totalQuantity: number;
       lowStockThreshold: number;
       lastUpdated: Date;
       productCount: number;
     };
   }
   ```

2. **Migration Scripts**
   - Create aggregation script to sum product inventory by category
   - Create validation script to verify data integrity
   - Create rollback script for emergency recovery

3. **Feature Flags**
   - Add `USE_CATEGORY_INVENTORY` feature flag
   - Add `MIGRATION_MODE` flag for dual system operation

4. **Database Preparation**
   - Add inventory fields to categories collection
   - Create indexes for efficient category inventory queries
   - Set up migration tracking collection

### Phase 2: Dual System Implementation (Week 2) ✅ COMPLETED
**Objectives**: Implement new system alongside existing one

**Tasks**:
1. **New Services** ✅
   ```typescript
   // src/services/categoryInventory.service.ts - IMPLEMENTED
   class CategoryInventoryService {
     async updateCategoryInventory(categoryId: string, quantity: number): Promise<void>
     async getCategoryInventory(categoryId: string): Promise<CategoryInventory>
     async getLowStockCategories(): Promise<Category[]>
     async aggregateProductInventoryToCategory(categoryId: string): Promise<void>
   }
   
   // src/services/inventoryMigration.service.ts - IMPLEMENTED
   class InventoryMigrationService {
     async migrateProductInventoryToCategories(): Promise<MigrationResult>
     async validateMigration(): Promise<ValidationResult>
     async rollbackMigration(): Promise<void>
   }
   ```

2. **Updated Redux Slices** ✅
   ```typescript
   // src/store/slices/categoryInventorySlice.ts - IMPLEMENTED WITH TDD
   interface CategoryInventoryState {
     categories: CategoryWithInventory[];
     lowStockCategories: LowStockAlert[];
     loading: boolean;
     error: string | null;
     migrationStatus: 'pending' | 'in-progress' | 'completed' | 'failed' | 'rolled-back';
     lastUpdated: string | null;
   }
   // ✅ 11/11 tests passing
   // ✅ Includes memoized selectors for performance
   // ✅ Proper error handling with rejectWithValue
   ```

3. **Dual Operation Logic** 🔄 IN PROGRESS
   - Update both product and category inventory during transition
   - Add synchronization logic to keep both systems in sync
   - Implement conflict resolution for discrepancies

### Phase 3: UI Migration (Week 3)
**Objectives**: Create new UI components and update existing ones

**Tasks**:
1. **New Components**
   ```typescript
   // src/pages/inventory/components/CategoryInventoryTable.tsx
   // src/pages/inventory/components/CategoryInventoryCard.tsx
   // src/pages/inventory/components/CategoryLowStockAlert.tsx
   // src/pages/inventory/components/InventoryMigrationStatus.tsx
   ```

2. **Updated Components**
   - Modify `InventoryPage` to support both views
   - Update `ProductTable` to remove inventory columns
   - Add category inventory info to `CategoryList`

3. **Migration UI**
   - Add migration progress indicator
   - Add data validation results display
   - Add system status toggle

### Phase 4: Data Migration (Week 4)
**Objectives**: Execute the actual data migration

**Tasks**:
1. **Pre-Migration**
   - Full database backup
   - Data validation and cleanup
   - Create "Uncategorized" category for products without categories

2. **Migration Execution**
   ```typescript
   // Migration algorithm
   async function migrateInventory() {
     // 1. Group products by category
     // 2. Sum inventory quantities per category
     // 3. Set category low stock threshold (min of products or default)
     // 4. Update category documents with inventory data
     // 5. Validate migration results
     // 6. Switch feature flag to new system
   }
   ```

3. **Post-Migration**
   - Validate data integrity
   - Performance testing
   - User acceptance testing

### Phase 5: Cleanup (Week 5-6)
**Objectives**: Remove old system and finalize migration

**Tasks**:
1. **Code Cleanup**
   - Remove product inventory fields
   - Remove old inventory components
   - Remove feature flags
   - Update API endpoints

2. **Documentation**
   - Update API documentation
   - Update user guides
   - Create migration retrospective

## Data Migration Strategy

### Aggregation Logic
```typescript
interface MigrationRule {
  categoryId: string;
  products: Product[];
  aggregatedQuantity: number; // Sum of all product quantities
  lowStockThreshold: number;  // Min threshold or default (5)
  productCount: number;       // Number of products in category
}
```

### Handling Edge Cases
1. **Products without categories**: Assign to "Uncategorized" category
2. **Negative inventory**: Preserve negative values, flag for review
3. **Missing thresholds**: Use default value of 5
4. **Duplicate products**: Merge quantities, log conflicts

## Risk Mitigation

### Data Protection
- Full backup before migration
- Incremental backups during migration
- Point-in-time recovery capability
- Data validation at each step

### Performance Considerations
- Batch processing for large datasets
- Index optimization for category queries
- Caching for frequently accessed data
- Load testing before production deployment

### Rollback Strategy
1. **Immediate rollback**: Feature flag toggle
2. **Data rollback**: Restore from backup
3. **Partial rollback**: Rollback specific categories
4. **Emergency procedures**: Documented escalation path

## Success Criteria
- [ ] Zero data loss during migration
- [ ] All inventory data successfully aggregated to categories
- [ ] Performance maintained or improved
- [ ] User workflows remain functional
- [ ] Reporting accuracy maintained
- [ ] Low stock alerts working correctly

## Timeline
- **Week 1**: Infrastructure and preparation
- **Week 2**: Dual system implementation
- **Week 3**: UI migration and testing
- **Week 4**: Data migration execution
- **Week 5**: Cleanup and optimization
- **Week 6**: Documentation and retrospective

## Monitoring and Validation
- Real-time migration progress tracking
- Data integrity validation at each step
- Performance monitoring during migration
- User feedback collection
- Error logging and alerting 