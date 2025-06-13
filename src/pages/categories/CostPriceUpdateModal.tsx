import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

interface CostPriceUpdateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newPrice: number | null) => Promise<void>;
  categoryName: string;
  currentPrice: number | null;
  productsInheritingCount: number;
  isSubmitting: boolean;
}

export const CostPriceUpdateModal: React.FC<CostPriceUpdateModalProps> = ({
  open,
  onClose,
  onSubmit,
  categoryName,
  currentPrice,
  productsInheritingCount,
  isSubmitting,
}) => {
  const [price, setPrice] = useState<string>(currentPrice?.toString() || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (open) {
      setPrice(currentPrice?.toString() || '');
      setError('');
    }
  }, [open, currentPrice]);

  const handleSubmit = async () => {
    try {
      if (price === '') {
        await onSubmit(null);
      } else {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice < 0) {
          setError('Please enter a valid price');
          return;
        }
        // Round to 2 decimal places for Rupee amounts
        await onSubmit(Math.round(numericPrice * 100) / 100);
      }
    } catch (err: unknown) {
      console.error('Error updating cost price:', err);
      setError('Failed to update cost price');
    }
  };

  const handleClear = () => {
    setPrice('');
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Cost Price</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Category: {categoryName}
          </Typography>
          {productsInheritingCount > 0 && (
            <Typography color="info.main" sx={{ mb: 2 }}>
              Note: {productsInheritingCount} product(s) currently inherit this cost price
            </Typography>
          )}
        </Box>
        <TextField
          label="Cost Price (₹)"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error || 'Leave empty to clear the cost price'}
          fullWidth
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            endAdornment: price && (
              <InputAdornment position="end">
                <Tooltip title="Clear price">
                  <IconButton onClick={handleClear} edge="end" size="small">
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          disabled={isSubmitting}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 