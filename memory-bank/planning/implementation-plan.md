# Transaction Analytics Repair: Implementation Plan

## 1. Architecture Overview

### Current Architecture
- TransactionAnalysisService: Calculates analytics data but doesn't integrate with category price inheritance
- FlipkartFactory: Creates transaction objects from import files but doesn't handle category mapping
- CostPriceResolutionService: Exists but isn't utilized in transaction analytics
- UI Components: Display transaction data but may not show price source information

### Target Architecture
- TransactionAnalysisService: Will integrate with CostPriceResolutionService to use inherited prices
- FlipkartFactory: Will properly extract and map category data from import files
- Transaction analytics UI: Will display price source information and correct calculations


## 2. Technical Approach

### 2.1. TransactionAnalysisService Updates

