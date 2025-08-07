'use client';

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
  DollarSign,
  Receipt,
  MessageSquare,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import { useJobs } from '@/hooks/use-jobs';
import { useInvoices } from '@/hooks/use-invoices';
import { initialCustomers } from '@/lib/data';

interface OfficeManagerMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral' | 'warning';
}

export function OfficeManagerDashboard() {
  const { jobs } = useJobs();
  const { invoices } = useInvoices();

  // Customer Service Metrics
  const totalCustomers = initialCustomers.length;
  const pendingInquiries = 3; // Simulated data
  const todayAppointments = jobs.filter(job => {
    const today = new Date().toDateString();
    const jobDate = new Date(job.created).toDateString();
    return jobDate === today;
  }).length;

  // Financial Metrics
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;
  const pendingRevenue = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((acc, inv) => acc + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  // Customer Satisfaction
  const avgResponseTime = '1.2 hours'; // Simulated
  const customerSatisfaction = '4.8/5.0'; // Simulated

  const metrics: OfficeManagerMetric[] = [
    {
      title: 'Active Customers',
      value: totalCustomers.toString(),
      change: '+2 this week',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Pending Inquiries',
      value: pendingInquiries.toString(),
      change: 'Requires attention',
      icon: MessageSquare,
      trend: pendingInquiries > 0 ? 'warning' : 'neutral'
    },
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.toString(),
      change: 'Scheduled today',
      icon: Calendar,
      trend: 'neutral'
    },
    {
      title: 'Pending Revenue',
      value: `$${pendingRevenue.toLocaleString()}`,
      change: `${overdueInvoices} overdue`,
      icon: DollarSign,
      trend: overdueInvoices > 0 ? 'warning' : 'up'
    },
    {
      title: 'Avg Response Time',
      value: avgResponseTime,
      change: '15% improvement',
      icon: Clock,
      trend: 'up'
    },
    {
      title: 'Customer Satisfaction',
      value: customerSatisfaction,
      change: 'Above industry avg',
      icon: CheckCircle,
      trend: 'up'
    }
  ];

  // Recent customer inquiries (simulated)
  const recentInquiries = [
    { id: 1, customer: 'Alex Thompson', type: 'Service Question', priority: 'High', time: '10 min ago' },
    { id: 2, customer: 'Liam Johnson', type: 'Billing Inquiry', priority: 'Medium', time: '25 min ago' },
    { id: 3, customer: 'Olivia Smith', type: 'Appointment Request', priority: 'Low', time: '1 hour ago' },
  ];

  // Upcoming appointments (from jobs data)
  const upcomingAppointments = jobs
    .filter(job => job.status === 'In Progress' || job.status === 'Awaiting Approval')
    .slice(0, 5);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-headline">Office Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Customer service, administrative operations, and business coordination
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(metric.trend)}
                <span className="ml-1">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Customer Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Customer Inquiries
            </CardTitle>
            <CardDescription>Customer service requests requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{inquiry.customer}</div>
                    <div className="text-sm text-muted-foreground">{inquiry.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(inquiry.priority) as any}>
                      {inquiry.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{inquiry.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Customer
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Appointments and important tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{appointment.customer}</div>
                    <div className="text-sm text-muted-foreground">{appointment.boat}</div>
                  </div>
                  <Badge variant="secondary">{appointment.status}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Invoice Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Invoice Management
            </CardTitle>
            <CardDescription>Billing and payment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{pendingInvoices}</div>
                  <div className="text-sm text-orange-700">Pending</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{overdueInvoices}</div>
                  <div className="text-sm text-red-700">Overdue</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Invoice
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reminders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Service Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Service Performance
            </CardTitle>
            <CardDescription>Service quality and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time Target</span>
                <span className="font-medium text-green-600">✓ Under 2 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="font-medium">4.8/5.0 ⭐</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">First Call Resolution</span>
                <span className="font-medium text-green-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Follow-up Rate</span>
                <span className="font-medium">95%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <FileText className="h-4 w-4 mr-2" />
              View Detailed Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Priority Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Priority Tasks & Action Items
          </CardTitle>
          <CardDescription>Important tasks requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-900">Follow up required</span>
              </div>
              <p className="text-sm text-orange-700">3 customers waiting for service quotes response</p>
            </div>
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-900">Payment overdue</span>
              </div>
              <p className="text-sm text-red-700">{overdueInvoices} invoices require collection action</p>
            </div>
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Schedule updates</span>
              </div>
              <p className="text-sm text-blue-700">2 appointments need rescheduling confirmation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
