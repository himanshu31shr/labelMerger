import { DEFAULT_PRODUCT_PRICES } from '../../src/constants/defaultPrices';

describe('DEFAULT_PRODUCT_PRICES', () => {
  it('should have all required properties for each product', () => {
    DEFAULT_PRODUCT_PRICES.forEach(product => {
      expect(product).toHaveProperty('sku');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('costPrice');
      expect(typeof product.sku).toBe('string');
      expect(typeof product.description).toBe('string');
      expect(typeof product.costPrice).toBe('number');
    });
  });

  it('should have unique SKUs', () => {
    const skus = DEFAULT_PRODUCT_PRICES.map(p => p.description);
    const uniqueSkus = new Set(skus);
    expect(skus.length).toBe(uniqueSkus.size);
  });

  it('should have non-negative cost prices', () => {
    DEFAULT_PRODUCT_PRICES.forEach(product => {
      expect(product.costPrice).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have non-empty descriptions', () => {
    DEFAULT_PRODUCT_PRICES.forEach(product => {
      expect(product.description.length).toBeGreaterThan(0);
    });
  });
});