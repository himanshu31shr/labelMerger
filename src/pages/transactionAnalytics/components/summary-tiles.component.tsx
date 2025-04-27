import {
    Grid,
    Paper,
    Typography
} from "@mui/material";
import React from "react";
import { TransactionSummary } from "../../../types/transaction.type";

interface SummaryTilesProps {
  summary: TransactionSummary;
}

const SummaryTiles: React.FC<SummaryTilesProps> = ({ summary }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Sales</Typography>
          <Typography variant="h4">₹{summary.totalSales.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Expenses</Typography>
          <Typography variant="h4">
            ₹{summary.totalExpenses.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Units</Typography>
          <Typography variant="h4">{summary.totalUnits}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Profit</Typography>
          <Typography variant="h4">
            ₹{summary.totalProfit.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SummaryTiles;
