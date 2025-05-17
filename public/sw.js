// This is a placeholder service worker file
// It's being requested by the PWA plugin but we're using firebase-messaging-sw.js for notifications

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Forward to firebase-messaging-sw.js for messaging functionality
self.importScripts('./firebase-messaging-sw.js');
