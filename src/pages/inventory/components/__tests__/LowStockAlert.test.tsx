import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LowStockAlert from '../LowStockAlert';
import { Product } from '../../../../services/product.service';

// Create mock low stock products for testing
const createMockLowStockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    sku: `LOW${i + 1}`,
    name: `Low Stock Product ${i + 1}`,
    platform: i % 2 === 0 ? 'amazon' : 'flipkart',
    inventory: {
      quantity: i,
      lowStockThreshold: 5
    }
  })) as Product[];
};

// Create a custom render function with ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    )
  };
};

describe('LowStockAlert', () => {
  const mockUpdateInventory = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the low stock alert with warning icon and title', () => {
    const mockItems = createMockLowStockProducts(3);
    
    renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    expect(screen.getByText('Low Stock Alert')).toBeInTheDocument();
    expect(screen.getByText('The following products are running low on inventory. Consider restocking soon.')).toBeInTheDocument();
  });
  
  it('displays low stock items with their details', () => {
    const mockItems = createMockLowStockProducts(3);
    
    renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Check that product names are displayed
    expect(screen.getByText('Low Stock Product 1')).toBeInTheDocument();
    expect(screen.getByText('Low Stock Product 2')).toBeInTheDocument();
    expect(screen.getByText('Low Stock Product 3')).toBeInTheDocument();
    
    // Check that SKUs are displayed
    expect(screen.getByText('SKU: LOW1')).toBeInTheDocument();
    expect(screen.getByText('SKU: LOW2')).toBeInTheDocument();
    expect(screen.getByText('SKU: LOW3')).toBeInTheDocument();
    
    // Check that inventory levels are displayed
    expect(screen.getByText('0 in stock')).toBeInTheDocument();
    expect(screen.getByText('1 in stock')).toBeInTheDocument();
    expect(screen.getByText('2 in stock')).toBeInTheDocument();
    
    // Check that platforms are displayed - use getAllByText for elements that appear multiple times
    const amazonPlatforms = screen.getAllByText('amazon');
    const flipkartPlatform = screen.getByText('flipkart');
    expect(amazonPlatforms[0]).toBeInTheDocument();
    expect(flipkartPlatform).toBeInTheDocument();
  });
  
  it('limits display to 5 items and shows count of remaining items', () => {
    const mockItems = createMockLowStockProducts(7); // Create 7 items
    
    renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Should only display first 5 items
    expect(screen.getByText('Low Stock Product 1')).toBeInTheDocument();
    expect(screen.getByText('Low Stock Product 5')).toBeInTheDocument();
    expect(screen.queryByText('Low Stock Product 6')).not.toBeInTheDocument();
    expect(screen.queryByText('Low Stock Product 7')).not.toBeInTheDocument();
    
    // Should show button with count of remaining items
    expect(screen.getByText('View 2 more low stock items')).toBeInTheDocument();
  });
  
  it('does not show "View more" button if 5 or fewer items', () => {
    const mockItems = createMockLowStockProducts(5);
    
    renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Should not show "View more" button
    expect(screen.queryByText(/View .* more low stock items/)).not.toBeInTheDocument();
  });
  
  it('calls onUpdateInventory with correct parameters when add button is clicked', async () => {
    const mockItems = createMockLowStockProducts(3);
    
    const { user } = renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Find add buttons
    const addButtons = screen.getAllByRole('button', { name: 'Add 10 to inventory' });
    
    // Click the first add button
    await user.click(addButtons[0]);
    
    // Check that onUpdateInventory was called with correct parameters
    expect(mockUpdateInventory).toHaveBeenCalledWith('LOW1', 10);
  });
  
  it('truncates long product names', () => {
    const longProductName = 'This is a very long product name that should be truncated in the UI display';
    const mockItems = [{
      sku: 'LONG1',
      name: longProductName,
      platform: 'amazon',
      inventory: {
        quantity: 1,
        lowStockThreshold: 5
      }
    }] as Product[];
    
    renderWithTheme(
      <LowStockAlert 
        items={mockItems} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // The component truncates the name and adds "..." at the end
    // Find the element by its title attribute which should contain the full name
    const productNameElement = screen.getByTitle(longProductName);
    expect(productNameElement).toBeInTheDocument();
    
    // The displayed text should be truncated
    expect(productNameElement.textContent).not.toEqual(longProductName);
    expect(productNameElement.textContent?.length).toBeLessThan(longProductName.length);
  });
}); 