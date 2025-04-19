
'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";
import styles from 'styles/joblist.module.css'; // Make sure to create this CSS module file

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
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Ish e'lonlari yuklanmoqda...</p>
      </div>
    );
  }

  // Xato holati
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
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
    <div className={styles.jobListContainer}>
      {/* Natijalar soni */}
      <div className={styles.resultsCount}>
        <p>
          {filteredJobs.length} ta ish topildi •{' '}
          <span>
            Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
          </span>
        </p>
      </div>

      {/* Ish e'lonlari */}
      <div className={styles.jobGrid}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <div 
              key={job.id} 
              className={styles.jobCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.jobCardContent}>
                <h3 className={styles.jobTitle}>{job.work_type}</h3>
                <div className={styles.jobLocation}>
                  <span>📍 {job.location}</span>
                </div>

                <ul className={styles.jobDetailsList}>
                  <li>🕒 Ish vaqti: {job.work_hours}</li>
                  <li>💰 Maosh: {job.salary}</li>
                  <li>🌐 Til: {job.language}</li>
                </ul>

                {expandedJob === job.id && (
                  <div className={styles.expandedDetails}>
                    <ul className={styles.jobDetailsList}>
                      {job.work_days && <li>📅 Ish kunlari: {job.work_days}</li>}
                      <li>🛂 Viza turi: {job.visa_type}</li>
                      <li>📞 Bog'lanish: {job.contact}</li>
                      {job.posted_date && (
                        <li className={styles.postedDate}>
                          E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleExpandedJob(job.id)}
                className={styles.toggleButton}
              >
                {expandedJob === job.id ? 'Kamroq ko\'rsatish' : 'Batafsil ma\'lumot'}
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <p className={styles.noResultsText}>Hech qanday ish topilmadi</p>
            <p className={styles.noResultsSubtext}>Qidiruv parametrlarini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>

      {/* Paginatsiya */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
          >
            Oldingi
          </button>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`${styles.paginationButton} ${
                  currentPage === pageNum ? styles.active : ''
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className={styles.paginationEllipsis}>...</span>
          )}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`${styles.paginationButton} ${
                currentPage === totalPages ? styles.active : ''
              }`}
            >
              {totalPages}
            </button>
          )}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          >
            Keyingi
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;