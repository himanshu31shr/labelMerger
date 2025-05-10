import * as XLSX from "xlsx";
import { Transaction } from "../../../types/transaction.type";
import { FlipkartOrderData } from "../../../types/types";
import { AbstractFactory } from "./ReportExtractionFactory";

export default class FlipkartFactory implements AbstractFactory {
  public file: File;
  private workbook: XLSX.WorkBook | undefined;
  private ordersData: FlipkartOrderData[] = [];
  public transactions: Transaction[] = [];

  constructor(file: File) {
    this.file = file;
    this.rowToTransaction = this.rowToTransaction.bind(this);
    this.transformOrdersData = this.transformOrdersData.bind(this);
    this.parseOrdersSheet = this.parseOrdersSheet.bind(this);
    this.readWorkbook = this.readWorkbook.bind(this);
    this.reponseAdapter = this.reponseAdapter.bind(this);
    this.process = this.process.bind(this);
  }

  private parseCurrencyValue(value: string | undefined): number {
    if (!value) return 0;
    if (typeof value === "number") return value;
    return Number(value.replace(/[^\d.-]/g, "")) || 0;
  }

  private async readWorkbook(): Promise<void> {
    try {
      const buffer = await this.file.arrayBuffer();
      this.workbook = XLSX.read(buffer, { type: "array" });

      // Validate required sheets exist
      const requiredSheet = "Orders P&L";
      if (!this.workbook.SheetNames.includes(requiredSheet)) {
        throw new Error("Required sheet 'Orders P&L' not found");
      }

      const sheet = this.workbook.Sheets[requiredSheet];
      if (!sheet || XLSX.utils.sheet_to_json(sheet).length === 0) {
        throw new Error("No data found in Orders P&L sheet");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to read workbook");
    }
  }

  private parseOrdersSheet(): void {
    const ordersSheet = this.workbook?.Sheets["Orders P&L"];
    if (!ordersSheet) {
      throw new Error("Required sheet 'Orders P&L' not found");
    }

    this.ordersData = XLSX.utils.sheet_to_json<FlipkartOrderData>(ordersSheet);
    if (!this.ordersData || this.ordersData.length === 0) {
      throw new Error("No data found in Orders P&L sheet");
    }
  }

  private transformOrdersData() {
    if (!this.ordersData) {
      throw new Error("No orders data to transform");
    }

    this.transactions = this.ordersData
      .map(this.rowToTransaction)
      .filter((txn): txn is Transaction => !!txn);
  }

  private rowToTransaction(order: FlipkartOrderData): Transaction | null {
    if (!order["Order ID"]) return null;

    return {
      transactionId: order["Order ID"],
      sku: order["SKU Name"],
      description: order["SKU Name"],
      platform: "flipkart",
      marketplace: "Flipkart",
      type: "delivered",
      orderDate: order["Order Date"],
      quantity: order["Gross Units"],
      sellingPrice: this.parseCurrencyValue(
        order["Final Selling Price (incl. seller opted in default offers)"]
      ),
      orderStatus: order["Order Status"],
      total: this.parseCurrencyValue(order["Net Earnings (INR)"]),
      productSales: this.parseCurrencyValue(order["Accounted Net Sales (INR)"]),
      accNetSales: this.parseCurrencyValue(
        order["Bank Settlement [Projected] (INR)"]
      ),
      expenses: {
        shippingFee: this.parseCurrencyValue(order["Shipping Fee (INR)"]),
        marketplaceFee: this.parseCurrencyValue(order["Commission (INR)"]),
        otherFees: this.parseCurrencyValue(order["Total Expenses (INR)"]),
      },
      product: {
        name: order["SKU Name"] || "",
        sku: order["SKU Name"],
        description: order["SKU Name"] || "",
        platform: "flipkart",
        costPrice: 0,
        metadata: {},
        visibility: "visible",
        sellingPrice: 0,
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

  reponseAdapter(): Transaction[] {
    return this.transactions;
  }

  async process(): Promise<Transaction[]> {
    await this.readWorkbook();
    this.parseOrdersSheet();
    this.transformOrdersData();
    return this.reponseAdapter();
  }
}
