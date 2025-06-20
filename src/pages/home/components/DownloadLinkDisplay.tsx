import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  Chip,
  IconButton,
  Alert,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  CloudDone,
  ContentCopy,
  Delete,
  CalendarToday,
  Timer,
  Share as ShareIcon,
  Download,
  Close,
  Folder
} from '@mui/icons-material';
import { UploadResult } from '../../../services/pdfStorageService';

interface DownloadLinkDisplayProps {
  uploadResult: UploadResult;
  onClose: () => void;
  onDelete: (fileId: string) => void;
}

export const DownloadLinkDisplay: React.FC<DownloadLinkDisplayProps> = ({
  uploadResult,
  onClose,
  onDelete
}) => {
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(uploadResult.downloadUrl).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => console.error('Could not copy text: ', err)
    );
  };
  
  const handleDelete = () => {
    onDelete(uploadResult.fileId);
    setShowDeleteConfirm(false);
  };

  const formatExpiryDate = (expiryTimestamp: number) => {
    const date = new Date(expiryTimestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRemainingDays = (expiryTimestamp: number) => {
    const now = new Date().getTime();
    const expiry = new Date(expiryTimestamp).getTime();
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStoragePath = () => {
    // Extract storage path information if available
    const storagePath = uploadResult.metadata?.storagePath;
    if (!storagePath) return 'Cloud Storage';
    
    // Try to extract the date-based folder name
    const pathParts = storagePath.split('/');
    if (pathParts.length >= 3) {
      const dateFolder = pathParts[2];
      
      // Check if the folder follows the dd-mm-yyyy format
      const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
      const match = dateFolder.match(dateRegex);
      
      if (match) {
        const [, day, month, year] = match;
        
        // Format month name
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = monthNames[parseInt(month, 10) - 1] || month;
        
        return `${monthName} ${day}, ${year}`;
      }
      
      return dateFolder; // Return the folder name if it doesn't match the expected format
    }
    
    return 'Cloud Storage';
  };

  const remainingDays = getRemainingDays(uploadResult.expiresAt);
  const storageDateInfo = getStoragePath();

  return (
    <>
      <Card sx={{ mb: 4, position: 'relative', borderRadius: 2, border: '1px solid', borderColor: 'success.main' }}>
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
        
        <CardContent sx={{ pt: 3, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CloudDone color="success" sx={{ mr: 1 }} />
            <Typography variant="h6" color="success.main">
              PDF Successfully Uploaded
            </Typography>
          </Box>
          
          <Alert severity="success" sx={{ mb: 2 }}>
            Your PDF has been uploaded to cloud storage and is available for download.
          </Alert>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Folder fontSize="small" color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Stored in: <strong>{storageDateInfo}</strong>
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Chip 
              icon={<CalendarToday fontSize="small" />}
              label={`Expires: ${formatExpiryDate(uploadResult.expiresAt)}`}
              size="small"
              color="primary"
              variant="outlined"
            />
            
            <Chip 
              icon={<Timer fontSize="small" />}
              label={`${remainingDays} days remaining`}
              size="small"
              color={remainingDays <= 7 ? 'warning' : 'default'}
              variant="outlined"
            />
            
            {uploadResult.isShared && (
              <Chip 
                icon={<ShareIcon fontSize="small" />}
                label="Shared"
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Download Link
            </Typography>
            
            <TextField
              fullWidth
              variant="outlined"
              value={uploadResult.downloadUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={copied ? "Copied!" : "Copy link"}>
                      <IconButton edge="end" onClick={handleCopyLink} size="small">
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setShowDeleteConfirm(true)}
              size="small"
            >
              Delete From Cloud
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={uploadResult.downloadUrl}
              target="_blank"
              startIcon={<Download />}
              size="small"
            >
              Download Now
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Delete PDF from Cloud Storage?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the PDF from cloud storage. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 