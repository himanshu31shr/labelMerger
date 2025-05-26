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
import { Product } from '../../../services/product.service';

interface LowStockAlertProps {
  items: Product[];
  onUpdateInventory: (sku: string, quantity: number) => void;
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ items, onUpdateInventory }) => {
  // Show at most 5 items in the alert
  const displayItems = items.slice(0, 5);
  const remainingCount = items.length - 5;

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
          Low Stock Alert
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        The following products are running low on inventory. Consider restocking soon.
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {displayItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={`${product.sku}-${product.platform}`}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%', bgcolor: 'background.paper' }}>
              <Box sx={{ flexGrow: 1, pr: 1 }}>
                <Typography variant="subtitle2" noWrap title={product.name}>
                  {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  SKU: {product.sku}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <Chip
                    size="small"
                    color="error"
                    label={`${product.inventory?.quantity || 0} in stock`}
                    sx={{ height: 20 }}
                  />
                  <Chip
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={product.platform}
                    sx={{ height: 20 }}
                  />
                </Stack>
              </Box>
              <Tooltip title="Add 10 to inventory">
                <IconButton
                  color="primary"
                  onClick={() => onUpdateInventory(product.sku, 10)}
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
            href="#inventory-table"
          >
            View {remainingCount} more low stock items
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default LowStockAlert;
