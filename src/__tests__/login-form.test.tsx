
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/auth/login-form';
import { Toaster } from '@/components/ui/toaster';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
    // Ensure window object exists for localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorage,
      writable: true
    });
  });

  const renderComponent = () => {
    render(
        <>
            <LoginForm />
            <Toaster />
        </>
    );
  }

  it('renders the login form', () => {
    renderComponent();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderComponent();
    
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });
  });

  it('handles successful owner login and redirects', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'owner@sutherlandmarine.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(localStorage.getItem('userRole')).toBe('owner');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

   it('handles successful technician login and redirects', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'tech@sutherlandmarine.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(localStorage.getItem('userRole')).toBe('technician');
      expect(mockPush).toHaveBeenCalledWith('/jobs');
    });
  });

   it('handles successful customer login and redirects', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'customer@sutherlandmarine.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(localStorage.getItem('userRole')).toBe('customer');
      expect(mockPush).toHaveBeenCalledWith('/jobs');
    });
  });

   it('handles unknown user login and redirects to dashboard', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'unknown@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
    
    // Check localStorage after navigation is triggered
    // Note: In the test environment, the window check may fail, so userRole might be null
    const userRole = localStorage.getItem('userRole');
    expect(userRole === '' || userRole === null).toBe(true);
  });
});
