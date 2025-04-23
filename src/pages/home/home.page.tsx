import React, { ChangeEvent, useState } from "react";
import { MergeOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FileInput } from "./file-input";
import { ProductSummary } from "./services/base.transformer";
import { PDFMergerService } from "./services/merge.service";
import { readFileFromInput } from "./utils";
import html2Pdf from "html2pdf.js";
import { SummaryTable } from "./components/SummaryTable";
import { PDFViewer } from "./components/PDFViewer";
import { DownloadButtons } from "./components/DownloadButtons";

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
      setActiveSection("pdfViewer"); // Open PDF viewer section after processing
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportTableToPDF = () => {
    const element = document.getElementById("summary-table");
    if (!element) return;

    const tableStyles = {
      backgroundColor: '#ffffff',
      padding: '8px 16px',
      color: '#000000',
    };

    element.style.backgroundColor = tableStyles.backgroundColor;
    const cells = [...element.getElementsByTagName('td'), ...element.getElementsByTagName('th')];
    cells.forEach(cell => {
      cell.style.padding = tableStyles.padding;
      cell.style.backgroundColor = tableStyles.backgroundColor;
      cell.style.color = tableStyles.color;
    });

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

    setTimeout(() => {
      element.style.backgroundColor = '';
      cells.forEach(cell => {
        cell.style.padding = '';
        cell.style.backgroundColor = '';
        cell.style.color = '';
      });
    }, 1000);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PDF Label Merger
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Merge Amazon and Flipkart shipping labels into a single PDF and get a summary of all products
        </Typography>

        <Alert sx={{ my: 4 }} severity="info">
          Please select AMAZON and FLIPKART labels correctly to process and merge the PDFs
        </Alert>

        <Grid container spacing={3} sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Amazon Label
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Flipkart Label
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <MergeOutlined />}
            disabled={(!amazon && !flipkart) || isLoading}
          >
            {isLoading ? 'Processing...' : 'Merge & Generate PDF'}
          </Button>
        </Box>

        {(finalPdf || summary.length > 0) && (
          <DownloadButtons 
            pdfUrl={finalPdf}
            onExportSummary={exportTableToPDF}
            hasSummary={summary.length > 0}
          />
        )}

        {finalPdf && (
          <Box sx={{ my: 4 }}>
            <Accordion 
              expanded={activeSection === 'pdfViewer'}
              onChange={(_, isExpanded) => setActiveSection(isExpanded ? 'pdfViewer' : '')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Merged PDF Preview</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PDFViewer pdfUrl={finalPdf} />
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {summary.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Accordion 
              expanded={activeSection === 'summary'}
              onChange={(_, isExpanded) => setActiveSection(isExpanded ? 'summary' : '')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Product Summary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SummaryTable summary={summary} />
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Box>
    </Container>
  );
};
