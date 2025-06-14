import { Grid, Paper, Typography, Box, Tooltip, Chip } from "@mui/material";
import React from "react";
import { TransactionSummary } from "../../../types/transaction.type";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";

interface SummaryTilesProps {
  summary: TransactionSummary;
}

const SummaryTiles: React.FC<SummaryTilesProps> = ({ summary }) => {
  // Create cost price sources summary
  const costPriceSources = summary.costPriceSources || {
    product: 0,
    category: 0,
    default: 0
  };
  
  const totalSources = 
    costPriceSources.product + 
    costPriceSources.category + 
    costPriceSources.default;
  
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
      {/* Main summary tiles */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {tiles.map((tile, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
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
      </Grid>
      
      {/* Cost price sources tile */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, boxShadow: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CategoryIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Cost Price Sources</Typography>
            <Tooltip title="Shows how many products are using different cost price sources">
              <InfoIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary' }} />
            </Tooltip>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip title="Products with custom cost prices defined">
                <Chip 
                  label={`Product: ${costPriceSources.product}`}
                  color="success"
                  sx={{ fontWeight: 'bold' }}
                />
              </Tooltip>
            </Grid>
            
            <Grid item>
              <Tooltip title="Products inheriting cost price from category">
                <Chip 
                  label={`Category: ${costPriceSources.category}`}
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                />
              </Tooltip>
            </Grid>
            
            <Grid item>
              <Tooltip title="Products using default cost price (no custom or category price)">
                <Chip 
                  label={`Default: ${costPriceSources.default}`}
                  color="warning"
                  sx={{ fontWeight: 'bold' }}
                />
              </Tooltip>
            </Grid>
            
            <Grid item>
              <Tooltip title="Total products analyzed">
                <Chip 
                  label={`Total: ${totalSources}`}
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SummaryTiles;
