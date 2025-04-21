import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface TextItem {
  str: string;
  transform: number[];
}

export async function TrasformAmazonPages(
  filePath: Uint8Array
): Promise<PDFDocument> {
  // Read the input PDF from the file
  const pdfDoc = await PDFDocument.load(filePath);
  const outputPdf = await PDFDocument.create();
  const pages = pdfDoc.getPages();

  // Load the PDF using PDF.js
  const loadingTask = pdfjsLib.getDocument({ data: filePath });
  const pdf = await loadingTask.promise;
  let j = 0;

  for (let i = 0; i < pages.length; i++) {
    if (i % 2 === 0) {
      // Copy even-numbered pages to output PDF
      const [copiedPage] = await outputPdf.copyPages(pdfDoc, [i]);
      outputPdf.addPage(copiedPage);
    } else {
      // Extract text from the page
      const page = await pdf.getPage(i + 1); // PDF.js uses 1-based indexing
      const textContent = await page.getTextContent();

      // Sort text items by vertical position and then horizontal position
      const items = textContent.items as TextItem[];
      const sortedItems = items.sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) < 5) {
          // Group items that are roughly on the same line
          return a.transform[4] - b.transform[4];
        }
        return yDiff;
      });

      // Combine text items into lines
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

      const index = lines.findIndex((line) => line.startsWith("1 "));
      let currProd = {
        name: "",
        quantity: "",
      };
      if (index > -1) {
        const productDetails =
          lines[index] +
          " " +
          lines[index + 1] +
          " " +
          lines[index + 2] +
          " " +
          lines[index + 3];
        const [name, info] = productDetails.split("|");
        let quantity = "1";
        const rest = info
          .split(" ")
          .filter((str) => !!str && /[()]/.test(str) === false);

        const idx = rest.findIndex((str) => str.includes("₹"));
        if (idx > -1) {
          quantity = rest[idx + 1] || "1";
        }
        currProd = {
          name: name.replace(/1 /, "").trim(),
          quantity,
        };
      }

      const [copiedPage] = await outputPdf.copyPages(pdfDoc, [i - 1]);
      // add some text tofooter
      const pageWidth = copiedPage.getWidth();
      const fontSize = 10;
      const text = `${currProd.quantity} X [${currProd?.name}]`;

      copiedPage.drawText(text, {
        y: copiedPage.getHeight() -  20,
        x: 10,
        size: fontSize,
        color: rgb(0, 0, 0),
        font: await outputPdf.embedFont(StandardFonts.Helvetica),
        maxWidth: pageWidth,
      });

      outputPdf.removePage(j);
      outputPdf.addPage(copiedPage);
      j++;
    }
  }

  return outputPdf;
}
