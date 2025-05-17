import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Grid,
  Typography,
  Chip,
  InputAdornment,
  Paper
} from '@mui/material';
import { 
  Sort as SortIcon, 
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Column } from './DataTable';

interface MobileFiltersProps<T> {
  columns: Column<T>[];
  orderBy: keyof T;
  order: 'asc' | 'desc';
  filters: { [key in keyof T]?: string };
  onRequestSort: (property: keyof T) => void;
  onFilterChange: (column: keyof T, value: string) => void;
}

export function MobileFilters<T>(props: MobileFiltersProps<T>) {
  const { columns, orderBy, order, filters, onRequestSort, onFilterChange } = props;
  const [sortDialogOpen, setSortDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Columns that have filters enabled
  const filterableColumns = columns.filter(col => col.filter);
  
  // Active filter count
  const activeFilterCount = Object.values(filters).filter(v => v && typeof v === 'string' && v.length > 0).length;

  // Apply the unified search to all filterable columns
  const applySearch = (text: string) => {
    // Clear all previous filters
    filterableColumns.forEach(column => {
      onFilterChange(column.id as keyof T, '');
    });

    // If search text exists, apply it to the first filterable column 
    // This works because the DataTable component will search across all matching fields
    if (text && filterableColumns.length > 0) {
      onFilterChange(filterableColumns[0].id as keyof T, text);
    }
  };

  // Handle the search when user types
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    applySearch(value);
  };

  // Clear search text
  const handleClearSearch = () => {
    setSearchText('');
    applySearch('');
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Unified search bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1, 
          mb: 1.5,
          display: 'flex',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <TextField
          placeholder="Search all columns..."
          fullWidth
          size="small"
          value={searchText}
          onChange={handleSearchChange}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchText ? (
              <InputAdornment position="end">
                <IconButton 
                  edge="end" 
                  onClick={handleClearSearch}
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
            disableUnderline: true
          }}
        />
        <IconButton 
          size="small" 
          onClick={() => setSortDialogOpen(true)}
          sx={{ ml: 1 }}
        >
          <SortIcon />
        </IconButton>
      </Paper>

      {/* Active filter indicator */}
      {activeFilterCount > 0 && (
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
            Showing results for "{searchText}"
          </Typography>
          <Chip 
            label="Clear" 
            size="small" 
            variant="outlined" 
            sx={{ ml: 1, height: 20, fontSize: 11 }}
            onClick={handleClearSearch} 
          />
        </Box>
      )}

      {/* Sort Dialog */}
      <Dialog
        open={sortDialogOpen}
        onClose={() => setSortDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Sort By</DialogTitle>
        <DialogContent>
          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
            {columns.map((column) => (
              <Grid item xs={12} key={String(column.id)}>
                <Button
                  fullWidth
                  variant={orderBy === column.id ? 'contained' : 'outlined'}
                  onClick={() => {
                    onRequestSort(column.id as keyof T);
                    setSortDialogOpen(false);
                  }}
                  endIcon={orderBy === column.id ? (
                    order === 'asc' ? '↑' : '↓'
                  ) : null}
                  sx={{ justifyContent: 'space-between' }}
                  size="small"
                >
                  {column.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSortDialogOpen(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}