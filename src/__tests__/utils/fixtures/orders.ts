export const mockOrder = {
  id: '1',
  productId: '1',
  productSku: 'TEST-001',
  productName: 'Test Product',
  quantity: 2,
  price: 99.99,
  total: 199.98,
  status: 'completed',
  platform: 'amazon',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  shippingAddress: '123 Test St, Test City, TC 12345',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockOrders = [
  mockOrder,
  {
    id: '2',
    productId: '2',
    productSku: 'TEST-002',
    productName: 'Another Test Product',
    quantity: 1,
    price: 149.99,
    total: 149.99,
    status: 'pending',
    platform: 'flipkart',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    shippingAddress: '456 Another St, Another City, AC 67890',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockOrdersState = {
  items: mockOrders,
  loading: false,
  error: null,
  filters: {},
  analytics: {
    totalOrders: 2,
    totalRevenue: 349.97,
    averageOrderValue: 174.985,
  },
}; 