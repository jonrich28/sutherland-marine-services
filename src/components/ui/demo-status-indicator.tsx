'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDemoLicense } from '@/components/providers/demo-license-provider';
import { Clock, Shield, ExternalLink } from 'lucide-react';

const DemoStatusIndicator: React.FC = () => {
  const { daysRemaining, isExpired } = useDemoLicense();

  if (isExpired) return null;

  const getStatusColor = () => {
    if (daysRemaining > 20) return 'bg-green-50 text-green-700 border-green-300';
    if (daysRemaining > 10) return 'bg-yellow-50 text-yellow-700 border-yellow-300';
    return 'bg-red-50 text-red-700 border-red-300';
  };

  const getUrgencyMessage = () => {
    if (daysRemaining > 20) return 'Plenty of time to evaluate';
    if (daysRemaining > 10) return 'Consider reaching out for licensing';
    if (daysRemaining > 5) return 'License expires soon - contact sales';
    return 'License expires very soon!';
  };

  return (
    <div className="space-y-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-auto p-2 text-left hover:bg-gray-100"
          >
            <div className="flex items-center gap-2 w-full">
              <Shield className="h-4 w-4 text-blue-600" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">Demo License</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
                    {daysRemaining}d
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {getUrgencyMessage()}
                </p>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Demo License Status
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {daysRemaining}
              </div>
              <p className="text-sm text-gray-600">
                {daysRemaining === 1 ? 'day' : 'days'} remaining in evaluation period
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 mb-2">Evaluation License</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 30-day evaluation period</li>
                <li>• Local operation only</li>
                <li>• No commercial use permitted</li>
                <li>• Full feature access for testing</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Ready for Commercial Use?</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  asChild
                  className="w-full"
                >
                  <a href="mailto:sales@sutherlandmarine.com">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contact Sales Team
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  asChild
                  className="w-full"
                >
                  <a href="https://www.sutherlandmarine.com" target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
              <strong>Need an extension?</strong> Contact our sales team to discuss extended evaluation periods or early access to commercial features.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoStatusIndicator;
