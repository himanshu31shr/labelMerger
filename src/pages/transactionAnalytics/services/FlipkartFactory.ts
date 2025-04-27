import { ProductPrice, Transaction } from "../../../types/transaction.type";
import * as XLSX from "xlsx";
import { FlipkartOrderData, FlipkartSkuData } from "../../../types/types";
import { AbstractFactory, ReportData } from "./ReportExtractionFactory";

export default class FlipkartFactory implements AbstractFactory {
  public file: File;

  private workbook: XLSX.WorkBook | undefined;

  private skuData: FlipkartSkuData[] = [];

  private ordersData: FlipkartOrderData[] = [];

  public transactions: Transaction[] = [];

  public prices: ProductPrice[] = [];

  constructor(file: File) {
    this.file = file;
  }

  private parseOrdersSheet() {
    const ordersSheet = this.workbook?.Sheets["Orders P&L"];

    if (!ordersSheet) {
      throw new Error("Required sheet 'Orders P&L' not found");
    }

    this.ordersData = XLSX.utils.sheet_to_json<FlipkartOrderData>(ordersSheet);
  }

  private parseSkuSheet() {
    const skuSheet = this.workbook?.Sheets["SKU-level P&L"];

    if (skuSheet) {
      this.skuData = XLSX.utils.sheet_to_json<FlipkartSkuData>(skuSheet);
    }
  }

  private readWorkbook(data: unknown) {
    this.workbook = XLSX.read(data, { type: "binary" });
  }

  private transformOrdersData() {
    this.transactions = this.ordersData
      .map(this.rowToTransaction)
      .filter((txn) => !!txn.type);
  }

  private rowToTransaction(order: FlipkartOrderData) {
    return {
      transactionId: order["Order ID"],
      platform: "flipkart" as const,
      orderDate: order["Order Date"],
      sku: order["SKU Name"],
      quantity: Number(order["Gross Units"]),
      sellingPrice: Number(
        order["Final Selling Price (incl. seller opted in default offers)"]
      ),
      description: order["SKU Name"],
      type: order["Order Status"],
      marketplace: "Flipkart",
      orderStatus: order["Order Status"],
      total: Number(order["Net Earnings (INR)"]),
      productSales: Number(order["Accounted Net Sales (INR)"]),
      accNetSales: Number(order["Bank Settlement [Projected] (INR)"]),
      expenses: {
        shippingFee: 0,
        marketplaceFee: 0,
        otherFees: Number(order["Total Expenses (INR)"] || "0"),
      },
      product: {
        name: order["SKU Name"] || order["SKU"],
        costPrice: 0,
        basePrice: 0,
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      hash:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };
  }

  private transformPriceData() {
    this.prices = this.skuData
      .filter((row) => row["SKU ID"])
      .map(this.rowToPrice);
  }

  private rowToPrice(row: FlipkartSkuData) {
    return {
      sku: row["SKU ID"],
      name: row["Product Name"] || row["SKU ID"],
      description: row["Product Name"] || "",
      basePrice:
        parseFloat(String(row["Base Price"]).replace(/[₹,]/g, "")) || 0,
      costPrice:
        parseFloat(String(row["Cost Price"]).replace(/[₹,]/g, "")) || 0,
      updatedAt: new Date().toISOString(),
    };
  }

  reponseAdapter(): ReportData {
    return {
      transactions: this.transactions,
      prices: this.prices,
    };
  }

  process(): Promise<ReportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          this.readWorkbook(e.target?.result);

          this.parseSkuSheet();

          this.parseOrdersSheet();

          this.transformOrdersData();

          this.transformPriceData();

          return resolve(this.reponseAdapter());
        } catch (error) {
          return reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsBinaryString(this.file);
    });
  }
}
