import { db } from './firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserTokens, getAllTokens } from './token.service';

/**
 * Interface for notification payload
 */
export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  imageUrl?: string;
  clickAction?: string;
  data?: Record<string, string>;
}

/**
 * Send notification to a specific user
 * @param userId - The user ID to send notification to
 * @param notification - The notification payload
 * @returns Promise<boolean> - Whether the notification was sent successfully
 */
export const sendNotificationToUser = async (
  userId: string,
  notification: NotificationPayload
): Promise<boolean> => {
  try {
    // Get user's FCM tokens
    const tokens = await getUserFCMTokens(userId);
    
    if (!tokens || tokens.length === 0) {
      console.error('No FCM tokens found for user:', userId);
      return false;
    }
    
    // Send notification to all user tokens
    const results = await Promise.all(
      tokens.map((token: string) => sendNotificationToToken(token, notification))
    );
    
    // Return true if at least one notification was sent successfully
    return results.some(result => result);
  } catch (error) {
    console.error('Error sending notification to user:', error);
    return false;
  }
};

/**
 * Send notification to all users
 * @param notification - The notification payload
 * @returns Promise<number> - Number of users the notification was sent to
 */
export const sendNotificationToAllUsers = async (
  notification: NotificationPayload
): Promise<number> => {
  try {
    // Get all FCM tokens
    const tokensSnapshot = await getDocs(collection(db, 'fcmTokens'));
    let successCount = 0;
    
    // Send notification to each user
    for (const doc of tokensSnapshot.docs) {
      const data = doc.data();
      const tokens = data.tokens || [];
      
      if (tokens.length > 0) {
        const results = await Promise.all(
          tokens.map((token: string) => sendNotificationToToken(token, notification))
        );
        
        // Count success
        if (results.some(result => result)) {
          successCount++;
        }
      }
    }
    
    return successCount;
  } catch (error) {
    console.error('Error sending notification to all users:', error);
    return 0;
  }
};

/**
 * Send notification to users matching a specific condition
 * @param fieldPath - The field path to filter on
 * @param opStr - The comparison operator
 * @param value - The value to compare against
 * @param notification - The notification payload
 * @returns Promise<number> - Number of users the notification was sent to
 */
export const sendNotificationToFilteredUsers = async (
  fieldPath: string,
  opStr: WhereFilterOp,
  value: any,
  notification: NotificationPayload
): Promise<number> => {
  try {
    // Query users based on the filter
    const usersQuery = query(collection(db, 'users'), where(fieldPath, opStr, value));
    const usersSnapshot = await getDocs(usersQuery);
    let successCount = 0;
    
    // Send notification to each matching user
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const success = await sendNotificationToUser(userId, notification);
      
      if (success) {
        successCount++;
      }
    }
    
    return successCount;
  } catch (error) {
    console.error('Error sending notification to filtered users:', error);
    return 0;
  }
};

/**
 * Get FCM tokens for a specific user
 * @param userId - The user ID
 * @returns Promise<string[]> - Array of FCM tokens
 */
export const getUserFCMTokens = async (userId: string): Promise<string[]> => {
  return await getUserTokens(userId);
};

/**
 * Send notification to a specific FCM token
 * @param token - The FCM token
 * @param notification - The notification payload
 * @returns Promise<boolean> - Whether the notification was sent successfully
 */
export const sendNotificationToToken = async (
  token: string,
  notification: NotificationPayload
): Promise<boolean> => {
  try {
    // Prepare the FCM message
    const message = {
      to: token,
      notification: {
        title: notification.title,
        body: notification.body,
        icon: notification.icon || '/favicon.ico',
        image: notification.imageUrl,
        click_action: notification.clickAction || '/'
      },
      data: notification.data || {}
    };
    
    // Check if server key is available
    const serverKey = import.meta.env.VITE_FIREBASE_SERVER_KEY;
    if (!serverKey) {
      console.error('FCM Server Key is missing. Add VITE_FIREBASE_SERVER_KEY to your .env.local file');
      return false;
    }

    console.log('Sending notification to token:', token.substring(0, 10) + '...');
    
    // Send the message using Firebase Cloud Messaging REST API
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${serverKey}`
        },
        body: JSON.stringify(message)
      });
      
      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse FCM response:', responseText);
        return false;
      }
      
      if (!response.ok) {
        console.error('FCM API error:', responseData);
        console.error('Status code:', response.status);
        return false;
      }
      
      console.log('FCM API response:', responseData);
      return responseData.success === 1;
    } catch (fetchError) {
      console.error('Network error sending notification:', fetchError);
      return false;
    }
    
  } catch (error) {
    console.error('Error sending notification to token:', error);
    return false;
  }
};

// Type for Firebase where filter operations
type WhereFilterOp = 
  | '<' 
  | '<=' 
  | '==' 
  | '!=' 
  | '>=' 
  | '>' 
  | 'array-contains' 
  | 'array-contains-any' 
  | 'in' 
  | 'not-in';
