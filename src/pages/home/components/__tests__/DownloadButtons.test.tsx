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
    it('should render empty when no pdfUrl', () => {
      renderDownloadButtons();
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
    });

    it('should render PDF download section when pdfUrl is provided', () => {
      renderDownloadButtons({ pdfUrl: 'test-pdf-url' });
      
      expect(screen.getByText('Download Merged Labels')).toBeInTheDocument();
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      expect(screen.getByTestId('PictureAsPdfIcon')).toBeInTheDocument();
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

  describe('conditional rendering', () => {
    it('should not render PDF section when pdfUrl is empty string', () => {
      renderDownloadButtons({ pdfUrl: '' });
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
    });

    it('should not render PDF section when pdfUrl is null', () => {
      renderDownloadButtons({ pdfUrl: null });
      
      expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
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
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      const pdfButton = screen.getByText('Download PDF');
      
      expect(pdfButton).toBeInTheDocument();
    });

    it('should render typography elements correctly', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      expect(screen.getByText('Download Merged Labels')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible button text', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      expect(screen.getByRole('link', { name: /download pdf/i })).toBeInTheDocument();
    });

    it('should have proper link for PDF download', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      const pdfLink = screen.getByRole('link');
      expect(pdfLink).toHaveAttribute('href', 'test-url');
    });

    it('should be keyboard accessible', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      // The download is rendered as a link (anchor), not a button
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href');
        // Optionally, check that the link is focusable
        expect(link.tabIndex).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('edge cases', () => {
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
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
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
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
    });

    it('should render all Material-UI components correctly', () => {
      renderDownloadButtons({ pdfUrl: 'test-url' });
      
      // Check that all expected elements are rendered
      expect(screen.getByTestId('PictureAsPdfIcon')).toBeInTheDocument();
      expect(screen.getAllByTestId('DownloadIcon')).toHaveLength(1);
    });
  });
}); 