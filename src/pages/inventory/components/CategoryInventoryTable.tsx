import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel,
} from '@mui/material';
import { Refresh as RefreshIcon, Edit as EditIcon, History as HistoryIcon } from '@mui/icons-material';
import {
  selectCategoriesWithInventory,
  selectCategoryInventoryLoading,
  selectCategoryInventoryError,
  fetchCategoriesWithInventory,
} from '../../../store/slices/categoryInventorySlice';
import { CategoryWithInventory } from '../../../types/categoryInventory.types';

type SortField = 'name' | 'totalQuantity' | 'lowStockThreshold' | 'productCount';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

const CategoryInventoryTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoriesWithInventory);
  const loading = useSelector(selectCategoryInventoryLoading);
  const error = useSelector(selectCategoryInventoryError);

  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithInventory | null>(null);

  const getStockStatus = (category: CategoryWithInventory): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    const { totalQuantity, lowStockThreshold } = category.inventory;
    if (totalQuantity === 0) return 'out-of-stock';
    if (totalQuantity <= lowStockThreshold) return 'low-stock';
    return 'in-stock';
  };

  const getStatusLabel = (status: 'in-stock' | 'low-stock' | 'out-of-stock'): string => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: 'in-stock' | 'low-stock' | 'out-of-stock') => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = categories.filter(category => getStockStatus(category) === statusFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'totalQuantity':
          aValue = a.inventory.totalQuantity;
          bValue = b.inventory.totalQuantity;
          break;
        case 'lowStockThreshold':
          aValue = a.inventory.lowStockThreshold;
          bValue = b.inventory.lowStockThreshold;
          break;
        case 'productCount':
          aValue = a.inventory.productCount;
          bValue = b.inventory.productCount;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [categories, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRefresh = () => {
    dispatch(fetchCategoriesWithInventory());
  };

  const handleEdit = (category: CategoryWithInventory) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleViewHistory = (category: CategoryWithInventory) => {
    // TODO: Implement history view
    console.log('View history for category:', category.id);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading inventory data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error: {error}
      </Alert>
    );
  }

  if (categories.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No categories found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Filter by status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Filter by status"
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="in-stock">In Stock</MenuItem>
            <MenuItem value="low-stock">Low Stock</MenuItem>
            <MenuItem value="out-of-stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'totalQuantity'}
                  direction={sortField === 'totalQuantity' ? sortDirection : 'asc'}
                  onClick={() => handleSort('totalQuantity')}
                >
                  Total Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'lowStockThreshold'}
                  direction={sortField === 'lowStockThreshold' ? sortDirection : 'asc'}
                  onClick={() => handleSort('lowStockThreshold')}
                >
                  Low Stock Threshold
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'productCount'}
                  direction={sortField === 'productCount' ? sortDirection : 'asc'}
                  onClick={() => handleSort('productCount')}
                >
                  Product Count
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedCategories.map((category) => {
              const status = getStockStatus(category);
              return (
                <TableRow key={category.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {category.name}
                      </Typography>
                      {category.description && (
                        <Typography variant="body2" color="textSecondary">
                          {category.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {category.inventory.totalQuantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {category.inventory.lowStockThreshold}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {category.inventory.productCount}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getStatusLabel(status)}
                      color={getStatusColor(status) as 'success' | 'warning' | 'error' | 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<HistoryIcon />}
                        onClick={() => handleViewHistory(category)}
                      >
                        History
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal - Placeholder */}
      {editModalOpen && (
        <div>
          <Typography variant="h6">Edit Category Inventory</Typography>
          {/* TODO: Implement actual modal */}
        </div>
      )}
    </Box>
  );
};

export default CategoryInventoryTable; 