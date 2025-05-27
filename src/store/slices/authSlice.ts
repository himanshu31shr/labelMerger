import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  authStateLoaded: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  authStateLoaded: false,
};

const authService = new AuthService();

// New thunk to initialize auth state listener
export const initializeAuthState = createAsyncThunk(
  'auth/initializeAuthState',
  async (_, { dispatch }) => {
    console.log('🔥 Initializing auth state...');
    return new Promise<User | null>((resolve) => {
      const unsubscribe = authService.onAuthStateChanged((user) => {
        console.log('🔥 Auth state changed:', user ? 'authenticated' : 'not authenticated');
        dispatch(setAuthState({ user, isAuthenticated: !!user, authStateLoaded: true }));
        resolve(user);
      });
      // Store unsubscribe function for cleanup if needed
      return unsubscribe;
    });
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe = false }: { email: string; password: string; rememberMe?: boolean }) => {
    const user = await authService.signIn(email, password, rememberMe);
    return user;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.signOut();
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string) => {
    await authService.resetPassword(email);
    return 'Password reset email sent';
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.authStateLoaded = action.payload.authStateLoaded;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.authStateLoaded = true;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send reset password email';
      });
  },
});

export const { setUser, setAuthState, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthStateLoaded = (state: { auth: AuthState }) => state.auth.authStateLoaded;
export const selectUser = (state: { auth: AuthState }) => state.auth.user; 