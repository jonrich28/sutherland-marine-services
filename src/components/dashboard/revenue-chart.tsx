'use client';

import { TrendingUp } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', revenue: 18600, target: 20000, growth: 8.2 },
  { month: 'February', revenue: 30500, target: 25000, growth: 15.3 },
  { month: 'March', revenue: 23700, target: 22000, growth: 12.1 },
  { month: 'April', revenue: 27300, target: 24000, growth: 18.7 },
  { month: 'May', revenue: 30900, target: 28000, growth: 22.4 },
  { month: 'June', revenue: 35400, target: 30000, growth: 28.9 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
  target: {
    label: 'Target',
    color: 'hsl(var(--muted-foreground))',
  },
};

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Performance</CardTitle>
        <CardDescription>Monthly revenue vs targets - January to June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-revenue)', strokeWidth: 2, r: 4 }}
            />
            <Line
              dataKey="target"
              type="monotone"
              stroke="var(--color-target)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-target)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Exceeding targets by 18.1% average <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Strong growth momentum with Q2 showing 28.9% above target
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-primary"></div>
                <span>Actual Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-muted-foreground border-dashed border-t"></div>
                <span>Monthly Target</span>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
