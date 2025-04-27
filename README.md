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
- Store transaction data in Firebase Firestore
- Real-time updates across all connected clients
- Offline support with automatic sync
- Dynamic price management with real-time updates

## Tech Stack
- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI
- **Data Storage**: Firebase Firestore
- **PDF Processing**: pdf-lib
- **Data Parsing**: papaparse, xlsx
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A Firebase project with Firestore enabled

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure Firebase:
   - Create a `.env` file with your Firebase configuration
   - Set up Firestore rules and indexes
4. Start development server: `npm run dev`

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
│   ├── services/         # Application services
│   ├── theme.tsx         # Theme configuration
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
├── tests/               # Unit tests
├── public/             # Static assets
├── package.json       # Project metadata and dependencies
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
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
- **firebase.service.ts**: Handles all Firebase operations and data persistence

## Future Enhancements
- Add support for additional e-commerce platforms
- Provide export functionality for analytics data
- Implement user authentication for multi-user support
- Add data visualization features
- Enhanced offline capabilities
- Batch processing for large datasets

## License
This project is licensed under the MIT License.
