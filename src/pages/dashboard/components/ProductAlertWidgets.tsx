import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Link,
  Stack
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link as RouterLink } from 'react-router-dom';
import { Product } from '../../../services/product.service';
import { FormattedCurrency } from '../../../components/FormattedCurrency';

interface ProductAlertWidgetProps {
  products: Product[];
  loading: boolean;
}

// Hidden Products Widget
export const HiddenProductsWidget: React.FC<ProductAlertWidgetProps> = ({ products, loading }) => {
  // Filter to only hidden products
  const hiddenProducts = products.filter(product => product.visibility === 'hidden');
  
  // Show at most 5 items in the widget
  const displayItems = hiddenProducts.slice(0, 5);
  const remainingCount = hiddenProducts.length - 5;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (hiddenProducts.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No hidden products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, height: '100%', backgroundColor: '#e3f2fd', border: '1px solid #2196f3' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <VisibilityOffIcon sx={{ mr: 1, color: '#1565c0' }} />
        <Typography variant="h6" component="h2" sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
          Hidden Products
        </Typography>
        <Chip 
          label={hiddenProducts.length} 
          color="primary" 
          size="small" 
          sx={{ ml: 1, bgcolor: '#1565c0', color: 'white' }}
        />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List dense sx={{ mb: 1 }}>
        {displayItems.map((product) => (
          <ListItem 
            key={`${product.sku}-${product.platform}`}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" noWrap title={product.name}>
                  {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Chip 
                    size="small" 
                    color={product.platform === 'amazon' ? 'primary' : 'secondary'} 
                    label={product.platform} 
                    sx={{ mr: 1, height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    SKU: {product.sku}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {remainingCount > 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            size="small"
            component={RouterLink}
            to="/flipkart-amazon-tools/hidden-products/"
            sx={{ fontSize: '0.75rem' }}
          >
            View {remainingCount} more hidden products
          </Button>
        </Box>
      )}
      
      {hiddenProducts.length > 0 && hiddenProducts.length <= 5 && (
        <Box sx={{ textAlign: 'center' }}>
          <Link 
            component={RouterLink}
            to="/flipkart-amazon-tools/hidden-products/"
            color="primary"
            underline="hover"
            sx={{ fontSize: '0.875rem' }}
          >
            Manage Hidden Products
          </Link>
        </Box>
      )}
    </Paper>
  );
};

// High-Priced Products Widget
export const HighPricedProductsWidget: React.FC<ProductAlertWidgetProps> = ({ products, loading }) => {
  // Filter to only high-priced products (where our price is higher than competitor)
  const highPricedProducts = products.filter(product => 
    product.competetionAnalysis && 
    Number(product.competetionAnalysis.competitorPrice) > 0 &&
    product.sellingPrice > Number(product.competetionAnalysis.competitorPrice)
  );
  
  // Show at most 5 items in the widget
  const displayItems = highPricedProducts.slice(0, 5);
  const remainingCount = highPricedProducts.length - 5;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (highPricedProducts.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No high-priced products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, height: '100%', backgroundColor: '#ffebee', border: '1px solid #f44336' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUpIcon sx={{ mr: 1, color: '#d32f2f' }} />
        <Typography variant="h6" component="h2" sx={{ color: '#b71c1c', fontWeight: 'bold' }}>
          High-Priced Products
        </Typography>
        <Chip 
          label={highPricedProducts.length} 
          color="error" 
          size="small" 
          sx={{ ml: 1, bgcolor: '#d32f2f', color: 'white' }}
        />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List dense sx={{ mb: 1 }}>
        {displayItems.map((product) => (
          <ListItem 
            key={`${product.sku}-${product.platform}`}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" noWrap title={product.name}>
                  {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                </Typography>
              }
              secondary={
                <Stack spacing={0.5} mt={0.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="error">
                      Our price: <FormattedCurrency value={product.sellingPrice} />
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      Competitor: <FormattedCurrency value={Number(product.competetionAnalysis?.competitorPrice || 0)} />
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      size="small" 
                      color={product.platform === 'amazon' ? 'primary' : 'secondary'} 
                      label={product.platform} 
                      sx={{ mr: 1, height: 20 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                  </Box>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {remainingCount > 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="error"
            size="small"
            component={RouterLink}
            to="/flipkart-amazon-tools/hidden-products/"
            sx={{ fontSize: '0.75rem' }}
          >
            View {remainingCount} more high-priced products
          </Button>
        </Box>
      )}
      
      {highPricedProducts.length > 0 && highPricedProducts.length <= 5 && (
        <Box sx={{ textAlign: 'center' }}>
          <Link 
            component={RouterLink}
            to="/flipkart-amazon-tools/hidden-products/"
            color="primary"
            underline="hover"
            sx={{ fontSize: '0.875rem' }}
          >
            Manage Pricing
          </Link>
        </Box>
      )}
    </Paper>
  );
};
