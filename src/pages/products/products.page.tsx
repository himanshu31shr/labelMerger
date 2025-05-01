import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Product,
  ProductFilter,
  ProductService,
} from "../../services/product.service";
import { ProductEditModal } from "./components/ProductEditModal";
import { ProductImportSection } from "./components/ProductImportSection";
import { ProductTable } from "./components/ProductTable";

const processFilters = (products: Product[], filters: ProductFilter) => {
  return products.filter(
    (product) =>
      (filters.platform ? product.platform === filters.platform : true) &&
      (filters.search
        ? product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.sku.toLowerCase().includes(filters.search.toLowerCase())
        : true)
  );
};

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<ProductFilter>({});
  const productService = new ProductService();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (filters.platform || filters.search) {
      const filtered = processFilters(products, filters);
      if (filtered.length === 0) {
        loadProducts();
      }
      setFilteredProducts(filtered);
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
      const importedProducts = await productService.parseProducts(file);
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

export default ProductsPage;
