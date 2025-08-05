'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Wrench,
  Users,
  Boxes,
  Receipt,
  MessageSquare,
  Settings,
  BarChart3,
} from 'lucide-react';

interface BottomNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BottomNavigationProps {
  role: 'technician' | 'customer' | 'owner';
}

const technicianNavItems: BottomNavItem[] = [
  { href: '/jobs', label: 'My Jobs', icon: Wrench },
  { href: '/inventory', label: 'Inventory', icon: Boxes },
  { href: '/messaging', label: 'Messages', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const customerNavItems: BottomNavItem[] = [
  { href: '/jobs', label: 'Service', icon: Wrench },
  { href: '/invoicing', label: 'Invoices', icon: Receipt },
  { href: '/messaging', label: 'Messages', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const ownerMobileNavItems: BottomNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/jobs', label: 'Jobs', icon: Wrench },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/messaging', label: 'Messages', icon: MessageSquare },
];

export function BottomNavigation({ role }: BottomNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  let navItems = ownerMobileNavItems;
  if (role === 'technician') {
    navItems = technicianNavItems;
  } else if (role === 'customer') {
    navItems = customerNavItems;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center h-full px-3 py-2 text-xs font-medium transition-colors rounded-lg",
                "min-w-0 flex-1 max-w-[80px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-[10px] leading-none truncate w-full text-center",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
