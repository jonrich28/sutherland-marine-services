
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const userDetails = {
    owner: {
        name: 'Owner Account',
        email: 'owner@sutherlandmarine.com',
        avatarFallback: 'OA',
        company: 'Sutherland Marine'
    },
    technician: {
        name: 'Technician Account',
        email: 'tech@sutherlandmarine.com',
        avatarFallback: 'TA',
        company: 'Sutherland Marine'
    },
    customer: {
        name: 'Customer Account',
        email: 'customer@sutherlandmarine.com',
        avatarFallback: 'CA',
        company: 'Personal Account'
    }
}

export function UserNav({ role }: { role: 'owner' | 'technician' | 'customer' }) {
  const router = useRouter();
  const details = userDetails[role] || userDetails.customer;

  const handleHelp = () => {
    localStorage.removeItem('onboarding_completed');
    window.location.reload();
  }
  
  return (
    <div className="p-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-full justify-start gap-2 px-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt={details.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{details.avatarFallback}</AvatarFallback>
                    </Avatar>
                     <div className="text-left group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium">{details.name}</p>
                        <p className="text-xs text-muted-foreground">{details.email}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{details.company}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {details.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => router.push('/settings')}>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleHelp}>
                        Help & Support
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/login')}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
