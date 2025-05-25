import React from 'react';
import { Box, Button, FormControl, InputLabel, List, ListItem, ListSubheader, MenuItem, Popover, Select, Typography } from '@mui/material';
import { Category } from '../../../services/category.service';

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  selectedSku: string;
  selectedPlatform: string;
  selectedProduct: string;
  skuOptions: string[];
  platformOptions: string[];
  productOptions: string[];
  onCategoryChange: (category: string) => void;
  onSkuChange: (sku: string) => void;
  onPlatformChange: (platform: string) => void;
  onProductChange: (product: string) => void;
  onClearFilters: () => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  onClose,
  categories,
  selectedCategory,
  selectedSku,
  selectedPlatform,
  selectedProduct,
  skuOptions,
  platformOptions,
  productOptions,
  onCategoryChange,
  onSkuChange,
  onPlatformChange,
  onProductChange,
  onClearFilters,
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Box sx={{ width: 300, maxHeight: 500, overflow: 'auto' }}>
        <List>
          <ListSubheader>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Filters</Typography>
              <Button size="small" onClick={onClearFilters}>Clear All</Button>
            </Box>
          </ListSubheader>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => onCategoryChange(e.target.value as string)}
                size="small"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                ))}
                <MenuItem value="Uncategorized">Uncategorized</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={selectedProduct}
                label="Product"
                onChange={(e) => onProductChange(e.target.value as string)}
                size="small"
              >
                <MenuItem value="">All Products</MenuItem>
                {productOptions.map(product => (
                  <MenuItem key={product} value={product}>{product}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>SKU</InputLabel>
              <Select
                value={selectedSku}
                label="SKU"
                onChange={(e) => onSkuChange(e.target.value as string)}
                size="small"
              >
                <MenuItem value="">All SKUs</MenuItem>
                {skuOptions.map(sku => (
                  <MenuItem key={sku} value={sku}>{sku}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={selectedPlatform}
                label="Platform"
                onChange={(e) => onPlatformChange(e.target.value as string)}
                size="small"
              >
                <MenuItem value="">All Platforms</MenuItem>
                {platformOptions.map(platform => (
                  <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </Box>
    </Popover>
  );
};

export default FilterPopover; 