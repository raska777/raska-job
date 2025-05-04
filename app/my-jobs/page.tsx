

// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import styles from 'styles/my-jobs.module.css';
// import { useRouter } from "next/navigation";
// import { FiArrowLeftCircle } from "react-icons/fi";

// interface Job {
//   _id: string;
//   work_type: string;
//   work_days: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   location: string;
// }

// export default function MyJobsPage() {
//   const { data: session, status } = useSession();
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editingJob, setEditingJob] = useState<Job | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (!session?.user?.id) return;

//       setLoading(true);
//       try {
//         const res = await fetch(`/api/my-jobs`);
//         const data = await res.json();
//         setJobs(data);
//       } catch {
//         setErrorMessage("공고를 불러올 수 없습니다.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [session]);

//   const handleUpdate = async () => {
//     if (!editingJob) return;

//     try {
//       const res = await fetch(`/api/my-jobs/${editingJob._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editingJob),
//       });

//       if (res.ok) {
//         alert("공고가 수정되었습니다 ✅");
//         setJobs((prevJobs) =>
//           prevJobs.map((job) =>
//             job._id === editingJob._id ? editingJob : job
//           )
//         );
//         setEditingJob(null);
//       } else {
//         const errorData = await res.json();
//         setErrorMessage(errorData.message || "오류가 발생했습니다 ❌");
//       }
//     } catch {
//       console.error("Unexpected error during update");
//       setErrorMessage("오류가 발생했습니다 ❌");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm("이 공고를 삭제하시겠습니까?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/my-jobs/${id}`, { method: "DELETE" });

//       if (res.ok) {
//         setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
//         alert("공고가 삭제되었습니다 ✅");
//       } else {
//         const errorData = await res.json();
//         setErrorMessage(errorData.message || "삭제 중 오류가 발생했습니다 ❌");
//       }
//     } catch {
//       console.error("Unexpected error during delete");
//       setErrorMessage("삭제 중 오류가 발생했습니다 ❌");
//     }
//   };

//   if (status === "loading" || loading) return <p className={styles.loadingText}>로딩 중...</p>;

//   if (!session)
//     return (
//       <main className={styles.myJobsContainer}>
//         <h2 className={styles.pageTitle}>내 공고 목록</h2>
//         <p className={styles.errorMessage}>로그인 해주세요.</p>
//       </main>
//     );

//   return (
//     <main className={styles.myJobsContainer}>
//       <button onClick={() => router.push('/profile')} className={styles.backButton}>
//           <FiArrowLeftCircle size={24} /> 뒤로
//         </button>

//       <Link href="/post" className={styles.addJobLink}>
//         ➕ 공고 등록
//       </Link>

//       <h2 className={styles.pageTitle}>내 공고 목록</h2>

//       {errorMessage && (
//         <p className={styles.errorMessage}>{errorMessage}</p>
//       )}

//       {jobs.length === 0 ? (
//         <p className={styles.noJobsText}>등록된 공고가 없습니다.</p>
//       ) : (
//         <ul className={styles.jobsList}>
//           {jobs.map((job) => (
//             <li key={job._id} className={styles.jobCard}>
//               <div className={styles.jobDetail}>
//                 <strong>근무 형태:</strong>
//                 <span>{job.work_type}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>근무 요일:</strong>
//                 <span>{job.work_days}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>근무 시간:</strong>
//                 <span>{job.work_hours}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>급여:</strong>
//                 <span>{job.salary}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>언어:</strong>
//                 <span>{job.language}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>비자 종류:</strong>
//                 <span>{job.visa_type}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>연락처:</strong>
//                 <span>{job.contact}</span>
//               </div>
//               <div className={styles.jobDetail}>
//                 <strong>지역:</strong>
//                 <span>{job.location}</span>
//               </div>

//               <div className={styles.jobActions}>
//                 <button
//                   onClick={() => handleDelete(job._id)}
//                   className={`${styles.actionButton} ${styles.deleteButton}`}
//                 >
//                   삭제
//                 </button>
//                 <button
//                   onClick={() => setEditingJob(job)}
//                   className={`${styles.actionButton} ${styles.editButton}`}
//                 >
//                   수정
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {editingJob && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleUpdate();
//           }}
//           className={styles.editForm}
//         >
//           <h3 className={styles.formTitle}>공고 수정</h3>

//           {[
//             { name: "work_type", label: "근무 형태" },
//             { name: "work_days", label: "근무 요일" },
//             { name: "work_hours", label: "근무 시간" },
//             { name: "salary", label: "급여" },
//             { name: "language", label: "언어" },
//             { name: "visa_type", label: "비자 종류" },
//             { name: "contact", label: "연락처" },
//             { name: "location", label: "지역" },
//           ].map((field) => (
//             <div key={field.name} className={styles.formGroup}>
//               <label className={styles.formLabel}>{field.label}</label>
//               <input
//                 type="text"
//                 value={editingJob[field.name as keyof Job] || ''}
//                 onChange={(e) =>
//                   setEditingJob({ ...editingJob, [field.name]: e.target.value })
//                 }
//                 className={styles.formInput}
//               />
//             </div>
//           ))}

//           <div className={styles.formActions}>
//             <button type="submit" className={`${styles.actionButton} ${styles.saveButton}`}>
//               저장
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditingJob(null)}
//               className={`${styles.actionButton} ${styles.cancelButton}`}
//             >
//               취소
//             </button>
//           </div>
//         </form>
//       )}
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeftCircle, FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import styles from 'styles/my-jobs.module.css';
import { toast } from 'react-toastify';
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

  const handleViewJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/post/find-page?jobId=${jobId}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to find job");

      const { page, elementId } = data;
      router.push(`/?page=${page}&scrollTo=${elementId}`);
      
    } catch (err) {
      console.error("Error viewing job:", err);
      toast.error("공고로 이동할 수 없습니다");
    }
  };

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

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/my-jobs/${jobId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        const updatedJob = await res.json();
        setJobs(jobs.map(job => job._id === jobId ? updatedJob : job));
        toast.success(`공고가 ${!currentStatus ? '활성화' : '비활성화'}되었습니다`);
      } else {
        throw new Error('Failed to toggle job status');
      }
    } catch (error) {
      console.error('Error toggling job status:', error);
      toast.error('상태 변경에 실패했습니다');
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
                  <span className={styles.jobStatus} data-active={job.isActive}>
                    {job.isActive ? '활성' : '비활성'}
                  </span>
                  <h3>{job.work_name}</h3>
                  <p className={styles.jobType}>{job.work_type}</p>
                </div>

                <div className={styles.jobDetails}>
                  <p><strong>근무일:</strong> {job.work_days}</p>
                  <p><strong>시간:</strong> {job.work_hours}</p>
                  <p><strong>급여:</strong> {job.salary}</p>
                  <p><strong>지역:</strong> {job.location}</p>
                  <p>
                    <strong>외국인:</strong> 
                    <span className={job.accepts_foreigners ? styles.yes : styles.no}>
                      {job.accepts_foreigners ? ' 가능' : ' 불가능'}
                    </span>
                  </p>
                </div>

                <div className={styles.jobActions}>
                  <button 
                    onClick={() => handleViewJob(job._id)}
                    className={styles.actionButton}
                  >
                    <FiEye size={16} /> 보기
                  </button>
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
                  <button
                    onClick={() => toggleJobStatus(job._id, job.isActive)}
                    className={job.isActive ? styles.deactivateButton : styles.activateButton}
                  >
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
    </div>
  );
}