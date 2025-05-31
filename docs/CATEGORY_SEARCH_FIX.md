# Category Column Search Fix

## Issue
The search functionality for the category column was not working. Users could not filter products by category name because the DataTable was searching against the `categoryId` (UUID) instead of the human-readable category name.

## Root Cause
The DataTable component was using the raw column value for filtering. For the category column:
- **Column ID**: `categoryId` 
- **Raw Value**: UUID (e.g., `"abc123-def456-ghi789"`)
- **Display Value**: Category name (e.g., `"Electronics"`)

When users typed "Electronics" in the category filter, it was searching against the UUID, not the category name, so no matches were found.

## Solution
Enhanced the DataTable component to support custom filter values through a new `filterValue` function in the Column interface.

### 1. Enhanced Column Interface
```typescript
export interface Column<T> {
  id: keyof T | string;
  label: string;
  filter?: boolean;
  align?: "right" | "left" | "center";
  format?: (value: unknown, row: T | undefined) => React.ReactNode;
  filterValue?: (row: T) => string; // NEW: Custom function for filtering
  priorityOnMobile?: boolean;
}
```### 2. Enhanced Filtering Logic
```typescript
const filteredAndSortedData = React.useMemo(() => {
  const result = data.filter((row) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;
      
      // Find the column definition for this key
      const column = columns.find(col => col.id === key);
      
      // Use custom filterValue function if available
      if (column?.filterValue) {
        const customValue = column.filterValue(row);
        return customValue.toLowerCase().includes(filterValue.toLowerCase());
      }
      
      // Fall back to default behavior
      const value = getNestedValue(row, key);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  });
  // ... sorting logic
}, [data, order, orderBy, filters, columns]);
```

### 3. Updated Category Column
```typescript
{
  id: "categoryId",
  label: "Category",
  filter: true,
  format: (value) => <Chip label={getCategoryName(value as string)} size="small" />,
  filterValue: (row) => getCategoryName(row.categoryId) // Filter by category name
}
```## How It Works
1. **User Types Category Name**: User enters "Electronics" in the category column filter
2. **Custom Filter Function**: The `filterValue` function converts `categoryId` to category name
3. **Search Match**: "Electronics" matches against "Electronics" (not the UUID)
4. **Results Displayed**: Products in the Electronics category are shown

## Benefits
- **Intuitive Search**: Users can search by what they see (category names)
- **Backward Compatibility**: Existing columns without `filterValue` work as before
- **Flexible**: Any column can now have custom search logic
- **Performance**: Efficient filtering with memoization

## Testing
- ✅ TypeScript compilation passes
- ✅ ESLint passes without errors
- ✅ Category search now works by typing category names
- ✅ Other column filters continue to work as expected
- ✅ Mobile and desktop views both support the enhanced filtering

## Impact
- **User Experience**: Category filtering now works intuitively
- **Product Discovery**: Users can easily find products by category
- **Data Consistency**: Search matches what users see in the UI
- **Developer Experience**: Reusable pattern for other columns needing custom search

## Related Files
- `src/components/DataTable/DataTable.tsx` - Enhanced filtering logic
- `src/pages/products/components/ProductTable.tsx` - Updated category column
- `src/store/slices/productsSlice.ts` - Category data management