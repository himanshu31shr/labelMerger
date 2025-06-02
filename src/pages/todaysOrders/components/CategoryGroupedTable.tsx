import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { CategoryGroup, GroupedOrderData, getCategoryStatistics, filterGroupsBySearch } from '../utils/groupingUtils';
import { ViewAmazonListingButton, ViewFlipkartListingButton } from '../../../shared/ActionButtons';
import { ProductSummary } from '../../home/services/base.transformer';
import { FormattedCurrency } from '../../../components/FormattedCurrency';

interface CategoryGroupedTableProps {
  groupedData: GroupedOrderData;
}

export const CategoryGroupedTable: React.FC<CategoryGroupedTableProps> = ({ groupedData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Filter data based on search term
  const filteredData = filterGroupsBySearch(groupedData, searchTerm);

  const handleCategoryToggle = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const renderActions = (order: ProductSummary) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {order.product?.platform === 'flipkart' && 
       order.product?.metadata?.flipkartSerialNumber &&
       order.product.metadata.flipkartSerialNumber.trim() !== '' && (
        <ViewFlipkartListingButton
          flipkartSerialNumber={order.product.metadata.flipkartSerialNumber}
        />
      )}

      {order.product?.platform === 'amazon' && 
       order.product?.metadata?.amazonSerialNumber &&
       order.product.metadata.amazonSerialNumber.trim() !== '' && (
        <ViewAmazonListingButton
          amazonSerialNumber={order.product.metadata.amazonSerialNumber}
        />
      )}
    </Box>
  );

  const renderCategoryGroup = (group: CategoryGroup) => {
    const stats = getCategoryStatistics(group);
    const isExpanded = expandedCategories[group.categoryName] ?? false;

    return (
      <Accordion
        key={group.categoryName}
        expanded={isExpanded}
        onChange={() => handleCategoryToggle(group.categoryName)}
        sx={{ mb: 2, boxShadow: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: group.categoryName === 'Uncategorized' ? '#fff3e0' : '#e3f2fd',
            '&:hover': {
              backgroundColor: group.categoryName === 'Uncategorized' ? '#ffe0b2' : '#bbdefb',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mr: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CategoryIcon color={group.categoryName === 'Uncategorized' ? 'warning' : 'primary'} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {group.categoryName}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<ShoppingCartIcon />}
                label={`${stats.itemCount} Items`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<TrendingUpIcon />}
                label={`Qty: ${stats.totalQuantity}`}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Chip
                icon={<AttachMoneyIcon />}
                label={<FormattedCurrency value={stats.totalRevenue} />}
                size="small"
                color="success"
                variant="outlined"
              />
              {stats.platforms && (
                <Chip
                  label={stats.platforms}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        
        <AccordionDetails sx={{ p: 0 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell align="center"><strong>Quantity</strong></TableCell>
                  <TableCell align="center"><strong>Platform</strong></TableCell>
                  <TableCell align="right"><strong>Revenue</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.orders.map((order, index) => {
                  const revenue = (order.product?.sellingPrice || 0) * (parseInt(order.quantity) || 0);
                  return (
                    <TableRow 
                      key={`${order.SKU}-${index}`}
                      sx={{ 
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                      }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {order.SKU || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap title={order.name}>
                          {order.name || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={order.quantity} 
                          size="small" 
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={order.type.toUpperCase()}
                          size="small"
                          color={order.type === 'amazon' ? 'warning' : 'info'}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <FormattedCurrency value={revenue} />
                      </TableCell>
                      <TableCell align="center">
                        {renderActions(order)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box>
      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by product name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #1976d2' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <CategoryIcon sx={{ color: '#1976d2', fontSize: 32, mb: 1 }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                {filteredData.summary.totalCategories}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #2e7d32' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <ShoppingCartIcon sx={{ color: '#2e7d32', fontSize: 32, mb: 1 }} />
              <Typography variant="h6" color="success.dark" sx={{ fontWeight: 'bold' }}>
                {filteredData.summary.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #ed6c02' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <AttachMoneyIcon sx={{ color: '#ed6c02', fontSize: 32, mb: 1 }} />
              <Typography variant="h6" color="warning.dark" sx={{ fontWeight: 'bold' }}>
                <FormattedCurrency value={filteredData.summary.totalRevenue} />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #9c27b0' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <TrendingUpIcon sx={{ color: '#9c27b0', fontSize: 32, mb: 1 }} />
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
                {Math.round(filteredData.summary.totalRevenue / Math.max(filteredData.summary.totalOrders, 1))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Category Groups */}
      <Box>
        {filteredData.categorizedGroups.length === 0 && filteredData.uncategorizedGroup.totalItems === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <CategoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No orders found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Try adjusting your search terms' : 'No active orders available'}
            </Typography>
          </Paper>
        ) : (
          <>
            {/* Categorized Groups */}
            {filteredData.categorizedGroups.map(group => renderCategoryGroup(group))}
            
            {/* Uncategorized Group */}
            {filteredData.uncategorizedGroup.totalItems > 0 && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Chip label="Uncategorized Products" color="warning" />
                </Divider>
                {renderCategoryGroup(filteredData.uncategorizedGroup)}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}; 