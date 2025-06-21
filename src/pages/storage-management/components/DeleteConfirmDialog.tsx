import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  Chip
} from '@mui/material';
import {
  Warning as WarningIcon,
  Folder as FolderIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
// Utility functions for formatting
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: 'folder' | 'file';
  itemName: string;
  folderStats?: {
    fileCount: number;
    totalSize: number;
  };
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  itemType,
  itemName,
  folderStats
}) => {
  const isFolder = itemType === 'folder';
  const hasMultipleFiles = folderStats && folderStats.fileCount > 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6">
            Delete {isFolder ? 'Folder' : 'File'}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {/* Item Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {isFolder ? (
            <FolderIcon color="primary" sx={{ fontSize: 40 }} />
          ) : (
            <PdfIcon color="error" sx={{ fontSize: 40 }} />
          )}
          <Box>
            <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word' }}>
              {itemName}
            </Typography>
            {folderStats && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label={`${folderStats.fileCount} file${folderStats.fileCount !== 1 ? 's' : ''}`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={formatFileSize(folderStats.totalSize)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* Warning Message */}
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            {isFolder ? (
              <>
                This will permanently delete the folder and{' '}
                <strong>
                  {folderStats ? `all ${folderStats.fileCount} file${folderStats.fileCount !== 1 ? 's' : ''}` : 'all files'}
                </strong>{' '}
                inside it.
              </>
            ) : (
              'This will permanently delete the file.'
            )}
          </Typography>
        </Alert>

        {/* Additional Warning for Folders with Multiple Files */}
        {hasMultipleFiles && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              ⚠️ This folder contains {folderStats?.fileCount} files. This action cannot be undone!
            </Typography>
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary">
          Are you sure you want to continue? This action cannot be undone.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          autoFocus
        >
          Delete {isFolder ? 'Folder' : 'File'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 