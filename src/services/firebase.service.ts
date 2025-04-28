import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    FirestoreError,
    getDocs,
    query,
    QueryConstraint,
    setDoc,
    updateDoc,
    WithFieldValue,
    writeBatch
} from 'firebase/firestore';
import { db } from './firebase.config';

export class FirebaseService {
  protected handleError(error: FirestoreError, context: string): never {
    console.error(`Firebase error in ${context}:`, error);
    throw error;
  }

  protected async batchOperation<T extends DocumentData>(
    items: T[],
    collectionName: string,
    operation: 'create' | 'update' | 'delete',
    getDocId: (item: T) => string
  ): Promise<void> {
    const batch = writeBatch(db);
    const MAX_BATCH_SIZE = 500;

    for (let i = 0; i < items.length; i += MAX_BATCH_SIZE) {
      const chunk = items.slice(i, i + MAX_BATCH_SIZE);
      
      for (const item of chunk) {
        const docRef = doc(db, collectionName, getDocId(item));
        
        switch (operation) {
          case 'create':
            batch.set(docRef, item as WithFieldValue<T>);
            break;
          case 'update':
            batch.update(docRef, item as WithFieldValue<T>);
            break;
          case 'delete':
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
      const q = query(collection(db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T & { id: string }));
    } catch (error) {
      return this.handleError(error as FirestoreError, 'getDocuments');
    }
  }

  protected async setDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
  ): Promise<void> {
    try {
      await setDoc(doc(db, collectionName, docId), data);
    } catch (error) {
      this.handleError(error as FirestoreError, 'setDocument');
    }
  }

  protected async updateDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data as WithFieldValue<DocumentData>);
    } catch (error) {
      this.handleError(error as FirestoreError, 'updateDocument');
    }
  }

  protected async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<void> {
    try {
      await deleteDoc(doc(db, collectionName, docId));
    } catch (error) {
      this.handleError(error as FirestoreError, 'deleteDocument');
    }
  }
}