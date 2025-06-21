import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  useTheme,
  Button,
  Stack
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { FileInfo, pdfStorageService } from '../../../services/pdfStorageService';

// Utility function for formatting file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface TodaysFilesWidgetProps {
  /** Optional callback when refresh button is clicked */
  onRefresh?: () => void;
}

export const TodaysFilesWidget: React.FC<TodaysFilesWidgetProps> = ({ onRefresh }) => {
  const theme = useTheme();
  
  // State management
  const [todaysFiles, setTodaysFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todaysDate, setTodaysDate] = useState<string>('');

  // Load today's files
  const loadTodaysFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get today's date string
      const dateString = pdfStorageService.getTodaysDateString();
      setTodaysDate(dateString);
      
      // Load today's files
      const files = await pdfStorageService.listTodaysFiles();
      setTodaysFiles(files);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load today&apos;s files';
      setError(errorMessage);
      console.error('Error loading today&apos;s files:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file download
  const handleFileDownload = (file: FileInfo) => {
    window.open(file.downloadUrl, '_blank');
  };

  // Handle refresh
  const handleRefresh = () => {
    loadTodaysFiles();
    onRefresh?.();
  };

  // Initialize on component mount
  useEffect(() => {
    loadTodaysFiles();
  }, []);

  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 3,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 2
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon color="primary" />
            <Typography variant="h6" component="h2">
              Today&apos;s Files
            </Typography>
            <Chip 
              label={todaysDate} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
          <IconButton onClick={handleRefresh} disabled={loading} size="small">
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Loading state */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* Error state */}
        {error && !loading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* No files state */}
        {!loading && !error && todaysFiles.length === 0 && (
          <Alert severity="info">
            No files available for download today ({todaysDate}). Upload some PDFs to see them here!
          </Alert>
        )}

        {/* Files grid */}
        {!loading && !error && todaysFiles.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {todaysFiles.length} file{todaysFiles.length !== 1 ? 's' : ''} available for download
            </Typography>
            
            <Grid container spacing={2}>
              {todaysFiles.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.path}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                        <PdfIcon color="error" sx={{ mt: 0.5, flexShrink: 0 }} />
                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              wordBreak: 'break-word',
                              lineHeight: 1.2,
                              fontSize: '0.875rem'
                            }}
                          >
                            {file.name}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Stack spacing={0.5}>
                        <Chip 
                          label={formatFileSize(file.size)} 
                          size="small" 
                          variant="outlined"
                          sx={{ width: 'fit-content' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatRelativeTime(file.lastModified)}
                        </Typography>
                      </Stack>
                    </CardContent>
                    
                    <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
                      <Button
                        startIcon={<DownloadIcon />}
                        onClick={() => handleFileDownload(file)}
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
}; 