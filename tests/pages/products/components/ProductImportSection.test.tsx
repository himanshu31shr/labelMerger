import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductImportSection } from '../../../../src/pages/products/components/ProductImportSection';

describe('ProductImportSection', () => {
  const mockOnImport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders import button and help text', () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    expect(screen.getByText('Import Products')).toBeInTheDocument();
    expect(screen.getByText('Upload XLSX File')).toBeInTheDocument();
    expect(screen.getByText(/Supported formats/)).toBeInTheDocument();
  });

  it('shows error for invalid file type', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Upload XLSX File');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/Please upload an Excel file/)).toBeInTheDocument();
    });
    expect(mockOnImport).not.toHaveBeenCalled();
  });

  it('calls onImport for valid Excel file', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File');

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnImport).toHaveBeenCalledWith(file);
  });

  it('shows error message when import fails', async () => {
    mockOnImport.mockRejectedValueOnce(new Error('Import failed'));
    render(<ProductImportSection onImport={mockOnImport} />);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/Failed to import products/)).toBeInTheDocument();
    });
  });

  it('clears file input after successful import', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});