import { Download, MergeOutlined } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, useState } from "react";
import { mergePdfs } from "./services/merge.service";
import { downloadFile, readFileFromInput } from "./utils";
import { FileInput } from "./file-input";
import React from "react";

export const HomePage = () => {
  const [amazon, setAmazon] = useState<File>();
  const [flipkart, setFlipkart] = useState<File>();
  const [finalPdf, setFinal] = useState<string>();

  const handleSubmit = async () => {
    if (!amazon && !flipkart) return;

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
    <>
      <Alert sx={{ my: 4 }} severity="info">
        Please select AMAZON and FLIPKART labels correctly to process and merge
        the PDFs
      </Alert>

      <Grid container spacing={2} sx={{ my: 4 }}>
        <Grid>
          <Box>
            <FileInput
              accepts="application/pdf"
              name="amazon"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setAmazon(e.target.files[0]);
                }
              }}
              selected={!!amazon}
            />
          </Box>
        </Grid>
        <Grid>
          <Box>
            <FileInput
              accepts="application/pdf"
              name="flipkart"
              selected={!!flipkart}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setFlipkart(e.target?.files[0]);
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ my: 4 }}>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          onClick={() => {
            handleSubmit();
          }}
          startIcon={<MergeOutlined />}
          disabled={!amazon && !flipkart}
        >
          Merge & Generate Pdf
        </Button>
      </Box>
      {finalPdf && (
        <>
          <Box sx={{ my: 4 }}>
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              href={finalPdf}
              startIcon={<Download />}
              onClick={() => {
                downloadFile(finalPdf);
              }}
            >
              Download Pdf
            </Button>
          </Box>
          <iframe src={finalPdf} width={"100%"} height={"800"}></iframe>
        </>
      )}
    </>
  );
};
