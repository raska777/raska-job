
'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";

interface Job {
  id: string;
  jobname: string;
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

interface JobListProps {
  selectedCity: string;
  searchQuery: string;
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
}

const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/post');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        const validatedJobs = data.map((job: any) => ({
          id: job.id || Math.random().toString(36).substring(2, 9),
          jobname: job.jobname || 'Noma\'lum',
          location: job.location || 'Noma\'lum',
          work_type: job.work_type || 'Noma\'lum',
          work_hours: job.work_hours || 'Noma\'lum',
          salary: job.salary || 'Kelishilgan',
          language: job.language || 'Noma\'lum',
          visa_type: job.visa_type || 'Noma\'lum',
          contact: job.contact || 'Noma\'lum',
          work_days: job.work_days,
          posted_date: job.posted_date
        }));
        
        setJobs(validatedJobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
        setError('Ish e\'lonlarini yuklab bo\'lmadi. Iltimos, keyinroq urunib ko\'ring.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filtirlash funksiyasi
  const filteredJobs = jobs.filter((job) => {
    const city = selectedCity.toLowerCase();
    const query = searchQuery.toLowerCase();

    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(city)
      : true;

    const queryMatch = searchQuery 
      ? Object.entries(job).some(([key, value]) => 
          key !== 'id' && 
          typeof value === 'string' && 
          value.toLowerCase().includes(query)
        )
      : true;

    return locationMatch && queryMatch;
  });

  // Paginatsiya
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Yuklanish holati

// Yuklanish holati
if (isLoading) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Ish e'lonlari yuklanmoqda...</p>
    </div>
  );
}

// Xato holati
if (error) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className={styles.errorText}>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className={styles.retryButton}
      >
        Qayta urunish
      </button>
    </div>
  );
}

return (
  <div className={styles.container}>
    {/* Natijalar soni */}
    <div className={styles.resultsInfo}>
      <p>
        {filteredJobs.length} ta ish topildi •{' '}
        <span>
          Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
        </span>
      </p>
    </div>

    {/* Ish e'lonlari */}
    <div className={styles.jobsGrid}>
      {currentJobs.length > 0 ? (
        currentJobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.cardContent}>
              <h3 className={styles.jobTitle}>{job.work_type}</h3>
              <div className={styles.locationContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.detailIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>

              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.detailIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ish vaqti: {job.work_hours}</span>
                </li>
                {/* Qolgan detailItem lar shu tarzda */}
              </ul>

              {expandedJob === job.id && (
                <div className={styles.expandedDetails}>
                  {/* Kengaytirilgan ma'lumotlar */}
                </div>
              )}
            </div>

            <button
              onClick={() => toggleExpandedJob(job.id)}
              className={styles.detailsButton}
            >
              {expandedJob === job.id ? 'Kamroq ko\'rsatish' : 'Batafsil ma\'lumot'}
            </button>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          {/* Hech narsa topilmaganda */}
        </div>
      )}
    </div>

    {/* Paginatsiya */}
    {totalPages > 1 && (
      <div className={styles.pagination}>
        <nav className={styles.paginationNav}>
          {/* Paginatsiya tugmalari */}
        </nav>
      </div>
    )}
  </div>
);
  );
};

export default JobList;