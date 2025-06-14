import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Chip,
  IconButton,
  Checkbox,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { Column, DataTable } from "../../../components/DataTable/DataTable";
import { FormattedCurrency } from "../../../components/FormattedCurrency";
import { Product, ProductFilter } from "../../../services/product.service";
import {
  ViewAmazonListingButton,
  ViewFlipkartListingButton,
} from "../../../shared/ActionButtons";
import { ProductTableToolbar } from "../../products/components/ProductTableToolbar";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchCategories, selectCategories } from '../../../store/slices/productsSlice';
import { CostPriceResolutionService } from '../../../services/costPrice.service';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onFilterChange: (filter: ProductFilter) => void;
  onBulkCategoryUpdate?: (skus: string[], categoryId: string) => void;
}

export const UncategorizedProductTable: React.FC<Props> = ({
  products,
  onEdit,
  onFilterChange,
  onBulkCategoryUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentFilters, setCurrentFilters] = useState<ProductFilter>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [productCostPrices, setProductCostPrices] = useState<Record<string, { value: number; source: string }>>({});

  const costPriceService = useMemo(() => new CostPriceResolutionService(), []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch cost prices for all products
  useEffect(() => {
    const fetchCostPrices = async () => {
      const costPrices: Record<string, { value: number; source: string }> = {};
      
      for (const product of products) {
        const resolution = await costPriceService.getProductCostPrice(product.sku);
        costPrices[product.sku] = {
          value: resolution.value,
          source: resolution.source
        };
      }
      
      setProductCostPrices(costPrices);
    };

    fetchCostPrices();
  }, [products, costPriceService]);

  const categories = useAppSelector(selectCategories);

  const handleFilterChange = (filters: ProductFilter) => {
    setCurrentFilters(filters);
    onFilterChange(filters);
  };

  const handleSelectProduct = (sku: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(sku)) {
        return prev.filter(p => p !== sku);
      }
      return [...prev, sku];
    });
  };

  const handleBulkCategoryUpdate = async (skus: string[], categoryId: string) => {
    if (onBulkCategoryUpdate) {
      try {
        await onBulkCategoryUpdate(skus, categoryId);
        
        // Clear selected products after successful assignment
        setSelectedProducts([]);
        
        // Show success notification
        const categoryName = getCategoryName(categoryId);
        setSnackbarMessage(`Successfully assigned ${skus.length} product(s) to category "${categoryName}"`);
        setSnackbarOpen(true);
      } catch {
        // Show error notification
        setSnackbarMessage('Failed to assign category to products');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "-";
    if (!Array.isArray(categories)) {
        return "-";
    }
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
      format: () => <Chip label="No Category" color="warning" size="small" />,
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
      format: (_, row?: Product) => {
        if (!row?.sku || !productCostPrices[row.sku]) return null;
        
        const { value, source } = productCostPrices[row.sku];
        return (
          <Tooltip title={`Inherited from ${source}`}>
            <Box>
              <FormattedCurrency value={value} />
            </Box>
          </Tooltip>
        );
      },
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
      <ProductTableToolbar
        platform={currentFilters.platform}
        search={currentFilters.search}
        selectedProducts={selectedProducts}
        categories={categories}
        allProducts={products}
        onFilterChange={handleFilterChange}
        onBulkCategoryUpdate={handleBulkCategoryUpdate}
      />

      <DataTable
        columns={columns}
        data={products}
        defaultSortColumn="sku"
        defaultSortDirection="asc"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};