import React from "react";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Responsive height calculation
  const getIframeHeight = () => {
    if (isMobile) return '60vh';  // Smaller height on mobile
    if (isTablet) return '70vh';  // Medium height on tablet
    return '80vh';                // Full height on desktop
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        mb: { xs: 2, sm: 3 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 2,
          border: theme => `1px solid ${theme.palette.divider}`,
          height: getIframeHeight(),
          maxHeight: '800px', // Max height as fallback
          display: 'flex',    // Use flexbox to ensure iframe fills container
        }}
      >
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"     // Fill the parent container
          style={{
            border: 'none',
            display: 'block',
            flexGrow: 1     // Take up all available space
          }}
          title="PDF Preview"
        />
      </Paper>
    </Box>
  );
};