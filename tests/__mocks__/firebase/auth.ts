const mockUser = {
  uid: 'testuid',
  email: 'test@example.com'
};

const mockOnAuthStateChanged = jest.fn((auth, callback) => {
  callback(mockUser);
  return () => {};
});

const mockAuth = {
  currentUser: mockUser,
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: mockOnAuthStateChanged,
  setPersistence: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updatePassword: jest.fn()
};

export const getAuth = () => mockAuth;
export const onAuthStateChanged = mockOnAuthStateChanged;