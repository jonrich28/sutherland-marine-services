
'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { OnboardingTour } from '@/components/onboarding/onboarding-tour';
import { HelpCircle, User, Phone, MapPin, Calendar, CreditCard, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { initialCustomers } from '@/lib/data';
import Image from 'next/image';


const userDetails = {
    owner: {
        name: 'Owner Account',
        email: 'owner@sutherlandmarine.com',
    },
    technician: {
        name: 'Technician Account',
        email: 'tech@sutherlandmarine.com',
    },
    customer: {
        name: 'Customer Account',
        email: 'customer@sutherlandmarine.com',
    }
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<keyof typeof userDetails | null>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole') as keyof typeof userDetails;
      setUserRole(role);
      
      // If customer, get their comprehensive data
      if (role === 'customer') {
        const customer = initialCustomers.find(c => c.name === 'Alex Thompson');
        setCustomerData(customer);
      }
    }
  }, []);

  // Show loading state until mounted and data is loaded
  if (!mounted) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state until mounted and data is loaded
  if (!mounted) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleStartTour = () => {
    localStorage.removeItem('onboarding_completed');
    // A quick reload to re-trigger the onboarding logic in the layout
    window.location.reload();
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'boat') => {
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
        // In a real app, this would update the customer data
        toast({
          title: type === 'avatar' ? "Profile Picture Updated" : "Boat Picture Updated",
          description: `Your ${type === 'avatar' ? 'profile picture' : 'boat picture'} has been updated.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const details = userRole ? userDetails[userRole] : userDetails.customer;

  const renderOwnerSettings = () => (
    <TabsContent value="shop">
      <Card>
        <CardHeader>
          <CardTitle>Shop Details</CardTitle>
          <CardDescription>
            Update your marine shop's information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name</Label>
            <Input id="shopName" defaultValue="Sutherland Marine" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopAddress">Address</Label>
            <Textarea id="shopAddress" defaultValue="123 Marina Bay, Waterfront City, 12345" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );

  return (
    <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground">
                {userRole === 'owner' ? 'Configure your shop and application settings.' : 'Manage your profile settings.'}
            </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                {userRole === 'customer' && <TabsTrigger value="boat">Boat Info</TabsTrigger>}
                {userRole === 'owner' && <TabsTrigger value="shop">Shop</TabsTrigger>}
            </TabsList>
            <TabsContent value="profile">
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                      {userRole === 'customer' && customerData && (
                        <Badge variant={customerData.customerTier === 'VIP' ? 'default' : customerData.customerTier === 'Premium' ? 'secondary' : 'outline'}>
                          {customerData.customerTier}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                    {userRole === 'customer' ? 'Manage your personal information and account details.' : 'Manage your personal account details.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {userRole === 'customer' && customerData ? (
                      <>
                        {/* Customer Avatar Section */}
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={customerData.customerAvatar || customerData.avatar} alt={customerData.name} />
                            <AvatarFallback className="text-lg">{customerData.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{customerData.name}</h3>
                            <p className="text-sm text-muted-foreground">Member since {new Date(customerData.memberSince).toLocaleDateString()}</p>
                            <Button asChild variant="outline" size="sm" className="cursor-pointer">
                              <label>
                                <Upload className="mr-2 h-4 w-4" />
                                Update Photo
                                <Input type="file" accept="image/*" className="sr-only" onChange={(e) => handleImageUpload(e, 'avatar')} />
                              </label>
                            </Button>
                          </div>
                        </div>
                        
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={customerData.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={customerData.email} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={customerData.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tier">Customer Tier</Label>
                            <Input id="tier" defaultValue={customerData.customerTier} disabled />
                          </div>
                        </div>
                        
                        {/* Address Information */}
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea id="address" defaultValue={customerData.address} />
                        </div>
                        
                        {/* Emergency Contact */}
                        <div className="space-y-2">
                          <Label htmlFor="emergency">Emergency Contact</Label>
                          <Input id="emergency" defaultValue={customerData.emergencyContact} />
                        </div>
                        
                        {/* Preferences */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contact">Preferred Contact Method</Label>
                            <Input id="contact" defaultValue={customerData.preferredContact} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Service Location Preference</Label>
                            <Input id="location" defaultValue={customerData.serviceLocation === 'marina' ? 'At Marina' : 'At Home/Dock'} />
                          </div>
                        </div>
                        
                        {/* Billing Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Billing Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billing">Billing Address</Label>
                              <Textarea id="billing" defaultValue={customerData.billingAddress} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="payment">Payment Method</Label>
                              <Input id="payment" defaultValue={customerData.paymentMethod} />
                            </div>
                          </div>
                        </div>
                        
                        {/* Service History Summary */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Service History
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-muted rounded-lg text-center">
                              <div className="text-2xl font-bold text-primary">{customerData.totalServices}</div>
                              <div className="text-sm text-muted-foreground mt-1">Total Services</div>
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-center">
                              <div className="text-base font-semibold text-foreground">{customerData.lastService ? new Date(customerData.lastService).toLocaleDateString() : 'N/A'}</div>
                              <div className="text-sm text-muted-foreground mt-1">Last Service</div>
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-center">
                              <div className="text-base font-semibold text-foreground">{customerData.nextScheduled ? new Date(customerData.nextScheduled).toLocaleDateString() : 'N/A'}</div>
                              <div className="text-sm text-muted-foreground mt-1">Next Scheduled</div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue={details.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={details.email} />
                        </div>
                      </>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            
            {userRole === 'customer' && customerData && (
              <TabsContent value="boat">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🛥️</span>
                      Boat Information
                    </CardTitle>
                    <CardDescription>
                      Manage your boat details and documentation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {customerData.boats.map((boat: any, index: number) => {
                      if (typeof boat === 'string') {
                        return (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{boat}</h3>
                              <p className="text-sm text-muted-foreground">Details not available (legacy format)</p>
                            </CardContent>
                          </Card>
                        );
                      }
                      return (
                        <div key={index} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`boat-name-${index}`}>Boat Name</Label>
                              <Input id={`boat-name-${index}`} defaultValue={boat.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`boat-year-${index}`}>Year</Label>
                              <Input id={`boat-year-${index}`} defaultValue={boat.year} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`boat-model-${index}`}>Model</Label>
                              <Input id={`boat-model-${index}`} defaultValue={boat.model} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`boat-length-${index}`}>Length</Label>
                              <Input id={`boat-length-${index}`} defaultValue={boat.length} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`boat-engine-${index}`}>Engine Type</Label>
                              <Input id={`boat-engine-${index}`} defaultValue={boat.engineType} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`boat-registration-${index}`}>Registration</Label>
                              <Input id={`boat-registration-${index}`} defaultValue={boat.registration} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`boat-hull-${index}`}>Hull ID</Label>
                            <Input id={`boat-hull-${index}`} defaultValue={boat.hullId} />
                          </div>
                          
                          {/* Boat Image Section */}
                          <div className="space-y-4">
                            <h4 className="font-semibold">Boat Photo</h4>
                            {customerData.boatImage ? (
                              <div className="relative aspect-video max-w-md">
                                <Image src={customerData.boatImage} alt="Boat" fill className="rounded-md object-cover" />
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md max-w-md">
                                <p>No boat picture uploaded.</p>
                              </div>
                            )}
                            <Button asChild variant="outline" className="cursor-pointer">
                              <label>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Boat Picture
                                <Input type="file" accept="image/*" className="sr-only" onChange={(e) => handleImageUpload(e, 'boat')} />
                              </label>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
            {userRole === 'owner' && renderOwnerSettings()}
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Help & Onboarding</CardTitle>
            <CardDescription>
              Need a refresher? You can restart the introductory tour here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleStartTour}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Restart Welcome Tour
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}
