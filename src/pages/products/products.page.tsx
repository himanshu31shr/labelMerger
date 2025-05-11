import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts, importProducts, updateProduct, setFilters } from "../../store/slices/productsSlice";
import { Product } from "../../services/product.service";
import { ProductEditModal } from "./components/ProductEditModal";
import { ProductImportSection } from "./components/ProductImportSection";
import { ProductTable } from "./components/ProductTable";

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, filteredItems: filteredProducts, loading } = useAppSelector(state => state.products);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleProductImport = async (file: File) => {
    try {
      await dispatch(importProducts(file)).unwrap();
    } catch (error) {
      console.error("Error importing products:", error);
    }
  };

  const handleProductUpdate = async (sku: string, data: Partial<Product>) => {
    try {
      await dispatch(updateProduct({ sku, data })).unwrap();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleFilterChange = (filters: { platform?: string; search?: string }) => {
    dispatch(setFilters(filters));
  };

  return (
    <Box sx={{ p: 3 }}>
      <ProductImportSection onImport={handleProductImport} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems={"center"} m={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={setEditingProduct}
          onFilterChange={handleFilterChange}
        />
      )}

      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleProductUpdate}
        />
      )}
    </Box>
  );
};

export default ProductsPage;
