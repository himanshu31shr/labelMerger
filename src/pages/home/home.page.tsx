import { Download, MergeOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, useState } from "react";
import { FileInput } from "./file-input";
import { ProductSummary } from "./services/base.transformer";
import { PDFMergerService } from "./services/merge.service";
import { downloadFile, readFileFromInput } from "./utils";
import React from "react";
import html2Pdf from "html2pdf.js";

export const HomePage = () => {
  const [amazon, setAmazon] = useState<File>();
  const [flipkart, setFlipkart] = useState<File>();
  const [finalPdf, setFinal] = useState<string>();
  const [summary, setSummary] = useState<ProductSummary[]>([]);

  const handleSubmit = async () => {
    if (!amazon && !flipkart) return;
    const mergePdfs = new PDFMergerService();
    const pdf = await mergePdfs.mergePdfs({
      amzon: await readFileFromInput(amazon),
      flp: await readFileFromInput(flipkart),
    });
    setSummary(mergePdfs.summary);

    if (!pdf) return;

    const outputPdfBytes = await pdf.save();
    const blob = new Blob([outputPdfBytes], { type: "application/pdf" });

    // Create a Blob URL for the PDF
    const pdfUrl = URL.createObjectURL(blob);
    setFinal(pdfUrl);
    setAmazon(undefined);
    setFlipkart(undefined);
  };

  const exportTableToPDF = () => {
    const element = document.getElementById("summary-table");
    if (!element) return;

    const worker = html2Pdf();

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
          <Box sx={{ my: 4 }} gap={2} display="flex">
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
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              onClick={() => {
                exportTableToPDF();
              }}
              startIcon={<MergeOutlined />}
              disabled={!summary.length}
            >
              Export Summary
            </Button>
          </Box>
          <iframe src={finalPdf} width="100%" height={"800"}></iframe>
        </>
      )}

      {summary.length > 0 && (
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <h3>Summary</h3>

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={exportTableToPDF}
            >
              Export Table
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            id="summary-table"
          >
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summary.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.SKU}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};
