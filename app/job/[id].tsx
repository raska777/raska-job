// pages/job/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/job.module.css';

interface Job {
  id: string;
  work_type: string;
  location: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  work_days?: string;
  posted_date?: string;
}

export default function JobPage() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/${id}`);
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
      <h1>{job.work_type}</h1>
      <div className={styles.details}>
        <p><strong>Manzil:</strong> {job.location}</p>
        <p><strong>Ish vaqti:</strong> {job.work_hours}</p>
        <p><strong>Maosh:</strong> {job.salary}</p>
        <p><strong>Til:</strong> {job.language}</p>
        <p><strong>Viza turi:</strong> {job.visa_type}</p>
        {job.work_days && <p><strong>Ish kunlari:</strong> {job.work_days}</p>}
        {job.posted_date && (
          <p className={styles.postedDate}>
            E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}