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

  it('supports both xlsx and xls file extensions', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    // Test .xlsx
    const xlsxFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File');
    fireEvent.change(input, { target: { files: [xlsxFile] } });
    expect(mockOnImport).toHaveBeenCalledWith(xlsxFile);

    // Test .xls
    const xlsFile = new File([''], 'test.xls', { type: 'application/vnd.ms-excel' });
    fireEvent.change(input, { target: { files: [xlsFile] } });
    expect(mockOnImport).toHaveBeenCalledWith(xlsFile);
  });

  it('handles empty file selection', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    const input = screen.getByLabelText('Upload XLSX File');
    fireEvent.change(input, { target: { files: [] } });

    expect(mockOnImport).not.toHaveBeenCalled();
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

  it('clears error message on successful import', async () => {
    render(<ProductImportSection onImport={mockOnImport} />);

    // First trigger an error
    const txtFile = new File([''], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Upload XLSX File');
    fireEvent.change(input, { target: { files: [txtFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Please upload an Excel file/)).toBeInTheDocument();
    });

    // Then do a successful import
    const xlsxFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fireEvent.change(input, { target: { files: [xlsxFile] } });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
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

  it('clears file input after failed import', async () => {
    mockOnImport.mockRejectedValueOnce(new Error('Import failed'));
    render(<ProductImportSection onImport={mockOnImport} />);

    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText('Upload XLSX File') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});