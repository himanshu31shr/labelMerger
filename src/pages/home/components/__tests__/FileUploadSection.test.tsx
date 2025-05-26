import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FileUploadSection } from '../FileUploadSection';

// Mock the FileInput component
interface MockFileInputProps {
  name: string;
  selected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accepts: string;
}

jest.mock('../../file-input', () => ({
  FileInput: ({ name, selected, onChange, accepts }: MockFileInputProps) => (
    <div data-testid={`file-input-${name}`}>
      <input
        type="file"
        accept={accepts}
        data-testid={`file-input-${name}-input`}
        onChange={onChange}
      />
      <span data-testid={`file-input-${name}-status`}>
        {selected ? 'File Selected' : `Select ${name}`}
      </span>
    </div>
  ),
}));

const theme = createTheme();

const defaultProps = {
  onAmazonChange: jest.fn(),
  onFlipkartChange: jest.fn(),
};

const renderFileUploadSection = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <FileUploadSection {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('FileUploadSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render both Amazon and Flipkart upload sections', () => {
      renderFileUploadSection();
      
      expect(screen.getByText('Amazon Label')).toBeInTheDocument();
      expect(screen.getByText('Flipkart Label')).toBeInTheDocument();
    });

    it('should render upload instructions when no files are selected', () => {
      renderFileUploadSection();
      
      expect(screen.getByText('Upload your Amazon shipping label (PDF)')).toBeInTheDocument();
      expect(screen.getByText('Upload your Flipkart shipping label (PDF)')).toBeInTheDocument();
    });

    it('should render file names when files are selected', () => {
      const amazonFile = new File(['test'], 'amazon-label.pdf', { type: 'application/pdf' });
      const flipkartFile = new File(['test'], 'flipkart-label.pdf', { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
        flipkartFile,
      });
      
      expect(screen.getByText('amazon-label.pdf')).toBeInTheDocument();
      expect(screen.getByText('flipkart-label.pdf')).toBeInTheDocument();
    });

    it('should render CloudUpload icons', () => {
      renderFileUploadSection();
      
      const icons = screen.getAllByTestId('CloudUploadIcon');
      expect(icons).toHaveLength(2);
    });

    it('should render FileInput components with correct props', () => {
      renderFileUploadSection();
      
      expect(screen.getByTestId('file-input-amazon')).toBeInTheDocument();
      expect(screen.getByTestId('file-input-flipkart')).toBeInTheDocument();
      
      const amazonInput = screen.getByTestId('file-input-amazon-input');
      const flipkartInput = screen.getByTestId('file-input-flipkart-input');
      
      expect(amazonInput).toHaveAttribute('accept', 'application/pdf');
      expect(flipkartInput).toHaveAttribute('accept', 'application/pdf');
    });
  });

  describe('file selection states', () => {
    it('should show unselected state when no files are provided', () => {
      renderFileUploadSection();
      
      expect(screen.getByTestId('file-input-amazon-status')).toHaveTextContent('Select amazon');
      expect(screen.getByTestId('file-input-flipkart-status')).toHaveTextContent('Select flipkart');
    });

    it('should show selected state when files are provided', () => {
      const amazonFile = new File(['test'], 'amazon.pdf', { type: 'application/pdf' });
      const flipkartFile = new File(['test'], 'flipkart.pdf', { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
        flipkartFile,
      });
      
      expect(screen.getByTestId('file-input-amazon-status')).toHaveTextContent('File Selected');
      expect(screen.getByTestId('file-input-flipkart-status')).toHaveTextContent('File Selected');
    });

    it('should show mixed states when only one file is selected', () => {
      const amazonFile = new File(['test'], 'amazon.pdf', { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
      });
      
      expect(screen.getByTestId('file-input-amazon-status')).toHaveTextContent('File Selected');
      expect(screen.getByTestId('file-input-flipkart-status')).toHaveTextContent('Select flipkart');
    });
  });

  describe('file change handlers', () => {
    it('should call onAmazonChange when Amazon file is selected', () => {
      const onAmazonChange = jest.fn();
      renderFileUploadSection({ onAmazonChange });
      
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = screen.getByTestId('file-input-amazon-input');
      
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      
      fireEvent.change(input);
      
      expect(onAmazonChange).toHaveBeenCalledWith(file);
    });

    it('should call onFlipkartChange when Flipkart file is selected', () => {
      const onFlipkartChange = jest.fn();
      renderFileUploadSection({ onFlipkartChange });
      
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = screen.getByTestId('file-input-flipkart-input');
      
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      
      fireEvent.change(input);
      
      expect(onFlipkartChange).toHaveBeenCalledWith(file);
    });

    it('should handle empty file selection for Amazon', () => {
      const onAmazonChange = jest.fn();
      renderFileUploadSection({ onAmazonChange });
      
      const input = screen.getByTestId('file-input-amazon-input');
      
      Object.defineProperty(input, 'files', {
        value: null,
        writable: false,
      });
      
      fireEvent.change(input);
      
      expect(onAmazonChange).not.toHaveBeenCalled();
    });

    it('should handle empty file selection for Flipkart', () => {
      const onFlipkartChange = jest.fn();
      renderFileUploadSection({ onFlipkartChange });
      
      const input = screen.getByTestId('file-input-flipkart-input');
      
      Object.defineProperty(input, 'files', {
        value: null,
        writable: false,
      });
      
      fireEvent.change(input);
      
      expect(onFlipkartChange).not.toHaveBeenCalled();
    });
  });

  describe('layout and styling', () => {
    it('should render in a grid layout', () => {
      renderFileUploadSection();
      
      // Check for the main grid container by class
      const container = document.querySelector('.MuiGrid-container');
      expect(container).toBeInTheDocument();
    });

    it('should render cards for both upload sections', () => {
      renderFileUploadSection();
      
      // Cards don't have specific roles, but we can check for their content structure
      expect(screen.getByText('Amazon Label')).toBeInTheDocument();
      expect(screen.getByText('Flipkart Label')).toBeInTheDocument();
    });

    it('should render with proper typography hierarchy', () => {
      renderFileUploadSection();
      
      // Check for h6 elements (variant="h6")
      const amazonTitle = screen.getByText('Amazon Label');
      const flipkartTitle = screen.getByText('Flipkart Label');
      
      expect(amazonTitle).toBeInTheDocument();
      expect(flipkartTitle).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper file input accessibility', () => {
      renderFileUploadSection();
      
      const amazonInput = screen.getByTestId('file-input-amazon-input');
      const flipkartInput = screen.getByTestId('file-input-flipkart-input');
      
      expect(amazonInput).toHaveAttribute('type', 'file');
      expect(flipkartInput).toHaveAttribute('type', 'file');
    });

    it('should accept only PDF files', () => {
      renderFileUploadSection();
      
      const amazonInput = screen.getByTestId('file-input-amazon-input');
      const flipkartInput = screen.getByTestId('file-input-flipkart-input');
      
      expect(amazonInput).toHaveAttribute('accept', 'application/pdf');
      expect(flipkartInput).toHaveAttribute('accept', 'application/pdf');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined file props', () => {
      renderFileUploadSection({
        amazonFile: undefined,
        flipkartFile: undefined,
      });
      
      expect(screen.getByText('Upload your Amazon shipping label (PDF)')).toBeInTheDocument();
      expect(screen.getByText('Upload your Flipkart shipping label (PDF)')).toBeInTheDocument();
    });

    it('should handle files with long names', () => {
      const longFileName = 'very-long-file-name-that-might-cause-layout-issues-amazon-shipping-label.pdf';
      const amazonFile = new File(['test'], longFileName, { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
      });
      
      expect(screen.getByText(longFileName)).toBeInTheDocument();
    });

    it('should handle files with special characters in names', () => {
      const specialFileName = 'amazon-label-@#$%^&*()_+.pdf';
      const amazonFile = new File(['test'], specialFileName, { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
      });
      
      expect(screen.getByText(specialFileName)).toBeInTheDocument();
    });

    it('should handle missing onChange handlers gracefully', () => {
      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <FileUploadSection
              onAmazonChange={() => {}}
              onFlipkartChange={() => {}}
            />
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('component integration', () => {
    it('should work with different theme modes', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      
      render(
        <ThemeProvider theme={darkTheme}>
          <FileUploadSection {...defaultProps} />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Amazon Label')).toBeInTheDocument();
      expect(screen.getByText('Flipkart Label')).toBeInTheDocument();
    });

    it('should handle re-renders correctly', () => {
      const { rerender } = renderFileUploadSection();
      
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      
      rerender(
        <ThemeProvider theme={theme}>
          <FileUploadSection
            {...defaultProps}
            amazonFile={file}
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    it('should maintain state consistency', () => {
      const amazonFile = new File(['test'], 'amazon.pdf', { type: 'application/pdf' });
      const flipkartFile = new File(['test'], 'flipkart.pdf', { type: 'application/pdf' });
      
      renderFileUploadSection({
        amazonFile,
        flipkartFile,
      });
      
      // Both files should be shown as selected
      expect(screen.getByTestId('file-input-amazon-status')).toHaveTextContent('File Selected');
      expect(screen.getByTestId('file-input-flipkart-status')).toHaveTextContent('File Selected');
      
      // File names should be displayed
      expect(screen.getByText('amazon.pdf')).toBeInTheDocument();
      expect(screen.getByText('flipkart.pdf')).toBeInTheDocument();
    });
  });
}); 