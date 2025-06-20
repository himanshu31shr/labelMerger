import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDoc, 
  getDocs,
  query, 
  where, 
  Timestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { CategorySortConfig } from '../utils/pdfSorting';
import { storageService } from './storage.service';
import { ref, uploadBytesResumable, getDownloadURL, updateMetadata } from 'firebase/storage';
import { storage } from './firebase.config';

/**
 * Configuration for PDF storage
 */
export interface StorageConfig {
  /** Number of days before the file should expire (1-90) */
  expiryDays: number;
  /** Whether access to the file should be restricted */
  restrictAccess: boolean;
  /** Whether the file can be shared with others */
  isShared: boolean;
  /** Visibility level for the file (private, organization, public) */
  visibility: 'private' | 'organization' | 'public';
  /** Optional description for the file */
  description?: string;
}

/**
 * Default storage configuration
 */
export const defaultStorageConfig: StorageConfig = {
  expiryDays: 30,
  restrictAccess: true,
  isShared: false,
  visibility: 'private'
};

/**
 * Metadata for stored PDF files
 */
export interface PdfMetadata {
  /** User ID of the uploader */
  userId: string;
  /** When the file was uploaded */
  uploadedAt: number;
  /** When the file will expire */
  expiresAt: number;
  /** Original file name */
  originalFileName: string;
  /** File size in bytes */
  fileSize: number;
  /** Whether access is restricted */
  restrictAccess: boolean;
  /** Whether the file is shared */
  isShared: boolean;
  /** Visibility level */
  visibility: string;
  /** Storage path in Firebase Storage */
  storagePath?: string;
  /** Optional statistics about the PDF content */
  stats?: {
    /** Number of categories in the file */
    categoryCount?: number;
    /** Number of products in the file */
    productCount?: number;
    /** Sort configuration used to generate the file */
    sortConfig?: CategorySortConfig;
  };
  /** User-provided description */
  description?: string;
}

/**
 * Result of a successful upload
 */
export interface UploadResult {
  /** Unique ID for the file */
  fileId: string;
  /** URL to download the file */
  downloadUrl: string;
  /** When the file will expire */
  expiresAt: number;
  /** Whether the file is shared */
  isShared: boolean;
  /** Access restrictions */
  restrictAccess: boolean;
  /** Metadata about the uploaded file */
  metadata: PdfMetadata;
  /** Success flag */
  success: boolean;
  /** Error message */
  error?: string;
}

/**
 * Service for managing PDF storage in Firebase
 */
class PdfStorageService {
  private readonly STORAGE_PATH = 'pdfs';
  private readonly COLLECTION_NAME = 'pdfs';
  
  /**
   * Generate a date-based folder name
   * 
   * @param userId - User ID for the file owner
   * @returns Path string in format "pdfs/userId/dd-mm-yyyy"
   */
  private generateDateBasedPath(userId: string): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    // Format as dd-mm-yyyy
    const dateFolder = `${day}-${month}-${year}`;
    
    return `${this.STORAGE_PATH}/${userId}/${dateFolder}`;
  }

  /**
   * Upload a PDF file to Firebase Storage
   * 
   * @param file - PDF file to upload (as Blob)
   * @param fileName - Name to use for the file
   * @param stats - Optional statistics about the PDF
   * @param config - Storage configuration options
   * @returns Promise with the upload result
   */
  async uploadPdf(
    file: Blob,
    fileName: string,
    stats: {
      categoryCount?: number;
      productCount?: number;
      sortConfig?: CategorySortConfig;
      description?: string;
    },
    config: StorageConfig = defaultStorageConfig
  ): Promise<UploadResult> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.error('Authentication error: No user is currently signed in');
        return {
          success: false,
          error: 'User must be authenticated to upload files',
          fileId: '',
          downloadUrl: '',
          expiresAt: 0,
          isShared: false,
          restrictAccess: true,
          metadata: {
            userId: '',
            uploadedAt: 0,
            expiresAt: 0,
            originalFileName: fileName,
            fileSize: 0,
            restrictAccess: true,
            isShared: false,
            visibility: 'private',
            description: ''
          }
        };
      }

      console.log('Starting PDF upload with auth user:', currentUser.uid);

      // Generate a unique file path with date-based folder structure
      const timestamp = Date.now();
      const userId = currentUser.uid;
      
      // Create date-based folder structure
      const dateBasedPath = this.generateDateBasedPath(userId);
      
      // Ensure we have a valid file name
      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const timePrefix = new Date().toISOString().replace(/[:.]/g, '-').substring(11, 19); // HH-MM-SS format
      const filePath = `${dateBasedPath}/${timePrefix}_${sanitizedFileName}`;
      
      console.log('Generated file path:', filePath);
      
      // Calculate expiry date
      const expiryDays = Math.max(1, Math.min(90, config.expiryDays)); // 1-90 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryDays);
      const expiresAt = expiryDate.getTime();
      
      // Prepare metadata for storage
      const customMetadata = {
        userId,
        fileId: '',  // Will be updated after Firestore document is created
        expiresAt: expiresAt.toString(),
        visibility: config.visibility || 'private',
        description: stats.description || config.description || ''
      };
      
      console.log('Uploading file with metadata:', customMetadata);
      
      // Create storage reference directly
      const storageRef = ref(storage, filePath);
      
      // Upload the file with metadata
      const uploadTask = await uploadBytesResumable(storageRef, file, {
        contentType: 'application/pdf',
        customMetadata
      });
      
      console.log('File uploaded successfully, getting download URL');
      
      // Get the download URL
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      
      // Create metadata
      const metadata: PdfMetadata = {
        userId,
        uploadedAt: timestamp,
        expiresAt,
        originalFileName: fileName,
        fileSize: file.size,
        restrictAccess: config.restrictAccess,
        isShared: config.isShared,
        visibility: config.visibility || 'private',
        storagePath: filePath,
        stats: {
          categoryCount: stats.categoryCount,
          productCount: stats.productCount,
          sortConfig: stats.sortConfig
        },
        description: stats.description || config.description
      };
      
      console.log('Storing metadata in Firestore');
      
      // Store metadata in Firestore
      const db = getFirestore();
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...metadata,
        storagePath: filePath,
        downloadUrl,
        uploadedAt: Timestamp.fromMillis(timestamp),
        expiresAt: Timestamp.fromMillis(expiresAt)
      });
      
      console.log('Metadata stored, updating storage metadata with file ID');
      
      // Update storage metadata with file ID
      await updateMetadata(storageRef, {
        customMetadata: {
          fileId: docRef.id
        }
      });
      
      console.log('Upload process completed successfully');
      
      return {
        fileId: docRef.id,
        downloadUrl,
        expiresAt,
        isShared: config.isShared,
        restrictAccess: config.restrictAccess,
        metadata,
        success: true
      };
    } catch (error) {
      console.error('Error uploading PDF:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during upload',
        fileId: '',
        downloadUrl: '',
        expiresAt: 0,
        isShared: false,
        restrictAccess: true,
        metadata: {
          userId: '',
          uploadedAt: 0,
          expiresAt: 0,
          originalFileName: fileName,
          fileSize: 0,
          restrictAccess: true,
          isShared: false,
          visibility: 'private',
          description: ''
        }
      };
    }
  }

  /**
   * Get details about a stored PDF
   * 
   * @param fileId - ID of the file to retrieve
   * @returns Promise with the file details
   */
  async getPdfDetails(fileId: string): Promise<UploadResult | null> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('User must be authenticated to view file details');
      }

      const db = getFirestore();
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      const data = docSnap.data();
      
      // Check if user has access
      if (data.userId !== currentUser.uid && data.visibility === 'private') {
        throw new Error('You do not have access to this file');
      }
      
      const metadata: PdfMetadata = {
        userId: data.userId,
        uploadedAt: data.uploadedAt.toMillis(),
        expiresAt: data.expiresAt.toMillis(),
        originalFileName: data.originalFileName,
        fileSize: data.fileSize,
        restrictAccess: data.restrictAccess,
        isShared: data.isShared,
        visibility: data.visibility,
        storagePath: data.storagePath,
        stats: data.stats,
        description: data.description
      };
      
      return {
        fileId,
        downloadUrl: data.downloadUrl,
        expiresAt: metadata.expiresAt,
        isShared: metadata.isShared,
        restrictAccess: metadata.restrictAccess,
        metadata,
        success: true
      };
    } catch (error) {
      console.error('Error retrieving PDF details:', error);
      throw error;
    }
  }

  /**
   * Delete a stored PDF file
   * 
   * @param fileId - ID of the file to delete
   * @returns Promise that resolves when the file is deleted
   */
  async deletePdf(fileId: string): Promise<void> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('User must be authenticated to delete files');
      }

      const db = getFirestore();
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('File not found');
      }
      
      const data = docSnap.data();
      
      // Check if user has permission to delete
      if (data.userId !== currentUser.uid) {
        throw new Error('You do not have permission to delete this file');
      }
      
      // Delete from storage
      await storageService.deleteFile(data.storagePath);
      
      // Delete from Firestore
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting PDF:', error);
      throw error;
    }
  }

  /**
   * Update the expiry date for a stored PDF
   * 
   * @param fileId - ID of the file to update
   * @param expiryDays - New number of days until expiry (1-90)
   * @returns Promise that resolves when the expiry is updated
   */
  async updatePdfExpiry(fileId: string, expiryDays: number): Promise<void> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('User must be authenticated to update files');
      }

      // Ensure expiryDays is within valid range
      const days = Math.max(1, Math.min(90, expiryDays));
      
      // Calculate new expiry date
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      const expiresAt = expiryDate.getTime();
      
      const db = getFirestore();
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('File not found');
      }
      
      const data = docSnap.data();
      
      // Check if user has permission to update
      if (data.userId !== currentUser.uid) {
        throw new Error('You do not have permission to update this file');
      }
      
      // Update Firestore
      await updateDoc(docRef, {
        expiresAt: Timestamp.fromMillis(expiresAt)
      });
      
      // Update storage metadata
      await storageService.updateFileMetadata(data.storagePath, {
        expiresAt: expiresAt.toString()
      });
    } catch (error) {
      console.error('Error updating PDF expiry:', error);
      throw error;
    }
  }

  /**
   * List all PDFs for the current user
   * 
   * @returns Promise with an array of PDF details
   */
  async listUserPdfs(): Promise<UploadResult[]> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('User must be authenticated to list files');
      }

      const db = getFirestore();
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', currentUser.uid)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return [];
      }
      
      const now = Date.now();
      const results: UploadResult[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const expiryTime = data.expiresAt.toMillis();
        
        // Skip expired files
        if (expiryTime < now) {
          return;
        }
        
        results.push({
          fileId: doc.id,
          downloadUrl: data.downloadUrl,
          expiresAt: expiryTime,
          isShared: data.isShared,
          restrictAccess: data.restrictAccess,
          metadata: {
            userId: data.userId,
            uploadedAt: data.uploadedAt.toMillis(),
            expiresAt: expiryTime,
            originalFileName: data.originalFileName,
            fileSize: data.fileSize,
            restrictAccess: data.restrictAccess,
            isShared: data.isShared,
            visibility: data.visibility,
            storagePath: data.storagePath,
            stats: data.stats,
            description: data.description
          },
          success: true
        });
      });
      
      // Sort by upload date, newest first
      return results.sort((a, b) => b.metadata.uploadedAt - a.metadata.uploadedAt);
    } catch (error) {
      console.error('Error listing PDFs:', error);
      throw error;
    }
  }

  /**
   * Check for expired files and delete them
   * 
   * @returns Promise with the number of files deleted
   */
  async cleanupExpiredFiles(): Promise<number> {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('User must be authenticated to clean up files');
      }

      const now = Date.now();
      const db = getFirestore();
      
      // Find expired files for current user
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', currentUser.uid),
        where('expiresAt', '<=', Timestamp.fromMillis(now))
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return 0;
      }
      
      // Delete each expired file
      let deletedCount = 0;
      for (const doc of snapshot.docs) {
        const data = doc.data();
        
        try {
          // Delete from storage
          await storageService.deleteFile(data.storagePath);
          
          // Delete from Firestore
          await deleteDoc(doc.ref);
          
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete expired file ${doc.id}:`, error);
        }
      }
      
      return deletedCount;
    } catch (error) {
      console.error('Error cleaning up expired files:', error);
      throw error;
    }
  }
}

export const pdfStorageService = new PdfStorageService(); 