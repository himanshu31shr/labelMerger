import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { AuthService } from '../../src/services/auth.service';
import { User } from 'firebase/auth';

// Mock the AuthService
jest.mock('../../src/services/auth.service');

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;
  let mockAuthCallback: (user: User | null) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    (AuthService as jest.Mock).mockImplementation(() => ({
      onAuthStateChanged: (callback: (user: User | null) => void) => {
        mockAuthCallback = callback;
        return jest.fn(); // Return unsubscribe function
      }
    }));
  });

  // Create a component to capture location state
  const LocationStateCapture = () => {
    const location = useLocation();
    return <div data-testid="location-state">{location.state?.from?.pathname}</div>;
  };

  const renderProtectedRoute = (initialPath = '/labelMerger/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/labelMerger/login" element={<><div>Login Page</div><LocationStateCapture /></>} />
          <Route
            path="/labelMerger/*"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it('shows loading state initially', () => {
    renderProtectedRoute();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', async () => {
    renderProtectedRoute();
    
    // Simulate unauthenticated state
    await act(async () => {
      mockAuthCallback(null);
    });

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('renders protected content when authenticated', async () => {
    renderProtectedRoute();
    
    // Simulate authenticated state with minimal mock User object
    await act(async () => {
      mockAuthCallback({ uid: 'test-user' } as User);
    });

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('preserves the redirect path when redirecting to login', async () => {
    renderProtectedRoute('/labelMerger/protected-path');
    
    // Simulate unauthenticated state
    await act(async () => {
      mockAuthCallback(null);
    });

    await waitFor(() => {
      const locationState = screen.getByTestId('location-state');
      expect(locationState).toHaveTextContent('/labelMerger/protected-path');
    });
  });

  it('unsubscribes from auth state changes on unmount', () => {
    const mockUnsubscribe = jest.fn();
    (AuthService as jest.Mock).mockImplementation(() => ({
      onAuthStateChanged: () => mockUnsubscribe
    }));

    const { unmount } = renderProtectedRoute();
    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});