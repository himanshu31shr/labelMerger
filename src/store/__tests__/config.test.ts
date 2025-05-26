import { shouldFetchData, createOptimisticUpdate } from '../config';

describe('store config utilities', () => {
  describe('shouldFetchData', () => {
    const mockCacheDuration = 5 * 60 * 1000; // 5 minutes

    beforeEach(() => {
      // Mock Date.now to have consistent test results
      jest.spyOn(Date, 'now').mockReturnValue(1000000); // Fixed timestamp
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return true when lastFetched is null', () => {
      const items = [{ id: 1 }, { id: 2 }];
      expect(shouldFetchData(null, items, mockCacheDuration)).toBe(true);
    });

    it('should return true when items array is empty', () => {
      const lastFetched = Date.now() - 1000; // 1 second ago
      expect(shouldFetchData(lastFetched, [], mockCacheDuration)).toBe(true);
    });

    it('should return true when cache has expired', () => {
      const items = [{ id: 1 }, { id: 2 }];
      const lastFetched = Date.now() - (mockCacheDuration + 1000); // Cache expired
      expect(shouldFetchData(lastFetched, items, mockCacheDuration)).toBe(true);
    });

    it('should return false when cache is still valid', () => {
      const items = [{ id: 1 }, { id: 2 }];
      const lastFetched = Date.now() - (mockCacheDuration - 1000); // Cache still valid
      expect(shouldFetchData(lastFetched, items, mockCacheDuration)).toBe(false);
    });

    it('should return false when lastFetched is exactly at cache duration', () => {
      const items = [{ id: 1 }, { id: 2 }];
      const lastFetched = Date.now() - mockCacheDuration; // Exactly at cache duration
      expect(shouldFetchData(lastFetched, items, mockCacheDuration)).toBe(false);
    });

    it('should handle zero cache duration', () => {
      const items = [{ id: 1 }];
      const lastFetched = Date.now() - 1; // 1ms ago
      expect(shouldFetchData(lastFetched, items, 0)).toBe(true);
    });

    it('should handle future lastFetched timestamp', () => {
      const items = [{ id: 1 }];
      const lastFetched = Date.now() + 1000; // Future timestamp
      expect(shouldFetchData(lastFetched, items, mockCacheDuration)).toBe(false);
    });

    it('should work with different item types', () => {
      const stringItems = ['item1', 'item2'];
      const lastFetched = Date.now() - (mockCacheDuration + 1000);
      expect(shouldFetchData(lastFetched, stringItems, mockCacheDuration)).toBe(true);

      const objectItems = [{ name: 'test' }, { name: 'test2' }];
      const recentFetch = Date.now() - 1000;
      expect(shouldFetchData(recentFetch, objectItems, mockCacheDuration)).toBe(false);
    });

    it('should handle edge case with very large cache duration', () => {
      const items = [{ id: 1 }];
      const largeCacheDuration = 24 * 60 * 60 * 1000; // 24 hours (86,400,000 ms)
      const lastFetched = Date.now() - (2 * 60 * 60 * 1000); // 2 hours ago (less than 24 hours)
      expect(shouldFetchData(lastFetched, items, largeCacheDuration)).toBe(false);
    });
  });

  describe('createOptimisticUpdate', () => {
    interface TestItem {
      id: number;
      name: string;
      value?: number;
    }

    const mockItems: TestItem[] = [
      { id: 1, name: 'Item 1', value: 10 },
      { id: 2, name: 'Item 2', value: 20 },
      { id: 3, name: 'Item 3', value: 30 },
    ];

    it('should update existing item by id', () => {
      const update = { id: 2, name: 'Updated Item 2' };
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result).toHaveLength(3);
      expect(result[1]).toEqual({ id: 2, name: 'Updated Item 2', value: 20 });
      expect(result[0]).toEqual(mockItems[0]); // Unchanged
      expect(result[2]).toEqual(mockItems[2]); // Unchanged
    });

    it('should update multiple properties of an item', () => {
      const update = { id: 1, name: 'New Name', value: 100 };
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result[0]).toEqual({ id: 1, name: 'New Name', value: 100 });
      expect(result[1]).toEqual(mockItems[1]); // Unchanged
      expect(result[2]).toEqual(mockItems[2]); // Unchanged
    });

    it('should not modify items when no match found', () => {
      const update = { id: 999, name: 'Non-existent' };
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result).toEqual(mockItems);
      expect(result).not.toBe(mockItems); // Should be a new array
    });

    it('should work with string identifiers', () => {
      const itemsWithStringId = [
        { id: 'a', name: 'Item A' },
        { id: 'b', name: 'Item B' },
        { id: 'c', name: 'Item C' },
      ];

      const update = { id: 'b', name: 'Updated Item B' };
      const result = createOptimisticUpdate(itemsWithStringId, update, 'id');

      expect(result[1]).toEqual({ id: 'b', name: 'Updated Item B' });
      expect(result[0]).toEqual(itemsWithStringId[0]);
      expect(result[2]).toEqual(itemsWithStringId[2]);
    });

    it('should work with different identifier keys', () => {
      const itemsWithSku = [
        { sku: 'SKU-1', name: 'Product 1', price: 100 },
        { sku: 'SKU-2', name: 'Product 2', price: 200 },
      ];

      const update = { sku: 'SKU-1', price: 150 };
      const result = createOptimisticUpdate(itemsWithSku, update, 'sku');

      expect(result[0]).toEqual({ sku: 'SKU-1', name: 'Product 1', price: 150 });
      expect(result[1]).toEqual(itemsWithSku[1]);
    });

    it('should handle empty arrays', () => {
      const update = { id: 1, name: 'Test' };
      const result = createOptimisticUpdate([], update, 'id');

      expect(result).toEqual([]);
    });

    it('should handle partial updates', () => {
      const update = { id: 3, value: 999 }; // Only updating value, not name
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result[2]).toEqual({ id: 3, name: 'Item 3', value: 999 });
    });

    it('should preserve original array immutability', () => {
      const update = { id: 1, name: 'Modified' };
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result).not.toBe(mockItems);
      expect(mockItems[0].name).toBe('Item 1'); // Original unchanged
      expect(result[0].name).toBe('Modified'); // New array has update
    });

    it('should handle complex nested objects', () => {
      const complexItems = [
        { id: 1, data: { nested: { value: 'original' } }, meta: { count: 5 } },
        { id: 2, data: { nested: { value: 'test' } }, meta: { count: 10 } },
      ];

      const update = { id: 1, meta: { count: 15, newField: 'added' } };
      const result = createOptimisticUpdate(complexItems, update, 'id');

      expect(result[0]).toEqual({
        id: 1,
        data: { nested: { value: 'original' } },
        meta: { count: 15, newField: 'added' },
      });
    });

    it('should handle updates with undefined values', () => {
      const update = { id: 2, name: undefined, value: 50 };
      const result = createOptimisticUpdate(mockItems, update, 'id');

      expect(result[1]).toEqual({ id: 2, name: undefined, value: 50 });
    });

    it('should handle multiple items with same identifier', () => {
      const duplicateItems = [
        { id: 1, name: 'First', order: 1 },
        { id: 1, name: 'Second', order: 2 },
        { id: 2, name: 'Third', order: 3 },
      ];

      const update = { id: 1, name: 'Updated' };
      const result = createOptimisticUpdate(duplicateItems, update, 'id');

      // Should update all items with matching identifier
      expect(result[0]).toEqual({ id: 1, name: 'Updated', order: 1 });
      expect(result[1]).toEqual({ id: 1, name: 'Updated', order: 2 });
      expect(result[2]).toEqual(duplicateItems[2]); // Unchanged
    });
  });

  describe('integration tests', () => {
    it('should work together for cache management and optimistic updates', () => {
      const items = [
        { id: 1, name: 'Item 1', lastUpdated: Date.now() - 1000 },
        { id: 2, name: 'Item 2', lastUpdated: Date.now() - 2000 },
      ];

      // Check if we should fetch (we shouldn't, cache is fresh)
      const shouldFetch = shouldFetchData(Date.now() - 1000, items, 5 * 60 * 1000);
      expect(shouldFetch).toBe(false);

      // Apply optimistic update
      const update = { id: 1, name: 'Updated Item 1' };
      const updatedItems = createOptimisticUpdate(items, update, 'id');

      expect(updatedItems[0].name).toBe('Updated Item 1');
      expect(updatedItems[1]).toEqual(items[1]);
    });

    it('should handle cache expiry and optimistic updates', () => {
      const oldItems = [{ id: 1, name: 'Old Item' }];
      const expiredCacheTime = Date.now() - (10 * 60 * 1000); // 10 minutes ago
      const cacheDuration = 5 * 60 * 1000; // 5 minutes

      // Should fetch because cache is expired
      expect(shouldFetchData(expiredCacheTime, oldItems, cacheDuration)).toBe(true);

      // But we can still apply optimistic updates while fetching
      const optimisticUpdate = { id: 1, name: 'Optimistically Updated' };
      const updatedItems = createOptimisticUpdate(oldItems, optimisticUpdate, 'id');

      expect(updatedItems[0].name).toBe('Optimistically Updated');
    });
  });
}); 