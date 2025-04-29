import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductEditModal } from '../../../../src/pages/products/components/ProductEditModal';
import { Product } from '../../../../src/services/product.service';

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

const mockProduct: Product = {
  sku: 'TEST-1',
  name: 'Test Product',
  description: 'Test Description',
  costPrice: 100,
  platform: 'amazon',
  metadata: {
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
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

    expect(screen.getByLabelText('SKU')).toHaveValue('TEST-1');
    expect(screen.getByLabelText('Name')).toHaveValue('Test Product');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    expect(screen.getByLabelText('Cost Price')).toHaveValue(100);
    expect(screen.getByLabelText('Platform')).toHaveValue('amazon');
  });

  it('disables SKU and platform fields', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByLabelText('SKU')).toBeDisabled();
    expect(screen.getByLabelText('Platform')).toBeDisabled();
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

    const submitButton = screen.getByText('Save Changes');
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalledWith('TEST-1', {
      name: 'Updated Name',
      description: 'Updated Description',
      costPrice: 200
    });
  });

  it('validates required fields before submission', () => {
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

    // Clear required fields
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.change(costPriceInput, { target: { value: '' } });

    const submitButton = screen.getByText('Save Changes');
    fireEvent.click(submitButton);

    // Form should not submit with empty required fields
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('validates cost price is non-negative', () => {
    render(
      <ProductEditModal
        product={mockProduct}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const costPriceInput = screen.getByLabelText('Cost Price');
    fireEvent.change(costPriceInput, { target: { value: '-100' } });

    const submitButton = screen.getByText('Save Changes');
    fireEvent.click(submitButton);

    // Should not allow negative cost price
    expect(mockOnSave).not.toHaveBeenCalled();
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