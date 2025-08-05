
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wrench,
  Users,
  Boxes,
  HardHat,
  FileText,
  Receipt,
  MessageSquare,
  CreditCard,
  Settings,
  Sailboat,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const ownerNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Wrench },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/inventory', label: 'Inventory', icon: Boxes },
  { href: '/technicians', label: 'Technicians', icon: HardHat },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/invoicing', label: 'Invoicing', icon: Receipt },
  { href: '/messaging', label: 'Messaging', icon: MessageSquare },
  { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const technicianNavItems = [
  { href: '/jobs', label: 'My Jobs', icon: Wrench },
  { href: '/inventory', label: 'Inventory', icon: Boxes },
  { href: '/messaging', label: 'Messaging', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
]

const customerNavItems = [
    { href: '/jobs', label: 'Service History', icon: Wrench },
    { href: '/invoicing', label: 'Invoices', icon: Receipt },
    { href: '/messaging', label: 'Messages', icon: MessageSquare },
    { href: '/settings', label: 'Settings', icon: Settings },
];


export function MainNav({ className, role, ...props }: { role: string } & React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  let navItems = ownerNavItems;
  if (role === 'technician') {
    navItems = technicianNavItems;
  } else if (role === 'customer') {
    navItems = customerNavItems;
  }


  return (
    <nav className={cn('p-2', className)} {...props}>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
