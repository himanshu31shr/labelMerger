import { formatCurrency } from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format positive numbers as USD currency', () => {
      expect(formatCurrency(99.99)).toBe('$99.99');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(0.99)).toBe('$0.99');
    });

    it('should format zero as currency', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format negative numbers as currency', () => {
      expect(formatCurrency(-99.99)).toBe('-$99.99');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle decimal precision', () => {
      expect(formatCurrency(99.999)).toBe('$100.00'); // Rounds to nearest cent
      expect(formatCurrency(99.994)).toBe('$99.99');
    });
  });
}); 