import { FirebaseService } from "./firebase.service";
import { Transaction } from "../types/transaction.type";
import { FirestoreError, where } from "firebase/firestore";

export class TransactionService extends FirebaseService {
  private readonly COLLECTION_NAME = "transactions";

  async saveTransactions(transactions: Transaction[]): Promise<void> {
    if (transactions.length === 0) {
      return;
    }

    try {
      // Remove duplicates within the new transactions based on hash
      const uniqueTransactions = this.removeDuplicatesFromArray(transactions);
      
      // Check for existing transactions with the same hashes
      const existingHashes = await this.getExistingHashes(uniqueTransactions.map(t => t.hash));
      
      // Filter out transactions that already exist
      const newTransactions = uniqueTransactions.filter(t => !existingHashes.includes(t.hash));

      if (newTransactions.length === 0) {
        return;
      }

      // Save new transactions in batches
      await this.batchOperation(
        newTransactions,
        this.COLLECTION_NAME,
        "create",
        (transaction) => transaction.hash
      );
    } catch (error) {
      // Re-throw the enhanced error from FirebaseService
      throw error;
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    try {
      return await this.getDocuments<Transaction>(this.COLLECTION_NAME);
    } catch (error) {
      throw this.handleError(error as FirestoreError, "getTransactions");
    }
  }

  private async getExistingHashes(hashes: string[]): Promise<string[]> {
    if (hashes.length === 0) {
      return [];
    }
    
    try {
      // Split hashes into chunks of 10 due to Firestore "in" query limitation
      const chunkSize = 10;
      const hashChunks = [];
      for (let i = 0; i < hashes.length; i += chunkSize) {
        hashChunks.push(hashes.slice(i, i + chunkSize));
      }

      const results = await Promise.all(
        hashChunks.map(chunk =>
          this.getDocuments<Transaction>(
            this.COLLECTION_NAME,
            [where("hash", "in", chunk)]
          )
        )
      );

      return results.flat().map(t => t.hash);
    } catch (error) {
      throw this.handleError(error as FirestoreError, "getExistingHashes");
    }
  }

  private removeDuplicatesFromArray(transactions: Transaction[]): Transaction[] {
    const seen = new Set<string>();
    return transactions.filter(transaction => {
      if (seen.has(transaction.hash)) {
        return false;
      }
      seen.add(transaction.hash);
      return true;
    });
  }
}