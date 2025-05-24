import EditIcon from "@mui/icons-material/Edit";
import { Box, Chip, IconButton, MenuItem, TextField, Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import { Category, CategoryService } from "../../../services/category.service";
import {
  ViewAmazonListingButton,
  ViewFlipkartListingButton,
} from "../../../shared/ActionButtons";
import CategoryIcon from '@mui/icons-material/Category';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onFilterChange: (filter: ProductFilter) => void;
  onBulkCategoryUpdate?: (skus: string[], categoryId: string) => void;
}

export const ProductTable: React.FC<Props> = ({
  products,
  onEdit,
  onFilterChange,
  onBulkCategoryUpdate,
}) => {
  const [platform, setPlatform] = useState<"amazon" | "flipkart" | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryService = new CategoryService();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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

  const handleSelectProduct = (sku: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(sku)) {
        return prev.filter(p => p !== sku);
      }
      return [...prev, sku];
    });
  };

  const handleBulkCategoryUpdate = () => {
    if (selectedProducts.length > 0 && selectedCategory && onBulkCategoryUpdate) {
      onBulkCategoryUpdate(selectedProducts, selectedCategory);
      setCategoryDialogOpen(false);
      setSelectedProducts([]);
    }
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "-";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "-";
  };

  const columns: Column<Product>[] = [
    {
      id: "select",
      label: "",
      format: (_, row?: Product) => row ? (
        <Checkbox
          checked={selectedProducts.includes(row.sku)}
          onChange={() => handleSelectProduct(row.sku)}
        />
      ) : null,
    },
    { id: "sku", label: "SKU", filter: true },
    { id: "name", label: "Name", filter: true },
    { 
      id: "categoryId", 
      label: "Category", 
      filter: true,
      format: (value) => <Chip label={getCategoryName(value as string)} size="small" />
    },
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

        {selectedProducts.length > 0 && (
          <Button
            variant="contained"
            startIcon={<CategoryIcon />}
            onClick={() => setCategoryDialogOpen(true)}
            sx={{
              minWidth: { xs: "100%", sm: 200 },
              flexGrow: { xs: 1, sm: 0 }
            }}
          >
            Assign Category ({selectedProducts.length})
          </Button>
        )}
      </Box>

      <DataTable
        columns={columns}
        data={products}
        defaultSortColumn="sku"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />

      {/* Category Selection Dialog */}
      <Dialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)}>
        <DialogTitle>Assign Category</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ mt: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleBulkCategoryUpdate}
            variant="contained"
            disabled={!selectedCategory}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
