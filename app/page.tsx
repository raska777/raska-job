


'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KOREAN_CITIES } from '@/lib/cities';
import { FaUser, FaSearch } from 'react-icons/fa';
import 'styles/welcomeBanner.css';
import { useSearchParams, useRouter } from 'next/navigation';

const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

import 'styles/global.css';
import 'styles/custom.css';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrollToId = searchParams.get('scrollTo');
  const [isJobListLoaded, setIsJobListLoaded] = useState(false);
const [currentPage, setCurrentPage] = useState(() => {
  const pageParam = searchParams.get('page');
  return pageParam ? parseInt(pageParam) : 1;
});




useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const scrollToId = params.get('scrollTo');
  if (!scrollToId || !isJobListLoaded) {
    console.log('⛔ scrollToId mavjud emas yoki JobList hali yuklanmagan');
    return;
  }

  const MAX_ATTEMPTS = 15;
  const RETRY_DELAY = 200;

  const scrollToElement = (attempt = 1) => {
    requestAnimationFrame(() => {
      const element = document.getElementById(scrollToId);
      if (element) {
        const offset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        console.log(`✅ Scrolled to ${scrollToId}`);

        // 🧹 scrollTo parameterni URL’dan olib tashlash
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('scrollTo');
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
        console.log(`🧹 scrollTo param removed, URL cleaned`);
      } else if (attempt < MAX_ATTEMPTS) {
        console.log(`⏳ Attempt ${attempt}: ${scrollToId} not found`);
        setTimeout(() => scrollToElement(attempt + 1), RETRY_DELAY);
      } else {
        console.warn(`❌ Failed to scroll: ${scrollToId} not found`);
      }
    });
  };

  scrollToElement();
}, [isJobListLoaded]);

  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };



 
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    router.push(`/search?${params.toString()}`);
  };

  if (status === 'loading') {
    return (
      <div className="raskajob-container flex justify-center items-center h-screen">
        <div className="raskajob-spinner animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="raskajob-container min-h-screen flex flex-col">
      <header className="raskajob-header relative overflow-hidden">
        <div className="raskajob-header-bg absolute inset-0">
          <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
          <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
          <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
        </div>

        <div className="raskajob-header-content relative z-10">
          <div className="raskajob-nav flex justify-end p-4">
            {session ? (
              <div className="raska-job-ph">
                <div className="profile-section flex items-center gap-4 bg-blue-600 dark:bg-blue-800 px-4 py-2 rounded-full">
                  <NotificationBell />
                  <div>
                    <Link href="/profile">
                      <FaUser className="text-white opacity-80 hover:opacity-100 hover:text-blue-300 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="welcome-container">
                  <div className="welcome-banner">
                    <p className="welcome-message">
                      환영합니다! (Hush kelibsiz!) <br />
                      Raska Job 서비스가 곧 출시됩니다! (Tez orada sayt ishga tushadi)
                    </p>
                  </div>
                </div>
                <AuthButtons />
              </>
            )}
          </div>

          <div className="raskajob-search-container p-4">
            <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
              <div className="raskajob-select-wrapper">
                <select
                  className="city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">모든 도시</option>
                  {KOREAN_CITIES.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label} ({city.value})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="직업명을 입력하세요..."
                className="raskajob-search-input flex-grow p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="raskajob-search-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick={handleSearch}
              >
                <FaSearch /> 검색
              </button>
            </div>
          </div>
          <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
            🛠 RaskaJob
          </h1>
        </div>
      </header>

      <main className="raskajob-main flex-grow p-4">
        <div className="raskajob-content max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            {session ? <PostJob /> : <p className="text-center text-gray-600">로그인 후 채용 공고를 등록하세요</p>}
          </div>

          {!session && (
            <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
              <p>로그인하지 않았습니다</p>
            </div>
          )}

          <Suspense fallback={<div className="flex justify-center py-8"><div className="raskajob-spinner animate-spin"></div></div>}>
            <div className="raskajob-joblist-container">
            <JobList
  currentPage={currentPage}
  onPageChange={(newPage) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(window.location.search);
    if (scrollToId) params.set('scrollTo', scrollToId);
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  }}
  selectedCity=""
  searchQuery=""
  toggleExpandedJob={toggleExpandedJob}
  expandedJob={expandedJob}
  onLoaded={() => setIsJobListLoaded(true)}
/>

            </div>
          </Suspense>
        </div>
        <ToastContainer position="top-right" autoClose={1000}/>
      </main>

      <CollapsibleFooter />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="raskajob-container flex justify-center items-center h-screen"><div className="raskajob-spinner animate-spin"></div></div>}>
      <HomeContent />
    </Suspense>
  );
}
