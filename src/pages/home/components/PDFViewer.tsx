import * as React from "react";
import { Box } from "@mui/material";

interface PDFViewerProps {
  url?: string | null;
  pdfUrl?: string | null;
}

export const PDFViewer = ({ url, pdfUrl }: PDFViewerProps) => {
  // Use either URL if provided, otherwise empty string
  const effectiveUrl = url || pdfUrl || '';

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src={effectiveUrl}
        width="100%"
        height="100%"
        style={{ border: 'none', display: 'block' }}
        title="PDF Preview"
      />
    </Box>
  );
};