import React, { MouseEvent } from "react";
import { Download, PictureAsPdf } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { downloadFile } from "../utils";

interface DownloadButtonsProps {
  pdfUrl?: string | null;
}

export const DownloadButtons = ({ pdfUrl }: DownloadButtonsProps) => {
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
      )}
    </Paper>
  );
};