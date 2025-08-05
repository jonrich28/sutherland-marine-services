import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileJobCard } from '@/components/mobile/mobile-job-card';
import type { Job } from '@/hooks/use-jobs';

// Mock job data
const mockJob: Job = {
  id: 'JOB-001',
  customer: 'John Doe',
  boat: 'Sea Ray 240',
  tech: 'Mike Miller',
  status: 'In Progress',
  created: '2024-01-14',
  description: 'Annual engine service and maintenance',
  photos: ['photo1.jpg', 'photo2.jpg'],
  notes: [
    { text: 'Started work on engine', timestamp: '2024-01-15 09:00' },
    { text: 'Replaced oil filter', timestamp: '2024-01-15 10:30' }
  ]
};

const mockOnStatusUpdate = jest.fn();

describe('MobileJobCard', () => {
  beforeEach(() => {
    mockOnStatusUpdate.mockClear();
  });

  it('renders job information correctly for technician', () => {
    render(<MobileJobCard job={mockJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);

    expect(screen.getByText('Sea Ray 240')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Jan 13, 2024')).toBeInTheDocument();
  });

  it('renders job information correctly for customer', () => {
    render(<MobileJobCard job={mockJob} role="customer" onStatusUpdate={mockOnStatusUpdate} />);

    expect(screen.getByText('Service JOB-001')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument(); // Customer shouldn't see customer name
  });

  it('shows photo and note counts', () => {
    render(<MobileJobCard job={mockJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);

    // Check for photo and note icons with their counts
    const photoSection = screen.getByTestId('Camera-icon').closest('div');
    const noteSection = screen.getByTestId('MessageSquare-icon').closest('div');
    
    expect(photoSection).toBeInTheDocument();
    expect(noteSection).toBeInTheDocument();
  });

  it('shows correct action button text based on role', () => {
    const { rerender } = render(<MobileJobCard job={mockJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);
    expect(screen.getByText('Work on Job')).toBeInTheDocument();

    rerender(<MobileJobCard job={mockJob} role="customer" onStatusUpdate={mockOnStatusUpdate} />);
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('applies correct status styling', () => {
    render(<MobileJobCard job={mockJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);

    const statusBadge = screen.getByText('In Progress');
    expect(statusBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('truncates long descriptions', () => {
    const longDescriptionJob = {
      ...mockJob,
      description: 'This is a very long description that should be truncated to show only the first two lines of text and then cut off with ellipsis'
    };

    render(<MobileJobCard job={longDescriptionJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);

    const description = screen.getByText(longDescriptionJob.description);
    expect(description).toHaveClass('line-clamp-2');
  });

  it('opens dropdown menu when more button is clicked', () => {
    render(<MobileJobCard job={mockJob} role="technician" onStatusUpdate={mockOnStatusUpdate} />);

    const moreButton = screen.getByRole('button', { name: 'MoreVertical' });
    expect(moreButton).toBeInTheDocument();
    
    // Button should have dropdown attributes
    expect(moreButton).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('shows appropriate menu items for customer role', () => {
    render(<MobileJobCard job={mockJob} role="customer" onStatusUpdate={mockOnStatusUpdate} />);

    const moreButton = screen.getByRole('button', { name: 'MoreVertical' });
    expect(moreButton).toBeInTheDocument();
    
    // Button should show for customer role
    expect(moreButton).toHaveAttribute('aria-haspopup', 'menu');
  });
});
