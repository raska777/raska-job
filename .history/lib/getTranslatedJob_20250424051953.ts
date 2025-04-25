'use server';

import { translateObject } from './translate';

export interface Job {
  id: string;
  title: string;
  work_type: string;
  salary: string;
  language: string;
  description: string;
  // boshqa maydonlar...
}

export const JOB_TRANSLATABLE_FIELDS = [
  'title',
  'work_type',
  'salary',
  'language',
  'description',
] as const;

export async function getTranslatedJob(
  job: Job,
  targetLang: string
): Promise<Job> {
  if (!job) return job;

  return translateObject(
    job,
    JOB_TRANSLATABLE_FIELDS,
    targetLang
  );
}

export async function getTranslatedJobs(
  jobs: Job[],
  targetLang: string
): Promise<Job[]> {
  if (!jobs?.length) return jobs;

  return Promise.all(
    jobs.map((job) => getTranslatedJob(job, targetLang))
  );
}