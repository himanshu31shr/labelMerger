import { StorageService } from '../storage.service';
import { getAuth } from 'firebase/auth';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata
} from 'firebase/storage';
import { storage } from '../firebase.config';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/storage');
jest.mock('../firebase.config', () => ({
  storage: {
    ref: jest.fn()
  }
}));

// Define mock types with only the properties we need
interface MockUser {
  uid: string;
}

interface MockAuth {
  currentUser: MockUser | null;
}

interface MockStorageRef {
  fullPath: string;
}

interface MockUploadTask {
  ref: MockStorageRef;
}

describe('StorageService', () => {
  let storageService: StorageService;
  let mockAuth: MockAuth;
  let mockUser: MockUser;
  let mockStorageRef: MockStorageRef;
  let mockUploadTask: MockUploadTask;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create mock user
    mockUser = { uid: 'test-user-id' };
    
    // Setup auth mock
    mockAuth = {
      currentUser: mockUser
    };
    (getAuth as jest.Mock).mockReturnValue(mockAuth);
    
    // Setup storage reference mock
    mockStorageRef = {
      fullPath: 'test-path/file.pdf'
    };
    (ref as jest.Mock).mockReturnValue(mockStorageRef);
    
    // Setup upload task mock
    mockUploadTask = {
      ref: mockStorageRef
    };
    (uploadBytesResumable as jest.Mock).mockResolvedValue(mockUploadTask);
    (getDownloadURL as jest.Mock).mockResolvedValue('https://example.com/download-url');
    
    // Create service instance
    storageService = new StorageService();
  });

  describe('uploadFile', () => {
    it('should upload a file and return the download URL', async () => {
      // Arrange
      const file = new Blob(['test content'], { type: 'text/plain' });
      const path = 'test-path/file.txt';
      const metadata = {
        contentType: 'text/plain',
        customMetadata: {
          description: 'Test file'
        }
      };
      
      // Act
      const result = await storageService.uploadFile(file, path, metadata);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(uploadBytesResumable).toHaveBeenCalledWith(
        mockStorageRef,
        file,
        expect.objectContaining({
          contentType: 'text/plain',
          customMetadata: expect.objectContaining({
            userId: 'test-user-id',
            uploadedAt: expect.any(String),
            description: 'Test file'
          })
        })
      );
      expect(getDownloadURL).toHaveBeenCalledWith(mockStorageRef);
      expect(result).toBe('https://example.com/download-url');
    });

    it('should throw an error if user is not authenticated', async () => {
      // Arrange
      mockAuth.currentUser = null;
      const file = new Blob(['test content'], { type: 'text/plain' });
      const path = 'test-path/file.txt';
      
      // Act & Assert
      await expect(storageService.uploadFile(file, path)).rejects.toThrow(
        'User must be authenticated to upload files'
      );
    });
  });

  describe('getFileUrl', () => {
    it('should return the download URL for a file', async () => {
      // Arrange
      const path = 'test-path/file.txt';
      
      // Act
      const result = await storageService.getFileUrl(path);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(getDownloadURL).toHaveBeenCalledWith(mockStorageRef);
      expect(result).toBe('https://example.com/download-url');
    });
  });

  describe('deleteFile', () => {
    it('should delete a file from storage', async () => {
      // Arrange
      const path = 'test-path/file.txt';
      (deleteObject as jest.Mock).mockResolvedValue(undefined);
      
      // Act
      await storageService.deleteFile(path);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(deleteObject).toHaveBeenCalledWith(mockStorageRef);
    });
  });

  describe('listFiles', () => {
    it('should list all files in a directory', async () => {
      // Arrange
      const path = 'test-path';
      const mockItems = [
        { fullPath: 'test-path/file1.txt' },
        { fullPath: 'test-path/file2.txt' }
      ];
      (listAll as jest.Mock).mockResolvedValue({ items: mockItems });
      
      // Act
      const result = await storageService.listFiles(path);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(listAll).toHaveBeenCalledWith(mockStorageRef);
      expect(result).toEqual(['test-path/file1.txt', 'test-path/file2.txt']);
    });
  });

  describe('getFileMetadata', () => {
    it('should get metadata for a file', async () => {
      // Arrange
      const path = 'test-path/file.txt';
      const mockMetadata = {
        contentType: 'text/plain',
        customMetadata: {
          userId: 'test-user-id'
        }
      };
      (getMetadata as jest.Mock).mockResolvedValue(mockMetadata);
      
      // Act
      const result = await storageService.getFileMetadata(path);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(getMetadata).toHaveBeenCalledWith(mockStorageRef);
      expect(result).toEqual(mockMetadata);
    });
  });

  describe('updateFileMetadata', () => {
    it('should update metadata for a file', async () => {
      // Arrange
      const path = 'test-path/file.txt';
      const metadata = {
        description: 'Updated description',
        category: 'test'
      };
      const mockUpdatedMetadata = {
        contentType: 'text/plain',
        customMetadata: metadata
      };
      (updateMetadata as jest.Mock).mockResolvedValue(mockUpdatedMetadata);
      
      // Act
      const result = await storageService.updateFileMetadata(path, metadata);
      
      // Assert
      expect(ref).toHaveBeenCalledWith(storage, path);
      expect(updateMetadata).toHaveBeenCalledWith(mockStorageRef, {
        customMetadata: metadata
      });
      expect(result).toEqual(mockUpdatedMetadata);
    });
  });

  describe('generateFilePath', () => {
    it('should generate a unique file path', () => {
      // Arrange
      const directory = 'pdfs';
      const fileName = 'test file.pdf';
      const originalDateNow = Date.now;
      Date.now = jest.fn(() => 1234567890);
      
      // Act
      const result = storageService.generateFilePath(directory, fileName);
      
      // Assert
      expect(result).toBe('pdfs/test-user-id/1234567890_test_file.pdf');
      
      // Restore original Date.now
      Date.now = originalDateNow;
    });

    it('should throw an error if user is not authenticated', () => {
      // Arrange
      mockAuth.currentUser = null;
      const directory = 'pdfs';
      const fileName = 'test.pdf';
      
      // Act & Assert
      expect(() => storageService.generateFilePath(directory, fileName)).toThrow(
        'User must be authenticated to generate file paths'
      );
    });
  });
}); 