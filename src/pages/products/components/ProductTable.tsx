import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Chip, IconButton, MenuItem, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import React, { useState } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import {
  ViewAmazonListingButton,
  ViewFlipkartListingButton,
} from "../../../shared/ActionButtons";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onFilterChange: (filter: ProductFilter) => void;
}

export const ProductTable: React.FC<Props> = ({
  products,
  onEdit,
  onFilterChange,
}) => {
  const [platform, setPlatform] = useState<"amazon" | "flipkart" | undefined>(
    undefined
  );
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
          <Chip
            label={platform.toUpperCase()}
            color={value === "amazon" ? "default" : "primary"}
          />
        );
      },
      filter: true,
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
        <ViewFlipkartListingButton
          flipkartSerialNumber={product.metadata.flipkartSerialNumber}
        />
      )}

      {product.metadata?.amazonSerialNumber && (
        <ViewAmazonListingButton
          amazonSerialNumber={product.metadata.amazonSerialNumber}
        />
      )}
    </>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{
        mb: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2
      }}>
        <TextField
          select
          label="Platform"
          value={platform ?? ""}
          onChange={handlePlatformChange}
          sx={{
            minWidth: { xs: "100%", sm: 200 },
            flexGrow: { xs: 1, sm: 0 }
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="amazon">Amazon</MenuItem>
          <MenuItem value="flipkart">Flipkart</MenuItem>
        </TextField>

        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{
            minWidth: { xs: "100%", sm: 200 },
            flexGrow: 1
          }}
        />
      </Box>

      <DataTable
        columns={columns}
        data={products}
        defaultSortColumn="sku"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />
    </Box>
  );
};
