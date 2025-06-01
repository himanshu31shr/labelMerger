import { authReducer, setUser, setAuthState, clearError, login, logout, resetPassword, initializeAuthState } from '../authSlice';
import { User } from 'firebase/auth'; // Import User type

// Mock the auth service
jest.mock('../../../services/auth.service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
  })),
}));

describe('authSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    authStateLoaded: false,
    isLoading: false,
  };

  // Cast a minimal object to the User type
  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
  } as User;

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setUser', () => {
      const action = setUser(mockUser);
      const state = authReducer(initialState, action);
      
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle setAuthState', () => {
      const action = setAuthState({ 
        user: mockUser, 
        isAuthenticated: true, 
        authStateLoaded: true 
      });
      const state = authReducer(initialState, action);
      
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.authStateLoaded).toBe(true);
    });

    it('should handle clearError', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error message',
      };
      
      const action = clearError();
      const state = authReducer(stateWithError, action);
      
      expect(state.error).toBeNull();
    });
  });

  describe('async thunks', () => {
    describe('login', () => {
      it('should handle login.pending', () => {
        const action = { type: login.pending.type };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should handle login.fulfilled', () => {
        const action = { 
          type: login.fulfilled.type, 
          payload: mockUser 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
      });

      it('should handle initializeAuthState.fulfilled', () => {
        const action = { 
          type: initializeAuthState.fulfilled.type, 
          payload: mockUser 
        };
        const state = authReducer(initialState, action);
        
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.authStateLoaded).toBe(true);
      });

      it('should handle login.rejected with error message', () => {
        const action = { 
          type: login.rejected.type, 
          error: { message: 'Invalid credentials' } 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Invalid credentials');
      });

      it('should handle login.rejected without error message', () => {
        const action = { 
          type: login.rejected.type, 
          error: {} 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to login');
      });
    });

    describe('logout', () => {
      it('should handle logout.fulfilled', () => {
        const stateWithUser = {
          ...initialState,
          user: mockUser,
          isAuthenticated: true,
        };
        
        const action = { type: logout.fulfilled.type };
        const state = authReducer(stateWithUser, action);
        
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
      });
    });

    describe('resetPassword', () => {
      it('should handle resetPassword.pending', () => {
        const action = { type: resetPassword.pending.type };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should handle resetPassword.fulfilled', () => {
        const successMessage = 'Password reset email sent. Check your inbox.';
        const action = { 
          type: resetPassword.fulfilled.type, 
          payload: successMessage 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe(successMessage);
      });

      it('should handle resetPassword.rejected with error message', () => {
        const action = { 
          type: resetPassword.rejected.type, 
          error: { message: 'User not found' } 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe('User not found');
      });

      it('should handle resetPassword.rejected without error message', () => {
        const action = { 
          type: resetPassword.rejected.type, 
          error: {} 
        };
        const state = authReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to send reset password email');
      });
    });
  });

  describe('state structure', () => {
    it('should maintain correct state structure', () => {
      const state = authReducer(undefined, { type: 'unknown' });
      
      expect(state).toHaveProperty('user');
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('error');
      expect(state).toHaveProperty('isAuthenticated');
      expect(state).toHaveProperty('authStateLoaded');
      expect(state).toHaveProperty('isLoading');
    });

    it('should have correct initial values', () => {
      const state = authReducer(undefined, { type: 'unknown' });
      
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.authStateLoaded).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });
}); 