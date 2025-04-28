import Papa from "papaparse";
import { ProductPrice, Transaction } from "../../../types/transaction.type";
import { AmazonCsvData } from "../../../types/types";
import { AbstractFactory, ReportData } from "./ReportExtractionFactory";

interface AmazonRawData {
  data: AmazonCsvData[];
  error: Map<string, string>;
  meta: Map<string, string | object | Array<string>>;
}

export class AmazonFactory implements AbstractFactory {
  public file: File;

  public transactions: Transaction[] = [];

  public prices: ProductPrice[] = [];

  private ordersData: AmazonRawData | undefined;

  constructor(file: File) {
    this.file = file;
    this.rowToTransaction = this.rowToTransaction.bind(this);
    this.transformTransactions = this.transformTransactions.bind(this);
    this.parseCsvData = this.parseCsvData.bind(this);
    this.reponseAdapter = this.reponseAdapter.bind(this);
    this.process = this.process.bind(this);
  }

  reponseAdapter(): ReportData {
    return {
      transactions: this.transactions,
      prices: this.prices,
    };
  }

  private async parseCsvData() {
    this.ordersData = (await new Promise<Papa.ParseResult<unknown>>(
      (resolve, reject) => {
        Papa.parse(this.file, {
          complete: resolve,
          header: true,
          skipEmptyLines: true,
          beforeFirstChunk: function (chunk) {
            const linesToSkip = 11; // Change this number to skip a different amount of lines
            let eof = chunk.indexOf("\n");
            for (let i = 1; i < linesToSkip && eof > 0; ++i) {
              eof = chunk.indexOf("\n", eof + 1);
            }
            return chunk.substring(eof + 1);
          },
          error: reject,
        });
      }
    )) as unknown as AmazonRawData;
  }

  private transformTransactions() {
    if (!this.ordersData) {
      throw new Error("No data to transform");
    }

    this.transactions = this.ordersData.data
      .filter((row) => row && typeof row === "object")
      .map(this.rowToTransaction);
  }

  private rowToTransaction(row: AmazonCsvData): Transaction {
    const sku = row["Sku"] || row["sku"] || "";
    const existingPrice = this.prices.find((price) => price.sku === sku);
    if (!existingPrice && sku) {
      this.prices.push({
        sku: sku,
        basePrice: 0,
        costPrice: 0,
        description: row["description"],
        name: row["description"],
      });
    }

    return {
      transactionId: row["order id"],
      platform: "amazon",
      orderDate: row["date/time"],
      sku: sku,
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
        shippingFee: 0,
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
