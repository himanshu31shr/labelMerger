import React, { memo } from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box, TextField } from '@mui/material';
import { Column } from './DataTable';

interface TableHeaderProps<T> {
  columns: Column<T>[];
  orderBy: keyof T;
  order: 'asc' | 'desc';
  filters: { [key in keyof T]?: string };
  onRequestSort: (property: keyof T) => void;
  onFilterChange: (column: keyof T, value: string) => void;
}

function TableHeaderComponent<T>(props: TableHeaderProps<T>) {
  const { columns, orderBy, order, filters, onRequestSort, onFilterChange } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={String(column.id)}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={() => onRequestSort(column.id)}
            >
              {column.label}
            </TableSortLabel>
            {column.filter && (
              <Box sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  placeholder={`Filter ${column.label}`}
                  value={filters[column.id] || ''}
                  onChange={(e) => onFilterChange(column.id, e.target.value)}
                  fullWidth
                />
              </Box>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const TableHeader = memo(TableHeaderComponent) as typeof TableHeaderComponent;