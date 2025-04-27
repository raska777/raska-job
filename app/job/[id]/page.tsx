// app/job/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobCard from '@/app/components/JobCard';
import styles from './job.module.css';

interface Job {
  id: string;
  work_type: string;
  location: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  jobname?: string; /* <-- ❗❗❗ optional qilib qo‘ydik */
  work_days?: string;
  posted_date?: string;
}

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/post/${id}`);
        if (!res.ok) throw new Error('Ish topilmadi');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Xato yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className={styles.loading}>Yuklanmoqda...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!job) return <div className={styles.error}>Ish topilmadi</div>;

  return (
    <div className={styles.container}>
      <JobCard job={job} expanded />
    </div>
  );
};

export default JobDetailPage;
