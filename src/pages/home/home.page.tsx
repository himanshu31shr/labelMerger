import { MergeOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import { useState } from "react";
import { AccordionSection } from "./components/AccordionSection";
import { DownloadButtons } from "./components/DownloadButtons";
import { FileUploadSection } from "./components/FileUploadSection";
import { PDFViewer } from "./components/PDFViewer";
import { SummaryTable } from "./components/SummaryTable";
import { ProductSummary } from "./services/base.transformer";
import { PDFMergerService } from "./services/merge.service";
import { exportTableToPDF, readFileFromInput } from "./utils";
import React from "react";

export const HomePage = () => {
  const [amazon, setAmazon] = useState<File>();
  const [flipkart, setFlipkart] = useState<File>();
  const [finalPdf, setFinal] = useState<string>();
  const [summary, setSummary] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleSubmit = async () => {
    if (!amazon && !flipkart) return;
    setIsLoading(true);
    try {
      const mergePdfs = new PDFMergerService();
      const pdf = await mergePdfs.mergePdfs({
        amzon: await readFileFromInput(amazon),
        flp: await readFileFromInput(flipkart),
      });
      setSummary(mergePdfs.summary);

      if (!pdf) return;

      const outputPdfBytes = await pdf.save();
      const blob = new Blob([outputPdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setFinal(pdfUrl);
      setAmazon(undefined);
      setFlipkart(undefined);
      setActiveSection("pdfViewer");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportTableToPDF = () => exportTableToPDF("summary-table");

  return (
    <Box>
      <FileUploadSection
        amazonFile={amazon}
        flipkartFile={flipkart}
        onAmazonChange={setAmazon}
        onFlipkartChange={setFlipkart}
      />

      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <MergeOutlined />
            )
          }
          disabled={(!amazon && !flipkart) || isLoading}
        >
          {isLoading ? "Processing..." : "Merge & Generate PDF"}
        </Button>
      </Box>

      {(finalPdf || summary.length > 0) && (
        <DownloadButtons
          pdfUrl={finalPdf}
          onExportSummary={handleExportTableToPDF}
          hasSummary={summary.length > 0}
        />
      )}

      {finalPdf && (
        <Box sx={{ my: 4 }}>
          <AccordionSection
            title="Merged PDF Preview"
            isExpanded={activeSection === "pdfViewer"}
            onChange={(isExpanded) =>
              setActiveSection(isExpanded ? "pdfViewer" : "")
            }
          >
            <PDFViewer pdfUrl={finalPdf} />
          </AccordionSection>
        </Box>
      )}

      {summary.length > 0 && (
        <Box sx={{ my: 4 }}>
          <AccordionSection
            title="Product Summary"
            isExpanded={activeSection === "summary"}
            onChange={(isExpanded) =>
              setActiveSection(isExpanded ? "summary" : "")
            }
          >
            <SummaryTable summary={summary} />
          </AccordionSection>
        </Box>
      )}
    </Box>
  );
};
