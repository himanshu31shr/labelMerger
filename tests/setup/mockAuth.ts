import { User } from 'firebase/auth';

export const mockUser: Partial<User> = {
  uid: 'test-uid',
  email: 'test@example.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString()
  }
};

export const mockAuth = {
  currentUser: null as User | null,
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn()
};

export const mockFirestore = {
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn()
};

export const setupAuthMocks = () => {
  mockAuth.currentUser = null;
  mockAuth.onAuthStateChanged.mockImplementation((callback) => {
    callback(mockAuth.currentUser);
    return () => {}; // Unsubscribe function
  });

  mockAuth.signInWithEmailAndPassword.mockImplementation((email, password) => {
    if (password === 'correct-password') {
      mockAuth.currentUser = mockUser as User;
      return Promise.resolve({ user: mockUser });
    }
    return Promise.reject(new Error('auth/wrong-password'));
  });

  mockAuth.createUserWithEmailAndPassword.mockImplementation((email, password) => {
    mockAuth.currentUser = { ...mockUser, email } as User;
    return Promise.resolve({ user: { ...mockUser, email } });
  });

  mockAuth.signOut.mockImplementation(() => {
    mockAuth.currentUser = null;
    return Promise.resolve();
  });

  mockAuth.sendPasswordResetEmail.mockImplementation(() => Promise.resolve());
};

export const setupFirestoreMocks = () => {
  const mockDocRef = { id: 'test-doc-id' };
  const mockCollectionRef = { id: 'test-collection-id' };

  mockFirestore.collection.mockReturnValue(mockCollectionRef);
  mockFirestore.doc.mockReturnValue(mockDocRef);
  mockFirestore.getDoc.mockResolvedValue({
    exists: () => true,
    data: () => ({
      email: mockUser.email,
      role: 'user',
      createdAt: new Date(),
      lastLoginAt: new Date()
    })
  });
  mockFirestore.setDoc.mockResolvedValue(undefined);
  mockFirestore.updateDoc.mockResolvedValue(undefined);
  mockFirestore.deleteDoc.mockResolvedValue(undefined);
};