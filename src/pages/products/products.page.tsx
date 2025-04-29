import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  Product,
  ProductFilter,
  ProductService,
} from "../../services/product.service";
import { ProductTable } from "./components/ProductTable";
import { ProductEditModal } from "./components/ProductEditModal";
import { ProductImportSection } from "./components/ProductImportSection";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<ProductFilter>({});
  const productService = new ProductService();

  useEffect(() => {
    loadProducts();
  }, []); // Run only on mount

  useEffect(() => {
    if (filters.platform || filters.search) {
      setFilteredProducts(
        products.filter(
          (product) =>
            (filters.platform ? product.platform === filters.platform : true) &&
            (filters.search
              ? product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.sku.toLowerCase().includes(filters.search.toLowerCase())
              : true)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filters, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(filters);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductImport = async (file: File) => {
    try {
      setLoading(true);
      const importedProducts = await productService.parseXLSXFile(file);
      await productService.saveProducts(importedProducts);
      await loadProducts();
    } catch (error) {
      console.error("Error importing products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdate = async (sku: string, data: Partial<Product>) => {
    try {
      setLoading(true);
      await productService.updateProduct(sku, data);
      await loadProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <ProductImportSection onImport={handleProductImport} />

      {loading ? (
        <Box display="flex" justifyContent="center" m={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={setEditingProduct}
          onFilterChange={setFilters}
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
