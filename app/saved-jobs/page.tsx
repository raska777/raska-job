// 'use client';

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiMapPin, FiClock, FiDollarSign, FiGlobe, FiShield, FiEye, FiTrash2, FiArrowLeftCircle } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import styles from 'styles/savedjobs.module.css';
// import 'react-toastify/dist/ReactToastify.css';
// import Link from 'next/link';

// interface SavedJob {
//   _id: string;
//   jobId: string;
//   jobData: {
//     jobname: string;
//     location: string;
//     work_type: string;
//     work_hours: string;
//     salary: string;
//     language: string;
//     visa_type: string;
//     contact: string;
//     work_days?: string;
//     posted_date?: string;
//   };
//   savedAt: string;
// }

// export default function SavedJobsPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 6;

//   useEffect(() => {
//     if (!session?.user?.id) return;
//     const fetchSavedJobs = async () => {
//       try {
//         const response = await fetch('/api/saved-jobs');
//         if (!response.ok) throw new Error('Xatolik!');
//         const data = await response.json();
//         setSavedJobs(data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Saqlangan ishlarni yuklashda xatolik.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSavedJobs();
//   }, [session]);

//   const handleViewJob = (jobId: string) => {
//     router.push(`/?scrollTo=${jobId}`);
//   };

//   const handleRemoveJob = async (jobId: string) => {
//     if (!confirm('Bu ishni o‘chirmoqchimisiz?')) return;
//     try {
//       const res = await fetch('/api/save-jobs-delete', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ jobId }),
//       });
//       if (!res.ok) throw new Error('Xatolik!');
//       setSavedJobs(prev => prev.filter(job => job.jobId !== jobId));
//       toast.success('Ish muvaffaqiyatli o‘chirildi!');
//     } catch (error) {
//       console.error(error);
//       toast.error('O‘chirishda xatolik.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Saqlangan ishlar yuklanmoqda...</p>
//       </div>
//     );
//   }

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(savedJobs.length / jobsPerPage);

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <button onClick={() => router.push('/profile')} className={styles.backButton}>
//           <FiArrowLeftCircle size={24} /> Orqaga
//         </button>
//         <h1 className={styles.title}>💾 Saqlangan Ishlar</h1>
//       </div>

//       {currentJobs.length > 0 ? (
//         <div className={styles.jobsGrid}>
//           {currentJobs.map((job, index) => (
//             <div
//               key={job._id}
//               className={styles.jobCard}
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <h3 className={styles.jobTitle}>{job.jobData.work_type}</h3>

//               <div className={styles.jobInfo}>
//                 <p><FiMapPin /> {job.jobData.location}</p>
//                 <p><FiClock /> {job.jobData.work_hours}</p>
//                 <p><FiDollarSign /> {job.jobData.salary}</p>
//                 <p><FiGlobe /> {job.jobData.language}</p>
//                 <p><FiShield /> {job.jobData.visa_type}</p>
//               </div>

//               <div className={styles.buttonGroup}>
//                 <button onClick={() => handleViewJob(job.jobId)} className={styles.viewButton}>
//                   <FiEye /> Ko‘rish
//                 </button>
//                 <button onClick={() => handleRemoveJob(job.jobId)} className={styles.removeButton}>
//                   <FiTrash2 /> O‘chirish
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className={styles.emptyState}>
//           <p>🚫 Hozircha saqlangan ishlar yo‘q.</p>
//           <Link href="/" className={styles.returnHome}>
//             Asosiy sahifaga qaytish
//           </Link>
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className={styles.pagination}>
//           {currentPage > 1 && (
//             <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage - 1)}>
//               ⏪
//             </button>
//           )}
//           <span className={styles.pageNumber}>Page {currentPage} / {totalPages}</span>
//           {currentPage < totalPages && (
//             <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage + 1)}>
//               ⏩
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiClock, FiDollarSign, FiGlobe, FiShield, FiEye, FiTrash2, FiArrowLeftCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from 'styles/savedjobs.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface SavedJob {
  _id: string;
  jobId: string;
  jobData: {
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
  };
  savedAt: string;
}

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleViewJob = (jobId: string) => {
    router.push(`/?scrollTo=${jobId}`);
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
          {currentJobs.map((job, index) => (
            <div
              key={job._id}
              className={styles.jobCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className={styles.jobTitle}>{job.jobData.work_type}</h3>

              <div className={styles.jobInfo}>
                <p><FiMapPin /> {job.jobData.location}</p>
                <p><FiClock /> {job.jobData.work_hours}</p>
                <p><FiDollarSign /> {job.jobData.salary}</p>
                <p><FiGlobe /> {job.jobData.language}</p>
                <p><FiShield /> {job.jobData.visa_type}</p>
              </div>

              <div className={styles.buttonGroup}>
                <button onClick={() => handleViewJob(job.jobId)} className={styles.viewButton}>
                  <FiEye /> 보기
                </button>
                <button onClick={() => handleRemoveJob(job.jobId)} className={styles.removeButton}>
                  <FiTrash2 /> 삭제
                </button>
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