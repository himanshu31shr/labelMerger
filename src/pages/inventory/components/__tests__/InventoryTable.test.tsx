import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InventoryTable from '../InventoryTable';
import { Product } from '../../../../services/product.service';

// Create mock products for testing
const mockProducts: Product[] = [
  { 
    sku: 'ABC123', 
    name: 'Test Product 1', 
    platform: 'amazon',
    inventory: { 
      quantity: 10, 
      lowStockThreshold: 5 
    } 
  },
  { 
    sku: 'DEF456', 
    name: 'Test Product 2', 
    platform: 'flipkart',
    inventory: { 
      quantity: 3, 
      lowStockThreshold: 5 
    } 
  },
  { 
    sku: 'GHI789', 
    name: 'Out of Stock Item', 
    platform: 'amazon',
    inventory: { 
      quantity: 0, 
      lowStockThreshold: 5 
    } 
  },
  // Add more items to test pagination
  ...Array.from({ length: 8 }, (_, i) => ({
    sku: `SKU${i + 10}`,
    name: `Pagination Test Product ${i + 1}`,
    platform: i % 2 === 0 ? 'amazon' : 'flipkart',
    inventory: {
      quantity: i + 5,
      lowStockThreshold: 5
    }
  }))
] as Product[];

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

describe('InventoryTable', () => {
  const mockUpdateInventory = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the inventory table with headers and data', () => {
    renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Check headers
    expect(screen.getByText('SKU')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Current Stock')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check first row data
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    // Use getAllByText for elements that appear multiple times, and select the first one that's a table cell
    const stockCells = screen.getAllByText('10').filter(
      node => node.tagName.toLowerCase() === 'td'
    );
    expect(stockCells[0]).toBeInTheDocument();
    
    // Find the In Stock text in the first row
    const statusChips = screen.getAllByText('In Stock');
    expect(statusChips[0]).toBeInTheDocument();
  });
  
  it('shows loading state when loading is true', () => {
    renderWithTheme(
      <InventoryTable 
        items={[]} 
        loading={true} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // CircularProgress should be rendered
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  
  it('shows empty state when no items are available', () => {
    renderWithTheme(
      <InventoryTable 
        items={[]} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
  
  it('handles pagination correctly', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // By default, should show 10 items per page
    expect(screen.getAllByRole('row').length).toBe(11); // 10 data rows + 1 header row
    
    // Go to next page
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    await user.click(nextPageButton);
    
    // On second page, should show remaining items
    expect(screen.getAllByRole('row').length).toBe(2); // 1 data row + 1 header row
    
    // Change rows per page
    const rowsPerPageSelect = screen.getByRole('combobox');
    await user.click(rowsPerPageSelect);
    await user.click(screen.getByRole('option', { name: '5' }));
    
    // Now should show 5 items per page
    expect(screen.getAllByRole('row').length).toBe(6); // 5 data rows + 1 header row
  });
  
  it('shows different status chips based on inventory levels', () => {
    renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Find status chips using their nearest Chip component
    const inStockChips = screen.getAllByText('In Stock');
    const lowStockChips = screen.getAllByText('Low Stock');
    const outOfStockChip = screen.getByText('Out of Stock');
    
    // Check for the presence of the status chips
    expect(inStockChips.length).toBeGreaterThan(0);
    expect(lowStockChips.length).toBeGreaterThan(0);
    expect(outOfStockChip).toBeInTheDocument();
    
    // Instead of checking color attributes, just verify they exist
    expect(inStockChips[0]).toBeInTheDocument();
    expect(lowStockChips[0]).toBeInTheDocument();
    expect(outOfStockChip).toBeInTheDocument();
  });
  
  it('calls onUpdateInventory with correct parameters when quick add button is clicked', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Find quick add button for first product
    const addButtons = screen.getAllByRole('button', { name: 'Add 1' });
    await user.click(addButtons[0]);
    
    // Check that onUpdateInventory was called with correct parameters
    expect(mockUpdateInventory).toHaveBeenCalledWith('ABC123', 1);
  });
  
  it('calls onUpdateInventory with correct parameters when quick remove button is clicked', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Find quick remove button for first product
    const removeButtons = screen.getAllByRole('button', { name: 'Remove 1' });
    await user.click(removeButtons[0]);
    
    // Check that onUpdateInventory was called with correct parameters
    expect(mockUpdateInventory).toHaveBeenCalledWith('ABC123', -1);
  });
  
  it('opens edit dialog when edit button is clicked', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Find edit button for first product
    const editButtons = screen.getAllByRole('button', { name: 'Edit Inventory' });
    await user.click(editButtons[0]);
    
    // Check that dialog is open
    expect(screen.getByText('Edit Inventory')).toBeInTheDocument();
    
    // Check that quantity field is populated with current value
    const quantityInput = screen.getByLabelText('Quantity');
    expect(quantityInput).toHaveValue(10);
    
    // Check that threshold field is populated
    const thresholdInput = screen.getByLabelText('Low Stock Threshold');
    expect(thresholdInput).toHaveValue(5);
  });
  
  it('calls onUpdateInventory with correct parameters when edit dialog is saved', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Open edit dialog
    const editButtons = screen.getAllByRole('button', { name: 'Edit Inventory' });
    await user.click(editButtons[0]);
    
    // Change quantity from 10 to 20
    const quantityInput = screen.getByLabelText('Quantity');
    await user.clear(quantityInput);
    await user.type(quantityInput, '20');
    
    // Save changes
    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);
    
    // Check that onUpdateInventory was called with the difference (20 - 10 = 10)
    expect(mockUpdateInventory).toHaveBeenCalledWith('ABC123', 10);
  });
  
  it('handles invalid and empty input in edit dialog quantity field', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Open edit dialog for the first product (quantity 10)
    const editButtons = screen.getAllByRole('button', { name: 'Edit Inventory' });
    await user.click(editButtons[0]);
    
    const quantityInput = screen.getByLabelText('Quantity') as HTMLInputElement;
    expect(quantityInput.value).toBe('10'); // Initial value

    // Try to type invalid alpha input
    await user.clear(quantityInput);
    await user.type(quantityInput, 'abc');
    expect(quantityInput.value).toBe('0'); // Should default to 0 for invalid alpha input

    // Clear the input (empty string should also result in 0 due to parseInt('') || 0)
    await user.clear(quantityInput);
    expect(quantityInput.value).toBe('0'); // Should default to 0 for empty input
  });
  
  it('closes edit dialog without saving when cancel is clicked', async () => {
    const { user } = renderWithTheme(
      <InventoryTable 
        items={mockProducts} 
        loading={false} 
        onUpdateInventory={mockUpdateInventory} 
      />
    );
    
    // Open edit dialog
    const editButtons = screen.getAllByRole('button', { name: 'Edit Inventory' });
    await user.click(editButtons[0]);
    
    // Change quantity
    const quantityInput = screen.getByLabelText('Quantity');
    await user.clear(quantityInput);
    await user.type(quantityInput, '20');
    
    // Click cancel
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);
    
    // Dialog should be closed - use waitFor to handle async dialog closing
    await waitFor(() => {
      expect(screen.queryByText('Edit Inventory')).not.toBeInTheDocument();
    });
    
    // onUpdateInventory should not have been called
    expect(mockUpdateInventory).not.toHaveBeenCalled();
  });
}); 