import { Box, Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";

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
  const [platform, setPlatform] = useState<"amazon" | "flipkart" | "">("");
  const [search, setSearch] = useState("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "amazon" | "flipkart" | "";
    setPlatform(value);
    onFilterChange({
      platform: value || undefined,
      search: search || undefined,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onFilterChange({
      platform: platform || undefined,
      search: value || undefined,
    });
  };

  const columns: Column<Product>[] = [
    { id: "sku", label: "SKU", filter: true },
    { id: "description", label: "Description", filter: true },
    { id: "platform", label: "Platform", filter: true },
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
      format: (_, row) => (
        <Grid container spacing={0} justifyContent="center" alignItems={'center'}>
          <Grid item>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => row && onEdit(row)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <a
              href={`https://www.flipkart.com/product/p/itme?pid=${row?.metadata.flipkartSerialNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RemoveRedEyeIcon fontSize="small" color="primary" />
            </a>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          select
          label="Platform"
          value={platform}
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
