import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";

type SkuTable = {
  skus: { [sku: string]: { orders: number; returns: number, title: string } };
  open: boolean;
};

export const SkuTable: React.FC<SkuTable> = ({ skus, open }) => (
  <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Returns</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(skus).map(([sku, counts]) => (
              <TableRow key={sku}>
                <TableCell>{sku}</TableCell>
                <TableCell>{counts.title}</TableCell>
                <TableCell>{counts.orders}</TableCell>
                <TableCell>{counts.returns}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
    </TableCell>
  </TableRow>
);
