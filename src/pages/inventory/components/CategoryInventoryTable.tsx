import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  Button,
  Chip,
  CircularProgress,
  Alert,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Refresh as RefreshIcon, Edit as EditIcon } from '@mui/icons-material';
import {
  selectCategoriesWithInventory,
  selectCategoryInventoryLoading,
  selectCategoryInventoryError,
  fetchCategoriesWithInventory,
  updateCategoryInventory,
  updateCategoryThreshold,
} from '../../../store/slices/categoryInventorySlice';
import { CategoryWithInventory } from '../../../types/categoryInventory.types';
import CategoryInventoryEditModal from './CategoryInventoryEditModal';
import { Column, DataTable } from '../../../components/DataTable/DataTable';

const CategoryInventoryTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoriesWithInventory);
  const loading = useSelector(selectCategoryInventoryLoading);
  const error = useSelector(selectCategoryInventoryError);

  const [editModalOpen, setEditModalOpen] = useState(false);
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



  const handleRefresh = () => {
    dispatch(fetchCategoriesWithInventory());
  };

  const handleEdit = (category: CategoryWithInventory) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSaveInventory = async (data: {
    categoryId: string;
    quantityAdjustment: number;
    newLowStockThreshold: number;
    reason: string;
    performedBy: string;
  }) => {
    try {
      // First, update the inventory quantity if there's a change
      if (data.quantityAdjustment !== 0) {
        await dispatch(updateCategoryInventory({
          categoryId: data.categoryId,
          quantity: data.quantityAdjustment,
          reason: data.reason,
          performedBy: data.performedBy,
        }));
      }
      
      // Then update the threshold if it changed
      if (data.newLowStockThreshold > 0) {
        await dispatch(updateCategoryThreshold({
          categoryId: data.categoryId,
          threshold: data.newLowStockThreshold,
        }));
      }
      
      handleCloseEditModal();
      dispatch(fetchCategoriesWithInventory());
    } catch {
      // Handle error appropriately - could show a toast notification
    }
  };

  const columns: Column<CategoryWithInventory>[] = [
    {
      id: 'name',
      label: 'Category',
      filter: true,
      format: (_, row) => row ? (
        <Box>
          <Typography variant="body1" fontWeight="medium">
            {row.name}
          </Typography>
          {row.description && (
            <Typography variant="body2" color="textSecondary">
              {row.description}
            </Typography>
          )}
        </Box>
      ) : null,
      filterValue: (row) => `${row.name} ${row.description || ''}`,
    },
    {
      id: 'inventory.totalQuantity',
      label: 'Total Quantity',
      align: 'right',
      format: (_, row) => row ? (
        <Typography variant="body1">
          {row.inventory.totalQuantity}
        </Typography>
      ) : null,
    },
    {
      id: 'inventory.lowStockThreshold',
      label: 'Low Stock Threshold',
      align: 'right',
      format: (_, row) => row ? (
        <Typography variant="body1">
          {row.inventory.lowStockThreshold}
        </Typography>
      ) : null,
    },
    {
      id: 'inventory.productCount',
      label: 'Product Count',
      align: 'right',
      format: (_, row) => row ? (
        <Typography variant="body1">
          {row.inventory.productCount}
        </Typography>
      ) : null,
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      filter: true,
      format: (_, row) => {
        if (!row) return null;
        const status = getStockStatus(row);
        return (
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status) as 'success' | 'warning' | 'error' | 'default'}
            size="small"
          />
        );
      },
      filterValue: (row) => getStatusLabel(getStockStatus(row)),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      format: (_, row) => row ? (
        <Box display="flex" gap={1} justifyContent="center">
          <IconButton
            size="small"
            onClick={() => handleEdit(row)}
            aria-label={`edit-${row.name}`}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ) : null,
    },
  ];

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
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={categories}
        defaultSortColumn="name"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
        id="category-inventory-table"
      />

      {/* Edit Modal */}
      {editModalOpen && selectedCategory && (
        <CategoryInventoryEditModal
          open={editModalOpen}
          category={selectedCategory}
          onClose={handleCloseEditModal}
          onSave={handleSaveInventory}
        />
      )}
    </Box>
  );
};

export default CategoryInventoryTable; 