import React from 'react';
import {
  // Removed unused Material-UI Table components
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  Box,
} from '@mui/material';
// Removed useSelector as data will be passed as props
// import { useSelector } from 'react-redux';
// Removed RootState as it's not needed for prop types here
// import { RootState } from '../../../store';

// Import DataTable and Column types
import { DataTable, Column } from '../../../components/DataTable/DataTable';

// Import necessary types for props
import { Category } from '../../../services/category.service';
import { ProductSummary } from '../../home/services/base.transformer';

// Define prop types for TopProductsTable
interface TopProductsTableProps {
  orders: ProductSummary[];
  categories: Category[];
}

// Define the structure of the data that will be passed to the DataTable
interface TopProductDataRow {
  sku: string;
  name: string;
  category: string;
  orderCount: number;
  revenue: number;
  averageOrderValue: number;
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ orders, categories }) => {
  // Data is received via props

  // Map categoryId to category name
  const categoryIdToName: Record<string, string> = {};
  categories.forEach(cat => {
    if (cat.id) categoryIdToName[cat.id] = cat.name;
  });

  // Aggregate by product SKU
  const productMap: Record<string, { name: string; category: string; orderCount: number; revenue: number; averageOrderValue: number }> = {};
  orders.forEach(order => {
    const sku = order.product?.sku || 'Unknown SKU';
    const name = order.product?.name || 'Unknown Product';
    const categoryId = order.product?.categoryId;
    const category = categoryId ? (categoryIdToName[categoryId] || 'Uncategorized') : 'Uncategorized';
    const price = order.product?.sellingPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    if (!productMap[sku]) {
      productMap[sku] = { name, category, orderCount: 0, revenue: 0, averageOrderValue: 0 };
    }
    productMap[sku].orderCount += 1;
    productMap[sku].revenue += price * quantity;
  });

  // Calculate average order value
  Object.values(productMap).forEach(product => {
    product.averageOrderValue = product.orderCount ? product.revenue / product.orderCount : 0;
  });
  // Sort by revenue descending and take top 10
  const topProducts = Object.entries(productMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    // .slice(0, 10)
    .map(([sku, data]) => ({ sku, ...data }));

  // Format currency in INR (reusing from CategoryDistributionTable or define locally)
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Define columns for the DataTable
  const columns: Column<TopProductDataRow>[] = [
    {
      id: 'sku',
      label: 'SKU',
    },
    {
      id: 'name',
      label: 'Product Name',
    },
    {
      id: 'category',
      label: 'Category',
    },
    {
      id: 'orderCount',
      label: 'Orders',
      align: 'right',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      align: 'right',
      format: (value: unknown) => formatINR(value as number),
    },
    {
      id: 'averageOrderValue',
      label: 'Avg. Order Value',
      align: 'right',
      format: (value: unknown) => formatINR(value as number),
    },
  ];

  if (!orders.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        No data available
      </Box>
    );
  }

  return (
    // Use the DataTable component
    <DataTable
      columns={columns}
      data={topProducts}
      defaultSortColumn="revenue"
      defaultSortDirection="desc"
      // Add other DataTable props as needed (e.g., onRowClick, rowsPerPageOptions)
    />
  );
};

export default TopProductsTable; 