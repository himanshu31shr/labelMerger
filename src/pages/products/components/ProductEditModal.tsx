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
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
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
    costPrice: product.costPrice,
  });

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'costPrice' ? Number(event.target.value) : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
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
            />
            <TextField
              label="Platform"
              value={product.platform}
              disabled
              fullWidth
            />
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              label="Cost Price"
              type="number"
              value={formData.costPrice}
              onChange={handleChange('costPrice')}
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
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