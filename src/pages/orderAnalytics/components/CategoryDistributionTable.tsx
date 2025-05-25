import React from 'react';
import {
  // Removed unused Material-UI Table components
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper, // Removed unused Paper import
  Box,
} from '@mui/material';
// Removed useSelector and RootState imports as data is passed as props
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store';

// Import DataTable and Column types
import { DataTable, Column } from '../../../components/DataTable/DataTable';

// Import necessary types for props
import { Category } from '../../../services/category.service';
import { ProductSummary } from '../../home/services/base.transformer';

// Define prop types for CategoryDistributionTable
interface CategoryDistributionTableProps {
  orders: ProductSummary[];
  categories: Category[];
}

// Define the structure of the data that will be passed to the DataTable
interface CategoryDataRow {
  category: string;
  orderCount: number;
  totalQuantity: number;
  revenue: number;
  cost: number;
  profit: number;
}

const CategoryDistributionTable: React.FC<CategoryDistributionTableProps> = ({ orders, categories }) => {
  // Data is received via props

  // Map categoryId to category name
  const categoryIdToName: Record<string, string> = {};
  categories.forEach(cat => {
    if (cat.id) categoryIdToName[cat.id] = cat.name;
  });

  // Format currency in INR
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate profit margin
  const calculateProfitMargin = (revenue: number, profit: number) => {
    return revenue ? ((profit / revenue) * 100).toFixed(1) : '0.0';
  };

  // Aggregate by category
  const categoryMap: Record<string, {
    orderCount: number;
    totalQuantity: number;
    revenue: number;
    cost: number;
    profit: number;
  }> = {};

  orders.forEach(order => {
    const categoryId = order.product?.categoryId;
    const category = categoryId ? (categoryIdToName[categoryId] || 'Uncategorized') : 'Uncategorized';
    const price = order.product?.sellingPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    const cost = order.product?.costPrice || 0;

    if (!categoryMap[category]) {
      categoryMap[category] = {
        orderCount: 0,
        totalQuantity: 0,
        revenue: 0,
        cost: 0,
        profit: 0,
      };
    }

    categoryMap[category].orderCount += 1;
    categoryMap[category].totalQuantity += quantity;
    categoryMap[category].revenue += price * quantity;
    categoryMap[category].cost += cost * quantity;
    categoryMap[category].profit = categoryMap[category].revenue - categoryMap[category].cost;
  });

  const sortedData = Object.entries(categoryMap)
    .map(([category, data]) => ({
      category,
      ...data,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Define columns for the DataTable
  const columns: Column<CategoryDataRow>[] = [
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
      id: 'totalQuantity',
      label: 'Quantity',
      align: 'right',
    },
    {
      id: 'revenue',
      label: 'Revenue (INR)',
      align: 'right',
      format: (value: unknown) => formatINR(value as number),
    },
    {
      id: 'cost',
      label: 'Cost (INR)',
      align: 'right',
      format: (value: unknown) => formatINR(value as number),
    },
    {
      id: 'profit',
      label: 'Profit (INR)',
      align: 'right',
      format: (value: unknown) => formatINR(value as number),
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin',
      align: 'right',
      // Calculate profit margin within the format function or add it to the data
      format: (value: unknown, row: CategoryDataRow | undefined) =>
        row ? `${calculateProfitMargin(row.revenue, row.profit)}%` : '-',
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
      data={sortedData}
      defaultSortColumn="revenue"
      defaultSortDirection="desc"
      // Add other DataTable props as needed (e.g., onRowClick, rowsPerPageOptions)
    />
  );
};

export default CategoryDistributionTable; 