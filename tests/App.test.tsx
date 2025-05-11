import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import '@testing-library/jest-dom';

// Mock the lazy-loaded components
jest.mock('../src/pages/home/home.page', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>
}));

jest.mock('../src/pages/products/products.page', () => ({
  default: () => <div data-testid="products-page">Products Page</div>
}));

jest.mock('../src/pages/transactionAnalytics/transactionAnalytics.page', () => ({
  TransactionAnalytics: () => <div data-testid="analytics-page">Analytics Page</div>
}));

jest.mock('../src/pages/auth/login.page', () => ({
  LoginPage: () => <div data-testid="login-page">Login Page</div>
}));

// Mock firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null); // Simulate no user logged in
    return () => {};
  })
}));

// Mock AuthService
jest.mock('../src/services/auth.service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    onAuthStateChanged: (callback: (user: any) => void) => {
      callback(null);
      return () => {};
    }
  }))
}));

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App toggleTheme={() => {}} mode="light" />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays login page when not authenticated', async () => {
    renderWithRouter();
    expect(await screen.findByTestId('login-page')).toBeInTheDocument();
  });

  it('displays home page when authenticated', async () => {
    // Mock authenticated state
    const authService = require('../src/services/auth.service');
    authService.AuthService.mockImplementation(() => ({
      onAuthStateChanged: (callback: (user: any) => void) => {
        callback({ uid: 'test-user' });
        return () => {};
      }
    }));

    renderWithRouter('/flipkart-amazon-tools/');

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });
});
