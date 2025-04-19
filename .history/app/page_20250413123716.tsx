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

// 'use client';

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
//     <main className="p-4 display-flex   max-w-2xl mx-auto">
//       <NotificationBell />
      
//       {!session && (
//         <div className="mb-4">
//           <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//         </div>
//       )}

//       <h1 className="header text-3xl font-bold mb-4 bg-sky-500">🛠 RaskaJob Ish e’lonlari</h1>
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

//-----------------6---------
'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import NotificationBell from './components/NotificayionBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css"
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  // State for expanded job
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  // Function to toggle expanded job
  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Notification and Auth Status */}
        <div className="flex justify-between items-center mb-6">
          <NotificationBell />
          {!session && (
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg">
              ⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.
            </div>
          )}
        </div>

        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white bg-blue-600 dark:bg-blue-800 px-6 py-4 rounded-lg shadow-md">
            🛠 RaskaJob Ish e'lonlari
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.
          </p>
        </header>

        {/* Search Results Title */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {title || location ? (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
            </h2>
          ) : (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              🧾 Barcha ish e'lonlari
            </h2>
          )}
        </div>

        {/* Post Job Component */}
        <div className="mb-10">
          <PostJob />
        </div>

        {/* Job List */}
        <div className="mb-12">
          <JobList 
            selectedCity={location} 
            searchQuery={title} 
            toggleExpandedJob={toggleExpandedJob} 
            expandedJob={expandedJob}
          />
        </div>

        {/* Footer */}
        <CollapsibleFooter />
      </div>
    </main>
  ); 
}