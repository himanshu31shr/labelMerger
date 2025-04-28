import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React from 'react';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  filter?: boolean;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown, row: T | undefined) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  defaultSortColumn: string;
  defaultSortDirection: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ 
  columns, 
  data, 
  defaultSortColumn,
  defaultSortDirection,
  onRowClick
}: DataTableProps<T>) {
  const [orderBy, setOrderBy] = React.useState(defaultSortColumn);
  const [order, setOrder] = React.useState<'asc' | 'desc'>(defaultSortDirection);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const sortedData = React.useMemo(() => {
    const comparator = (a: T, b: T) => {
      const aValue = getNestedValue(a, orderBy);
      const bValue = getNestedValue(b, orderBy);
      
      if (order === 'desc') {
        return (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
      } else {
        return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0);
      }
    };

    return [...data].sort(comparator);
  }, [data, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id as string}
                align={column.align || 'left'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={() => handleRequestSort(column.id as string)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(row)}
              hover={!!onRowClick}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column) => {
                const value = getNestedValue(row, column.id as string);
                return (
                  <TableCell key={column.id as string} align={column.align}>
                    {column.format ? column.format(value, row) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}