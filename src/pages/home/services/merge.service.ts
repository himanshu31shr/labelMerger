import { PDFDocument } from "pdf-lib";
import { AmazonPDFTransformer } from "./TrasformAmazonPages";
import { FlipkartPageTransformer } from "./TrasformFlipkartPages";
import { ProductSummary } from "./base.transformer";

export class PDFMergerService {
  private outpdf: PDFDocument | undefined;

  private summaryText: ProductSummary[] = [];

  async initialize(): Promise<PDFDocument> {
    return (this.outpdf = await PDFDocument.create());
  }

  public async mergePdfs({
    amzon,
    flp,
  }: {
    amzon: Uint8Array | null;
    flp: Uint8Array | null;
  }): Promise<PDFDocument | undefined> {
    await this.initialize();

    if (!this.outpdf) {
      return;
    }

    await this.amazon(amzon);
    await this.flipkart(flp);

    return this.outpdf;
  }

  private async amazon(amzon: Uint8Array | null) {
    if (!amzon || !this.outpdf) {
      return;
    }
    const amz = new AmazonPDFTransformer(amzon);
    const pages = await amz.transform();
    for (let i = 0; i < pages.getPageIndices().length; i++) {
      const [page] = await this.outpdf.copyPages(pages, [i]);
      this.outpdf.addPage(page);
    }
    this.summaryText.push(...amz.summary)
  }

  private async flipkart(flp: Uint8Array | null) {
    if (!flp || !this.outpdf) {
      return;
    }
    const flipkartService = new FlipkartPageTransformer(flp);
    const pages = await flipkartService.transformPages();
    for (let i = 0; i < pages.getPageIndices().length; i++) {
      const [page] = await this.outpdf.copyPages(pages, [i]);
      this.outpdf.addPage(page);
    }
    this.summaryText.push(...flipkartService.summary)
  }

  get summary(): ProductSummary[] {
    return this.summaryText;
  }
}
