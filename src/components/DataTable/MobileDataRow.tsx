import React, { useState } from 'react';
import {
  IconButton,
  Collapse,
  Box,
  Typography,
  Checkbox,
  Divider,
  Paper,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Column } from './DataTable';

// Define a type for the row data
type RowData = Record<string, unknown>;

interface MobileDataRowProps {
  columns: Column<RowData>[];
  row: RowData;
  onSelect?: (id: string | number, checked: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  idField?: string;
  onRowClick?: (row: RowData) => void;
}

export const MobileDataRow: React.FC<MobileDataRowProps> = ({
  columns,
  row,
  onSelect,
  selectable,
  selected,
  idField = 'id',
  onRowClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(row[idField] as string | number, !selected);
    }
  };

  // Find the primary column (usually the first one)
  const primaryColumn = columns[0];
  const primaryValue = row[primaryColumn.id];

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mb: 1, 
        overflow: 'hidden',
        cursor: onRowClick ? 'pointer' : 'default'
      }}
      onClick={onRowClick ? handleRowClick : undefined}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 1.5,
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {selectable && (
            <Box sx={{ mr: 1.5 }} onClick={handleSelectClick}>
              <Checkbox checked={!!selected} />
            </Box>
          )}
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {String(primaryValue ?? '')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {columns[1] && String(row[columns[1].id] ?? '')}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ p: 1.5, pt: 0 }}>
          {columns.slice(2).map((column) => (
            <Box key={String(column.id)} sx={{ mb: 1.5 }}>
              <Typography variant="body2" color="text.secondary" component="span">
                {column.label}:
              </Typography>
              <Typography 
                variant="body1" 
                component="span" 
                sx={{ ml: 1 }}
              >
                {column.format 
                  ? column.format(row[column.id], row) 
                  : String(row[column.id] ?? '')}
              </Typography>
              <Divider sx={{ mt: 1.5 }} />
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};