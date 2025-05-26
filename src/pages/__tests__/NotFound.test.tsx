import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotFound from '../NotFound';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: unknown }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const theme = createTheme();

const renderNotFound = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NotFound />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('NotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render 404 heading', () => {
      renderNotFound();
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 - Not Found');
    });

    it('should render error message', () => {
      renderNotFound();
      
      expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
    });

    it('should render error icon', () => {
      renderNotFound();
      
      const icon = screen.getByTestId('ErrorOutlineIcon');
      expect(icon).toBeInTheDocument();
    });

    it('should render Go Back button', () => {
      renderNotFound();
      
      expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
    });

    it('should render Go Home button', () => {
      renderNotFound();
      
      expect(screen.getByRole('link', { name: 'Go Home' })).toBeInTheDocument();
    });

    it('should have correct link href for Go Home button', () => {
      renderNotFound();
      
      const homeLink = screen.getByRole('link', { name: 'Go Home' });
      expect(homeLink).toHaveAttribute('href', '/flipkart-amazon-tools/');
    });
  });

  describe('interactions', () => {
    it('should call navigate(-1) when Go Back button is clicked', () => {
      renderNotFound();
      
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
      fireEvent.click(goBackButton);
      
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should not call navigate when Go Home link is clicked', () => {
      renderNotFound();
      
      const homeLink = screen.getByRole('link', { name: 'Go Home' });
      fireEvent.click(homeLink);
      
      // Navigate should not be called for Link component
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('styling and layout', () => {
    it('should have proper layout structure', () => {
      renderNotFound();
      
      // Check that main container exists
      const container = screen.getByRole('heading', { level: 1 }).closest('div');
      expect(container).toBeInTheDocument();
    });

    it('should render both buttons in the same container', () => {
      renderNotFound();
      
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
      const goHomeButton = screen.getByRole('link', { name: 'Go Home' });
      
      // Both should be present
      expect(goBackButton).toBeInTheDocument();
      expect(goHomeButton).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderNotFound();
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('404 - Not Found');
    });

    it('should have accessible button text', () => {
      renderNotFound();
      
      expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Go Home' })).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      renderNotFound();
      
      // Check for heading
      expect(screen.getByRole('heading')).toBeInTheDocument();
      
      // Check for button
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      // Check for link
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render without crashing', () => {
      expect(() => renderNotFound()).not.toThrow();
    });

    it('should handle multiple clicks on Go Back button', () => {
      renderNotFound();
      
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
      
      fireEvent.click(goBackButton);
      fireEvent.click(goBackButton);
      fireEvent.click(goBackButton);
      
      expect(mockNavigate).toHaveBeenCalledTimes(3);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should maintain functionality after re-render', () => {
      const { rerender } = renderNotFound();
      
      // Re-render the component
      rerender(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <NotFound />
          </ThemeProvider>
        </BrowserRouter>
      );
      
      // Functionality should still work
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
      fireEvent.click(goBackButton);
      
      expect(mockNavigate).toHaveBeenCalledWith(-1);
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
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <NotFound />
          </ThemeProvider>
        </BrowserRouter>
      );
      
      expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    });

    it('should render all required Material-UI components', () => {
      renderNotFound();
      
      // Check that all expected elements are rendered
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
    });
  });
}); 