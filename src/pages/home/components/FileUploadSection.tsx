import React, { ChangeEvent } from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { FileInput } from '../file-input';
import { CloudUpload } from '@mui/icons-material';

interface FileUploadSectionProps {
  amazonFile?: File;
  flipkartFile?: File;
  onAmazonChange: (file: File | undefined) => void;
  onFlipkartChange: (file: File | undefined) => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  amazonFile,
  flipkartFile,
  onAmazonChange,
  onFlipkartChange,
}) => {
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
            }
          }}
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
                  color: (theme) => amazonFile 
                    ? theme.palette.success.main 
                    : theme.palette.primary.main
                }} 
              />
              <Typography variant="h6" gutterBottom>
                Amazon Label
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {amazonFile ? amazonFile.name : 'Upload your Amazon shipping label (PDF)'}
              </Typography>
              <FileInput
                accepts="application/pdf"
                name="amazon"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    onAmazonChange(e.target.files[0]);
                  }
                }}
                selected={!!amazonFile}
              />
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
            }
          }}
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
                  color: (theme) => flipkartFile 
                    ? theme.palette.success.main 
                    : theme.palette.primary.main
                }} 
              />
              <Typography variant="h6" gutterBottom>
                Flipkart Label
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {flipkartFile ? flipkartFile.name : 'Upload your Flipkart shipping label (PDF)'}
              </Typography>
              <FileInput
                accepts="application/pdf"
                name="flipkart"
                selected={!!flipkartFile}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    onFlipkartChange(e.target.files[0]);
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};