import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from '../../src/pages/products/products.page';
import React from 'react';
import { ProductService } from '../../src/services/product.service';
import '@testing-library/jest-dom';

const mockProduct = {
  sku: 'prod1',
  name: 'Test Product',
  costPrice: 100,
  platform: 'amazon',
  description: 'A test product'
};

jest.mock('../../src/services/product.service');

describe('Product Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ProductService as jest.Mock).mockImplementation(() => ({
      getProducts: jest.fn().mockResolvedValue([mockProduct]),
      updateProduct: jest.fn().mockResolvedValue(undefined)
    }));
  });

  it('opens edit product modal', async () => {
    render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );

    // Wait for the product to appear in the table
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Verify modal opens
    await waitFor(() => {
      expect(screen.getByText('Edit Product')).toBeInTheDocument();
    });
  });
});