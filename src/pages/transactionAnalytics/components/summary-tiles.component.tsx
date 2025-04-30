import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { TransactionSummary } from "../../../types/transaction.type";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface SummaryTilesProps {
  summary: TransactionSummary;
}

const SummaryTiles: React.FC<SummaryTilesProps> = ({ summary }) => {
  const tiles = [
    {
      label: "Total Sales",
      value: <FormattedCurrency value={summary.totalSales} />,
      color: "primary",
      icon: <AttachMoneyIcon color="primary" fontSize="large" />,
    },
    {
      label: "Total Expenses",
      value: <FormattedCurrency value={Math.abs(summary.totalExpenses)} />,
      color: "error",
      icon: <MoneyOffIcon color="error" fontSize="large" />,
    },
    {
      label: "Total Units Sold",
      value: summary.totalUnits,
      color: "secondary",
      icon: <ShoppingCartIcon color="secondary" fontSize="large" />,
    },
    {
      label: "Profit Before Cost",
      value: <FormattedCurrency value={summary.profitBeforeCost} />,
      color: "info",
      icon: <InventoryIcon color="info" fontSize="large" />,
    },
    {
      label: "Total Cost",
      value: <FormattedCurrency value={summary.totalCost} />,
      color: "success",
      icon: <TrendingUpIcon color="success" fontSize="large" />,
    },
    {
      label: "Total Profit",
      value: <FormattedCurrency value={summary.totalProfit} />,
      color: "success",
      icon: <TrendingUpIcon color="success" fontSize="large" />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {tiles.map((tile, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              borderLeft: `5px solid`,
              borderColor: tile.color,
              boxShadow: 3,
              "flex-grow": 1,
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item md={3}>
                {tile.icon}
              </Grid>

              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  {tile.label}
                </Typography>
                <Typography variant="h5" color={tile.color}>
                  {tile.value}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryTiles;
