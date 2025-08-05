'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Camera, 
  MessageSquare, 
  Phone, 
  Share, 
  Calendar,
  User,
  Wrench,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import type { Job } from '@/hooks/use-jobs';
import { cn } from '@/lib/utils';

interface MobileJobDetailProps {
  job: Job;
  role: 'technician' | 'customer' | 'owner';
  onUpdateJob: (jobId: string, updates: Partial<Job>) => void;
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  'Completed': 'default',
  'In Progress': 'secondary',
  'Awaiting Payment': 'secondary',
  'Awaiting Approval': 'secondary',
  'Parts Ordered': 'secondary',
  'On Hold': 'destructive',
};

const statusIcons = {
  'Completed': CheckCircle,
  'In Progress': Clock,
  'Awaiting Payment': AlertCircle,
  'Awaiting Approval': AlertCircle,
  'Parts Ordered': AlertCircle,
  'On Hold': X,
};

export function MobileJobDetail({ job, role, onUpdateJob }: MobileJobDetailProps) {
  const { toast } = useToast();
  const [note, setNote] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [newStatus, setNewStatus] = useState(job.status);
  const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const StatusIcon = statusIcons[job.status as keyof typeof statusIcons] || Clock;

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!showCamera) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
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
          description: 'Please enable camera permissions to use this feature.',
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
        onUpdateJob(job.id, { photos: updatedPhotos });
        toast({ 
          title: "Photo Captured", 
          description: "Image added to job documentation." 
        });
      }
    }
    setShowCamera(false);
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNoteObj = {
        text: note,
        timestamp: new Date().toLocaleString(),
      };
      const updatedNotes = [...(job.notes || []), newNoteObj];
      onUpdateJob(job.id, { notes: updatedNotes });
      toast({ 
        title: "Note Saved", 
        description: "Your note has been saved." 
      });
      setNote('');
    }
  };

  const handleUpdateStatus = () => {
    if (newStatus && newStatus !== job.status) {
      onUpdateJob(job.id, { status: newStatus });
      toast({ 
        title: "Status Updated", 
        description: `Job status changed to ${newStatus}.`
      });
      setStatusDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-headline font-bold text-lg">{job.boat}</h1>
                <p className="text-sm text-muted-foreground">Job {job.id}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant={statusVariantMap[job.status] || 'secondary'}
                className="mb-2"
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {job.status}
              </Badge>
              {role === 'technician' && (
                <Dialog open={isStatusDialogOpen} onOpenChange={setStatusDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Update Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Job Status</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(statusVariantMap).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleUpdateStatus} className="w-full">
                        Save Status
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Job Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Created</p>
                <p className="text-muted-foreground">{formatDate(job.created)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {role === 'customer' ? 'Technician' : 'Customer'}
                </p>
                <p className="text-muted-foreground">
                  {role === 'customer' ? job.tech : job.customer}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        {role === 'technician' && (
          <Button 
            variant="outline" 
            className="h-12"
            onClick={() => setShowCamera(!showCamera)}
          >
            <Camera className="h-4 w-4 mr-2" />
            {showCamera ? 'Close Camera' : 'Take Photo'}
          </Button>
        )}
        {role === 'customer' && (
          <Button variant="outline" className="h-12">
            <Phone className="h-4 w-4 mr-2" />
            Call Shop
          </Button>
        )}
      </div>

      {/* Camera */}
      {showCamera && (
        <Card>
          <CardContent className="p-4">
            <video 
              ref={videoRef} 
              className="w-full aspect-video rounded-lg bg-muted" 
              autoPlay 
              muted 
              playsInline
            />
            {hasCameraPermission === false && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Camera access denied. Please enable camera permissions.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center mt-3">
              <Button 
                onClick={handleCapture} 
                disabled={!hasCameraPermission}
                size="lg"
                className="rounded-full h-16 w-16 p-0"
              >
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {job.photos && job.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Photos ({job.photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {job.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={photo}
                    alt={`Job photo ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Section (Technician Only) */}
      {role === 'technician' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Add a note about this job..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px]"
            />
            <Button onClick={handleSaveNote} disabled={!note.trim()} className="w-full">
              Save Note
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notes History */}
      {job.notes && job.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {role === 'customer' ? 'Shop Notes' : 'Notes'} ({job.notes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {job.notes.slice().reverse().map((noteItem, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border">
                  <p className="text-sm">{noteItem.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {noteItem.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
