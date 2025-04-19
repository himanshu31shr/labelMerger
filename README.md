# Label Merger and Analytics Tool

## Overview
The Label Merger and Analytics Tool is a web-based application designed to process, merge, and analyze order data from two e-commerce platforms: Amazon and Flipkart. The application provides functionality to upload CSV files, merge PDF labels, and analyze order data grouped by product categories.

## Features

### Label Merging
- Upload CSV files containing order data for Amazon and Flipkart.
- Generate a merged PDF containing labels for both platforms.

### Order Analytics
- Upload order data to analyze grouped product categories.
- View total orders and returns for each product group.
- Expand rows to display SKU-level details.
- Sort data by columns (e.g., group, orders, returns).
- View timeline of data (start and end dates).

### Data Persistence
- Store uploaded data persistently in the browser using IndexedDB.
- Fetch stored data on page load.
- Clear all stored data with a single click.

## Dark Mode Support

### Overview
The application now supports a dark mode toggle, allowing users to switch between light and dark themes dynamically.

### How to Use
- A toggle switch is available on the `Order Analytics` page.
- Switching the toggle enables or disables dark mode instantly.

### Implementation Details
- Integrated using Material-UI's `ThemeProvider` and `createTheme`.
- The toggle state is managed using React's `useState` hook.

### Testing
- Ensure the toggle switch is visible on the `Order Analytics` page.
- Verify that the theme changes dynamically when the toggle is switched.

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
5. Open the application in your browser at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run test`: Run unit tests using Jest.

## Testing

### Unit Tests
- The project uses Jest and `@testing-library/react` for unit testing.
- Run tests with:
  ```bash
  npm run test
  ```

### Mocking
- IndexedDB is mocked using `fake-indexeddb`.
- External libraries like `pdf-lib` and `papaparse` are mocked for testing.

## Folder Structure

```
material-ui-vite-ts/
├── src/
│   ├── components/        # Reusable UI components
│   ├── containers/        # Layout containers
│   ├── pages/             # Application pages
│   │   ├── home/          # Home page components and services
│   │   ├── orderAnalytics/ # Order analytics components and services
│   ├── storage/           # IndexedDB operations
│   ├── theme.tsx          # Theme configuration
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
├── tests/                 # Unit tests
├── public/                # Static assets
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
```

## Key Components

### Pages
- **Home Page**: Upload CSV files and generate merged PDF labels.
- **Order Analytics Page**: Analyze order data and view grouped analytics.

### Components
- **FileInput**: Reusable file upload component.
- **ProductGroupTable**: Displays grouped data in a table format.
- **Loader**: Displays a loading spinner during asynchronous operations.

### Services
- **merge.service.ts**: Merges Amazon and Flipkart labels into a single PDF.
- **orderAggregation.service.ts**: Aggregates order data by product groups and SKUs.

### Storage
- **db.ts**: Handles IndexedDB operations (save, fetch, delete).

## Future Enhancements
- Add support for additional e-commerce platforms.
- Provide export functionality for analytics data.
- Implement user authentication for multi-user support.

## License
This project is licensed under the MIT License.
