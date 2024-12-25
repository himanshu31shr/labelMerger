import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  TableFooter,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { SkuTable } from "./SkuTable";
import { Group } from "./types/group.type";

type ProductGroupTableProps = {
  groupedData: Group[];
  openRow: string | null;
  handleRowClick: (group: string) => void;
};

type Order = "asc" | "desc";

export const ProductGroupTable: React.FC<ProductGroupTableProps> = ({
  groupedData,
  openRow,
  handleRowClick,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Group>("group");

  const handleRequestSort = (property: keyof Group) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...groupedData].sort((a, b) => {
    if (orderBy === "group") {
      return order === "asc"
        ? a.group.localeCompare(b.group)
        : b.group.localeCompare(a.group);
    } else {
      return order === "asc"
        ? Number(a[orderBy]) - Number(b[orderBy])
        : Number(b[orderBy]) - Number(a[orderBy]);
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel
                active={orderBy === "group"}
                direction={orderBy === "group" ? order : "asc"}
                onClick={() => handleRequestSort("group")}
              >
                Group
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "orders"}
                direction={orderBy === "orders" ? order : "asc"}
                onClick={() => handleRequestSort("orders")}
              >
                Orders
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "returns"}
                direction={orderBy === "returns" ? order : "asc"}
                onClick={() => handleRequestSort("returns")}
              >
                Returns
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "returns"}
                direction={orderBy === "returns" ? order : "asc"}
                onClick={() => handleRequestSort("returns")}
              >
                Returns
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "returns"}
                direction={orderBy === "returns" ? order : "asc"}
                onClick={() => handleRequestSort("returns")}
              >
                Returns
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "returns"}
                direction={orderBy === "returns" ? order : "asc"}
                onClick={() => handleRequestSort("returns")}
              >
                Returns
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((group) => (
            <React.Fragment key={group.group}>
              <TableRow onClick={() => handleRowClick(group.group)}>
                <TableCell>
                  <IconButton>
                    {openRow === group.group ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <strong>{group.group.replaceAll("_", " ")}</strong>
                </TableCell>
                <TableCell>{group.orders}</TableCell>
                <TableCell>{group.returns}</TableCell>
                <TableCell>{group.returns}</TableCell>
                <TableCell>{group.returns}</TableCell>
                <TableCell>{group.returns}</TableCell>
              </TableRow>
              <SkuTable skus={group.skus} open={openRow === group.group} />
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6" gutterBottom component="div">
                Totals
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" gutterBottom component="div">
                {sortedData.reduce((acc, curr) => acc + curr.orders, 0)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" gutterBottom component="div">
                {sortedData.reduce((acc, curr) => acc + curr.returns, 0)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
