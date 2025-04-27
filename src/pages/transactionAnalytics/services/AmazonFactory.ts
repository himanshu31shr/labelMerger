import Papa from "papaparse";
import { AbstractFactory, ReportData } from "./ReportExtractionFactory";
import { AmazonCsvData } from "../../../types/types";
import { ProductPrice, Transaction } from "../../../types/transaction.type";

export class AmazonFactory implements AbstractFactory {
  public file: File;

  public transactions: Transaction[] = [];

  public prices: ProductPrice[] = [];

  private ordersData: { result: AmazonCsvData[] } | undefined;

  constructor(file: File) {
    this.file = file;
  }

  reponseAdapter(): ReportData {
    return {
      transactions: this.transactions,
      prices: this.prices,
    };
  }

  private async parseCsvData() {
    this.ordersData = (await new Promise<Papa.ParseResult<unknown>>(
      (resolve) => {
        Papa.parse(this.file, {
          complete: resolve,
          header: true,
          skipEmptyLines: true,
        });
      }
    )) as unknown as { result: AmazonCsvData[] };
  }

  private transformTransactions() {
    if (!this.ordersData) {
      throw new Error("No data to transform");
    }
    this.transactions = this.ordersData.result
      .filter((row) => row && typeof row === "object")
      .filter((row) => !row.type?.toLowerCase().includes("definition"))
      .map(this.rowToTransaction);
  }

  private rowToTransaction(row: AmazonCsvData): Transaction {
    return {
      transactionId: row["order id"],
      platform: "amazon",
      orderDate: row["date/time"],
      sku: row["Sku"] || row["sku"] || "",
      quantity: Number(row["quantity"]),
      sellingPrice: Number(row["product sales"].replace(/[₹,]/g, "")),
      description: row["description"],
      type: row["type"],
      marketplace: "Amazon",
      total: Number(row["total"].replace(/[₹,]/g, "")),
      productSales: row["product sales"],
      sellingFees: row["selling fees"],
      fbaFees: row["fba fees"],
      otherTransactionFees: row["other transaction fees"],
      other: row["other"],
      expenses: {
        shippingFee: Number(row["shipping credits"].replace(/[₹,]/g, "") || 0),
        marketplaceFee: Number(row["selling fees"].replace(/[₹,]/g, "") || 0),
        otherFees: Number(
          row["other transaction fees"].replace(/[₹,]/g, "") || 0
        ),
      },
      product: {
        name: row["description"],
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

  async process(): Promise<ReportData> {
    await this.parseCsvData();

    this.transformTransactions();

    return this.reponseAdapter();
  }
}
