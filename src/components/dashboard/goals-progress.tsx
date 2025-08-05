'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Calendar,
  CheckCircle
} from 'lucide-react';

export function GoalsProgress() {
  // Simulated annual goals and progress for demo
  const goals = [
    {
      title: 'Annual Revenue Target',
      current: 370800,
      target: 500000,
      unit: '$',
      category: 'Financial',
      deadline: 'Dec 2024',
      status: 'on-track'
    },
    {
      title: 'Customer Satisfaction',
      current: 4.7,
      target: 4.5,
      unit: '/5.0',
      category: 'Customer',
      deadline: 'Ongoing',
      status: 'exceeded'
    },
    {
      title: 'Jobs Completed',
      current: 218,
      target: 300,
      unit: ' jobs',
      category: 'Operations',
      deadline: 'Dec 2024',
      status: 'on-track'
    },
    {
      title: 'New Customer Acquisition',
      current: 45,
      target: 60,
      unit: ' customers',
      category: 'Growth',
      deadline: 'Dec 2024',
      status: 'at-risk'
    },
    {
      title: 'Profit Margin',
      current: 24.3,
      target: 25.0,
      unit: '%',
      category: 'Financial',
      deadline: 'Q4 2024',
      status: 'on-track'
    },
    {
      title: 'Employee Productivity',
      current: 92,
      target: 85,
      unit: '%',
      category: 'Operations',
      deadline: 'Ongoing',
      status: 'exceeded'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'on-track':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'at-risk':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <CheckCircle className="h-4 w-4" />;
      case 'on-track':
        return <TrendingUp className="h-4 w-4" />;
      case 'at-risk':
        return <Target className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Business Goals & Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {goals.map((goal, index) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const isExceeded = goal.current > goal.target;
            
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{goal.title}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {goal.deadline}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(goal.status)} flex items-center gap-1`}
                  >
                    {getStatusIcon(goal.status)}
                    {goal.status === 'exceeded' ? 'Exceeded' : 
                     goal.status === 'on-track' ? 'On Track' : 'At Risk'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {goal.unit === '$' ? 
                        `$${goal.current.toLocaleString()}` : 
                        `${goal.current}${goal.unit}`
                      } / {goal.unit === '$' ? 
                        `$${goal.target.toLocaleString()}` : 
                        `${goal.target}${goal.unit}`
                      }
                    </span>
                  </div>
                  
                  <Progress 
                    value={progress} 
                    className={`h-2 ${isExceeded ? 'bg-green-100' : ''}`}
                  />
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{goal.category}</span>
                    <span className={`font-medium ${
                      isExceeded ? 'text-green-600' : 
                      progress >= 80 ? 'text-blue-600' : 
                      progress >= 60 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.status === 'exceeded').length}
              </div>
              <div className="text-xs text-muted-foreground">Goals Exceeded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {goals.filter(g => g.status === 'on-track').length}
              </div>
              <div className="text-xs text-muted-foreground">On Track</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {goals.filter(g => g.status === 'at-risk').length}
              </div>
              <div className="text-xs text-muted-foreground">Needs Attention</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
