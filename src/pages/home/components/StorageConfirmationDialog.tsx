import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Alert,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import { CloudUpload, AccessTime, Description, Info, CategoryOutlined } from '@mui/icons-material';
import { StorageConfig, defaultStorageConfig } from '../../../services/pdfStorageService';

import { Product } from '../../../types/product';
import { Category } from '../../../types/category';

interface StorageConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (config: StorageConfig) => void;
  fileName: string;
  products: Product[];
  categories: Category[];
  isUploading: boolean;
}

export const StorageConfirmationDialog: React.FC<StorageConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  fileName,
  products,
  categories,
  isUploading
}) => {
  const [storageConfig, setStorageConfig] = useState<StorageConfig>(defaultStorageConfig);
  const [description, setDescription] = useState('');

  // Generate file statistics
  const categorizedProducts = products.filter(p => p.categoryId && p.categoryId.trim() !== '');
  const categoriesWithProducts = new Set(categorizedProducts.map(p => p.categoryId));
  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    categorizedProducts: categorizedProducts.length,
    categoriesWithProducts: categoriesWithProducts.size
  };

  const handleExpiryDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setStorageConfig(prev => ({
      ...prev,
      expiryDays: isNaN(value) || value < 1 ? 1 : value > 90 ? 90 : value
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm({
      ...storageConfig,
      description: description.trim() || `Sorted PDF with ${stats.totalProducts} products across ${stats.categoriesWithProducts} categories`
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={isUploading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 10
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <CloudUpload sx={{ mr: 1 }} />
        Save to Cloud Storage
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {isUploading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Uploading PDF to Storage...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please wait while your file is being uploaded
            </Typography>
          </Box>
        ) : (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              Your PDF will be stored in the cloud and automatically sorted by category.
            </Alert>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                File Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Description fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {fileName}
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip 
                  icon={<CategoryOutlined />} 
                  label={`${stats.categoriesWithProducts} Categories`}
                  color="primary" 
                  size="small"
                />
                <Chip 
                  icon={<Info />} 
                  label={`${stats.totalProducts} Products`}
                  color="secondary" 
                  size="small"
                />
              </Stack>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                Products will be automatically sorted by category, then by SKU
              </Alert>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <TextField
              label="Description (optional)"
              fullWidth
              multiline
              rows={2}
              value={description}
              onChange={handleDescriptionChange}
              placeholder={`Sorted PDF with ${stats.totalProducts} products across ${stats.categoriesWithProducts} categories`}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <TextField
                label="Expiry (Days)"
                type="number"
                value={storageConfig.expiryDays}
                onChange={handleExpiryDaysChange}
                InputProps={{
                  inputProps: { min: 1, max: 90 },
                  endAdornment: <InputAdornment position="end">days</InputAdornment>
                }}
                sx={{ width: '150px' }}
                helperText="1-90 days"
              />
            </Box>
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          disabled={isUploading}
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleConfirm}
          variant="contained" 
          startIcon={<CloudUpload />}
          disabled={isUploading}
        >
          Save to Cloud
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 