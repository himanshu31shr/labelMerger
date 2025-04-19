# Product Requirements Document (PRD)

## Project Name: Label Merger and Analytics Tool

---

## 1. Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze order data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to upload CSV files, merge PDF labels, and analyze order data grouped by product categories.

---

## 2. Core Features

### 2.1. Label Merging
- **Input**: CSV files containing order data for Amazon and Flipkart.
- **Output**: A merged PDF containing labels for both platforms.
- **Key Functionalities**:
  - Parse and process uploaded CSV files.
  - Transform Amazon and Flipkart-specific data into a unified format.
  - Generate a merged PDF with labels for both platforms.

### 2.2. Order Analytics
- **Input**: Order data from uploaded CSV files or preloaded IndexedDB data.
- **Output**: Analytics grouped by product categories.
- **Key Functionalities**:
  - Display grouped data in a table format.
  - Show total orders and returns for each product group.
  - Expandable rows to display SKU-level details (orders, returns, and titles).
  - Sorting functionality for columns (e.g., group, orders, returns).
  - Display timeline of the data (start and end dates).

### 2.3. Data Persistence
- **Storage**: IndexedDB for storing order data persistently in the browser.
- **Key Functionalities**:
  - Save uploaded data to IndexedDB.
  - Fetch data from IndexedDB on page load.
  - Delete all stored data from IndexedDB.

---

## 3. Technical Requirements

### 3.1. Frontend
- **Framework**: React with TypeScript.
- **Styling**: Material-UI for UI components.
- **Routing**: React Router for navigation.
- **Theming**: Material-UI ThemeProvider with light/dark mode support.

### 3.2. Backend (Browser-based)
- **Data Storage**: IndexedDB for persistent storage.
- **Libraries**:
  - `pdf-lib` for PDF generation and manipulation.
  - `papaparse` for parsing CSV files.

### 3.3. Testing
- **Framework**: Jest with `@testing-library/react`.
- **Mocking**:
  - `fake-indexeddb` for mocking IndexedDB in tests.
  - Mock `pdf-lib` and `papaparse` for unit tests.

---

## 4. Key Components

### 4.1. Pages
1. **Home Page**:
   - File input for uploading Amazon and Flipkart CSV files.
   - Button to generate and download merged PDF labels.

2. **Order Analytics Page**:
   - File input for uploading order data.
   - Table displaying grouped analytics.
   - Delete button to clear stored data.
   - Loader for asynchronous operations.

### 4.2. Components
1. **FileInput**:
   - Reusable component for file uploads.
   - Props: `onChange`, `name`, `accepts`, `selected`.

2. **ProductGroupTable**:
   - Displays grouped data in a table format.
   - Expandable rows for SKU-level details.
   - Sorting functionality for columns.

3. **SkuTable**:
   - Sub-table for displaying SKU-level details (orders, returns, titles).

4. **Loader**:
   - Displays a loading spinner during asynchronous operations.

### 4.3. Services
1. **merge.service.ts**:
   - Merges Amazon and Flipkart labels into a single PDF.

2. **TrasformAmazonPages.ts**:
   - Processes Amazon-specific data for PDF generation.

3. **TrasformFlipkartPages.ts**:
   - Processes Flipkart-specific data for PDF generation.

4. **orderAggregation.service.ts**:
   - Aggregates order data by product groups and SKUs.

### 4.4. Constants
1. **product.ts**:
   - Defines product groups and their associated SKUs.

### 4.5. Storage
1. **db.ts**:
   - Handles IndexedDB operations (save, fetch, delete).

---

## 5. APIs and Libraries

### 5.1. External Libraries
- `pdf-lib`: For PDF generation and manipulation.
- `papaparse`: For parsing CSV files.
- `@mui/material`: For UI components.
- `idb`: For IndexedDB operations.

### 5.2. Internal APIs
- **IndexedDB**:
  - `getOrders`: Fetches all stored orders.
  - `saveOrders`: Saves new orders.
  - `deleteDatabase`: Deletes all stored data.

---

## 6. Testing Requirements

### 6.1. Unit Tests
- **Components**:
  - `FileInput`: Test file upload functionality.
  - `ProductGroupTable`: Test table rendering, sorting, and row expansion.
  - `SkuTable`: Test sub-table rendering.
  - `Loader`: Test loader visibility.

- **Services**:
  - `merge.service.ts`: Test PDF merging functionality.
  - `TrasformAmazonPages.ts`: Test Amazon-specific data processing.
  - `TrasformFlipkartPages.ts`: Test Flipkart-specific data processing.
  - `orderAggregation.service.ts`: Test data aggregation logic.

- **Storage**:
  - `db.ts`: Test IndexedDB operations (save, fetch, delete).

### 6.2. Integration Tests
- Test end-to-end flow for uploading files, generating PDFs, and displaying analytics.

### 6.3. Mocking
- Mock `pdf-lib` for PDF-related tests.
- Mock `papaparse` for CSV parsing tests.
- Use `fake-indexeddb` for IndexedDB-related tests.

---

## 8. Future Enhancements
- Add support for additional e-commerce platforms.
- Provide export functionality for analytics data in multiple formats (CSV, PDF).
- Implement user authentication for multi-user support.
- Optimize performance for large datasets:
  - Implement pagination for large tables
  - Optimize IndexedDB operations
  - Improve PDF generation performance
- Add data visualization features for analytics
- Implement data backup and restore functionality

---

## 9. Glossary
- **SKU**: Stock Keeping Unit, a unique identifier for products.
- **IndexedDB**: A low-level API for client-side storage of significant amounts of structured data.
- **PDF**: Portable Document Format, used for generating labels.

---