import { SyntheticEvent } from "react";

export const readFileFromInput = async (
  file?: File
): Promise<Uint8Array | null> => {
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

export function downloadFile(e: SyntheticEvent<MouseEvent>, finalPdf: string) {
  const blob = URL.createObjectURL(new Blob([finalPdf], { type: "application/pdf" }));
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = blob;
  a.target = "_blank";
  a.download = "pdf-merged-" + Date.now();
  a.click();
  URL.revokeObjectURL(blob);
  document.body.removeChild(a);
  e.preventDefault();
  return;
}
