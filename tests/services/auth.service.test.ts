import { User } from 'firebase/auth';
import { AuthService } from '../../src/services/auth.service';
import { auth } from '../../src/services/firebase.config';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  setPersistence: jest.fn(),
  browserLocalPersistence: 'local',
  browserSessionPersistence: 'session'
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn()
}));

describe('AuthService', () => {
  let service: AuthService;
  const mockUser = { uid: 'test-uid', email: 'test@example.com' } as User;

  beforeEach(() => {
    service = new AuthService();
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create a new user and set user data', async () => {
      const createUserMock = jest.requireMock('firebase/auth').createUserWithEmailAndPassword;
      const setDocMock = jest.requireMock('firebase/firestore').setDoc;

      createUserMock.mockResolvedValueOnce({ user: mockUser });
      setDocMock.mockResolvedValueOnce(undefined);

      const result = await service.signUp('test@example.com', 'password123');

      expect(createUserMock).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(setDocMock).toHaveBeenCalled();
      expect(result).toBe(mockUser);
    });
  });

  describe('signIn', () => {
    it('should sign in user with correct credentials and remember me', async () => {
      const signInMock = jest.requireMock('firebase/auth').signInWithEmailAndPassword;
      const setPersistenceMock = jest.requireMock('firebase/auth').setPersistence;
      const setDocMock = jest.requireMock('firebase/firestore').setDoc;

      signInMock.mockResolvedValueOnce({ user: mockUser });
      setPersistenceMock.mockResolvedValueOnce(undefined);
      setDocMock.mockResolvedValueOnce(undefined);

      const result = await service.signIn('test@example.com', 'password123', true);

      expect(setPersistenceMock).toHaveBeenCalledWith(auth, 'local');
      expect(signInMock).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(setDocMock).toHaveBeenCalled();
      expect(result).toBe(mockUser);
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      const resetMock = jest.requireMock('firebase/auth').sendPasswordResetEmail;
      resetMock.mockResolvedValueOnce(undefined);

      await service.resetPassword('test@example.com');

      expect(resetMock).toHaveBeenCalledWith(auth, 'test@example.com');
    });
  });

  describe('signOut', () => {
    it('should sign out the user', async () => {
      const signOutMock = jest.requireMock('firebase/auth').signOut;
      signOutMock.mockResolvedValueOnce(undefined);

      await service.signOut();

      expect(signOutMock).toHaveBeenCalledWith(auth);
    });
  });

  describe('getUserData', () => {
    it('should return user data if exists', async () => {
      const getDocMock = jest.requireMock('firebase/firestore').getDoc;
      const mockUserData = {
        email: 'test@example.com',
        role: 'user',
        createdAt: new Date(),
        lastLoginAt: new Date()
      };

      getDocMock.mockResolvedValueOnce({
        exists: () => true,
        data: () => mockUserData
      });

      const result = await service.getUserData('test-uid');

      expect(result).toEqual(mockUserData);
    });

    it('should return null if user data does not exist', async () => {
      const getDocMock = jest.requireMock('firebase/firestore').getDoc;

      getDocMock.mockResolvedValueOnce({
        exists: () => false
      });

      const result = await service.getUserData('test-uid');

      expect(result).toBeNull();
    });
  });
});