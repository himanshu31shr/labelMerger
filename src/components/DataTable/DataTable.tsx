import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import React from "react";
import { TableHeader } from "./TableHeader";
import { TableRowComponent } from "./TableRowComponent";

export interface Column<T> {
  id: keyof T | string;
  label: string;
  filter?: boolean;
  align?: "right" | "left" | "center";
  format?: (value: unknown, row: T | undefined) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  defaultSortColumn: string;
  defaultSortDirection: "asc" | "desc";
  onRowClick?: (row: T) => void;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  id?: string;
}

type Comparable = string | number | Date | boolean;

export function DataTable<T>({
  columns,
  data,
  defaultSortColumn,
  defaultSortDirection,
  onRowClick,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  id = "data-table",
}: DataTableProps<T>) {
  const [orderBy, setOrderBy] = React.useState(defaultSortColumn);
  const [order, setOrder] = React.useState<"asc" | "desc">(
    defaultSortDirection
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [filters, setFilters] = React.useState<
    Partial<Record<keyof T | string, string>>
  >({});

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as string);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (column: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setPage(0);
  };

  const getNestedValue = (obj: T, path: string): unknown => {
    return path.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object") {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  };

  const compareValues = (a: unknown, b: unknown): number => {
    if (a === b) return 0;
    if (a === null || a === undefined) return -1;
    if (b === null || b === undefined) return 1;

    // Handle dates
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    // Convert to comparable types if possible
    const aComp = a as Comparable;
    const bComp = b as Comparable;

    if (typeof aComp === typeof bComp) {
      return aComp < bComp ? -1 : 1;
    }

    // Fall back to string comparison
    return String(a).localeCompare(String(b));
  };

  const filteredAndSortedData = React.useMemo(() => {
    // First apply filters
    const result = data.filter((row) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const value = getNestedValue(row, key);
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });

    // Then sort
    return [...result].sort((a, b) => {
      const aValue = getNestedValue(a, orderBy);
      const bValue = getNestedValue(b, orderBy);
      return order === "desc"
        ? compareValues(bValue, aValue)
        : compareValues(aValue, bValue);
    });
  }, [data, order, orderBy, filters]);

  const paginatedData = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table id={id}>
          <TableHeader
            columns={columns}
            orderBy={orderBy as keyof T}
            order={order}
            onRequestSort={handleRequestSort}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRowComponent
                key={index}
                row={row}
                columns={columns}
                index={index}
                onClick={onRowClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredAndSortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
