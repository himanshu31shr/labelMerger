# Label Merger and Analytics Tool

## Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze transaction data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to merge PDF labels and analyze financial data from both platforms.

## Features

### Label Merging
- Upload CSV files containing order data for Amazon and Flipkart
- Generate a merged PDF containing labels for both platforms
- View summary of merged products

### Transaction Analytics
- Upload transaction data to analyze financial performance
- View comprehensive analytics including:
  - Total sales and expenses
  - Platform-specific performance metrics
  - SKU-wise profitability analysis
- Manage product prices dynamically
- Support for both Amazon and Flipkart data formats

### Data Persistence
- Store transaction data persistently in the browser using IndexedDB
- Dynamic price management with real-time updates

## Dark Mode Support

### Overview
The application supports a dark mode toggle, allowing users to switch between light and dark themes dynamically.

### How to Use
- A toggle switch is available in the application header
- Switching the toggle enables or disables dark mode instantly

### Implementation Details
- Integrated using Material-UI's `ThemeProvider` and `createTheme`
- The toggle state is managed using React's `useState` hook

## Installation

### Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd material-ui-vite-ts
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`

## Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run test`: Run unit tests using Jest

## Folder Structure
```
material-ui-vite-ts/
├── src/
│   ├── components/        # Reusable UI components
│   ├── containers/        # Layout containers
│   ├── pages/            # Application pages
│   │   ├── home/         # Home page components and services
│   │   ├── transactionAnalytics/ # Transaction analytics components and services
│   ├── storage/          # IndexedDB operations
│   ├── theme.tsx         # Theme configuration
│   ├── App.tsx           # Main application component
│   ├── main.tsx         # Application entry point
├── tests/                # Unit tests
├── public/               # Static assets
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
```

## Key Components

### Pages
- **Home Page**: Upload CSV files and generate merged PDF labels
- **Transaction Analytics Page**: Analyze transaction data and view financial analytics

### Components
- **FileInput**: Reusable file upload component
- **PriceManagementModal**: Manages product prices with real-time updates

### Services
- **merge.service.ts**: Merges Amazon and Flipkart labels into a single PDF
- **transactionAnalysis.service.ts**: Processes and analyzes transaction data

### Storage
- **db.ts**: Handles IndexedDB operations (save, fetch, delete)

## Future Enhancements
- Add support for additional e-commerce platforms
- Provide export functionality for analytics data
- Implement user authentication for multi-user support
- Add data visualization features

## License
This project is licensed under the MIT License.
