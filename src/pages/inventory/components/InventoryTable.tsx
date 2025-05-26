import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Box,
  Chip,
  CircularProgress,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { Product } from '../../../services/product.service';

interface InventoryTableProps {
  items: Product[];
  loading: boolean;
  onUpdateInventory: (sku: string, quantity: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, loading, onUpdateInventory }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSku, setEditingSku] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [newThreshold, setNewThreshold] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleQuickUpdate = (sku: string, quantity: number) => {
    onUpdateInventory(sku, quantity);
  };

  const handleOpenEditDialog = (product: Product) => {
    setEditingSku(product.sku);
    setNewQuantity(product.inventory?.quantity || 0);
    setNewThreshold(product.inventory?.lowStockThreshold || 5);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    // Calculate the difference between current and new quantity
    const product = items.find(item => item.sku === editingSku);
    if (product) {
      const currentQuantity = product.inventory?.quantity || 0;
      const quantityDifference = newQuantity - currentQuantity;
      onUpdateInventory(editingSku, quantityDifference);
      
      // TODO: Update threshold in a separate call when that functionality is added
    }
    setEditDialogOpen(false);
  };

  const getInventoryStatusColor = (product: Product) => {
    // Handle products without inventory field
    if (!product.inventory) return 'error';
    
    const { quantity, lowStockThreshold } = product.inventory;
    if (quantity < 0) return 'error';
    if (quantity === 0) return 'error';
    if (quantity <= lowStockThreshold) return 'warning';
    return 'success';
  };

  const getInventoryStatusText = (product: Product) => {
    // Handle products without inventory field
    if (!product.inventory) return 'No Inventory Data';
    
    const { quantity, lowStockThreshold } = product.inventory;
    if (quantity < 0) return 'Backorder';
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= lowStockThreshold) return 'Low Stock';
    return 'In Stock';
  };

  if (loading && items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No products found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="inventory table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Platform</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Current Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Low Stock Threshold</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={`${product.sku}-${product.platform}`} hover>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={product.platform.charAt(0).toUpperCase() + product.platform.slice(1)} 
                      color={product.platform === 'amazon' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{product.inventory?.quantity || 0}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getInventoryStatusText(product)} 
                      color={getInventoryStatusColor(product)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{product.inventory?.lowStockThreshold || 5}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Add 1">
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => handleQuickUpdate(product.sku, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove 1">
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleQuickUpdate(product.sku, -1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Inventory">
                        <IconButton 
                          size="small" 
                          color="info" 
                          onClick={() => handleOpenEditDialog(product)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Inventory</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              variant="outlined"
              value={newQuantity}
              onChange={(e) => setNewQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="Low Stock Threshold"
              type="number"
              variant="outlined"
              value={newThreshold}
              onChange={(e) => setNewThreshold(Math.max(1, parseInt(e.target.value) || 1))}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InventoryTable;
