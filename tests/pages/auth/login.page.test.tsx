import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '../../../src/pages/auth/login.page';
import { AuthService } from '../../../src/services/auth.service';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../src/services/auth.service');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  it('renders login form with all fields', () => {
    renderLoginPage();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it('shows loading state during sign in', async () => {
    const mockSignIn = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    (AuthService as jest.Mock).mockImplementation(() => ({
      signIn: mockSignIn
    }));

    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);
    
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    expect(signInButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({});
    (AuthService as jest.Mock).mockImplementation(() => ({
      signIn: mockSignIn
    }));

    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByLabelText(/remember me/i));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123', true);
      expect(mockNavigate).toHaveBeenCalledWith('/labelMerger/');
    });
  });

  it('validates required fields on submit', async () => {
    renderLoginPage();
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByLabelText(/email/i)).toBeInvalid();
    expect(screen.getByLabelText(/password/i)).toBeInvalid();
  });

  it('displays error message on login failure', async () => {
    const mockSignIn = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    (AuthService as jest.Mock).mockImplementation(() => ({
      signIn: mockSignIn
    }));

    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong-password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });

  it('handles password reset request successfully', async () => {
    const mockResetPassword = jest.fn().mockResolvedValue(undefined);
    (AuthService as jest.Mock).mockImplementation(() => ({
      resetPassword: mockResetPassword
    }));

    renderLoginPage();

    // Switch to reset mode
    fireEvent.click(screen.getByText(/forgot password/i));
    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();

    // Try to reset password
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(/password reset email sent/i);
    });

    // Should switch back to login mode after successful reset
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });

  it('handles password reset failure', async () => {
    const mockResetPassword = jest.fn().mockRejectedValue(new Error('User not found'));
    (AuthService as jest.Mock).mockImplementation(() => ({
      resetPassword: mockResetPassword
    }));

    renderLoginPage();
    fireEvent.click(screen.getByText(/forgot password/i));
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'nonexistent@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(await screen.findByText('User not found')).toBeInTheDocument();
  });

  it('toggles between login and reset password modes', () => {
    renderLoginPage();

    // Initial state is login mode
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Switch to reset mode
    fireEvent.click(screen.getByText(/forgot password/i));
    expect(screen.getByText(/reset password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();

    // Switch back to login mode
    fireEvent.click(screen.getByText(/back to sign in/i));
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});