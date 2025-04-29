import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  Auth,
  User,
  Unsubscribe
} from 'firebase/auth';
import { doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { auth as firebaseAuth, db as firebaseDb } from './firebase.config';

interface UserData {
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
}

export class AuthService {
  private auth: Auth;
  private db: Firestore;

  constructor() {
    this.auth = firebaseAuth;
    this.db = firebaseDb;
  }

  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(this.db, 'users', userCredential.user.uid), {
        email,
        role: 'user',
        createdAt: new Date(),
        lastLoginAt: new Date()
      });

      return userCredential.user;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string, rememberMe: boolean = false): Promise<User> {
    try {
      // Set persistence based on remember me
      await setPersistence(this.auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      
      // Update last login
      await setDoc(doc(this.db, 'users', userCredential.user.uid), {
        lastLoginAt: new Date()
      }, { merge: true });

      return userCredential.user;
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return this.auth.currentUser;
  }

  async getUserData(userId: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(this.db, 'users', userId));
      return userDoc.exists() ? userDoc.data() as UserData : null;
    } catch (error) {
      console.error('Error in getUserData:', error);
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(this.auth, callback);
  }
}