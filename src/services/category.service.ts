import { Timestamp, orderBy, where } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

export interface Category {
  id?: string;
  name: string;
  description?: string;
  tag?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export class CategoryService extends FirebaseService {
  private readonly COLLECTION_NAME = 'categories';

  async getCategories(): Promise<Category[]> {
    return this.getDocuments<Category>(
      this.COLLECTION_NAME,
      [orderBy('name', 'asc')]
    );
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.getDocument<Category>(this.COLLECTION_NAME, id);
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<string> {
    const docRef = await this.addDocument(this.COLLECTION_NAME, {
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  }

  async updateCategory(id: string, category: Partial<Omit<Category, 'id'>>): Promise<void> {
    await this.updateDocument(this.COLLECTION_NAME, id, {
      ...category,
      updatedAt: Timestamp.now(),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    // TODO: Check if category is in use before deleting
    await this.deleteDocument(this.COLLECTION_NAME, id);
  }

  async isCategoryInUse(categoryId: string): Promise<boolean> {
    const products = await this.getDocuments<{ id: string }>(
      'products',
      [
        where('categoryId', '==', categoryId),
        orderBy('id', 'asc')
      ]
    );
    return products.length > 0;
  }
}
