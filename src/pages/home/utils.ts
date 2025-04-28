import html2pdf from 'html2pdf.js';
import { MouseEvent } from "react";

export const readFileFromInput = async (file?: File): Promise<Uint8Array | null> => {
  if (!file) return null;

  const fileReader = new FileReader();

  // Wrap the file reading process in a promise to handle asynchronous operation
  return await new Promise<Uint8Array>((resolve, reject) => {
    fileReader.onload = () => {
      resolve(new Uint8Array(fileReader.result as ArrayBuffer));
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};

export function downloadFile(e: MouseEvent<HTMLAnchorElement>, finalPdf: string) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = finalPdf;
  a.target = "_blank";
  a.download = "pdf-merged-" + Date.now();
  a.click();
  document.body.removeChild(a);
  e.preventDefault();
  return;
}

export const exportTableToPDF = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const tableStyles = {
    backgroundColor: '#ffffff',
    padding: '8px 16px',
    color: '#000000',
  };

  // Apply temporary styles
  element.style.backgroundColor = tableStyles.backgroundColor;
  const cells = [...element.getElementsByTagName('td'), ...element.getElementsByTagName('th')];
  cells.forEach(cell => {
    cell.style.padding = tableStyles.padding;
    cell.style.backgroundColor = tableStyles.backgroundColor;
    cell.style.color = tableStyles.color;
  });

  const worker = html2pdf();
  
  worker
    .set({
      margin: 0,
      filename: "summary-table.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();

  // Reset styles after a delay
  setTimeout(() => {
    element.style.backgroundColor = '';
    cells.forEach(cell => {
      cell.style.padding = '';
      cell.style.backgroundColor = '';
      cell.style.color = '';
    });
  }, 1000);
};
