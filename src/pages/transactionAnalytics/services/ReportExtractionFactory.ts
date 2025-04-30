import { Transaction } from "../../../types/transaction.type";
import { AmazonFactory } from "./AmazonFactory";
import FlipkartFactory from "./FlipkartFactory";

export interface AbstractFactory {
  file: File;

  process(): Promise<Transaction[]>;

  transactions: Transaction[];
}

export default class ReportExtractionFactory {
  private reportType: "Flipkart" | "Amazon" | undefined;

  private file: File | undefined;

  constructor(
    file: File | undefined,
  ) {
    if (!file) throw new Error("No file selected!");
    this.file = file;
    this.identify();
  }

  private identify() {
    if (this.file?.name.endsWith(".xlsx")) {
      this.reportType = "Flipkart";
    } else {
      this.reportType = "Amazon";
    }
  }

  async extract(): Promise<Transaction[]> {
    if (!this.file) {
      throw new Error("No file selected!");
    }

    switch (this.reportType) {
      case "Flipkart":
        return await new FlipkartFactory(this.file).process()

      case "Amazon":
        return await new AmazonFactory(this.file).process()

      default:
        throw new Error("Unsupported file type");
    }
  }
}
