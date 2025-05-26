export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin',
};

export const mockAuthState = {
  user: mockUser,
  isAuthenticated: true,
  loading: false,
  error: null,
};

export const mockUnauthenticatedState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}; 