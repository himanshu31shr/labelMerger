import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTable } from '../../../../src/pages/products/components/ProductTable';
import { Product } from '../../../../src/services/product.service';
import { Timestamp } from 'firebase/firestore';

// Mock Firebase Timestamp
const mockTimestamp = {
  seconds: 1234567890,
  nanoseconds: 0,
  toDate: () => new Date(1234567890 * 1000),
  toMillis: () => 1234567890 * 1000,
  isEqual: (other: typeof mockTimestamp) => 
    other.seconds === mockTimestamp.seconds && 
    other.nanoseconds === mockTimestamp.nanoseconds,
  toJSON: () => ({ seconds: 1234567890, nanoseconds: 0 })
};

jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: () => mockTimestamp
  }
}));

describe('ProductTable', () => {
  const mockProducts: Product[] = [
    {
      sku: 'SKU1',
      name: 'Product 1',
      description: 'Description 1',
      platform: 'amazon',
      costPrice: 100,
      sellingPrice: 200,
      metadata: {}
    },
    {
      sku: 'SKU2',
      name: 'Product 2',
      description: 'Description 2',
      platform: 'flipkart',
      costPrice: 150,
      sellingPrice: 300,
      metadata: {}
    }
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all products with correct formatting', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Check product info
    expect(screen.getByText('SKU1')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    
    // Check platform badges
    expect(screen.getByDisplayValue('amazon')).toBeInTheDocument();
    expect(screen.getByDisplayValue('flipkart')).toBeInTheDocument();

    // Check currency formatting
    expect(screen.getByText('₹100.00')).toBeInTheDocument();
    expect(screen.getByText('₹200.00')).toBeInTheDocument();
  });

  it('filters by platform', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    const platformSelect = screen.getByLabelText('Platform');
    fireEvent.mouseDown(platformSelect);

    const amazonOption = screen.getByRole('option', { name: 'Amazon' });
    fireEvent.click(amazonOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: 'amazon',
      search: ''
    });
  });

  it('clears filters when All is selected', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    const platformSelect = screen.getByLabelText('Platform');
    fireEvent.mouseDown(platformSelect);

    const amazonOption = screen.getByRole('option', { name: 'Amazon' });
    fireEvent.click(amazonOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: 'amazon',
      search: ''
    });

    fireEvent.mouseDown(platformSelect);
    const allOption = screen.getByRole('option', { name: 'All' });
    fireEvent.click(allOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: undefined,
      search: ''
    });
  });

  it('filters by search term', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: undefined,
      search: 'test'
    });
  });

  it('calls onEdit when edit icon is clicked', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    const editButton = screen.getByLabelText('edit-SKU1');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('renders product links correctly', () => {
    const mockProductWithFlipkartId = {
      ...mockProducts[1],
      metadata: {
        ...mockProducts[1].metadata,
        flipkartSerialNumber: '12345'
      }
    };

    render(<ProductTable 
      products={[mockProductWithFlipkartId]} 
      onEdit={mockOnEdit} 
      onDelete={mockOnDelete} 
      onFilterChange={mockOnFilterChange} 
    />);

    // Find view button (RemoveRedEyeIcon button) for Flipkart product
    const viewButton = screen.getByTestId('view-flipkart-12345');
    expect(viewButton).toHaveAttribute('href', 'https://www.flipkart.com/product/p/itme?pid=12345');
  });

  it('clears filters when All is selected', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onFilterChange={mockOnFilterChange}
      />
    );

    // First set a platform filter
    const platformSelect = screen.getByLabelText('Platform');
    fireEvent.mouseDown(platformSelect);
    const amazonOption = screen.getByRole('option', { name: 'Amazon' });
    fireEvent.click(amazonOption);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: 'amazon',
      search: ''
    });

    // Then clear it by selecting All
    fireEvent.mouseDown(platformSelect);
    const allOption = screen.getByRole('option', { name: 'All' });
    fireEvent.click(allOption);

    // Verify the last call clears the filter
    const lastCall = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1][0];
    expect(lastCall).toEqual({
      platform: undefined,
      search: ''
    });
  });
});