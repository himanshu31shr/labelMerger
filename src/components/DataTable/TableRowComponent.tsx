import React, { memo } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Column } from './DataTable';

interface TableRowComponentProps<T> {
  row: T;
  columns: Column<T>[];
  index: number;
}

function TableRowComponentBase<T>(props: TableRowComponentProps<T>) {
  const { row, columns, index } = props;

  return (
    <TableRow hover key={index}>
      {columns.map((column) => {
        const value = row[column.id];
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