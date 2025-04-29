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
const mockProducts: Product[] = [
  {
    sku: 'TEST-1',
    name: 'Test Product 1',
    description: 'Description 1',
    costPrice: 100,
    platform: 'amazon',
    metadata: {
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastImportedFrom: 'test',
      flipkartSerialNumber: '123'
    }
  },
  {
    sku: 'TEST-2',
    name: 'Test Product 2',
    description: 'Description 2',
    costPrice: 200,
    platform: 'flipkart',
    metadata: {
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastImportedFrom: 'test',
      flipkartSerialNumber: '456'
    }
  }
];

describe('ProductTable', () => {
  const mockOnEdit = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all products with correct formatting', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Check SKUs
    expect(screen.getByText('TEST-1')).toBeInTheDocument();
    expect(screen.getByText('TEST-2')).toBeInTheDocument();

    // Check descriptions
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();

    // Check platforms
    expect(screen.getByText('amazon')).toBeInTheDocument();
    expect(screen.getByText('flipkart')).toBeInTheDocument();

    // Check cost price formatting
    expect(screen.getByText('₹100.00')).toBeInTheDocument();
    expect(screen.getByText('₹200.00')).toBeInTheDocument();
  });

  it('filters by platform', async () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Open the select dropdown
    const platformSelect = screen.getByLabelText('Platform');
    fireEvent.mouseDown(platformSelect);

    // Click the amazon option
    const amazonOption = screen.getByRole('option', { name: 'Amazon' });
    fireEvent.click(amazonOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: 'amazon',
      search: ''
    });
  });

  it('filters by search term', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      platform: '',
      search: 'test'
    });
  });

  it('calls onEdit when edit icon is clicked', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    const editButton = screen.getByLabelText('edit-TEST-1');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('renders product links correctly', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://www.flipkart.com/product/p/itme?pid=123');
    expect(links[1]).toHaveAttribute('href', 'https://www.flipkart.com/product/p/itme?pid=456');
  });

  it('clears filters when All is selected', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
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
      platform: '',
      search: ''
    });
  });
});