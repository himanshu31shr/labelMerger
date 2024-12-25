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

export function downloadFile(finalPdf: string) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = finalPdf;
  a.target = "_blank";
  a.download = "pdf-merged-" + Date.now();
  a.click();
  document.body.removeChild(a);
}
