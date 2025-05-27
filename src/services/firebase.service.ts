import { FirebaseError } from 'firebase/app';
import {
  Firestore,
  FirestoreError,
  QueryConstraint,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
  getDocs,
  query,
  setDoc,
  updateDoc,
  writeBatch,
  DocumentData,
  WriteBatch,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export class FirebaseService {
  protected db: Firestore;
  private static persistenceEnabled = false;

  constructor() {
    this.db = db;
    this.enableOfflinePersistence();
  }

  private async enableOfflinePersistence() {
    if (!FirebaseService.persistenceEnabled) {
      // Only enable persistence in production or non-development environments
      if (process.env.NODE_ENV !== 'development') {
        console.info("Enabling offline persistence")
        try {
          await enableIndexedDbPersistence(this.db);
          FirebaseService.persistenceEnabled = true;
          console.log('Offline persistence enabled');
        } catch (err) {
          if ((err as FirestoreError).code === 'failed-precondition') {
            console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
          } else if ((err as FirestoreError).code === 'unimplemented') {
            console.warn('The current browser does not support persistence.');
          }
        }
      }
    }
  }

  protected handleError(error: unknown, context: string, shouldRetry = false): never {
    if (error instanceof FirebaseError) {
      if (error.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (error.code === 'unimplemented') {
        console.warn('The current browser does not support persistence');
      } else {
        console.error(`Firebase error in ${context}:`, {
          code: error.code,
          message: error.message,
          shouldRetry,
        });
      }
    } else if (error instanceof Error) {
      console.error(`Error in ${context}:`, error.message);
    }
    throw error;
  }

  private validateFirestoreData(data: DocumentData): void {
    const validateValue = (value: unknown, path: string): void => {
      if (value === undefined) {
        throw new Error(`Undefined value not allowed in Firestore at path: ${path}`);
      }
      
      if (typeof value === 'function') {
        throw new Error(`Function values not allowed in Firestore at path: ${path}`);
      }
      
      if (value && typeof value === 'object' && !Object.prototype.hasOwnProperty.call(value, 'constructor')) {
        throw new Error(`Objects without constructor not allowed in Firestore at path: ${path}`);
      }
      
      if (value && typeof value === 'object' && value.constructor === Object) {
        const objValue = value as Record<string, unknown>;
        Object.keys(objValue).forEach(key => {
          validateValue(objValue[key], `${path}.${key}`);
        });
      }
      
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          validateValue(item, `${path}[${index}]`);
        });
      }
    };

    Object.keys(data).forEach(key => {
      validateValue(data[key], key);
    });
  }

  protected async getDocuments<T extends DocumentData>(
    collectionName: string,
    queryConstraints: QueryConstraint[] = []
  ): Promise<(T & { id: string })[]> {
    try {
      console.log(`🔥 Firebase: Attempting to fetch from collection "${collectionName}"`, new Error().stack);
      const collectionRef = collection(this.db, collectionName);
      const q = query(collectionRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...(doc.data() as T),
        id: doc.id,
      }));
    } catch (error) {
      console.error(`🔥 Firebase: Error fetching from collection "${collectionName}":`, error);
      this.handleError(error as FirestoreError, "getDocuments");
    }
  }

  protected async getDocument<T extends DocumentData>(
    collectionName: string,
    docId: string
  ): Promise<T | undefined> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data() as T;
      }
      return undefined;
    } catch (error) {
      this.handleError(error as FirestoreError, "getDocument");
    }
  }

  protected async setDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      this.handleError(error as FirestoreError, "setDocument");
    }
  }

  protected async addDocument<T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<{ id: string }> {
    try {
      // Validate data before sending to Firestore
      this.validateFirestoreData(data);
      const docRef = await addDoc(collection(this.db, collectionName), data);
      return { id: docRef.id };
    } catch (error) {
      this.handleError(error as FirestoreError, "addDocument");
      throw error;
    }
  }

  protected async updateDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      this.handleError(error as FirestoreError, "updateDocument");
    }
  }

  protected async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      this.handleError(error as FirestoreError, "deleteDocument");
    }
  }

  protected async batchOperation<T>(
    items: T[],
    collectionName: string,
    operation: "create" | "update" | "delete",
    getDocId: (item: T) => string
  ): Promise<void> {
    const batch = writeBatch(this.db);
    items.forEach((item) => {
      const docRef = doc(this.db, collectionName, getDocId(item));
      switch (operation) {
        case "create":
          batch.set(docRef, {
            ...item,
            updatedAt: Timestamp.now(),
            createdAt: Timestamp.now(),
          });
          break;
        case "update":
          batch.update(docRef, {
            ...item,
            updatedAt: Timestamp.now(),
          });
          break;
        case "delete":
          batch.delete(docRef);
          break;
      }
    });
    return this.processBatchWithRetry(batch);
  }

  protected async processBatchWithRetry(
    batch: WriteBatch,
    maxRetries = 3,
    attempt = 0
  ): Promise<void> {
    try {
      await batch.commit();
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'unavailable' && attempt < maxRetries) {
        // Exponential backoff delay
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        return this.processBatchWithRetry(batch, maxRetries, attempt + 1);
      }
      throw new Error('Service temporarily unavailable');
    }
  }
}
