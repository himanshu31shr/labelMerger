import { PDFDocument } from "pdf-lib";

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

    page.setWidth(width - 180);
    page.setHeight(upperRightY);

    // Set the crop box (this defines the visible area)
    page.setCropBox(lowerLeftX, lowerLeftY, upperRightX, upperRightY);

    // Copy the current page (with crop) into the output PDF
    const [copiedPage] = await outputPdf.copyPages(pdfDoc, [i]);

    // Add the copied (and cropped) page to the output PDF
    outputPdf.addPage(copiedPage);
  }

  return pdfDoc;
}
