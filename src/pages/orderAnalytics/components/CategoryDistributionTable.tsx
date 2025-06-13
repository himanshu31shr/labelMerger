import React, { useMemo, useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
// Removed useSelector and RootState imports as data is passed as props
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store';

// Import DataTable and Column types
import { DataTable, Column } from '../../../components/DataTable/DataTable';

// Import necessary types for props
import { Category } from '../../../services/category.service';
import { ProductSummary } from '../../home/services/base.transformer';
import { CostPriceResolutionService } from '../../../services/costPrice.service';
import { FormattedCurrency } from '../../../components/FormattedCurrency';

// Define prop types for CategoryDistributionTable
interface CategoryDistributionTableProps {
  orders: ProductSummary[];
  categories: Category[];
}

// Define the structure of the data that will be passed to the DataTable
interface CategoryDataRow {
  category: string;
  totalOrders: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
}

const CategoryDistributionTable: React.FC<CategoryDistributionTableProps> = ({ orders, categories }) => {
  const costPriceService = useMemo(() => new CostPriceResolutionService(), []);
  const [loading, setLoading] = useState(true);
  const [categoryRows, setCategoryRows] = useState<CategoryDataRow[]>([]);

  // Map categoryId to category name
  const categoryIdToName = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach(cat => {
      if (cat.id) {
        map[cat.id] = cat.name;
      }
    });
    return map;
  }, [categories]);

  useEffect(() => {
    const calculateCategoryData = async () => {
      setLoading(true);
      const categoryData: Record<string, CategoryDataRow> = {};

      for (const order of orders) {
        const categoryId = order.product?.categoryId;
        const category = categoryId ? (categoryIdToName[categoryId] || 'Uncategorized') : 'Uncategorized';

        if (!categoryData[category]) {
          categoryData[category] = {
            category,
            totalOrders: 0,
            totalRevenue: 0,
            totalCost: 0,
            profit: 0,
          };
        }

        if (order.product?.sku) {
          const resolution = await costPriceService.getProductCostPrice(order.product.sku);
          const costPrice = resolution.value;
          const quantity = parseInt(order.quantity) || 1;
          const sellingPrice = order.product.sellingPrice || 0;

          categoryData[category].totalOrders += 1;
          categoryData[category].totalRevenue += sellingPrice * quantity;
          categoryData[category].totalCost += costPrice * quantity;
          categoryData[category].profit = categoryData[category].totalRevenue - categoryData[category].totalCost;
        }
      }

      setCategoryRows(Object.values(categoryData));
      setLoading(false);
    };

    calculateCategoryData();
  }, [orders, categories, categoryIdToName, costPriceService]);

  // Define columns for the DataTable
  const columns: Column<CategoryDataRow>[] = [
    {
      id: 'category',
      label: 'Category',
    },
    {
      id: 'totalOrders',
      label: 'Total Orders',
      align: 'right',
    },
    {
      id: 'totalRevenue',
      label: 'Total Revenue',
      align: 'right',
      format: (value) => <FormattedCurrency value={value as number} />,
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      align: 'right',
      format: (value) => <FormattedCurrency value={value as number} />,
    },
    {
      id: 'profit',
      label: 'Profit',
      align: 'right',
      format: (value) => <FormattedCurrency value={value as number} />,
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

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
      data={categoryRows}
      defaultSortColumn="totalRevenue"
      defaultSortDirection="desc"
      // Add other DataTable props as needed (e.g., onRowClick, rowsPerPageOptions)
    />
  );
};

export default CategoryDistributionTable; 