import React, { memo } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Column } from './DataTable';

interface TableRowComponentProps<T> {
  row: T;
  columns: Column<T>[];
  index: number;
  onClick?: (row: T) => void;
}

function TableRowComponentBase<T>(props: TableRowComponentProps<T>) {
  const { row, columns, index, onClick } = props;

  return (
    <TableRow 
      hover 
      key={index}
      onClick={() => onClick?.(row)}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {columns.map((column) => {
        const value = row[column.id as keyof T];
        return (
          <TableCell key={String(column.id)} align={column.align}>
            {column.format 
              ? column.format(value, row)
              : String(value ?? '')}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export const TableRowComponent = memo(TableRowComponentBase) as typeof TableRowComponentBase;