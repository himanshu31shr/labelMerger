import { PDFDocument } from "pdf-lib";

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
