import { FirebaseService } from './firebase.service';
import { orderBy } from 'firebase/firestore';
import { ActiveOrder } from './todaysOrder.service'; // Fix import path

// Assuming the structure of a daily order document from 'active-orders'
interface DailyOrderDocument {
  id: string; // document ID, likely the date
  date: string; // date string
  orders: ActiveOrder[]; // array of orders for this day, using ActiveOrder type
}

export class AllOrdersForAnalyticsService extends FirebaseService {
  private readonly COLLECTION_NAME = 'active-orders';

  async fetchAllDailyOrderDocuments(): Promise<DailyOrderDocument[]> {
    // Fetch all documents from the 'active-orders' collection
    // Optionally order by date if needed, but for aggregation, it might not be strictly necessary
    return this.getDocuments<DailyOrderDocument>(this.COLLECTION_NAME, [orderBy('date', 'asc')]);
  }
} 