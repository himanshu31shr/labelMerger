import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Grid, 
  TextField, 
  InputAdornment,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
import CategoryInventoryTable from './components/CategoryInventoryTable';
import CategoryLowStockAlert from './components/CategoryLowStockAlert';

export const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, lowStockCategories, loading } = useAppSelector((state) => state.categoryInventory);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredCategories, setFilteredCategories] = useState(categories);
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

  useEffect(() => {
    // Filter categories based on search term and tag
    let filtered = [...categories];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (category) => 
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (category.tag && category.tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (tagFilter !== 'all') {
      filtered = filtered.filter((category) => category.tag === tagFilter);
    }
    
    setFilteredCategories(filtered);
  }, [categories, searchTerm, tagFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(event.target.value);
  };

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

  // Get unique tags for filter dropdown
  const uniqueTags = Array.from(new Set(categories.map(cat => cat.tag).filter(Boolean)));

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InventoryIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Category Inventory Management
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
            Refresh Inventory
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {lowStockCategories.length > 0 && (
          <CategoryLowStockAlert 
            categories={lowStockCategories} 
            onUpdateInventory={handleUpdateInventory} 
          />
        )}

        <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'primary.light' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>
              Filter Categories
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search categories"
                  placeholder="Search by name, description, or tag"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Tag"
                  value={tagFilter}
                  onChange={handleTagChange}
                >
                  <MenuItem value="all">All Tags</MenuItem>
                  {uniqueTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Category Inventory Table
          </Typography>
          <Chip 
            label={`${filteredCategories.length} of ${categories.length} Categories`} 
            color="primary" 
            size="medium" 
          />
        </Box>

        <div id="category-inventory-table">
          <CategoryInventoryTable />
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

export default InventoryPage;
