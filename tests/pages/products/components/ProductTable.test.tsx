import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTable } from '../../../../src/pages/products/components/ProductTable';
import { Product } from '../../../../src/services/product.service';
import { Timestamp } from 'firebase/firestore';

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
      lastImportedFrom: 'test'
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
      lastImportedFrom: 'test'
    }
  }
];

describe('ProductTable', () => {
  const mockOnEdit = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all products', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByText('TEST-1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('TEST-2')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('filters by platform', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    const platformSelect = screen.getByLabelText('Platform');
    fireEvent.change(platformSelect, { target: { value: 'amazon' } });

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

  it('calls onEdit when row is clicked', () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onFilterChange={mockOnFilterChange}
      />
    );

    fireEvent.click(screen.getByText('TEST-1'));

    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });
});