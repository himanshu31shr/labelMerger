import React from "react";
import { Transaction } from "../../../types/transaction.type";
import { DataTable, Column } from "../../../components/DataTable/DataTable";

interface OrderListProps {
  transactions: Transaction[];
}

interface OrderTableData {
  transactionId: string;
  sku: string;
  platform: string;
  sellingPrice: number;
  total: number;
  productCost: number;
  type: string;
}

const OrderList: React.FC<OrderListProps> = ({ transactions }) => {
  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

  const tableData: OrderTableData[] = transactions.map(transaction => ({
    transactionId: transaction.transactionId,
    sku: transaction.sku,
    platform: transaction.platform,
    sellingPrice: transaction.sellingPrice,
    total: transaction.total || 0,
    productCost: transaction.product.costPrice,
    type: transaction.type || ''
  }));

  const columns: Column<OrderTableData>[] = [
    { id: 'transactionId', label: '#', filter: true },
    { id: 'sku', label: 'SKU', filter: true },
    { id: 'platform', label: 'Platform', filter: true },
    { 
      id: 'sellingPrice', 
      label: 'Selling Price', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
    { 
      id: 'total', 
      label: 'Earnings', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
    { 
      id: 'productCost', 
      label: 'Product Cost', 
      align: 'right',
      format: (value) => formatCurrency(value as number)
    },
    { id: 'type', label: 'Type', filter: true },
  ];

  return (
    <DataTable
      columns={columns}
      data={tableData}
      defaultSortColumn="transactionId"
      defaultSortDirection="asc"
    />
  );
};

export default OrderList;
