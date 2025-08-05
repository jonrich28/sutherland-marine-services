
'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import DemoWatermark from '@/components/ui/demo-watermark';
import LegalFooter from '@/components/ui/legal-footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sailboat, KeyRound, Shield, HardHat } from 'lucide-react';

const demoAccounts = [
  {
    role: 'Owner',
    value: 'owner',
    icon: Shield,
    path: '/dashboard',
    description: 'Full access to all features.',
  },
  {
    role: 'Technician',
    value: 'technician',
    icon: HardHat,
    path: '/jobs',
    description: 'Access to assigned jobs & inventory.',
  },
  {
    role: 'Customer',
    value: 'customer',
    icon: KeyRound,
    path: '/jobs',
    description: 'View service history & messages.',
  },
];

export default function LoginPage() {
  const router = useRouter();

  const handleDemoLogin = (role: string, path: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
    router.push(path);
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Sailboat className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Sutherland Marine
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your all-in-one marine service management platform.
          </p>
        </div>
        <LoginForm />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Access</CardTitle>
            <CardDescription>
              Or log in as a demo user to explore the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
               <Button
                key={account.role}
                variant="outline"
                className="w-full h-auto justify-start items-center p-3"
                onClick={() => handleDemoLogin(account.value, account.path)}
              >
                <account.icon className="h-5 w-5 mr-3 text-primary" />
                <div className="text-left">
                  <p className="font-semibold">{account.role}</p>
                  <p className="text-xs text-muted-foreground font-normal">{account.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-600">⚠️</span>
            <h3 className="font-semibold text-yellow-800">Demo Version Notice</h3>
          </div>
          <p className="text-yellow-700 text-sm mb-3">
            This is evaluation software with a 30-day license. All data is fictional and stored locally only.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Evaluation Use Only</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Local Storage</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">No Data Transmission</span>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Demo License Terms and Privacy Policy.
        </p>
      </div>
      <DemoWatermark />
      <LegalFooter />
    </div>
  );
}
