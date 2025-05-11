export const CACHE_DURATIONS = {
  products: 5 * 60 * 1000,    // 5 minutes
  orders: 1 * 60 * 1000,      // 1 minute
  transactions: 15 * 60 * 1000 // 15 minutes
} as const;

export type CacheDurationKey = keyof typeof CACHE_DURATIONS;

export const shouldFetchData = <T>(
  lastFetched: number | null,
  items: T[],
  cacheDuration: number
): boolean => {
  if (!lastFetched || items.length === 0) return true;
  return Date.now() - lastFetched > cacheDuration;
};

export const createOptimisticUpdate = <T>(
  currentItems: T[],
  update: Partial<T>,
  identifier: keyof T
): T[] => {
  return currentItems.map(item => 
    item[identifier] === update[identifier] 
      ? { ...item, ...update }
      : item
  );
}; 