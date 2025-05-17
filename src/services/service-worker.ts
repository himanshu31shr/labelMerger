/**
 * Service Worker Registration Utility
 * 
 * This module handles the registration of service workers,
 * including the Firebase messaging service worker.
 */

/**
 * Register the Firebase messaging service worker
 * @returns Promise<ServiceWorkerRegistration | null>
 */
export const registerFirebaseServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  try {
    if (!('serviceWorker' in navigator)) {
      // Service workers are not supported in this browser
      return null;
    }

    // Check if we're on HTTPS or localhost (required for service workers)
    const isSecureContext = window.isSecureContext || 
      window.location.protocol === 'https:' || 
      window.location.hostname === 'localhost';
    
    // Check if we're on ngrok
    const isNgrok = window.location.hostname.includes('ngrok');

    if (!isSecureContext && !isNgrok) {
      // Service workers require HTTPS, localhost, or ngrok
      return null;
    }

    // Check if we already have a matching service worker registration
    const existingRegistration = await navigator.serviceWorker.getRegistration('/');
    
    // The path to the service worker file
    const swPath = '/firebase-messaging-sw.js';
    
    // If we already have a registration with the correct scope, use it
    if (existingRegistration) {
      // Check if the service worker is already controlling the page
      if (navigator.serviceWorker.controller) {
        // Service worker is already active and controlling the page
        return existingRegistration;
      }
      
      // Force update the existing service worker
      await existingRegistration.update();
      return existingRegistration;
    }
    
    // Register the Firebase messaging service worker if no existing registration
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: '/',
      updateViaCache: 'none'
    });
    
    // Wait for the service worker to be activated
    if (registration.installing) {
      const installingWorker = registration.installing;
      await new Promise<void>((resolve) => {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'activated') {
            resolve();
          }
        });
      });
    }
    
    return registration;
  } catch (error) {
    // Error registering Firebase service worker
    return null;
  }
};

/**
 * Check if service workers are supported and available
 * @returns boolean
 */
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator && 
    (window.isSecureContext || 
     window.location.protocol === 'https:' || 
     window.location.hostname === 'localhost' ||
     window.location.hostname.includes('ngrok'));
};

/**
 * Get the current service worker registration
 * @returns Promise<ServiceWorkerRegistration | null>
 */
export const getServiceWorkerRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
  try {
    if (!isServiceWorkerSupported()) {
      return null;
    }
    
    const registration = await navigator.serviceWorker.getRegistration('/');
    return registration || null;
  } catch (error) {
    console.error('Error getting service worker registration:', error);
    return null;
  }
};
