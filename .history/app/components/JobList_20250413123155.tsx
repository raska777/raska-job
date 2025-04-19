// // import { useEffect, useState } from 'react';

// // interface Job {
// //   jobname: string;
// //   location: string;
// //   work_type: string;
// //   work_hours: string;
// //   salary: string;
// //   language: string;
// //   visa_type: string;
// //   contact: string;
// //   work_days?: string; // work_days ni qo'shdik
// // }

// // interface JobListProps {
// //   selectedCity: string;
// //   searchQuery: string;
// // }

// // const JobList = ({ selectedCity }: JobListProps) => {
// //   const [jobs, setJobs] = useState<Job[]>([]);
// //   const [query, setQuery] = useState('');

// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       try {
// //         const res = await fetch("/api/post");
// //         const data = await res.json();
// //         setJobs(data);
// //       } catch (error) {
// //         console.error("❌ Yuklashda xato:", error);
// //       }
// //     };

// //     fetchJobs();
// //   }, []);

// //   const filteredJobs = jobs.filter((job) => {
// //     const queryLowerCase = query.toLowerCase();
  
// //     // locationMatch: Agar selectedCity bo'lsa, faqat shu shaharni filtrlash
// //     const locationMatch = selectedCity ? 
// //       job.location.toLowerCase().includes(selectedCity.toLowerCase()) : 
// //       true;
  
// //     // Qidiruvni tekshirish
// //     const isMatchingQuery = (
// //       (job.jobname && job.jobname.toLowerCase().includes(queryLowerCase)) ||
// //       (job.location && job.location.toLowerCase().includes(queryLowerCase)) ||
// //       (job.work_type && job.work_type.toLowerCase().includes(queryLowerCase)) ||
// //       (job.work_hours && job.work_hours.toLowerCase().includes(queryLowerCase)) ||
// //       (job.salary && job.salary.toLowerCase().includes(queryLowerCase)) ||
// //       (job.language && job.language.toLowerCase().includes(queryLowerCase)) ||
// //       (job.visa_type && job.visa_type.toLowerCase().includes(queryLowerCase)) ||
// //       (job.contact && job.contact.toLowerCase().includes(queryLowerCase))
// //     );
  
// //     // locationMatch va isMatchingQuery birga tekshiriladi
// //     return locationMatch && isMatchingQuery;
// //   });

// //   return (
// //     <div>
      

// //       {filteredJobs.length > 0 ? (
// //         filteredJobs.map((job: Job, idx: number) => (
// //           <div key={idx} className="border p-4 rounded shadow mb-2">
// //             <h2 className="text-xl font-semibold">{job.jobname}</h2>
// //             <p>shahar📍 {job.location}</p>
// //             <p>turi📝 {job.work_type}</p>
// //             <p>soati📍 {job.work_hours}</p>
// //             <p>maosh💵 {job.salary}</p>
// //             <p>til-bilishi🌐 {job.language}</p>
// //             <p>viza🛂 {job.visa_type}</p>
// //             <p>contact📞 {job.contact}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p>🔍 E’lonlar topilmadi</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default JobList; 

// "use client";

// import { useEffect, useState } from 'react';

// interface Job {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
// }

// const JobList = ({ selectedCity, searchQuery }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);

//   const fetchJobs = async () => {
//     try {
//       const res = await fetch(`/api/post?city=${selectedCity}&query=${searchQuery}`);
//       if (res.ok) {
//         const data = await res.json();
//         setJobs(data);
//       } else {
//         console.error("❌ API error:", res.status);
//       }
//     } catch (error) {
//       console.error("❌ Yuklashda xato:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [selectedCity, searchQuery]);

//   return (
//     <div>
//       {jobs.length > 0 ? (
//         jobs.map((job: Job, idx: number) => (
//           <div key={idx} className="border p-4 rounded shadow mb-2">
//             <h2 className="text-xl font-semibold">{job.jobname}</h2>
//             <p>shahar📍 {job.location}</p>
//             <p>turi📝 {job.work_type}</p>
//             <p>soati📍 {job.work_hours}</p>
//             <p>maosh💵 {job.salary}</p>
//             <p>til-bilishi🌐 {job.language}</p>
//             <p>viza🛂 {job.visa_type}</p>
//             <p>contact📞 {job.contact}</p>
//           </div>
//         ))
//       ) : (
//         <p>🔍 E’lonlar topilmadi</p>
//       )}
//     </div>
//   );
// };

// export default JobList;


// //-----------------2 changed joblist ----------------------
// "use client";

// import { useEffect, useState } from 'react';
// import "styles/global.css"

// interface Job {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
// }

// const JobList = ({ selectedCity, searchQuery }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 20;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/post');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data);
//         } else {
//           console.error("❌ API error:", res.status);
//         }
//       } catch (error) {
//         console.error("❌ Yuklashda xato:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter qilingan ishlar
//   const filteredJobs = jobs.filter((job) => {
//     const city = selectedCity.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     const locationMatch = selectedCity
//       ? job.location.toLowerCase().includes(city)
//       : true;

//     const queryMatch = Object.values(job).some((val) =>
//       typeof val === 'string' && val.toLowerCase().includes(query)
//     );

//     return locationMatch && queryMatch;
//   });

//   // 🧮 Pagination hisoblash
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <div>
//       {currentJobs.length > 0 ? (
//         currentJobs.map((job: Job, idx: number) => (
//           <div key={idx} className="border p-4 rounded shadow mb-2">
//             <h2 className="text-xl font-semibold">{job.jobname}</h2>
//             <p>shahar📍 {job.location}</p>
//             <p>turi📝 {job.work_type}</p>
//             <p>soati📍 {job.work_hours}</p>
//             <p>maosh💵 {job.salary}</p>
//             <p>til-bilishi🌐 {job.language}</p>
//             <p>viza🛂 {job.visa_type}</p>
//             <p>contact📞 {job.contact}</p>
//           </div>
//         ))
//       ) : (
//         <p>🔍 E’lonlar topilmadi</p>
//       )}

//       {/* 📄 Pagination tugmalari */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === i + 1
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;

// 'use client';

// import { useEffect, useState } from 'react';
// import "styles/global.css";

// interface Job {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
// }

// const JobList = ({ selectedCity, searchQuery }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 20;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/post');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data);
//         } else {
//           console.error("❌ API error:", res.status);
//         }
//       } catch (error) {
//         console.error("❌ Yuklashda xato:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter qilingan ishlar
//   const filteredJobs = jobs.filter((job) => {
//     const city = selectedCity.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     const locationMatch = selectedCity
//       ? job.location.toLowerCase().includes(city)
//       : true;

//     const queryMatch = Object.values(job).some((val) =>
//       typeof val === 'string' && val.toLowerCase().includes(query)
//     );

//     return locationMatch && queryMatch;
//   });

//   // 🧮 Pagination hisoblash
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <div className="space-y-4">
//       {currentJobs.length > 0 ? (
//         currentJobs.map((job: Job, idx: number) => (
//           <div key={idx} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-blue-300 bg-white">
//             <h2 className="text-2xl font-semibold text-gray-900">{job.jobname}</h2>
//             <div className="text-gray-600 mt-2">
//               <p><strong>📍 Shahar:</strong> {job.location}</p>
//               <p><strong>📝 Ish turi:</strong> {job.work_type}</p>
//               <p><strong>⏰ Soat:</strong> {job.work_hours}</p>
//               <p><strong>💵 Maosh:</strong> {job.salary}</p>
//               <p><strong>🌐 Til:</strong> {job.language}</p>
//               <p><strong>🛂 Viza turi:</strong> {job.visa_type}</p>
//               <p><strong>📞 Kontakt:</strong> {job.contact}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-600">🔍 E’lonlar topilmadi</p>
//       )}

//       {/* 📄 Pagination tugmalari */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg text-lg font-semibold ${
//                 currentPage === i + 1
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-300 text-gray-800'
//               } transition-all hover:bg-blue-500`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;


//------------------------4 changed again----------------
// 'use client';

// import { useEffect, useState } from 'react';
// import "styles/global.css";

// interface Job {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
//   toggleExpandedJob: (jobId: any) => void;
//   expandedJob: string | null;
// }

// const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 20;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/post');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data);
//         } else {
//           console.error("❌ API error:", res.status);
//         }
//       } catch (error) {
//         console.error("❌ Yuklashda xato:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter qilingan ishlar
//   const filteredJobs = jobs.filter((job) => {
//     const city = selectedCity.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     const locationMatch = selectedCity
//       ? job.location.toLowerCase().includes(city)
//       : true;

//     const queryMatch = Object.values(job).some((val) =>
//       typeof val === 'string' && val.toLowerCase().includes(query)
//     );

//     return locationMatch && queryMatch;
//   });

//   // 🧮 Pagination hisoblash
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <div className="space-y-4">
//       {currentJobs.length > 0 ? (
//         currentJobs.map((job: Job, idx: number) => (
//           <div key={idx} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-blue-300 bg-white">
//             <h2 className="text-2xl font-semibold text-gray-900">{job.jobname}</h2>
//             <div className="text-gray-600 mt-2">
//               <p><strong>📍 Shahar:</strong> {job.location}</p>
//               <p><strong>📝 Ish turi:</strong> {job.work_type}</p>
//               <p><strong>⏰ Soat:</strong> {job.work_hours}</p>
//               <p><strong>💵 Maosh:</strong> {job.salary}</p>
//               <p><strong>🌐 Til:</strong> {job.language}</p>
//               <p><strong>🛂 Viza turi:</strong> {job.visa_type}</p>
//               <p><strong>📞 Kontakt:</strong> {job.contact}</p>

//               {/* Kengaytirilgan ish e'lonini ko'rsatish */}
//               {expandedJob === job.jobname ? (
//                 <div className="mt-4">
//                   <p><strong>Yana ko'proq ma'lumot:</strong> {job.work_days}</p>
//                   {/* Boshqa kengaytirilgan ma'lumotlar */}
//                 </div>
//               ) : null}
//             </div>

//             <button 
//               onClick={() => toggleExpandedJob(job.jobname)} 
//               className="mt-2 text-blue-600 hover:text-blue-800"
//             >
//               {expandedJob === job.jobname ? 'Kamroq' : 'To‘liq'}</button>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-600">🔍 E’lonlar topilmadi</p>
//       )}

//       {/* 📄 Pagination tugmalari */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg text-lg font-semibold ${
//                 currentPage === i + 1
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-300 text-gray-800'
//               } transition-all hover:bg-blue-500`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;

//-------------------5-------------------
// 'use client';

// import { useEffect, useState } from 'react';
// import "styles/global.css";

// interface Job {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
// }

// interface JobListProps {
//   selectedCity: string;
//   searchQuery: string;
//   toggleExpandedJob: (jobId: any) => void;
//   expandedJob: string | null;
// }

// const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 20;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/post');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data);
//         } else {
//           console.error("❌ API error:", res.status);
//         }
//       } catch (error) {
//         console.error("❌ Yuklashda xato:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter qilingan ishlar
//   const filteredJobs = jobs.filter((job) => {
//     const city = selectedCity.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     const locationMatch = selectedCity
//       ? job.location.toLowerCase().includes(city)
//       : true;

//     const queryMatch = Object.values(job).some((val) =>
//       typeof val === 'string' && val.toLowerCase().includes(query)
//     );

//     return locationMatch && queryMatch;
//   });

//   // 🧮 Pagination hisoblash
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {currentJobs.length > 0 ? (
//         currentJobs.map((job: Job, idx: number) => (
//           <div key={idx} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <h2 className="card h2 text-2xl font-semibold text-gray-900">📝 {job.work_type}</h2>
//             <div className="card-grid card:hover text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <p><strong>📍 Shahar:</strong> {job.location}</p>
//               <p><strong>⏰ Soat:</strong> {job.work_hours}</p>
//               <p><strong>💵 Maosh:</strong> {job.salary}</p>
//               <p><strong>🌐 Til:</strong> {job.language}</p>
//               <p><strong>🛂 Viza turi:</strong> {job.visa_type}</p>
//               <p><strong>📞 Kontakt:</strong> {job.contact}</p>

//               {/* Kengaytirilgan ish e'lonini ko'rsatish */}
//               {expandedJob === job.jobname ? (
//                 <div className="mt-4">
//                   <p><strong>Yana ko'proq ma'lumot:</strong> {job.work_days}</p>
                  
//                   {/* Boshqa kengaytirilgan ma'lumotlar */}
//                 </div>
//               ) : null}
//             </div>

//             <button 
//               onClick={() => toggleExpandedJob(job.jobname)} 
//               className="card-button card-button:hover mt-2 text-blue-600 hover:text-blue-800"
//             >
//               {expandedJob === job.jobname ? 'Kamroq' : 'To‘liq'}
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="card p text-center text-gray-600">🔍 E’lonlar topilmadi</p>
//       )}

//       {/* 📄 Pagination tugmalari */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded${
//                 currentPage === i + 1
//                   ? 'bg-blue-800 text-white'
//                   : 'bg-gray-200 text-gray-800'
//               } transition-all hover:bg-blue-500`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;

//--------------6-----------------
'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";

interface Job {
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
  toggleExpandedJob: (jobId: any) => void;
  expandedJob: string | null;
}

const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/post');
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          console.error("❌ API error:", res.status);
        }
      } catch (error) {
        console.error("❌ Yuklashda xato:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const city = selectedCity.toLowerCase();
    const query = searchQuery.toLowerCase();

    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(city)
      : true;

    const queryMatch = Object.values(job).some((val) =>
      typeof val === 'string' && val.toLowerCase().includes(query)
    );

    return locationMatch && queryMatch;
  });

  // 🧮 Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Format date if exists
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Job count */}
      <div className="mb-6 text-gray-600 dark:text-gray-300">
        <span className="font-medium">{filteredJobs.length}</span> ta ish topildi
      </div>

      {/* Jobs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job: Job, idx: number) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                {/* Job title */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {job.jobname}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {job.work_type}
                  </span>
                </div>

                {/* Job info */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{job.location}</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{job.work_hours}</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{job.salary}</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{job.language}</span>
                  </div>

                  {job.posted_date && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      {formatDate(job.posted_date)}
                    </div>
                  )}
                </div>

                {/* Expanded content */}
                {expandedJob === job.jobname && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Qo'shimcha ma'lumotlar:</h4>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      {job.work_days && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                          </svg>
                          <span>Ish kunlari: {job.work_days}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                        </svg>
                        <span>Viza turi: {job.visa_type}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span>Aloqa: {job.contact}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle button */}
                <button
                  onClick={() => toggleExpandedJob(job.jobname)}
                  className="mt-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  {expandedJob === job.jobname ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      Yopish
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Batafsil
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Ish topilmadi</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Boshqa qidiruv kalit so'zlari bilan urunib ko'ring</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0 text-sm text-gray-700 dark:text-gray-300">
            Sahifa <span className="font-medium">{currentPage}</span> dan <span className="font-medium">{totalPages}</span> gacha
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              &larr; Oldingi
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Keyingi &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;