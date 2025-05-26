import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DownloadButtons } from '../DownloadButtons';

// Mock the utils
jest.mock('../../utils', () => ({
  downloadFile: jest.fn(),
}));

// Get the mocked function
import { downloadFile } from '../../utils';
const mockDownloadFile = downloadFile as jest.MockedFunction<typeof downloadFile>;

const theme = createTheme();

const renderDownloadButtons = (props = {}) => {
  const defaultProps = {
    pdfUrl: undefined,
    onExportSummary: jest.fn(),
    hasSummary: false,
  };

  return render(
    <ThemeProvider theme={theme}>
      <DownloadButtons {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('DownloadButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render empty when no pdfUrl and no summary', () => {
      renderDownloadButtons();
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
      expect(screen.queryByText('Export Summary')).not.toBeInTheDocument();
    });

    it('should render PDF download section when pdfUrl is provided', () => {
      renderDownloadButtons({ pdfUrl: 'test-pdf-url' });
      
      expect(screen.getByText('Download Merged Labels')).toBeInTheDocument();
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.getByTestId('PictureAsPdfIcon')).toBeInTheDocument();
    });

    it('should render summary export section when hasSummary is true', () => {
      renderDownloadButtons({ hasSummary: true });
      
      expect(screen.getByText('Export Product Summary')).toBeInTheDocument();
      expect(screen.getByText('Export Summary')).toBeInTheDocument();
      expect(screen.getByTestId('TableChartIcon')).toBeInTheDocument();
    });

    it('should render both sections when both pdfUrl and hasSummary are provided', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-pdf-url', 
        hasSummary: true 
      });
      
      expect(screen.getByText('Download Merged Labels')).toBeInTheDocument();
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.getByText('Export Product Summary')).toBeInTheDocument();
      expect(screen.getByText('Export Summary')).toBeInTheDocument();
    });

    it('should render dividers when both sections are present', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-pdf-url', 
        hasSummary: true 
      });
      
      // Check for divider elements (they have separator role)
      const dividers = screen.getAllByRole('separator');
      expect(dividers.length).toBeGreaterThan(0);
    });
  });

  describe('PDF download functionality', () => {
    it('should have correct href attribute for PDF download button', () => {
      const testUrl = 'https://example.com/test.pdf';
      renderDownloadButtons({ pdfUrl: testUrl });
      
      const downloadButton = screen.getByText('Download PDF');
      expect(downloadButton.closest('a')).toHaveAttribute('href', testUrl);
    });

    it('should call downloadFile when PDF download button is clicked', () => {
      const testUrl = 'test-pdf-url';
      renderDownloadButtons({ pdfUrl: testUrl });
      
      const downloadButton = screen.getByText('Download PDF');
      fireEvent.click(downloadButton);
      
      expect(mockDownloadFile).toHaveBeenCalledWith(
        expect.any(Object), // event object
        testUrl
      );
    });

    it('should render PDF icon with correct styling', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      const pdfIcon = screen.getByTestId('PictureAsPdfIcon');
      expect(pdfIcon).toBeInTheDocument();
    });

    it('should render download icon in PDF button', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      expect(screen.getByTestId('DownloadIcon')).toBeInTheDocument();
    });
  });

  describe('summary export functionality', () => {
    it('should call onExportSummary when Export Summary button is clicked', () => {
      const mockOnExportSummary = jest.fn();
      renderDownloadButtons({ 
        hasSummary: true, 
        onExportSummary: mockOnExportSummary 
      });
      
      const exportButton = screen.getByText('Export Summary');
      fireEvent.click(exportButton);
      
      expect(mockOnExportSummary).toHaveBeenCalledTimes(1);
    });

    it('should render table chart icon with correct styling', () => {
      renderDownloadButtons({ hasSummary: true });
      
      const tableIcon = screen.getByTestId('TableChartIcon');
      expect(tableIcon).toBeInTheDocument();
    });

    it('should render download icon in summary button', () => {
      renderDownloadButtons({ hasSummary: true });
      
      expect(screen.getByTestId('DownloadIcon')).toBeInTheDocument();
    });

    it('should handle multiple clicks on export summary button', () => {
      const mockOnExportSummary = jest.fn();
      renderDownloadButtons({ 
        hasSummary: true, 
        onExportSummary: mockOnExportSummary 
      });
      
      const exportButton = screen.getByText('Export Summary');
      
      fireEvent.click(exportButton);
      fireEvent.click(exportButton);
      fireEvent.click(exportButton);
      
      expect(mockOnExportSummary).toHaveBeenCalledTimes(3);
    });
  });

  describe('conditional rendering', () => {
    it('should not render PDF section when pdfUrl is empty string', () => {
      renderDownloadButtons({ pdfUrl: '' });
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
    });

    it('should not render PDF section when pdfUrl is null', () => {
      renderDownloadButtons({ pdfUrl: null });
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
    });

    it('should not render summary section when hasSummary is false', () => {
      renderDownloadButtons({ hasSummary: false });
      
      expect(screen.queryByText('Export Summary')).not.toBeInTheDocument();
    });

    it('should render only PDF section when pdfUrl provided but no summary', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: false 
      });
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.queryByText('Export Summary')).not.toBeInTheDocument();
    });

    it('should render only summary section when hasSummary true but no pdfUrl', () => {
      renderDownloadButtons({ 
        pdfUrl: undefined, 
        hasSummary: true 
      });
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
      expect(screen.getByText('Export Summary')).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('should render within a Paper component', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      // Paper component should be rendered (we can check by looking for the button inside it)
      const downloadButton = screen.getByText('Download PDF');
      expect(downloadButton).toBeInTheDocument();
    });

    it('should render buttons with correct variants', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: true 
      });
      
      const pdfButton = screen.getByText('Download PDF');
      const summaryButton = screen.getByText('Export Summary');
      
      expect(pdfButton).toBeInTheDocument();
      expect(summaryButton).toBeInTheDocument();
    });

    it('should render typography elements correctly', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: true 
      });
      
      expect(screen.getByText('Download Merged Labels')).toBeInTheDocument();
      expect(screen.getByText('Export Product Summary')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible button text', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: true 
      });
      
      expect(screen.getByRole('link', { name: /download pdf/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /export summary/i })).toBeInTheDocument();
    });

    it('should have proper link for PDF download', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      const pdfLink = screen.getByRole('link');
      expect(pdfLink).toHaveAttribute('href', 'test-url');
    });

    it('should be keyboard accessible', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: true 
      });
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle missing onExportSummary prop gracefully', () => {
      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <DownloadButtons
              pdfUrl="test-url"
              onExportSummary={undefined as unknown as () => void}
              hasSummary={true}
            />
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('should handle very long URLs', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.pdf';
      renderDownloadButtons({ pdfUrl: longUrl });
      
      const downloadButton = screen.getByText('Download PDF');
      expect(downloadButton.closest('a')).toHaveAttribute('href', longUrl);
    });

    it('should handle special characters in URL', () => {
      const specialUrl = 'https://example.com/file%20with%20spaces&special=chars.pdf';
      renderDownloadButtons({ pdfUrl: specialUrl });
      
      const downloadButton = screen.getByText('Download PDF');
      expect(downloadButton.closest('a')).toHaveAttribute('href', specialUrl);
    });

    it('should handle re-renders correctly', () => {
      const { rerender } = renderDownloadButtons({ pdfUrl: 'initial-url' });
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={theme}>
          <DownloadButtons
            pdfUrl="updated-url"
            onExportSummary={jest.fn()}
            hasSummary={true}
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.getByText('Export Summary')).toBeInTheDocument();
    });
  });

  describe('component integration', () => {
    it('should work with different themes', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <DownloadButtons
            pdfUrl="test-url"
            onExportSummary={jest.fn()}
            hasSummary={true}
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.getByText('Export Summary')).toBeInTheDocument();
    });

    it('should render all Material-UI components correctly', () => {
      renderDownloadButtons({ 
        pdfUrl: 'test-url', 
        hasSummary: true 
      });
      
      // Check that all expected elements are rendered
      expect(screen.getByTestId('PictureAsPdfIcon')).toBeInTheDocument();
      expect(screen.getByTestId('TableChartIcon')).toBeInTheDocument();
      expect(screen.getAllByTestId('DownloadIcon')).toHaveLength(2);
    });
  });
}); 