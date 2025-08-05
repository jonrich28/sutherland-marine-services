
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { initialJobs } from '@/lib/data';

export type Job = (typeof initialJobs)[0];

type JobsContextType = {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (job: Job) => {
    setJobs(prevJobs => [job, ...prevJobs]);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, ...updates } : job
      )
    );
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
