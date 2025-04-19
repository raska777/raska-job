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

//--------------5 changed -------------------------
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
    <div className="min-h-screen flex flex-col">
      {/* Full-width header with gradient background */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-8 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top navigation bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-white font-bold text-xl">RaskaJob</div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                👤
              </div>
            </div>
          </div>

          {/* Main hero section */}
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-pulse">
              🛠 RASKAJOB ISH E'LONLARI
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
            </p>
          </div>

          {/* Search bar centered */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-2 flex">
            <input
              type="text"
              placeholder="Ish nomi bo'yicha qidiruv..."
              className="flex-grow px-4 py-3 outline-none rounded-l-lg"
            />
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
              Qidirish
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {!session && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
            <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
          </div>
        )}

        <div className="mb-8">
          {title || location ? (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🧾 Barcha ish e'lonlari
            </h2>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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

      {/* Footer */}
      <CollapsibleFooter />
    </div>
  ); 
}