
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiMapPin, FiArrowLeftCircle } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

import "styles/searchPage.css";


// Korean translations
const translations = {
  back: "뒤로",
  allJobs: "전체 채용 공고",
  allCities: "모든 도시",
  searchPlaceholder: "직업 제목 또는 키워드...",
  search: "검색",
  loadingJobs: "채용 공고를 불러오는 중...",
  loadingParams: "검색 매개변수를 불러오는 중..."
};

// Korean cities data
const KOREAN_CITIES = [
  { value: "서울", label: "Seoul" },
  { value: "부산", label: "Busan" },
  { value: "인천", label: "Incheon" },
  { value: "대구", label: "Daegu" },
  { value: "대전", label: "Daejeon" },
  { value: "광주", label: "Gwangju" },
  { value: "수원", label: "Suwon" },
  { value: "울산", label: "Ulsan" },
  { value: "창원", label: "Changwon" },
  { value: "경주", label: "Gyeongju" },
  { value: "전주", label: "Jeonju" },
  { value: "제주", label: "Jeju" },
  { value: "포항", label: "Pohang" },
  { value: "청주", label: "Cheongju" },
  { value: "안동", label: "Andong" },
  { value: "원주", label: "Wonju" },
  { value: "강릉", label: "Gangneung" },
  { value: "익산", label: "Iksan" },
  { value: "목포", label: "Mokpo" },
  { value: "속초", label: "Sokcho" },
  { value: "춘천", label: "Chuncheon" },
  { value: "김해", label: "Gimhae" },
  { value: "의정부", label: "Uijeongbu" },
  { value: "부천", label: "Bucheon" },
  { value: "양산", label: "Yangsan" }
];

// Dynamically load JobList component
const JobList = dynamic(() => import('@/app/components/JobList'), {
  ssr: false,
  loading: () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{translations.loadingJobs}</p>
    </div>
  )
});

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="page-loading">
        <div className="spinner"></div>
        <p>{translations.loadingParams}</p>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search') || '';
  const location = searchParams.get('location') || '';

  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedCity, setSelectedCity] = useState(location);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page-container">
      {/* Header Section */}
      <header className="search-header">
      <button 
        onClick={() => router.push('/')} 
        className="back-button"
        aria-label="Go back"
      >
        <FiArrowLeftCircle size={24} />
        {translations.back}
      </button>

      <h1 className="search-title">
        {search || location ? (
          <span className="title-content">
            <FiSearch className="title-icon" />
            "{search}" {location && <span className="location-text">• {location}</span>}
          </span>
        ) : (
          <span className="title-content">
            <FiMapPin className="title-icon" />
            {translations.allJobs}
          </span>
        )}
      </h1>
    </header>

      {/* Search Form */}
      <div className="search-panel">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-3">
            <select
              className="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Select city"
            >
              <option value="">{translations.allCities}</option>
              {KOREAN_CITIES.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder={translations.searchPlaceholder}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search jobs"
            />

            <button
              type="submit"
              className="search-button"
              aria-label="Search"
            >
              <FiSearch size={18} className="inline" />
              {translations.search}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <main className="search-results">
        <JobList
          selectedCity={selectedCity}
          searchQuery={searchTerm}
          toggleExpandedJob={toggleExpandedJob}
          expandedJob={expandedJob}
        />
      </main>
      
    </div>
  );
}