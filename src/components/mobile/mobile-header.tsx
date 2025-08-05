'use client';

import { Bell, Search, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { initialCustomers } from '@/lib/data';

interface MobileHeaderProps {
  role: 'owner' | 'technician' | 'customer';
}

const userDetails = {
  owner: {
    name: 'John Sutherland',
    email: 'john@sutherlandmarine.com',
    company: 'Sutherland Marine',
    avatarFallback: 'JS',
  },
  technician: {
    name: 'Mike Miller',
    email: 'mike.m@sutherlandmarine.com',
    company: 'Sutherland Marine',
    avatarFallback: 'MM',
  },
  customer: {
    name: 'Alex Thompson',
    email: 'alex.t@example.com',
    company: 'Customer',
    avatarFallback: 'AT',
  },
};

export function MobileHeader({ role }: MobileHeaderProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const details = userDetails[role];

  useEffect(() => {
    if (role === 'customer') {
      const customer = initialCustomers.find(c => c.name === 'Alex Thompson');
      setCustomerData(customer);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('onboarding_completed');
    router.push('/login');
  };

  const handleHelp = () => {
    localStorage.removeItem('onboarding_completed');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border md:hidden">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-sm">Sutherland Marine</h1>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className="h-8 w-8 p-0"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Avatar className="h-7 w-7">
                  <AvatarImage 
                    src={role === 'customer' && customerData ? (customerData.customerAvatar || customerData.avatar) : "https://placehold.co/32x32.png"} 
                    alt={role === 'customer' && customerData ? customerData.name : details.name} 
                  />
                  <AvatarFallback className="text-xs">{details.avatarFallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-2">
                  {role === 'customer' && customerData ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customerData.customerAvatar || customerData.avatar} alt={customerData.name} />
                          <AvatarFallback>{customerData.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{customerData.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={customerData.customerTier === 'VIP' ? 'default' : customerData.customerTier === 'Premium' ? 'secondary' : 'outline'} className="text-xs">
                              {customerData.customerTier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{customerData.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{customerData.phone}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3 w-3 mt-0.5" />
                          <span className="line-clamp-2">{customerData.address}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Member since {new Date(customerData.memberSince).toLocaleDateString()}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">{details.name}</p>
                      <p className="text-xs text-muted-foreground">{details.email}</p>
                    </>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleHelp}>
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-4 pb-3">
          <Input 
            placeholder="Search jobs, customers, parts..." 
            className="w-full"
            data-search-input
          />
        </div>
      )}
    </header>
  );
}
