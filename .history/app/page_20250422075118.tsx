

// 'use client';

// import { Suspense, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





// // Dynamically import components with no SSR
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

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (searchTerm) params.set('title', searchTerm);
//     if (selectedCity) params.set('location', selectedCity);
//     router.push(`/?${params.toString()}`);
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
//         <div className="raskajob-header-bg absolute inset-0">
//           <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
//         </div>

//         <div className="raskajob-header-content relative z-10">
//           <div className="raskajob-nav flex justify-end p-4">
//             {session ? (<div>
//               <div className="raskajob-profile flex items-center gap-2">
//                 <Link href="/profile" className="raskajob-profile-icon">
//                   👤
//                 </Link>
//                 <p className="text-white">{t('profile')}</p>
//               </div>
//               <div>
//                                 <NotificationBell />

//               </div>
//             </div>
              
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
// <option value="Seoul">Seoul</option>
// <option value="Busan">Busan</option>
// <option value="Incheon">Incheon</option>
// <option value="Daegu">Daegu</option>
// <option value="Daejeon">Daejeon</option>
// <option value="Gwangju">Gwangju</option>
// <option value="Suwon">Suwon</option>
// <option value="Ulsan">Ulsan</option>
// <option value="Changwon">Changwon</option>
// <option value="Gyeongju">Gyeongju</option>
// <option value="Jeonju">Jeonju</option>
// <option value="Jeju">Jeju</option>
// <option value="Pohang">Pohang</option>
// <option value="Cheongju">Cheongju</option>
// <option value="Andong">Andong</option>
// <option value="Wonju">Wonju</option>
// <option value="Gangneung">Gangneung</option>
// <option value="Iksan">Iksan</option>
// <option value="Mokpo">Mokpo</option>
// <option value="Sokcho">Sokcho</option>
// <option value="Chuncheon">Chuncheon</option>
// <option value="Gimhae">Gimhae</option>
// <option value="Uijeongbu">Uijeongbu</option>
// <option value="Bucheon">Bucheon</option>
// <option value="Yangsan">Yangsan</option>

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
//                 🧾 {t('allJobs')}
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

//tepadagi kod ishlab turgan toza kod pastdagi test 
import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AuthButtons from './components/AuthButtons';
import NotificationBell from './components/NotificationBell';


const AnimatedHeader = ({ t, searchTerm, setSearchTerm, selectedCity, setSelectedCity, handleSearch }) => {
  const { data: session } = useSession();
  const headerRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    // Dynamic circle movement on mouse move
    const handleMouseMove = (e) => {
      if (!headerRef.current) return;
      
      const rect = headerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;
        
        const speed = 0.01 + (index * 0.005);
        const moveX = (x - rect.width / 2) * speed;
        const moveY = (y - rect.height / 2) * speed;
        
        circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    headerRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => {
      headerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header 
      className="raskajob-header relative overflow-hidden min-h-[400px] md:min-h-[500px]"
      ref={headerRef}
    >
      {/* Animated Background Elements */}
      <div className="raskajob-header-bg absolute inset-0 overflow-hidden">
        <div 
          className="raskajob-header-circle raskajob-header-circle-1 absolute"
          ref={el => circlesRef.current[0] = el}
        ></div>
        <div 
          className="raskajob-header-circle raskajob-header-circle-2 absolute"
          ref={el => circlesRef.current[1] = el}
        ></div>
        <div 
          className="raskajob-header-circle raskajob-header-circle-3 absolute"
          ref={el => circlesRef.current[2] = el}
        ></div>
        
        {/* Particle-like dots */}
        <div className="particles-overlay absolute inset-0 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="raskajob-header-content relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <div className="raskajob-nav flex justify-end p-4 md:p-6">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <NotificationBell />
                <LanguageSwitcher />
              </div>
              <Link 
                href="/profile" 
                className="raskajob-profile flex items-center gap-2 group"
              >
                <div className="raskajob-profile-icon w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-white/30 transition-all duration-300">
                  👤
                </div>
                <p className="text-white font-medium hidden md:block">{t('profile')}</p>
              </Link>
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Search Section */}
        <div className="raskajob-search-container p-4 mt-8 md:mt-12 flex-1 flex flex-col justify-center">
          <div className="raskajob-search-box flex flex-col md:flex-row gap-3 max-w-4xl mx-auto w-full">
            <select
              className="raskajob-search-select p-3 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">{t('allCities')}</option>
              <option value="Seoul">Seoul</option>
              <option value="Busan">Busan</option>
              <option value="Incheon">Incheon</option>
              <option value="Daegu">Daegu</option>
              <option value="Daejeon">Daejeon</option>
              <option value="Gwangju">Gwangju</option>
              <option value="Suwon">Suwon</option>
              <option value="Ulsan">Ulsan</option>
              <option value="Changwon">Changwon</option>
              <option value="Gyeongju">Gyeongju</option>
              <option value="Jeonju">Jeonju</option>
              <option value="Jeju">Jeju</option>
              <option value="Pohang">Pohang</option>
              <option value="Cheongju">Cheongju</option>
              <option value="Andong">Andong</option>
              <option value="Wonju">Wonju</option>
              <option value="Gangneung">Gangneung</option>
              <option value="Iksan">Iksan</option>
              <option value="Mokpo">Mokpo</option>
              <option value="Sokcho">Sokcho</option>
              <option value="Chuncheon">Chuncheon</option>
              <option value="Gimhae">Gimhae</option>
              <option value="Uijeongbu">Uijeongbu</option>
              <option value="Bucheon">Bucheon</option>
              <option value="Yangsan">Yangsan</option>
            </select>

            <input
              type="text"
              placeholder={t('ish nomi...')}
              className="raskajob-search-input flex-grow p-3 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />

            <button
              className="raskajob-search-button bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden"
              onClick={handleSearch}
            >
              <span className="relative z-10">{t('search')}</span>
              <span className="absolute inset-0 bg-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </button>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="raskajob-main-title text-center text-4xl md:text-5xl font-bold text-white mb-8 px-4">
          <span className="inline-block animate-float">🛠</span> {t('RaskaJob')}
        </h1>
      </div>
    </header>
  );
};

export default AnimatedHeader;