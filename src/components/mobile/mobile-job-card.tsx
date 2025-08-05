'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  User, 
  Wrench, 
  MessageSquare, 
  Camera, 
  MoreVertical,
  MapPin
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Job } from '@/hooks/use-jobs';
import { cn } from '@/lib/utils';

interface MobileJobCardProps {
  job: Job;
  role: 'technician' | 'customer' | 'owner';
  onStatusUpdate?: (jobId: string, updates: Partial<Job>) => void;
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  'Completed': 'default',
  'In Progress': 'secondary',
  'Awaiting Payment': 'secondary',
  'Awaiting Approval': 'secondary',
  'Parts Ordered': 'secondary',
  'On Hold': 'destructive',
};

const statusColors = {
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Awaiting Payment': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Awaiting Approval': 'bg-orange-100 text-orange-800 border-orange-200',
  'Parts Ordered': 'bg-purple-100 text-purple-800 border-purple-200',
  'On Hold': 'bg-red-100 text-red-800 border-red-200',
};

export function MobileJobCard({ job, role, onStatusUpdate }: MobileJobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const statusColor = statusColors[job.status as keyof typeof statusColors] || statusColors['In Progress'];

  return (
    <Card className="mb-4 shadow-sm border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Job Icon or Customer Avatar */}
            <div className="flex-shrink-0">
              {role === 'customer' ? (
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
              ) : (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${getCustomerInitials(job.customer)}`} />
                  <AvatarFallback className="text-xs">
                    {getCustomerInitials(job.customer)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-sm truncate">
                  {role === 'customer' ? `Service ${job.id}` : job.boat}
                </h3>
                <Badge 
                  variant={statusVariantMap[job.status] || 'secondary'}
                  className={cn("text-xs px-2 py-0.5", statusColor)}
                >
                  {job.status}
                </Badge>
              </div>
              
              {role !== 'customer' && (
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <User className="h-3 w-3 mr-1" />
                  <span className="truncate">{job.customer}</span>
                </div>
              )}
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(job.created)}</span>
                {role !== 'customer' && job.tech && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="truncate">{job.tech}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/jobs/${job.id}`}>View Details</Link>
              </DropdownMenuItem>
              {role === 'technician' && (
                <>
                  <DropdownMenuItem>
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Customer
                  </DropdownMenuItem>
                </>
              )}
              {role === 'customer' && (
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Shop
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Job Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {job.description}
        </p>

        {/* Status Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            {job.photos && job.photos.length > 0 && (
              <div className="flex items-center">
                <Camera className="h-3 w-3 mr-1" />
                <span>{job.photos.length}</span>
              </div>
            )}
            {job.notes && job.notes.length > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{job.notes.length}</span>
              </div>
            )}
          </div>

          {/* Primary Action */}
          <Link href={`/jobs/${job.id}`}>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              {role === 'technician' ? 'Work on Job' : 'View Details'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
