import { Timestamp, orderBy, where } from "firebase/firestore";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { DEFAULT_PRODUCT_PRICES } from "../constants/defaultPrices";
import { FirebaseService } from "./firebase.service";

export interface Product {
  sku: string;
  name: string;
  description: string;
  costPrice: number;
  platform: "amazon" | "flipkart";
  visibility: "visible" | "hidden";
  sellingPrice: number;
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    lastUpdated?: Timestamp;
  };
  metadata: {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    lastImportedFrom?: string;
    listingStatus?: string;
    moq?: string;
    flipkartSerialNumber?: string;
    amazonSerialNumber?: string;
    existsOnSellerPage?: boolean;
  };
  competitionAnalysis?: {
    competitorName: string;
    competitorPrice: string;
    ourPrice: number;
    visibility: string;
    existsOnSellerPage: boolean;
    totalSellers: number;
  };
  existsOnSellerPage?: boolean;
}

export interface ProductFilter {
  platform?: "amazon" | "flipkart";
  search?: string;
  visibility?: "visible" | "hidden";
}

interface RawFlipkartData {
  "Seller SKU Id": string;
  "Product Title": string;
  "Product Name": string;
  "Listing Status": string;
  "Your Selling Price": string;
  "Minimum Order Quantity": string;
  "Flipkart Serial Number": string;
}

interface RawAmazonData {
  "item-name": string;
  "item-description": string;
  "listing-id": string;
  "seller-sku": string;
  price: string;
  quantity: string;
  "open-date": string;
  "image-url": string;
  "item-is-marketplace": string;
  "product-id-type": string;
  "zshop-shipping-fee": string;
  "item-note": string;
  "item-condition": string;
  "zshop-category1": string;
  "zshop-browse-path": string;
  "zshop-storefront-feature": string;
  asin1: string;
  asin2: string;
  asin3: string;
  "will-ship-internationally": string;
  "expedited-shipping": string;
  "zshop-boldface": string;
  "product-id": string;
  "bid-for-featured-placement": string;
  "add-delete": string;
  "pending-quantity": string;
  "fulfillment-channel": string;
  "Business Price": string;
  "Quantity Price Type": string;
  "maximum-retail-price": string;
}

export class ProductService extends FirebaseService {
  private readonly COLLECTION_NAME = "products";

  async parseProducts(file: File): Promise<Product[]> {
    if (this.isAmazonFormat(file)) {
      return this.parseAmazonProducts(file);
    }

    if (this.isFlipkartFormat(file)) {
      return this.processFlipkartProducts(file);
    }

    throw new Error("Unsupported file format");
  }

  private async parseAmazonProducts(file: File): Promise<Product[]> {
    const amazonProducts = await new Promise<RawAmazonData[]>(
      (resolve, reject) => {
        if (!file) {
          reject(new Error("File is not set"));
        }

        Papa.parse(file, {
          header: true,
          complete: async (results) => {
            const data = results.data as RawAmazonData[];
            if (!Array.isArray(data) || data.length === 0) {
              throw new Error("File is empty");
            }
            return resolve(data.filter((row) => row["seller-sku"]));
          },
          error: (error) => {
            reject(error);
          },
        });
      }
    );

    return this.amazonAdapter(amazonProducts);
  }

  private async processFlipkartProducts(file: File): Promise<Product[]> {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    rawData.shift();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("File is empty");
    }

    return this.flipkartAdapter(rawData as unknown as RawFlipkartData[]);
  }

  private isAmazonFormat(file: File): boolean {
    return file.type === "text/plain";
  }

  private isFlipkartFormat(file: File): boolean {
    return (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    );
  }

  private amazonAdapter(data: RawAmazonData[]): Product[] {
    const prices = new Map(
      DEFAULT_PRODUCT_PRICES.map((price) => [price.sku, price])
    );

    return data.map((row) => ({
      sku: row["seller-sku"],
      name: row["item-name"],
      description:
        prices.get(row["seller-sku"])?.description ?? row["item-description"],
      costPrice: prices.get(row["seller-sku"])?.costPrice ?? 0, // To be updated by user
      platform: "amazon" as const,
      sellingPrice: Number(row["price"]) || 0,
      inventory: {
        quantity: Number(row["quantity"]) || 0,
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now(),
      },
      metadata: {
        listingStatus: "active",
        moq: "1",
        amazonSerialNumber: row["asin1"],
      },
      visibility: "visible",
    }));
  }

  private flipkartAdapter(data: Array<RawFlipkartData>): Product[] {
    const prices = new Map(
      DEFAULT_PRODUCT_PRICES.map((price) => [price.sku, price])
    );

    return data.map((row) => ({
      sku: row["Seller SKU Id"],
      name: row["Product Title"],
      description:
        prices.get(row["Seller SKU Id"])?.description ??
        row["Product Name"] ??
        "",
      sellingPrice: Number(row["Your Selling Price"]) || 0,
      costPrice: prices.get(row["Seller SKU Id"])?.costPrice ?? 0,
      platform: "flipkart" as const,
      inventory: {
        quantity: 0, // Default to 0 as Flipkart data may not have quantity
        lowStockThreshold: 5,
        lastUpdated: Timestamp.now(),
      },
      metadata: {
        listingStatus: row["Listing Status"],
        moq: row["Minimum Order Quantity"] || "1",
        flipkartSerialNumber: row["Flipkart Serial Number"],
      },
      visibility: "visible",
    }));
  }

  async saveProducts(products: Product[]): Promise<void> {
    const allSkus = await this.getDocuments<Product>(this.COLLECTION_NAME);
    const newProducts = products.filter(
      (product) =>
        allSkus.filter(
          (sku) => sku.sku === product.sku && sku.platform === product.platform
        ).length === 0
    );

    return this.batchOperation(
      newProducts,
      this.COLLECTION_NAME,
      "create",
      (product) => product.sku
    );
  }

  async updateProduct(sku: string, data: Partial<Product>): Promise<void> {
    const updateData = {
      ...data,
      metadata: {
        updatedAt: Timestamp.now(),
      },
    };
    return this.updateDocument(this.COLLECTION_NAME, sku, updateData);
  }

  async getProducts(filters?: ProductFilter): Promise<Product[]> {
    const constraints = [];

    if (filters?.platform) {
      constraints.push(where("platform", "==", filters.platform));
    }

    if (filters?.search) {
      constraints.push(where("name", ">=", filters.search));
      constraints.push(where("name", "<=", filters.search + "\uf8ff"));
    }

    if (filters?.visibility) {
      constraints.push(where("visibility", "==", filters.visibility));
    }

    constraints.push(orderBy("sku", "desc"));

    return this.getDocuments<Product>(this.COLLECTION_NAME, constraints);
  }

  async mapTransactionToProduct(sku: string): Promise<Product | null> {
    const products = await this.getDocuments<Product>(this.COLLECTION_NAME, [
      where("sku", "==", sku),
    ]);
    return products[0] || null;
  }

  async deleteProduct(sku: string): Promise<void> {
    return this.deleteDocument(this.COLLECTION_NAME, sku);
  }

  async getProductDetails(sku: string): Promise<Product> {
    const product = await this.getDocument<Product>(this.COLLECTION_NAME, sku);

    if (!product) {
      throw new Error(`Product with SKU ${sku} not found`);
    }

    return product as Product;
  }

  /**
   * Update inventory quantity for a product
   * @param sku Product SKU
   * @param quantityChange Amount to change (positive to add, negative to subtract)
   * @returns Updated product
   */
  async updateInventory(sku: string, quantityChange: number): Promise<Product> {
    try {
      // First get the current product to ensure it exists
      const product = await this.getProductDetails(sku);

      // Initialize inventory if it doesn't exist
      if (!product.inventory) {
        // Create a new inventory object for products that don't have one
        await this.updateDocument(this.COLLECTION_NAME, sku, {
          inventory: {
            quantity: quantityChange, // Allow any value including negative
            lowStockThreshold: 5,
            lastUpdated: Timestamp.now(),
          },
        });
      } else {
        // Calculate the new quantity for existing inventory - allow negative values
        const newQuantity = product.inventory.quantity + quantityChange;

        // Update the product with the new inventory quantity
        await this.updateDocument(this.COLLECTION_NAME, sku, {
          inventory: {
            ...product.inventory,
            quantity: newQuantity,
            lastUpdated: Timestamp.now(),
          },
        });
      }

      // Return the updated product
      return this.getProductDetails(sku);
    } catch (error: any) {
      console.error(`Error updating inventory for SKU ${sku}:`, error);
      throw new Error(
        `Failed to update inventory: ${error.message || "Unknown error"}`
      );
    }
  }

  /**
   * Reduce inventory when an order is placed
   * @param sku Product SKU
   * @param quantity Quantity ordered
   * @returns Updated product
   */
  async reduceInventoryForOrder(
    sku: string,
    quantity: number
  ): Promise<Product> {
    return this.updateInventory(sku, -Math.abs(quantity));
  }

  /**
   * Check if a product has sufficient inventory for an order
   * @param sku Product SKU
   * @param quantity Quantity to check
   * @returns Boolean indicating if there's enough inventory
   */
  async hasSufficientInventory(
    sku: string,
    quantity: number
  ): Promise<boolean> {
    try {
      const product = await this.getProductDetails(sku);
      // If product has no inventory field, consider it as having 0 quantity
      if (!product.inventory) return quantity <= 0;
      return product.inventory.quantity >= quantity;
    } catch (error: any) {
      console.error(`Error checking inventory for SKU ${sku}:`, error);
      return false;
    }
  }

  /**
   * Get products with low inventory (below threshold)
   * @returns Array of products with low inventory
   */
  async getLowInventoryProducts(): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      return products.filter(
        (product) =>
          // Only include products that have inventory data
          product.inventory &&
          product.inventory.quantity <= product.inventory.lowStockThreshold
      );
    } catch (error: any) {
      console.error("Error getting low inventory products:", error);
      return [];
    }
  }
}
