import { 
  getDownloadURL, 
  ref, 
  uploadBytesResumable, 
  deleteObject,
  listAll,
  updateMetadata,
  getMetadata,
  UploadMetadata,
  FullMetadata
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { storage } from './firebase.config';

/**
 * Service for managing file storage in Firebase
 */
export class StorageService {
  /**
   * Upload a file to Firebase Storage
   * 
   * @param file - File to upload
   * @param path - Path in storage where the file should be saved
   * @param metadata - Optional metadata for the file
   * @returns Promise with the download URL
   */
  async uploadFile(
    file: File | Blob,
    path: string,
    metadata?: UploadMetadata
  ): Promise<string> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.error('Authentication error: No user is currently signed in');
        throw new Error('User must be authenticated to upload files');
      }

      // Create storage reference
      const storageRef = ref(storage, path);
      
      // Ensure we have valid metadata
      const metadataToUse = {
        ...metadata,
        customMetadata: {
          userId: currentUser.uid,
          uploadedAt: Date.now().toString(),
          ...metadata?.customMetadata
        }
      };
      
      // Upload the file with metadata
      const uploadTask = await uploadBytesResumable(storageRef, file, metadataToUse);
      
      // Get the download URL
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Download a file from Firebase Storage
   * 
   * @param path - Path to the file in storage
   * @returns Promise with the download URL
   */
  async getFileUrl(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }

  /**
   * Delete a file from Firebase Storage
   * 
   * @param path - Path to the file in storage
   * @returns Promise that resolves when the file is deleted
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * List all files in a directory
   * 
   * @param path - Path to the directory in storage
   * @returns Promise with an array of file paths
   */
  async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      
      // Return the list of file paths
      return result.items.map(item => item.fullPath);
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  /**
   * Get metadata for a file
   * 
   * @param path - Path to the file in storage
   * @returns Promise with the file metadata
   */
  async getFileMetadata(path: string): Promise<FullMetadata> {
    try {
      const storageRef = ref(storage, path);
      const metadata = await getMetadata(storageRef);
      return metadata;
    } catch (error) {
      console.error('Error getting file metadata:', error);
      throw error;
    }
  }

  /**
   * Update metadata for a file
   * 
   * @param path - Path to the file in storage
   * @param metadata - New metadata to apply
   * @returns Promise with the updated metadata
   */
  async updateFileMetadata(
    path: string,
    metadata: { [key: string]: string }
  ): Promise<FullMetadata> {
    try {
      const storageRef = ref(storage, path);
      
      // Update only the custom metadata
      const updatedMetadata = await updateMetadata(storageRef, {
        customMetadata: metadata
      });
      
      return updatedMetadata;
    } catch (error) {
      console.error('Error updating file metadata:', error);
      throw error;
    }
  }

  /**
   * Generate a unique file path for storage
   * 
   * @param directory - Directory in storage
   * @param fileName - Name of the file
   * @returns Unique storage path
   */
  generateFilePath(directory: string, fileName: string): string {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error('Authentication error: No user is currently signed in');
      throw new Error('User must be authenticated to generate file paths');
    }
    
    const userId = currentUser.uid;
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    return `${directory}/${userId}/${timestamp}_${sanitizedFileName}`;
  }

  /**
   * Check if a user is authenticated
   * 
   * @returns True if a user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    const auth = getAuth();
    return !!auth.currentUser;
  }
}

export const storageService = new StorageService(); 