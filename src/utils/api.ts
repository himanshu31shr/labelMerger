export const CACHE_DURATIONS = {
  orders: 5 * 60 * 1000, // 5 minutes
  products: 5 * 60 * 1000, // 5 minutes
  inventory: 2 * 60 * 1000, // 2 minutes (shorter to ensure inventory is up-to-date)
};

export const shouldFetchData = (
  lastFetched: number | null,
  items: unknown[],
  cacheDuration: number,
  isAuthenticated: boolean = true
): boolean => {
  // Don't fetch if not authenticated
  if (!isAuthenticated) return false;
  
  if (!lastFetched) return true;
  if (items.length === 0) return true;
  return Date.now() - lastFetched > cacheDuration;
};
