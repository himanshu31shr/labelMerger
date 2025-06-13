import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchCategoriesWithInventory, 
  fetchLowStockCategories, 
  updateCategoryInventory 
} from '../../store/slices/categoryInventorySlice';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import CategoryLowStockAlert from '../inventory/components/CategoryLowStockAlert';
import UnifiedCategoryTable from './UnifiedCategoryTable';

export const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lowStockCategories, loading } = useAppSelector((state) => state.categoryInventory);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  useEffect(() => {
    // Only fetch data if authenticated
    if (isAuthenticated) {
      dispatch(fetchCategoriesWithInventory());
      dispatch(fetchLowStockCategories());
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = () => {
    dispatch(fetchCategoriesWithInventory());
    dispatch(fetchLowStockCategories());
  };

  const handleUpdateInventory = async (categoryId: string, quantity: number) => {
    try {
      await dispatch(updateCategoryInventory({ categoryId, quantity })).unwrap();
      setSnackbarMessage('Category inventory updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Failed to update category inventory');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InventoryIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Category & Inventory Management
          </Typography>
          {lowStockCategories.length > 0 && (
            <Chip 
              icon={<WarningIcon />} 
              label={`${lowStockCategories.length} Low Stock Categories`} 
              color="warning" 
              sx={{ ml: 2, fontWeight: 'bold' }}
            />
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            variant="contained" 
            onClick={handleRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
            sx={{ fontWeight: 'medium' }}
          >
            Refresh All Data
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {lowStockCategories.length > 0 && (
          <CategoryLowStockAlert 
            categories={lowStockCategories} 
            onUpdateInventory={handleUpdateInventory} 
          />
        )}

        {/* Unified Category Table */}
        <UnifiedCategoryTable />
      </Paper>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CategoriesPage;
