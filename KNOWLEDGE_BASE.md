# Knowledge Base for Label Merger and Analytics Tool

This file serves as a centralized repository for common knowledge, recurring instructions, and standard practices to be followed in the project. It ensures consistency and efficiency in development and maintenance tasks.

---

## 1. General Instructions

1. **Follow TDD (Test-Driven Development):**
   - Every new feature or change must include corresponding unit tests.
   - Ensure all tests pass before considering the task complete.

2. **Update Documentation:**
   - Update the `PRD.md` file to reflect any new features, changes, or enhancements.
   - Update the `README.md` file to include usage instructions, implementation details, and testing information for new features.

3. **Code Quality:**
   - Follow standard coding practices and ensure code readability.
   - Use meaningful variable and function names.
   - Avoid code duplication and ensure modularity.

4. **Testing Standards:**
   - Use Jest and `@testing-library/react` for unit and integration tests.
   - Mock external dependencies (e.g., IndexedDB, `pdf-lib`, `papaparse`) as needed.
   - Ensure 100% test coverage for critical components and services.

5. **Version Control:**
   - Commit changes with clear and descriptive messages.
   - Use feature branches for new features and merge them into the main branch after review.

---

## 2. Standard Coding Practices

1. **React Components:**
   - Use functional components with hooks (e.g., `useState`, `useEffect`).
   - Ensure components are reusable and modular.
   - Use Material-UI for consistent styling and theming.

2. **State Management:**
   - Use React's `useState` and `useContext` for local and shared state.
   - Avoid unnecessary re-renders by optimizing state updates.

3. **Theming:**
   - Use Material-UI's `ThemeProvider` and `createTheme` for theming.
   - Ensure support for both light and dark modes.

4. **File Structure:**
   - Organize files by feature (e.g., `pages`, `components`, `services`).
   - Use descriptive file and folder names.

5. **Error Handling:**
   - Handle errors gracefully and provide meaningful feedback to users.
   - Log errors for debugging purposes.

---

## 3. Recurring Instructions

1. **Dark Mode Integration:**
   - Use Material-UI's `ThemeProvider` and `createTheme`.
   - Provide a toggle switch for users to switch between light and dark modes.
   - Ensure the toggle state is persistent across sessions (e.g., using localStorage).

2. **IndexedDB Operations:**
   - Use the `idb` library for IndexedDB operations.
   - Ensure data integrity and handle edge cases (e.g., empty or corrupted data).

3. **PDF Generation:**
   - Use `pdf-lib` for PDF generation and manipulation.
   - Ensure compatibility with both Amazon and Flipkart label formats.

4. **CSV Parsing:**
   - Use `papaparse` for parsing CSV files.
   - Validate and sanitize input data before processing.

5. **Transaction Analytics**:
   - Use the `TransactionAnalyticsPage` for uploading and analyzing transaction data.
   - Ensure the `TransactionAnalysisService` is used for processing and summarizing transaction data.
   - Validate uploaded CSV files for correct formatting and required fields.
   - Use the price management modal to update product prices dynamically.
   - Support both Amazon and Flipkart transaction formats.
   - Implement market-specific calculations:
     - Handle different fee structures for each marketplace
     - Process marketplace-specific fields correctly
     - Calculate profits based on marketplace rules
   - Maintain separate summaries for each marketplace
   - Support real-time price updates with dynamic calculation

---

## 4. Testing Guidelines

1. **Unit Tests:**
   - Test individual components and functions in isolation.
   - Use mocks and stubs for external dependencies.

2. **Integration Tests:**
   - Test interactions between components and services.
   - Ensure end-to-end functionality for critical workflows.

3. **Mocking:**
   - Use `fake-indexeddb` for mocking IndexedDB.
   - Mock `pdf-lib` and `papaparse` for PDF and CSV-related tests.

4. **Coverage:**
   - Ensure 100% test coverage for critical components and services.
   - Use the `lcov` report to identify uncovered lines of code.

---

## 5. Documentation Updates

1. **PRD.md:**
   - Add a new section for every new feature or enhancement.
   - Include implementation details, testing requirements, and usage instructions.

2. **README.md:**
   - Update the `Features` section to include new features.
   - Add usage instructions and implementation details for new features.
   - Ensure the `Testing` section is up-to-date.

---

## 6. Future Enhancements

1. **Multi-Platform Support:**
   - Add support for additional e-commerce platforms.
   - Implement standardized data transformation pipeline.
   - Create platform-specific adapters for new marketplaces.

2. **Export Functionality:**
   - Provide options to export analytics data in various formats (CSV, PDF).
   - Support bulk export operations.
   - Implement progress tracking for large exports.

3. **User Authentication:**
   - Implement user authentication for multi-user support.
   - Add role-based access control.
   - Support team collaboration features.

4. **Performance Optimization:**
   - IndexedDB operations:
     - Implement bulk operations for better performance
     - Use indices for faster queries
     - Implement data chunking for large datasets
   - PDF generation:
     - Implement worker threads for PDF processing
     - Add progress tracking for large PDF operations
   - UI optimizations:
     - Implement virtualization for large tables
     - Use React.memo for expensive components
     - Implement progressive loading
   - Data visualization:
     - Add charts and graphs for analytics
     - Implement real-time data updates
     - Support customizable dashboards

---

## 7. Development Workflow

1. **Feature Development:**
   - Create feature branch from main
   - Write tests first (TDD approach)
   - Implement feature
   - Ensure test coverage
   - Document changes in PRD and README
   - Submit pull request

2. **Code Review Process:**
   - Verify test coverage
   - Check performance impact
   - Review documentation updates
   - Ensure accessibility compliance
   - Validate browser compatibility

3. **Release Process:**
   - Update version numbers
   - Generate changelog
   - Create release notes
   - Deploy to staging
   - Perform regression testing
   - Deploy to production

---

This knowledge base will be updated as the project evolves. Always refer to this document before starting any new task or feature implementation.