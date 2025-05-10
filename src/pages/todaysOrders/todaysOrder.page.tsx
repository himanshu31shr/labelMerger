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
      setOrders(data.at(0)?.orders || []);
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
