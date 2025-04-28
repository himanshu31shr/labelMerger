import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductEditModal } from '../../../../src/pages/products/components/ProductEditModal';
import { Product } from '../../../../src/services/product.service';
import { Timestamp } from 'firebase/firestore';

const mockProduct: Product = {
  sku: 'TEST-1',
  name: 'Test Product',
  description: 'Test Description',
  costPrice: 100,
  platform: 'amazon',
  metadata: {
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastImportedFrom: 'test'
  }
};

describe('ProductEditModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByDisplayValue('TEST-1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('amazon')).toBeInTheDocument();
  });

  it('disables SKU and platform fields', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByDisplayValue('TEST-1')).toBeDisabled();
    expect(screen.getByDisplayValue('amazon')).toBeDisabled();
  });

  it('calls onSave with updated values when form is submitted', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    const descriptionInput = screen.getByLabelText('Description');
    const costPriceInput = screen.getByLabelText('Cost Price');

    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.change(costPriceInput, { target: { value: '200' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockOnSave).toHaveBeenCalledWith('TEST-1', {
      name: 'Updated Name',
      description: 'Updated Description',
      costPrice: 200
    });
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});