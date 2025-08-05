
'use client';

import { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input, useSearch } from '@/components/ui/input';
import type { Invoice } from '@/hooks/use-invoices';
import { useInvoices } from '@/hooks/use-invoices';
import { useJobs } from '@/hooks/use-jobs';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileInvoicesPage } from '@/components/mobile/mobile-invoices-page';

export default function InvoicingPage() {
    useSearch("[data-search-input]", "[data-search-item]");
    const { toast } = useToast();
    const { invoices, addInvoice } = useInvoices();
    const { jobs } = useJobs();
    const isMobile = useIsMobile();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCreateInvoiceOpen, setCreateInvoiceOpen] = useState(false);
    const [newInvoice, setNewInvoice] = useState({ jobId: '', amount: '', customer: '' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('userRole');
            setUserRole(role);
        }
    }, []);

    // Show mobile version for customer role on mobile devices
    if (isMobile && userRole === 'customer') {
        return <MobileInvoicesPage role="customer" />;
    }

    const handleCreateInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        if (newInvoice.jobId && newInvoice.amount && newInvoice.customer) {
            const newInvoiceData: Invoice = {
                id: `INV-${(invoices.length + 11).toString().padStart(3, '0')}`,
                job: newInvoice.jobId,
                customer: newInvoice.customer,
                amount: `$${parseFloat(newInvoice.amount).toFixed(2)}`,
                status: 'Pending',
                issued: new Date().toISOString().split('T')[0],
                due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            };
            addInvoice(newInvoiceData);
            toast({
                title: 'Invoice Created',
                description: `Invoice for job ${newInvoice.jobId} has been created.`,
            });
            setNewInvoice({ jobId: '', amount: '', customer: '' });
            setCreateInvoiceOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out all fields to create an invoice.',
            });
        }
    };
    
    const handleJobSelect = (jobId: string) => {
        const job = jobs.find(j => j.id === jobId);
        if(job) {
            setNewInvoice({...newInvoice, jobId, customer: job.customer });
        }
    }

    const unbilledJobs = jobs.filter(job => !invoices.some(inv => inv.job === job.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Invoicing</h1>
            <p className="text-muted-foreground">Generate and track invoices for completed jobs.</p>
        </div>
        <Dialog open={isCreateInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
            <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Create Invoice</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateInvoice}>
                    <DialogHeader>
                        <DialogTitle>Create New Invoice</DialogTitle>
                        <DialogDescription>
                            Select a job and enter the amount to generate an invoice.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="jobId">Job</Label>
                          <Select onValueChange={handleJobSelect}>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select a job to invoice" />
                              </SelectTrigger>
                              <SelectContent>
                                  {unbilledJobs.map(job => <SelectItem key={job.id} value={job.id}>{job.id} - {job.customer}</SelectItem>)}
                              </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="customer">Customer</Label>
                           <Input id="customer" value={newInvoice.customer} readOnly disabled placeholder="Customer name will appear here" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="amount">Amount</Label>
                           <Input id="amount" type="number" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} placeholder="e.g., 550.00" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Invoice</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>A list of recently issued invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} data-search-item>
                  <TableCell className="font-medium" data-search-value={invoice.id}>{invoice.id}</TableCell>
                  <TableCell data-search-value={invoice.job}>{invoice.job}</TableCell>
                  <TableCell data-search-value={invoice.customer}>{invoice.customer}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>{invoice.issued}</TableCell>
                  <TableCell>{invoice.due}</TableCell>
                  <TableCell className="text-right">
                     <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invoice {invoice.id}</DialogTitle>
                             <DialogDescription>
                              Details for invoice issued to {invoice.customer}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2">
                            <div><span className="font-semibold">Invoice ID:</span> {invoice.id}</div>
                            <div><span className="font-semibold">Job ID:</span> {invoice.job}</div>
                            <div><span className="font-semibold">Customer:</span> {invoice.customer}</div>
                            <div><span className="font-semibold">Amount:</span> {invoice.amount}</div>
                            <div><span className="font-semibold">Status:</span> <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>{invoice.status}</Badge></div>
                            <div><span className="font-semibold">Issued Date:</span> {invoice.issued}</div>
                            <div><span className="font-semibold">Due Date:</span> {invoice.due}</div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
