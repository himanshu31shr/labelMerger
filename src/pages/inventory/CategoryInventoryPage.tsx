import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { AppDispatch, RootState } from '../../store';
import {
  fetchCategoriesWithInventory,
  fetchLowStockCategories,
} from '../../store/slices/categoryInventorySlice';
import CategoryInventoryTable from './components/CategoryInventoryTable';

const CategoryInventoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, migrationStatus } = useSelector(
    (state: RootState) => state.categoryInventory
  );



  // Load data on component mount
  useEffect(() => {
    dispatch(fetchCategoriesWithInventory());
    dispatch(fetchLowStockCategories());
  }, [dispatch]);



  const handleRefresh = () => {
    dispatch(fetchCategoriesWithInventory());
    dispatch(fetchLowStockCategories());
  };



  // Show migration status if not completed
  const showMigrationAlert = migrationStatus !== 'completed';

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Category Inventory Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage inventory levels by category with real-time tracking and alerts
        </Typography>
      </Box>

      {/* Migration Status Alert */}
      {showMigrationAlert && (
        <Alert 
          severity={migrationStatus === 'failed' ? 'error' : 'info'} 
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">
            Migration Status: {migrationStatus.charAt(0).toUpperCase() + migrationStatus.slice(1)}
          </Typography>
          <Typography>
            {migrationStatus === 'pending' && 'The system is ready to migrate from product-based to category-based inventory.'}
            {migrationStatus === 'in-progress' && 'Migration is currently in progress. Some features may be limited.'}
            {migrationStatus === 'failed' && 'Migration failed. Please contact support for assistance.'}
            {migrationStatus === 'rolled-back' && 'Migration was rolled back. System is using product-based inventory.'}
          </Typography>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Main Content */}
      <Paper sx={{ p: 2 }}>
        <CategoryInventoryTable />
      </Paper>



      {/* Floating Action Button for Refresh */}
      <Tooltip title="Refresh All Data">
        <Fab
          color="primary"
          aria-label="refresh"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </Fab>
      </Tooltip>


    </Box>
  );
};

export default CategoryInventoryPage; 