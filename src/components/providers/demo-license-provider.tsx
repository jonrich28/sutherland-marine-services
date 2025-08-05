'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import LicenseAgreement from '@/components/auth/license-agreement';

interface DemoLicenseContextType {
  isLicenseAccepted: boolean;
  daysRemaining: number;
  isExpired: boolean;
  acceptLicense: () => void;
}

const DemoLicenseContext = createContext<DemoLicenseContextType | undefined>(undefined);

export const useDemoLicense = () => {
  const context = useContext(DemoLicenseContext);
  if (context === undefined) {
    throw new Error('useDemoLicense must be used within a DemoLicenseProvider');
  }
  return context;
};

interface DemoLicenseProviderProps {
  children: React.ReactNode;
}

export const DemoLicenseProvider: React.FC<DemoLicenseProviderProps> = ({ children }) => {
  const [isLicenseAccepted, setIsLicenseAccepted] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(30);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLicenseStatus = () => {
      const licenseAccepted = localStorage.getItem('sutherland-marine-demo-license-accepted');
      const acceptedDate = localStorage.getItem('sutherland-marine-demo-license-date');
      
      if (licenseAccepted && acceptedDate) {
        const acceptDate = parseInt(acceptedDate);
        const currentTime = Date.now();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const expirationTime = acceptDate + thirtyDaysInMs;
        
        if (currentTime < expirationTime) {
          // License is still valid
          setIsLicenseAccepted(true);
          const remaining = Math.ceil((expirationTime - currentTime) / (24 * 60 * 60 * 1000));
          setDaysRemaining(remaining);
          setIsExpired(false);
        } else {
          // License has expired
          localStorage.removeItem('sutherland-marine-demo-license-accepted');
          localStorage.removeItem('sutherland-marine-demo-license-date');
          setIsLicenseAccepted(false);
          setIsExpired(true);
          setDaysRemaining(0);
        }
      } else {
        // No license found
        setIsLicenseAccepted(false);
        setIsExpired(false);
        setDaysRemaining(30);
      }
      
      setIsLoading(false);
    };

    checkLicenseStatus();
    
    // Check license status every hour
    const interval = setInterval(checkLicenseStatus, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const acceptLicense = () => {
    const currentTime = Date.now();
    localStorage.setItem('sutherland-marine-demo-license-accepted', 'true');
    localStorage.setItem('sutherland-marine-demo-license-date', currentTime.toString());
    
    setIsLicenseAccepted(true);
    setDaysRemaining(30);
    setIsExpired(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Sutherland Marine Demo...</p>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-6xl mb-4">⏰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Demo License Expired</h1>
          <p className="text-gray-600 mb-6">
            Your 30-day evaluation period has ended. To continue using this software, please contact our sales team for commercial licensing.
          </p>
          <div className="space-y-3">
            <a 
              href="mailto:sales@sutherlandmarine.com"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Sales Team
            </a>
            <a 
              href="https://www.sutherlandmarine.com"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Visit Website
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2025 Sutherland Marine. All rights reserved.
          </p>
        </div>
      </div>
    );
  }

  const value: DemoLicenseContextType = {
    isLicenseAccepted,
    daysRemaining,
    isExpired,
    acceptLicense,
  };

  return (
    <DemoLicenseContext.Provider value={value}>
      {!isLicenseAccepted ? (
        <LicenseAgreement onAccept={acceptLicense} />
      ) : (
        children
      )}
    </DemoLicenseContext.Provider>
  );
};
