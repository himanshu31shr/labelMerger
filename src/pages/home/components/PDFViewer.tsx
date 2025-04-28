import React from "react";
import { Box, Paper } from "@mui/material";

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  return (
    <Box>
      <Paper 
        elevation={0}
        sx={{ 
          overflow: 'hidden',
          borderRadius: 2,
          border: theme => `1px solid ${theme.palette.divider}`,
        }}
      >
        <iframe 
          src={pdfUrl} 
          width="100%" 
          height={800} 
          style={{ 
            border: 'none',
            display: 'block'
          }} 
          title="PDF Preview"
        />
      </Paper>
    </Box>
  );
};