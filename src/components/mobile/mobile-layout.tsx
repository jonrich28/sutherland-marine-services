'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BottomNavigation } from '@/components/mobile/bottom-navigation';
// import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileHeader } from './mobile-header';
import { OnboardingTour } from '@/components/onboarding/onboarding-tour';
import { JobsProvider } from '@/hooks/use-jobs';
import { InvoicesProvider } from '@/hooks/use-invoices';
import { QuotesProvider } from '@/hooks/use-quotes';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
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
  };

  // Show mobile layout for technician and customer roles on mobile devices
  const shouldUseMobileLayout = isMobile && userRole && ['technician', 'customer'].includes(userRole);

  if (!shouldUseMobileLayout) {
    return null; // Let the main app layout handle desktop and owner views
  }

  return (
    <JobsProvider>
      <InvoicesProvider>
        <QuotesProvider>
          <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
            {/* Mobile Header */}
            {userRole && <MobileHeader role={userRole} />}
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 pt-16">
              <div className="w-full max-w-full px-4 py-4">
                {children}
              </div>
            </main>

            {/* Bottom Navigation */}
            {userRole && <BottomNavigation role={userRole} />}

            {/* Onboarding Tour */}
            {userRole && (
              <OnboardingTour 
                role={userRole} 
                open={showOnboarding} 
                onOpenChange={setShowOnboarding} 
                onComplete={handleOnboardingComplete} 
              />
            )}
          </div>
        </QuotesProvider>
      </InvoicesProvider>
    </JobsProvider>
  );
}
