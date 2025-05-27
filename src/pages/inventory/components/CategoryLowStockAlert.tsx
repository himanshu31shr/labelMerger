import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import { LowStockAlert } from '../../../types/categoryInventory.types';

interface CategoryLowStockAlertProps {
  categories: LowStockAlert[];
  onUpdateInventory: (categoryId: string, quantity: number) => void;
}

const CategoryLowStockAlert: React.FC<CategoryLowStockAlertProps> = ({ 
  categories, 
  onUpdateInventory 
}) => {
  // Show at most 5 categories in the alert
  const displayCategories = categories.slice(0, 5);
  const remainingCount = categories.length - 5;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        border: '1px solid',
        borderColor: 'warning.main',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
        <Typography variant="h6" component="h2" sx={{ color: 'warning.dark', fontWeight: 'bold' }}>
          Low Stock Categories Alert
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        The following categories are running low on inventory. Consider restocking soon.
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {displayCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%', bgcolor: 'background.paper' }}>
              <Box sx={{ flexGrow: 1, pr: 1 }}>
                <Typography variant="subtitle2" noWrap title={category.categoryName}>
                  {category.categoryName.length > 30 ? `${category.categoryName.substring(0, 30)}...` : category.categoryName}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Severity: {category.severity}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <Chip
                    size="small"
                    color={category.severity === 'out-of-stock' ? 'error' : category.severity === 'critical' ? 'error' : 'warning'}
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
                  <Chip
                    size="small"
                    variant="outlined"
                    color="warning"
                    label={`Min: ${category.lowStockThreshold}`}
                    sx={{ height: 20 }}
                  />
                </Stack>
              </Box>
              <Tooltip title="Add 50 to category inventory">
                <IconButton
                  color="primary"
                  onClick={() => onUpdateInventory(category.categoryId, 50)}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {remainingCount > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="warning" 
            component="a" 
            href="#category-inventory-table"
          >
            View {remainingCount} more low stock categories
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default CategoryLowStockAlert; 