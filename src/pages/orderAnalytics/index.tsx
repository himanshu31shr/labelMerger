import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllOrdersForAnalytics } from "../../store/slices/allOrdersForAnalyticsSlice";
import { fetchProducts } from "../../store/slices/productsSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CategoryDistributionTable from "./components/CategoryDistributionTable";
import CategoryOrdersChart from "./components/CategoryOrdersChart";
import OrderMetrics from "./components/OrderMetrics";
import SkuOrdersChart from "./components/SkuOrdersChart";
import TopProductsTable from "./components/TopProductsTable";
import DateRangeFilter from "./components/DateRangeFilter";
import FilterPopover from "./components/FilterPopover";
import { useOrderFilters } from "./hooks/useOrderFilters";

const OrderAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: allOrders,
    loading: allOrdersLoading,
    error: allOrdersError,
  } = useSelector((state: RootState) => state.allOrdersForAnalytics);
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state: RootState) => state.products);
  const {
    items: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  // State for popovers
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);

  // Use custom hook for filters
  const {
    filterState,
    skuOptions,
    platformOptions,
    productOptions,
    filteredOrders,
    updateFilter,
    clearFilters,
  } = useOrderFilters({ allOrders, categories, products });

  useEffect(() => {
    if (allOrders.length === 0 && !allOrdersLoading && !allOrdersError) {
      dispatch(fetchAllOrdersForAnalytics());
    }
    if (products.length === 0 && !productsLoading && !productsError) {
      dispatch(fetchProducts({}));
    }
    if (categories.length === 0 && !categoriesLoading && !categoriesError) {
      dispatch(fetchCategories());
    }
  }, []);

  const isLoading = allOrdersLoading || productsLoading || categoriesLoading;
  const error = allOrdersError || productsError || categoriesError;

  // Popover handlers
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(event.currentTarget);
  };
  const handleDateClose = () => {
    setDateAnchorEl(null);
  };

  // Active filter count
  const activeFilterCount = [
    filterState.selectedCategory,
    filterState.selectedSku,
    filterState.selectedPlatform,
    filterState.selectedProduct,
  ].filter(Boolean).length;

  // Date range summary
  const dateSummary = `${format(
    filterState.dateRange.startDate,
    "dd MMM yyyy"
  )} - ${format(filterState.dateRange.endDate, "dd MMM yyyy")}`;

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">Order Analytics</Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              onClick={handleDateClick}
              sx={{ textTransform: "none" }}
            >
              {dateSummary}
            </Button>
            <IconButton
              onClick={handleFilterClick}
              color={activeFilterCount > 0 ? "primary" : "default"}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={activeFilterCount} color="primary">
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        <DateRangeFilter
          dateRange={filterState.dateRange}
          onDateRangeChange={(startDate, endDate) =>
            updateFilter("dateRange", { startDate, endDate })
          }
          anchorEl={dateAnchorEl}
          onClose={handleDateClose}
        />

        <FilterPopover
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          categories={categories}
          selectedCategory={filterState.selectedCategory}
          selectedSku={filterState.selectedSku}
          selectedPlatform={filterState.selectedPlatform}
          selectedProduct={filterState.selectedProduct}
          skuOptions={skuOptions}
          platformOptions={platformOptions}
          productOptions={productOptions}
          onCategoryChange={(category) =>
            updateFilter("selectedCategory", category)
          }
          onSkuChange={(sku) => updateFilter("selectedSku", sku)}
          onPlatformChange={(platform) =>
            updateFilter("selectedPlatform", platform)
          }
          onProductChange={(product) =>
            updateFilter("selectedProduct", product)
          }
          onClearFilters={clearFilters}
        />

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <OrderMetrics
              orders={filteredOrders}
              products={products}
              categories={categories}
            />
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" gutterBottom>
                    Category Distribution Details
                  </Typography>
                  <CategoryDistributionTable
                    orders={filteredOrders}
                    categories={categories}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" gutterBottom>
                    Orders by Category
                  </Typography>
                  <CategoryOrdersChart
                    orders={filteredOrders}
                    categories={categories}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 2, mt:4, height: "100%" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" gutterBottom>
                    Top Products
                  </Typography>
                  <TopProductsTable
                    orders={filteredOrders}
                    categories={categories}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" gutterBottom>
                    Orders by SKU
                  </Typography>
                  <SkuOrdersChart
                    orders={filteredOrders}
                    categories={categories}
                  />
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default OrderAnalytics;

/* TODO: Create the CategoryDistributionChart component */
