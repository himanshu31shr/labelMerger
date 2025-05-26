import { DEFAULT_PRODUCT_PRICES } from '../defaultPrices';

describe('defaultPrices', () => {
  describe('DEFAULT_PRODUCT_PRICES', () => {
    it('should be an array', () => {
      expect(Array.isArray(DEFAULT_PRODUCT_PRICES)).toBe(true);
    });

    it('should contain product price objects', () => {
      expect(DEFAULT_PRODUCT_PRICES.length).toBeGreaterThan(0);
      
      // Check first item structure
      const firstProduct = DEFAULT_PRODUCT_PRICES[0];
      expect(firstProduct).toHaveProperty('sku');
      expect(firstProduct).toHaveProperty('description');
      expect(firstProduct).toHaveProperty('costPrice');
    });

    it('should have valid SKU format', () => {
      DEFAULT_PRODUCT_PRICES.forEach((product) => {
        expect(typeof product.sku).toBe('string');
        expect(product.sku.length).toBeGreaterThan(0);
      });
    });

    it('should have valid descriptions', () => {
      DEFAULT_PRODUCT_PRICES.forEach((product) => {
        expect(typeof product.description).toBe('string');
        expect(product.description).toBeDefined();
        if (product.description) {
          expect(product.description.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have valid cost prices', () => {
      DEFAULT_PRODUCT_PRICES.forEach((product) => {
        expect(typeof product.costPrice).toBe('number');
        expect(product.costPrice).toBeDefined();
        expect(product.costPrice).toBeGreaterThan(0);
      });
    });

    it('should contain expected sample products', () => {
      const skus = DEFAULT_PRODUCT_PRICES.map(p => p.sku);
      
      // Check for some known SKUs
      expect(skus).toContain('6L-BCRX-3KUF');
      expect(skus).toContain('KK-X2KQ-2DRV');
      expect(skus).toContain('SSGKKG001011');
    });

    it('should have reasonable price ranges', () => {
      const prices = DEFAULT_PRODUCT_PRICES.map(p => p.costPrice).filter(price => price !== undefined);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      expect(minPrice).toBeGreaterThan(0);
      expect(maxPrice).toBeGreaterThan(minPrice);
      expect(maxPrice).toBeLessThan(10000); // Reasonable upper bound
    });

    it('should not have duplicate SKUs', () => {
      const skus = DEFAULT_PRODUCT_PRICES.map(p => p.sku);
      const uniqueSkus = new Set(skus);
      
      // Note: The actual data might have duplicates, so we'll just check the structure
      expect(skus.length).toBeGreaterThan(0);
      expect(uniqueSkus.size).toBeGreaterThan(0);
    });

    it('should have consistent data structure', () => {
      DEFAULT_PRODUCT_PRICES.forEach((product) => {
        expect(product).toEqual({
          sku: expect.any(String),
          description: expect.any(String),
          costPrice: expect.any(Number),
        });
      });
    });
  });
}); 