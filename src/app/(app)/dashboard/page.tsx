
'use client';

import { useEffect, useState } from 'react';
import { OfficeManagerDashboard } from '@/components/dashboard/office-manager-dashboard';
import { ShopManagerDashboard } from '@/components/dashboard/shop-manager-dashboard';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Wrench,
  DollarSign,
  Receipt,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { JobsStatusChart } from '@/components/dashboard/jobs-status-chart';
import { BusinessAnalytics } from '@/components/dashboard/business-analytics';
import { GoalsProgress } from '@/components/dashboard/goals-progress';
import { ExecutiveSummary } from '@/components/dashboard/executive-summary';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { initialCustomers } from '@/lib/data';
import { useJobs } from '@/hooks/use-jobs';
import { useInvoices } from '@/hooks/use-invoices';

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Completed': 'default',
    'In Progress': 'secondary',
    'Awaiting Payment': 'secondary',
    'Awaiting Approval': 'secondary',
    'Parts Ordered': 'secondary',
    'On Hold': 'destructive',
};

export default function DashboardPage() {
  const { jobs } = useJobs();
  const { invoices } = useInvoices();
  const [userRole, setUserRole] = useState<'owner' | 'office-manager' | 'shop-manager' | 'technician' | 'customer' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole') as 'owner' | 'office-manager' | 'shop-manager' | 'technician' | 'customer' | null;
      setUserRole(role);
    }
  }, []);

  // Role-specific dashboard rendering
  if (userRole === 'office-manager') {
    return <OfficeManagerDashboard />;
  }

  if (userRole === 'shop-manager') {
    return <ShopManagerDashboard />;
  }

  // Default dashboard for owner, technician, and customer roles

  // Enhanced Revenue Calculations
  const totalRevenue = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((acc, inv) => acc + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  const monthlyRevenue = invoices
    .filter(inv => {
      const invoiceDate = new Date(inv.issued);
      const currentMonth = new Date().getMonth();
      return inv.status === 'Paid' && invoiceDate.getMonth() === currentMonth;
    })
    .reduce((acc, inv) => acc + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  const pendingRevenue = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((acc, inv) => acc + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  // Business Performance Metrics
  const activeJobs = jobs.filter(job => job.status === 'In Progress').length;
  const completedJobsThisMonth = jobs.filter(job => {
    const jobDate = new Date(job.created);
    const currentMonth = new Date().getMonth();
    return job.status === 'Completed' && jobDate.getMonth() === currentMonth;
  }).length;
  
  const totalCustomers = initialCustomers.length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;

  // Calculate average job value
  const averageJobValue = totalRevenue / jobs.filter(job => job.status === 'Completed').length || 0;

  // Calculate job completion rate (jobs completed vs total jobs)
  const jobCompletionRate = (jobs.filter(job => job.status === 'Completed').length / jobs.length * 100) || 0;

  // Calculate customer retention metrics (based on actual job data)
  const customerJobCounts = jobs.reduce((acc, job) => {
    acc[job.customer] = (acc[job.customer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const repeatCustomers = Object.values(customerJobCounts).filter(count => count > 1).length;
  const customerRetentionRate = (repeatCustomers / totalCustomers * 100) || 0;

  const kpiData = [
    { 
      title: 'Monthly Revenue', 
      value: `$${monthlyRevenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 
      change: '+15.2% from last month', 
      icon: DollarSign, 
      tooltip: 'Revenue generated this month from completed jobs.',
      trend: 'up'
    },
    { 
      title: 'Active Jobs', 
      value: activeJobs.toString(), 
      change: `${completedJobsThisMonth} completed this month`, 
      icon: Wrench, 
      tooltip: 'Jobs currently in progress.',
      trend: 'up'
    },
    { 
      title: 'Customer Retention', 
      value: `${customerRetentionRate.toFixed(1)}%`, 
      change: `${repeatCustomers} repeat customers`, 
      icon: Users, 
      tooltip: 'Percentage of customers with multiple service visits.',
      trend: 'up'
    },
    { 
      title: 'Pending Revenue', 
      value: `$${pendingRevenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 
      change: `${overdueInvoices} overdue`, 
      icon: Receipt, 
      tooltip: 'Revenue from pending and overdue invoices.',
      trend: overdueInvoices > 0 ? 'warning' : 'neutral'
    },
  ];
  
  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Executive Summary - Top Priority for Company Owners */}
      <ExecutiveSummary />
      
      {/* Enhanced KPI Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const getTrendIcon = () => {
            switch (kpi.trend) {
              case 'up':
                return <TrendingUp className="h-4 w-4 text-green-600" />;
              case 'down':
                return <TrendingDown className="h-4 w-4 text-red-600" />;
              case 'warning':
                return <TrendingDown className="h-4 w-4 text-orange-600" />;
              default:
                return <Minus className="h-4 w-4 text-gray-400" />;
            }
          };

          const getTrendColor = () => {
            switch (kpi.trend) {
              case 'up':
                return 'text-green-600';
              case 'down':
                return 'text-red-600';
              case 'warning':
                return 'text-orange-600';
              default:
                return 'text-muted-foreground';
            }
          };

          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                   <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                   <Tooltip>
                     <TooltipTrigger>
                       <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                     </TooltipTrigger>
                     <TooltipContent>
                       <p>{kpi.tooltip}</p>
                     </TooltipContent>
                   </Tooltip>
                </div>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon()}
                  <p className={`text-xs ${getTrendColor()}`}>{kpi.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Business Insights Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Business Insights</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Job Value</span>
              <span className="font-semibold">${averageJobValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="font-semibold">{jobCompletionRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Jobs This Month</span>
              <span className="font-semibold">{completedJobsThisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Repeat Customers</span>
              <span className="font-semibold">{repeatCustomers}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <RevenueChart />
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
         <JobsStatusChart />
         
         {/* Quick Actions Card */}
         <Card>
           <CardHeader>
             <CardTitle>Quick Actions</CardTitle>
             <CardDescription>Common business tasks</CardDescription>
           </CardHeader>
           <CardContent className="space-y-3">
             <Button asChild className="w-full justify-start">
               <Link href="/jobs">
                 <Wrench className="mr-2 h-4 w-4" />
                 Create New Job
               </Link>
             </Button>
             <Button asChild variant="outline" className="w-full justify-start">
               <Link href="/invoicing">
                 <Receipt className="mr-2 h-4 w-4" />
                 Generate Invoice
               </Link>
             </Button>
             <Button asChild variant="outline" className="w-full justify-start">
               <Link href="/customers">
                 <Users className="mr-2 h-4 w-4" />
                 Add Customer
               </Link>
             </Button>
           </CardContent>
         </Card>
      </div>
      
      {/* Comprehensive Business Analytics Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Business Analytics & Performance</h2>
        <BusinessAnalytics />
      </div>
      
      {/* Goals and Progress Tracking */}
      <GoalsProgress />
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>An overview of the most recent jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Boat Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.id}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>{job.boat}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[job.status] || 'secondary'}>{job.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">View Job</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
