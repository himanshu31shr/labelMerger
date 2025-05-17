import React, { memo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  IconButton,
  Collapse,
  CardActions,
  Button
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { Column } from './DataTable';

interface MobileDataRowProps<T> {
  row: T;
  columns: Column<T>[];
  index: number;
  onClick?: (row: T) => void;
}

function MobileDataRowBase<T>(props: MobileDataRowProps<T>) {
  const { row, columns, index, onClick } = props;
  const [expanded, setExpanded] = useState(false);

  // Get primary display columns and secondary (detail) columns
  // Primary columns are those marked with priorityOnMobile or the first 2-3 columns
  const primaryColumns = columns.filter(col => col.priorityOnMobile || columns.indexOf(col) < 2);
  const detailColumns = columns.filter(col => !primaryColumns.includes(col));

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick when toggling expansion
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        mb: 1.5,
        '&:hover': {
          bgcolor: 'action.hover',
        }
      }}
      elevation={1}
    >
      {/* Summary view (always visible) */}
      <CardContent sx={{ p: 1.5, pb: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            {primaryColumns.map((column, colIndex) => {
              const value = row[column.id as keyof T];
              return (
                <Box key={String(column.id)}>
                  <Typography variant="caption" color="text.secondary">
                    {column.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: colIndex === 0 ? 'medium' : 'normal' }}>
                    {column.format
                      ? column.format(value, row)
                      : String(value ?? '')}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
          <IconButton
            size="small"
            onClick={toggleExpand}
            sx={{ mt: -0.5, mr: -0.5 }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </CardContent>

      {/* Actions row */}
      <CardActions sx={{ pt: 0, pb: 1, px: 1.5, justifyContent: 'flex-end' }}>
        {onClick && (
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onClick(row);
            }}
          >
            View
          </Button>
        )}
      </CardActions>

      {/* Expanded detail view */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 1.5, pt: 0, bgcolor: 'action.hover' }}>
          <Divider sx={{ mt: 0.5, mb: 1.5 }} />
          <Stack spacing={1.5}>
            {detailColumns.map((column) => {
              const value = row[column.id as keyof T];
              return (
                <Box key={String(column.id)}>
                  <Typography variant="caption" color="text.secondary">
                    {column.label}
                  </Typography>
                  <Typography variant="body2">
                    {column.format
                      ? column.format(value, row)
                      : String(value ?? '')}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export const MobileDataRow = memo(MobileDataRowBase) as typeof MobileDataRowBase;