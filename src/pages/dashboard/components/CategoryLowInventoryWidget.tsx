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
import { LowStockAlert } from '../../../types/categoryInventory.types';

interface CategoryLowInventoryWidgetProps {
  categories: LowStockAlert[];
  loading: boolean;
}

const CategoryLowInventoryWidget: React.FC<CategoryLowInventoryWidgetProps> = ({ categories, loading }) => {
  // Show at most 5 categories in the widget
  const displayCategories = categories.slice(0, 5);
  const remainingCount = categories.length - 5;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (categories.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          All categories are well stocked!
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, height: '100%', border: '1px solid', borderColor: 'warning.main' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
        <Typography variant="h6" component="h2" sx={{ color: 'warning.dark', fontWeight: 'bold' }}>
          Low Stock Categories
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List dense sx={{ mb: 1 }}>
        {displayCategories.map((category) => (
          <ListItem 
            key={category.categoryId}
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
                <Typography variant="body2" noWrap title={category.categoryName}>
                  {category.categoryName.length > 30 ? `${category.categoryName.substring(0, 30)}...` : category.categoryName}
                </Typography>
              }
              secondary={
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Chip 
                    size="small" 
                    color={
                      category.severity === 'out-of-stock' ? 'error' : 
                      category.severity === 'critical' ? 'error' : 'warning'
                    } 
                    label={`${category.currentQuantity} in stock`} 
                    sx={{ height: 20 }}
                  />
                  <Chip 
                    size="small" 
                    variant="outlined"
                    color="primary"
                    label={`${category.productCount} products`} 
                    sx={{ height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {category.severity === 'out-of-stock' ? 'Out of Stock' : 
                     category.severity === 'critical' ? 'Critical' : 'Low Stock'}
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
            View {remainingCount} more low stock categories
          </Button>
        </Box>
      )}
      
      {categories.length > 0 && categories.length <= 5 && (
        <Box sx={{ textAlign: 'center' }}>
          <Link 
            component={RouterLink}
            to="/flipkart-amazon-tools/inventory/"
            color="primary"
            underline="hover"
            sx={{ fontSize: '0.875rem' }}
          >
            Manage Category Inventory
          </Link>
        </Box>
      )}
    </Paper>
  );
};

export default CategoryLowInventoryWidget; 