import {
  collection,
  query,
  getDocs,
  QueryConstraint,
  writeBatch,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  Firestore,
  FirestoreError,
  DocumentData,
  WithFieldValue
} from "firebase/firestore";
import { db as firebaseDb } from "./firebase.config";

export class FirebaseService {
  protected db: Firestore;

  constructor() {
    this.db = firebaseDb;
  }

  protected handleError(error: FirestoreError, context: string): never {
    console.error(`Firebase error in ${context}:`, error);
    throw error;
  }

  protected async batchOperation<T extends DocumentData>(
    items: T[],
    collectionName: string,
    operation: "create" | "update" | "delete",
    getDocId: (item: T) => string
  ): Promise<void> {
    const batch = writeBatch(this.db);
    const MAX_BATCH_SIZE = 500;

    for (let i = 0; i < items.length; i += MAX_BATCH_SIZE) {
      const chunk = items.slice(i, i + MAX_BATCH_SIZE);

      for (const item of chunk) {
        Object.keys(item).forEach((key) => {
          if (item[key] === undefined) {
            delete item[key];
          }
        });
        const docRef = doc(this.db, collectionName, getDocId(item));

        switch (operation) {
          case "create":
            batch.set(docRef, item as WithFieldValue<T>);
            break;
          case "update":
            batch.update(docRef, item as WithFieldValue<T>);
            break;
          case "delete":
            batch.delete(docRef);
            break;
        }
      }

      try {
        await batch.commit();
      } catch (error) {
        this.handleError(error as FirestoreError, `batch ${operation}`);
      }
    }
  }

  protected async getDocuments<T extends DocumentData>(
    collectionName: string,
    queryConstraints: QueryConstraint[] = []
  ): Promise<(T & { id: string })[]> {
    try {
      const q = query(collection(this.db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as T & { id: string })
      );
    } catch (error) {
      return this.handleError(error as FirestoreError, "getDocuments");
    }
  }

  protected async setDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
  ): Promise<void> {
    try {
      await setDoc(doc(this.db, collectionName, docId), data);
    } catch (error) {
      this.handleError(error as FirestoreError, "setDocument");
    }
  }

  protected async updateDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await updateDoc(docRef, data as WithFieldValue<DocumentData>);
    } catch (error) {
      this.handleError(error as FirestoreError, "updateDocument");
    }
  }

  protected async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<void> {
    try {
      await deleteDoc(doc(this.db, collectionName, docId));
    } catch (error) {
      this.handleError(error as FirestoreError, "deleteDocument");
    }
  }

  protected async createIndex() {
    
  }
}
