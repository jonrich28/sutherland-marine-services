import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { DemoLicenseProvider } from '@/components/providers/demo-license-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sutherland Marine Demo - Evaluation Version',
  description: 'Demo version of marine service management software. Evaluation use only - 30 day license.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <DemoLicenseProvider>
          {children}
          <Toaster />
        </DemoLicenseProvider>
      </body>
    </html>
  );
}
