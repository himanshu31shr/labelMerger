import { PDFDocument } from "pdf-lib";
import { Product } from "../../../services/product.service";

export interface TextItem {
  str: string;
  transform: number[];
}

export interface ProductSummary {
  name: string;
  quantity: string;
  SKU?: string;
  orderId?: string;
  type: 'amazon' | 'flipkart';
  product?: Product;
}

export class BaseTransformer {
  protected filePath: Uint8Array;
  protected pdfDoc!: PDFDocument;
  protected outputPdf!: PDFDocument;
  protected summaryText: ProductSummary[] = [];

  constructor(filePath: Uint8Array) {
    this.filePath = filePath;
  }

  async initialize(): Promise<void> {}

  async transform(): Promise<PDFDocument> {
    await this.initialize();
    return this.outputPdf;
  }

  get summary(): ProductSummary[] {
    return this.summaryText;
  }

  protected sortTextItems(items: TextItem[]): TextItem[] {
    return items.sort((a, b) => {
      const yDiff = b.transform[5] - a.transform[5];
      if (Math.abs(yDiff) < 5) {
        return a.transform[4] - b.transform[4];
      }
      return yDiff;
    });
  }

  protected combineTextIntoLines(sortedItems: TextItem[]): string[] {
    let currentY = sortedItems[0]?.transform[5];
    let currentLine = "";
    const lines: string[] = [];

    sortedItems.forEach((item) => {
      if (Math.abs(item.transform[5] - currentY) > 5) {
        if (currentLine) {
          lines.push(currentLine.trim());
        }
        currentLine = item.str;
        currentY = item.transform[5];
      } else {
        currentLine += " " + item.str;
      }
    });

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
  }
}
