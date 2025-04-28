import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsPage } from '../../../src/pages/products/products.page';
import { ProductService } from '../../../src/services/product.service';
import { Timestamp } from 'firebase/firestore';

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
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
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
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
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

  it('renders loading state initially', () => {
    render(<ProductsPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('loads and displays products', async () => {
    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('TEST-1')).toBeInTheDocument();
      expect(screen.getByText('TEST-2')).toBeInTheDocument();
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

    render(<ProductsPage />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Upload XLSX File')).toBeInTheDocument();
    });

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockServiceInstance.parseXLSXFile).toHaveBeenCalledWith(file);
      expect(mockServiceInstance.saveProducts).toHaveBeenCalled();
      expect(mockServiceInstance.getProducts).toHaveBeenCalledTimes(2); // Initial + after import
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

    render(<ProductsPage />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('TEST-1')).toBeInTheDocument();
    });

    // Click on a product to edit
    fireEvent.click(screen.getByText('TEST-1'));

    // Update the product name
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    // Submit the form
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockServiceInstance.updateProduct).toHaveBeenCalledWith('TEST-1', {
        name: 'Updated Name',
        description: 'Test Description 1',
        costPrice: 100
      });
      expect(mockServiceInstance.getProducts).toHaveBeenCalledTimes(2); // Initial + after update
    });
  });

  it('handles errors during product load', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Failed to load products');
    
    (ProductService as jest.Mock).mockImplementation(() => ({
      getProducts: jest.fn().mockRejectedValue(mockError)
    }));

    render(<ProductsPage />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error loading products:', mockError);
    });

    consoleError.mockRestore();
  });
});