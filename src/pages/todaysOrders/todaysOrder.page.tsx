import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ActiveOrder, TodaysOrder } from "../../services/todaysOrder.service";
import { SummaryTable } from "../home/components/SummaryTable";

export const TodaysOrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<ActiveOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const orderService = new TodaysOrder();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getTodaysOrders();
      if (data) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
              ₹{orders.reduce((sum, order) => sum + (order.product?.sellingPrice || 0), 0).toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Cost
            </Typography>
            <Typography variant="h4">
              ₹{orders.reduce((sum, order) => sum + (order.product?.costPrice || 0), 0).toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Profit Margin
            </Typography>
            <Typography variant="h4">
              {Math.round(
                ((orders.reduce((sum, order) => sum + (order.product?.sellingPrice || 0), 0) -
                  orders.reduce((sum, order) => sum + (order.product?.costPrice || 0), 0)) /
                  orders.reduce((sum, order) => sum + (order.product?.sellingPrice || 0), 0) * 100)
              ) || 0}%
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
