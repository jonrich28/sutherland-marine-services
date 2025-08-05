'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wrench, 
  Clock, 
  DollarSign,
  Target,
  AlertTriangle
} from 'lucide-react';

export function BusinessAnalytics() {
  // Calculated business metrics for demo
  const analytics = {
    efficiency: {
      averageJobTime: 4.2,
      targetJobTime: 5.0,
      improvement: 16,
    },
    profitability: {
      grossMargin: 68.5,
      targetMargin: 65.0,
      netProfit: 24.3,
    },
    customerSatisfaction: {
      averageRating: 4.7,
      responseRate: 89,
      repeatCustomers: 73,
    },
    operational: {
      utilizationRate: 87,
      capacityUtilization: 92,
      overdueJobs: 3,
    }
  };

  const MetricCard = ({ 
    title, 
    value, 
    target, 
    unit = '', 
    trend, 
    icon: Icon, 
    description 
  }: {
    title: string;
    value: number;
    target?: number;
    unit?: string;
    trend: 'up' | 'down' | 'neutral';
    icon: any;
    description: string;
  }) => {
    const getTrendIcon = () => {
      switch (trend) {
        case 'up':
          return <TrendingUp className="h-4 w-4 text-green-600" />;
        case 'down':
          return <TrendingDown className="h-4 w-4 text-red-600" />;
        default:
          return <Target className="h-4 w-4 text-gray-400" />;
      }
    };

    const getTrendColor = () => {
      switch (trend) {
        case 'up':
          return 'text-green-600';
        case 'down':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };

    const progress = target ? (value / target) * 100 : 0;

    return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {value}{unit}
            {target && target > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                / {target}{unit}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            {getTrendIcon()}
            <p className={`text-xs ${getTrendColor()}`}>
              {description}
            </p>
          </div>
          {target && target > 0 && (
            <div className="mt-3">
              <Progress value={Math.min(progress, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {progress.toFixed(1)}% of target
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Operational Efficiency */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Operational Efficiency
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Avg. Job Completion"
            value={analytics.efficiency.averageJobTime}
            target={analytics.efficiency.targetJobTime}
            unit=" days"
            trend="up"
            icon={Clock}
            description={`${analytics.efficiency.improvement}% faster than target`}
          />
          <MetricCard
            title="Resource Utilization"
            value={analytics.operational.utilizationRate}
            unit="%"
            trend="up"
            icon={Target}
            description="Above optimal range"
          />
          <MetricCard
            title="Capacity Utilization"
            value={analytics.operational.capacityUtilization}
            unit="%"
            trend="up"
            icon={TrendingUp}
            description="Near maximum capacity"
          />
        </div>
      </div>

      {/* Financial Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial Performance
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Gross Margin"
            value={analytics.profitability.grossMargin}
            target={analytics.profitability.targetMargin}
            unit="%"
            trend="up"
            icon={TrendingUp}
            description="Above industry average"
          />
          <MetricCard
            title="Net Profit Margin"
            value={analytics.profitability.netProfit}
            unit="%"
            trend="up"
            icon={DollarSign}
            description="Strong profitability"
          />
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+28.9%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Year-over-year growth
              </p>
              <div className="mt-3">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Exceeding Targets
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Customer Success
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Customer Satisfaction"
            value={analytics.customerSatisfaction.averageRating}
            unit="/5.0"
            trend="up"
            icon={TrendingUp}
            description="Excellent customer feedback"
          />
          <MetricCard
            title="Repeat Customer Rate"
            value={analytics.customerSatisfaction.repeatCustomers}
            unit="%"
            trend="up"
            icon={Users}
            description="Strong customer loyalty"
          />
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues to Address</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.operational.overdueJobs}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Overdue jobs requiring attention
              </p>
              <div className="mt-3">
                <Badge variant="outline" className="border-orange-300 text-orange-700">
                  Action Required
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Business Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered insights based on your performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Revenue Performance</h4>
                <p className="text-sm text-green-700">
                  Revenue is trending 28.9% above targets. Consider expanding service capacity to meet growing demand.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Operational Efficiency</h4>
                <p className="text-sm text-blue-700">
                  Job completion times are 16% faster than target. This efficiency allows for taking on additional work.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Attention Needed</h4>
                <p className="text-sm text-orange-700">
                  3 jobs are overdue. Review scheduling and resource allocation to prevent future delays.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
