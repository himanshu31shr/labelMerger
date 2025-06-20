import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Box,
  Paper,
  Divider,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
  FormGroup,
  LinearProgress
} from '@mui/material';
import {
  Sort as SortIcon,
  Help as HelpIcon,
  InfoOutlined
} from '@mui/icons-material';
import { CategorySortConfig, defaultSortConfig, createSortPreview } from '../../../utils/pdfSorting';
import { Product } from '../../../types/product';
import { Category } from '../../../services/category.service';

interface SortPreferencesControlProps {
  products: Product[];
  categories: Category[];
  sortConfig: CategorySortConfig;
  onSortConfigChange: (config: CategorySortConfig) => void;
  isLoading?: boolean;
}

export const SortPreferencesControl: React.FC<SortPreferencesControlProps> = ({
  products,
  categories,
  sortConfig,
  onSortConfigChange,
  isLoading = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [preview, setPreview] = useState<ReturnType<typeof createSortPreview>>([]);

  // Calculate stats for UI
  const categorizedProducts = products.filter(p => p.categoryId && p.categoryId.trim() !== '');
  const uncategorizedCount = products.length - categorizedProducts.length;
  const categoriesWithProducts = new Set(categorizedProducts.map(p => p.categoryId));
  const categoriesWithProductsCount = categoriesWithProducts.size;

  // Update preview when sort config changes
  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      const newPreview = createSortPreview(products, categories, sortConfig);
      setPreview(newPreview);
    }
  }, [products, categories, sortConfig]);

  const handlePrimarySortChange = (value: CategorySortConfig['primarySort']) => {
    onSortConfigChange({
      ...sortConfig,
      primarySort: value,
    });
  };

  const handleSecondarySortChange = (value: CategorySortConfig['secondarySort']) => {
    onSortConfigChange({
      ...sortConfig,
      secondarySort: value,
    });
  };

  const handleSortOrderChange = (value: CategorySortConfig['sortOrder']) => {
    onSortConfigChange({
      ...sortConfig,
      sortOrder: value,
    });
  };

  const handleGroupByCategoryChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onSortConfigChange({
      ...sortConfig,
      groupByCategory: checked,
    });
  };

  const handlePrioritizeToggle = () => {
    onSortConfigChange({
      ...sortConfig,
      prioritizeActiveCategories: !sortConfig.prioritizeActiveCategories
    });
  };

  const handleAlphabeticalToggle = () => {
    onSortConfigChange({
      ...sortConfig,
      sortCategoriesAlphabetically: !sortConfig.sortCategoriesAlphabetically
    });
  };

  const resetToDefaults = () => {
    onSortConfigChange(defaultSortConfig);
  };

  const getSortOptionLabel = (option: string) => {
    switch (option) {
      case 'category': return 'Category';
      case 'name': return 'Product Name';
      case 'price': return 'Price';
      case 'sku': return 'SKU';
      default: return option;
    }
  };

  const primarySortOptions = ['category', 'name', 'price', 'sku'] as const;
  const secondarySortOptions = ['name', 'price', 'sku'] as const;

  return (
    <Card 
      sx={{ 
        mb: 2,
        border: 1,
        borderColor: 'divider',
        '&:hover': {
          boxShadow: theme.shadows[4],
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <SortIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3" flexGrow={1}>
            Sort Preferences
          </Typography>
          <Tooltip title="Configure how products are sorted in your PDF">
            <IconButton size="small">
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Chip 
            label={`${categoriesWithProductsCount} Categories with Products`} 
            color="primary" 
            size="small" 
            sx={{ ml: 'auto' }}
          />
        </Box>

        {isLoading && <LinearProgress sx={{ mb: 2 }} />}

        <Divider sx={{ mb: 2 }} />

        <FormGroup>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={sortConfig.groupByCategory} 
                    onChange={handleGroupByCategoryChange}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 1 }}>Group Products by Category</Typography>
                    <Tooltip title="Organize PDF pages by product categories for easier identification">
                      <InfoOutlined fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                }
              />
              {sortConfig.groupByCategory && (
                <Box sx={{ pl: 4, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {uncategorizedCount > 0 ? (
                      <>Warning: {uncategorizedCount} products without categories will appear at the end</>
                    ) : (
                      <>All products have categories and will be properly organized</>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>

            {sortConfig.groupByCategory && (
              <>
                <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={sortConfig.prioritizeActiveCategories} 
                        onChange={handlePrioritizeToggle}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>Prioritize Active Categories</Typography>
                        <Tooltip title="Categories with products will appear first in the PDF">
                          <InfoOutlined fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                    }
                  />
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={sortConfig.sortCategoriesAlphabetically} 
                        onChange={handleAlphabeticalToggle}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>Sort Categories Alphabetically</Typography>
                        <Tooltip title="Sort categories by name instead of creation date">
                          <InfoOutlined fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                    }
                  />
                </Box>
              </>
            )}
          </Box>
        </FormGroup>

        <Box 
          display="grid" 
          gridTemplateColumns={isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'} 
          gap={2}
          mb={2}
        >
          {/* Primary Sort */}
          <FormControl size="small" disabled={isLoading}>
            <InputLabel>Primary Sort</InputLabel>
            <Select
              value={sortConfig.primarySort}
              label="Primary Sort"
              onChange={(e) => handlePrimarySortChange(e.target.value as CategorySortConfig['primarySort'])}
            >
              {primarySortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {getSortOptionLabel(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Secondary Sort */}
          <FormControl size="small" disabled={isLoading || !sortConfig.groupByCategory}>
            <InputLabel>Secondary Sort</InputLabel>
            <Select
              value={sortConfig.secondarySort || ''}
              label="Secondary Sort"
              onChange={(e) => handleSecondarySortChange(e.target.value as CategorySortConfig['secondarySort'])}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {secondarySortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {getSortOptionLabel(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort Order */}
          <FormControl size="small" disabled={isLoading}>
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortConfig.sortOrder}
              label="Sort Order"
              onChange={(e) => handleSortOrderChange(e.target.value as CategorySortConfig['sortOrder'])}
            >
              <MenuItem value="asc">Ascending (A-Z)</MenuItem>
              <MenuItem value="desc">Descending (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Chip
            label="Reset"
            size="small"
            variant="outlined"
            onClick={resetToDefaults}
            disabled={isLoading}
            sx={{ cursor: 'pointer' }}
          />
        </Box>

        {/* Sort Configuration Summary */}
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 1.5, 
            backgroundColor: theme.palette.grey[50],
            mb: preview.length > 0 ? 2 : 0
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current Configuration:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            <Chip 
              label={`Primary: ${getSortOptionLabel(sortConfig.primarySort)}`} 
              size="small" 
              color="primary"
              variant="outlined"
            />
            {sortConfig.secondarySort && (
              <Chip 
                label={`Secondary: ${getSortOptionLabel(sortConfig.secondarySort)}`} 
                size="small" 
                color="secondary"
                variant="outlined"
              />
            )}
            <Chip 
              label={`Order: ${sortConfig.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={sortConfig.groupByCategory ? 'Grouped' : 'Flat List'} 
              size="small" 
              variant="outlined"
              color={sortConfig.groupByCategory ? 'success' : 'default'}
            />
          </Box>
        </Paper>

        {/* Preview Section */}
        {preview.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Sort Preview ({preview.reduce((sum, cat) => sum + cat.productCount, 0)} products)
            </Typography>
            <Box 
              display="grid" 
              gridTemplateColumns={isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))'} 
              gap={1}
              maxHeight={200}
              overflow="auto"
            >
              {preview.map((categoryPreview, index) => (
                <Paper
                  key={categoryPreview.categoryName}
                  variant="outlined"
                                     sx={{ 
                     p: 1, 
                     backgroundColor: index % 2 === 0 ? theme.palette.grey[100] : 'transparent'
                   }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {categoryPreview.categoryName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {categoryPreview.productCount} products
                  </Typography>
                  {categoryPreview.sampleProducts.length > 0 && (
                    <Box mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Examples: {categoryPreview.sampleProducts.join(', ')}
                        {categoryPreview.productCount > categoryPreview.sampleProducts.length && '...'}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SortPreferencesControl; 