import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { initializeNotifications, requestNotificationPermission } from '../services/notification.service';

/**
 * NotificationTester component
 * 
 * This component allows testing of browser notifications without requiring a backend server.
 * It uses the native Notification API to display system notifications.
 */
const NotificationTester: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission || 'default'
  );
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Update permission state when component mounts
    setPermission(Notification.permission);

    // Check for stored FCM token
    const storedToken = localStorage.getItem('fcmToken');
    if (storedToken) {
      setFcmToken(storedToken);
    }
  }, []);

  const handleRequestPermission = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestNotificationPermission();
      setPermission(Notification.permission);

      if (result) {
        setSuccess('Notification permission granted!');
      } else {
        setError('Permission request was denied or failed');
      }
    } catch (err) {
      setError(`Error requesting permission: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInitializeNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initializing notifications
      const { token } = await initializeNotifications((payload) => {
        // Process foreground message
      });

      if (token) {
        setFcmToken(token);
        setSuccess('Successfully initialized notifications and received FCM token!');
      } else {
        setError('Failed to get FCM token');
      }
    } catch (err) {
      setError(`Error initializing notifications: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Notification Tester
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Current permission status: <strong>{permission}</strong>
        </Typography>

        {fcmToken && (
          <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>
            FCM Token: <code>{fcmToken.substring(0, 20)}...{fcmToken.substring(fcmToken.length - 20)}</code>
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestPermission}
          disabled={loading || permission === 'granted'}
        >
          {loading ? <CircularProgress size={24} /> : 'Request Notification Permission'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleInitializeNotifications}
          disabled={loading || permission !== 'granted'}
        >
          {loading ? <CircularProgress size={24} /> : 'Initialize Notifications'}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
        Note: This component uses the browser's native Notification API to show system notifications.
        It doesn't require a backend server to work.
      </Typography>
    </Paper>
  );
};

export default NotificationTester;
