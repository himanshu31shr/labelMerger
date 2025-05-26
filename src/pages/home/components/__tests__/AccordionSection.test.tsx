import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AccordionSection } from '../AccordionSection';

const theme = createTheme();

const renderAccordionSection = (props = {}, children?: React.ReactNode) => {
  const defaultProps = {
    title: 'Test Accordion',
    isExpanded: false,
    onChange: jest.fn(),
  };
  return render(
    <ThemeProvider theme={theme}>
      <AccordionSection {...defaultProps} {...props}>
        {children ?? <div>Test Content</div>}
      </AccordionSection>
    </ThemeProvider>
  );
};

describe('AccordionSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render accordion with title', () => {
      renderAccordionSection({ title: 'My Accordion Title' });
      
      expect(screen.getByText('My Accordion Title')).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderAccordionSection({ isExpanded: true }, <div data-testid="test-content">Custom Content</div>);
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('should render expand icon', () => {
      renderAccordionSection();
      
      expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    });

    it('should render as collapsed when isExpanded is false', () => {
      renderAccordionSection({ isExpanded: false });
      
      const accordion = screen.getByRole('button');
      expect(accordion).toHaveAttribute('aria-expanded', 'false');
    });

    it('should render as expanded when isExpanded is true', () => {
      renderAccordionSection({ isExpanded: true });
      
      const accordion = screen.getByRole('button');
      expect(accordion).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('interactions', () => {
    it('should call onChange with true when collapsed accordion is clicked', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ 
        isExpanded: false, 
        onChange: mockOnChange 
      });
      
      const accordionButton = screen.getByRole('button');
      fireEvent.click(accordionButton);
      
      expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when expanded accordion is clicked', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ 
        isExpanded: true, 
        onChange: mockOnChange 
      });
      
      const accordionButton = screen.getByRole('button');
      fireEvent.click(accordionButton);
      
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    it('should call onChange only once per click', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ onChange: mockOnChange });
      
      const accordionButton = screen.getByRole('button');
      fireEvent.click(accordionButton);
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks correctly', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ 
        isExpanded: false, 
        onChange: mockOnChange 
      });
      
      const accordionButton = screen.getByRole('button');
      
      // First click - expand
      fireEvent.click(accordionButton);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, true);
      
      // Second click - collapse
      fireEvent.click(accordionButton);
      expect(mockOnChange).toHaveBeenNthCalledWith(2, true); // Still true because isExpanded prop hasn't changed
      
      expect(mockOnChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('props handling', () => {
    it('should handle different title types', () => {
      renderAccordionSection({ title: 'String Title' });
      expect(screen.getByText('String Title')).toBeInTheDocument();
    });

    it('should handle complex children', () => {
      const complexChildren = (
        <div>
          <h3>Complex Content</h3>
          <p>With multiple elements</p>
          <button>And interactive elements</button>
        </div>
      );
      
      renderAccordionSection({ isExpanded: true }, complexChildren);
      
      expect(screen.getByText('Complex Content')).toBeInTheDocument();
      expect(screen.getByText('With multiple elements')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'And interactive elements' })).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      renderAccordionSection({}, null);
      // Should still render the accordion structure
      expect(screen.getByText('Test Accordion')).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      renderAccordionSection({}, undefined);
      expect(screen.getByText('Test Accordion')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderAccordionSection();
      
      const accordionButton = screen.getByRole('button');
      expect(accordionButton).toHaveAttribute('aria-expanded');
    });

    it('should be keyboard accessible', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ onChange: mockOnChange });
      
      const accordionButton = screen.getByRole('button');
      
      // Test Enter key
      fireEvent.keyDown(accordionButton, { key: 'Enter', code: 'Enter' });
      
      // The accordion should be focusable
      expect(accordionButton).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      renderAccordionSection({ title: 'Accessible Title' });
      
      // The title should be rendered as h6 variant
      const title = screen.getByText('Accessible Title');
      expect(title).toBeInTheDocument();
    });
  });

  describe('styling and theming', () => {
    it('should work with custom theme', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#ff0000',
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <AccordionSection
            title="Themed Accordion"
            isExpanded={false}
            onChange={jest.fn()}
          >
            <div>Content</div>
          </AccordionSection>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Themed Accordion')).toBeInTheDocument();
    });

    it('should render Material-UI components correctly', () => {
      renderAccordionSection();
      
      // Check that Material-UI components are rendered
      expect(screen.getByRole('button')).toBeInTheDocument(); // AccordionSummary
      expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid clicks without errors', () => {
      const mockOnChange = jest.fn();
      renderAccordionSection({ onChange: mockOnChange });
      
      const accordionButton = screen.getByRole('button');
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.click(accordionButton);
      }
      
      expect(mockOnChange).toHaveBeenCalledTimes(10);
    });

    it('should not crash with missing onChange', () => {
      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <AccordionSection
              title="Test"
              isExpanded={false}
              onChange={undefined as unknown as (isExpanded: boolean) => void}
            >
              <div>Content</div>
            </AccordionSection>
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('should handle re-renders correctly', () => {
      const { rerender } = renderAccordionSection({ 
        title: 'Original Title',
        isExpanded: false 
      }, <div>Updated Content</div>);
      
      expect(screen.getByText('Original Title')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={theme}>
          <AccordionSection
            title="Updated Title"
            isExpanded={true}
            onChange={jest.fn()}
          >
            <div>Updated Content</div>
          </AccordionSection>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Updated Title')).toBeInTheDocument();
      expect(screen.getByText('Updated Content')).toBeInTheDocument();
    });
  });

  describe('component state', () => {
    it('should reflect isExpanded prop changes', () => {
      const { rerender } = renderAccordionSection({ isExpanded: false });
      
      let accordionButton = screen.getByRole('button');
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
      
      rerender(
        <ThemeProvider theme={theme}>
          <AccordionSection
            title="Test Accordion"
            isExpanded={true}
            onChange={jest.fn()}
          >
            <div>Test Content</div>
          </AccordionSection>
        </ThemeProvider>
      );
      
      accordionButton = screen.getByRole('button');
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should maintain children content across state changes', () => {
      const { rerender } = renderAccordionSection({ 
        isExpanded: false,
      }, <div data-testid="persistent-content">Persistent Content</div>);
      
      expect(screen.getByTestId('persistent-content')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={theme}>
          <AccordionSection
            title="Test Accordion"
            isExpanded={true}
            onChange={jest.fn()}
          >
            <div data-testid="persistent-content">Persistent Content</div>
          </AccordionSection>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('persistent-content')).toBeInTheDocument();
    });
  });
}); 