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
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Notification and Auth Status */}
//         <div className="flex justify-between items-center mb-6">
//           <NotificationBell />
//           {!session && (
//             <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg">
//               ⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.
//             </div>
//           )}
//         </div>

//         {/* Header Section */}
//         <header className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white bg-blue-600 dark:bg-blue-800 px-6 py-4 rounded-lg shadow-md">
//             🛠 RaskaJob Ish e'lonlari
//           </h1>
//           <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
//             Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.
//           </p>
//         </header>

//         {/* Search Results Title */}
//         <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//           {title || location ? (
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
//               🔍 "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//             </h2>
//           ) : (
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
//               🧾 Barcha ish e'lonlari
//             </h2>
//           )}
//         </div>

//         {/* Post Job Component */}
//         <div className="mb-10">
//           <PostJob />
//         </div>

//         {/* Job List */}
//         <div className="mb-12">
//           <JobList 
//             selectedCity={location} 
//             searchQuery={title} 
//             toggleExpandedJob={toggleExpandedJob} 
//             expandedJob={expandedJob}
//           />
//         </div>

//         {/* Footer */}
//         <CollapsibleFooter />
//       </div>
//     </main>
//   ); 
// }

//---------6----------------

// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';
// import "styles/global.css"
// import CollapsibleFooter from './components/CollapsibleFooter';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTools, FaSearch, FaListAlt } from 'react-icons/fa';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';

// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';

//   // State for expanded job
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   // Function to toggle expanded job
//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };

//   useEffect(() => {
//     setMounted(true);
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!mounted || status === 'loading' || isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
//         <motion.div
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           transition={{ 
//             duration: 0.5,
//             repeat: Infinity,
//             repeatType: "reverse"
//           }}
//           className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"
//         >
//           <FaTools className="text-white text-2xl" />
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
//     >
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Notification and Auth Status */}
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="flex justify-between items-center mb-6"
//         >
//           <NotificationBell />
          
//           <AnimatePresence>
//             {!session && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="flex items-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg shadow-sm"
//               >
//                 <HiOutlineExclamationCircle className="mr-2" />
//                 Siz tizimga kirmagansiz. Iltimos, tizimga kiring.
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Header Section */}
//         <motion.header
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mb-8"
//         >
//           <motion.h1 
//             whileHover={{ scale: 1.02 }}
//             className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 px-6 py-4 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center">
//               <FaTools className="mr-3" />
//               RaskaJob Ish e'lonlari
//             </div>
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-4 text-gray-600 dark:text-gray-300 text-lg"
//           >
//             Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.
//           </motion.p>
//         </motion.header>

//         {/* Search Results Title */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//         >
//           {title || location ? (
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
//               <FaSearch className="mr-2 text-blue-500" />
//               "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//             </h2>
//           ) : (
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
//               <FaListAlt className="mr-2 text-blue-500" />
//               Barcha ish e'lonlari
//             </h2>
//           )}
//         </motion.div>

//         {/* Post Job Component */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="mb-10"
//         >
//           <PostJob />
//         </motion.div>

//         {/* Job List */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mb-12"
//         >
//           <JobList 
//             selectedCity={location} 
//             searchQuery={title} 
//             toggleExpandedJob={toggleExpandedJob} 
//             expandedJob={expandedJob}
//           />
//         </motion.div>

//         {/* Footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           <CollapsibleFooter />
//         </motion.div>
//       </div>
//     </motion.main>
//   );
// }

//---------7---------------

'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from './components/JobList';
import NotificationBell from './components/NotificationBell';
import { useSearchParams } from 'next/navigation';
import "styles/global.css";
import CollapsibleFooter from './components/CollapsibleFooter';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-bounce flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <span className="text-white text-2xl">🛠</span>
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-medium">RaskaJob yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header/Navbar Section */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              RaskaJob
            </h1>
            <span className="hidden md:inline-block text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationBell />
            {/* Add profile component here */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600">👤</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            <span className="inline-block animate-wiggle">🚀</span> RaskaJob Ish e'lonlari
          </motion.h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Koreyadagi eng yaxshi ish imkoniyatlarini toping yoki o'zingizning e'loningizni joylang
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 flex items-center">
            <input
              type="text"
              placeholder="Ish nomi bo'yicha qidiruv..."
              className="flex-grow px-4 py-3 bg-transparent outline-none text-gray-700 dark:text-gray-300"
            />
            <select className="px-3 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg mx-2 text-gray-700 dark:text-gray-300">
              <option>Barcha shaharlar</option>
              <option>Seoul</option>
              <option>Busan</option>
              <option>Daegu</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Qidirish
            </button>
          </div>
        </section>

        {/* Auth Status */}
        {!session && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-200 p-4 mb-8 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <p>Siz tizimga kirmagansiz. To'liq foydalanish uchun ro'yxatdan o'ting</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Post Job Card */}
          <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-slide-up">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Ish joyini joylashtiring</h2>
              <PostJob />
            </div>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6 animate-slide-up">
              <div className="p-6">
                {title || location ? (
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">🔍</span>
                    "{title}" uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
                  </h2>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    So'ngi ish e'lonlari
                  </h2>
                )}
                <JobList 
                  selectedCity={location} 
                  searchQuery={title} 
                  toggleExpandedJob={toggleExpandedJob} 
                  expandedJob={expandedJob}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <CollapsibleFooter />

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}