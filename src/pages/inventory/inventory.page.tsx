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
import { fetchInventory, fetchLowStockItems, updateProductInventory } from '../../store/slices/inventorySlice';
import InventoryTable from './components/InventoryTable';
import LowStockAlert from './components/LowStockAlert';

export const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, lowStockItems, loading, error } = useAppSelector((state) => state.inventory);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState(items);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    dispatch(fetchInventory());
    dispatch(fetchLowStockItems());
  }, [dispatch]);

  useEffect(() => {
    // Filter items based on search term and platform
    let filtered = [...items];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (item) => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (platformFilter !== 'all') {
      filtered = filtered.filter((item) => item.platform === platformFilter);
    }
    
    setFilteredItems(filtered);
  }, [items, searchTerm, platformFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatformFilter(event.target.value);
  };

  const handleRefresh = () => {
    dispatch(fetchInventory());
    dispatch(fetchLowStockItems());
  };

  const handleUpdateInventory = async (sku: string, quantity: number) => {
    try {
      await dispatch(updateProductInventory({ sku, quantity })).unwrap();
      setSnackbarMessage('Inventory updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to update inventory');
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
            Inventory Management
          </Typography>
          {lowStockItems.length > 0 && (
            <Chip 
              icon={<WarningIcon />} 
              label={`${lowStockItems.length} Low Stock Items`} 
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

        {lowStockItems.length > 0 && (
          <LowStockAlert items={lowStockItems} onUpdateInventory={handleUpdateInventory} />
        )}

        <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'primary.light' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>
              Filter Products
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search products"
                  placeholder="Search by name or SKU"
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
                  label="Platform"
                  value={platformFilter}
                  onChange={handlePlatformChange}
                >
                  <MenuItem value="all">All Platforms</MenuItem>
                  <MenuItem value="amazon">Amazon</MenuItem>
                  <MenuItem value="flipkart">Flipkart</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Inventory Table
          </Typography>
          <Chip 
            label={`${filteredItems.length} of ${items.length} Products`} 
            color="primary" 
            size="medium" 
          />
        </Box>

        <InventoryTable 
          items={filteredItems} 
          loading={loading} 
          onUpdateInventory={handleUpdateInventory} 
        />
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
