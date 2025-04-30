

'use client';

import { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KOREAN_CITIES } from '@/lib/cities';
import { FaUser,  FaSearch, FaMapMarkerAlt } from 'react-icons/fa';



const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

import "styles/global.css";
import "styles/custom.css";

function HomeContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm); // ✅ API bilan mos
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
  
  <div className="profile-link flex items-center gap-2">
    <Link 
      href="/profile" 
      className="p-1 hover:bg-blue-500 dark:hover:bg-blue-600 rounded-full transition-colors"
    >
<FaUser className="text-gray-300 dark:text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />    </Link>
    
  </div>
</div>
                
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

        <div className="raskajob-search-container p-4">
  <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
    <div className="raskajob-select-wrapper">
      <FaMapMarkerAlt className="select-icon" />
      <select
        className="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Barcha shaharlar</option>
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
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
            {session ? (
              <PostJob />
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-2">로그인 후 채용 공고를 등록하세요</p>
                {/* <AuthButtons /> */}
              </div>
            )}
          </div>

          {!session && (
            <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
              <p>로그인하지 않았습니다</p>
            </div>
          )}

          <Suspense fallback={
            <div className="flex justify-center py-8">
              <div className="raskajob-spinner animate-spin"></div>
            </div>
          }>
            <div className="raskajob-joblist-container">
              <JobList
                selectedCity=""
                searchQuery=""
                toggleExpandedJob={toggleExpandedJob}
                expandedJob={expandedJob}
              />
            </div>
          </Suspense>
        </div>
        <ToastContainer />
      </main>

      <CollapsibleFooter />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="raskajob-container flex justify-center items-center h-screen">
        <div className="raskajob-spinner animate-spin"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

