
import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(app)/dashboard/page';
import { JobsProvider } from '@/hooks/use-jobs';
import { InvoicesProvider } from '@/hooks/use-invoices';
import { QuotesProvider } from '@/hooks/use-quotes';
import { TooltipProvider } from '@/components/ui/tooltip';


jest.mock('@/components/dashboard/revenue-chart', () => ({
  RevenueChart: () => <div data-testid="revenue-chart">Revenue Chart</div>
}));
jest.mock('@/components/dashboard/jobs-status-chart', () => ({
  JobsStatusChart: () => <div data-testid="jobs-status-chart">Jobs Status Chart</div>
}));


describe('DashboardPage', () => {
  const renderComponent = () => {
    render(
      <JobsProvider>
        <InvoicesProvider>
          <QuotesProvider>
            <TooltipProvider>
              <DashboardPage />
            </TooltipProvider>
          </QuotesProvider>
        </InvoicesProvider>
      </JobsProvider>
    );
  };

  it('renders all KPI cards correctly', () => {
    renderComponent();

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Jobs')).toBeInTheDocument();
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('Pending Invoices')).toBeInTheDocument();

    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument();
    expect(screen.getByTestId('jobs-status-chart')).toBeInTheDocument();

    expect(screen.getByText('Recent Jobs')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
