import { PDFDocument } from "pdf-lib";
import { TrasformAmazonPages } from "./TrasformAmazonPages";
import { TrasformFlipkartPages } from "./TrasformFlipkartPages";

export async function mergePdfs({
  amzon,
  flp,
}: {
  amzon: Uint8Array | null;
  flp: Uint8Array | null;
}): Promise<PDFDocument> {
  const outpdf = await PDFDocument.create();
  if (amzon) {
    const amz = await TrasformAmazonPages(amzon);
    const pages = amz.getPages();
    for (let i = 0; i < pages.length; i++) {
      const [page] = await outpdf.copyPages(amz, [i]);
      outpdf.addPage(page);
    }
  }

  if (flp) {
    const flip = await TrasformFlipkartPages(flp);
    const pages = flip.getPages();
    for (let i = 0; i < pages.length; i++) {
      const [page] = await outpdf.copyPages(flip, [i]);
      outpdf.addPage(page);
    }
  }

  return outpdf;
}
