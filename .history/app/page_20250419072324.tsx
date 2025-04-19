
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

'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import { useSearchParams, useRouter } from 'next/navigation';
import "styles/global.css";
import "styles/custom.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import AuthButtons from './components/AuthButtons';
import NotificationBell from './components/NotificationBell';

export default function Home() {
  const { data: session, status } = useSession();
  const { t } = useTranslation();
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
      <div className="raskajob-container flex justify-center items-center">
        <div className="raskajob-spinner"></div>
      </div>
    );
  }

  return (
    <div className="raskajob-container">
      {/* Header Section */}
      <header className="raskajob-header">
        <div className="raskajob-header-bg">
          <div className="raskajob-header-circle raskajob-header-circle-1"></div>
          <div className="raskajob-header-circle raskajob-header-circle-2"></div>
          <div className="raskajob-header-circle raskajob-header-circle-3"></div>
        </div>

        <div className="raskajob-header-content">
          {/* Navigation - Auth buttons and profile */}
          <div className="raskajob-nav">
            {session ? (
              <div className="raskajob-profile">
                <Link href="/profile" className="raskajob-profile-icon">
                  👤
                </Link>
                <p>Profile</p>
                <NotificationBell />
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Search panel */}
          <div className="raskajob-search-container">
            <div className="raskajob-search-box">

              {/* Select - All Cities */}
              <select
                className="raskajob-search-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">{t('allCities')}</option>
                <option value="Seoul">Seoul</option>
                <option value="Busan">Busan</option>
                <option value="Incheon">Incheon</option>
              </select>

              {/* Search Input */}
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="raskajob-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />

              {/* Search Button */}
              <button
                className="raskajob-search-button"
                onClick={handleSearch}
              >
                {t('search')}
              </button>
            </div>
          </div>

          <h1 className="raskajob-main-title">
            🛠 RASKAJOB ISH E&apos;LONLARI
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="raskajob-main">
        <div className="raskajob-content">
          {/* Post job button - centered */}
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
            <div className="raskajob-alert">
              <p>{t('not Logged In')}</p>
            </div>
          )}

          <div className="raskajob-results-header">
            {searchTerm || selectedCity ? (
              <h2 className="raskajob-results-title">
                🔍 &quot;{searchTerm}&quot; {t('searchResults')} {selectedCity ? selectedCity + 'da' : t('inAllCities')}:
              </h2>
            ) : (
              <h2 className="raskajob-results-title">
                🧾 {t('all Jobs')}
              </h2>
            )}
          </div>

          <div className="raskajob-joblist-container">
            <JobList
              selectedCity={selectedCity}
              searchQuery={searchTerm}
              toggleExpandedJob={toggleExpandedJob}
              expandedJob={expandedJob}
            />
          </div>
        </div>
      </main>

      <CollapsibleFooter />
    </div>
  );
}
