import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { RefreshOutlined, BugReportOutlined } from '@mui/icons-material';
import monitoringService from '../services/monitoring.service';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to our monitoring service
    const errorId = this.generateErrorId();
    
    monitoringService.captureError({
      message: error.message,
      stack: error.stack,
      severity: 'high',
      tags: {
        errorBoundary: 'true',
        componentStack: 'true'
      },
      context: {
        errorId,
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
        props: this.props,
        state: this.state
      }
    });

    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Track error event
    monitoringService.trackEvent('error_boundary_triggered', {
      errorId,
      errorMessage: error.message,
      componentStack: errorInfo.componentStack
    });
  }

  private generateErrorId(): string {
    return `error_boundary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            padding: 3
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              padding: 4, 
              maxWidth: 600, 
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <BugReportOutlined 
              sx={{ 
                fontSize: 64, 
                color: 'error.main', 
                marginBottom: 2 
              }} 
            />
            
            <Typography variant="h4" gutterBottom color="error">
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" paragraph color="text.secondary">
              We&apos;ve encountered an unexpected error. Our team has been notified and is working on a fix.
            </Typography>

            {this.state.errorId && (
              <Alert severity="info" sx={{ marginBottom: 3, textAlign: 'left' }}>
                <Typography variant="body2">
                  <strong>Error ID:</strong> {this.state.errorId}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Please include this ID when reporting the issue to our support team.
                </Typography>
              </Alert>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ marginBottom: 3, textAlign: 'left' }}>
                <Typography variant="h6" color="error" gutterBottom>
                  Development Error Details:
                </Typography>
                <Paper sx={{ padding: 2, backgroundColor: 'grey.100' }}>
                  <Typography variant="body2" component="pre" sx={{ 
                    fontSize: '0.8rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {'\n\nStack Trace:\n'}
                        {this.state.error.stack}
                      </>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <>
                        {'\n\nComponent Stack:\n'}
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                  </Typography>
                </Paper>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={this.handleRetry}
                startIcon={<RefreshOutlined />}
              >
                Try Again
              </Button>
              
              <Button
                variant="outlined"
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </Box>

            <Typography variant="body2" sx={{ marginTop: 3, color: 'text.secondary' }}>
              If the problem persists, please contact our support team.
            </Typography>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 