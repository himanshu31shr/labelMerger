import { ProductPrice, Transaction } from "../../../types/transaction.type";
import { AmazonFactory } from "./AmazonFactory";
import FlipkartFactory from "./FlipkartFactory";

export interface ReportData {
  transactions: Transaction[];
  prices: ProductPrice[];
  mappedPrices?: Map<string, ProductPrice>;
}

export interface AbstractFactory {
  file: File;

  process(): Promise<ReportData>;

  reponseAdapter(): ReportData;

  transactions: Transaction[];

  prices: ProductPrice[];
}

export default class ReportExtractionFactory {
  private reportType: "Flipkart" | "Amazon" | undefined;

  private file: File | undefined;

  private productPrices: Map<string, ProductPrice>;

  constructor(
    file: File | undefined,
    productPrices: Map<string, ProductPrice>
  ) {
    if (!file) throw new Error("No file selected!");
    this.file = file;
    this.productPrices = productPrices;
    this.identify();
  }

  private identify() {
    if (this.file?.name.endsWith(".xlsx")) {
      this.reportType = "Flipkart";
    } else {
      this.reportType = "Amazon";
    }
  }

  async extract(): Promise<ReportData> {
    if (!this.file) {
      throw new Error("No file selected!");
    }

    switch (this.reportType) {
      case "Flipkart":
        return this.transformReportData(
          await new FlipkartFactory(this.file).process()
        );

      case "Amazon":
        return this.transformReportData(
          await new AmazonFactory(this.file).process()
        );

      default:
        throw new Error("Unsupported file type");
    }
  }

  private transformReportData(reportData: ReportData): ReportData {
    const newPrices = new Map<string, ProductPrice>();
    reportData.prices.forEach(({ sku, ...rest }) => {
      const existingPrice = this.productPrices.get(sku.trim());
      if (existingPrice) {
        newPrices.set(sku.trim(), existingPrice);
      } else {
        newPrices.set(sku.trim(), { sku, ...rest });
      }
    });

    reportData.mappedPrices = newPrices;

    return reportData;
  }
}
