import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from '@mui/material';
import { ProductPrice } from '../../types/transaction.type';
import { DEFAULT_PRODUCT_PRICES } from '../../constants/defaultPrices';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto'
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (prices: ProductPrice[]) => void;
  initialPrices: ProductPrice[];
  availableProducts: { sku: string; description: string }[];
}

export const PriceManagementModal: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  initialPrices,
  availableProducts
}) => {
  const [prices, setPrices] = useState<ProductPrice[]>([]);

  useEffect(() => {
    if (open) {
      // Initialize with default prices for products that don't have prices set
      const defaultedPrices = availableProducts.map(product => {
        const existingPrice = initialPrices.find((p) => p.sku === product.sku);
        if (existingPrice) return existingPrice;

        const defaultPrice = DEFAULT_PRODUCT_PRICES.find(p => p.sku === product.sku);
        return {
          sku: product.sku,
          description: product.description,
          basePrice: defaultPrice?.costPrice || 0,
          costPrice: defaultPrice?.costPrice || 0
        };
      });
      setPrices(defaultedPrices);
    }
  }, [open, initialPrices, availableProducts]);

  const handlePriceChange = (sku: string, field: 'basePrice' | 'costPrice', value: string) => {
    setPrices(prev => prev.map(price => {
      if (price.sku === sku) {
        return {
          ...price,
          [field]: Number(value) || 0
        };
      }
      return price;
    }));
  };

  const handleSave = () => {
    onSave(prices);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Manage Product Prices
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 'calc(90vh - 200px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Base Price</TableCell>
                <TableCell align="right">Cost Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.sku}>
                  <TableCell>{price.sku}</TableCell>
                  <TableCell>{price.description}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={price.basePrice}
                      onChange={(e) => handlePriceChange(price.sku, 'basePrice', e.target.value)}
                      size="small"
                      inputProps={{ 
                        style: { textAlign: 'right' },
                        min: 0
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={price.costPrice}
                      onChange={(e) => handlePriceChange(price.sku, 'costPrice', e.target.value)}
                      size="small"
                      inputProps={{ 
                        style: { textAlign: 'right' },
                        min: 0
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};