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

// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css";
// import "styles/main.css"; // Import our custom CSS
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState } from 'react';

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
//       <div className="flex justify-center items-center h-screen">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header Section */}
//       <header className="header-container">
//         <div className="header-background">
//           <div className="floating-circle-1"></div>
//           <div className="floating-circle-2"></div>
//           <div className="floating-circle-3"></div>
//         </div>

//         <div className="header-content">
//           <div className="profile-section">
//             <NotificationBell />
//             <div className="profile-icon">
//               👤
//             </div>
//           </div>

//           <h1 className="main-title">
//             🛠 RASKAJOB ISH E'LONLARI
//           </h1>
          
//           <p className="subtitle animate-fade-in">
//             Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="content-container">
//         {!session && (
//           <div className="auth-alert">
//             <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//           </div>
//         )}

//         <div className="animate-fade-in">
//           {title || location ? (
//             <h2 className="search-results-title">
//               🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//             </h2>
//           ) : (
//             <h2 className="search-results-title">
//               � Barcha ish e'lonlari
//             </h2>
//           )}
//         </div>

//         <div className="job-grid">
//           <div className="md:col-span-1">
//             <PostJob />
//           </div>
//           <div className="md:col-span-2">
//             <JobList 
//               selectedCity={location} 
//               searchQuery={title} 
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
import NotificationBell from './components/NotificayionBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState } from 'react';
import Link from 'next/link';

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
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Blue Background Container with Animations */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 pb-20 pt-4 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white animate-float-medium"></div>
          <div className="absolute bottom-10 right-20 w-36 h-36 rounded-full bg-white animate-float-fast"></div>
        </div>

        {/* Notification Bell - Top Left */}
        <div className="absolute top-4 left-4 animate-fade-in">
          <NotificationBell />
        </div>

        {/* Profile Link - Top Right */}
        <Link href="/profile" className="absolute top-4 right-4 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 cursor-pointer hover:bg-white/30 transition-all">
            👤
          </div>
        </Link>

        {/* Search Panel - Centered */}
        <div className="max-w-2xl mx-auto mt-16 animate-slide-up">
          <div className="bg-white rounded-lg shadow-xl p-1 flex">
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

        {/* Add Job Button - Left of Search Panel */}
        <div className="max-w-2xl mx-auto mt-4 animate-slide-up">
          <PostJob />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mt-8 mb-2 animate-text-gradient">
          🛠 RASKAJOB ISH E'LONLARI
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-center text-white/90 max-w-2xl mx-auto animate-fade-in">
          Koreyadagi arbayt ishlarni shu yerda toping yoki joylang
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl -mt-10">
        {!session && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded-lg animate-fade-in">
            <p>⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
          </div>
        )}

        {/* Search Results Title */}
        <div className="mb-8 animate-fade-in">
          {title || location ? (
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🧾 Barcha ish e'lonlari
            </h2>
          )}
        </div>

        {/* Job Listings */}
        <JobList 
          selectedCity={location} 
          searchQuery={title} 
          toggleExpandedJob={toggleExpandedJob} 
          expandedJob={expandedJob}
        />
      </main>

      <CollapsibleFooter />

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(-8px); }
        }
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-text-gradient {
          background: linear-gradient(90deg, #ffffff, #93c5fd, #ffffff);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-gradient 3s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}