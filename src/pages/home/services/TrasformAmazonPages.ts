import type { PDFDocument, PDFPage } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { BaseTransformer, TextItem } from "./base.transformer";

// Initialize PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Product {
  name: string;
  quantity: string;
}

export class AmazonPDFTransformer extends BaseTransformer {
  protected filePath: Uint8Array;
  protected declare pdfDoc: PDFDocument;
  protected declare outputPdf: PDFDocument;
  protected pdf!: pdfjsLib.PDFDocumentProxy;

  constructor(filePath: Uint8Array) {
    super(filePath);
    this.filePath = filePath;
  }

  async initialize(): Promise<void> {
    const { PDFDocument } = await import("pdf-lib");
    this.pdfDoc = await PDFDocument.load(this.filePath);
    this.outputPdf = await PDFDocument.create();
    const loadingTask = pdfjsLib.getDocument({ data: this.filePath });
    this.pdf = await loadingTask.promise;
  }

  recurseQuantity(segments: string[], startIdx = -1): number {
    const defaultIndex = -1;
    for (let i = startIdx > -1 ? startIdx : 0; i < segments.length; i++) {
      const segment = segments[i];
      if (segment.includes("₹")) {
        return this.recurseQuantity(segments, i + 1);
      } else if (startIdx > -1 && !segment.includes("₹")) {
        return i;
      }
    }
    return defaultIndex;
  }

  private extractProductInfo(lines: string[]): Product {
    const index = lines.findIndex((line) => line.startsWith("1 "));
    if (index === -1) {
      return { name: "", quantity: "" };
    }

    const productDetails = lines.slice(index, index + 4).join(" ");
    const [name, info] = productDetails.split("|");
    let quantity = "1";
    const rest = info
      .split(" ")
      .filter((str) => !!str && /[()]/.test(str) === false);

    const idx = this.recurseQuantity(rest);
    if (idx > -1) {
      quantity = rest[idx] || "1";
    }

    return {
      name: name.replace(/1 /, "").trim(),
      quantity,
    };
  }

  private async addFooterText(
    copiedPage: PDFPage,
    product: Product
  ): Promise<void> {
    const { rgb, StandardFonts } = await import("pdf-lib");
    const pageWidth = copiedPage.getWidth();
    const fontSize = 10;
    const text = `${product.quantity} X [${product?.name}]`;

    this.summaryText.push({
      name: product.name,
      quantity: parseInt(product.quantity),
      type: "amazon",
    });
    console.log("🚀 ~ AmazonPDFTransformer ~ product:", product);

    // Using standard Helvetica font which supports basic ASCII characters
    const font = await this.outputPdf.embedFont(StandardFonts.Helvetica);
    copiedPage.drawText(text, {
      y: copiedPage.getHeight() - 20,
      x: 10,
      size: fontSize,
      color: rgb(0, 0, 0),
      font,
      maxWidth: pageWidth,
    });
  }

  async transform(): Promise<PDFDocument> {
    await this.initialize();
    const pages = this.pdfDoc.getPages();
    let j = 0;

    for (let i = 0; i < pages.length; i++) {
      if (i % 2 === 0) {
        const [copiedPage] = await this.outputPdf.copyPages(this.pdfDoc, [i]);
        this.outputPdf.addPage(copiedPage);
      } else {
        const page = await this.pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const items = textContent.items as TextItem[];

        const sortedItems = this.sortTextItems(items);
        const lines = this.combineTextIntoLines(sortedItems);
        const product = this.extractProductInfo(lines);

        const [copiedPage] = await this.outputPdf.copyPages(this.pdfDoc, [
          i - 1,
        ]);
        await this.addFooterText(copiedPage, product);

        this.outputPdf.removePage(j);
        this.outputPdf.addPage(copiedPage);
        j++;
      }
    }

    return this.outputPdf;
  }
}
