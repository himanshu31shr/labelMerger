import { timestampToNumber, numberToTimestamp } from '../timestamps';

// Mock firebase/firestore
jest.mock('firebase/firestore', () => ({
  Timestamp: {
    fromMillis: jest.fn((millis: number) => ({
      toMillis: () => millis,
      seconds: Math.floor(millis / 1000),
      nanoseconds: (millis % 1000) * 1000000
    })),
    now: jest.fn(() => ({
      toMillis: () => Date.now(),
      seconds: Math.floor(Date.now() / 1000),
      nanoseconds: (Date.now() % 1000) * 1000000
    }))
  }
}));

import { Timestamp } from 'firebase/firestore';

describe('Timestamp utilities', () => {
  describe('timestampToNumber', () => {
    it('should convert Timestamp to number', () => {
      const now = Date.now();
      const timestamp = Timestamp.fromMillis(now);
      expect(timestampToNumber(timestamp)).toBe(now);
    });

    it('should handle null input', () => {
      expect(timestampToNumber(null)).toBeNull();
    });
  });

  describe('numberToTimestamp', () => {
    it('should convert number to Timestamp', () => {
      const now = Date.now();
      const timestamp = numberToTimestamp(now);
      expect(timestamp?.toMillis()).toBe(now);
    });

    it('should handle null input', () => {
      expect(numberToTimestamp(null)).toBeNull();
    });
  });
});
