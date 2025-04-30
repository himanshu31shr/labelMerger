import { Badge, Box, Grid, MenuItem, TextField, IconButton, Select, FormControl } from "@mui/material";
import React, { useState } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "@mui/material/Link";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onFilterChange: (filter: ProductFilter) => void;
}

export const ProductTable: React.FC<Props> = ({
  products,
  onEdit,
  onDelete,
  onFilterChange,
}) => {
  const [platform, setPlatform] = useState<"amazon" | "flipkart" | undefined>(undefined);
  const [search, setSearch] = useState("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "" | "amazon" | "flipkart";
    setPlatform(value === "" ? undefined : value);
    onFilterChange({
      platform: value === "" ? undefined : value,
      search,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onFilterChange({
      platform,
      search: value,
    });
  };

  const columns: Column<Product>[] = [
    { id: "sku", label: "SKU", filter: true },
    { id: "name", label: "Name", filter: true },
    { id: "description", label: "Category", filter: true },
    {
      id: "platform",
      label: "Platform",
      format: (value: unknown) => {
        const platform = value as string;
        return (
          <FormControl fullWidth size="small">
            <Select
              value={platform}
              onChange={(e) =>
                onFilterChange({
                  platform: e.target.value as "amazon" | "flipkart" | undefined,
                })
              }
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="amazon">Amazon</MenuItem>
              <MenuItem value="flipkart">Flipkart</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      id: "costPrice",
      label: "Cost Price",
      align: "right",
      format: (value) => <FormattedCurrency value={value as number} />,
    },
    {
      id: "sellingPrice",
      label: "Selling Price",
      align: "right",
      format: (value) => <FormattedCurrency value={value as number} />,
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      format: (_, row) => renderActions(row as Product),
    },
  ];

  const renderActions = (product: Product) => (
    <>
      <IconButton
        size="small"
        aria-label={`edit-${product.sku}`}
        onClick={() => onEdit(product)}
      >
        <EditIcon />
      </IconButton>
      {product.metadata?.flipkartSerialNumber && (
        <Link
          href={`https://www.flipkart.com/product/p/itme?pid=${product.metadata.flipkartSerialNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`view-flipkart-${product.metadata.flipkartSerialNumber}`}
        >
          <IconButton size="small">
            <RemoveRedEyeIcon />
          </IconButton>
        </Link>
      )}
      <IconButton
        size="small"
        color="error"
        data-testid={`delete-product-${product.sku}`}
        onClick={() => onDelete(product)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          select
          label="Platform"
          value={platform ?? ""}
          onChange={handlePlatformChange}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="amazon">Amazon</MenuItem>
          <MenuItem value="flipkart">Flipkart</MenuItem>
        </TextField>

        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
        />
      </Box>

      <DataTable
        columns={columns}
        data={products}
        defaultSortColumn="sku"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={25}
      />
    </Box>
  );
};
