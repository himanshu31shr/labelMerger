import React, { useState, useEffect, useMemo } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Badge,
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon, Inventory as InventoryIcon } from '@mui/icons-material';
import { 
  fetchProductsByCategory, 
  clearCategoryProducts,
  selectCategoryProducts,
  selectCategoryProductsLoading,
  selectCategoryProductsError 
} from '../../store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface ProductSidesheetProps {
  open: boolean;
  onClose: () => void;
  categoryId: string | null;
  categoryName: string;
}

const PRODUCTS_PER_PAGE = 8;

export const ProductSidesheet: React.FC<ProductSidesheetProps> = ({
  open,
  onClose,
  categoryId,
  categoryName,
}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCategoryProducts);
  const loading = useAppSelector(selectCategoryProductsLoading);
  const error = useAppSelector(selectCategoryProductsError);
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!open || !categoryId) {
      dispatch(clearCategoryProducts());
      setPage(1);
      setSearchQuery('');
      return;
    }

    dispatch(fetchProductsByCategory(categoryId));
  }, [open, categoryId, dispatch]);

  const handleClose = () => {
    dispatch(clearCategoryProducts());
    onClose();
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'error' as const };
    if (quantity <= 5) return { label: 'Low Stock', color: 'warning' as const };
    return { label: 'In Stock', color: 'success' as const };
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 450, md: 550 },
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Products
            </Typography>
            <IconButton onClick={handleClose} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Category: <strong>{categoryName}</strong>
          </Typography>
          
          {/* Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page when searching
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 2 }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchQuery ? 'No products found' : 'No products in this category'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'Try adjusting your search terms' : 'This category is currently empty'}
              </Typography>
            </Box>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {filteredProducts.length} of {products.length} products
                  {searchQuery && ` matching "${searchQuery}"`}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Stack spacing={2}>
                  {paginatedProducts.map((product) => {
                    const stockStatus = getStockStatus(product.inventory?.quantity || 0);
                    return (
                      <Card key={product.sku} elevation={1} sx={{ '&:hover': { elevation: 3 } }}>
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'medium', flex: 1 }}>
                              {product.name}
                            </Typography>
                            <Chip
                              label={product.platform}
                              size="small"
                              color={product.platform === 'amazon' ? 'warning' : 'info'}
                              variant="outlined"
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            SKU: {product.sku}
                          </Typography>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                              {formatPrice(product.sellingPrice)}
                            </Typography>
                            <Badge 
                              badgeContent={product.inventory?.quantity || 0} 
                              color={stockStatus.color}
                              max={999}
                            >
                              <Chip
                                label={stockStatus.label}
                                size="small"
                                color={stockStatus.color}
                                variant="outlined"
                              />
                            </Badge>
                          </Box>

                          {product.description && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                lineHeight: 1.4,
                              }}
                            >
                              {product.description}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </Box>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="small"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}; 