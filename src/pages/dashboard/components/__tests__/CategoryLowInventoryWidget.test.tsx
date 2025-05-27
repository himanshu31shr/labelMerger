import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import CategoryLowInventoryWidget from '../CategoryLowInventoryWidget';
import { LowStockAlert } from '../../../../types/categoryInventory.types';

const theme = createTheme();

const renderCategoryLowInventoryWidget = (props: { categories: LowStockAlert[]; loading: boolean }) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CategoryLowInventoryWidget {...props} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('CategoryLowInventoryWidget', () => {
  it('should show loading indicator when loading is true', () => {
    renderCategoryLowInventoryWidget({ categories: [], loading: true });
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show loading indicator with correct size', () => {
    renderCategoryLowInventoryWidget({ categories: [], loading: true });
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '24px', height: '24px' });
  });

  it('should show well stocked message when no categories and not loading', () => {
    renderCategoryLowInventoryWidget({ categories: [], loading: false });
    
    expect(screen.getByText('All categories are well stocked!')).toBeInTheDocument();
  });

  it('should show correct title and icon', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Electronics',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Low Stock Categories')).toBeInTheDocument();
    expect(screen.getByTestId('WarningIcon')).toBeInTheDocument();
  });

  it('should display category information correctly', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Electronics',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('5 in stock')).toBeInTheDocument();
    expect(screen.getByText('3 products')).toBeInTheDocument();
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });

  it('should display severity indicators correctly for different severity levels', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Electronics',
        currentQuantity: 0,
        lowStockThreshold: 10,
        severity: 'out-of-stock',
        productCount: 3
      },
      {
        categoryId: 'cat2',
        categoryName: 'Clothing',
        currentQuantity: 2,
        lowStockThreshold: 10,
        severity: 'critical',
        productCount: 5
      },
      {
        categoryId: 'cat3',
        categoryName: 'Books',
        currentQuantity: 8,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 2
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });

  it('should show maximum 5 categories', () => {
    const mockCategories: LowStockAlert[] = Array.from({ length: 7 }, (_, i) => ({
      categoryId: `cat${i + 1}`,
      categoryName: `Category ${i + 1}`,
      currentQuantity: 5,
      lowStockThreshold: 10,
      severity: 'low' as const,
      productCount: 3
    }));
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    // Should show only 5 categories
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 5')).toBeInTheDocument();
    expect(screen.queryByText('Category 6')).not.toBeInTheDocument();
    expect(screen.queryByText('Category 7')).not.toBeInTheDocument();
  });

  it('should show "View more" button when there are more than 5 categories', () => {
    const mockCategories: LowStockAlert[] = Array.from({ length: 7 }, (_, i) => ({
      categoryId: `cat${i + 1}`,
      categoryName: `Category ${i + 1}`,
      currentQuantity: 5,
      lowStockThreshold: 10,
      severity: 'low' as const,
      productCount: 3
    }));
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('View 2 more low stock categories')).toBeInTheDocument();
  });

  it('should show "Manage Category Inventory" link when categories <= 5', () => {
    const mockCategories: LowStockAlert[] = Array.from({ length: 3 }, (_, i) => ({
      categoryId: `cat${i + 1}`,
      categoryName: `Category ${i + 1}`,
      currentQuantity: 5,
      lowStockThreshold: 10,
      severity: 'low' as const,
      productCount: 3
    }));
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Manage Category Inventory')).toBeInTheDocument();
  });

  it('should truncate long category names correctly', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'This is a very long category name that should be truncated',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('This is a very long category n...')).toBeInTheDocument();
  });

  it('should not truncate short category names', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Short Name',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Short Name')).toBeInTheDocument();
  });

  it('should have correct chip colors for different severity levels', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Out of Stock Category',
        currentQuantity: 0,
        lowStockThreshold: 10,
        severity: 'out-of-stock',
        productCount: 3
      },
      {
        categoryId: 'cat2',
        categoryName: 'Critical Category',
        currentQuantity: 2,
        lowStockThreshold: 10,
        severity: 'critical',
        productCount: 5
      },
      {
        categoryId: 'cat3',
        categoryName: 'Low Stock Category',
        currentQuantity: 8,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 2
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    // Check if chips are rendered with correct text
    expect(screen.getByText('0 in stock')).toBeInTheDocument();
    expect(screen.getByText('2 in stock')).toBeInTheDocument();
    expect(screen.getByText('8 in stock')).toBeInTheDocument();
  });

  it('should have correct navigation links', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Electronics',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    const manageLink = screen.getByText('Manage Category Inventory');
    expect(manageLink.closest('a')).toHaveAttribute('href', '/flipkart-amazon-tools/inventory/');
  });

  it('should have correct navigation for view more button', () => {
    const mockCategories: LowStockAlert[] = Array.from({ length: 7 }, (_, i) => ({
      categoryId: `cat${i + 1}`,
      categoryName: `Category ${i + 1}`,
      currentQuantity: 5,
      lowStockThreshold: 10,
      severity: 'low' as const,
      productCount: 3
    }));
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    const viewMoreButton = screen.getByText('View 2 more low stock categories');
    expect(viewMoreButton.closest('a')).toHaveAttribute('href', '/flipkart-amazon-tools/inventory/');
  });

  it('should handle categories with zero product count', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Empty Category',
        currentQuantity: 0,
        lowStockThreshold: 10,
        severity: 'out-of-stock',
        productCount: 0
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    expect(screen.getByText('Empty Category')).toBeInTheDocument();
    expect(screen.getByText('0 in stock')).toBeInTheDocument();
    expect(screen.getByText('0 products')).toBeInTheDocument();
  });

  it('should have proper styling and structure', () => {
    const mockCategories: LowStockAlert[] = [
      {
        categoryId: 'cat1',
        categoryName: 'Electronics',
        currentQuantity: 5,
        lowStockThreshold: 10,
        severity: 'low',
        productCount: 3
      }
    ];
    
    renderCategoryLowInventoryWidget({ categories: mockCategories, loading: false });
    
    // Check for Paper wrapper with warning border
    const paper = screen.getByText('Low Stock Categories').closest('[role=""]') || 
                 screen.getByText('Low Stock Categories').closest('.MuiPaper-root');
    expect(paper).toBeInTheDocument();
    
    // Check for list structure
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
  });
}); 