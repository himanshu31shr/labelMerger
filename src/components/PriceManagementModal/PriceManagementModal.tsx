import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { ProductPrice } from "../../types/transaction.type";
import { DEFAULT_PRODUCT_PRICES } from "../../constants/defaultPrices";
import { DataTable, Column } from "../DataTable/DataTable";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "90%" },
  maxWidth: { xs: "100%", sm: 900, md: 1200 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  maxHeight: { xs: "95vh", sm: "90vh" },
  overflow: "auto",
  borderRadius: 1,
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (prices: ProductPrice[]) => void;
  initialPrices: ProductPrice[];
  availableProducts: { sku: string; description: string }[];
}

interface PriceTableData {
  sku: string;
  description: string;
  basePrice: number;
  costPrice: number;
}

export const PriceManagementModal: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  initialPrices,
  availableProducts,
}) => {
  const [prices, setPrices] = useState<ProductPrice[]>([]);

  useEffect(() => {
    if (open) {
      const defaultedPrices = [
        ...availableProducts.map((product) => ({
          sku: product.sku,
          name: product.description || product.sku,
          description: product.description || product.sku, // Changed to use SKU as fallback
          costPrice: 0,
          basePrice: 0,
        })),
        ...DEFAULT_PRODUCT_PRICES.map((p) => ({
          sku: p.sku,
          name: p.description || p.sku,
          description: p.description || p.sku, // Changed to use SKU as fallback
          costPrice: p.costPrice || 0,
          basePrice: p.costPrice || 0,
        })),
      ];

      setPrices(defaultedPrices);
    }
  }, [open, initialPrices, availableProducts]);

  const handlePriceChange = (sku: string, field: "basePrice" | "costPrice", value: string) => {
    setPrices((prev) =>
      prev.map((price) => {
        if (price.sku === sku) {
          return {
            ...price,
            [field]: Number(value) || 0,
          };
        }
        return price;
      })
    );
  };

  const handleSave = () => {
    onSave(prices);
    onClose();
  };

  const tableData: PriceTableData[] = useMemo(() => 
    prices.map(price => ({
      sku: price.sku,
      description: price.description || price.sku, // Added fallback here too
      basePrice: price.basePrice || 0,
      costPrice: price.costPrice || 0,
    }))
  , [prices]);

  const columns: Column<PriceTableData>[] = [
    {
      id: 'sku',
      label: 'SKU',
      filter: true,
      priorityOnMobile: true // Show in collapsed mobile view
    },
    {
      id: 'description',
      label: 'Description',
      filter: true,
      priorityOnMobile: true // Show in collapsed mobile view
    },
    {
      id: 'basePrice',
      label: 'Base Price',
      align: 'right',
      format: (value,): React.ReactNode => {
        const row = tableData.find(r => r.basePrice === value);
        if (!row) return value as number;
        return (
          <TextField
            type="number"
            value={value}
            onChange={(e) => handlePriceChange(row.sku, "basePrice", e.target.value)}
            size="small"
            fullWidth
            sx={{
              maxWidth: { xs: 100, sm: 120 }
            }}
            inputProps={{
              style: { textAlign: "right" },
              min: 0,
            }}
          />
        );
      }
    },
    {
      id: 'costPrice',
      label: 'Cost Price',
      align: 'right',
      format: (value): React.ReactNode => {
        const row = tableData.find(r => r.costPrice === value);
        if (!row) return value as number;
        return (
          <TextField
            type="number"
            value={value}
            onChange={(e) => handlePriceChange(row.sku, "costPrice", e.target.value)}
            size="small"
            fullWidth
            sx={{
              maxWidth: { xs: 100, sm: 120 }
            }}
            inputProps={{
              style: { textAlign: "right" },
              min: 0,
            }}
          />
        );
      }
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Manage Product Prices
        </Typography>

        <Box sx={{ mb: 3 }}>
          <DataTable
            columns={columns}
            data={tableData}
            defaultSortColumn="sku"
            defaultSortDirection="asc"
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
