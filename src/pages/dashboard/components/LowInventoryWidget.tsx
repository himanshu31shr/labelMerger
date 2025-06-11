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
import WarningIcon from '@mui/icons-material/Warning';
import { Link as RouterLink } from 'react-router-dom';
import { Product } from '../../../services/product.service';

interface LowInventoryWidgetProps {
  items: Product[];
  loading: boolean;
}

const LowInventoryWidget: React.FC<LowInventoryWidgetProps> = ({ items, loading }) => {
  // Show at most 5 items in the widget
  const displayItems = items.slice(0, 5);
  const remainingCount = items.length - 5;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No low stock items found.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, height: '100%', border: '1px solid', borderColor: 'warning.main' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
        <Typography variant="h6" component="h2" sx={{ color: 'warning.dark', fontWeight: 'bold' }}>
          Low Stock Alerts
        </Typography>
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
              '&:hover': { bgcolor: 'action.hover' },
              py: 1
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" noWrap title={product.name}>
                  {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                </Typography>
              }
              secondary={
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Chip 
                    size="small" 
                    color={product.inventory?.quantity && product.inventory.quantity < 0 ? 'error' : 'warning'} 
                    label={`${product.inventory?.quantity || 0} in stock`} 
                    sx={{ height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    SKU: {product.sku}
                  </Typography>
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
            color="warning" 
            size="small"
            component={RouterLink}
            to="/flipkart-amazon-tools/inventory/"
            sx={{ fontSize: '0.75rem' }}
          >
            View {remainingCount} more low stock items
          </Button>
        </Box>
      )}
      
      {items.length > 0 && items.length <= 5 && (
        <Box sx={{ textAlign: 'center' }}>
          <Link 
            component={RouterLink}
            to="/flipkart-amazon-tools/inventory/"
            color="primary"
            underline="hover"
            sx={{ fontSize: '0.875rem' }}
          >
            Manage Inventory
          </Link>
        </Box>
      )}
    </Paper>
  );
};

export default LowInventoryWidget;
