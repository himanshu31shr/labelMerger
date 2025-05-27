import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  Alert,
  CircularProgress,
  TablePagination,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as SwapHorizIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { InventoryOperation } from '../../../types/categoryInventory.types';
import { RootState } from '../../../store';
import { Timestamp } from 'firebase/firestore';

interface CategoryInventoryHistoryProps {
  categoryId: string;
  open: boolean;
  onClose: () => void;
}

interface ExpandedRows {
  [key: string]: boolean;
}

const CategoryInventoryHistory: React.FC<CategoryInventoryHistoryProps> = ({
  categoryId,
  open,
  onClose,
}) => {
  const { operations, loading, error } = useSelector((state: RootState) => state.categoryInventory);

  // Local state
  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter operations for this category
  const categoryOperations = useMemo(() => {
    return operations.filter(op => op.categoryId === categoryId);
  }, [operations, categoryId]);

  // Apply filters
  const filteredOperations = useMemo(() => {
    let filtered = [...categoryOperations];

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(op => op.type === typeFilter);
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(op => 
        op.reason?.toLowerCase().includes(searchLower) ||
        op.performedBy.toLowerCase().includes(searchLower)
      );
    }

    // Date range filter
    if (fromDate || toDate) {
      filtered = filtered.filter(op => {
        const opDate = op.timestamp instanceof Date ? op.timestamp : op.timestamp.toDate();
        const opDateStr = format(opDate, 'yyyy-MM-dd');
        
        if (fromDate && opDateStr < fromDate) return false;
        if (toDate && opDateStr > toDate) return false;
        return true;
      });
    }

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => {
      const dateA = a.timestamp instanceof Date ? a.timestamp : a.timestamp.toDate();
      const dateB = b.timestamp instanceof Date ? b.timestamp : b.timestamp.toDate();
      return dateB.getTime() - dateA.getTime();
    });
  }, [categoryOperations, typeFilter, searchTerm, fromDate, toDate]);

  // Pagination
  const paginatedOperations = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredOperations.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredOperations, page, rowsPerPage]);

  const handleExpandRow = (operationId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [operationId]: !prev[operationId],
    }));
  };

  const handleRefresh = () => {
    // In a real app, this would dispatch an action to fetch operations
    console.log('Refreshing operations...');
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Type', 'Quantity Change', 'Previous', 'New', 'Reason', 'Performed By'];
    const csvContent = [
      headers.join(','),
      ...filteredOperations.map(op => {
        const date = op.timestamp instanceof Date ? op.timestamp : op.timestamp.toDate();
        const quantityChange = op.type === 'remove' || op.type === 'transfer' ? -op.quantity : op.quantity;
        return [
          format(date, 'yyyy-MM-dd HH:mm:ss'),
          op.type,
          quantityChange,
          op.previousQuantity,
          op.newQuantity,
          `"${op.reason || ''}"`,
          `"${op.performedBy}"`,
        ].join(',');
      }),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory-history-${categoryId}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'add':
      case 'adjustment':
        return <TrendingUpIcon color="success" />;
      case 'remove':
        return <TrendingDownIcon color="error" />;
      case 'transfer':
        return <SwapHorizIcon color="info" />;
      default:
        return <BuildIcon />;
    }
  };

  const getOperationTypeLabel = (type: string) => {
    switch (type) {
      case 'add':
        return 'Add';
      case 'remove':
        return 'Remove';
      case 'transfer':
        return 'Transfer';
      case 'adjustment':
        return 'Adjustment';
      default:
        return type;
    }
  };

  const formatQuantityChange = (operation: InventoryOperation) => {
    const change = operation.type === 'remove' || operation.type === 'transfer' 
      ? -operation.quantity 
      : operation.quantity;
    return change > 0 ? `+${change}` : `${change}`;
  };

  const formatTimestamp = (timestamp: Date | Timestamp) => {
    const date = timestamp instanceof Date ? timestamp : timestamp.toDate();
    return format(date, 'MMM dd, yyyy HH:mm');
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '80vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Inventory History</Typography>
          <Box>
            <Tooltip title="Refresh history">
              <IconButton onClick={handleRefresh} aria-label="Refresh history">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <IconButton onClick={handleExport}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="type-filter-label">Filter by type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  value={typeFilter}
                  label="Filter by type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="add">Add</MenuItem>
                  <MenuItem value="remove">Remove</MenuItem>
                  <MenuItem value="transfer">Transfer</MenuItem>
                  <MenuItem value="adjustment">Adjustment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search operations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="From date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="To date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error loading history</Typography>
            <Typography>{error}</Typography>
          </Alert>
        ) : filteredOperations.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary">
              No inventory history found
            </Typography>
            <Typography color="textSecondary">
              No operations have been recorded for this category yet.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="50px"></TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Change</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Performed By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOperations.map((operation) => (
                    <React.Fragment key={operation.id}>
                      <TableRow 
                        hover 
                        onClick={() => handleExpandRow(operation.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <IconButton size="small">
                            {expandedRows[operation.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {formatTimestamp(operation.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            {getOperationIcon(operation.type)}
                            <Chip 
                              label={getOperationTypeLabel(operation.type)}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={operation.type === 'remove' || operation.type === 'transfer' ? 'error' : 'success'}
                            fontWeight="bold"
                          >
                            {formatQuantityChange(operation)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {operation.previousQuantity} → {operation.newQuantity}
                        </TableCell>
                        <TableCell>{operation.reason || '-'}</TableCell>
                        <TableCell>{operation.performedBy}</TableCell>
                      </TableRow>
                      
                      {/* Expanded row with metadata */}
                      <TableRow>
                        <TableCell colSpan={7} sx={{ py: 0 }}>
                          <Collapse in={expandedRows[operation.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ py: 2, px: 2, bgcolor: 'grey.50' }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Operation Details
                              </Typography>
                              {operation.metadata && (
                                <Box>
                                  {Object.entries(operation.metadata).map(([key, value]) => (
                                    <Typography key={key} variant="body2" color="textSecondary">
                                      {key.charAt(0).toUpperCase() + key.slice(1)}: {String(value)}
                                    </Typography>
                                  ))}
                                </Box>
                              )}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredOperations.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryInventoryHistory; 