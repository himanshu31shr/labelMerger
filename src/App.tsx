import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FileInput } from "./components/file-input";
import { ChangeEvent, useState } from "react";
import { mergePdfs } from "./services/merge.service";

const readFileFromInput = async (file?: File): Promise<Uint8Array | null> => {
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

export default function App() {
  const [amazon, setAmazon] = useState<File>();
  const [flipkart, setFlipkart] = useState<File>();
  const [finalPdf, setFinal] = useState<string>();

  const handleSubmit = async () => {
    if (!amazon || !flipkart) return;

    const pdf = await mergePdfs({
      amzon: await readFileFromInput(amazon),
      flp: await readFileFromInput(flipkart),
    });

    const outputPdfBytes = await pdf.save();
    const blob = new Blob([outputPdfBytes], { type: "application/pdf" });

    // Create a Blob URL for the PDF
    const pdfUrl = URL.createObjectURL(blob);
    setFinal(pdfUrl);
    setAmazon(undefined);
    setFlipkart(undefined);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <FileInput
          buttonText="Select amazon labels"
          name="amazon"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setAmazon(e.target.files[0]);
            }
          }}
        />
        {amazon && <div>{amazon?.name}</div>}
      </Box>
      <Box sx={{ my: 4 }}>
        <FileInput
          buttonText="Select flipkart labels"
          name="flipkart"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setFlipkart(e.target?.files[0]);
            }
          }}
        />
        {flipkart && <div>{flipkart?.name}</div>}
      </Box>
      {finalPdf && (
        <iframe src={finalPdf} width={"100%"} height={"600"}></iframe>
      )}
      <Box sx={{ my: 4 }}>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          onClick={() => {
            handleSubmit();
          }}
        >
          Merge & Generate Pdf
        </Button>
      </Box>
    </Container>
  );
}
