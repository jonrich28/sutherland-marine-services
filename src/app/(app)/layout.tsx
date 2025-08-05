
'use client';

import { MainNav } from '@/components/layout/main-nav';
import { UserNav } from '@/components/layout/user-nav';
import DemoWatermark from '@/components/ui/demo-watermark';
import LegalFooter from '@/components/ui/legal-footer';
import DemoStatusIndicator from '@/components/ui/demo-status-indicator';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Sailboat } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OnboardingTour } from '@/components/onboarding/onboarding-tour';
import { JobsProvider } from '@/hooks/use-jobs';
import { InvoicesProvider } from '@/hooks/use-invoices';
import { QuotesProvider } from '@/hooks/use-quotes';
import { useIsMobile } from '@/hooks/use-mobile';
import { BottomNavigation } from '@/components/mobile/bottom-navigation';
import { MobileHeader } from '@/components/mobile/mobile-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [userRole, setUserRole] = useState<'owner' | 'technician' | 'customer' | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole') as 'owner' | 'technician' | 'customer' | null;
      setUserRole(role);

      const hasOnboarded = localStorage.getItem('onboarding_completed') === 'true';
      if (!hasOnboarded) {
          setShowOnboarding(true);
      }
    }
  }, [pathname]);
  
  const handleOnboardingComplete = () => {
      localStorage.setItem('onboarding_completed', 'true');
      setShowOnboarding(false);
  }

  // Use mobile layout for technician and customer roles on mobile devices
  const shouldUseMobileLayout = isMobile && userRole && ['technician', 'customer'].includes(userRole);

  if (shouldUseMobileLayout) {
    return (
      <JobsProvider>
        <InvoicesProvider>
          <QuotesProvider>
            <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
              {/* Mobile Header */}
              <MobileHeader role={userRole} />
              
              {/* Main Content */}
              <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 pt-16">
                <div className="w-full max-w-full px-4 py-4">
                  {children}
                </div>
              </main>

              {/* Bottom Navigation */}
              <BottomNavigation role={userRole} />

              {/* Onboarding Tour */}
              <OnboardingTour 
                role={userRole} 
                open={showOnboarding} 
                onOpenChange={setShowOnboarding} 
                onComplete={handleOnboardingComplete} 
              />
            </div>
          </QuotesProvider>
        </InvoicesProvider>
      </JobsProvider>
    );
  }

  // Desktop layout (default)
  return (
    <JobsProvider>
      <InvoicesProvider>
        <QuotesProvider>
          <SidebarProvider>
            <Sidebar className="border-r">
              <SidebarHeader>
                <div className="flex items-center gap-2.5 p-2 pr-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Sailboat className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="font-headline text-xl font-bold text-foreground">
                    Sutherland Marine
                  </h1>
                </div>
              </SidebarHeader>
              <SidebarContent>
                {userRole && <MainNav role={userRole} />}
              </SidebarContent>
              <SidebarFooter>
                <DemoStatusIndicator />
                {userRole && <UserNav role={userRole} />}
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-full max-w-sm pl-9" data-search-input />
                </div>
              </header>
              <main className="flex-1 overflow-auto p-6">{children}</main>
              <LegalFooter />
            </SidebarInset>
            <DemoWatermark />
            {userRole && <OnboardingTour role={userRole} open={showOnboarding} onOpenChange={setShowOnboarding} onComplete={handleOnboardingComplete} />}
          </SidebarProvider>
        </QuotesProvider>
      </InvoicesProvider>
    </JobsProvider>
  );
}
