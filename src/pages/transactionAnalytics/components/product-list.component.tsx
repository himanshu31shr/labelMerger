import React from "react";
import { DataTable, Column } from "../../../components/DataTable/DataTable";
import { ProductPrice, TransactionSummary } from "../../../types/transaction.type";

interface ProductTableData {
  sku: string;
  description: string;
  units: number;
  sales: number;
  cost: number;
  profit: number;
}

interface Props {
  summary: TransactionSummary;
  productPrices: Map<string, ProductPrice>;
}

const ProductList: React.FC<Props> = ({ summary, productPrices }) => {
  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

  const productArray: ProductTableData[] = Object.entries(summary.salesByProduct).map(
    ([sku, data]) => ({
      sku,
      description: data.name,
      units: data.units,
      sales: data.amount,
      cost: (productPrices.get(sku)?.costPrice || 0) * data.units,
      profit: data.profit
    })
  );

  const columns: Column<ProductTableData>[] = [
    { id: 'sku', label: 'SKU', filter: true },
    { id: 'description', label: 'Description', filter: true },
    { 
      id: 'units', 
      label: 'Units', 
      align: 'right',
      format: (value) => String(value)
    },
    { 
      id: 'sales', 
      label: 'Sales', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
    { 
      id: 'cost', 
      label: 'Cost', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
    { 
      id: 'profit', 
      label: 'Profit', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={productArray}
      defaultSortColumn="sku"
      defaultSortDirection="asc"
      rowsPerPageOptions={[10, 25, 50]}
      defaultRowsPerPage={25}
    />
  );
};

export default ProductList;
