import React, { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { UploadFile } from '@mui/icons-material';

interface Props {
  onImport: (file: File) => Promise<void>;
}

export const ProductImportSection: React.FC<Props> = ({ onImport }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    try {
      setError(null);
      await onImport(file);
    } catch (_err) {
      setError('Failed to import products. Please check the file format.');
    }

    // Reset the input
    event.target.value = '';
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Import Products
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
        >
          Upload XLSX File
          <input
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          Supported formats: Amazon and Flipkart product exports (.xlsx, .xls)
        </Typography>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};