import { ArrowUpwardOutlined } from "@mui/icons-material";
import { Box, Chip, CircularProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product } from "../../../services/product.service";
import {
  ShowProductEditPageButton,
  ViewAmazonListingButton,
  ViewFlipkartListingButton,
} from "../../../shared/ActionButtons";

export const HiddenProducts: React.FC = () => {
  const { items: products, loading } = useAppSelector(state => state.products);

  const hiddenProducts = products
    .filter(
      (product: Product) =>
        product?.competetionAnalysis &&
        Number(product?.competetionAnalysis?.competitorPrice) > 0
    )
    .filter(
      (product: Product) =>
        product?.competetionAnalysis &&
        !!product?.competetionAnalysis?.competitorPrice &&
        product.sellingPrice -
        Number(product?.competetionAnalysis?.competitorPrice) >
        0
    );

  const columns: Column<Product>[] = [
    { id: "sku", label: "SKU", filter: true },
    { id: "name", label: "Name", filter: true },
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
    },
    {
      id: "visibility",
      label: "Visibility",
      format: (value: unknown, row: Product | undefined) => {
        const visibility = value as string;

        if (visibility === "visible") {
          return <Chip label={visibility?.toUpperCase()} color="success" />;
        }

        if (row?.platform === "amazon") {
          return <Chip label="VISIBLE" color="success" />;
        }

        return <Chip label={visibility?.toUpperCase()} color="error" />;
      },
    },
    {
      id: "sellingPrice",
      label: "Selling Price",
      align: "center",
      format: (value, row?: Product) => <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={1}>
        <FormattedCurrency value={value as number} />
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "red", 'fontSize': 12 }}>
          <FormattedCurrency value={((row?.sellingPrice ?? 0) - Number(row?.competetionAnalysis?.competitorPrice))} />
          <ArrowUpwardOutlined style={{ fontSize: 12 }} />
        </div>
      </Box>,
    },
    {
      id: "competitorPrice",
      label: "Competitor Price",
      align: "right",
      format: (value, row?: Product) =>
        row?.competetionAnalysis?.competitorPrice ? (
          <FormattedCurrency
            value={Number(row.competetionAnalysis.competitorPrice)}
          />
        ) : null,
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

      <ShowProductEditPageButton sku={product.sku} />
    </>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <DataTable
        columns={columns}
        data={hiddenProducts}
        defaultSortColumn="sku"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />
    </Box>
  );
};
