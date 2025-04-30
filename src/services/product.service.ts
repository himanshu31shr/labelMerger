import { Timestamp, orderBy, where } from "firebase/firestore";
import * as XLSX from "xlsx";
import { DEFAULT_PRODUCT_PRICES } from "../constants/defaultPrices";
import { AmazonCsvData } from "../types/types";
import { FirebaseService } from "./firebase.service";

export interface Product {
  sku: string;
  name: string;
  description: string;
  costPrice: number;
  platform: "amazon" | "flipkart";
  metadata: {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    lastImportedFrom?: string;
    listingStatus?: string;
    moq?: string;
    flipkartSerialNumber?: string;
  };
}

export interface ProductFilter {
  platform?: "amazon" | "flipkart";
  search?: string;
}

interface ParsedData {
  [key: string]: unknown;
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

export class ProductService extends FirebaseService {
  private readonly COLLECTION_NAME = "products";

  async parseXLSXFile(file: File): Promise<Product[]> {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("File is empty");
    }

    const firstRow = rawData[0] as ParsedData;

    if (this.isAmazonFormat(firstRow)) {
      return this.parseAmazonProducts(rawData as unknown as AmazonCsvData[]);
    } else if (this.isFlipkartFormat(firstRow)) {
      return this.parseFlipkartProducts(
        rawData as unknown as RawFlipkartData[]
      );
    }
    throw new Error("Unsupported file format");
  }

  private isAmazonFormat(data: ParsedData): boolean {
    return "sku" in data || "Sku" in data;
  }

  private isFlipkartFormat(data: ParsedData): boolean {
    return "Seller SKU Id" in data;
  }

  private parseAmazonProducts(data: AmazonCsvData[]): Product[] {
    return data.map((row) => ({
      sku: (row.Sku || row.sku) as string,
      name: row.description,
      description: row.description,
      costPrice: 0, // To be updated by user
      platform: "amazon" as const,
      metadata: {
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastImportedFrom: "amazon_import",
      },
    }));
  }

  private parseFlipkartProducts(data: Array<RawFlipkartData>): Product[] {
    const prices = new Map(
      DEFAULT_PRODUCT_PRICES.map((price) => [price.sku, price])
    );

    return data.map((row) => ({
      sku: row["Seller SKU Id"],
      name: row["Product Title"],
      description:
        prices.get(row["Seller SKU Id"])?.description ?? row["Product Name"],
      sellingPrice: Number(row["Your Selling Price"]) || 0,
      costPrice: prices.get(row["Seller SKU Id"])?.costPrice ?? 0,
      platform: "flipkart" as const,
      metadata: {
        listingStatus: row["Listing Status"],
        moq: row["Minimum Order Quantity"] || "1",
        flipkartSerialNumber: row["Flipkart Serial Number"],
      },
    }));
  }

  async saveProducts(products: Product[]): Promise<void> {
    return this.batchOperation(
      products,
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
}
