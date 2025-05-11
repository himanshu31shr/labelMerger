import React, { useMemo } from "react";
import { DataTable, Column } from "../../../components/DataTable/DataTable";
import { Transaction } from "../../../types/transaction.type";

interface ProductTableData {
  sku: string;
  description: string;
  units: number;
  sales: number;
  cost: number;
  profit: number;
}

interface Props {
  transactions: Transaction[];
}

const ProductList: React.FC<Props> = ({ transactions }) => {
  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

  const productArray = useMemo(() => {
    const productMap = new Map<string, ProductTableData>();

    transactions.forEach(transaction => {
      const sku = transaction.sku;
      const existing = productMap.get(sku) || {
        sku,
        description: transaction.description || sku,
        units: 0,
        sales: 0,
        cost: 0,
        profit: 0
      };

      existing.units += transaction.quantity;
      existing.sales += transaction.sellingPrice * transaction.quantity;
      existing.cost += (transaction.product?.costPrice || 0) * transaction.quantity;
      
      // Calculate profit: sales - cost - expenses
      const expenses = transaction.expenses.shippingFee + 
                      transaction.expenses.marketplaceFee + 
                      transaction.expenses.otherFees;
      const transactionProfit = (transaction.sellingPrice * transaction.quantity) - 
                              ((transaction.product?.costPrice || 0) * transaction.quantity) - 
                              expenses;
      existing.profit += transactionProfit;

      productMap.set(sku, existing);
    });

    return Array.from(productMap.values());
  }, [transactions]);

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
