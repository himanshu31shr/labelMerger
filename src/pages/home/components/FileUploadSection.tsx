import React, { ChangeEvent, DragEvent, useState } from 'react';
import { Card, CardContent, Grid, Typography, Box, Chip, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { FileInput } from '../file-input';
import { CloudUpload, Delete } from '@mui/icons-material';

interface FileUploadSectionProps {
  amazonFiles: File[];
  flipkartFiles: File[];
  onAmazonAdd: (file: File) => void;
  onFlipkartAdd: (file: File) => void;
  onAmazonRemove: (index: number) => void;
  onFlipkartRemove: (index: number) => void;
  onAmazonClear: () => void;
  onFlipkartClear: () => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  amazonFiles,
  flipkartFiles,
  onAmazonAdd,
  onFlipkartAdd,
  onAmazonRemove,
  onFlipkartRemove,
  onAmazonClear,
  onFlipkartClear,
}) => {
  const [amazonDragActive, setAmazonDragActive] = useState(false);
  const [flipkartDragActive, setFlipkartDragActive] = useState(false);

  // Handle Amazon file change
  const handleAmazonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        onAmazonAdd(files[i]);
      }
    }
  };

  // Handle Flipkart file change
  const handleFlipkartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        onFlipkartAdd(files[i]);
      }
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>, setDragActive: (active: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, setDragActive: (active: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, onFileAdd: (file: File) => void, setDragActive: (active: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type === 'application/pdf') {
          onFileAdd(files[i]);
        }
      }
    }
  };

  // Render file list for a specific type (Amazon or Flipkart)
  const renderFileList = (files: File[], onRemove: (index: number) => void, onClear: () => void) => {
    if (files.length === 0) return null;

    return (
      <Box sx={{ mt: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {files.length} {files.length === 1 ? 'file' : 'files'} selected
          </Typography>
          {files.length > 1 && (
            <Chip 
              label="Clear All" 
              size="small" 
              color="error" 
              variant="outlined" 
              onClick={onClear}
            />
          )}
        </Box>
        
        <List dense sx={{ maxHeight: '150px', overflow: 'auto', bgcolor: 'background.paper', borderRadius: 1 }}>
          {files.map((file, index) => (
            <ListItem
              key={`${file.name}-${index}`}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" size="small" onClick={() => onRemove(index)}>
                  <Delete fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024).toFixed(1)} KB`}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card 
          variant="outlined" 
          sx={{ 
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) => theme.palette.mode === 'dark' 
                ? '0 4px 8px rgba(0,0,0,0.3)' 
                : '0 4px 8px rgba(33,150,243,0.15)',
            },
            ...(amazonDragActive && {
              border: '2px dashed',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(33, 150, 243, 0.04)'
            })
          }}
          onDragOver={(e) => handleDragOver(e, setAmazonDragActive)}
          onDragLeave={(e) => handleDragLeave(e, setAmazonDragActive)}
          onDrop={(e) => handleDrop(e, onAmazonAdd, setAmazonDragActive)}
        >
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: 3,
              textAlign: 'center'
            }}>
              <CloudUpload 
                sx={{ 
                  fontSize: 48, 
                  mb: 2,
                  color: (theme) => amazonFiles.length > 0
                    ? theme.palette.success.main 
                    : amazonDragActive
                      ? theme.palette.primary.main
                      : theme.palette.primary.main
                }} 
              />
              <Typography variant="h6" gutterBottom>
                Amazon Labels
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {amazonFiles.length > 0 
                  ? `${amazonFiles.length} Amazon file${amazonFiles.length !== 1 ? 's' : ''} selected`
                  : amazonDragActive
                    ? 'Drop PDF files here'
                    : 'Upload or drop Amazon shipping labels (PDF)'}
              </Typography>
              <FileInput
                accepts="application/pdf"
                name="amazon"
                onChange={handleAmazonChange}
                selected={amazonFiles.length > 0}
                fileCount={amazonFiles.length}
                multiple={true}
              />
              {renderFileList(amazonFiles, onAmazonRemove, onAmazonClear)}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card 
          variant="outlined" 
          sx={{ 
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) => theme.palette.mode === 'dark' 
                ? '0 4px 8px rgba(0,0,0,0.3)' 
                : '0 4px 8px rgba(33,150,243,0.15)',
            },
            ...(flipkartDragActive && {
              border: '2px dashed',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(33, 150, 243, 0.04)'
            })
          }}
          onDragOver={(e) => handleDragOver(e, setFlipkartDragActive)}
          onDragLeave={(e) => handleDragLeave(e, setFlipkartDragActive)}
          onDrop={(e) => handleDrop(e, onFlipkartAdd, setFlipkartDragActive)}
        >
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: 3,
              textAlign: 'center'
            }}>
              <CloudUpload 
                sx={{ 
                  fontSize: 48, 
                  mb: 2,
                  color: (theme) => flipkartFiles.length > 0 
                    ? theme.palette.success.main 
                    : flipkartDragActive
                      ? theme.palette.primary.main
                      : theme.palette.primary.main
                }} 
              />
              <Typography variant="h6" gutterBottom>
                Flipkart Labels
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {flipkartFiles.length > 0 
                  ? `${flipkartFiles.length} Flipkart file${flipkartFiles.length !== 1 ? 's' : ''} selected`
                  : flipkartDragActive
                    ? 'Drop PDF files here'
                    : 'Upload or drop Flipkart shipping labels (PDF)'}
              </Typography>
              <FileInput
                accepts="application/pdf"
                name="flipkart"
                selected={flipkartFiles.length > 0}
                fileCount={flipkartFiles.length}
                multiple={true}
                onChange={handleFlipkartChange}
              />
              {renderFileList(flipkartFiles, onFlipkartRemove, onFlipkartClear)}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};