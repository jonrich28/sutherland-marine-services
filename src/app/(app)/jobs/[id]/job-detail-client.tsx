'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, MessageSquare, Paperclip, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useJobs } from '@/hooks/use-jobs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileJobDetail } from '@/components/mobile/mobile-job-detail';

type JobNote = {
  text: string;
  timestamp: string;
}

export default function JobDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { jobs, updateJob } = useJobs();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const jobId = params.id as string;
  const job = jobs.find(j => j.id === jobId);
  
  const [showCamera, setShowCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [note, setNote] = useState('');
  
  const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Completed': 'default',
    'In Progress': 'secondary',
    'Awaiting Payment': 'secondary',
    'Awaiting Approval': 'secondary',
    'Parts Ordered': 'secondary',
    'On Hold': 'destructive',
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    }
  }, []);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    if (job) {
      setNewStatus(job.status);
    }
  }, [job]);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!showCamera) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };
    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [showCamera, toast]);

  // Show mobile version for technician and customer roles on mobile devices
  if (mounted && isMobile && userRole && ['technician', 'customer'].includes(userRole) && job) {
    return <MobileJobDetail job={job} role={userRole as 'technician' | 'customer'} onUpdateJob={updateJob} />;
  }

  const handleCapture = () => {
    if (videoRef.current && job) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const updatedPhotos = [...(job.photos || []), dataUrl];
        updateJob(job.id, { photos: updatedPhotos });
        toast({ title: "Photo Captured", description: "Image added to job documentation." });
      }
    }
    setShowCamera(false);
  };

  const handleSaveNote = () => {
    if (note.trim() && job) {
      const newNoteObj: JobNote = {
        text: note,
        timestamp: new Date().toLocaleString(),
      };
      const updatedNotes = [...(job.notes || []), newNoteObj];
      updateJob(job.id, { notes: updatedNotes });
      toast({ title: "Note Saved", description: "Your internal note has been saved." });
      setNote('');
    }
  };
  
  const handleUpdateStatus = () => {
    if (job && newStatus) {
      updateJob(job.id, { status: newStatus });
      toast({ title: "Status Updated", description: `Job status changed to ${newStatus}.`});
      setStatusDialogOpen(false);
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-4">The job you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }
  
  const jobStatuses = Object.keys(statusVariantMap);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant={statusVariantMap[job.status] || 'secondary'}>{job.status}</Badge>
                <CardTitle className="mt-2">Job {job.id}: {job.boat}</CardTitle>
                <CardDescription>Customer: {job.customer}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push('/messaging')}>
                <MessageSquare className="mr-2 h-4 w-4" /> Message Customer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground">{job.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle>Job Documentation</CardTitle>
              <CardDescription>Photos and notes uploaded by the technician.</CardDescription>
            </div>
            <Button onClick={() => setShowCamera(!showCamera)} variant="outline" size="sm">
              {showCamera ? <X className="mr-2 h-4 w-4" /> : <Camera className="mr-2 h-4 w-4" />}
              {showCamera ? 'Close Camera' : 'Add Photo'}
            </Button>
          </CardHeader>
          <CardContent>
            {showCamera && (
              <div className="mb-4">
                <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
                {hasCameraPermission === false && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end mt-2">
                  <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                    <Camera className="mr-2 h-4 w-4" /> Capture Photo
                  </Button>
                </div>
              </div>
            )}
            {job.photos && job.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {job.photos.map((photo, index) => (
                  <div key={index} className="relative group aspect-square">
                    <Image src={photo} alt={`Job photo ${index + 1}`} fill className="object-cover rounded-md" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md">
                <Paperclip className="mx-auto h-8 w-8" />
                <p className="mt-2">No photos have been uploaded for this job yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Status</span>
              <Badge variant={statusVariantMap[job.status] || 'secondary'}>{job.status}</Badge>
            </div>
            <Dialog open={isStatusDialogOpen} onOpenChange={setStatusDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Update Status</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Job Status</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="status">New Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button onClick={handleUpdateStatus}>Save Status</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="text-sm">
              <p className="font-medium">Created:</p>
              <p className="text-muted-foreground">{job.created}</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Assigned To:</p>
              <p className="text-muted-foreground">{job.tech}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Technician Notes</CardTitle>
            <CardDescription>Internal notes for this job.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea 
                placeholder="Add a note... e.g., 'Waiting on part XYZ'." 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button className="w-full" onClick={handleSaveNote}>Save Note</Button>
            </div>
            <div className="mt-4 space-y-3">
              {job.notes && job.notes.length > 0 ? (
                job.notes.slice().reverse().map((noteItem, index) => (
                  <div key={index} className="text-sm p-3 bg-muted/50 rounded-md border">
                    <p className="text-muted-foreground">{noteItem.text}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{noteItem.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground py-4">No notes saved yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
