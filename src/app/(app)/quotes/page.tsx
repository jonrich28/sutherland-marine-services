
'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { initialCustomers } from '@/lib/data';
import type { Quote } from '@/hooks/use-quotes';
import { useQuotes } from '@/hooks/use-quotes';

export default function QuotesPage() {
    useSearch("[data-search-input]", "[data-search-item]");
    const { toast } = useToast();
    const { quotes, addQuote } = useQuotes();
    const [isCreateQuoteOpen, setCreateQuoteOpen] = useState(false);
    const [newQuote, setNewQuote] = useState({ customer: '', boat: '', amount: '', description: '' });

    const handleCreateQuote = (e: React.FormEvent) => {
        e.preventDefault();
        if (newQuote.customer && newQuote.boat && newQuote.amount && newQuote.description) {
            const newQuoteData: Quote = {
                id: `QUOTE-${(quotes.length + 12).toString().padStart(3, '0')}`,
                customer: newQuote.customer,
                boat: newQuote.boat,
                amount: `$${parseFloat(newQuote.amount).toFixed(2)}`,
                status: 'Pending',
                created: new Date().toISOString().split('T')[0],
                description: newQuote.description,
            };
            addQuote(newQuoteData);
            toast({
                title: 'Quote Created',
                description: `A new quote has been created for ${newQuote.customer}.`,
            });
            setNewQuote({ customer: '', boat: '', amount: '', description: '' });
            setCreateQuoteOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out all fields to create a quote.',
            });
        }
    };
    
    const handleCustomerSelect = (customerName: string) => {
        const customer = initialCustomers.find(c => c.name === customerName);
        if (customer) {
            setNewQuote({ ...newQuote, customer: customer.name, boat: typeof customer.boats[0] === 'string' ? customer.boats[0] : customer.boats[0]?.name || 'N/A' });
        }
    }

  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Quotes</h1>
            <p className="text-muted-foreground">Create and manage job quotes for customers.</p>
        </div>
        <Dialog open={isCreateQuoteOpen} onOpenChange={setCreateQuoteOpen}>
            <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Create Quote</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateQuote}>
                    <DialogHeader>
                        <DialogTitle>Create New Quote</DialogTitle>
                        <DialogDescription>
                            Fill out the form to create a new job quote.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                           <Label htmlFor="customer">Customer</Label>
                           <Select onValueChange={handleCustomerSelect}>
                               <SelectTrigger>
                                   <SelectValue placeholder="Select a customer" />
                               </SelectTrigger>
                               <SelectContent>
                                   {initialCustomers.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                               </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="boat">Boat</Label>
                            <Input id="boat" value={newQuote.boat} readOnly disabled placeholder="Customer's boat model" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" value={newQuote.amount} onChange={e => setNewQuote({...newQuote, amount: e.target.value})} placeholder="e.g., 1250.00" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="description">Description</Label>
                           <Textarea id="description" value={newQuote.description} onChange={e => setNewQuote({...newQuote, description: e.target.value})} placeholder="Describe the work to be quoted..." />
                        </div>
                    </div>
                     <DialogFooter>
                        <Button type="submit">Save Quote</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
          <CardDescription>A list of recently created job quotes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Boat</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id} data-search-item>
                  <TableCell className="font-medium" data-search-value={quote.id}>{quote.id}</TableCell>
                  <TableCell data-search-value={quote.customer}>{quote.customer}</TableCell>
                  <TableCell data-search-value={quote.boat}>{quote.boat}</TableCell>
                  <TableCell>{quote.amount}</TableCell>
                  <TableCell>
                    <Badge variant={quote.status === 'Approved' ? 'default' : quote.status === 'Declined' ? 'destructive' : 'secondary'}>{quote.status}</Badge>
                  </TableCell>
                  <TableCell>{quote.created}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Quote {quote.id}</DialogTitle>
                            <DialogDescription>Details for quote provided to {quote.customer}.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2">
                           <div><span className="font-semibold">Quote ID:</span> {quote.id}</div>
                           <div><span className="font-semibold">Customer:</span> {quote.customer}</div>
                           <div><span className="font-semibold">Boat:</span> {quote.boat}</div>
                           <div><span className="font-semibold">Amount:</span> {quote.amount}</div>
                           <div><span className="font-semibold">Status:</span> <Badge variant={quote.status === 'Approved' ? 'default' : quote.status === 'Declined' ? 'destructive' : 'secondary'}>{quote.status}</Badge></div>
                           <div><span className="font-semibold">Created:</span> {quote.created}</div>
                           <div><span className="font-semibold">Description:</span><p className="text-sm text-muted-foreground">{quote.description}</p></div>
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
