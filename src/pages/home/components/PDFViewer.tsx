import React from "react";
import { Box } from "@mui/material";

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  return (
    <Box sx={{ my: 4 }}>
      <iframe src={pdfUrl} width="100%" height={800} style={{ border: "1px solid #eee" }} />
    </Box>
  );
};