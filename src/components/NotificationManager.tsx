import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Button, IconButton, Stack, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { initializeNotifications, requestNotificationPermission } from '../services/notification.service';

interface NotificationManagerProps {
  onTokenReceived?: (token: string) => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ onTokenReceived }) => {
  const [permissionState, setPermissionState] = useState<NotificationPermission | 'default'>('default');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' | 'error' }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Check notification permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return;
      }

      const permission = Notification.permission as NotificationPermission;
      setPermissionState(permission);

      // Show permission prompt if not decided yet
      if (permission === 'default') {
        setShowPermissionPrompt(true);
      } else if (permission === 'granted') {
        // Initialize notifications if permission is already granted
        initNotifications();
      }
    };

    checkPermission();
  }, []);

  // Initialize notifications and get FCM token
  const initNotifications = async () => {
    try {
      // Initializing notifications
      
      // Check if notification permission is already granted
      if (Notification.permission === 'granted') {
        // Notification permission already granted
      }
      
      const { token, unsubscribe } = await initializeNotifications((payload) => {
        // Handle foreground messages
        // Process foreground message
        if (payload.notification) {
          setNotification({
            open: true,
            message: payload.notification.body || 'New notification received',
            severity: 'info',
          });
        }
      });

      if (token) {
        // FCM token received
        setFcmToken(token);
        if (onTokenReceived) {
          onTokenReceived(token);
        }
        
        setNotification({
          open: true,
          message: 'Notifications enabled successfully',
          severity: 'success',
        });
      } else {
        // No FCM token received
        setNotification({
          open: true,
          message: 'Notification setup incomplete. Check console for details.',
          severity: 'warning',
        });
      }

      return unsubscribe;
    } catch (error) {
      // Error initializing notifications
      setNotification({
        open: true,
        message: 'Failed to enable notifications: ' + (error instanceof Error ? error.message : 'Unknown error'),
        severity: 'error',
      });
    }
  };

  // Request notification permission
  const requestPermission = async () => {
    const permissionGranted = await requestNotificationPermission();
    setPermissionState(permissionGranted ? 'granted' : 'denied');
    setShowPermissionPrompt(false);

    if (permissionGranted) {
      initNotifications();
    } else {
      setNotification({
        open: true,
        message: 'Notification permission denied',
        severity: 'warning',
      });
    }
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      {/* Permission Prompt */}
      <Snackbar
        open={showPermissionPrompt}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ width: '100%', maxWidth: '500px' }}
      >
        <Alert 
          severity="info" 
          sx={{ width: '100%' }}
          action={
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={() => setShowPermissionPrompt(false)}>
                Later
              </Button>
              <Button size="small" variant="contained" color="primary" onClick={requestPermission}>
                Enable
              </Button>
            </Stack>
          }
        >
          <Typography variant="body2">
            Enable notifications to stay updated with important events
          </Typography>
        </Alert>
      </Snackbar>

      {/* Notification Status */}
      {permissionState === 'granted' && (
        <IconButton color="primary" title="Notifications enabled">
          <NotificationsIcon />
        </IconButton>
      )}
      {permissionState === 'denied' && (
        <IconButton color="default" sx={{ color: 'text.disabled' }} title="Notifications disabled">
          <NotificationsOffIcon />
        </IconButton>
      )}

      {/* Notification Feedback */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationManager;
