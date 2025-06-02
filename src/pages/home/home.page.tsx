import {
  HomeOutlined,
  MergeOutlined,
  PictureAsPdf,
  TableChart,
  UploadFile,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  mergePDFs,
  setAmazonFile,
  setFlipkartFile,
} from "../../store/slices/pdfMergerSlice";
import { DownloadButtons } from "./components/DownloadButtons";
import { FileUploadSection } from "./components/FileUploadSection";
import { PDFViewer } from "./components/PDFViewer";
import { SummaryTable } from "./components/SummaryTable";
import {
  fetchCategories,
  fetchProducts,
} from "../../store/slices/productsSlice";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { amazonFile, flipkartFile, finalPdf, summary, loading } =
    useAppSelector((state) => state.pdfMerger);
  const { categories, items: products } = useAppSelector(
    (state) => state.products
  );

  const handleSubmit = async () => {
    if (!amazonFile && !flipkartFile) return;

    try {
      if (products.length === 0 || categories.length === 0) {
        await dispatch(fetchProducts({})).unwrap();
      }

      if (categories.length === 0) {
        await dispatch(fetchCategories()).unwrap();
      }

      await dispatch(mergePDFs({ amazonFile, flipkartFile })).unwrap();
    } catch {
      // Error handling - could show toast notification
    }
  };

  const handleAmazonFileChange = (file: File | undefined) => {
    dispatch(setAmazonFile(file || null));
  };

  const handleFlipkartFileChange = (file: File | undefined) => {
    dispatch(setFlipkartFile(file || null));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <HomeOutlined sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "primary.dark" }}
          >
            PDF Merger Dashboard
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Card
          sx={{
            mb: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.light",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <UploadFile sx={{ color: "primary.main", mr: 1 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.dark" }}
              >
                Upload Files
              </Typography>
            </Box>

            <FileUploadSection
              amazonFile={amazonFile || undefined}
              flipkartFile={flipkartFile || undefined}
              onAmazonChange={handleAmazonFileChange}
              onFlipkartChange={handleFlipkartFileChange}
            />
          </CardContent>
        </Card>

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
            sx={{
              py: 1.5,
              px: 4,
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 4px 12px rgba(0,0,0,0.2)"
                  : "0 4px 12px rgba(21,101,192,0.2)",
            }}
          >
            {loading ? "Processing..." : "Merge & Generate PDF"}
          </Button>
        </Box>

        {(finalPdf || summary.length > 0) && (
          <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
            <DownloadButtons
              pdfUrl={finalPdf || undefined}
            />
          </Box>
        )}

        <Grid container spacing={3}>
          {finalPdf && (
            <Grid item xs={12} md={summary.length > 0 ? 6 : 12}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "primary.light",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <PictureAsPdf sx={{ color: "primary.main", mr: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "primary.dark" }}
                    >
                      Merged PDF Preview
                    </Typography>
                    <Chip
                      label="PDF Generated"
                      color="success"
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Box sx={{ height: "600px", overflow: "auto" }}>
                    <PDFViewer pdfUrl={finalPdf} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {summary.length > 0 && (
            <Grid item xs={12} md={finalPdf ? 6 : 12}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "primary.light",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <TableChart sx={{ color: "primary.main", mr: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "primary.dark" }}
                    >
                      Product Summary
                    </Typography>
                    <Chip
                      label={`${summary.length} Products`}
                      color="primary"
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Box sx={{ height: "600px", overflow: "auto" }}>
                    <SummaryTable summary={summary} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {!finalPdf && !summary.length && !loading && (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No data available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upload files and merge them to view results
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
