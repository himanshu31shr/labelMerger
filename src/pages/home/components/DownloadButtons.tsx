import React from "react";
import { Download } from "@mui/icons-material";
import { Box, Button, Paper } from "@mui/material";
import { downloadFile } from "../utils";

interface DownloadButtonsProps {
  pdfUrl?: string;
  onExportSummary: () => void;
  hasSummary: boolean;
}

export const DownloadButtons = ({ pdfUrl, onExportSummary, hasSummary }: DownloadButtonsProps) => {
  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {pdfUrl && (
          <Button
            variant="contained"
            color="primary"
            href={pdfUrl}
            startIcon={<Download />}
            onClick={(e) => downloadFile(e, pdfUrl)}
          >
            Download Merged PDF
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={onExportSummary}
          startIcon={<Download />}
          disabled={!hasSummary}
        >
          Export Summary as PDF
        </Button>
      </Box>
    </Paper>
  );
};