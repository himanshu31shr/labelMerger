import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
// Removed useSelector as data will be passed as props
// import { useSelector } from 'react-redux';
// Removed RootState as it's not needed for prop types here
// import { RootState } from '../../../store';

// Import necessary types
import { Category } from '../../../services/category.service';
import { Product } from '../../../services/product.service';
import { ProductSummary } from '../../home/services/base.transformer'; // Assuming OrderItem extends ProductSummary

// Define prop types for OrderMetrics
interface OrderMetricsProps {
  orders: ProductSummary[]; // Use ProductSummary[] based on OrderItem definition
  products: Product[];
  categories: Category[];
}

const OrderMetrics: React.FC<OrderMetricsProps> = ({ orders, products, categories }) => {
  // Data is now received via props instead of useSelector
  // const products = useSelector((state: RootState) => state.products.items);
  // const orders = useSelector((state: RootState) => state.allOrdersForAnalytics.items);
  // const categories = useSelector((state: RootState) => state.categories.items);

  // Map categoryId to category name - this logic can remain as it uses categories prop
  const categoryIdToName: Record<string, string> = {};
  categories.forEach(cat => {
    if (cat.id) categoryIdToName[cat.id] = cat.name;
  });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    // Ensure product details are available or handle missing product
    const price = order.product?.sellingPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Orders
          </Typography>
          <Typography variant="h4">{totalOrders}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Revenue
          </Typography>
          <Typography variant="h4">₹{totalRevenue.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Average Order Value
          </Typography>
          <Typography variant="h4">₹{averageOrderValue.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Products
          </Typography>
          <Typography variant="h4">{totalProducts}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderMetrics; 