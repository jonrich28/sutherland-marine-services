
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomersPage from '@/app/(app)/customers/page';
import { Toaster } from '@/components/ui/toaster';
import { JobsProvider } from '@/hooks/use-jobs';
import { useSearch } from '@/components/ui/input';

jest.mock('@/components/ui/input', () => {
    const originalModule = jest.requireActual('@/components/ui/input');
    return {
        ...originalModule,
        useSearch: jest.fn(),
    };
});

describe('CustomersPage', () => {
  const renderComponent = () => {
    render(
      <JobsProvider>
        <CustomersPage />
        <Toaster />
      </JobsProvider>
    );
  };

  it('renders the customers page with initial customers', () => {
    renderComponent();

    expect(screen.getByText('Customer Management')).toBeInTheDocument();
    expect(screen.getByText('All Customers')).toBeInTheDocument();
    
    expect(screen.getByText('Liam Johnson')).toBeInTheDocument();
    expect(screen.getByText('liam.j@example.com')).toBeInTheDocument();
    expect(screen.getByText('Olivia Smith')).toBeInTheDocument();
  });

  it('opens the Add Customer dialog when the button is clicked', () => {
    renderComponent();
    
    fireEvent.click(screen.getByRole('button', { name: /Add Customer/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Customer')).toBeInTheDocument();
  });

  it('shows validation errors for the add customer form', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Add Customer/i }));
    
    const saveButton = screen.getByRole('button', { name: 'Save Customer' });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Boat model is required')).toBeInTheDocument();
    });
  });

  it('adds a new customer successfully and shows a toast', async () => {
    renderComponent();
    
    fireEvent.click(screen.getByRole('button', { name: /Add Customer/i }));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Customer' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Boat Model'), { target: { value: 'Test Boat 99' } });

    fireEvent.click(screen.getByRole('button', { name: 'Save Customer' }));

    await waitFor(() => {
      expect(screen.getByText('Test Customer')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Customer Added')).toBeInTheDocument();
    });
  });
});
