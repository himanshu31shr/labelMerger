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
        p: { xs: 2, sm: 3 },
        mb: { xs: 3, sm: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 2, sm: 3 }
      }}
    >
      {pdfUrl && (
        <>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <PictureAsPdf sx={{ fontSize: { xs: 28, sm: 32 }, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Download Merged Labels
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={pdfUrl}
              startIcon={<Download />}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => downloadFile(e, pdfUrl)}
              sx={{
                minWidth: { xs: '100%', sm: 200 },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Download PDF
            </Button>
          </Box>
          {hasSummary && (
            <>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Divider orientation="horizontal" sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', my: 1 }} />
            </>
          )}
        </>
      )}

      {hasSummary && (
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <TableChart sx={{ fontSize: { xs: 28, sm: 32 }, color: 'secondary.main', mb: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Export Product Summary
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onExportSummary}
            startIcon={<Download />}
            sx={{
              minWidth: { xs: '100%', sm: 200 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Export Summary
          </Button>
        </Box>
      )}
    </Paper>
  );
};