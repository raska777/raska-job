

// // 'use client';

// // import { Suspense, useState } from 'react';
// // import { useSession } from 'next-auth/react';
// // import { useSearchParams, useRouter } from 'next/navigation';
// // import { useTranslation } from 'next-i18next';
// // import Link from 'next/link';
// // import dynamic from 'next/dynamic';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { LanguageSwitcher } from './components/LanguageSwitcher';
// // import { getUserLang } from '@/lib/getLang';




// // // Dynamically import components with no SSR
// // const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
// // const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
// // const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
// // const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
// // const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });
// // import 'react-toastify/dist/ReactToastify.css';
// // import "styles/global.css";
// // import "styles/custom.css";

// // function HomeContent() {
// //   const { data: session, status } = useSession();
// //   const { t } = useTranslation('common');
// //   const router = useRouter();
// //   const searchParams = useSearchParams();

// //   const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '');
// //   const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '');
// //   const [expandedJob, setExpandedJob] = useState<string | null>(null);

// //   const toggleExpandedJob = (jobId: string) => {
// //     setExpandedJob(prev => (prev === jobId ? null : jobId));
// //   };
// //   console.log("API kalit:",process.env.DEEPL_API_KEY); // Kalit chiqmayotgan bo'lsa, .env faylda yo'q
// //   const handleSearch = () => {
// //     const params = new URLSearchParams();
// //     if (searchTerm) params.set('title', searchTerm);
// //     if (selectedCity) params.set('location', selectedCity);
// //     router.push(`/?${params.toString()}`);
// //   };

// //   if (status === 'loading') {
// //     return (
// //       <div className="raskajob-container flex justify-center items-center h-screen">
// //         <div className="raskajob-spinner animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="raskajob-container min-h-screen flex flex-col">
// //       <header className="raskajob-header relative overflow-hidden">
// //         <div className="raskajob-header-bg absolute inset-0">
// //           <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
// //           <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
// //           <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
// //         </div>

// //         <div className="raskajob-header-content relative z-10">
// //           <div className="raskajob-nav flex justify-end p-4">
// //             {session ? (<div>
// //               <div className="raskajob-profile flex items-center gap-2">
// //                 <Link href="/profile" className="raskajob-profile-icon">
// //                   👤
// //                 </Link>
// //                 <p className="text-white">{t('profile')}</p>
// //               </div>
// //               <div>
// //                                 <NotificationBell />

// //               </div>
// //               <div><LanguageSwitcher/></div>
// //             </div>
              
// //             ) : (
// //               <AuthButtons />
// //             )}
// //           </div>

// //           <div className="raskajob-search-container p-4">
// //             <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
// //               <select
// //                 className="raskajob-search-select p-2 rounded"
// //                 value={selectedCity}
// //                 onChange={(e) => setSelectedCity(e.target.value)}
// //               >
// //                 <option value="">{t('allCities')}</option>
// // <option value="Seoul">Seoul</option>
// // <option value="Busan">Busan</option>
// // <option value="Incheon">Incheon</option>
// // <option value="Daegu">Daegu</option>
// // <option value="Daejeon">Daejeon</option>
// // <option value="Gwangju">Gwangju</option>
// // <option value="Suwon">Suwon</option>
// // <option value="Ulsan">Ulsan</option>
// // <option value="Changwon">Changwon</option>
// // <option value="Gyeongju">Gyeongju</option>
// // <option value="Jeonju">Jeonju</option>
// // <option value="Jeju">Jeju</option>
// // <option value="Pohang">Pohang</option>
// // <option value="Cheongju">Cheongju</option>
// // <option value="Andong">Andong</option>
// // <option value="Wonju">Wonju</option>
// // <option value="Gangneung">Gangneung</option>
// // <option value="Iksan">Iksan</option>
// // <option value="Mokpo">Mokpo</option>
// // <option value="Sokcho">Sokcho</option>
// // <option value="Chuncheon">Chuncheon</option>
// // <option value="Gimhae">Gimhae</option>
// // <option value="Uijeongbu">Uijeongbu</option>
// // <option value="Bucheon">Bucheon</option>
// // <option value="Yangsan">Yangsan</option>

// //               </select>

// //               <input
// //                 type="text"
// //                 placeholder={t('ish nomi...')}
// //                 className="raskajob-search-input flex-grow p-2 rounded"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// //               />

// //               <button
// //                 className="raskajob-search-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
// //                 onClick={handleSearch}
// //               >
// //                 {t('search')}
// //               </button>
// //             </div>
// //           </div>

// //           <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
// //             🛠 {t('RaskaJob')}
// //           </h1>
// //         </div>
// //       </header>

// //       <main className="raskajob-main flex-grow p-4">
// //         <div className="raskajob-content max-w-6xl mx-auto">
// //           <div className="flex justify-center mb-6">
// //             {session ? (
// //               <PostJob />
// //             ) : (
// //               <div className="text-center">
// //                 <p className="text-gray-600 mb-2">{t('loginToPost')}</p>
// //                 <AuthButtons />
// //               </div>
// //             )}
// //           </div>

// //           {!session && (
// //             <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
// //               <p>{t('notLoggedIn')}</p>
// //             </div>
// //           )}

// //           <div className="raskajob-results-header mb-4">
// //             {searchTerm || selectedCity ? (
// //               <h2 className="raskajob-results-title text-xl font-semibold">
// //                 🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? `${selectedCity} ${t('in')}` : t('inAllCities')}
// //               </h2>
// //             ) : (
// //               <h2 className="raskajob-results-title text-xl font-semibold">
// //                 🧾 {t('allJobs')}
// //               </h2>
// //             )}
// //           </div>

// //           <Suspense fallback={
// //             <div className="flex justify-center py-8">
// //               <div className="raskajob-spinner animate-spin"></div>
// //             </div>
// //           }>
// //             <div className="raskajob-joblist-container">
// //               <JobList
// //                 selectedCity={selectedCity}
// //                 searchQuery={searchTerm}
// //                 toggleExpandedJob={toggleExpandedJob}
// //                 expandedJob={expandedJob}
// //               />
// //             </div>
// //           </Suspense>
// //         </div>
// //         <ToastContainer />
// //       </main>

// //       <CollapsibleFooter />
// //     </div>
// //   );
// // }

// // export default function Home() {
// //   return (
// //     <Suspense fallback={
// //       <div className="raskajob-container flex justify-center items-center h-screen">
// //         <div className="raskajob-spinner animate-spin"></div>
// //       </div>
// //     }>
// //       <HomeContent />
// //     </Suspense>
// //   );
// // }

// 'use client';

// import { Suspense, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { LanguageSwitcher } from './components/LanguageSwitcher';
// import { getUserLang } from '@/lib/getLang';

// const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
// const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
// const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
// const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
// const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

// import 'react-toastify/dist/ReactToastify.css';
// import "styles/global.css";
// import "styles/custom.css";

// function HomeContent() {
//   const { data: session, status } = useSession();
//   const { t } = useTranslation('common');
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '');
//   const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '');
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };
// console.log(localStorage.getItem('lang')); // "ko" chiqishi kerak

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (searchTerm) params.set('title', searchTerm);
//     if (selectedCity) params.set('location', selectedCity);
//     router.push(`/?${params.toString()}`);
//   };
// // Brauzer konsolida quyidagini yozib ko'ring:
//   if (status === 'loading') {
//     return (
//       <div className="raskajob-container flex justify-center items-center h-screen">
//         <div className="raskajob-spinner animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="raskajob-container min-h-screen flex flex-col">
//       <header className="raskajob-header relative overflow-hidden">
//         <div className="raskajob-header-bg absolute inset-0">
//           <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
//         </div>

//         <div className="raskajob-header-content relative z-10">
//           <div className="raskajob-nav flex justify-end p-4">
//             {session ? (
//               <div>
//                 <div className="raskajob-profile flex items-center gap-2">
//                   <Link href="/profile" className="raskajob-profile-icon">
//                     👤
//                   </Link>
//                   <p className="text-white">{t('profile')}</p>
//                 </div>
//                 <div>
//                   <NotificationBell />
//                 </div>
//                 <div><LanguageSwitcher/></div>
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           <div className="raskajob-search-container p-4">
//             <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
//               <select
//                 className="raskajob-search-select p-2 rounded"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">{t('allCities')}</option>
//                 <option value="Seoul">Seoul</option>
//                 <option value="Busan">Busan</option>
//                 {/* Other city options */}
//               </select>

//               <input
//                 type="text"
//                 placeholder={t('ish nomi...')}
//                 className="raskajob-search-input flex-grow p-2 rounded"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />

//               <button
//                 className="raskajob-search-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//                 onClick={handleSearch}
//               >
//                 {t('search')}
//               </button>
//             </div>
//           </div>

//           <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
//             🛠 {t('RaskaJob')}
//           </h1>
//         </div>
//       </header>

//       <main className="raskajob-main flex-grow p-4">
//         <div className="raskajob-content max-w-6xl mx-auto">
//           <div className="flex justify-center mb-6">
//             {session ? (
//               <PostJob />
//             ) : (
//               <div className="text-center">
//                 <p className="text-gray-600 mb-2">{t('loginToPost')}</p>
//                 <AuthButtons />
//               </div>
//             )}
//           </div>

//           {!session && (
//             <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
//               <p>{t('notLoggedIn')}</p>
//             </div>
//           )}

//           <div className="raskajob-results-header mb-4">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title text-xl font-semibold">
//                 🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? `${selectedCity} ${t('in')}` : t('inAllCities')}
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title text-xl font-semibold">
//                 � {t('allJobs')}
//               </h2>
//             )}
//           </div>

//           <Suspense fallback={
//             <div className="flex justify-center py-8">
//               <div className="raskajob-spinner animate-spin"></div>
//             </div>
//           }>
//             <div className="raskajob-joblist-container">
//               <JobList
//                 selectedCity={selectedCity}
//                 searchQuery={searchTerm}
//                 toggleExpandedJob={toggleExpandedJob}
//                 expandedJob={expandedJob}
//               />
//             </div>
//           </Suspense>
//         </div>
//         <ToastContainer />
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <Suspense fallback={
//       <div className="raskajob-container flex justify-center items-center h-screen">
//         <div className="raskajob-spinner animate-spin"></div>
//       </div>
//     }>
//       <HomeContent />
//     </Suspense>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";
import styles from 'styles/joblist.module.css';
import { useSession } from 'next-auth/react';
import { FiShare2, FiPhone, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/taostify-custom.css'; // custom CSS

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
  searchTerm: string;  // O'zgartirildi
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
}

const JobList = ({ selectedCity, searchTerm, toggleExpandedJob, expandedJob }: JobListProps) => {
  const { data: session } = useSession();
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

        const data: Job[] = await res.json();
        const validatedJobs = data.map((job) => ({
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error loading jobs:", err);
          setError('Ish e\'lonlarini yuklab bo\'lmadi. Iltimos, keyinroq urunib ko\'ring.');
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleShareJob = (job: Job) => {
    if (navigator.share) {
      navigator.share({
        title: `${job.work_type} ish e'lonlari`,
        text: `${job.work_type} ish joyi ${job.location}da. Ish vaqti: ${job.work_hours}, Maosh: ${job.salary}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Ulashishda xatolik:', err);
      });
    } else {
      const shareText = `${job.work_type} ish joyi ${job.location}da.\nIsh vaqti: ${job.work_hours}\nMaosh: ${job.salary}\n\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        toast.success('E\'lon havolasi nusxalandi!');
      });
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const city = selectedCity.toLowerCase();
    const query = searchTerm.toLowerCase();  // searchQuery o'rniga searchTerm

    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(city)
      : true;

    const queryMatch = searchTerm  // searchQuery o'rniga searchTerm
      ? Object.entries(job).some(([key, value]) =>
        key !== 'id' &&
        typeof value === 'string' &&
        value.toLowerCase().includes(query)
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
        <p>Ish e&apos;lonlari yuklanmoqda...</p>
      </div>
    );
  }

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
      <div className={styles.resultsCount}>
        <p>
          {filteredJobs.length} ta ish topildi •{' '}
          <span>
            Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
          </span>
        </p>
      </div>

      <div className={styles.jobGrid}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <div
              key={job.id}
              className={styles.jobCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.jobCardContent}>
                <div className={styles.jobHeader}>
                  <h3 className={styles.jobTitle}>{job.work_type}</h3>
                </div>

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

                      <div className={styles.actionButtons}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`${styles.actionButton} ${styles.shareButton}`}
                          onClick={() => handleShareJob(job)}
                        >
                          <FiShare2 /> Ulashish
                        </button>
                      </div>
                    </ul>
                  </div>
                )}
              </div>

              <div className={styles.jobActions}>
                <button
                  className={styles.viewButton}
                  onClick={() => toggleExpandedJob(job.id)}
                >
                  {expandedJob === job.id ? 'Yopish' : 'Ko‘rish'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noJobsMessage}>Hozircha ish e'lonlari mavjud emas.</p>
        )}
      </div>

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className={styles.paginationButton}
          >
            &lt; Oldingi
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className={styles.paginationButton}
          >
            Keyingi &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default JobList;
