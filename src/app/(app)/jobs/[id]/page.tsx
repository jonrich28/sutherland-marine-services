
import JobDetailClient from './job-detail-client';

// Generate static params for build time (server component)
export async function generateStaticParams() {
  // Return params for all possible job IDs
  return [
    { id: 'JOB-001' }, { id: 'JOB-002' }, { id: 'JOB-003' }, { id: 'JOB-004' }, { id: 'JOB-005' },
    { id: 'JOB-006' }, { id: 'JOB-007' }, { id: 'JOB-008' }, { id: 'JOB-009' }, { id: 'JOB-010' },
    { id: 'JOB-011' }, { id: 'JOB-012' }, { id: 'JOB-013' }, { id: 'JOB-014' }, { id: 'JOB-015' },
  ];
}

// Server component wrapper that can export generateStaticParams
export default function JobDetailPage() {
  return <JobDetailClient />;
}
