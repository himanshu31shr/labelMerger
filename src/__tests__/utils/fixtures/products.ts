export const mockProduct = {
  id: '1',
  sku: 'TEST-001',
  name: 'Test Product',
  description: 'A test product for testing purposes',
  price: 99.99,
  category: 'Electronics',
  categoryId: 'cat-1',
  stock: 10,
  platform: 'amazon',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockProducts = [
  mockProduct,
  {
    id: '2',
    sku: 'TEST-002',
    name: 'Another Test Product',
    description: 'Another test product',
    price: 149.99,
    category: 'Books',
    categoryId: 'cat-2',
    stock: 5,
    platform: 'flipkart',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockProductsState = {
  items: mockProducts,
  filteredItems: mockProducts,
  loading: false,
  error: null,
  filters: {},
  lastFetched: Date.now(),
  detailsCache: {},
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
}; 