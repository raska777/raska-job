// app/saved-jobs/page.tsx

'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiShare2, FiPhone, FiClock, FiDollarSign, FiUser, FiMapPin, FiCalendar, FiTrash2, FiArrowLeftCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from 'styles/savedjobs.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface SavedJob {
  _id: string;
  jobId: string;
  jobData: {
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
  };
  savedAt: string;
}

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const jobsPerPage = 6;

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch('/api/saved-jobs');
        if (!response.ok) throw new Error('오류 발생!');
        const data = await response.json();
        setSavedJobs(data);
      } catch (error) {
        console.error(error);
        toast.error("저장된 일자리 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, [session]);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleViewJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/post/find-page?jobId=${jobId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Xatolik");
  
      const { page } = data;
      const elementId = `id_${jobId}`;
  
      // ✅ Sahifani to‘g‘ri page va scrollTo bilan ochamiz
      router.push(`/?page=${page}&scrollTo=${elementId}`);
    } catch (err) {
      console.error("❌ handleViewJob error:", err);
    }
  };
  
  
  

  const handleRemoveJob = async (jobId: string) => {
    if (!confirm('이 일자리를 삭제하시겠습니까?')) return;
    try {
      const res = await fetch('/api/save-jobs-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });
      if (!res.ok) throw new Error('오류 발생!');
      setSavedJobs(prev => prev.filter(job => job.jobId !== jobId));
      toast.success('일자리가 성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error(error);
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleShareJob = async (job: SavedJob['jobData']) => {
    const jobUrl = `${window.location.origin}/?scrollTo=${job._id}`;
    const shareText = `${job.work_type} 직업 ${job.location}에서\n근무 시간: ${job.work_hours}\n급여: ${job.salary}\n${job.accepts_foreigners ? '외국인 지원 가능' : '외국인 지원 불가'}`;

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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>저장된 일자리를 불러오는 중...</p>
      </div>
    );
  }

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(savedJobs.length / jobsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.push('/profile')} className={styles.backButton}>
          <FiArrowLeftCircle size={24} /> 뒤로
        </button>
        <h1 className={styles.title}>저장된 일자리</h1>
      </div>

      {currentJobs.length > 0 ? (
        <div className={styles.jobsGrid}>
          {currentJobs.map(({ jobData,  jobId }, index) => (
            <div
              key={jobId}
              className={styles.jobCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >      <ToastContainer position="top-right" autoClose={3000} />
              <div className={styles.jobCardContent}>
                <div className={styles.jobHeader}>
                  <span className={styles.timeAgo}>
                    {formatTimeAgo(jobData.createdAt)}
                  </span>
                  <h3 className={styles.jobTitle}>{jobData.work_type}</h3>
                  <br />
                  <p>{jobData.work_name}</p>
                </div>

                <div className={styles.jobLocation}>
                  <FiMapPin size={16} color="#f43f5e" /> <span>{jobData.location}</span>
                </div>

                <ul className={styles.jobDetailsList}>
                  <li><FiClock size={16} color="#3b82f6" /> 근무 시간: {jobData.work_hours}</li>
                  <li><FiDollarSign size={16} color="#10b981" /> 급여: {jobData.salary}</li>
                  <li>
                    <FiUser size={16} color="#f59e0b" /> 외국인:
                    {jobData.accepts_foreigners ? (
                      <span style={{ color: '#10b981' }}> 가능</span>
                    ) : (
                      <span style={{ color: '#f43f5e' }}> 불가능</span>
                    )}
                  </li>
                </ul>

                {expandedJob === jobId && (
                  <div className={styles.expandedDetails}>
                    {jobData.work_days && (
                      <ul className={styles.jobDetailsList}>
                        <li><FiCalendar size={16} color="#6366f1" /> 근무 일수: {jobData.work_days}</li>
                      </ul>
                    )}

                    {jobData.description && (
                      <div className={styles.jobDescription}>
                        <h4>상세 설명:</h4>
                        <p>{jobData.description}</p>
                      </div>
                    )}

                    <div className={styles.actionButtons}>
                      {session ? (
                        <a href={`tel:${jobData.contact}`} className={styles.actionButton}>
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
                        onClick={() => handleShareJob(jobData)}
                        className={styles.actionButton}
                      >
                        <FiShare2 size={20} />
                      </button>
                    </div>
                  </div>
                )}

                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => toggleExpandedJob(jobId)}
                    className={styles.toggleButton}
                  >
                    {expandedJob === jobId ? '간략히 보기' : '자세히 보기'}
                  </button>
                  <button 
  onClick={() => handleViewJob(jobId)}
className={styles.viewButton}
                  >
                    원본 보기
                  </button>
                  <button 
                    onClick={() => handleRemoveJob(jobId)} 
                    className={styles.removeButton}
                  >
                    <FiTrash2 size={16} /> 삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>🚫 저장된 일자리가 없습니다.</p>
          <Link href="/" className={styles.returnHome}>
            홈페이지로 돌아가기
          </Link>

        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage - 1)}>
              ⏪
            </button>
          )}
          <span className={styles.pageNumber}>{currentPage} / {totalPages} 페이지</span>
          {currentPage < totalPages && (
            <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage + 1)}>
              ⏩
            </button>
          )}
        </div>
      )}

    </div>
  );
}