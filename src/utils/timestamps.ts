import { Timestamp } from 'firebase/firestore';

/**
 * Converts a Firebase Timestamp to a number (milliseconds since epoch)
 */
export const timestampToNumber = (timestamp: Timestamp | null): number | null => {
  if (!timestamp) return null;
  return timestamp.toMillis();
};

/**
 * Converts a number (milliseconds since epoch) to a Firebase Timestamp
 */
export const numberToTimestamp = (milliseconds: number | null): Timestamp | null => {
  if (!milliseconds) return null;
  return Timestamp.fromMillis(milliseconds);
};
