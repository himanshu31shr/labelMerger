import { format } from 'date-fns';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface Metrics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalProducts: number;
}

interface CategoryData {
  name: string;
  orders: number;
  revenue: number;
}

interface SkuData {
  date: string;
  [key: string]: number | string;
}

interface ProductData {
  sku: string;
  name: string;
  category: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
}

export const analyticsService = {
  async getMetrics(dateRange: DateRange): Promise<Metrics> {
    // TODO: Replace with actual API call
    return {
      totalOrders: 1234,
      totalRevenue: 56789.99,
      averageOrderValue: 46.02,
      totalProducts: 5678,
    };
  },

  async getCategoryData(dateRange: DateRange): Promise<CategoryData[]> {
    // TODO: Replace with actual API call
    return [
      { name: 'Electronics', orders: 400, revenue: 24000 },
      { name: 'Clothing', orders: 300, revenue: 18000 },
      { name: 'Books', orders: 200, revenue: 12000 },
      { name: 'Home & Garden', orders: 278, revenue: 16680 },
      { name: 'Sports', orders: 189, revenue: 11340 },
      { name: 'Beauty', orders: 239, revenue: 14340 },
    ];
  },

  async getSkuData(dateRange: DateRange): Promise<SkuData[]> {
    // TODO: Replace with actual API call
    const months = [];
    let currentDate = new Date(dateRange.startDate);
    
    while (currentDate <= dateRange.endDate) {
      months.push(format(currentDate, 'yyyy-MM'));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months.map(date => ({
      date,
      'SKU-001': Math.floor(Math.random() * 50) + 50,
      'SKU-002': Math.floor(Math.random() * 40) + 40,
      'SKU-003': Math.floor(Math.random() * 30) + 30,
    }));
  },

  async getTopProducts(dateRange: DateRange): Promise<ProductData[]> {
    // TODO: Replace with actual API call
    return [
      {
        sku: 'SKU-001',
        name: 'Premium Headphones',
        category: 'Electronics',
        orders: 234,
        revenue: 23400,
        averageOrderValue: 100,
      },
      {
        sku: 'SKU-002',
        name: 'Designer Watch',
        category: 'Accessories',
        orders: 189,
        revenue: 18900,
        averageOrderValue: 100,
      },
      {
        sku: 'SKU-003',
        name: 'Smart Speaker',
        category: 'Electronics',
        orders: 156,
        revenue: 15600,
        averageOrderValue: 100,
      },
      {
        sku: 'SKU-004',
        name: 'Wireless Earbuds',
        category: 'Electronics',
        orders: 145,
        revenue: 14500,
        averageOrderValue: 100,
      },
      {
        sku: 'SKU-005',
        name: 'Fitness Tracker',
        category: 'Wearables',
        orders: 134,
        revenue: 13400,
        averageOrderValue: 100,
      },
    ];
  },
}; 