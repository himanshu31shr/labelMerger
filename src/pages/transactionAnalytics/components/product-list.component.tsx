import React from "react";
import {
  ProductPrice,
  TransactionSummary,
} from "../../../types/transaction.type";
import { DataTable, Column } from "../../../components/DataTable/DataTable";

interface ProductListProps {
  summary: TransactionSummary;
  productPrices: Map<string, ProductPrice>;
}

interface ProductTableData {
  sku: string;
  description: string;
  units: number;
  sales: number;
  cost: number;
  profit: number;
}

const ProductList: React.FC<ProductListProps> = ({
  summary: { salesByProduct },
  productPrices,
}) => {
  const productArray: ProductTableData[] = Array.from(productPrices).map(([sku, data]) => ({
    sku,
    description: data.description || '',
    units: salesByProduct[sku] ? salesByProduct[sku]?.units : 0,
    sales: salesByProduct[sku]?.amount || 0,
    cost: (productPrices.get(sku)?.costPrice || 0) * (salesByProduct[sku]?.units || 0),
    profit: salesByProduct[sku]?.profit || 0
  }));

  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

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
    />
  );
};

export default ProductList;
