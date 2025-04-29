
// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useState, Suspense } from 'react';
// import dynamic from 'next/dynamic';

// // SSR bo'lmagan holda JobList komponentini dinamik yuklash
// const JobList = dynamic(() => import('../components/JobList'), { 
//   ssr: false,
//   loading: () => <div className="text-center py-8">🔄 로딩 중...</div>
// });

// export default function SearchPage() {
//   return (
//     <Suspense fallback={<div className="text-center py-8">🔍 검색 매개변수를 불러오는 중...</div>}>
//       <SearchPageContent />
//     </Suspense>
//   );
// }

// function SearchPageContent() {
//   const searchParams = useSearchParams();
//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
//   const router = useRouter();

//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };

//   return (
//     <main className="p-4 max-w-6xl mx-auto">
//       {/* Orqaga qaytish tugmasi */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//         </svg>
//         뒤로가기
//       </button>
      
//       <h1 className="text-2xl font-bold mb-6">
//         {title || location ? (
//           `🔍 "${title}"에 대한 ${location ? location + ' 지역의 ' : '전체 지역의 '}검색 결과`
//         ) : (
//           '🧾 전체 구직 공고'
//         )}
//       </h1>
      
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <JobList 
//           selectedCity={location} 
//           searchQuery={title} 
//           toggleExpandedJob={toggleExpandedJob} 
//           expandedJob={expandedJob} 
//         />
//       </div>
//     </main>
//   );
// }

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// SSR bo'lmagan holda JobList komponentini dinamik yuklash
const JobList = dynamic(() => import('../components/JobList'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-600 flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          검색 매개변수를 불러오는 중...
        </div>
      </div>
    }>
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
    <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        뒤로가기
      </button>
      
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {title || location ? (
            <>
              <span className="text-blue-500">🔍</span> "{title}"에 대한 {location ? <span className="text-blue-500">{location}</span> + ' 지역의 ' : '전체 지역의 '}검색 결과
            </>
          ) : (
            <>
              <span className="text-blue-500">🧾</span> 전체 구직 공고
            </>
          )}
        </h1>
        <p className="text-gray-500">
          {title || location ? (
            `총 ${/* You can add dynamic count here */ '0'}개의 공고가 발견되었습니다`
          ) : (
            '현재 등록된 모든 구직 공고를 확인하세요'
          )}
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6 sm:p-8">
          <JobList 
            selectedCity={location} 
            searchQuery={title} 
            toggleExpandedJob={toggleExpandedJob} 
            expandedJob={expandedJob} 
          />
        </div>
      </div>
    </main>
  );
}