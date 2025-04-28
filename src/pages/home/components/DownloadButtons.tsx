import React, { MouseEvent } from "react";
import { Download, PictureAsPdf, TableChart } from "@mui/icons-material";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import { downloadFile } from "../utils";

interface DownloadButtonsProps {
  pdfUrl?: string;
  onExportSummary: () => void;
  hasSummary: boolean;
}

export const DownloadButtons = ({ pdfUrl, onExportSummary, hasSummary }: DownloadButtonsProps) => {
  return (
    <Paper 
      sx={{ 
        p: 3,
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
      }}
    >
      {pdfUrl && (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <PictureAsPdf sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Download Merged Labels
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={pdfUrl}
              startIcon={<Download />}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => downloadFile(e, pdfUrl)}
              sx={{ minWidth: 200 }}
            >
              Download PDF
            </Button>
          </Box>
          {hasSummary && (
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          )}
        </>
      )}
      
      {hasSummary && (
        <Box sx={{ textAlign: 'center' }}>
          <TableChart sx={{ fontSize: 32, color: 'secondary.main', mb: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Export Product Summary
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onExportSummary}
            startIcon={<Download />}
            sx={{ minWidth: 200 }}
          >
            Export Summary
          </Button>
        </Box>
      )}
    </Paper>
  );
};