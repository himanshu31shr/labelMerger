import { Box, Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onFilterChange: (filters: ProductFilter) => void;
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
    { id: "platform", label: "Platform", filter: true },
    { id: "name", label: "Name", filter: true },
    { id: "metadata.listingStatus", label: "Status", filter: true },
    { id: "description", label: "Description", filter: true },
    {
      id: "costPrice",
      label: "Cost Price",
      align: "right",
      format: (value) => <FormattedCurrency value={value as number} />,
    },
    {
      id: "link",
      label: "Product Link",
      align: "center",
      format: (value, row?: Product) => {
        if (row?.platform === "amazon") {
          return (
            <a
              href={`https://www.amazon.in/dp/${row.sku}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          );
        }
        if (row?.platform === "flipkart") {
          return (
            <Grid container>
              <Grid item xs={6} md={6} lg={6}>
                <a
                  href={`https://www.flipkart.com/product/p/itme?pid=${row.metadata.flipkartSerialNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RemoveRedEyeIcon fontSize="small" color="primary" />
                </a>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <a href="#" onClick={() => onEdit(row)}>
                  <EditIcon fontSize="small" color="primary" />
                </a>
              </Grid>
            </Grid>
          );
        }

        return null;
      },
    },
  ];

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
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
      />
    </Box>
  );
};
