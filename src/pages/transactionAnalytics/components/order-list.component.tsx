import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Transaction } from "../../../types/transaction.type";
import React from "react";

interface OrderListProps {
  transactions: Transaction[];
}
const OrderList: React.FC<OrderListProps> = ({
  transactions,
}: OrderListProps) => {
  return (
    <TableContainer style={{ maxHeight: "800px"}}>
      <Table>
        <TableHead style={{ position: "sticky", top: 0, zIndex: 1, width:'100%', backgroundColor: '#000' }}>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell align="right">Selling Price</TableCell>
            <TableCell align="right">Earnings</TableCell>
            <TableCell align="right">Product Cost</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {transactions.map((transaction) => (
            <TableRow key={transaction.hash}>
              <TableCell>{transaction.transactionId}</TableCell>
              <TableCell>{transaction.sku}</TableCell>
              <TableCell>{transaction.platform}</TableCell>
              <TableCell align="right">{transaction.sellingPrice}</TableCell>
              <TableCell align="right">{transaction.total}</TableCell>
              <TableCell align="right">
                {transaction.product.costPrice}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
