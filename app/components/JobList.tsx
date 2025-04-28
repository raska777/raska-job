

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiShare2, FiPhone } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiClock, FiDollarSign, FiGlobe, FiCalendar, FiShield, FiMapPin } from 'react-icons/fi';

import { toast } from 'react-toastify';
import Link from 'next/link';
import 'styles/global.css';
import styles from 'styles/joblist.module.css';
import 'react-toastify/dist/ReactToastify.css';
import JobCard from './JobCard';

interface Job {
  id: string;
  _id: string;
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
  createdAt?: string;
}


interface JobListProps {
  selectedCity: string;
  searchQuery: string;
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
}

const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/post');
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data: Job[] = await res.json();

        const validatedJobs = data.map((job) => ({
          id: job.id || job._id || Math.random().toString(36).substring(2, 9),
          _id: job._id || '', 
          jobname: job.jobname || '알 수 없음',
          location: job.location || '알 수 없음',
          work_type: job.work_type || '알 수 없음',
          work_hours: job.work_hours || '합의된',
          salary: job.salary || '협상 가능',
          language: job.language || '알 수 없음',
          visa_type: job.visa_type || '알 수 없음',
          contact: job.contact || '알 수 없음',
          work_days: job.work_days || '',
          posted_date: job.posted_date || job.createdAt || '',
          createdAt: job.createdAt || '',
        }));
        

        setJobs(validatedJobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
        setError('일자리를 로드할 수 없습니다. 나중에 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await fetch('/api/saved-jobs');
        if (!res.ok) {
          throw new Error('Serverdan saved jobs olishda xato');
        }
  
        const data = await res.json();
        const jobIds = data.map((job: any) => job.jobId);
  
        setSavedJobs(jobIds); // 🔥 State yangilanadi
        localStorage.setItem('savedJobs', JSON.stringify(jobIds)); // 🔥 LocalStorage ham yangilanadi
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
      }
    };
  
    fetchSavedJobs();
  }, []);
  



  const handleSaveJob = async (jobId: string) => {
    const isAlreadySaved = savedJobs.includes(jobId);
  
    try {
      const endpoint = isAlreadySaved ? '/api/save-jobs-delete' : '/api/save-jobs';
      const method = isAlreadySaved ? 'DELETE' : 'POST';
      const jobData = jobs.find(job => job.id === jobId);
  
      if (!jobData && !isAlreadySaved) {
        toast.error('Ish topilmadi!');
        return;
      }
  
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, jobData }),
      });
  
      if (res.ok) {
        const updated = isAlreadySaved
          ? savedJobs.filter(id => id !== jobId)
          : [...savedJobs, jobId];
  
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
  
        toast.success(isAlreadySaved ? 'Saqlanganlardan o‘chirildi!' : 'Muvaffaqiyatli saqlandi!');
      } else {
        toast.error('Serverdan xato javob keldi.');
      }
    } catch (err) {
      console.error('Save job error:', err);
      toast.error('Server bilan aloqa xatosi.');
    }
  };
  

  const handleShareJob = async (job: Job) => {
    if (!job.id) {
      toast.error('Ishni sharalab bo‘lmadi, chunki ID topilmadi!');
      return;
    }

    const jobUrl = `${window.location.origin}/job/${job.id}`;

    const shareText = `${job.work_type} 직업 ${job.location}에서\n근무 시간: ${job.work_hours}\n급여: ${job.salary}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job.work_type} 구인`,
          text: shareText,
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n\n${jobUrl}`);
        toast.success('링크가 복사되었습니다!');
      }
    } catch (err) {
      console.error('Error sharing job:', err);
      toast.error('공유하는 데 오류가 발생했습니다.');
    }
  };


  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
      };

      if (seconds < 60) return '방금 전';

      for (const [unit, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) return `${interval} ${unit} 전`;
      }

      return date.toLocaleDateString('ko-KR');
    } catch (err) {
      console.error('Format time error:', err);
      return '';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const city = selectedCity.toLowerCase();
    const query = searchQuery.toLowerCase();

    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(city)
      : true;

    const queryMatch = searchQuery
      ? Object.values(job).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query)
      )
      : true;

    return locationMatch && queryMatch;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>일자리 로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          다시 시도하기
        </button>
      </div>
    );
  }

  {
    currentJobs.map((job) => (
      <JobCard
        key={job.id}
        job={job}
        expanded={expandedJob === job.id}
        onToggleExpand={toggleExpandedJob}
      />

    ))
  }
  return (
    <div className={styles.jobListContainer}>
      <div className={styles.resultsCount}>
        <p>
          {filteredJobs.length} 개의 직업 찾음 •{' '}
          <span>
            페이지 {currentPage}/{totalPages || 1}
          </span>
        </p>
      </div>

      <div className={styles.jobGrid}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => {
            const isSaved = savedJobs.includes(job.id);
            return (
              <div
                key={job.id} id={job.id}
                className={styles.jobCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className={styles.saveButton}
                  onClick={() => handleSaveJob(job.id)}
                >
                  {isSaved ? <FaStar size={20} color="gold" /> : <FaRegStar size={20} color="grey" />}
                </button>
                <div className={styles.jobCardContent}>
                  <div className={styles.jobHeader}>
                    {(job.posted_date || job.createdAt) && (
                      <span className={styles.timeAgo}>
                        {formatTimeAgo(job.posted_date || job.createdAt)}
                      </span>
                    )}
                    <h3 className={styles.jobTitle}>{job.work_type}</h3>
                  </div>

                  <div className={styles.jobLocation}>
                    <FiMapPin size={16} color="#f43f5e" />  <span>{job.location}</span>
                  </div>

                  <ul className={styles.jobDetailsList}>
                    <li><FiClock size={16} color="#3b82f6" /> 근무 시간: {job.work_hours}</li>
                    <li><FiDollarSign size={16} color="#10b981" /> 급여: {job.salary}</li>
                    <li><FiGlobe size={16} color="#8b5cf6" /> 언어: {job.language}</li>
                  </ul>

                  {expandedJob === job.id && (
                    <div className={styles.expandedDetails}>
                      <ul className={styles.jobDetailsList}>
                        {job.work_days && (
                          <li><FiCalendar size={16} color="#6366f1" /> 근무 일수: {job.work_days}</li>
                        )}
                        <li><FiShield size={16} color="#f59e0b" /> 비자 종류: {job.visa_type}</li>
                      </ul>

                      <div className={styles.actionButtons}>



                        {session ? (
                          <a href={`tel:${job.contact}`} className={styles.actionButton}>
                            <FiPhone size={20} />
                          </a>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info(<Link href="/login">로그인 해주세요</Link>);
                            }}
                            className={styles.actionButton}
                          >
                            <FiPhone size={20} />
                          </button>
                        )}

                        <button
                          onClick={() => handleShareJob(job)}
                          className={styles.actionButton}
                        >
                          <FiShare2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => toggleExpandedJob(job.id)}
                    className={styles.toggleButton}
                  >
                    {expandedJob === job.id ? '닫기' : '자세히 보기'}
                  </button>

                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noJobsFound}>
            <p>조건에 맞는 직업이 없습니다.</p>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        )}
      </div>
    </div>
  );
};

export default JobList;
