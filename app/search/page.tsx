
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// SSR bo'lmagan holda JobList komponentini dinamik yuklash
const JobList = dynamic(() => import('../components/JobList'), { 
  ssr: false,
  loading: () => <div className="text-center py-8">🔄 로딩 중...</div>
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">🔍 검색 매개변수를 불러오는 중...</div>}>
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
      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        뒤로가기
      </button>
      
      <h1 className="text-2xl font-bold mb-6">
        {title || location ? (
          `🔍 "${title}"에 대한 ${location ? location + ' 지역의 ' : '전체 지역의 '}검색 결과`
        ) : (
          '🧾 전체 구직 공고'
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
