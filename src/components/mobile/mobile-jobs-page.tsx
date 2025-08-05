'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Plus,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { MobileJobCard } from '@/components/mobile/mobile-job-card';
import { useJobs } from '@/hooks/use-jobs';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Job } from '@/hooks/use-jobs';

interface MobileJobsPageProps {
  role: 'technician' | 'customer' | 'owner';
}

export function MobileJobsPage({ role }: MobileJobsPageProps) {
  const { jobs, updateJob } = useJobs();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'customer'>('date');
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on role
  const getJobsForRole = (): Job[] => {
    if (role === 'technician') {
      // For demo purposes, filter jobs assigned to "Mike Miller"
      return jobs.filter(job => job.tech === 'Mike Miller');
    } else if (role === 'customer') {
      // For demo purposes, filter jobs for "Alex Thompson"
      return jobs.filter(job => job.customer === 'Alex Thompson');
    }
    return jobs; // Owner sees all jobs
  };

  const filteredJobs = getJobsForRole()
    .filter(job => {
      const matchesSearch = 
        job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.boat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'customer') {
        return a.customer.localeCompare(b.customer);
      }
      return 0;
    });

  const statusCounts = getJobsForRole().reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getPageTitle = () => {
    if (role === 'technician') return 'My Jobs';
    if (role === 'customer') return 'Service History';
    return 'All Jobs';
  };

  const getPageDescription = () => {
    if (role === 'technician') return 'Jobs assigned to you';
    if (role === 'customer') return 'Your boat service history';
    return 'Manage all jobs';
  };

  const uniqueStatuses = Array.from(new Set(getJobsForRole().map(job => job.status)));

  // Only show mobile version on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">{getPageTitle()}</h1>
            <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
          </div>
          {role === 'owner' && (
            <Button size="sm" className="h-9 w-9 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters & Sort</SheetTitle>
                <SheetDescription>
                  Filter and sort your jobs
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Status Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Status</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus('all')}
                      className="w-full justify-between"
                    >
                      All Jobs
                      <Badge variant="secondary">{getJobsForRole().length}</Badge>
                    </Button>
                    {uniqueStatuses.map((status) => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className="w-full justify-between"
                      >
                        {status}
                        <Badge variant="secondary">{statusCounts[status] || 0}</Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-3">
                  <h3 className="font-medium">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'date', label: 'Date Created' },
                      { value: 'status', label: 'Status' },
                      { value: 'customer', label: 'Customer' },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy(option.value as typeof sortBy)}
                        className="w-full justify-start"
                      >
                        <SortAsc className="h-4 w-4 mr-2" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {selectedStatus !== 'all' && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Filtered by:</span>
            <Badge 
              variant="secondary" 
              className="text-xs"
              onClick={() => setSelectedStatus('all')}
            >
              {selectedStatus} ×
            </Badge>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredJobs.length} of {getJobsForRole().length} jobs
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No jobs found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || selectedStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No jobs available at the moment'
              }
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <MobileJobCard
              key={job.id}
              job={job}
              role={role}
              onStatusUpdate={updateJob}
            />
          ))
        )}
      </div>
    </div>
  );
}
