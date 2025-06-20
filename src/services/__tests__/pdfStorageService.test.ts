import { getAuth } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, updateMetadata } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { pdfStorageService } from '../pdfStorageService';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/storage');
jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    Timestamp: {
      fromMillis: jest.fn().mockReturnValue({
        toMillis: () => 1624444444444
      })
    }
  };
});

describe('PdfStorageService', () => {
  const mockAuth = {
    currentUser: {
      uid: 'test-user-id'
    }
  };
  const mockStorageRef = {};
  const mockUploadResult = {
    ref: {},
    metadata: {
      size: 1024
    }
  };
  const mockDownloadURL = 'https://example.com/test.pdf';
  const mockDocRef = {
    id: 'test-doc-id'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock Firebase Auth
    (getAuth as jest.Mock).mockReturnValue(mockAuth);
    
    // Mock Firebase Storage
    (ref as jest.Mock).mockReturnValue(mockStorageRef);
    (uploadBytesResumable as jest.Mock).mockResolvedValue(mockUploadResult);
    (getDownloadURL as jest.Mock).mockResolvedValue(mockDownloadURL);
    (updateMetadata as jest.Mock).mockResolvedValue({});
    
    // Mock Firestore
    (addDoc as jest.Mock).mockResolvedValue(mockDocRef);
    (collection as jest.Mock).mockReturnValue('mock-collection');
  });

  describe('uploadPdf', () => {
    it('should upload a PDF file successfully', async () => {
      // Arrange
      const file = new Blob(['test content'], { type: 'application/pdf' });
      const fileName = 'test.pdf';
      const stats = {
        categoryCount: 5,
        productCount: 10
      };
      
      // Act
      const result = await pdfStorageService.uploadPdf(file, fileName, stats);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.fileId).toBe(mockDocRef.id);
      expect(result.downloadUrl).toBe(mockDownloadURL);
      expect(uploadBytesResumable).toHaveBeenCalled();
      expect(addDoc).toHaveBeenCalled();
    });

    it('should handle authentication error', async () => {
      // Arrange
      (getAuth as jest.Mock).mockReturnValue({ currentUser: null });
      const file = new Blob(['test content'], { type: 'application/pdf' });
      const fileName = 'test.pdf';
      
      // Act
      const result = await pdfStorageService.uploadPdf(file, fileName, {});
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('User must be authenticated');
      expect(uploadBytesResumable).not.toHaveBeenCalled();
    });

    it('should handle upload error', async () => {
      // Arrange
      const errorMessage = 'Upload failed';
      (uploadBytesResumable as jest.Mock).mockRejectedValue(new Error(errorMessage));
      const file = new Blob(['test content'], { type: 'application/pdf' });
      const fileName = 'test.pdf';
      
      // Act
      const result = await pdfStorageService.uploadPdf(file, fileName, {});
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });

  describe('generateDateBasedPath', () => {
    it('should generate a path with the correct format', () => {
      // Mock the date
      const realDate = Date;
      const mockDate = new Date(2024, 11, 24); // December 24, 2024
      
      // Use a proper type for the global Date constructor
      global.Date = class extends realDate {
        constructor() {
          super();
          return mockDate;
        }
        
        toISOString() {
          return '2024-12-24T18:30:00.000Z';
        }
      } as unknown as typeof Date;
      
      // Use private method testing technique - we can't directly test private methods
      // Instead, we'll test the behavior through the uploadPdf method
      const file = new Blob(['test content'], { type: 'application/pdf' });
      pdfStorageService.uploadPdf(file, 'test.pdf', {});
      
      // Check that the ref function was called with a path containing the expected date format
      expect(ref).toHaveBeenCalledWith(expect.anything(), expect.stringContaining('24-12-2024'));
      
      // Restore original Date
      global.Date = realDate;
    });
  });
}); 