import { MergeOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mergePDFs, setAmazonFile, setFlipkartFile, clearFiles } from "../../store/slices/pdfMergerSlice";
import { AccordionSection } from "./components/AccordionSection";
import { DownloadButtons } from "./components/DownloadButtons";
import { FileUploadSection } from "./components/FileUploadSection";
import { PDFViewer } from "./components/PDFViewer";
import { SummaryTable } from "./components/SummaryTable";
import { exportTableToPDF } from "./utils";
import React from "react";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { amazonFile, flipkartFile, finalPdf, summary, loading } = useAppSelector(state => state.pdfMerger);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleSubmit = async () => {
    if (!amazonFile && !flipkartFile) return;
    
    try {
      const result = await dispatch(mergePDFs({ amazonFile, flipkartFile })).unwrap();
      setActiveSection("pdfViewer");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAmazonFileChange = (file: File | undefined) => {
    dispatch(setAmazonFile(file || null));
  };

  const handleFlipkartFileChange = (file: File | undefined) => {
    dispatch(setFlipkartFile(file || null));
  };

  const handleExportTableToPDF = () => exportTableToPDF("summary-table");

  return (
    <Box>
      <FileUploadSection
        amazonFile={amazonFile || undefined}
        flipkartFile={flipkartFile || undefined}
        onAmazonChange={handleAmazonFileChange}
        onFlipkartChange={handleFlipkartFileChange}
      />

      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <MergeOutlined />
            )
          }
          disabled={(!amazonFile && !flipkartFile) || loading}
        >
          {loading ? "Processing..." : "Merge & Generate PDF"}
        </Button>
      </Box>

      {(finalPdf || summary.length > 0) && (
        <DownloadButtons
          pdfUrl={finalPdf || undefined}
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
