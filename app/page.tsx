
// 'use client';

// import { Suspense, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { KOREAN_CITIES } from '@/lib/cities';
// import { FaUser, FaSearch,  FaInfoCircle, FaBook, FaGlobeAsia, FaFileAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import { useSearchParams, useRouter } from 'next/navigation';

// const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
// const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
// const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
// const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
// const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });
// // const DocumentLinks = dynamic(() => import('./components/Help/DocumentLinks'), { ssr: false });

// import 'styles/global.css';
// import 'styles/custom.css';
// import 'styles/welcomeBanner.css';

// import DocumentLinks from './components/recource/DocumentLinks';
// import HelpSection from './components/help/HelpSection';
// import { HeaderAnimations } from './components/animations/HeaderAnimation';

// function HomeContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const scrollToId = searchParams.get('scrollTo');
//   const [isJobListLoaded, setIsJobListLoaded] = useState(false);
//   const [currentPage, setCurrentPage] = useState(() => {
//     const pageParam = searchParams.get('page');
//     return pageParam ? parseInt(pageParam) : 1;
//   });
//   const { data: session, status } = useSession();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<'jobs' | 'resources' | 'documents'>('jobs');
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const scrollToId = params.get('scrollTo');
//     if (!scrollToId || !isJobListLoaded) {
//       console.log('⛔ scrollToId mavjud emas yoki JobList hali yuklanmagan');
//       return;
//     }

//     const MAX_ATTEMPTS = 15;
//     const RETRY_DELAY = 200;

//     const scrollToElement = (attempt = 1) => {
//       requestAnimationFrame(() => {
//         const element = document.getElementById(scrollToId);
//         if (element) {
//           const offset = element.getBoundingClientRect().top + window.scrollY - 100;
//           window.scrollTo({ top: offset, behavior: 'smooth' });
//           console.log(`✅ Scrolled to ${scrollToId}`);

//           const currentParams = new URLSearchParams(window.location.search);
//           currentParams.delete('scrollTo');
//           const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
//           window.history.replaceState({}, '', newUrl);
//           console.log(`🧹 scrollTo param removed, URL cleaned`);
//         } else if (attempt < MAX_ATTEMPTS) {
//           console.log(`⏳ Attempt ${attempt}: ${scrollToId} not found`);
//           setTimeout(() => scrollToElement(attempt + 1), RETRY_DELAY);
//         } else {
//           console.warn(`❌ Failed to scroll: ${scrollToId} not found`);
//         }
//       });
//     };

//     scrollToElement();
//   }, [isJobListLoaded]);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (searchTerm) params.set('search', searchTerm);
//     if (selectedCity) params.set('location', selectedCity);
//     router.push(`/search?${params.toString()}`);
//   };

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
//         <HeaderAnimations/>

//         <div className="raskajob-header-content relative z-10">
//           <div className="raskajob-nav flex justify-end p-4">
//             {session ? (
//               <div className="raska-job-ph">
//                 <div className="profile-section flex items-center gap-4 bg-blue-600 dark:bg-blue-800 px-4 py-2 rounded-full">
//                   <NotificationBell />
//                   <div>
//                     <Link href="/profile">
//                       <FaUser className="text-white opacity-80 hover:opacity-100 hover:text-blue-300 transition-all duration-300" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <AuthButtons />
//               </>
//             )}
//           </div>

//           <div className="search-container p-1 sm:p-2">
//       <div className="search-box h-10 sm:h-12">
//         {/* Shahar tanlash qismi */}
//         <div className="city-selector">
//           <div className="city-selector-content">
//             <FaMapMarkerAlt className="city-icon" />
//             {selectedCity && (
//               <span className="city-name">
//                 {KOREAN_CITIES.find(c => c.value === selectedCity)?.label}
//               </span>
//             )}
//           </div>
//           <select
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//           >
//             <option value="">Hammasi</option>
//             {KOREAN_CITIES.map(city => (
//               <option key={city.value} value={city.value}>
//                 {city.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Qidiruv inputi */}
//         <input
//           type="text"
//           placeholder="일자리를 검색하세요..."
//           className="search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//         />

//         {/* Qidiruv tugmasi */}
//         <button 
//           className="search-btn"
//           onClick={handleSearch}
//         >
//           <FaSearch />
//         </button>
//       </div>
//     </div>
//           <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
//             🛠 RaskaJob
//           </h1>
//         </div>

//       </header>

//       <main className="raskajob-main flex-grow p-4">
//         <div className="raskajob-content max-w-6xl mx-auto">
//           {/* Navigation Tabs */}
//           <div className="raskajob-tabs mb-6">
//   <button
//     className={`raskajob-tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
//     onClick={() => setActiveTab('jobs')}
//   >
//     <FaSearch className="mr-2" />
//     일자리
//   </button>
//   <button
//     className={`raskajob-tab-button ${activeTab === 'resources' ? 'active' : ''}`}
//     onClick={() => setActiveTab('resources')}
//   >
//     <FaBook className="mr-2" />
//     자료
//   </button>
//   <button
//     className={`raskajob-tab-button ${activeTab === 'documents' ? 'active' : ''}`}
//     onClick={() => setActiveTab('documents')}
//   >
//     <FaFileAlt className="mr-2" />
//     서류
//   </button>
// </div>



//           {activeTab === 'jobs' ? (
//             <>
//               <div className="flex justify-center mb-6">
//                 {session ? <PostJob /> : <p className="text-center text-gray-600">로그인 후 채용 공고를 등록하세요</p>}
//               </div>

//               {!session && (
//                 <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
//                   <p>로그인하지 않았습니다</p>
//                 </div>
//               )}

//               <Suspense fallback={<div className="flex justify-center py-8"><div className="raskajob-spinner animate-spin"></div></div>}>
//                 <div className="raskajob-joblist-container">
//                   <JobList
//                     currentPage={currentPage}
//                     onPageChange={(newPage) => {
//                       setCurrentPage(newPage);
//                       const params = new URLSearchParams(window.location.search);
//                       if (scrollToId) params.set('scrollTo', scrollToId);
//                       params.set('page', newPage.toString());
//                       router.push(`/?${params.toString()}`);
//                     }}
//                     selectedCity=""
//                     searchQuery=""
//                     toggleExpandedJob={toggleExpandedJob}
//                     expandedJob={expandedJob}
//                     onLoaded={() => setIsJobListLoaded(true)}
//                   />
//                 </div>
//               </Suspense>
//             </>
//           ) : activeTab === 'resources' ? (
//             <>
//               <div className="resources-container">
//                 <div className="resource-section mb-8">
//                 <p>현재 이 페이지는 우즈베크어만 지원됩니다. 곧 다국어 기능이 업데이트될 예정입니다!</p>

//                   <h2 className="text-xl font-bold mb-4 flex items-center">
                    
//                     <FaInfoCircle className="mr-2 text-blue-500" />
//                     Koreyada Ishchi va Talabalar uchun Resurslar
//                   </h2>
//                 </div>

//                 <div className="resource-section mb-8">
//                   <h2 className="text-xl font-bold mb-4 flex items-center">
//                     <FaGlobeAsia className="mr-2 text-green-500" />
//                     Foydali Havolalar
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
//                       <h3 className="font-semibold">HiKorea (Immigration Portal)</h3>
//                       <p className="text-sm text-gray-600">Viza va immigratsiya masalalari</p>
//                     </a>
//                     <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
//                       <h3 className="font-semibold">Mehnat Vazirligi</h3>
//                       <p className="text-sm text-gray-600">Ish qonunlari va huquqlar</p>
//                     </a>
//                     <a href="https://www.topik.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
//                       <h3 className="font-semibold">TOPIK (Koreys tili testi)</h3>
//                       <p className="text-sm text-gray-600">Imtihon haqida ma'lumot</p>
//                     </a>
//                     <a href="https://www.1345.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
//                       <h3 className="font-semibold">1345 Migrantlar Hotline</h3>
//                       <p className="text-sm text-gray-600">24/7 yordam liniyasi</p>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="documents-container">
//               <div className="document-section mb-8">
//               <p>현재 이 페이지는 우즈베크어만 지원됩니다. 곧 다국어 기능이 업데이트될 예정입니다!</p>

//                 <h2 className="text-xl font-bold mb-4 flex items-center">
//                   <FaFileAlt className="mr-2 text-blue-500" />
//                   Foydali Hujjatlar va Shablonlar
//                 </h2>
//                 <DocumentLinks />
//               </div>
//             </div>
//           )}
//         </div>
//         <ToastContainer position="top-right" autoClose={1000} />
//       </main>
//       <HelpSection />
//       <CollapsibleFooter />
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <Suspense fallback={<div className="raskajob-container flex justify-center items-center h-screen"><div className="raskajob-spinner animate-spin"></div></div>}>
//       <HomeContent />
//     </Suspense>
//   );
// }



'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KOREAN_CITIES } from '@/lib/cities';
import { FaUser, FaSearch, FaInfoCircle, FaBook, FaGlobeAsia, FaFileAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useSearchParams, useRouter } from 'next/navigation';

const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

import 'styles/global.css';
import 'styles/custom.css';
import 'styles/welcomeBanner.css';

import DocumentLinks from './components/recource/DocumentLinks';
import HelpSection from './components/help/HelpSection';
import { HeaderAnimations } from './components/animations/HeaderAnimation';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrollToId = searchParams.get('scrollTo');
  const [isJobListLoaded, setIsJobListLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam) : 1;
  });
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'resources' | 'documents'>('jobs');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollToId = params.get('scrollTo');
    if (!scrollToId || !isJobListLoaded) return;

    const MAX_ATTEMPTS = 15;
    const RETRY_DELAY = 200;

    const scrollToElement = (attempt = 1) => {
      requestAnimationFrame(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const offset = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
          const currentParams = new URLSearchParams(window.location.search);
          currentParams.delete('scrollTo');
          const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
          window.history.replaceState({}, '', newUrl);
        } else if (attempt < MAX_ATTEMPTS) {
          setTimeout(() => scrollToElement(attempt + 1), RETRY_DELAY);
        }
      });
    };

    scrollToElement();
  }, [isJobListLoaded]);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    router.push(`/search?${params.toString()}`);
  };

  if (status === 'loading') {
    return (
      <div className="raskajob-container flex justify-center items-center h-screen">
        <div className="raskajob-spinner animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="raskajob-container min-h-screen flex flex-col">
   
<header className={`raskajob-header relative overflow-hidden ${session ? 'logged-in' : ''}`}>
  <HeaderAnimations/>
  
  <div className="raskajob-header-content relative z-10">
    {/* Top Bar */}
    <div className="raskajob-top-bar">
      <h1 className="raskajob-logo">RaskaJob</h1>
      <div className="raskajob-nav">
        {session ? (
          
          <div className="profile-section">
  <Link href="/profile" className="profile-button">
    <FaUser className="text-white text-lg" />
  </Link>
  <NotificationBell />
</div>

        ) : (
          <AuthButtons />
        )}
      </div>
    </div>

    {/* Search Container */}
    <div className="search-container p-1 sm:p-2 mt-4">
            <div className="search-box h-10 sm:h-12">
              <div className="city-selector">
                <div className="city-selector-content">
                  <FaMapMarkerAlt className="city-icon" />
                  {selectedCity && (
                    <span className="city-name">
                      {KOREAN_CITIES.find(c => c.value === selectedCity)?.label}
                    </span>
                  )}
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Hammasi</option>
                  {KOREAN_CITIES.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="일자리를 검색하세요..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />

              <button 
                className="search-btn"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>

    {/* Welcome Section */}
    {!session && (
     <div className="welcome-section">
     <h2>새로운 일자리를 찾아보세요!</h2>
     <p>직원이 필요하신가요? 누구나 쉽게 공고를 등록할 수 있습니다!</p>
     <Link href="/register" className="register-link">
       회원가입 <FaArrowRight />
     </Link>
   </div>
   
    
    )}
  </div>
</header>
      <main className="raskajob-main flex-grow p-4">
        <div className="raskajob-content max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="raskajob-tabs mb-6">
  <button
    className={`raskajob-tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
    onClick={() => setActiveTab('jobs')}
  >
    <FaSearch className="mr-2" />
    일자리
  </button>
  <button
    className={`raskajob-tab-button ${activeTab === 'resources' ? 'active' : ''}`}
    onClick={() => setActiveTab('resources')}
  >
    <FaBook className="mr-2" />
    자료
  </button>
  <button
    className={`raskajob-tab-button ${activeTab === 'documents' ? 'active' : ''}`}
    onClick={() => setActiveTab('documents')}
  >
    <FaFileAlt className="mr-2" />
    서류
  </button>
</div>



          {activeTab === 'jobs' ? (
            <>
              <div className="flex justify-center mb-6">
                {session ? <PostJob /> : <p className="text-center text-gray-600">로그인 후 채용 공고를 등록하세요</p>}
              </div>

              {!session && (
                <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
                  <p>로그인하지 않았습니다</p>
                </div>
              )}

              <Suspense fallback={<div className="flex justify-center py-8"><div className="raskajob-spinner animate-spin"></div></div>}>
                <div className="raskajob-joblist-container">
                  <JobList
                    currentPage={currentPage}
                    onPageChange={(newPage) => {
                      setCurrentPage(newPage);
                      const params = new URLSearchParams(window.location.search);
                      if (scrollToId) params.set('scrollTo', scrollToId);
                      params.set('page', newPage.toString());
                      router.push(`/?${params.toString()}`);
                    }}
                    selectedCity=""
                    searchQuery=""
                    toggleExpandedJob={toggleExpandedJob}
                    expandedJob={expandedJob}
                    onLoaded={() => setIsJobListLoaded(true)}
                  />
                </div>
              </Suspense>
            </>
          ) : activeTab === 'resources' ? (
            <>
              <div className="resources-container">
                <div className="resource-section mb-8">
                <p>현재 이 페이지는 우즈베크어만 지원됩니다. 곧 다국어 기능이 업데이트될 예정입니다!</p>

                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    
                    <FaInfoCircle className="mr-2 text-blue-500" />
                    Koreyada Ishchi va Talabalar uchun Resurslar
                  </h2>
                </div>

                <div className="resource-section mb-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaGlobeAsia className="mr-2 text-green-500" />
                    Foydali Havolalar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <h3 className="font-semibold">HiKorea (Immigration Portal)</h3>
                      <p className="text-sm text-gray-600">Viza va immigratsiya masalalari</p>
                    </a>
                    <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <h3 className="font-semibold">Mehnat Vazirligi</h3>
                      <p className="text-sm text-gray-600">Ish qonunlari va huquqlar</p>
                    </a>
                    <a href="https://www.topik.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <h3 className="font-semibold">TOPIK (Koreys tili testi)</h3>
                      <p className="text-sm text-gray-600">Imtihon haqida ma'lumot</p>
                    </a>
                    <a href="https://www.1345.go.kr" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <h3 className="font-semibold">1345 Migrantlar Hotline</h3>
                      <p className="text-sm text-gray-600">24/7 yordam liniyasi</p>
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="documents-container">
              <div className="document-section mb-8">
              <p>현재 이 페이지는 우즈베크어만 지원됩니다. 곧 다국어 기능이 업데이트될 예정입니다!</p>

                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FaFileAlt className="mr-2 text-blue-500" />
                  Foydali Hujjatlar va Shablonlar
                </h2>
                <DocumentLinks />
              </div>
            </div>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
      </main>
      <HelpSection />
      <CollapsibleFooter />
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="raskajob-container flex justify-center items-center h-screen"><div className="raskajob-spinner animate-spin"></div></div>}>
      <HomeContent />
    </Suspense>
  );
}

