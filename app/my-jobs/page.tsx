

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeftCircle, FiEdit2, FiTrash2,  FiPlus } from 'react-icons/fi';
import styles from 'styles/my-jobs.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Job {
  _id: string;
  work_name: string;
  work_type: string;
  work_days: string;
  work_hours: string;
  salary: string;
  location: string;
  contact: string;
  description: string;
  accepts_foreigners: boolean;
  createdAt: string;
  isActive: boolean;
}

export default function MyJobsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/my-jobs');
        const data = await res.json();
        if (res.ok) {
          setJobs(data);
        } else {
          throw new Error(data.error || 'Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('공고를 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [session]);

 

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    try {
      const res = await fetch(`/api/my-jobs/${editingJob._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob),
      });

      if (res.ok) {
        const updatedJob = await res.json();
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
        setEditingJob(null);
        toast.success('공고가 성공적으로 수정되었습니다');
      } else {
        throw new Error('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('공고 수정에 실패했습니다');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('이 공고를 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/my-jobs/${jobId}`, { method: 'DELETE' });

      if (res.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
        toast.success('공고가 삭제되었습니다');
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('공고 삭제에 실패했습니다');
    }
  };

 

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  if (status === 'loading' || loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>내 공고 관리</h1>
        <p className={styles.errorMessage}>로그인이 필요합니다</p>
        <Link href="/login" className={styles.loginLink}>
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FiArrowLeftCircle size={24} /> 뒤로
        </button>
        <h1 className={styles.title}>내 공고 관리</h1>
        <Link href="/post" className={styles.addButton}>
          <FiPlus size={20} /> 새 공고
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className={styles.emptyState}>
          <p>등록된 공고가 없습니다</p>
          <Link href="/post" className={styles.addJobLink}>
            새 공고 등록하기
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.jobsGrid}>
            {currentJobs.map((job) => (
              <div key={job._id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  
                  <h3>{job.work_name}</h3>
                  <p className={styles.jobType}>{job.work_type}</p>
                </div>

                <div className={styles.jobDetails}>
                <p><strong>ish turi:</strong> {job.work_days}</p>
                 <p><strong>ish nomi:</strong> {job.work_hours}</p>
                  <p><strong>jinsi:</strong> {job.salary}</p>
                <p><strong>shaxar:</strong> {job.location}</p>
                <p><strong>ish soati:</strong> {job.work_hours}</p>
                 <p>
                   <strong>외국인:</strong> 
                   <span className={job.accepts_foreigners ? styles.yes : styles.no}>
                       {job.accepts_foreigners ? ' 가능' : ' 불가능'}
                    </span>
                  </p>                  <p><strong>contact:</strong> {job.contact}</p>
                   <p><strong>ish kunlari:</strong> {job.work_days}</p>
                   <p><strong>description:</strong> {job.description}</p>
                   <p><strong>createdAt:</strong> {job.createdAt}</p>

                </div>

                <div className={styles.jobActions}>
                  <button 
                    onClick={() => setEditingJob(job)}
                    className={styles.actionButton}
                  >
                    <FiEdit2 size={16} /> 수정
                  </button>
                  <button 
                    onClick={() => handleDeleteJob(job._id)}
                    className={styles.deleteButton}
                  >
                    <FiTrash2 size={16} /> 삭제
                  </button>
                  
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                이전
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}

      {editingJob && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>공고 수정</h2>
            <form onSubmit={handleUpdateJob}>
              <div className={styles.formGroup}>
                <label>공고 제목</label>
                <input
                  type="text"
                  value={editingJob.work_name}
                  onChange={(e) => setEditingJob({...editingJob, work_name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>근무 형태</label>
                <select
                  value={editingJob.work_type}
                  onChange={(e) => setEditingJob({...editingJob, work_type: e.target.value})}
                  required
                >
                  <option value="공장">공장</option>
                  <option value="청소">청소</option>
                  <option value="식당">식당</option>
                  <option value="배송">배송</option>
                  <option value="건설">건설</option>
                  <option value="사무보조">사무보조</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>근무 요일</label>
                <input
                  type="text"
                  value={editingJob.work_days}
                  onChange={(e) => setEditingJob({...editingJob, work_days: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>근무 시간</label>
                <input
                  type="text"
                  value={editingJob.work_hours}
                  onChange={(e) => setEditingJob({...editingJob, work_hours: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>급여</label>
                <input
                  type="text"
                  value={editingJob.salary}
                  onChange={(e) => setEditingJob({...editingJob, salary: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>지역</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>연락처</label>
                <input
                  type="text"
                  value={editingJob.contact}
                  onChange={(e) => setEditingJob({...editingJob, contact: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>상세 설명</label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                  rows={5}
                />
              </div>

              <div className={styles.formGroupCheckbox}>
                <input
                  type="checkbox"
                  id="acceptsForeigners"
                  checked={editingJob.accepts_foreigners}
                  onChange={(e) => setEditingJob({...editingJob, accepts_foreigners: e.target.checked})}
                />
                <label htmlFor="acceptsForeigners">외국인 지원 가능</label>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className={styles.cancelButton}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}