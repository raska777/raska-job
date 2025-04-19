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

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import NotificationBell from './components/NotificayionBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css";
import "styles/main.css"; // Import our custom CSS
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="header-container">
        <div className="header-background">
          <div className="floating-circle-1"></div>
          <div className="floating-circle-2"></div>
          <div className="floating-circle-3"></div>
        </div>

        <div className="header-content">
          <div className="profile-section">
            <NotificationBell />
            <div className="profile-icon">
              👤
            </div>
          </div>

          <h1 className="main-title">
            🛠 RASKAJOB ISH E'LONLARI
          </h1>
          
          <p className="subtitle animate-fade-in">
            Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-container">
        {!session && (
          <div className="auth-alert">
            <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
          </div>
        )}

        <div className="animate-fade-in">
          {title || location ? (
            <h2 className="search-results-title">
              🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
            </h2>
          ) : (
            <h2 className="search-results-title">
              � Barcha ish e'lonlari
            </h2>
          )}
        </div>

        <div className="job-grid">
          <div className="md:col-span-1">
            <PostJob />
          </div>
          <div className="md:col-span-2">
            <JobList 
              selectedCity={location} 
              searchQuery={title} 
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