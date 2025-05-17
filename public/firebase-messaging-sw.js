// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

// Firebase Messaging Service Worker

// This script will be loaded directly by the browser, so we need to use importScripts
// to load the Firebase scripts

// Log when the service worker is installed
self.addEventListener('install', event => {
  // Service worker installed
  self.skipWaiting(); // Ensure the service worker activates immediately
});

// Log when the service worker is activated
self.addEventListener('activate', event => {
  // Service worker activated
  // Claim clients immediately so the service worker starts controlling pages
  event.waitUntil(clients.claim());
});

// Get the Firebase config from the URL parameters if running on ngrok
const isNgrok = self.location.hostname.includes('ngrok');

// Log the hostname for debugging
// Running on hostname
// Check if running on ngrok

let firebaseConfig;

if (isNgrok) {
  // For ngrok, we need to get the config from the URL parameters
  const url = new URL(self.location.href);
  const configStr = url.searchParams.get('firebaseConfig');
  
  if (configStr) {
    try {
      firebaseConfig = JSON.parse(decodeURIComponent(configStr));
      // Using Firebase config from URL parameters
    } catch (e) {
      // Error parsing Firebase config from URL
    }
  } else {
    // No Firebase config found in URL parameters
  }
}

// If no config was found in URL parameters or we're not on ngrok, use the hardcoded config
if (!firebaseConfig) {
  // For normal operation, use the hardcoded config
  firebaseConfig = {
    apiKey: "AIzaSyDlqkIWtxkpgJJkBOIhzGZpQ1kWfWCLJKw",
    authDomain: "sacred-sutra.firebaseapp.com",
    projectId: "sacred-sutra",
    storageBucket: "sacred-sutra.appspot.com",
    messagingSenderId: "676199421158",
    appId: "1:676199421158:web:5c0b1b0e0e0a0e0e0e0a0e"
  };
  // Using hardcoded Firebase config
}

// Add a try-catch block to handle potential errors with importScripts
try {
  importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
  // Firebase scripts loaded successfully
} catch (e) {
  // Error loading Firebase scripts
}

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

// Make sure Firebase is available before initializing
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    // Firebase initialized successfully
    
    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();
    // Firebase messaging initialized
  } catch (e) {
    // Error initializing Firebase
  }
} else {
  // Firebase is not defined
}

// Handle background messages if messaging is available
if (typeof firebase !== 'undefined' && firebase.messaging) {
  try {
    const messaging = firebase.messaging();
    
    messaging.onBackgroundMessage((payload) => {
      // Received background message
      
      // Customize notification here
      const notificationTitle = payload.notification?.title || 'New Notification';
      const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: payload.data || {}
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
    
    // Background message handler registered
  } catch (e) {
    // Error setting up background message handler
  }
}

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  // Notification click event
  
  event.notification.close();
  
  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((clientList) => {
      // If a tab is open, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
