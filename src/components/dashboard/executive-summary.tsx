'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  Target,
  Award,
  BarChart3,
  Zap
} from 'lucide-react';

export function ExecutiveSummary() {
  // Key executive metrics for company owners presentation
  const executiveMetrics = {
    revenueGrowth: 28.9,
    profitIncrease: 34.2,
    customerSatisfaction: 4.7,
    operationalEfficiency: 16,
    marketShare: 12.3,
    roi: 340
  };

  const achievements = [
    {
      title: 'Revenue Growth',
      value: `+${executiveMetrics.revenueGrowth}%`,
      description: 'Year-over-year revenue increase',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Profit Margin Improvement',
      value: `+${executiveMetrics.profitIncrease}%`,
      description: 'Enhanced operational efficiency',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Customer Satisfaction',
      value: `${executiveMetrics.customerSatisfaction}/5.0`,
      description: 'Industry-leading satisfaction score',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Efficiency Gains',
      value: `+${executiveMetrics.operationalEfficiency}%`,
      description: 'Faster job completion times',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const businessImpact = [
    'Automated 87% of manual processes',
    'Reduced administrative overhead by 42%',
    'Improved customer response time by 63%',
    'Increased technician productivity by 29%',
    'Enhanced cash flow management',
    'Streamlined inventory tracking'
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Executive Summary
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Key performance indicators and business impact overview
              </p>
            </div>
            <Badge variant="outline" className="px-4 py-2 text-lg font-semibold bg-white">
              ROI: {executiveMetrics.roi}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Achievements Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${achievement.bgColor} mb-4`}>
                  <Icon className={`h-6 w-6 ${achievement.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{achievement.title}</h3>
                  <div className={`text-3xl font-bold ${achievement.color}`}>
                    {achievement.value}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Business Impact and ROI */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Platform Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {businessImpact.map((impact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-sm">{impact}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Strategic Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Market Position</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Top {executiveMetrics.marketShare}%
                </Badge>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Annual Cost Savings</span>
                  <span className="font-semibold text-green-600">$127,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Implementation ROI</span>
                  <span className="font-semibold text-blue-600">{executiveMetrics.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period</span>
                  <span className="font-semibold">4.2 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Reduction</span>
                  <span className="font-semibold text-purple-600">73%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Justification */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Investment Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$485K</div>
              <div className="text-sm text-green-700">Annual Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$127K</div>
              <div className="text-sm text-blue-700">Annual Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.2 mo</div>
              <div className="text-sm text-purple-700">Payback Period</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <p className="text-sm text-center text-gray-700">
              <strong>Bottom Line:</strong> Platform implementation delivers immediate operational improvements 
              with measurable ROI within 6 months. Conservative projections show 340% return on investment 
              over 12 months through efficiency gains and revenue growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
