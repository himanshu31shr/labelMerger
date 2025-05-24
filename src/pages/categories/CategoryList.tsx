import React, { useState, useMemo, useEffect, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store/types';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  clearCategoriesError
} from '../../store/slices/categoriesSlice';
import { Category as ServiceCategory } from '../../services/category.service';
import { Timestamp } from 'firebase/firestore';
import { DataTable, Column } from '../../components/DataTable/DataTable';

import {
  Box,
  Button,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CategoryForm } from './CategoryForm';

type CategoryFormData = {
  name: string;
  description?: string;
}

type CategoryListProps = Record<string, never>;

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface Category extends Omit<ServiceCategory, 'createdAt' | 'updatedAt'> {
  id?: string;
  name: string;
  description?: string;
  createdAt?: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
}

const CategoryList: React.FC<CategoryListProps> = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { 
    items: categories = [],
    loading = false,
    error = null
  } = useAppSelector((state: RootState) => state.categories || {});

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const safeCategories = useMemo(() => Array.isArray(categories) ? categories : [], [categories]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await dispatch(fetchCategories()).unwrap();
      } catch {
        setSnackbar({
          open: true,
          message: 'Failed to load categories',
          severity: 'error',
        });
      }
    };
    
    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearCategoriesError());
      }
    };
  }, [dispatch, error]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error || 'An error occurred',
        severity: 'error',
      });
      
      const timer = setTimeout(() => {
        if (clearCategoriesError) {
          dispatch(clearCategoriesError());
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory?.id) {
        const updateData = {
          id: editingCategory.id,
          name: data.name,
          description: data.description || ''
        };
        await dispatch(updateCategory(updateData)).unwrap();
        setSnackbar({
          open: true,
          message: 'Category updated successfully',
          severity: 'success',
        });
      } else {
        await dispatch(createCategory(data)).unwrap();
        setSnackbar({
          open: true,
          message: 'Category created successfully',
          severity: 'success',
        });
      }
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch {
      setSnackbar({
        open: true,
        message: 'An error occurred',
        severity: 'error',
      });
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleEditClick = (category: Category) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingCategory({
      ...category,
      name: category.name || '',
      description: category.description || ''
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category: Category) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (category.id) {
      setCategoryToDelete(category);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete?.id) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      setSnackbar({
        open: true,
        message: 'Category deleted successfully',
        severity: 'success',
      });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to delete category',
        severity: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const columns: Column<Category>[] = [
    { id: 'id', label: 'ID', filter: true },
    { id: 'name', label: 'Name', filter: true },
    { id: 'tag', label: 'Tag', filter: true },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      format: (_, row) => {
        if (!row) return null;
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={handleEditClick(row)}
              aria-label="edit"
              disabled={loading || isDeleting}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDeleteClick(row)}
              aria-label="delete"
              disabled={loading || isDeleting}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Categories
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          disabled={loading || isDeleting}
        >
          Add Category
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={safeCategories}
        defaultSortColumn="name"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />

      <CategoryForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        defaultValues={editingCategory || undefined}
        isSubmitting={loading || isDeleting}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog} 
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryList;
