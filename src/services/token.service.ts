import { db, auth } from './firebase.config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

/**
 * Interface for FCM token document
 */
interface FCMTokenDocument {
  userId: string;
  tokens: string[];
  deviceInfo?: {
    [deviceId: string]: {
      token: string;
      lastActive: Date;
      platform?: string;
      browser?: string;
    }
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Save a new FCM token to Firestore
 * @param token - The FCM token to save
 * @param userId - The user ID associated with the token
 * @returns Promise<boolean> - Whether the token was saved successfully
 */
export const saveToken = async (token: string, userId: string): Promise<boolean> => {
  try {
    if (!token || !userId) {
      console.error('Token and userId are required');
      return false;
    }

    const tokenRef = doc(db, 'fcmTokens', userId);
    const tokenDoc = await getDoc(tokenRef);
    const deviceId = getDeviceId();
    const deviceInfo = getDeviceInfo();
    
    const tokenData = {
      token,
      lastActive: new Date(),
      platform: deviceInfo.platform,
      browser: deviceInfo.browser
    };

    if (tokenDoc.exists()) {
      // Update existing token document
      const data = tokenDoc.data() as FCMTokenDocument;
      const tokens = data.tokens || [];
      const deviceInfo = data.deviceInfo || {};
      
      // Add token to array if it doesn't exist
      if (!tokens.includes(token)) {
        await updateDoc(tokenRef, {
          tokens: arrayUnion(token),
          [`deviceInfo.${deviceId}`]: tokenData,
          updatedAt: new Date()
        });
      } else {
        // Just update the device info and last active time
        await updateDoc(tokenRef, {
          [`deviceInfo.${deviceId}`]: tokenData,
          updatedAt: new Date()
        });
      }
    } else {
      // Create new token document
      const newTokenDoc: FCMTokenDocument = {
        userId,
        tokens: [token],
        deviceInfo: {
          [deviceId]: tokenData
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(tokenRef, newTokenDoc);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving token:', error);
    return false;
  }
};

/**
 * Remove an FCM token from Firestore
 * @param token - The FCM token to remove
 * @param userId - The user ID associated with the token
 * @returns Promise<boolean> - Whether the token was removed successfully
 */
export const removeToken = async (token: string, userId?: string): Promise<boolean> => {
  try {
    // If userId is not provided, try to get it from the current user
    const uid = userId || auth.currentUser?.uid;
    
    if (!token || !uid) {
      console.error('Token and userId are required');
      return false;
    }
    
    const tokenRef = doc(db, 'fcmTokens', uid);
    const tokenDoc = await getDoc(tokenRef);
    
    if (tokenDoc.exists()) {
      const deviceId = getDeviceId();
      
      await updateDoc(tokenRef, {
        tokens: arrayRemove(token),
        [`deviceInfo.${deviceId}`]: null,
        updatedAt: new Date()
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

/**
 * Get all FCM tokens for a user
 * @param userId - The user ID
 * @returns Promise<string[]> - Array of FCM tokens
 */
export const getUserTokens = async (userId: string): Promise<string[]> => {
  try {
    if (!userId) {
      return [];
    }
    
    const tokenRef = doc(db, 'fcmTokens', userId);
    const tokenDoc = await getDoc(tokenRef);
    
    if (tokenDoc.exists()) {
      const data = tokenDoc.data() as FCMTokenDocument;
      return data.tokens || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting user tokens:', error);
    return [];
  }
};

/**
 * Get all FCM tokens for all users
 * @returns Promise<Record<string, string[]>> - Map of user IDs to token arrays
 */
export const getAllTokens = async (): Promise<Record<string, string[]>> => {
  try {
    const tokensSnapshot = await getDocs(collection(db, 'fcmTokens'));
    const result: Record<string, string[]> = {};
    
    tokensSnapshot.forEach(doc => {
      const data = doc.data() as FCMTokenDocument;
      result[doc.id] = data.tokens || [];
    });
    
    return result;
  } catch (error) {
    console.error('Error getting all tokens:', error);
    return {};
  }
};

/**
 * Get a unique device identifier
 * @returns string - Device ID
 */
export const getDeviceId = (): string => {
  // Try to get existing device ID from local storage
  let deviceId = localStorage.getItem('fcm_device_id');
  
  if (!deviceId) {
    // Generate a new device ID
    deviceId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('fcm_device_id', deviceId);
  }
  
  return deviceId;
};

/**
 * Get device information
 * @returns Object with platform and browser info
 */
export const getDeviceInfo = (): { platform: string; browser: string } => {
  const platform = navigator.platform || 'unknown';
  const userAgent = navigator.userAgent;
  
  let browser = 'unknown';
  
  if (userAgent.indexOf('Chrome') !== -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Safari') !== -1) {
    browser = 'Safari';
  } else if (userAgent.indexOf('Edge') !== -1 || userAgent.indexOf('Edg') !== -1) {
    browser = 'Edge';
  } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1) {
    browser = 'Internet Explorer';
  }
  
  return { platform, browser };
};
