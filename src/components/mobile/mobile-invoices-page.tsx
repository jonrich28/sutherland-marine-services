'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Receipt, 
  Download, 
  Eye,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useInvoices } from '@/hooks/use-invoices';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface MobileInvoicesPageProps {
  role: 'customer';
}

export function MobileInvoicesPage({ role }: MobileInvoicesPageProps) {
  const { invoices } = useInvoices();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter invoices for customer (Alex Thompson for demo)
  const customerInvoices = invoices.filter(invoice => 
    invoice.customer === 'Alex Thompson'
  );

  const filteredInvoices = customerInvoices
    .filter(invoice => {
      const matchesSearch = 
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.amount.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime());

  const statusCounts = customerInvoices.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueStatuses = Array.from(new Set(customerInvoices.map(invoice => invoice.status)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: string) => {
    return amount.replace('$', '').replace(',', '');
  };

  const handleViewInvoice = (invoice: any) => {
    // In a real app, this would open a detailed invoice view
    // For now, we'll show a toast with the action
    toast({
      title: "Invoice Details",
      description: `Viewing details for invoice ${invoice.id}`,
    });
  };

  const handleDownloadInvoice = (invoice: any) => {
    // In a real app, this would download the PDF invoice
    // For now, we'll simulate the download
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoice.id} as PDF`,
    });
    
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be the PDF URL
    link.download = `invoice-${invoice.id}.pdf`;
    link.click();
  };

  const totalAmount = customerInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + parseFloat(formatAmount(inv.amount)), 0);

  const pendingAmount = customerInvoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + parseFloat(formatAmount(inv.amount)), 0);

  // Only show mobile version on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold font-headline">My Invoices</h1>
          <p className="text-sm text-muted-foreground">View and manage your service invoices</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Paid</p>
                  <p className="text-lg font-bold">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Receipt className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-lg font-bold">${pendingAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Invoices</SheetTitle>
                <SheetDescription>
                  Filter invoices by status
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Status</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus('all')}
                      className="w-full justify-between"
                    >
                      All Invoices
                      <Badge variant="secondary">{customerInvoices.length}</Badge>
                    </Button>
                    {uniqueStatuses.map((status) => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className="w-full justify-between"
                      >
                        {status}
                        <Badge variant="secondary">{statusCounts[status] || 0}</Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {selectedStatus !== 'all' && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Filtered by:</span>
            <Badge 
              variant="secondary" 
              className="text-xs cursor-pointer"
              onClick={() => setSelectedStatus('all')}
            >
              {selectedStatus} ×
            </Badge>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredInvoices.length} of {customerInvoices.length} invoices
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Receipt className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No invoices found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || selectedStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No invoices available'
              }
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm">{invoice.id}</h3>
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Job: {invoice.job}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{invoice.amount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Issued: {formatDate(invoice.issued)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Due: {formatDate(invoice.due)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {invoice.status === 'Overdue' && (
                      <span className="text-red-600 font-medium">
                        Overdue by {Math.floor((new Date().getTime() - new Date(invoice.due).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Invoice {invoice.id}</DialogTitle>
                          <DialogDescription>
                            Details for invoice issued to {invoice.customer}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-3">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div><span className="font-semibold">Invoice ID:</span> {invoice.id}</div>
                            <div><span className="font-semibold">Job ID:</span> {invoice.job}</div>
                            <div><span className="font-semibold">Customer:</span> {invoice.customer}</div>
                            <div><span className="font-semibold">Amount:</span> {invoice.amount}</div>
                            <div>
                              <span className="font-semibold">Status:</span> 
                              <Badge 
                                className={`ml-2 text-xs ${getStatusColor(invoice.status)}`}
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                            <div><span className="font-semibold">Issued Date:</span> {formatDate(invoice.issued)}</div>
                            <div><span className="font-semibold">Due Date:</span> {formatDate(invoice.due)}</div>
                            {invoice.status === 'Overdue' && (
                              <div className="text-red-600 text-xs font-medium">
                                Overdue by {Math.floor((new Date().getTime() - new Date(invoice.due).getTime()) / (1000 * 60 * 60 * 24))} days
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleDownloadInvoice(invoice)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
