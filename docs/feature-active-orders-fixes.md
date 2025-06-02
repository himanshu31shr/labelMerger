# Feature: Native PDF Export for Grouped Active Orders (Summary Only)

## Summary
- Only the summary PDF export (category + order count) is now available for grouped active orders.
- All detailed/statistics PDF export logic and UI have been removed.
- Export button in the Grouped by Category view now generates only the summary PDF.
- All code, tests, and UI references to detailed PDF export have been cleaned up.
- Project builds cleanly and all tests pass after this change.

## Implementation Details
- Only `exportNativeCategorySummaryToPDF` remains in `src/pages/todaysOrders/utils/nativePdfExport.ts`.
- `TodaysOrderPage` only shows the summary export button.
- All detailed export code, imports, and buttons have been removed.

## Verification
- Project builds cleanly.
- Only summary PDF export is available in the UI.

## Date
2024-06-09

---
