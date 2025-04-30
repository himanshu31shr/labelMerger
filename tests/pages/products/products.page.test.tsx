import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsPage } from '../../../src/pages/products/products.page';
import { ProductService } from '../../../src/services/product.service';
import { act } from 'react';

// Mock firebase/firestore
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: () => ({ seconds: 1234567890, nanoseconds: 0 })
  }
}));

// Mock the ProductService
jest.mock('../../../src/services/product.service');

const mockProducts = [
  {
    sku: 'TEST-1',
    name: 'Test Product 1',
    description: 'Test Description 1',
    costPrice: 100,
    platform: 'amazon',
    metadata: {
      createdAt: { seconds: 1234567890, nanoseconds: 0 },
      updatedAt: { seconds: 1234567890, nanoseconds: 0 },
      lastImportedFrom: 'test'
    }
  },
  {
    sku: 'TEST-2',
    name: 'Test Product 2',
    description: 'Test Description 2',
    costPrice: 200,
    platform: 'flipkart',
    metadata: {
      createdAt: { seconds: 1234567890, nanoseconds: 0 },
      updatedAt: { seconds: 1234567890, nanoseconds: 0 },
      lastImportedFrom: 'test'
    }
  }
];

describe('ProductsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ProductService as jest.Mock).mockImplementation(() => ({
      getProducts: jest.fn().mockResolvedValue(mockProducts),
      parseXLSXFile: jest.fn().mockResolvedValue([]),
      saveProducts: jest.fn().mockResolvedValue(undefined),
      updateProduct: jest.fn().mockResolvedValue(undefined)
    }));
  });

  it('renders loading state initially', async () => {
    render(<ProductsPage />);
    
    // Initial loading state should show CircularProgress
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('loads and displays products', async () => {
    await act(async () => {
      render(<ProductsPage />);
    });

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.some(cell => cell.textContent === 'TEST-1')).toBe(true);
      expect(cells.some(cell => cell.textContent === 'TEST-2')).toBe(true);
    });
  });

  it('handles product import', async () => {
    const mockServiceInstance = {
      getProducts: jest.fn().mockResolvedValue(mockProducts),
      parseXLSXFile: jest.fn().mockResolvedValue([mockProducts[0]]),
      saveProducts: jest.fn().mockResolvedValue(undefined),
      updateProduct: jest.fn().mockResolvedValue(undefined)
    };
    (ProductService as jest.Mock).mockImplementation(() => mockServiceInstance);

    await act(async () => {
      render(<ProductsPage />);
    });

    const uploadButton = screen.getByRole('button', { name: /upload xlsx file/i });
    expect(uploadButton).toBeInTheDocument();

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    await act(async () => {
      const input = uploadButton.querySelector('input[type="file"]');
      if (input) {
        fireEvent.change(input, { target: { files: [file] } });
      }
    });

    await waitFor(() => {
      expect(mockServiceInstance.parseXLSXFile).toHaveBeenCalledWith(file);
      expect(mockServiceInstance.saveProducts).toHaveBeenCalled();
      expect(mockServiceInstance.getProducts).toHaveBeenCalled();
    });
  });

  it('handles product update', async () => {
    const mockServiceInstance = {
      getProducts: jest.fn().mockResolvedValue(mockProducts),
      parseXLSXFile: jest.fn().mockResolvedValue([]),
      saveProducts: jest.fn().mockResolvedValue(undefined),
      updateProduct: jest.fn().mockResolvedValue(undefined)
    };
    (ProductService as jest.Mock).mockImplementation(() => mockServiceInstance);

    await act(async () => {
      render(<ProductsPage />);
    });

    // Wait for products to load
    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.some(cell => cell.textContent === 'TEST-1')).toBe(true);
    });

    // Find and click the edit button for the first product
    const editButton = screen.getByLabelText('edit-TEST-1');
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Update the product details in modal
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const costPriceInput = screen.getByLabelText(/cost price/i);

      fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
      fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
      fireEvent.change(costPriceInput, { target: { value: '150' } });
    });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockServiceInstance.updateProduct).toHaveBeenCalledWith('TEST-1', {
        name: 'Updated Name',
        description: 'Updated Description',
        costPrice: 150
      });
      expect(mockServiceInstance.getProducts).toHaveBeenCalled();
    });
  });

  it('handles errors during product load', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Failed to load products');
    
    (ProductService as jest.Mock).mockImplementation(() => ({
      getProducts: jest.fn().mockRejectedValue(mockError)
    }));

    await act(async () => {
      render(<ProductsPage />);
    });

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error loading products:', mockError);
    });

    consoleError.mockRestore();
  });
});