import {
  HomeOutlined,
  MergeOutlined,
  PictureAsPdf,
  UploadFile,
  CloudUpload,
  CategoryOutlined,
  FileUpload
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
  Stack,
  Alert,
  Collapse,
  useTheme,
  useMediaQuery,
  Snackbar
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  mergePDFs,
  setAmazonFile,
  setFlipkartFile,
} from "../../store/slices/pdfMergerSlice";
import { DownloadButtons } from "./components/DownloadButtons";

import { PDFViewer } from "./components/PDFViewer";

import {
  fetchCategories,
  fetchProducts,
} from "../../store/slices/productsSlice";
import { StorageConfirmationDialog } from "./components/StorageConfirmationDialog";
import { DownloadLinkDisplay } from "./components/DownloadLinkDisplay";
import { defaultSortConfig } from "../../utils/pdfSorting";
import { StorageConfig, UploadResult, pdfStorageService, defaultStorageConfig } from "../../services/pdfStorageService";
import { Product } from "../../types/product";
import { Category } from "../../types/category";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

// Create a new FileUploadSectionWrapper component to match the new interface requirements
const FileUploadSectionWrapper: React.FC<{
  type: 'amazon' | 'flipkart';
  value: File | null;
  onChange: (file: File | undefined) => void;
}> = ({ type, value, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const label = type === 'amazon' ? 'Amazon' : 'Flipkart';
  const color = type === 'amazon' ? 'primary' : 'secondary';
  const icon = <FileUpload />;
  
  return (
    <Box sx={{ 
      border: 1, 
      borderColor: theme.palette.mode === 'dark' ? `${color}.dark` : `${color}.light`, 
      borderRadius: 2, 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.7)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      height: '100%',
      transition: 'all 0.3s ease'
    }}>
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"} 
        color={`${color}.main`} 
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {label} PDF
      </Typography>
      
      {!value ? (
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          flex: 1
        }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id={`upload-${type}-file`}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
          />
          <label htmlFor={`upload-${type}-file`} style={{ width: '100%', textAlign: 'center' }}>
            <Button
              variant="contained"
              component="span"
              color={color}
              startIcon={icon}
              size={isMobile ? "medium" : "large"}
              sx={{ 
                py: isMobile ? 1 : 1.5, 
                px: isMobile ? 2 : 4,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4
                }
              }}
            >
              Select {label} PDF
            </Button>
          </label>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mt: 2, textAlign: 'center' }}
          >
            Upload your {label} PDF file
          </Typography>
        </Box>
      ) : (
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1
        }}>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 2, 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-message': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }
            }}
          >
            <Typography noWrap>
              {value.name}
            </Typography>
          </Alert>
          <Button 
            size="small" 
            color="error" 
            variant="outlined"
            onClick={() => onChange(undefined)}
            startIcon={<UploadFile />}
            sx={{
              borderRadius: 4,
              textTransform: 'none'
            }}
          >
            Change File
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const dispatch = useAppDispatch();
  const { amazonFile, flipkartFile, finalPdf, summary, loading, error } =
    useAppSelector((state) => state.pdfMerger);
  const { categories, items: products } = useAppSelector(
    (state) => state.products
  );
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // Storage dialog state
  const [storageDialogOpen, setStorageDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  
  // Track the PDF that has been processed to prevent infinite uploads
  const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);

  // Fetch products and categories on mount
  useEffect(() => {
    const loadInitialData = async () => {
      if (products.length === 0) {
        await dispatch(fetchProducts({})).unwrap();
      }
      if (categories.length === 0) {
        await dispatch(fetchCategories()).unwrap();
      }
    };
    
    loadInitialData().catch(console.error);
  }, [dispatch, products.length, categories.length]);

  // Auto-save PDF when it's generated
  useEffect(() => {
    // Skip if no PDF, already uploading, already have a result, not authenticated, or already processed this PDF
    if (!finalPdf || isUploading || uploadResult || !isAuthenticated || finalPdf === processedPdfUrl) {
      return;
    }

    console.log('Auto-saving new PDF:', finalPdf);
    
    // Mark this PDF as being processed
    setProcessedPdfUrl(finalPdf);

    // Auto-save the PDF
    const autoSavePdf = async () => {
      try {
        // Create a Blob from the PDF URL
        if (!finalPdf) return; // Safety check
        const response = await fetch(finalPdf);
        const pdfBlob = await response.blob();
        
        // Generate a meaningful filename
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
        const filename = `sorted_labels_${timestamp}.pdf`;
        
        // Use default storage config for auto-save
        const autoSaveConfig = {
          ...defaultStorageConfig,
          expiryDays: 7, // Set a default expiry of 7 days
          description: `Auto-saved PDF with ${summary.length} products across ${categories.filter(c => !!c.name).length} categories`
        };
        
        // Upload to Firebase Storage
        const result = await pdfStorageService.uploadPdf(
          pdfBlob,
          filename,
          {
            categoryCount: categories.length,
            productCount: summary.length,
            sortConfig: defaultSortConfig,
            description: `Auto-saved PDF with ${summary.length} products across ${categories.filter(c => !!c.name).length} categories`
          },
          autoSaveConfig
        );
        
        if (result.success) {
          setUploadResult(result);
          setShowDownloadLink(true);
        } else {
          console.error('Error auto-uploading PDF:', result.error);
          setErrorMessage(result.error || 'Failed to auto-save PDF');
          
          // If there's an authentication error, don't show it to the user
          if (result.error?.includes('authenticated')) {
            console.log('Authentication error during auto-save, skipping...');
            setErrorMessage(undefined);
          }
        }
      } catch (error) {
        console.error('Error auto-uploading PDF:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Failed to auto-save PDF');
        
        // If there's an authentication error, don't show it to the user
        if (error instanceof Error && error.message.includes('authenticated')) {
          console.log('Authentication error during auto-save, skipping...');
          setErrorMessage(undefined);
        }
      }
    };
    
    // Start auto-save process
    setIsUploading(true);
    autoSavePdf().finally(() => {
      setIsUploading(false);
    });
  }, [finalPdf, isUploading, uploadResult, summary.length, categories, isAuthenticated, processedPdfUrl]);

  const handleSubmit = async () => {
    if (!amazonFile && !flipkartFile) return;

    // Reset upload result and processed PDF when generating a new PDF
    setUploadResult(null);
    setShowDownloadLink(false);
    setProcessedPdfUrl(null);

    try {
      // Apply sort configuration to the merge process
      await dispatch(mergePDFs({ 
        amazonFile, 
        flipkartFile,
        sortConfig: defaultSortConfig
      })).unwrap();
      
      // Auto-save is handled by the useEffect
    } catch (err) {
      console.error(err);
    }
  };

  const handleAmazonFileChange = (file: File | undefined) => {
    dispatch(setAmazonFile(file || null));
    // Reset download link when files change
    setShowDownloadLink(false);
    setUploadResult(null);
    setProcessedPdfUrl(null);
  };

  const handleFlipkartFileChange = (file: File | undefined) => {
    dispatch(setFlipkartFile(file || null));
    // Reset download link when files change
    setShowDownloadLink(false);
    setUploadResult(null);
    setProcessedPdfUrl(null);
  };

  const handleSaveToCloud = () => {
    if (finalPdf) {
      setStorageDialogOpen(true);
    }
  };

  const handleStorageConfirm = async (storageConfig: StorageConfig) => {
    if (!finalPdf) return;
    
    setIsUploading(true);
    try {
      // Create a Blob from the PDF URL
      const response = await fetch(finalPdf);
      const pdfBlob = await response.blob();
      
      // Generate a meaningful filename
      const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
      const filename = `sorted_labels_${timestamp}.pdf`;
      
      // Upload to Firebase Storage
      const result = await pdfStorageService.uploadPdf(
        pdfBlob,
        filename,
        {
          categoryCount: categories.length,
          productCount: summary.length,
          sortConfig: defaultSortConfig,
          description: `Sorted PDF with ${summary.length} products across ${categories.filter(c => !!c.name).length} categories`
        },
        storageConfig
      );
      
      if (result.success) {
        setUploadResult(result);
        setShowDownloadLink(true);
        setStorageDialogOpen(false);
      } else {
        setErrorMessage(result.error || 'Failed to save PDF to cloud');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save PDF to cloud');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePdf = async (fileId: string) => {
    try {
      await pdfStorageService.deletePdf(fileId);
      setShowDownloadLink(false);
      setUploadResult(null);
    } catch (error) {
      console.error('Error deleting PDF:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete PDF');
    }
  };

  const handleCloseError = () => {
    setErrorMessage(undefined);
  };

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3 }}>
      <Paper 
        sx={{ 
          p: isMobile ? 2 : 3, 
          mb: 4, 
          borderRadius: 2,
          boxShadow: theme.shadows[3]
        }}
        elevation={3}
      >
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: isMobile ? '100%' : 'auto'
          }}>
            <HomeOutlined 
              sx={{ 
                fontSize: isMobile ? 28 : 32, 
                mr: 2, 
                color: "primary.main" 
              }} 
            />
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ fontWeight: "bold", color: "primary.dark" }}
            >
              PDF Merger
            </Typography>
          </Box>
          
          {isMobile && <Divider flexItem sx={{ my: 1 }} />}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* File Upload Section */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.light",
            overflow: 'visible',
            boxShadow: theme.shadows[2]
          }}
        >
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 2,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <UploadFile sx={{ color: "primary.main", mr: 1 }} />
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{ fontWeight: "bold", color: "primary.dark" }}
              >
                Upload Files
              </Typography>
            </Box>

            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12} md={6}>
                <FileUploadSectionWrapper
                  type="amazon"
                  value={amazonFile}
                  onChange={handleAmazonFileChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FileUploadSectionWrapper
                  type="flipkart"
                  value={flipkartFile}
                  onChange={handleFlipkartFileChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Auto-sort message */}
        <Collapse in={amazonFile !== null || flipkartFile !== null}>
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              boxShadow: 1
            }}
            icon={<CategoryOutlined />}
          >
            Products will be automatically sorted by category, then by SKU
          </Alert>
        </Collapse>

        {/* Merge Button */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          my: isMobile ? 2 : 3,
          position: 'relative'
        }}>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "large" : "large"}
            startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <MergeOutlined />}
            onClick={handleSubmit}
            disabled={(!amazonFile && !flipkartFile) || loading}
            sx={{ 
              py: isMobile ? 1.2 : 1.5, 
              px: isMobile ? 3 : 4, 
              borderRadius: 2,
              fontWeight: 600,
              fontSize: isMobile ? '0.9rem' : '1rem',
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 5
              }
            }}
          >
            {loading ? "Merging..." : "Merge PDFs"}
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            {error}
          </Alert>
        )}

        {/* Results Section */}
        <Collapse in={finalPdf !== null}>
          <Grid container spacing={isMobile ? 2 : 3}>
            {/* Download Options */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: "100%",
                borderRadius: 2,
                boxShadow: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 4
                }
              }}>
                <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    mb: 2,
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <PictureAsPdf sx={{ color: "primary.main", mr: 1 }} />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{ fontWeight: "bold", color: "primary.dark" }}
                    >
                      Download Options
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <DownloadButtons pdfUrl={finalPdf} />
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CloudUpload />}
                      onClick={handleSaveToCloud}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Save to Cloud Storage
                    </Button>
                    
                    <Box sx={{ 
                      mt: 2,
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'flex-start',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Chip 
                        icon={<CategoryOutlined />} 
                        label={`${categories.filter(c => !!c.name).length} Categories`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        icon={<CategoryOutlined />} 
                        label={`${summary.length} Products`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* PDF Preview */}
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                borderRadius: 2,
                boxShadow: 2,
                overflow: 'hidden'
              }}>
                <CardContent sx={{ 
                  p: isMobile ? 2 : 3,
                  pb: isMobile ? 2 : 3
                }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    mb: 2,
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <PictureAsPdf sx={{ color: "primary.main", mr: 1 }} />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{ fontWeight: "bold", color: "primary.dark" }}
                    >
                      PDF Preview
                    </Typography>
                  </Box>
                  <Box sx={{
                    height: isMobile ? '50vh' : '70vh',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}>
                    <PDFViewer url={finalPdf} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
      
      {/* Cloud Storage Confirmation Dialog */}
      <StorageConfirmationDialog
        open={storageDialogOpen}
        onClose={() => setStorageDialogOpen(false)}
        onConfirm={handleStorageConfirm}
        fileName={`sorted_labels_${new Date().toISOString().slice(0, 10)}.pdf`}
        products={products as Product[]}
        categories={categories as Category[]}
        isUploading={isUploading}
      />
      
      {/* Download Link Display */}
      {showDownloadLink && uploadResult && (
        <DownloadLinkDisplay
          uploadResult={uploadResult}
          onClose={() => setShowDownloadLink(false)}
          onDelete={handleDeletePdf}
        />
      )}

      {/* Error Snackbar */}
      {errorMessage && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};
