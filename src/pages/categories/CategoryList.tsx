import React, { useState, useMemo, useEffect, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store/types';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  selectCategory, 
  clearCategoriesError
} from '../../store/slices/categoriesSlice';
// Import the Category type and Timestamp from firebase
import { Category as ServiceCategory } from '../../services/category.service';
import { Timestamp } from 'firebase/firestore';

// Import Material-UI components
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CategoryForm } from './CategoryForm';

type CategoryFormData = {
  name: string;
  description?: string;
}

interface CategoryListProps {
  // Add any props if needed
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

// Extend the service's Category type to handle both Timestamp and Date/string
interface Category extends Omit<ServiceCategory, 'createdAt' | 'updatedAt'> {
  id?: string;
  name: string;
  description?: string;
  createdAt?: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
}

const CategoryList: React.FC<CategoryListProps> = (): ReactElement => {
  // Redux state
  const dispatch = useAppDispatch();
  const { 
    items: categories = [],
    loading = false,
    error = null
  } = useAppSelector((state: RootState) => state.categories || {});

  // State for form and dialogs
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Memoize categories to prevent unnecessary re-renders
  const memoizedCategories = useMemo(() => categories, [categories]);
  const safeCategories = useMemo(() => Array.isArray(categories) ? categories : [], [categories]);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        await dispatch(fetchCategories()).unwrap();
      } catch (err) {
        setSnackbar({
          open: true,
          message: 'Failed to load categories',
          severity: 'error',
        });
      }
    };
    
    loadCategories();
  }, [dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearCategoriesError());
      }
    };
  }, [dispatch, error]);

  // Handle error state changes
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error || 'An error occurred',
        severity: 'error',
      });
      
      // Clear the error after showing it
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
        // Create a minimal update object with only the necessary fields
        const updateData = {
          id: editingCategory.id,
          name: data.name,
          description: data.description || ''
        };
        await dispatch(updateCategory(updateData as any)).unwrap();
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
    } catch (err) {
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
    
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      setSnackbar({
        open: true,
        message: 'Category deleted successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete category',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleEditCategory = (category: Category) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleAddCategory = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <Card>
      <CardHeader
        title="Product Categories"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
            disabled={loading}
          >
            Add Category
          </Button>
        }
      />
      <CardContent>
        {loading && !memoizedCategories.length ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{String(error)}</Alert>
        ) : (
          <List>
            {memoizedCategories.map((category) => (
              <React.Fragment key={category.id}>
                <ListItem
                  component="div"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => category.id && dispatch(selectCategory(category.id))}
                >
                  <ListItemText 
                    primary={category.name} 
                    secondary={category.description} 
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={handleEditClick(category)}
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleDeleteClick(category)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>

      {/* Category Form Dialog */}
      <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <CategoryForm
            open={isFormOpen}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            defaultValues={editingCategory || undefined}
            isSubmitting={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            autoFocus 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CategoryList;
