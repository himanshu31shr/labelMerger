import React, { useState } from "react";
import { Button, Snackbar, FormControlLabel, Checkbox, Box, Tooltip } from "@mui/material";
import { UploadFile, Info } from "@mui/icons-material";

interface Props {
  onImport: (file: File, updateExisting?: boolean) => Promise<void>;
}

export const ProductImportSection: React.FC<Props> = ({ onImport }) => {
  const [error, setError] = useState<string | null>(null);
  const [updateExisting, setUpdateExisting] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      !file.name.endsWith(".txt")
    ) {
      setError("Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    try {
      setError(null);
      await onImport(file, updateExisting);
    } catch {
      setError("Failed to import products. Please check the file format.");
    }

    // Reset the input
    event.target.value = "";
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={updateExisting}
              onChange={(e) => setUpdateExisting(e.target.checked)}
              size="small"
            />
          }
          label="Update existing products"
          sx={{ mr: 2 }}
        />
        <Tooltip title="When checked, existing products will be updated with new prices and metadata from the import file. User customizations (cost price, categories, visibility) will be preserved.">
          <Info sx={{ fontSize: 20, color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      </Box>
      <Button variant="contained" component="label" startIcon={<UploadFile />}>
        Import Products
        <input
          type="file"
          hidden
          accept=".xlsx,.xls,.txt"
          onChange={handleFileChange}
        />
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};
