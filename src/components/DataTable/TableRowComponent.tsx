import React, { memo } from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import { Column } from './DataTable';

interface TableRowComponentProps<T> {
  row: T;
  columns: Column<T>[];
  index: number;
  onClick?: (row: T) => void;
  enableSelection?: boolean;
  selected?: boolean;
  onSelect?: (id: string | number, checked: boolean) => void;
  rowId?: string | number;
}

function TableRowComponentBase<T>(props: TableRowComponentProps<T>) {
  const { row, columns, index, onClick, enableSelection, selected = false, onSelect, rowId } = props;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onSelect && rowId !== undefined) {
      onSelect(rowId, e.target.checked);
    }
  };

  const handleCellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TableRow 
      hover 
      key={index}
      onClick={() => onClick?.(row)}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {enableSelection && (
        <TableCell padding="checkbox" onClick={handleCellClick}>
          <Checkbox
            checked={selected}
            onChange={handleCheckboxClick}
            inputProps={{ 'aria-label': 'select row' }}
          />
        </TableCell>
      )}
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