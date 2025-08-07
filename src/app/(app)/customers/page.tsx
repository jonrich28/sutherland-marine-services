
'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { PlusCircle, Upload, User, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input, useSearch } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';
import { initialCustomers, Customer } from '@/lib/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useJobs } from '@/hooks/use-jobs';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  boatName: z.string().min(1, 'Boat name is required'),
  boatYear: z.string().min(4, 'Boat year is required'),
  boatModel: z.string().min(1, 'Boat model is required'),
  engineType: z.string().min(1, 'Engine type is required'),
  hullId: z.string().min(1, 'Hull ID is required'),
  boatLength: z.string().min(1, 'Boat length is required'),
  registration: z.string().min(1, 'Registration is required'),
  customerTier: z.enum(['Regular', 'Premium', 'VIP']),
  preferredContact: z.enum(['email', 'phone', 'text']),
  serviceLocation: z.enum(['marina', 'home']),
  billingAddress: z.string().min(1, 'Billing address is required'),
  paymentMethod: z.enum(['Credit Card', 'Check', 'Bank Transfer']),
  internalNotes: z.string().optional(),
});

export default function CustomersPage() {
  useSearch("[data-search-input]", "[data-search-item]");
  const { toast } = useToast();
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAddCustomerOpen, setAddCustomerOpen] = useState(false);
  const { jobs } = useJobs();

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      emergencyContact: '',
      boatName: '',
      boatYear: '',
      boatModel: '',
      engineType: '',
      hullId: '',
      boatLength: '',
      registration: '',
      customerTier: 'Regular',
      preferredContact: 'email',
      serviceLocation: 'marina',
      billingAddress: '',
      paymentMethod: 'Credit Card',
      internalNotes: '',
    },
  });

  const getAssignedTechnician = (customerName: string) => {
    const customerJobs = jobs.filter(job => job.customer === customerName);
    if (customerJobs.length > 0) {
      return customerJobs.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())[0].tech;
    }
    return 'Unassigned';
  };

  const handleAddCustomer = (values: z.infer<typeof customerSchema>) => {
    const newCustomerData: Customer = {
      id: customers.length + 1,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      emergencyContact: values.emergencyContact,
      boats: [{
        name: values.boatName,
        year: parseInt(values.boatYear),
        model: values.boatModel,
        engineType: values.engineType,
        hullId: values.hullId,
        length: values.boatLength,
        registration: values.registration
      }],
      avatar: `https://placehold.co/40x40.png?text=${values.name.split(' ').map(n => n[0]).join('')}`,
      customerAvatar: null,
      boatImage: null,
      memberSince: new Date().toISOString().split('T')[0],
      customerTier: values.customerTier,
      preferredContact: values.preferredContact,
      serviceLocation: values.serviceLocation,
      billingAddress: values.billingAddress,
      paymentMethod: values.paymentMethod,
      totalServices: 0,
      lastService: '',
      nextScheduled: '',
      internalNotes: values.internalNotes || '',
    };
    setCustomers([...customers, newCustomerData]);
    toast({
      title: "Customer Added",
      description: `${values.name} has been added to the customer list.`,
    });
    form.reset();
    setAddCustomerOpen(false);
  };

  const handleBoatImageUpload = (event: React.ChangeEvent<HTMLInputElement>, customerId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid image file.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setCustomers(customers.map(c => c.id === customerId ? { ...c, boatImage: dataUrl } as Customer : c));
        toast({
          title: "Image Uploaded",
          description: "The boat picture has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomerAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>, customerId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid image file.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setCustomers(customers.map(c => c.id === customerId ? { ...c, customerAvatar: dataUrl } as Customer : c));
        toast({
          title: "Avatar Uploaded",
          description: "The customer profile picture has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Customer Management</h1>
          <p className="text-muted-foreground">View and manage all customer accounts and their boats.</p>
        </div>
        <Dialog open={isAddCustomerOpen} onOpenChange={setAddCustomerOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddCustomer)}>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Enter comprehensive details for the new customer account.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="personal" className="py-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="boat">Boat Info</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerTier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Customer Tier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select tier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Regular">Regular</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Marina Drive, Harbor City, FL 33101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe - (555) 987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="boat" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="boatName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Boat Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Sea Breeze" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="boatYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input placeholder="2020" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="boatModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="Sea Ray Sundancer 240" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="boatLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                              <Input placeholder="24 ft" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="engineType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engine Type</FormLabel>
                            <FormControl>
                              <Input placeholder="MerCruiser 4.5L" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="registration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration</FormLabel>
                            <FormControl>
                              <Input placeholder="FL-1234-AB" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="hullId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hull ID</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC12345D819" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="preferences" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="preferredContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="text">Text Message</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="serviceLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Location Preference</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="marina">At Marina</SelectItem>
                                <SelectItem value="home">At Home/Dock</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="internalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special notes about the customer or their preferences..."
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="billing" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="billingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Same as customer address or different..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Credit Card">Credit Card</SelectItem>
                              <SelectItem value="Check">Check</SelectItem>
                              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
                
                <DialogFooter>
                  <Button type="submit">Save Customer</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>A list of all customers in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Boats</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Assigned Technician</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => {
                const assignedTech = getAssignedTechnician(customer.name);
                return (
                  <TableRow key={customer.id} data-search-item>
                    <TableCell className="font-medium flex items-center gap-3" data-search-value={customer.name}>
                       <Avatar className="h-8 w-8 border">
                          <AvatarImage src={customer.customerAvatar || customer.avatar} alt={customer.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <div>
                         <div className="font-medium">{customer.name}</div>
                         <div className="text-sm text-muted-foreground">{customer.email}</div>
                       </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Prefers {customer.preferredContact}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell data-search-value={customer.boats.map(boat => typeof boat === 'string' ? boat : boat.name).join(', ')}>
                      <div className="space-y-1">
                        {customer.boats.map((boat, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{typeof boat === 'string' ? boat : boat.name}</div>
                            {typeof boat !== 'string' && (
                              <div className="text-xs text-muted-foreground">{boat.year} {boat.model}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.customerTier === 'VIP' ? 'default' : customer.customerTier === 'Premium' ? 'secondary' : 'outline'}>
                        {customer.customerTier}
                      </Badge>
                    </TableCell>
                    <TableCell data-search-value={assignedTech}>{assignedTech}</TableCell>
                    <TableCell className="text-right">
                       <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <User className="h-5 w-5" />
                              Customer Profile: {customer.name}
                              <Badge variant={customer.customerTier === 'VIP' ? 'default' : customer.customerTier === 'Premium' ? 'secondary' : 'outline'}>
                                {customer.customerTier}
                              </Badge>
                            </DialogTitle>
                            <DialogDescription>
                              Comprehensive customer information and boat details.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Tabs defaultValue="overview" className="py-4">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="boat">Boat Details</TabsTrigger>
                              <TabsTrigger value="service">Service History</TabsTrigger>
                              <TabsTrigger value="photos">Photos</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      Personal Information
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-12 w-12">
                                        <AvatarImage src={customer.customerAvatar || customer.avatar} alt={customer.name} />
                                        <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-semibold">{customer.name}</div>
                                        <div className="text-sm text-muted-foreground">Member since {customer.memberSince ? new Date(customer.memberSince).toLocaleDateString() : 'N/A'}</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div><span className="font-medium">Email:</span> {customer.email}</div>
                                      <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        <span className="font-medium">Phone:</span> {customer.phone}
                                      </div>
                                      <div className="flex items-start gap-1">
                                        <MapPin className="h-3 w-3 mt-0.5" />
                                        <div>
                                          <span className="font-medium">Address:</span>
                                          <div className="text-muted-foreground">{customer.address}</div>
                                        </div>
                                      </div>
                                      <div><span className="font-medium">Emergency Contact:</span> {customer.emergencyContact}</div>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                {/* Preferences & Service */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Preferences & Service</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3 text-sm">
                                    <div><span className="font-medium">Preferred Contact:</span> {customer.preferredContact}</div>
                                    <div><span className="font-medium">Service Location:</span> {customer.serviceLocation === 'marina' ? 'At Marina' : 'At Home/Dock'}</div>
                                    <div><span className="font-medium">Assigned Technician:</span> {assignedTech}</div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Total Services:</span> 
                                      <Badge variant="outline">{customer.totalServices}</Badge>
                                    </div>
                                    <div><span className="font-medium">Last Service:</span> {customer.lastService || 'None'}</div>
                                    <div><span className="font-medium">Next Scheduled:</span> {customer.nextScheduled || 'Not scheduled'}</div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              {/* Billing Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Billing Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                  <div><span className="font-medium">Billing Address:</span> {customer.billingAddress}</div>
                                  <div><span className="font-medium">Payment Method:</span> {customer.paymentMethod}</div>
                                </CardContent>
                              </Card>
                              
                              {/* Internal Notes */}
                              {customer.internalNotes && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Internal Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground">{customer.internalNotes}</p>
                                  </CardContent>
                                </Card>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="boat" className="space-y-4">
                              {customer.boats.map((boat, index) => {
                                if (typeof boat === 'string') {
                                  return (
                                    <Card key={index}>
                                      <CardHeader>
                                        <CardTitle className="text-lg">{boat}</CardTitle>
                                        <CardDescription>Details not available (legacy format)</CardDescription>
                                      </CardHeader>
                                    </Card>
                                  );
                                }
                                return (
                                  <Card key={index}>
                                    <CardHeader>
                                      <CardTitle className="text-lg">{boat.name}</CardTitle>
                                      <CardDescription>{boat.year} {boat.model}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium">Year:</span> {boat.year}</div>
                                        <div><span className="font-medium">Length:</span> {boat.length}</div>
                                        <div><span className="font-medium">Engine:</span> {boat.engineType}</div>
                                        <div><span className="font-medium">Registration:</span> {boat.registration}</div>
                                        <div className="col-span-2"><span className="font-medium">Hull ID:</span> {boat.hullId}</div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </TabsContent>
                            
                            <TabsContent value="service" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Service Summary
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 bg-muted rounded-lg text-center">
                                      <div className="text-2xl font-bold text-primary">{customer.totalServices}</div>
                                      <div className="text-sm text-muted-foreground mt-1">Total Services</div>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg text-center">
                                      <div className="text-base font-semibold text-foreground">{customer.lastService ? new Date(customer.lastService).toLocaleDateString() : 'N/A'}</div>
                                      <div className="text-sm text-muted-foreground mt-1">Last Service</div>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg text-center">
                                      <div className="text-base font-semibold text-foreground">{customer.nextScheduled ? new Date(customer.nextScheduled).toLocaleDateString() : 'N/A'}</div>
                                      <div className="text-sm text-muted-foreground mt-1">Next Scheduled</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="photos" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                {/* Customer Avatar */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Customer Photo</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    {customer.customerAvatar ? (
                                      <div className="relative aspect-square max-w-48">
                                        <Image src={customer.customerAvatar} alt="Customer" fill className="rounded-md object-cover" />
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md">
                                        <User className="h-8 w-8 mx-auto mb-2" />
                                        <p>No customer photo uploaded.</p>
                                      </div>
                                    )}
                                    <Button asChild variant="outline" className="w-full cursor-pointer">
                                      <label>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Customer Photo
                                        <Input type="file" accept="image/*" className="sr-only" onChange={(e) => handleCustomerAvatarUpload(e, customer.id)} />
                                      </label>
                                    </Button>
                                  </CardContent>
                                </Card>
                                
                                {/* Boat Photo */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Boat Photo</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    {customer.boatImage ? (
                                      <div className="relative aspect-video">
                                        <Image src={customer.boatImage} alt="Boat" fill className="rounded-md object-cover" data-ai-hint="boat sea"/>
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md">
                                        <p>No boat picture uploaded.</p>
                                      </div>
                                    )}
                                    <Button asChild variant="outline" className="w-full cursor-pointer">
                                      <label>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Boat Picture
                                        <Input type="file" accept="image/*" className="sr-only" onChange={(e) => handleBoatImageUpload(e, customer.id)} />
                                      </label>
                                    </Button>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
