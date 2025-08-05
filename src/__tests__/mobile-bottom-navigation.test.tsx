import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomNavigation } from '@/components/mobile/bottom-navigation';
import { useRouter, usePathname } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('BottomNavigation', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
    mockUsePathname.mockReturnValue('/jobs');
    mockPush.mockClear();
  });

  it('renders technician navigation items correctly', () => {
    render(<BottomNavigation role="technician" />);

    expect(screen.getByText('My Jobs')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders customer navigation items correctly', () => {
    render(<BottomNavigation role="customer" />);

    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders owner mobile navigation items correctly', () => {
    render(<BottomNavigation role="owner" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    mockUsePathname.mockReturnValue('/jobs');
    render(<BottomNavigation role="technician" />);

    const activeButton = screen.getByText('My Jobs').closest('button');
    expect(activeButton).toHaveClass('text-primary');
  });

  it('navigates when navigation item is clicked', () => {
    render(<BottomNavigation role="technician" />);

    const inventoryButton = screen.getByText('Inventory').closest('button');
    fireEvent.click(inventoryButton!);

    expect(mockPush).toHaveBeenCalledWith('/inventory');
  });

  it('provides proper accessibility labels', () => {
    render(<BottomNavigation role="technician" />);

    const jobsButton = screen.getByLabelText('My Jobs');
    expect(jobsButton).toBeInTheDocument();
  });
});
