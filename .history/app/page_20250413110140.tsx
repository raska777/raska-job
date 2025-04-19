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
'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import NotificationBell from './components/NotificationBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react'; // To handle the 'show more' functionality

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [expandedJob, setExpandedJob] = useState(null); // State to toggle expanded job view

  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';
  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const toggleExpandedJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId); // Toggle job details visibility
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <NotificationBell />
      
      {!session && (
        <div className="mb-4">
          <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
      <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
      
      <div>
        {title || location ? (
          <h1 className="text-xl font-bold mb-4">
            🔍 “{title}” uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">🧾 Barcha ish e’lonlari</h1>
        )}
      </div>
      
      <PostJob />
      <br />
      
      {/* JobList with job cards */}
      <JobList selectedCity={location} searchQuery={title} toggleExpandedJob={toggleExpandedJob} expandedJob={expandedJob} />
      
      <CollapsibleFooter />
    </main>
  ); 
}
