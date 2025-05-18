import PriceChangeIcon from "@mui/icons-material/PriceChange";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Chip, CircularProgress, Container, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts, setFilters } from "../../store/slices/productsSlice";
import { HiddenProducts } from "./components/hiddenProducts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-tab-${index}`,
    'aria-controls': `product-tabpanel-${index}`,
  };
}

export const HiddenProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredItems: filteredProducts, loading } = useAppSelector(state => state.products);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    // Fetch all products initially
    dispatch(fetchProducts({}));
  }, [dispatch]);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Reset filters when changing tabs
    if (newValue === 0) {
      dispatch(setFilters({ visibility: "hidden" }));
    } else {
      dispatch(setFilters({}));
    }
  };

  const hiddenProducts = filteredProducts.filter(product => !product.existsOnSellerPage);
  const updatePricingProducts = filteredProducts;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {tabValue === 0 ? (
            <VisibilityOffIcon sx={{ fontSize: 32, mr: 2, color: 'info.main' }} />
          ) : (
            <PriceChangeIcon sx={{ fontSize: 32, mr: 2, color: 'error.main' }} />
          )}
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: tabValue === 0 ? 'info.dark' : 'error.dark' }}>
            {tabValue === 0 ? 'Hidden Products' : 'Price Management'}
          </Typography>
          <Chip 
            label={tabValue === 0 ? `${hiddenProducts.length} Hidden` : `${updatePricingProducts.length} Products`} 
            color={tabValue === 0 ? "info" : "error"} 
            sx={{ ml: 2, fontWeight: 'bold' }}
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="product management tabs"
          sx={{
            '& .MuiTab-root': { fontWeight: 'bold' },
            '& .Mui-selected': { color: tabValue === 0 ? 'info.main' : 'error.main' },
            '& .MuiTabs-indicator': { backgroundColor: tabValue === 0 ? 'info.main' : 'error.main' },
          }}
        >
          <Tab label="Hidden Products" {...a11yProps(0)} />
          <Tab label="Update Pricing" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" m={4}>
            <CircularProgress color="info" />
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage products that are currently hidden from your listings. You can update visibility status or adjust pricing.
            </Typography>
            <HiddenProducts mode="hidden" />
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" m={4}>
            <CircularProgress color="error" />
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              Identify products where your price is higher than competitors. Adjust pricing to remain competitive.
            </Typography>
            <HiddenProducts />
          </Box>
        )}
      </TabPanel>
      </Paper>
    </Container>
  );
};

export default HiddenProductsPage;
