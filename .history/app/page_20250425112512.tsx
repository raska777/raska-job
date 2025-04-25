

// 'use client';

// import { Suspense, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





// // Dynamically import components with no SSR
// const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
// const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
// const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
// const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
// const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });
// import 'react-toastify/dist/ReactToastify.css';
// import "styles/global.css";
// import "styles/custom.css";

// function HomeContent() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '');
//   const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '');
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);

//   const toggleExpandedJob = (jobId: string) => {
//     setExpandedJob(prev => (prev === jobId ? null : jobId));
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (searchTerm) params.set('title', searchTerm);
//     if (selectedCity) params.set('location', selectedCity);
//     router.push(`/?${params.toString()}`);
//   };

//   if (status === 'loading') {
//     return (
//       <div className="raskajob-container flex justify-center items-center h-screen">
//         <div className="raskajob-spinner animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="raskajob-container min-h-screen flex flex-col">
//       <header className="raskajob-header relative overflow-hidden">
//         <div className="raskajob-header-bg absolute inset-0">
//           <div className="raskajob-header-circle raskajob-header-circle-1 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-2 absolute"></div>
//           <div className="raskajob-header-circle raskajob-header-circle-3 absolute"></div>
//         </div>

//         <div className="raskajob-header-content relative z-10">
//           <div className="raskajob-nav flex justify-end p-4">
//             {session ? (<div>
//               <div className="raskajob-profile flex items-center gap-2">
//                 <Link href="/profile" className="raskajob-profile-icon">
//                   👤
//                 </Link>
//                 <p className="text-white">{'profile'}</p>
//               </div>
//               <div>
//                                 <NotificationBell />

//               </div>
//             </div>
              
//             ) : (
//               <AuthButtons />
//             )}
//           </div>

//           <div className="raskajob-search-container p-4">
//             <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
//               <select
//                 className="raskajob-search-select p-2 rounded"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//               >
//                 <option value="">{'allCities'}</option>
// <option value="Seoul">Seoul</option>
// <option value="Busan">Busan</option>
// <option value="Incheon">Incheon</option>
// <option value="Daegu">Daegu</option>
// <option value="Daejeon">Daejeon</option>
// <option value="Gwangju">Gwangju</option>
// <option value="Suwon">Suwon</option>
// <option value="Ulsan">Ulsan</option>
// <option value="Changwon">Changwon</option>
// <option value="Gyeongju">Gyeongju</option>
// <option value="Jeonju">Jeonju</option>
// <option value="Jeju">Jeju</option>
// <option value="Pohang">Pohang</option>
// <option value="Cheongju">Cheongju</option>
// <option value="Andong">Andong</option>
// <option value="Wonju">Wonju</option>
// <option value="Gangneung">Gangneung</option>
// <option value="Iksan">Iksan</option>
// <option value="Mokpo">Mokpo</option>
// <option value="Sokcho">Sokcho</option>
// <option value="Chuncheon">Chuncheon</option>
// <option value="Gimhae">Gimhae</option>
// <option value="Uijeongbu">Uijeongbu</option>
// <option value="Bucheon">Bucheon</option>
// <option value="Yangsan">Yangsan</option>

//               </select>

//               <input
//                 type="text"
//                 placeholder={'ish nomi...'}
//                 className="raskajob-search-input flex-grow p-2 rounded"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />

//               <button
//                 className="raskajob-search-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//                 onClick={handleSearch}
//               >
//                 {'search'}
//               </button>
//             </div>
//           </div>

//           <h1 className="raskajob-main-title text-center text-3xl font-bold text-white my-8">
//             🛠 {'RaskaJob'}
//           </h1>
//         </div>
//       </header>

//       <main className="raskajob-main flex-grow p-4">
//         <div className="raskajob-content max-w-6xl mx-auto">
//           <div className="flex justify-center mb-6">
//             {session ? (
//               <PostJob />
//             ) : (
//               <div className="text-center">
//                 <p className="text-gray-600 mb-2">{'loginToPost'}</p>
//                 <AuthButtons />
//               </div>
//             )}
//           </div>

//           {!session && (
//             <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
//               <p>{'notLoggedIn'}</p>
//             </div>
//           )}

//           <div className="raskajob-results-header mb-4">
//             {searchTerm || selectedCity ? (
//               <h2 className="raskajob-results-title text-xl font-semibold">
//                 🔍 &quot;{searchTerm}&quot; {'searchResults'} {selectedCity ? `${selectedCity} ${'in'}` : 'inAllCities'}
//               </h2>
//             ) : (
//               <h2 className="raskajob-results-title text-xl font-semibold">
//                 🧾 {'allJobs'}
//               </h2>
//             )}
//           </div>

//           <Suspense fallback={
//             <div className="flex justify-center py-8">
//               <div className="raskajob-spinner animate-spin"></div>
//             </div>
//           }>
//             <div className="raskajob-joblist-container">
//               <JobList
//                 selectedCity={selectedCity}
//                 searchQuery={searchTerm}
//                 toggleExpandedJob={toggleExpandedJob}
//                 expandedJob={expandedJob}
//               />
//             </div>
//           </Suspense>
//         </div>
//         <ToastContainer />
//       </main>

//       <CollapsibleFooter />
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <Suspense fallback={
//       <div className="raskajob-container flex justify-center items-center h-screen">
//         <div className="raskajob-spinner animate-spin"></div>
//       </div>
//     }>
//       <HomeContent />
//     </Suspense>
//   );
// }


///////////////////pasytdagi kod koreys tilida vaqtincha
'use client';

import { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import components
const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const CollapsibleFooter = dynamic(() => import('./components/CollapsibleFooter'), { ssr: false });
const AuthButtons = dynamic(() => import('./components/AuthButtons'), { ssr: false });
const NotificationBell = dynamic(() => import('./components/NotificationBell'), { ssr: false });

import 'react-toastify/dist/ReactToastify.css';
import "styles/global.css";
import "styles/custom.css";

function HomeContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleExpandedJob = (jobId: string) => {
    setExpandedJob(prev => (prev === jobId ? null : jobId));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('title', searchTerm);
    if (selectedCity) params.set('location', selectedCity);
    router.push(`/?${params.toString()}`);
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
              <div className='raska-job-ph'>
                <div className="raskajob-profile flex items-center gap-2">
                  <Link href="/profile" className="raskajob-profile-icon">
                    👤
                  </Link>
                  <p className="text-white">내 프로필</p>
                </div>
                <div>
                <NotificationBell />
                </div>
                  
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

          <div className="raskajob-search-container p-4">
            <div className="raskajob-search-box flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
              <select
                className="raskajob-search-select p-2 rounded"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">전체 도시</option>
                <option value="Seoul">서울</option>
                <option value="Busan">부산</option>
                <option value="Incheon">인천</option>
                <option value="Daegu">대구</option>
                <option value="Daejeon">대전</option>
                <option value="Gwangju">광주</option>
                <option value="Suwon">수원</option>
                <option value="Ulsan">울산</option>
                <option value="Changwon">창원</option>
                <option value="Gyeongju">경주</option>
                <option value="Jeonju">전주</option>
                <option value="Jeju">제주</option>
                <option value="Pohang">포항</option>
                <option value="Cheongju">청주</option>
                <option value="Andong">안동</option>
                <option value="Wonju">원주</option>
                <option value="Gangneung">강릉</option>
                <option value="Iksan">익산</option>
                <option value="Mokpo">목포</option>
                <option value="Sokcho">속초</option>
                <option value="Chuncheon">춘천</option>
                <option value="Gimhae">김해</option>
                <option value="Uijeongbu">의정부</option>
                <option value="Bucheon">부천</option>
                <option value="Yangsan">양산</option>
              </select>

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
                검색
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
                <AuthButtons />
              </div>
            )}
          </div>

          {!session && (
            <div className="raskajob-alert bg-yellow-100 p-4 rounded mb-4 text-center">
              <p>로그인하지 않았습니다</p>
            </div>
          )}

          <div className="raskajob-results-header mb-4">
            {searchTerm || selectedCity ? (
              <h2 className="raskajob-results-title text-xl font-semibold">
                🔍 &quot;{searchTerm}&quot; 검색 결과 {selectedCity ? `${selectedCity} 지역` : '전체 지역'}
              </h2>
            ) : (
              <h2 className="raskajob-results-title text-xl font-semibold">
                🧾 전체 채용 공고
              </h2>
            )}
          </div>

          <Suspense fallback={
            <div className="flex justify-center py-8">
              <div className="raskajob-spinner animate-spin"></div>
            </div>
          }>
            <div className="raskajob-joblist-container">
              <JobList
                selectedCity={selectedCity}
                searchQuery={searchTerm}
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
