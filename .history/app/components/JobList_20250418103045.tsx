
// 'use client';

// import { useEffect, useState } from 'react';
// import "styles/global.css";

// interface Job {
//   id: string;
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
//   posted_date?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
//   toggleExpandedJob: (jobId: string) => void;
//   expandedJob: string | null;
// }

// const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const jobsPerPage = 12;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch('/api/post');
        
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
        
//         const data = await res.json();
//         const validatedJobs = data.map((job: any) => ({
//           id: job.id || Math.random().toString(36).substring(2, 9),
//           jobname: job.jobname || 'Noma\'lum',
//           location: job.location || 'Noma\'lum',
//           work_type: job.work_type || 'Noma\'lum',
//           work_hours: job.work_hours || 'Noma\'lum',
//           salary: job.salary || 'Kelishilgan',
//           language: job.language || 'Noma\'lum',
//           visa_type: job.visa_type || 'Noma\'lum',
//           contact: job.contact || 'Noma\'lum',
//           work_days: job.work_days,
//           posted_date: job.posted_date
//         }));
        
//         setJobs(validatedJobs);
//       } catch (err) {
//         console.error("Error loading jobs:", err);
//         setError('Ish e\'lonlarini yuklab bo\'lmadi. Iltimos, keyinroq urunib ko\'ring.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Filtirlash funksiyasi
//   const filteredJobs = jobs.filter((job) => {
//     const city = selectedCity.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     const locationMatch = selectedCity
//       ? job.location.toLowerCase().includes(city)
//       : true;

//     const queryMatch = searchQuery 
//       ? Object.entries(job).some(([key, value]) => 
//           key !== 'id' && 
//           typeof value === 'string' && 
//           value.toLowerCase().includes(query)
//         )
//       : true;

//     return locationMatch && queryMatch;
//   });

//   // Paginatsiya
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   // Yuklanish holati
//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//         <p>Ish e'lonlari yuklanmoqda...</p>
//       </div>
//     );
//   }

//   // Xato holati
//   if (error) {
//     return (
//       <div className="text-center p-4 bg-red-100 rounded-lg text-red-700">
//         <p className="mb-2">{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Qayta urunish
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Natijalar soni */}
//       <div className="mb-6 text-gray-600">
//         <p>
//           {filteredJobs.length} ta ish topildi •{' '}
//           <span>
//             Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
//           </span>
//         </p>
//       </div>

//       {/* Ish e'lonlari */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentJobs.length > 0 ? (
//           currentJobs.map((job) => (
//             <div key={job.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">{job.work_type}</h3>
//                 <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                   <br />
//                   <span>📍 {job.location}</span>
//                 </div>

//                 <ul className="space-y-2 text-sm">
//                   <li>🕒 Ish vaqti: {job.work_hours}</li>
//                   <li>💰 Maosh: {job.salary}</li>
//                   <li>🌐 Til: {job.language}</li>
//                 </ul>

//                 {expandedJob === job.id && (
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <ul className="space-y-2 text-sm">
//                       {job.work_days && <li>📅 Ish kunlari: {job.work_days}</li>}
//                       <li>🛂 Viza turi: {job.visa_type}</li>
//                       <li>📞 Bog'lanish: {job.contact}</li>
//                       {job.posted_date && (
//                         <li className="text-xs text-gray-400 mt-2">
//                           E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
//                         </li>
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={() => toggleExpandedJob(job.id)}
//                 className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 border-t border-gray-100 text-sm"
//               >
//                 {expandedJob === job.id ? 'Kamroq ko\'rsatish' : 'Batafsil ma\'lumot'}
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10 text-gray-500">
//             <p className="text-lg">🔍 Hech qanday ish topilmadi</p>
//             <p className="mt-2">Qidiruv parametrlarini o'zgartirib ko'ring</p>
//           </div>
//         )}
//       </div>

//       {/* Paginatsiya */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Oldingi
//           </button>
          
//           {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//             let pageNum;
//             if (totalPages <= 5) {
//               pageNum = i + 1;
//             } else if (currentPage <= 3) {
//               pageNum = i + 1;
//             } else if (currentPage >= totalPages - 2) {
//               pageNum = totalPages - 4 + i;
//             } else {
//               pageNum = currentPage - 2 + i;
//             }
            
//             return (
//               <button
//                 key={pageNum}
//                 onClick={() => setCurrentPage(pageNum)}
//                 className={`px-4 py-2 border rounded ${
//                   currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : ''
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             );
//           })}
          
//           {totalPages > 5 && currentPage < totalPages - 2 && (
//             <span className="px-4 py-2">...</span>
//           )}
          
//           {totalPages > 5 && currentPage < totalPages - 2 && (
//             <button
//               onClick={() => setCurrentPage(totalPages)}
//               className={`px-4 py-2 border rounded ${
//                 currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600' : ''
//               }`}
//             >
//               {totalPages}
//             </button>
//           )}
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Keyingi
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;

'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";

interface Job {
  id: string;
  jobname: string;
  location: string;
  work_type: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  work_days?: string;
  posted_date?: string;
}

interface JobListProps {
  selectedCity: string;
  searchQuery: string;
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
}

const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/post');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        const validatedJobs = data.map((job: any) => ({
          id: job.id || Math.random().toString(36).substring(2, 9),
          jobname: job.jobname || 'Noma\'lum',
          location: job.location || 'Noma\'lum',
          work_type: job.work_type || 'Noma\'lum',
          work_hours: job.work_hours || 'Noma\'lum',
          salary: job.salary || 'Kelishilgan',
          language: job.language || 'Noma\'lum',
          visa_type: job.visa_type || 'Noma\'lum',
          contact: job.contact || 'Noma\'lum',
          work_days: job.work_days,
          posted_date: job.posted_date
        }));
        
        setJobs(validatedJobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
        setError('Ish e\'lonlarini yuklab bo\'lmadi. Iltimos, keyinroq urunib ko\'ring.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filtirlash funksiyasi
  const filteredJobs = jobs.filter((job) => {
    const city = selectedCity.toLowerCase();
    const query = searchQuery.toLowerCase();

    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(city)
      : true;

    const queryMatch = searchQuery 
      ? Object.entries(job).some(([key, value]) => 
          key !== 'id' && 
          typeof value === 'string' && 
          value.toLowerCase().includes(query)
        )
      : true;

    return locationMatch && queryMatch;
  });

  // Paginatsiya
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Yuklanish holati
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg text-gray-600 animate-pulse">Ish e'lonlari yuklanmoqda...</p>
      </div>
    );
  }

  // Xato holati
  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg max-w-2xl mx-auto my-8 shadow-md">
        <div className="text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="mb-4 text-lg font-medium text-gray-800">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow hover:shadow-md"
        >
          Qayta urunish
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Natijalar soni */}
      <div className="mb-8 text-gray-600 bg-white p-4 rounded-lg shadow-sm">
        <p className="text-sm md:text-base">
          <span className="font-medium">{filteredJobs.length}</span> ta ish topildi •{' '}
          <span>
            Sahifa <span className="font-medium">{currentPage}</span>/{totalPages > 0 ? totalPages : 1}
          </span>
        </p>
      </div>

      {/* Ish e'lonlari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div 
              key={job.id} 
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white"
            >
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{job.work_type}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.location}</span>
                </div>

                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ish vaqti: <span className="font-medium">{job.work_hours}</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Maosh: <span className="font-medium">{job.salary}</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span>Til: <span className="font-medium">{job.language}</span></span>
                  </li>
                </ul>

                {expandedJob === job.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                    <ul className="space-y-3 text-sm text-gray-600">
                      {job.work_days && (
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Ish kunlari: <span className="font-medium">{job.work_days}</span></span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Viza turi: <span className="font-medium">{job.visa_type}</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Bog'lanish: <span className="font-medium">{job.contact}</span></span>
                      </li>
                      {job.posted_date && (
                        <li className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleExpandedJob(job.id)}
                className="w-full py-3 text-center text-blue-600 hover:bg-blue-50 border-t border-gray-100 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
              >
                {expandedJob === job.id ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Kamroq ko'rsatish
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Batafsil ma'lumot
                  </>
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Hech qanday ish topilmadi</h3>
              <p className="text-gray-500 mb-4">Qidiruv parametrlarini o'zgartirib ko'ring yoki filtrlarni qayta sozlang</p>
              <button 
                onClick={() => {
                  setCurrentPage(1);
                  // Bu yerda siz qidiruv parametrlarini ham qayta sozlashingiz kerak
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Filtrlarni tozalash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Paginatsiya */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Oldingi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Always show first page */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              1
            </button>
            
            {/* Show ellipsis if needed */}
            {currentPage > 3 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            
            {/* Show current page and neighbors */}
            {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
              let pageNum;
              if (currentPage <= 2) {
                pageNum = i + 2;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 3 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
              
              if (pageNum > 1 && pageNum < totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            
            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            
            {/* Always show last page if there is more than one page */}
            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Keyingi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default JobList;