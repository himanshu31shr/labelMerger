module.exports = function() {
  return {
    visitor: {
      MetaProperty(path) {
        if (path.node.meta.name === 'import' && path.node.property.name === 'meta') {
          const envObject = {
            VITE_FIREBASE_API_KEY: 'test-api-key',
            VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
            VITE_FIREBASE_PROJECT_ID: 'test-project-id',
            VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
            VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
            VITE_FIREBASE_APP_ID: 'test-app-id',
            VITE_FIREBASE_MEASUREMENT_ID: 'test-measurement-id'
          };

          path.replaceWithSourceString(`({
            env: ${JSON.stringify(envObject)}
          })`);
        }
      }
    }
  };
};