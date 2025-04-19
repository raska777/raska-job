
// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificationBell';
// import { useSearchParams, useRouter } from 'next/navigation';
// import "styles/global.css";
// import "styles/custom.css";
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';
// import Link from 'next/link';
// import EmailButton from './components/emailButton';
// export default function Home() {
//   const { data: session, status } = useSession();
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
//           {/* Navigation */}
//           <div className="raskajob-nav">
//             <EmailButton/>
//             <NotificationBell />
//             <div className="raskajob-profile">
//               <Link href="/profile" className="raskajob-profile-icon">
//                 👤
//               </Link>
//             </div>
//           </div>

//           {/* Yagona qidiruv paneli */}
//           <div className="raskajob-search-container">
//             <div className="bg-white rounded-xl shadow-lg p-1 flex items-center">
//               <input
//                 type="text"
//                 placeholder="Ish nomi bo'yicha qidiruv..."
//                 className="flex-grow px-4 py-3 outline-none rounded-l-lg text-gray-800"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />
              
//               <select 
//                 className="px-4 py-3 bg-gray-100 border-l border-gray-200 text-gray-800"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">Barcha shaharlar</option>
//                 <option value="Seoul">Seoul</option>
//                 <option value="Busan">Busan</option>
//                 <option value="Incheon">Incheon</option>
//               </select>
              
//               <button 
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
//                 onClick={handleSearch}
//               >
//                 Qidirish
//               </button>
//             </div>
//           </div>

//           <div className="raskajob-search-container mt-4">
//             <PostJob />
//           </div>

//           <h1 className="raskajob-main-title">
//             🛠 RASKAJOB ISH E'LONLARI
//           </h1>
//           <p className="raskajob-subtitle">
//             Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="raskajob-main">
//         <div className="raskajob-content">
//           {!session && (
//             <div className="raskajob-alert">
//               <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//             </div>
//           )}

//           <div className="raskajob-results-header">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title">
//                 🔍 "{searchTerm}" uchun {selectedCity ? selectedCity + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title">
//                 🧾 Barcha ish e'lonlari
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
import NotificationBell from './components/NotificationBell';
import { useSearchParams, useRouter } from 'next/navigation';
import "styles/global.css";
import "styles/custom.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';
import Link from 'next/link';
import EmailButton from './components/emailButton';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import 'i18n/i18n.ts'; 

export default function Home() {
  const { data: session, status } = useSession();
  const { t } = useTranslation();  // Tarjima olish
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
          {/* Navigation */}
          <div className="raskajob-nav">
            <EmailButton/>
            <NotificationBell />
            <div className="raskajob-profile">
              <Link href="/profile" className="raskajob-profile-icon">
                👤
              </Link>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Yagona qidiruv paneli */}
          <div className="raskajob-search-container">
            <div className="bg-white rounded-xl shadow-lg p-1 flex items-center">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}  // Tarjimani qo‘shish
                className="flex-grow px-4 py-3 outline-none rounded-l-lg text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              
              <select 
                className="px-4 py-3 bg-gray-100 border-l border-gray-200 text-gray-800"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">{t('allCities')}</option> {/* Tarjimani qo‘shish */}
                <option value="Seoul">Seoul</option>
                <option value="Busan">Busan</option>
                <option value="Incheon">Incheon</option>
              </select>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
                onClick={handleSearch}
              >
                {t('search')}  {/* Tarjimani qo‘shish */}
              </button>
            </div>
          </div>

          <div className="raskajob-search-container mt-4">
            <PostJob />
          </div>

          <h1 className="raskajob-main-title">
            🛠 RASKAJOB ISH E'LONLARI
          </h1>
          <p className="raskajob-subtitle">
            {t('jobSubtitle')}  {/* Tarjimani qo‘shish */}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="raskajob-main">
        <div className="raskajob-content">
          {!session && (
            <div className="raskajob-alert">
              <p>{t('notLoggedIn')}</p> {/* Tarjimani qo‘shish */}
            </div>
          )}

          <div className="raskajob-results-header">
            {searchTerm || selectedCity ? (
              <h2 className="raskajob-results-title">
                🔍 "{searchTerm}" {t('searchResults')} {selectedCity ? selectedCity + 'da' : t('inAllCities')}:
              </h2>
            ) : (
              <h2 className="raskajob-results-title">
                🧾 {t('allJobs')}
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
