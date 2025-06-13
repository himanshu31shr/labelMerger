import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { Product } from '../../../services/product.service';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: { xs: '100%', sm: 550, md: 600 },
  maxHeight: { xs: '90vh', sm: '85vh' },
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  borderRadius: 1,
};

interface Props {
  product: Product;
  onClose: () => void;
  onSave: (sku: string, data: Partial<Product>) => void;
}

export const ProductEditModal: React.FC<Props> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
  });

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(product.sku, formData);
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="SKU"
              value={product.sku}
              disabled
              fullWidth
              inputProps={{ 'aria-label': 'SKU' }}
            />
            <TextField
              label="Platform"
              value={product.platform}
              disabled
              fullWidth
              inputProps={{ 'aria-label': 'Platform' }}
            />
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              fullWidth
              required
              inputProps={{ 'aria-label': 'Name' }}
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
              required
              inputProps={{ 'aria-label': 'Description' }}
            />
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};