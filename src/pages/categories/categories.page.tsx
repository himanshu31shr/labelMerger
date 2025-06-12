import React, { useEffect, useState } from 'react';
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
  Chip
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
import CategoryList from './CategoryList';
import CategoryLowStockAlert from '../inventory/components/CategoryLowStockAlert';

export const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, lowStockCategories, loading } = useAppSelector((state) => state.categoryInventory);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

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

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Category Management & Inventory
          </Typography>
          <Chip 
            label={`${categories.length} Categories`} 
            color="primary" 
            size="medium" 
          />
        </Box>

        <div id="category-inventory-table">
          <CategoryList />
        </div>
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
