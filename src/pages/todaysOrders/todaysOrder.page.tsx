import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ShoppingCartIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Today's Orders
          </Typography>
          <Chip 
            label={`${orders.length} Orders`} 
            color="primary" 
            size="medium" 
            sx={{ ml: 2 }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShoppingCartIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                  Total Orders
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                {orders.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Processed today
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid', borderColor: 'success.main', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                  Total Revenue
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                ₹{totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Gross revenue from today's sales
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid', borderColor: 'error.main', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MoneyOffIcon sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                  Total Cost
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.dark' }}>
                ₹{totalCost.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Cost of goods sold
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid', borderColor: 'secondary.main', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon sx={{ color: 'secondary.main', mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                  Profit Margin
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>
                {profitMargin}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Percentage profit on sales
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 2 }}>
            Current Orders
          </Typography>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              m={4}
            >
              <CircularProgress color="primary" size={40} thickness={4} />
            </Box>
          ) : (
            <SummaryTable summary={orders} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};
