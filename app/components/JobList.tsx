
// app/components/JobList.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import { FiShare2, FiPhone } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiClock, FiDollarSign, FiCalendar, FiUser, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import styles from 'styles/joblist.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface Job {
  _id: string;
  work_name: string;
  work_type: string;
  location: string;
  work_hours: string;
  salary: string;
  accepts_foreigners: boolean;
  contact: string;
  work_days?: string;
  description?: string;
  createdAt: string;
  views: number;
  applications: number;
}

interface JobListProps {
  selectedCity: string;
  searchQuery: string;
  searchCategory?: string; // 👈 bu qo‘shiladi
  currentPage: number;
  onPageChange: (page: number) => void;
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
  onLoaded?: () => void;
}



const JobList = ({
  selectedCity,
  searchQuery,
  searchCategory = 'all',
  toggleExpandedJob,
  expandedJob,
  onLoaded,

}: JobListProps) => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const searchParams = useSearchParams();

 // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (onLoaded) {
    setTimeout(onLoaded, 500);
  }
}, []);

  
  
  
  
useEffect(() => {
  const pageParam = searchParams.get('page');
  if (pageParam) {
    const page = parseInt(pageParam);
    if (!isNaN(page)) setCurrentPage(page);
  }
}, [searchParams]);
  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: jobsPerPage.toString(),
          ...(selectedCity && { location: selectedCity }),
          ...(searchQuery && { search: searchQuery }),
          ...(searchCategory && searchCategory !== 'all' && { category: searchCategory }),
        });
        const url = `/api/post?${params.toString()}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        const validatedJobs = data.jobs.map((job: any) => ({
          _id: job._id,
          work_name: job.work_name || '정보 없음',
          work_type: job.work_type || '정보 없음',
          location: job.location || '정보 없음',
          work_hours: job.work_hours || '협의',
          salary: job.salary || '협의',
          accepts_foreigners: job.accepts_foreigners || false,
          contact: job.contact || '정보 없음',
          work_days: job.work_days || '',
          description: job.description || '',
          createdAt: job.createdAt || new Date().toISOString(),
          views: job.views || 0,
          applications: job.applications || 0,
        }));

        setJobs(validatedJobs);
        setTotalJobs(data.pagination?.totalJobs || 0);
      } catch (err) {
        console.error("구인 정보를 불러오지 못했습니다:", err);
        setError('구인 정보를 불러오지 못했습니다. 나중에 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
        if (onLoaded) setTimeout(() => onLoaded(), 0);
      }
    };

    fetchJobs();
  }, [currentPage, selectedCity, searchQuery, searchCategory]);


  
  useEffect(() => {
    
    const fetchSavedJobs = async () => {
      if (!session) {
        const localSaved = localStorage.getItem('savedJobs');
        if (localSaved) setSavedJobs(JSON.parse(localSaved));
        return;
      }

      try {
        const res = await fetch('/api/saved-jobs');
        if (!res.ok) throw new Error('저장된 구인 정보를 불러오지 못했습니다');
        const data = await res.json();
        const jobIds = data.map((job: any) => job.jobId);
        setSavedJobs(jobIds);
        localStorage.setItem('savedJobs', JSON.stringify(jobIds));
      } catch (err) {
        console.error('저장된 구인 정보 불러오기 오류:', err);
      }
    };

    fetchSavedJobs();
  }, [session]);

  const handleSaveJob = async (jobId: string) => {
    const isAlreadySaved = savedJobs.includes(jobId);

    try {
      const endpoint = isAlreadySaved ? '/api/save-jobs-delete' : '/api/save-jobs';
      const method = isAlreadySaved ? 'DELETE' : 'POST';
      const jobData = jobs.find(job => job._id === jobId);

      if (!jobData && !isAlreadySaved) {
        toast.error('구인 정보를 찾을 수 없습니다!');
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

        toast.success(isAlreadySaved ? '저장 목록에서 제거되었습니다!' : '성공적으로 저장되었습니다!');
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || '서버에서 오류 응답이 왔습니다.');
      }
    } catch (err) {
      console.error('구인 정보 저장 오류:', err);
      toast.error('서버 연결 오류가 발생했습니다.');
    }
  };

  const handleShareJob = async (job: Job) => {
    const jobUrl = `${window.location.origin}/job/${job._id}`;
    const shareText = `${job.work_type} 직업 ${job.location}에서\n근무 시간: ${job.work_hours}\n급여: ${job.salary}\n${job.accepts_foreigners ? '외국인 지원 가능' : '외국인 지원 불가'
      }`;

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
      console.error('구인 정보 공유 오류:', err);
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('공유하는 데 오류가 발생했습니다.');
      }
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
      };

      if (seconds < 60) return '방금 전';

      for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) return `${interval}${unit === 'minute' ? '분' : unit} 전`;
      }

      return date.toLocaleDateString('ko-KR');
    } catch (err) {
      console.error('시간 형식 오류:', err);
      return '';
    }
  };

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>구인 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.jobListContainer}>
      <div className={styles.resultsCount}>
        <p>
          총 {totalJobs}개의 구인 정보 •{' '}
          <span>
            페이지 {currentPage}/{totalPages || 1}
          </span>
        </p>
      </div>

      <div className={styles.jobGrid}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => {
            const isSaved = savedJobs.includes(job._id);
            return (
              <div key={job._id} id={`id_${job._id}`} className={styles.jobCard}

              style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className={styles.saveButton}
                  onClick={() => handleSaveJob(job._id)}
                  aria-label={isSaved ? '구인 정보 저장 취소' : '구인 정보 저장'}
                >
                  {isSaved ? <FaStar size={20} color="gold" /> : <FaRegStar size={20} color="grey" />}
                </button>
                <div className={styles.jobCardContent}>
                  <div className={styles.jobHeader}>
                    <span className={styles.timeAgo}>
                      {formatTimeAgo(job.createdAt)}
                    </span>
                    <h3 className={styles.jobTitle}>{job.work_type}</h3>
                    <br />
                    <p > {job.work_name}</p>
                  </div>

                  <div className={styles.jobLocation}>
                    <FiMapPin size={16} color="#f43f5e" /> <span>{job.location}</span>
                  </div>

                  <ul className={styles.jobDetailsList}>
                    <li><FiClock size={16} color="#3b82f6" /> 근무 시간: {job.work_hours}</li>
                    <li><FiDollarSign size={16} color="#10b981" /> 급여: {job.salary}</li>
                    <li>
                      <FiUser size={16} color="#f59e0b" /> 외국인:
                      {job.accepts_foreigners ? (
                        <span style={{ color: '#10b981' }}> 가능</span>
                      ) : (
                        <span style={{ color: '#f43f5e' }}> 불가능</span>
                      )}
                    </li>
                  </ul>

                  {expandedJob === job._id && (
                    <div className={styles.expandedDetails}>
                      {job.work_days && (
                        <ul className={styles.jobDetailsList}>
                          <li><FiCalendar size={16} color="#6366f1" /> 근무 일수: {job.work_days}</li>
                        </ul>
                      )}

                      {job.description && (
                        <div className={styles.jobDescription}>
                          <h4>상세 설명:</h4>
                          <p>{job.description}</p>
                        </div>
                      )}

                      <div className={styles.actionButtons}>
                        {session ? (
                          <a href={`tel:${job.contact}`} className={styles.actionButton}>
                            <FiPhone size={20} />
                          </a>
                        ) : (
                          <button
                            onClick={() => toast.info(
                              <Link href="/login">로그인 해주세요</Link>
                            )}
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
                    onClick={() => toggleExpandedJob(job._id)}
                    className={styles.toggleButton}
                  >
                    {expandedJob === job._id ? '접기' : '자세히 보기'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noJobsFound}>
            <p>일치하는 구인 정보를 찾을 수 없습니다.</p>
            <button
              onClick={() => {
                setCurrentPage(1);
                setError(null);
              }}
              className={styles.retryButton}
            >
              새로고침
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationButton}>
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                className={currentPage === pageNum ? styles.activePage : ''}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;


