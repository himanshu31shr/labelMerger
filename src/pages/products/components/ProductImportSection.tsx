import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

interface Props {
  onImport: (file: File) => Promise<void>;
}

export const ProductImportSection: React.FC<Props> = ({ onImport }) => {
  const [error, setError] = useState<string | null>(null);

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
      await onImport(file);
    } catch {
      setError("Failed to import products. Please check the file format.");
    }

    // Reset the input
    event.target.value = "";
  };

  return (
    <>
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
    </>
  );
};
