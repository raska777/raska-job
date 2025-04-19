
// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import { useSearchParams, useRouter } from 'next/navigation';
// import "styles/global.css";
// import "styles/custom.css";
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'next-i18next';
// import AuthButtons from './components/AuthButtons';
// import NotificationBell from './components/NotificationBell';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const { t } = useTranslation();
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
//       <div className="raskajob-container flex justify-center items-center">
//         <div className="raskajob-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="raskajob-container">
//       {/* Header Section */}
//       <header className="raskajob-header">
//         <div className="raskajob-header-bg">
//           <div className="raskajob-header-circle raskajob-header-circle-1"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3"></div>
//         </div>

//         <div className="raskajob-header-content">
//           {/* Navigation - Auth buttons and profile */}
//           <div className="raskajob-nav">
//             {session ? (
//               <div className="raskajob-profile">
//                 <Link href="/profile" className="raskajob-profile-icon">
//                   👤
//                 </Link>
//                 <p>Profile</p>
//                 <NotificationBell />
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           {/* Search panel */}
//           <div className="raskajob-search-container">
//             <div className="raskajob-search-box">

//               {/* Select - All Cities */}
//               <select
//                 className="raskajob-search-select"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">{t('allCities')}</option>
//                 <option value="Seoul">Seoul</option>
//                 <option value="Busan">Busan</option>
//                 <option value="Incheon">Incheon</option>
//               </select>

//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder={t('searchPlaceholder')}
//                 className="raskajob-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />

//               {/* Search Button */}
//               <button
//                 className="raskajob-search-button"
//                 onClick={handleSearch}
//               >
//                 {t('search')}
//               </button>
//             </div>
//           </div>


//           <h1 className="raskajob-main-title">
//             🛠 RASKAJOB ISH E'LONLARI
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="raskajob-main">
//         <div className="raskajob-content">
//           {/* Post job button - centered */}
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
//             <div className="raskajob-alert">
//               <p>{t('not Logged In')}</p>
//             </div>
//           )}

//           <div className="raskajob-results-header">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title">
//                 🔍 "{searchTerm}" {t('searchResults')} {selectedCity ? selectedCity + 'da' : t('inAllCities')}:
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title">
//                 🧾 {t('all Jobs')}
//               </h2>
//             )}
//           </div>

//           <div className="raskajob-joblist-container">
//             <JobList
//               selectedCity={selectedCity}
//               searchQuery={searchTerm}
//               toggleExpandedJob={toggleExpandedJob}
//               expandedJob={expandedJob}
//             />
//           </div>
//         </div>
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import { useSearchParams, useRouter } from 'next/navigation';
// import "styles/global.css";
// import "styles/custom.css";
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'next-i18next';
// import AuthButtons from './components/AuthButtons';
// import NotificationBell from './components/NotificationBell';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const { t } = useTranslation();
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
//       <div className="raskajob-container flex justify-center items-center">
//         <div className="raskajob-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="raskajob-container">
//       {/* Header Section */}
//       <header className="raskajob-header">
//         <div className="raskajob-header-bg">
//           <div className="raskajob-header-circle raskajob-header-circle-1"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3"></div>
//         </div>

//         <div className="raskajob-header-content">
//           {/* Navigation - Auth buttons and profile */}
//           <div className="raskajob-nav">
//             {session ? (
//               <div className="raskajob-profile">
//                 <Link href="/profile" className="raskajob-profile-icon">
//                   👤
//                 </Link>
//                 <p>Profile</p>
//                 <NotificationBell />
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           {/* Search panel */}
//           <div className="raskajob-search-container">
//             <div className="raskajob-search-box">

//               {/* Select - All Cities */}
//               <select
//                 className="raskajob-search-select"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">{t('allCities')}</option>
//                 <option value="Seoul">Seoul</option>
//                 <option value="Busan">Busan</option>
//                 <option value="Incheon">Incheon</option>
//               </select>

//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder={t('searchPlaceholder')}
//                 className="raskajob-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />

//               {/* Search Button */}
//               <button
//                 className="raskajob-search-button"
//                 onClick={handleSearch}
//               >
//                 {t('search')}
//               </button>
//             </div>
//           </div>

//           <h1 className="raskajob-main-title">
//             🛠 RASKAJOB ISH E&apos;LONLARI
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="raskajob-main">
//         <div className="raskajob-content">
//           {/* Post job button - centered */}
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
//             <div className="raskajob-alert">
//               <p>{t('not Logged In')}</p>
//             </div>
//           )}

//           <div className="raskajob-results-header">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title">
//                 🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? selectedCity + 'da' : t('inAllCities')}:
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title">
//                 🧾 {t('all Jobs')}
//               </h2>
//             )}
//           </div>

//           <div className="raskajob-joblist-container">
//             <JobList
//               selectedCity={selectedCity}
//               searchQuery={searchTerm}
//               toggleExpandedJob={toggleExpandedJob}
//               expandedJob={expandedJob}
//             />
//           </div>
//         </div>
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

// 'use client';

// import { Suspense, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import CollapsibleFooter from './components/CollapsibleFooter';
// import AuthButtons from './components/AuthButtons';
// import NotificationBell from './components/NotificationBell';
// import "styles/global.css";
// import "styles/custom.css";

// function HomeContent() {
//   const { data: session, status } = useSession();
//   const { t } = useTranslation();
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
//       <div className="raskajob-container flex justify-center items-center">
//         <div className="raskajob-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="raskajob-container">
//       <header className="raskajob-header">
//         <div className="raskajob-header-bg">
//           <div className="raskajob-header-circle raskajob-header-circle-1"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3"></div>
//         </div>

//         <div className="raskajob-header-content">
//           <div className="raskajob-nav">
//             {session ? (
//               <div className="raskajob-profile">
//                 <Link href="/profile" className="raskajob-profile-icon">
//                   👤
//                 </Link>
//                 <p>Profile</p>
//                 <NotificationBell />
//               </div>
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           <div className="raskajob-search-container">
//             <div className="raskajob-search-box">
//               <select
//                 className="raskajob-search-select"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">{t('allCities')}</option>
//                 <option value="Seoul">Seoul</option>
//                 <option value="Busan">Busan</option>
//                 <option value="Incheon">Incheon</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder={t('searchPlaceholder')}
//                 className="raskajob-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />

//               <button
//                 className="raskajob-search-button"
//                 onClick={handleSearch}
//               >
//                 {t('search')}
//               </button>
//             </div>
//           </div>

//           <h1 className="raskajob-main-title">
//             🛠 RASKAJOB ISH E&apos;LONLARI
//           </h1>
//         </div>
//       </header>

//       <main className="raskajob-main">
//         <div className="raskajob-content">
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
//             <div className="raskajob-alert">
//               <p>{t('not Logged In')}</p>
//             </div>
//           )}

//           <div className="raskajob-results-header">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title">
//                 🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? selectedCity + 'da' : t('inAllCities')}:
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title">
//                 🧾 {t('all Jobs')}
//               </h2>
//             )}
//           </div>

//           <Suspense fallback={<div>Yuklanmoqda...</div>}>
//           <div className="raskajob-joblist-container">
//             <JobList
//               selectedCity={selectedCity}
//               searchQuery={searchTerm}
//               toggleExpandedJob={toggleExpandedJob}
//               expandedJob={expandedJob}
//             />
//           </div>
//           </Suspense>
//         </div>
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <Suspense fallback={
//       <div className="raskajob-container flex justify-center items-center">
//         <div className="raskajob-spinner"></div>
//       </div>
//     }>
//       <HomeContent />
//     </Suspense>
//   );
// }

'use client';

import { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

import "styles/global.css";
import "styles/custom.css";

function HomeContent() {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('title', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    router.push(`/?${params.toString()}`);
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
      <header className="raskajob-header relative overflow-hidden">
        <div className="raskajob-header ">
          <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
          <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
          <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
        </div>

        <div className="raskajob-header-content relative z-10">
          <div className="raskajob-nav flex justify-end p-4">
            {session ? (
              <div className="raskajob-profile flex items-center gap-2">
                <Link href="/profile" className="raskajob-profile-icon">
                  👤
                </Link>
                <p className="text-white">{t('profile')}</p>
                <NotificationBell />
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

          <div className="raskajob-search-container p-4">
            <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
              <select
                className="raskajob-search-select p-2 rounded"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">{t('allCities')}</option>
                <option value="Seoul">Seoul</option>
                <option value="Busan">Busan</option>
                <option value="Incheon">Incheon</option>
              </select>

              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="raskajob-search-input flex-grow p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />

              <button
                className="raskajob-search-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick={handleSearch}
              >
                {t('search')}
              </button>
            </div>
          </div>

          <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
            🛠 {t('RaskaJob')}
          </h1>
        </div>
      </header>

      <main className="raskajob-main flex-grow p-4">
        <div className="raskajob-content max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            {session ? (
              <PostJob />
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-2">{t('loginToPost')}</p>
                <AuthButtons />
              </div>
            )}
          </div>

          {!session && (
            <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
              <p>{t('notLoggedIn')}</p>
            </div>
          )}

          <div className="raskajob-results-header mb-4">
            {searchTerm || selectedCity ? (
              <h2 className="raskajob-results-title text-xl font-semibold">
                🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? `${selectedCity} ${t('in')}` : t('inAllCities')}
              </h2>
            ) : (
              <h2 className="raskajob-results-title text-xl font-semibold">
                🧾 {t('allJobs')}
              </h2>
            )}
          </div>

          <Suspense fallback={
            <div className="flex justify-center py-8">
              <div className="raskajob-spinner animate-spin"></div>
            </div>
          }>
            <div className="raskajob-joblist-container">
              <JobList
                selectedCity={selectedCity}
                searchQuery={searchTerm}
                toggleExpandedJob={toggleExpandedJob}
                expandedJob={expandedJob}
              />
            </div>
          </Suspense>
        </div>
      </main>

      <CollapsibleFooter />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="raskajob-container flex justify-center items-center h-screen">
        <div className="raskajob-spinner animate-spin"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}