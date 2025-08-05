
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

type OnboardingTourProps = {
    role: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplete: () => void;
}

const ownerSteps = [
    { title: "Welcome to Sutherland Marine!", description: "This quick tour will guide you through the key features for managing your marine service shop." },
    { title: "The Dashboard", description: "This is your command center. Get a high-level overview of total revenue, active jobs, customer counts, and pending invoices at a glance." },
    { title: "Job Management", description: "The 'Jobs' section is where you'll create, view, and manage all work orders. You can even use AI to generate detailed descriptions from a few keywords." },
    { title: "Customer & Technician Hubs", description: "Keep track of all your customers and their boats in the 'Customers' tab. Manage your team's assignments and schedules under 'Technicians'." },
    { title: "Inventory & Invoicing", description: "Track your parts in 'Inventory', create professional 'Quotes', and manage billing through the 'Invoicing' page." },
    { title: "Ready to Go!", description: "You're all set. Explore the app and don't hesitate to restart this tour from the Settings page if you need a refresher." },
];

const technicianSteps = [
    { title: "Welcome, Technician!", description: "This tour will show you the key tools for your role in Sutherland Marine." },
    { title: "My Assigned Jobs", description: "The 'My Jobs' page lists all the work orders assigned to you. This is your primary to-do list." },
    { title: "Job Details Page", description: "Clicking on a job takes you to its detail page. Here you can see the description, add notes, and upload photos of your work." },
    { title: "Inventory Check", description: "Need a part? The 'Inventory' page lets you check stock levels and find where parts are located." },
    { title: "Direct Messaging", description: "Use the 'Messaging' feature to communicate directly with customers or the shop owner about a job." },
    { title: "You're Ready!", description: "That's the rundown. Get started by checking your assigned jobs!" },
];

const customerSteps = [
    { title: "Welcome to Your Marine Portal!", description: "This tour will guide you through managing your boat's service with us." },
    { title: "Service History", description: "The 'Service History' page shows all past and present jobs for your boat. You can view details and the status of each one." },
    { title: "Invoices", description: "The 'Invoices' tab is where you can find and review all your invoices for completed work." },
    { title: "Direct Messaging", description: "Have a question? Use the 'Messages' tab to communicate directly with our service team about your boat." },
    { title: "All Set!", description: "You're ready to go. You can track your service and stay in touch with us right here." },
];


export function OnboardingTour({ role, open, onOpenChange, onComplete }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);

    let steps = ownerSteps;
    if (role === 'technician') steps = technicianSteps;
    if (role === 'customer') steps = customerSteps;

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
            onOpenChange(false);
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        onComplete();
        onOpenChange(false);
    }
    
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="font-headline text-2xl">{steps[currentStep].title}</SheetTitle>
                    <SheetDescription>{steps[currentStep].description}</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                   <Progress value={progress} className="w-full" />
                   <p className="text-center text-sm text-muted-foreground mt-2">Step {currentStep + 1} of {steps.length}</p>
                </div>
                <SheetFooter className="absolute bottom-4 right-4 left-4 flex flex-row justify-between">
                   <Button variant="ghost" onClick={handleSkip}>Skip Tour</Button>
                   <div className="flex gap-2">
                     {!isFirstStep && <Button variant="outline" onClick={handlePrev}><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Button>}
                     <Button onClick={handleNext}>
                        {isLastStep ? 'Finish' : 'Next'}
                        {isLastStep ? <CheckCircle className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                     </Button>
                   </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
