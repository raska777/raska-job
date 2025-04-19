// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import JobList from '../components/JobList';

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';

//   const router = useRouter();

//   return (
//     <main className="p-4 max-w-2xl mx-auto">
//       {/* Orqaga qaytish tugmasi */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//       >
//         Orqaga
//       </button>
      
//       <h1 className="text-2xl font-bold mb-4">🔍 Qidiruv natijalari</h1>
//       <JobList selectedCity={''} searchQuery={''} toggleExpandedJob={function (jobId: any): void {
//         throw new Error('Function not implemented.');
//       } } expandedJob={null} />
//     </main>
//   );
// }


// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import JobList from '../components/JobList';
// import { useState } from 'react';

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
//   const router = useRouter();

//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };

//   return (
//     <main className="p-4 max-w-2xl mx-auto">
//       {/* Orqaga qaytish tugmasi */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//       >
//         Orqaga
//       </button>
      
//       <h1 className="text-2xl font-bold mb-4">
//         {title || location ? (
//           `🔍 "${title}" uchun ${location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari`
//         ) : (
//           '🧾 Barcha ish e\'lonlari'
//         )}
//       </h1>
      
//       <JobList 
//         selectedCity={location} 
//         searchQuery={title} 
//         toggleExpandedJob={toggleExpandedJob} 
//         expandedJob={expandedJob} 
//       />
//     </main>
//   );
// }

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import JobList with no SSR
const JobList = dynamic(() => import('../components/JobList'), { 
  ssr: false,
  loading: () => <div className="text-center py-8">Yuklanmoqda...</div>
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Qidiruv parametrlari yuklanmoqda...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';
  const router = useRouter();

  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Orqaga
      </button>
      
      <h1 className="text-2xl font-bold mb-6">
        {title || location ? (
          `🔍 "${title}" uchun ${location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari`
        ) : (
          '🧾 Barcha ish e\'lonlari'
        )}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <JobList 
          selectedCity={location} 
          searchQuery={title} 
          toggleExpandedJob={toggleExpandedJob} 
          expandedJob={expandedJob} 
        />
      </div>
    </main>
  );
}