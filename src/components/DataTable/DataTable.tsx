import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
import { TableHeader } from './TableHeader';
import { TableRowComponent } from './TableRowComponent';

export interface Column<T> {
  id: keyof T;
  label: string;
  align?: 'right' | 'left' | 'center';
  format?: (value: T[keyof T], row: T) => React.ReactNode;
  filter?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  defaultSortColumn?: keyof T;
  defaultSortDirection?: 'asc' | 'desc';
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];
  
  if (typeof bValue === 'string' && typeof aValue === 'string') {
    return bValue.localeCompare(aValue);
  }
  
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator<T>(
  order: 'asc' | 'desc',
  orderBy: keyof T,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function DataTable<T extends { [K in keyof T]: T[K] }>(props: DataTableProps<T>) {
  const { columns, data, defaultSortColumn, defaultSortDirection = 'asc' } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof T>(defaultSortColumn || columns[0].id);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSortDirection);
  const [filters, setFilters] = useState<{ [key in keyof T]?: string }>({});

  const handleRequestSort = useCallback((property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleFilterChange = useCallback((column: keyof T, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPage(0);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(row => {
      return Object.entries(filters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = row[column as keyof T];
        const stringValue = String(cellValue ?? '');
        const filterString = String(filterValue);
        return stringValue.toLowerCase().includes(filterString.toLowerCase());
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    const comparator = getComparator(order, orderBy);
    return [...filteredData].sort(comparator);
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage]);

  const tableContent = useMemo(() => (
    <TableBody>
      {paginatedData.map((row, index) => (
        <TableRowComponent
          key={index}
          row={row}
          columns={columns}
          index={index}
        />
      ))}
    </TableBody>
  ), [paginatedData, columns]);

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader>
          <TableHeader
            columns={columns}
            orderBy={orderBy}
            order={order}
            filters={filters}
            onRequestSort={handleRequestSort}
            onFilterChange={handleFilterChange}
          />
          {tableContent}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}