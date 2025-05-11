import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders } from "../../store/slices/ordersSlice";
import { SummaryTable } from "../home/components/SummaryTable";

export const TodaysOrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: orders, loading } = useAppSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((sum, order) => {
    const price = order.product?.sellingPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  const totalCost = orders.reduce((sum, order) => {
    const cost = order.product?.costPrice || 0;
    const quantity = parseInt(order.quantity) || 0;
    return sum + (cost * quantity);
  }, 0);

  const profitMargin = totalRevenue > 0 
    ? Math.round(((totalRevenue - totalCost) / totalRevenue) * 100)
    : 0;

  return (
    <Container maxWidth={false} sx={{ mb: 4, maxWidth: "100%" }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Orders
            </Typography>
            <Typography variant="h4">
              {orders.length}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Revenue
            </Typography>
            <Typography variant="h4">
              ₹{totalRevenue.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Cost
            </Typography>
            <Typography variant="h4">
              ₹{totalCost.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Profit Margin
            </Typography>
            <Typography variant="h4">
              {profitMargin}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12} md={12}>
          <Typography variant="h5" gutterBottom>
            Current Orders
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              m={4}
            >
              <CircularProgress />
            </Box>
          ) : (
            <SummaryTable summary={orders} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
