import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ProductSummary } from "../services/base.transformer";

interface SummaryTableProps {
  summary: ProductSummary[];
}

export const SummaryTable = ({ summary }: SummaryTableProps) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 500
          }}
        >
          Product Summary
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Summary of all products from merged labels
        </Typography>
      </Box>
      
      <TableContainer id="summary-table">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme => theme.palette.mode === 'dark' 
                    ? 'background.paper' 
                    : 'background.default'
                }}
              >
                #
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme => theme.palette.mode === 'dark' 
                    ? 'background.paper' 
                    : 'background.default'
                }}
              >
                SKU
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme => theme.palette.mode === 'dark' 
                    ? 'background.paper' 
                    : 'background.default'
                }}
              >
                Product
              </TableCell>
              <TableCell 
                align="right"
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme => theme.palette.mode === 'dark' 
                    ? 'background.paper' 
                    : 'background.default'
                }}
              >
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((item, index) => (
              <TableRow
                key={index}
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.02)'
                  }
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{item.SKU}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>
                  {item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};