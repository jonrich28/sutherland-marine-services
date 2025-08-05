
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Bot, HelpCircle, PlusCircle, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input, useSearch } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useJobs } from '@/hooks/use-jobs';
import type { Job } from '@/hooks/use-jobs';
import { initialCustomers } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileJobsPage } from '@/components/mobile/mobile-jobs-page';


const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Completed': 'default',
    'In Progress': 'secondary',
    'Awaiting Payment': 'secondary',
    'Awaiting Approval': 'secondary',
    'Parts Ordered': 'secondary',
    'On Hold': 'destructive',
};

export default function JobsPage() {
    useSearch("[data-search-input]", "[data-search-item]");
    const { toast } = useToast();
    const { jobs, addJob } = useJobs();
    const isMobile = useIsMobile();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCreateJobOpen, setCreateJobOpen] = useState(false);
    const [newJob, setNewJob] = useState({ customer: '', description: '', keywords: '' });
    const [jobSummary, setJobSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingDescription, setLoadingDescription] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('userRole');
            setUserRole(role);
        }
    }, []);

    // Show mobile version for technician and customer roles on mobile devices
    if (isMobile && userRole && ['technician', 'customer'].includes(userRole)) {
        return <MobileJobsPage role={userRole as 'technician' | 'customer'} />;
    }

    const handleCreateJob = (e: React.FormEvent) => {
      e.preventDefault();
      if (newJob.customer && newJob.description) {
        const customerData = initialCustomers.find(c => c.name === newJob.customer);
        
        const newJobData: Job = {
            id: `JOB-${(jobs.length + 10).toString().padStart(3, '0')}`,
            customer: newJob.customer,
            boat: customerData?.boats[0] || 'N/A',
            tech: 'Unassigned',
            status: 'Awaiting Approval',
            created: new Date().toISOString().split('T')[0],
            description: newJob.description,
            notes: [],
            photos: [],
        };
        addJob(newJobData);
        toast({
          title: "Job Created",
          description: `New job for ${newJob.customer} has been created.`,
        });
        setNewJob({ customer: '', description: '', keywords: '' });
        setCreateJobOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Missing Information',
          description: 'Please select a customer and provide a description.',
        });
      }
    };
    
    const getJobsForRole = () => {
        if (!userRole) return [];
        const customerNameMap: {[key: string]: string} = {
            customer: "Liam Johnson",
            technician: "Mike Miller",
        }
        
        switch (userRole) {
            case 'customer':
                return jobs.filter(job => job.customer === customerNameMap.customer);
            case 'technician':
                return jobs.filter(job => job.tech === customerNameMap.technician);
            case 'owner':
            default:
                return jobs;
        }
    }

    const handleSummarizeJob = async (job: Job) => {
      setLoadingSummary(true);
      setJobSummary('');
      try {
        // Mock summary for demo purposes
        const mockSummary = `Job Summary: ${job.description}. Current status: ${job.status}. This is a demo summary generated without AI.`;
        setJobSummary(mockSummary);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate summary.' });
        console.error(error);
      }
      setLoadingSummary(false);
    }
    
    const handleGenerateDescription = async () => {
        if(!newJob.keywords) return;
        setLoadingDescription(true);
        try {
            // Mock description generation for demo purposes
            const mockDescription = `Professional marine service work involving: ${newJob.keywords}. This task requires experienced technician attention and will be completed according to industry standards.`;
            setNewJob({...newJob, description: mockDescription });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate description.' });
            console.error(error);
        }
        setLoadingDescription(false);
    }

    const visibleJobs = getJobsForRole();
    const isOwner = userRole === 'owner';
    const isTechnician = userRole === 'technician';
    const isCustomer = userRole === 'customer';

  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">
                {isOwner ? 'Jobs Management' : (isTechnician ? 'My Assigned Jobs' : 'My Service History')}
            </h1>
            <p className="text-muted-foreground">
                {isOwner ? 'Manage all ongoing and past jobs.' : (isTechnician ? 'All jobs currently assigned to you.' : 'A log of all service on your boats.')}
            </p>
        </div>
        {isOwner && (
            <Dialog open={isCreateJobOpen} onOpenChange={setCreateJobOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateJob}>
                  <DialogHeader>
                    <DialogTitle>Create New Job</DialogTitle>
                    <DialogDescription>
                      Fill out the form to create a new service job. Use keywords to generate a description with AI.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Customer</Label>
                      <Select onValueChange={(value) => setNewJob({...newJob, customer: value})}>
                          <SelectTrigger>
                              <SelectValue placeholder="Select a customer" />
                          </SelectTrigger>
                          <SelectContent>
                              {[...new Set(initialCustomers.map(c => c.name))].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-1.5">
                         <Label htmlFor="keywords">Description Keywords</Label>
                         <Tooltip>
                            <TooltipTrigger>
                               <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                               <p>Enter a few words (e.g., "winterize engine") and let AI write the full description.</p>
                            </TooltipContent>
                         </Tooltip>
                       </div>
                       <div className="flex items-center gap-2">
                           <Input id="keywords" value={newJob.keywords} onChange={e => setNewJob({...newJob, keywords: e.target.value})} placeholder="e.g., annual service, replace impeller" />
                           <Button type="button" size="icon" onClick={handleGenerateDescription} disabled={loadingDescription || !newJob.keywords}>
                               <Sparkles className="h-4 w-4" />
                           </Button>
                       </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Full Description</Label>
                      {loadingDescription ? (
                        <Skeleton className="h-24 w-full" />
                      ) : (
                        <Textarea id="description" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="A detailed job description will be generated here." className="h-24" />
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Job</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{isOwner ? 'All Jobs' : 'My Jobs'}</CardTitle>
          <CardDescription>
            {isOwner ? 'An overview of all service jobs.' : (userRole === 'technician' ? 'Jobs you are assigned to.' : 'Your service history.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                {isOwner && <TableHead>Customer</TableHead>}
                <TableHead>Boat</TableHead>
                {isOwner && <TableHead>Technician</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleJobs.map((job) => (
                <TableRow key={job.id} data-search-item>
                  <TableCell className="font-medium" data-search-value={job.id}>{job.id}</TableCell>
                   {isOwner && <TableCell data-search-value={job.customer}>{job.customer}</TableCell>}
                  <TableCell data-search-value={job.boat}>{job.boat}</TableCell>
                   {isOwner && <TableCell data-search-value={job.tech}>{job.tech}</TableCell>}
                  <TableCell>
                    <Badge variant={statusVariantMap[job.status] || 'secondary'}>{job.status}</Badge>
                  </TableCell>
                  <TableCell>{job.created}</TableCell>
                  <TableCell className="text-right">
                    { isCustomer ? (
                       <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Job {job.id}</DialogTitle>
                              <DialogDescription>Details for job on {job.boat} for {job.customer}.</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                             <div className="space-y-2">
                               <h4 className="font-semibold">Job Details</h4>
                               <div className="grid grid-cols-2 gap-2 text-sm">
                                 <span>Job ID:</span> <span className="text-muted-foreground">{job.id}</span>
                                 <span>Customer:</span> <span className="text-muted-foreground">{job.customer}</span>
                                 <span>Boat:</span> <span className="text-muted-foreground">{job.boat}</span>
                                 <span>Technician:</span> <span className="text-muted-foreground">{job.tech}</span>
                                 <span>Status:</span> <span><Badge variant={statusVariantMap[job.status] || 'secondary'}>{job.status}</Badge></span>
                                 <span>Created:</span> <span className="text-muted-foreground">{job.created}</span>
                               </div>
                             </div>
                              <div className="space-y-2">
                                  <h4 className="font-semibold">Description</h4>
                                  <p className="text-sm text-muted-foreground">{job.description}</p>
                              </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="flex gap-2 justify-end">
                         <Dialog onOpenChange={() => setJobSummary('')}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bot className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                             <DialogHeader>
                                <DialogTitle>AI Job Summary</DialogTitle>
                                <DialogDescription>A quick summary of the job description and status.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" onClick={() => handleSummarizeJob(job)} disabled={loadingSummary}>
                                        <Bot className="h-4 w-4 mr-2" />
                                        {loadingSummary ? "Generating..." : "Summarize Job"}
                                    </Button>
                                    {loadingSummary && <Skeleton className="h-6 w-full mt-2" />}
                                    {jobSummary && !loadingSummary && (
                                        <div className="mt-2 text-sm text-muted-foreground bg-accent/20 border border-dashed border-accent/50 p-3 rounded-md">
                                            {jobSummary}
                                        </div>
                                    )}
                               </div>
                           </div>
                          </DialogContent>
                        </Dialog>
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">View Job</Button>
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
