'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const LegalFooter: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6 text-xs text-gray-600">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-gray-800 font-medium">
            © 2025 Sutherland Marine. All rights reserved.
          </span>
          <span className="text-yellow-700 font-medium">
            DEMO VERSION - Evaluation Use Only
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-800">
                License Terms
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Demo License Terms</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-96 w-full">
                <div className="space-y-4 text-sm p-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <h4 className="font-semibold text-yellow-800">Evaluation Use Only</h4>
                    <p className="text-yellow-700">
                      This software is licensed for evaluation purposes only. Commercial use requires a separate license.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">License Restrictions</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>30-day evaluation period</li>
                      <li>No commercial use or production deployment</li>
                      <li>No redistribution to third parties</li>
                      <li>No reverse engineering or modification</li>
                      <li>Must obtain commercial license for continued use</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Commercial Licensing</h4>
                    <p className="text-gray-700">
                      Contact <strong>sales@sutherlandmarine.com</strong> for commercial licensing options.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-800">
                Privacy Notice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Privacy Notice</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-96 w-full">
                <div className="space-y-4 text-sm p-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h4 className="font-semibold text-blue-800">Local Operation</h4>
                    <p className="text-blue-700">
                      This demo operates entirely on your local machine. No data is transmitted to our servers.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Data Handling</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>All demo data is fictional and for demonstration only</li>
                      <li>Any data you enter is stored locally on your device</li>
                      <li>No personal information is required or collected</li>
                      <li>No tracking or analytics are performed</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <p className="text-gray-700">
                      For privacy questions: <strong>privacy@sutherlandmarine.com</strong>
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          
          <a 
            href="mailto:sales@sutherlandmarine.com"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Get Commercial License
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;
