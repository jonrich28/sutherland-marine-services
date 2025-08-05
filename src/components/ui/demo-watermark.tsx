'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useDemoLicense } from '@/components/providers/demo-license-provider';

const DemoWatermark: React.FC = () => {
  const { daysRemaining, isExpired } = useDemoLicense();

  if (isExpired) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className="flex flex-col gap-2">
        <Badge 
          variant="outline" 
          className="bg-yellow-50/95 text-yellow-700 border-yellow-300 backdrop-blur-sm shadow-sm pointer-events-auto"
        >
          DEMO VERSION
        </Badge>
        <Badge 
          variant="outline" 
          className="bg-blue-50/95 text-blue-700 border-blue-300 backdrop-blur-sm shadow-sm text-xs pointer-events-auto"
        >
          {daysRemaining} days remaining
        </Badge>
      </div>
    </div>
  );
};

export default DemoWatermark;
