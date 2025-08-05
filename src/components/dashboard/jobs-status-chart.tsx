'use client';

import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { status: 'Completed', jobs: 125, fill: '#22c55e' },
  { status: 'In Progress', jobs: 45, fill: '#3b82f6' },
  { status: 'Awaiting Parts', jobs: 22, fill: '#f59e0b' },
  { status: 'Scheduled', jobs: 18, fill: '#8b5cf6' },
  { status: 'On Hold', jobs: 8, fill: '#ef4444' },
];

const chartConfig = {
  jobs: {
    label: 'Jobs',
  },
};

export function JobsStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status Distribution</CardTitle>
        <CardDescription>Current workload breakdown across all job stages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10 }}>
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={100}
            />
            <XAxis dataKey="jobs" type="number" hide />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="jobs" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
