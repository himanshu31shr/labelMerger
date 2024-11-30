import { PDFDocument, PDFPage } from "pdf-lib";

// Utility function for transformation (scale, crop, etc.)
export async function TrasformFlipkartPages(
  filePath: Uint8Array
): Promise<PDFDocument> {
  const pdfDoc = await PDFDocument.load(filePath);
  const outputPdf = await PDFDocument.create();

  // Get all pages from the PDF document
  const pages = pdfDoc.getPages();

  // Iterate through the pages
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const mediabox = page.getMediaBox();
    const width = mediabox.width;
    const height = mediabox.height;

    // Define the crop box positions as per the given logic
    const lowerLeftX = 180;
    const lowerLeftY = height / 2 + 38;
    const upperRightX = width;
    const upperRightY = height - 25;

    page.setWidth(width-180)
    page.setHeight(upperRightY)

    // Set the crop box (this defines the visible area)
    page.setCropBox(lowerLeftX, lowerLeftY, upperRightX, upperRightY);

    // Copy the current page (with crop) into the output PDF
    const [copiedPage] = await outputPdf.copyPages(pdfDoc, [i]);

    // Add the copied (and cropped) page to the output PDF
    outputPdf.addPage(copiedPage);
  }

  return pdfDoc;
}

// Process Amazon function
export async function TrasformAmazonPages(
  filePath: Uint8Array
): Promise<PDFDocument> {
  // Read the input PDF from the file
  const pdfDoc = await PDFDocument.load(filePath);

  // Create a new PDF document to store the output
  const outputPdf = await PDFDocument.create();

  // Get all the pages from the input PDF
  const pages = pdfDoc.getPages();

  // Loop through the pages, select every second page (even-indexed)
  for (let i = 0; i < pages.length; i++) {
    if (i % 2 === 0) {
      // Add the transformed page to the output PDF
      const [copiedPage] = await outputPdf.copyPages(pdfDoc, [i]);
      outputPdf.addPage(copiedPage);
    }
  }
  return outputPdf;
}

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
