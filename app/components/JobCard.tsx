// components/JobCard.tsx
'use client';

import { FiClock, FiDollarSign, FiGlobe, FiCalendar, FiShield, FiMapPin } from 'react-icons/fi';
import styles from '@/styles/joblist.module.css'; // <-- styles joylashgan manzilga qarab tuzat

interface Job {
  id: string;
  location: string;
  work_type: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  work_days?: string;
  posted_date?: string;
}

interface JobCardProps {
  job: Job;
  expanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

const JobCard = ({ job, expanded = false, onToggleExpand }: JobCardProps) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.jobCardContent}>
        <div className={styles.jobHeader}>
          {job.posted_date && (
            <span className={styles.timeAgo}>
              {new Date(job.posted_date).toLocaleDateString('ko-KR')}
            </span>
          )}
          <h3 className={styles.jobTitle}>{job.work_type}</h3>
        </div>

        <div className={styles.jobLocation}>
          <FiMapPin size={16} color="#f43f5e" />
          <span>{job.location}</span>
        </div>

        <ul className={styles.jobDetailsList}>
          <li><FiClock size={16} color="#3b82f6" /> {job.work_hours}</li>
          <li><FiDollarSign size={16} color="#10b981" /> {job.salary}</li>
          <li><FiGlobe size={16} color="#8b5cf6" /> {job.language}</li>
        </ul>

        {expanded && (
          <div className={styles.expandedDetails}>
            <ul className={styles.jobDetailsList}>
              {job.work_days && (
                <li><FiCalendar size={16} color="#6366f1" /> {job.work_days}</li>
              )}
              <li><FiShield size={16} color="#f59e0b" /> {job.visa_type}</li>
            </ul>
          </div>
        )}

        {onToggleExpand && (
          <button onClick={() => onToggleExpand(job.id)} className={styles.toggleButton}>
            {expanded ? '닫기' : '자세히 보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
