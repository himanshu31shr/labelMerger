import { messaging } from './firebase.config';
import { getToken, onMessage, isSupported } from 'firebase/messaging';
import { auth } from './firebase.config';
import { saveToken, removeToken } from './token.service';
import { registerFirebaseServiceWorker, isServiceWorkerSupported } from './service-worker';

// Firebase Cloud Messaging Vapid Key
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'YOUR_VAPID_KEY';

/**
 * Request notification permission from the user
 * @returns Promise<boolean> - Whether permission was granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Register the FCM service worker
 * @returns Promise<ServiceWorkerRegistration | null>
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  return await registerFirebaseServiceWorker();
};

/**
 * Get FCM token and save it to Firestore
 * @returns Promise<string | null> - The FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    // Check if messaging is supported
    if (!messaging) {
      // Firebase messaging is not initialized
      return null;
    }
    
    const supported = await isSupported();
    if (!supported) {
      // Firebase messaging is not supported in this browser
      return null;
    }

    // Check if VAPID key is available
    if (!VAPID_KEY) {
      // VAPID key is missing
      // For development testing, use a default VAPID key
      // This is NOT recommended for production
      // Using a default VAPID key for development testing
      // Using Firebase's default public VAPID key for testing purposes
      // In production, you must use your own key from Firebase console
      const defaultVapidKey = 'BDCyGGDjOX-Y4gjOvG5My9QLKm7XGJYPUVHUgv3pM3MgFx_hVEhNxNn9x2xzz2W0SvLbzjVHLj_YSbMbxKB5VpM';
      
      try {
        const token = await getToken(messaging, { vapidKey: defaultVapidKey });
        if (token) {
          // Got token with default VAPID key
          return token;
        }
      } catch (error) {
        // Error getting token with default VAPID key
      }
      return null;
    }

    // Getting FCM token with VAPID key
    
    try {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      // FCM token retrieved
      
      if (currentToken) {
        // Save token to Firestore if user is authenticated
        const user = auth.currentUser;
        if (user) {
          // Saving token for user
          await saveToken(currentToken, user.uid);
        } else {
          // User not authenticated, token not saved to Firestore
        }
        
        // Save token to local storage as backup
        localStorage.setItem('fcmToken', currentToken);
        // Token saved to local storage
        
        return currentToken;
      } else {
        // No registration token available
        const permissionGranted = await requestNotificationPermission();
        if (permissionGranted) {
          return await getFCMToken(); // Try again after permission granted
        }
        return null;
      }
    } catch (tokenError) {
      // Error getting FCM token
      return null;
    }
  } catch (error) {
    // Error in getFCMToken
    return null;
  }
};

/**
 * Delete FCM token
 * @param token - The FCM token to delete
 * @returns Promise<boolean> - Whether the token was deleted successfully
 */
export const deleteFCMToken = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      return false;
    }
    
    // Remove token from Firestore
    const user = auth.currentUser;
    if (user) {
      await removeToken(token, user.uid);
    }
    
    // Remove token from local storage
    const storedToken = localStorage.getItem('fcmToken');
    if (storedToken === token) {
      localStorage.removeItem('fcmToken');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting FCM token:', error);
    return false;
  }
};

/**
 * Set up foreground message handler
 * @param callback - Function to call when message is received
 */
export const setupForegroundMessageHandler = (
  callback: (payload: any) => void
): (() => void) => {
  if (!messaging) {
    console.error('Firebase messaging is not supported in this browser');
    return () => {};
  }

  // Set up message handler
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    callback(payload);
    
    // Display notification if not handled by callback
    if (payload.notification) {
      const { title, body } = payload.notification;
      new Notification(title || 'New Notification', {
        body: body || '',
        icon: '/favicon.ico'
      });
    }
  });
  
  return unsubscribe;
};

/**
 * Initialize notifications
 * @returns Promise<{ token: string | null, unsubscribe: () => void }>
 */
export const initializeNotifications = async (
  onMessageCallback?: (payload: any) => void
): Promise<{ token: string | null, unsubscribe: () => void }> => {
  try {
    // Check if service workers are supported
    if (!isServiceWorkerSupported()) {
      console.warn('Service workers are not supported in this environment');
      return { token: null, unsubscribe: () => {} };
    }
    
    // Register service worker
    const registration = await registerServiceWorker();
    
    if (!registration) {
      console.warn('Failed to register service worker');
      return { token: null, unsubscribe: () => {} };
    }
    
    // Request permission and get token
    const permissionGranted = await requestNotificationPermission();
    let token = null;
    
    if (permissionGranted) {
      token = await getFCMToken();
      console.log('FCM token obtained:', token ? 'success' : 'failed');
    }
    
    // Set up foreground message handler
    const unsubscribe = onMessageCallback 
      ? setupForegroundMessageHandler(onMessageCallback)
      : () => {};
    
    return { token, unsubscribe };
  } catch (error) {
    console.error('Error initializing notifications:', error);
    return { token: null, unsubscribe: () => {} };
  }
};
