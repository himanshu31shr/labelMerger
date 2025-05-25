import React from 'react';
import { Box } from '@mui/material';
// Removed useSelector as data will be passed as props
// import { useSelector } from 'react-redux';
// Removed RootState as it's not needed for prop types here
// import { RootState } from '../../../store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Import necessary types
import { Category } from '../../../services/category.service';
import { ProductSummary } from '../../home/services/base.transformer'; // Assuming OrderItem extends ProductSummary

// Define prop types for SkuOrdersChart
interface SkuOrdersChartProps {
  orders: ProductSummary[]; // Use ProductSummary[] based on OrderItem definition
  categories: Category[];
}

const SkuOrdersChart: React.FC<SkuOrdersChartProps> = ({ orders, categories }) => {
  // Data is now received via props instead of useSelector
  // const orders = useSelector((state: RootState) => state.allOrdersForAnalytics.items);
  // const categories = useSelector((state: RootState) => state.categories.items);

  // Map categoryId to category name - this logic can remain as it uses categories prop
  const categoryIdToName: Record<string, string> = {};
  categories.forEach(cat => {
    if (cat.id) categoryIdToName[cat.id] = cat.name;
  });

  // Aggregate by SKU
  const skuMap: Record<string, { orderCount: number; revenue: number; category: string }> = {};
  orders.forEach(order => {
    const sku = order.product?.sku || 'Unknown SKU';
    const categoryId = order.product?.categoryId;
    const category = categoryId ? (categoryIdToName[categoryId] || 'Uncategorized') : 'Uncategorized';
    const price = order.product?.sellingPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    if (!skuMap[sku]) {
      skuMap[sku] = { orderCount: 0, revenue: 0, category };
    }
    skuMap[sku].orderCount += 1;
    skuMap[sku].revenue += price * quantity;
  });
  const skuData = Object.entries(skuMap).map(([sku, data]) => ({
    sku,
    ...data,
  }));

  if (!orders.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        No data available
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={skuData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sku" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Bar dataKey="orderCount" name="Orders" fill="#8884d8" />
        <Bar dataKey="revenue" name="Revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SkuOrdersChart; 