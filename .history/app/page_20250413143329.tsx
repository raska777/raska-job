// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css"
// import CollapsibleFooter from './components/CollapsibleFooter';



// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
  
//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="p-4 max-w-2xl mx-auto">
//       <NotificationBell />
      
//       {!session && (
//         <div className="mb-4">
//           <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
//       <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
//       <div>
//       {title || location ? (
//         <h1 className="text-xl font-bold mb-4">
//           🔍 “{title}” uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//         </h1>
//       ) : (
//         <h1 className="text-2xl font-bold mb-4">🧾 Barcha ish e’lonlari</h1>
//       )}
//       </div>
//       <PostJob />
//       <br />
//       <JobList selectedCity={''} searchQuery={''}/>
//       <CollapsibleFooter />
//     </main>
//   );
// }

//-----------------------------3 style -------------------------
// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificationBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css";
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react'; // To handle the 'show more' functionality

// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();
//   const [expandedJob, setExpandedJob] = useState(null); // State to toggle expanded job view

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
  
//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   const toggleExpandedJob = (jobId) => {
//     setExpandedJob(expandedJob === jobId ? null : jobId); // Toggle job details visibility
//   };

//   return (
//     <main className="p-4 max-w-6xl mx-auto">
//       <NotificationBell />
      
//       {!session && (
//         <div className="mb-4">
//           <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
//       <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
      
//       <div>
//         {title || location ? (
//           <h1 className="text-xl font-bold mb-4">
//             🔍 “{title}” uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//           </h1>
//         ) : (
//           <h1 className="text-2xl font-bold mb-4">🧾 Barcha ish e’lonlari</h1>
//         )}
//       </div>
      
//       <PostJob />
//       <br />
      
//       {/* JobList with job cards */}
//       <JobList selectedCity={location} searchQuery={title} toggleExpandedJob={toggleExpandedJob} expandedJob={expandedJob} />
      
//       <CollapsibleFooter />
//     </main>
//   ); 
// }


//--------------4 changed ------------------

'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css"
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';

//   // State for expanded job
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   // Function to toggle expanded job
//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };
  
//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="p-4 display-flex center max-w-2xl mx-auto">
//       <NotificationBell />
      
//       {!session && (
//         <div className="mb-4">
//           <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
//       <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
//       <div>
//       {title || location ? (
//         <h1 className="text-xl font-bold mb-4">
//           🔍 “{title}” uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//         </h1>
//       ) : (
//         <h1 className="text-2xl font-bold mb-4">🧾 Barcha ish e’lonlari</h1>
//       )}
//       </div>
//       <PostJob />
//       <br />
//       <JobList 
//         selectedCity={location} 
//         searchQuery={title} 
//         toggleExpandedJob={toggleExpandedJob} 
//         expandedJob={expandedJob}
//       />
//       <CollapsibleFooter />
//     </main>
//   ); 
// }

// --------------5 changed -------------------------

'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css";
// import "styles/custom.css"; // Import our custom styles
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';

//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
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
//         <div className="raskajob-header-background">
//           <div className="raskajob-header-circle raskajob-header-circle-1"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3"></div>
//         </div>

//         {/* Notification Bell - Top Left */}
//         <div className="raskajob-notification">
//           <NotificationBell />
//         </div>

//         {/* Profile Link - Top Right */}
//         <Link href="/profile" className="raskajob-profile">
//           <div className="raskajob-profile-icon">
//             👤
//           </div>
//         </Link>

//         {/* Search Panel - Centered */}
//         <div className="raskajob-search-container">
//           <div className="raskajob-search-box">
           
//           </div>
//         </div>

//         {/* Add Job Button */}
//         <div className="raskajob-search-container">
//           <PostJob />
//         </div>

//         {/* Main Title */}
//         <h1 className="raskajob-main-title">
//           🛠 RASKAJOB ISH E'LONLARI
//         </h1>
        
//         {/* Subtitle */}
//         <p className="raskajob-subtitle">
//           Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
//         </p>
//       </header>

//       {/* Main Content */}
//       <main className="raskajob-content">
//         {!session && (
//           <div className="raskajob-alert">
//             <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//           </div>
//         )}

//         {/* Search Results Title */}
//         <div>
//           {title || location ? (
//             <h2 className="raskajob-results-title">
//               🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//             </h2>
//           ) : (
//             <h2 className="raskajob-results-title">
//               🧾 Barcha ish e'lonlari
//             </h2>
//           )}
//         </div>

//         {/* Job Listings */}
//         <JobList 
//           selectedCity={location} 
//           searchQuery={title} 
//           toggleExpandedJob={toggleExpandedJob} 
//           expandedJob={expandedJob}
//         />
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }
//----------------------------6 ajoyib --------

// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css";
// import "styles/custom.css";
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
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
//             <NotificationBell />
//             <div className="raskajob-profile">
//               <Link href="/profile" className="raskajob-profile-icon">
//                 👤
//               </Link>
//             </div>
//           </div>

//           {/* Search Panel */}
//           <div className="raskajob-search-container">
//           <div className="bg-white rounded-xl shadow-lg p-1 flex items-center">
//             <input
//               type="text"
//               placeholder="Ish nomi bo'yicha qidiruv..."
//               className="flex-grow px-4 py-3 outline-none rounded-l-lg text-gray-800"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
            
//             <select 
//               className="px-4 py-3 bg-gray-100 border-l border-gray-200 text-gray-800"
//               value={selectedCity}
//               onChange={(e) => setSelectedCity(e.target.value)}
//             >
//               <option value="">Barcha shaharlar</option>
//               <option value="Seoul">Seoul</option>
//               <option value="Busan">Busan</option>
//               <option value="Incheon">Incheon</option>
//             </select>
            
//             <button 
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
//             >
//               Qidirish
//             </button>
//           </div>
//           </div>

//           {/* Add Job Button */}
//           <div className="raskajob-search-container mt-4">
//             <PostJob />
//           </div>

//           {/* Titles */}
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
//           {/* Auth Alert */}
//           {!session && (
//             <div className="raskajob-alert">
//               <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//             </div>
//           )}

//           {/* Results Header */}
//           <div className="raskajob-results-header">
//             {title || location ? (
//               <h2 className="raskajob-results-title">
//                 🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title">
//                 🧾 Barcha ish e'lonlari
//               </h2>
//             )}
//           </div>

//           {/* Full-width Job List */}
//           <div className="raskajob-joblist-container">
//           <JobList 
//   selectedCity={selectedCity} // headerdagi selectdan olingan qiymat
//   searchQuery={searchTerm} // headerdagi inputdan olingan qiymat
//   toggleExpandedJob={toggleExpandedJob}
//   expandedJob={expandedJob}
//   // showSearch={false} // qidiruv panelini yashirish uchun
// />
//           </div>
//         </div>
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

//----------------7------------

'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import NotificationBell from './components/NotificayionBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css";
import "styles/custom.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';
  const [searchTerm, setSearchTerm] = useState(title); // URLdan olingan qiymat bilan boshlang'ich holat
  const [selectedCity, setSelectedCity] = useState(location); // URLdan olingan qiymat bilan boshlang'ich holat

  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = () => {
    // Qidiruv tugmasi bosilganda URLni yangilash
    const params = new URLSearchParams();
    if (searchTerm) params.set('title', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    window.location.href = `/?${params.toString()}`;
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
        {/* ... (header background va boshqa elementlar) */}

        <div className="raskajob-header-content">
          {/* Navigation */}
          <div className="raskajob-nav">
            <NotificationBell />
            <div className="raskajob-profile">
              <Link href="/profile" className="raskajob-profile-icon">
                👤
              </Link>
            </div>
          </div>

          {/* Search Panel */}
          <div className="raskajob-search-container">
            <div className="bg-white rounded-xl shadow-lg p-1 flex items-center">
              <input
                type="text"
                placeholder="Ish nomi bo'yicha qidiruv..."
                className="flex-grow px-4 py-3 outline-none rounded-l-lg text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select 
                className="px-4 py-3 bg-gray-100 border-l border-gray-200 text-gray-800"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Barcha shaharlar</option>
                <option value="Seoul">Seoul</option>
                <option value="Busan">Busan</option>
                <option value="Incheon">Incheon</option>
              </select>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
                onClick={handleSearch}
              >
                Qidirish
              </button>
            </div>
          </div>

          {/* ... (qolgan header content) */}
        </div>
      </header>

      {/* Main Content */}
      <main className="raskajob-main">
        <div className="raskajob-content">
          {/* ... (authentication alert va boshqa elementlar) */}

          {/* Full-width Job List */}
          <div className="raskajob-joblist-container">
            <JobList 
              selectedCity={selectedCity} // Headerdagi selectdan olingan qiymat
              searchQuery={searchTerm} // Headerdagi inputdan olingan qiymat
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