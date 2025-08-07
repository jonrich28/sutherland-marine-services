'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface LicenseAgreementProps {
  onAccept: () => void;
}

const LicenseAgreement: React.FC<LicenseAgreementProps> = ({ onAccept }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const handleAccept = () => {
    if (!agreedToTerms || !agreedToPrivacy) return;
    onAccept();
  };

  const handleDecline = () => {
    window.close();
    // If window.close() doesn't work (some browsers block it), redirect to about:blank
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 100);
  };

  const canAccept = agreedToTerms && agreedToPrivacy;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                ⚖️ Sutherland Marine Demo License
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  Evaluation Use Only
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  30-Day License
                </Badge>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Version 1.0.0</p>
              <p>August 5, 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              {/* Important Notice */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  ⚠️ Important - Read Before Proceeding
                </h3>
                <p className="text-yellow-700 text-sm">
                  This is demonstration software for evaluation purposes only. By using this demo, you agree to the terms below. 
                  Commercial use requires a separate license agreement.
                </p>
              </div>

              {/* Grant of License */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📄 Grant of License</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p>
                    Sutherland Marine grants you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Download and install the Demo Software for evaluation purposes only</li>
                    <li>Use the Demo Software internally to evaluate its functionality</li>
                    <li>Test the Demo Software on your own equipment for a period of <strong>30 days</strong></li>
                  </ul>
                </div>
              </div>

              {/* Restrictions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🚫 Restrictions</h3>
                <div className="bg-red-50 rounded-lg p-4 text-sm">
                  <p className="font-medium text-red-800 mb-2">You are NOT permitted to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-red-700">
                    <li><strong>Redistribute</strong> the Demo Software to third parties</li>
                    <li><strong>Modify, reverse engineer, or decompile</strong> the Demo Software</li>
                    <li><strong>Use for commercial purposes</strong> or in production environments</li>
                    <li><strong>Remove or modify</strong> copyright notices or proprietary markings</li>
                    <li><strong>Create derivative works</strong> based on the Demo Software</li>
                    <li><strong>Use beyond the 30-day period</strong> without obtaining a commercial license</li>
                  </ul>
                </div>
              </div>

              {/* Data and Privacy */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🔒 Data and Privacy</h3>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    <li>The Demo Software includes <strong>fictional sample data</strong> for demonstration only</li>
                    <li><strong>No real customer information</strong> is included in the demo</li>
                    <li>Data you enter is <strong>stored locally</strong> and not transmitted to our servers</li>
                    <li>You are responsible for <strong>securing any data</strong> you input during evaluation</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">©️ Intellectual Property</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>All rights, title, and interest in the Demo Software remain with <strong>Sutherland Marine</strong></li>
                    <li>This license does <strong>NOT</strong> grant rights to company trademarks or trade names</li>
                    <li>Feedback or suggestions you provide may be used without compensation</li>
                  </ul>
                </div>
              </div>

              {/* Warranty Disclaimer */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">⚠️ Warranty Disclaimer</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
                  <p className="text-orange-800">
                    THE DEMO SOFTWARE IS PROVIDED <strong>"AS IS"</strong> WITHOUT WARRANTY OF ANY KIND, 
                    including but not limited to warranties of merchantability, fitness for a particular purpose, 
                    or non-infringement.
                  </p>
                </div>
              </div>

              {/* Commercial Use */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">💼 Commercial Licensing</h3>
                <div className="bg-green-50 rounded-lg p-4 text-sm">
                  <p className="text-green-800 mb-2">
                    To use this software for commercial purposes, you must:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-green-700">
                    <li>Contact our sales team at <strong>sales@sutherlandmarine.com</strong></li>
                    <li>Obtain a commercial license agreement</li>
                    <li>Pay applicable licensing fees</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📞 Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="font-medium">Sales & Licensing:</p>
                      <p>sales@sutherlandmarine.com</p>
                    </div>
                    <div>
                      <p className="font-medium">Legal Questions:</p>
                      <p>legal@sutherlandmarine.com</p>
                    </div>
                    <div>
                      <p className="font-medium">Demo Support:</p>
                      <p>demo@sutherlandmarine.com</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p>(555) 123-BOAT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agree-terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-1"
              />
              <label htmlFor="agree-terms" className="text-sm text-gray-700 leading-relaxed">
                I have read and agree to the <strong>Demo License Agreement</strong> terms and conditions, 
                including the 30-day evaluation period and restrictions on commercial use.
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agree-privacy"
                checked={agreedToPrivacy}
                onCheckedChange={(checked) => setAgreedToPrivacy(checked === true)}
                className="mt-1"
              />
              <label htmlFor="agree-privacy" className="text-sm text-gray-700 leading-relaxed">
                I acknowledge the <strong>Privacy Notice</strong> and understand that demo data is stored locally 
                and not transmitted to Sutherland Marine servers.
              </label>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-3">
            <p>
              By clicking "Accept & Continue", you acknowledge that you have read and understood the 
              License Agreement, Privacy Notice, and Copyright Notice. This agreement is governed by 
              applicable law and any disputes will be resolved in accordance with the terms outlined above.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              className="flex-1"
            >
              Decline & Exit
            </Button>
            <Button 
              onClick={handleAccept} 
              disabled={!canAccept}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              Accept & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseAgreement;
