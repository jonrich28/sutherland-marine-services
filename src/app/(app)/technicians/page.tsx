
'use client';

import { useState } from 'react';
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
import { PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { initialTechnicians } from '@/lib/data';
import { useJobs } from '@/hooks/use-jobs';

type Technician = typeof initialTechnicians[0];

export default function TechniciansPage() {
  useSearch("[data-search-input]", "[data-search-item]");
  const { toast } = useToast();
  const { jobs } = useJobs();
  const [technicians, setTechnicians] = useState(initialTechnicians);
  const [isAddTechOpen, setAddTechOpen] = useState(false);
  const [newTech, setNewTech] = useState({ name: '', email: '', specialization: ''});

  const handleAddTechnician = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTech.name && newTech.email && newTech.specialization) {
      const newTechData: Technician = {
        id: technicians.length + 1,
        name: newTech.name,
        email: newTech.email,
        specialization: newTech.specialization,
        status: 'Available',
        avatar: `https://placehold.co/40x40.png?text=${newTech.name.split(' ').map(n => n[0]).join('')}`
      };
      setTechnicians([...technicians, newTechData]);
      toast({
        title: "Technician Added",
        description: `${newTech.name} has been added to the team.`,
      });
      setNewTech({ name: '', email: '', specialization: '' });
      setAddTechOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields to add a technician.",
      });
    }
  };
  
  const getJobsForTechnician = (techName: string) => {
      return jobs.filter(job => job.tech === techName);
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Technicians</h1>
            <p className="text-muted-foreground">Manage technician accounts and job assignments.</p>
        </div>
         <Dialog open={isAddTechOpen} onOpenChange={setAddTechOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Technician
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddTechnician}>
              <DialogHeader>
                <DialogTitle>Add New Technician</DialogTitle>
                <DialogDescription>
                  Enter the details for the new technician.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} placeholder="Sarah Connor" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" value={newTech.email} onChange={e => setNewTech({...newTech, email: e.target.value})} placeholder="sarah.c@sutherlandmarine.com" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">Specialization</Label>
                  <Input id="specialization" value={newTech.specialization} onChange={e => setNewTech({...newTech, specialization: e.target.value})} placeholder="Electrical" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Technician</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>All Technicians</CardTitle>
          <CardDescription>A list of all technicians in your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.map((tech) => (
                <TableRow key={tech.id} data-search-item>
                  <TableCell className="font-medium flex items-center gap-3" data-search-value={tech.name}>
                     <Avatar className="h-8 w-8 border">
                        <AvatarImage src={tech.avatar} alt={tech.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{tech.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                     </Avatar>
                     {tech.name}
                  </TableCell>
                  <TableCell data-search-value={tech.email}>{tech.email}</TableCell>
                  <TableCell data-search-value={tech.specialization}>{tech.specialization}</TableCell>
                   <TableCell>
                    <Badge variant={tech.status === 'Available' ? 'default' : 'secondary'}>{tech.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Schedule</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{tech.name}'s Schedule</DialogTitle>
                            <DialogDescription>
                              Current job assignments for {tech.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="font-semibold">Current Status: <Badge variant={tech.status === 'Available' ? 'default' : 'secondary'}>{tech.status}</Badge></p>
                             <div className="mt-4 space-y-2">
                                {getJobsForTechnician(tech.name).length > 0 ? (
                                  getJobsForTechnician(tech.name).map(job => (
                                    <div key={job.id} className="flex justify-between items-center p-2 rounded-md border">
                                      <div>
                                          <p className="font-medium">{job.id} - {job.boat}</p>
                                          <p className="text-sm text-muted-foreground">{job.description}</p>
                                      </div>
                                       <Link href={`/jobs/${job.id}`}><Button variant="ghost" size="sm">View</Button></Link>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-muted-foreground text-center py-4">No jobs currently assigned.</p>
                                )}
                            </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
