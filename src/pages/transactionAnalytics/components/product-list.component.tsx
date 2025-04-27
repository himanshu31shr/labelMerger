import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  ProductPrice,
  TransactionSummary,
} from "../../../types/transaction.type";

interface ProductListProps {
  summary: TransactionSummary;
  productPrices: Map<string, ProductPrice>;
}

const ProductList: React.FC<ProductListProps> = ({
  summary: { salesByProduct },
  productPrices,
}) => {
  return (
    <TableContainer style={{ maxHeight: "800px" }}>
      <Table>
        <TableHead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            backgroundColor: "#000",
          }}
        >
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Units</TableCell>
            <TableCell align="right">Sales</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(productPrices).map(([sku, data]) => (
            <TableRow key={sku}>
              <TableCell>{sku}</TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell align="right">
                {salesByProduct[sku] ? salesByProduct[sku]?.units : 0}
              </TableCell>
              <TableCell align="right">
                ₹{salesByProduct[sku]?.amount.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                ₹
                {(
                  (productPrices.get(sku)?.costPrice || 0) *
                  salesByProduct[sku]?.units
                ).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                ₹{salesByProduct[sku]?.profit.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
