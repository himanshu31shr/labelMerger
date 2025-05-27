import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import { CategoryWithInventory } from '../../../types/categoryInventory.types';
import { selectCategoryInventoryLoading } from '../../../store/slices/categoryInventorySlice';

interface CategoryInventoryEditModalProps {
  open: boolean;
  category: CategoryWithInventory;
  onClose: () => void;
  onSave: (data: {
    categoryId: string;
    quantityAdjustment: number;
    newLowStockThreshold: number;
    reason: string;
    performedBy: string;
  }) => void;
}

interface FormData {
  quantityAdjustment: number;
  lowStockThreshold: number;
  reason: string;
  performedBy: string;
  // Store raw input values for validation
  quantityAdjustmentRaw: string;
  lowStockThresholdRaw: string;
}

interface FormErrors {
  quantityAdjustment?: string;
  lowStockThreshold?: string;
  reason?: string;
  performedBy?: string;
}

const CategoryInventoryEditModal: React.FC<CategoryInventoryEditModalProps> = ({
  open,
  category,
  onClose,
  onSave,
}) => {
  const loading = useSelector(selectCategoryInventoryLoading);

  const [formData, setFormData] = useState<FormData>({
    quantityAdjustment: 0,
    lowStockThreshold: category.inventory.lowStockThreshold,
    reason: '',
    performedBy: '',
    quantityAdjustmentRaw: '0',
    lowStockThresholdRaw: category.inventory.lowStockThreshold.toString(),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      setFormData({
        quantityAdjustment: 0,
        lowStockThreshold: category.inventory.lowStockThreshold,
        reason: '',
        performedBy: '',
        quantityAdjustmentRaw: '0',
        lowStockThresholdRaw: category.inventory.lowStockThreshold.toString(),
      });
      setErrors({});
    }
  }, [category]);

  const calculateNewQuantity = (): number => {
    return category.inventory.totalQuantity + formData.quantityAdjustment;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate quantity adjustment using raw input
    const quantityValue = parseFloat(formData.quantityAdjustmentRaw);
    if (formData.quantityAdjustmentRaw.trim() !== '') {
      if (isNaN(quantityValue)) {
        newErrors.quantityAdjustment = 'Please enter a valid number';
      } else {
        const newQuantity = category.inventory.totalQuantity + quantityValue;
        if (newQuantity < 0) {
          newErrors.quantityAdjustment = 'Resulting quantity cannot be negative';
        }
      }
    }

    // Validate low stock threshold using raw input
    const thresholdValue = parseFloat(formData.lowStockThresholdRaw);
    if (formData.lowStockThresholdRaw.trim() !== '') {
      if (isNaN(thresholdValue) || thresholdValue < 0) {
        newErrors.lowStockThreshold = 'Low stock threshold must be 0 or greater';
      }
    }

    // Validate reason (required if quantity adjustment is not 0)
    if (formData.quantityAdjustment !== 0 && !formData.reason.trim()) {
      newErrors.reason = 'Reason for change is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;
    
    if (field === 'quantityAdjustment') {
      const numValue = parseFloat(rawValue);
      setFormData(prev => ({
        ...prev,
        quantityAdjustment: rawValue === '' ? 0 : (isNaN(numValue) ? 0 : numValue),
        quantityAdjustmentRaw: rawValue,
      }));
    } else if (field === 'lowStockThreshold') {
      const numValue = parseFloat(rawValue);
      setFormData(prev => ({
        ...prev,
        lowStockThreshold: rawValue === '' ? 0 : (isNaN(numValue) ? 0 : numValue),
        lowStockThresholdRaw: rawValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: rawValue,
      }));
    }

    // Clear error when user starts typing
    const errorField = field === 'quantityAdjustmentRaw' ? 'quantityAdjustment' : 
                      field === 'lowStockThresholdRaw' ? 'lowStockThreshold' : field;
    if (errors[errorField as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [errorField]: undefined,
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        categoryId: category.id,
        quantityAdjustment: formData.quantityAdjustment,
        newLowStockThreshold: formData.lowStockThreshold,
        reason: formData.reason,
        performedBy: formData.performedBy,
      });
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const newQuantity = calculateNewQuantity();
  const hasQuantityChange = formData.quantityAdjustment !== 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={loading}
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          Edit Category Inventory
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Category Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {category.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {category.description}
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Current Quantity: ${category.inventory.totalQuantity}`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Product Count: ${category.inventory.productCount}`}
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Form Fields */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity Adjustment"
                type="text"
                value={formData.quantityAdjustmentRaw}
                onChange={handleInputChange('quantityAdjustment')}
                error={!!errors.quantityAdjustment}
                helperText={errors.quantityAdjustment || 'Enter positive number to add, negative to subtract'}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                type="text"
                value={formData.lowStockThresholdRaw}
                onChange={handleInputChange('lowStockThreshold')}
                error={!!errors.lowStockThreshold}
                helperText={errors.lowStockThreshold}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Change"
                multiline
                rows={3}
                value={formData.reason}
                onChange={handleInputChange('reason')}
                error={!!errors.reason}
                helperText={errors.reason || 'Explain why this change is being made'}
                disabled={loading}
                required={hasQuantityChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Performed By"
                value={formData.performedBy}
                onChange={handleInputChange('performedBy')}
                error={!!errors.performedBy}
                helperText={errors.performedBy || 'Name of person making this change'}
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Quantity Preview */}
          {hasQuantityChange && (
            <Box sx={{ mt: 3 }}>
              <Alert 
                severity={newQuantity >= 0 ? 'info' : 'error'}
                sx={{ mb: 2 }}
              >
                <Typography variant="body1">
                  <strong>New Quantity: {newQuantity}</strong>
                </Typography>
                <Typography variant="body2">
                  {formData.quantityAdjustment > 0 
                    ? `Adding ${formData.quantityAdjustment} units`
                    : `Removing ${Math.abs(formData.quantityAdjustment)} units`
                  }
                </Typography>
              </Alert>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryInventoryEditModal; 