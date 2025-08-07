'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Wrench,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Settings,
  UserPlus,
  PackagePlus,
  PlayCircle,
  Edit,
  Eye,
} from 'lucide-react';
import { useJobs } from '@/hooks/use-jobs';
import { initialTechnicians, initialInventoryItems } from '@/lib/data';

export function ShopManagerDashboard() {
  const { jobs } = useJobs();

  // Operational Data
  const activeJobs = jobs.filter(job => job.status === 'In Progress');
  const queuedJobs = jobs.filter(job => job.status === 'Awaiting Approval');
  const onHoldJobs = jobs.filter(job => job.status === 'On Hold');
  const partsOrderedJobs = jobs.filter(job => job.status === 'Parts Ordered');
  
  // Team Status
  const availableTechs = initialTechnicians.filter(tech => tech.status === 'Available');
  const busyTechs = initialTechnicians.filter(tech => tech.status === 'On Job');
  
  // Inventory Alerts
  const lowStockItems = initialInventoryItems.filter(item => item.quantity <= item.reorderPoint);
  const criticalItems = lowStockItems.filter(item => item.quantity < 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Shop Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Job scheduling, team coordination, and inventory management
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlayCircle className="h-4 w-4 mr-2" />
            Start New Job
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Quick Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {busyTechs.length} techs assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTechs.length}</div>
            <p className="text-xs text-muted-foreground">
              of {initialTechnicians.length} total techs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalItems.length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs in Queue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queuedJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              awaiting assignment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Job Queue Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Job Queue
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
            <CardDescription>Jobs ready for assignment and scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queuedJobs.slice(0, 4).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {job.description.split(' ').slice(0, 2).join(' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.customer}</p>
                    <p className="text-xs text-muted-foreground">{job.boat}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {queuedJobs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No jobs in queue</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Team Status
              <Button size="sm" variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Jobs
              </Button>
            </CardTitle>
            <CardDescription>Technician availability and current assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {initialTechnicians.map((tech) => (
                <div key={tech.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      <div className="text-sm text-muted-foreground">{tech.specialization}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={tech.status === 'Available' ? 'default' : 
                               tech.status === 'On Job' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {tech.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Jobs Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs Progress</CardTitle>
            <CardDescription>Monitor ongoing work and completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.slice(0, 4).map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{job.id} - {job.customer}</div>
                      <div className="text-sm text-muted-foreground">{job.description.split(' ').slice(0, 3).join(' ')}</div>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <Progress value={Math.floor(Math.random() * 60) + 20} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Started {new Date(job.created).toLocaleDateString()}</span>
                    <span>Est. completion in 2-3 days</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                  </div>
                </div>
              ))}
              
              {activeJobs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active jobs</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Inventory Alerts
              <Button size="sm" variant="outline">
                <PackagePlus className="h-4 w-4 mr-2" />
                Reorder
              </Button>
            </CardTitle>
            <CardDescription>Items requiring attention or reorder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.slice(0, 6).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.brand} - {item.location}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      item.quantity < 5 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {item.quantity} left
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reorder at {item.reorderPoint}
                    </div>
                  </div>
                  <div className="ml-3">
                    <Button size="sm" 
                      variant={item.quantity < 5 ? "destructive" : "outline"}
                    >
                      {item.quantity < 5 ? 'Order Now' : 'Reorder'}
                    </Button>
                  </div>
                </div>
              ))}
              
              {lowStockItems.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>All inventory levels good</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues & Alerts */}
      {(onHoldJobs.length > 0 || partsOrderedJobs.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Issues Requiring Attention
            </CardTitle>
            <CardDescription>Jobs on hold and pending parts orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {onHoldJobs.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-orange-600">Jobs On Hold ({onHoldJobs.length})</h4>
                  <div className="space-y-2">
                    {onHoldJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <div>
                          <span className="font-medium">{job.id}</span> - {job.customer}
                        </div>
                        <Button size="sm" variant="outline">
                          Resolve
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {partsOrderedJobs.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-blue-600">Awaiting Parts ({partsOrderedJobs.length})</h4>
                  <div className="space-y-2">
                    {partsOrderedJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <div>
                          <span className="font-medium">{job.id}</span> - {job.customer}
                        </div>
                        <Button size="sm" variant="outline">
                          Check Status
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common shop management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="flex items-center gap-3">
                <PlayCircle className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Start Job</div>
                  <div className="text-xs text-muted-foreground">Begin new work</div>
                </div>
              </div>
            </Button>
            
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Assign Technician</div>
                  <div className="text-xs text-muted-foreground">Schedule work</div>
                </div>
              </div>
            </Button>
            
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-medium">Order Parts</div>
                  <div className="text-xs text-muted-foreground">Restock inventory</div>
                </div>
              </div>
            </Button>
            
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">View Schedule</div>
                  <div className="text-xs text-muted-foreground">Plan workflow</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
