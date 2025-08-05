
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobsPage from '@/app/(app)/jobs/page';
import { Toaster } from '@/components/ui/toaster';
import { JobsProvider } from '@/hooks/use-jobs';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
        delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});


describe('JobsPage', () => {

  beforeEach(() => {
    // Reset mocks and localStorage before each test
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  const renderJobsPage = () => {
    render(
      <JobsProvider>
        <TooltipProvider>
          <JobsPage />
          <Toaster />
        </TooltipProvider>
      </JobsProvider>
    );
  }

  it('renders the correct title for an owner', async () => {
    mockLocalStorage.setItem('userRole', 'owner');
    renderJobsPage();
    await waitFor(() => {
      expect(screen.getByText('Jobs Management')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Create Job/i })).toBeInTheDocument();
    });
  });

  it('renders the correct title for a technician', async () => {
    mockLocalStorage.setItem('userRole', 'technician');
    renderJobsPage();
    await waitFor(() => {
      expect(screen.getByText('My Assigned Jobs')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Create Job/i })).not.toBeInTheDocument();
    });
  });

  it('opens the AI summary dialog and shows a summary', async () => {
    mockLocalStorage.setItem('userRole', 'owner');
    renderJobsPage();
    
    // Find the first button that contains Bot icon and click it
    const botIcon = screen.getAllByText('Bot')[0];
    const aiSummaryButton = botIcon.closest('button');
    expect(aiSummaryButton).toBeInTheDocument();
    fireEvent.click(aiSummaryButton!);

    // Dialog opens, now click the summarize button inside
    const summarizeButton = screen.getByRole('button', { name: /Summarize Job/i });
    fireEvent.click(summarizeButton);

    await waitFor(() => {
      expect(screen.getByText('Job Summary: Annual engine service and oil change.. Current status: Completed. This is a demo summary generated without AI.')).toBeInTheDocument();
    });
  });

  it('opens the Create Job dialog and generates a description', async () => {
    mockLocalStorage.setItem('userRole', 'owner');
    renderJobsPage();
    
    const createJobButton = await screen.findByRole('button', { name: /Create Job/i });
    fireEvent.click(createJobButton);

    // Dialog opens, fill in keywords
    const keywordsInput = screen.getByLabelText('Description Keywords');
    fireEvent.change(keywordsInput, { target: { value: 'fix engine' } });
    
    // Find the button that contains Sparkles icon
    const sparklesIcon = screen.getByText('Sparkles');
    const generateButton = sparklesIcon.closest('button');
    expect(generateButton).toBeInTheDocument();
    fireEvent.click(generateButton!);

    await waitFor(() => {
      // Check if the textarea is filled with the generated description
      expect(screen.getByPlaceholderText('A detailed job description will be generated here.')).toHaveValue('Professional marine service work involving: fix engine. This task requires experienced technician attention and will be completed according to industry standards.');
    });
  });

});
