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
//   toggleExpandedJob: (jobId: string) => void;
//   expandedJob: string | null;
//   showSearch?: boolean; // Qo'shimcha ixtiyoriy prop
// }

// const JobList = ({ selectedCity, searchQuery, toggleExpandedJob, expandedJob }: JobListProps) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 12;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/post');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data);
//         }
//       } catch (error) {
//         console.error("Error loading jobs:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Filter jobs
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

//   // Pagination
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <div className="job-list-container">
//       {/* Job count */}
//       <div className="job-count">
//         {filteredJobs.length} jobs found
//       </div>

//       {/* Jobs grid */}
//       <div className="jobs-grid">
//         {currentJobs.length > 0 ? (
//           currentJobs.map((job: Job, idx: number) => (
//             <div key={idx} className="job-card">
//               {/* Job header */}
//               <div className="job-header">
//                 <h3 className="job-title">{job.jobname}</h3>
//                 <span className="job-type">{job.work_type}</span>
//               </div>

//               {/* Job details */}
//               <div className="job-details">
//                 <p className="detail-item">
//                   <span className="detail-label">Location:</span> 
//                   <span className="detail-value">{job.location}</span>
//                 </p>
//                 <p className="detail-item">
//                   <span className="detail-label">Hours:</span> 
//                   <span className="detail-value">{job.work_hours}</span>
//                 </p>
//                 <p className="detail-item">
//                   <span className="detail-label">Salary:</span> 
//                   <span className="detail-value">{job.salary}</span>
//                 </p>
//                 <p className="detail-item">
//                   <span className="detail-label">Language:</span> 
//                   <span className="detail-value">{job.language}</span>
//                 </p>

//                 {/* Expanded content */}
//                 {expandedJob === job.jobname && (
//                   <div className="expanded-content">
//                     {job.work_days && (
//                       <p className="detail-item">
//                         <span className="detail-label">Work Days:</span> 
//                         <span className="detail-value">{job.work_days}</span>
//                       </p>
//                     )}
//                     <p className="detail-item">
//                       <span className="detail-label">Visa Type:</span> 
//                       <span className="detail-value">{job.visa_type}</span>
//                     </p>
//                     <p className="detail-item">
//                       <span className="detail-label">Contact:</span> 
//                       <span className="detail-value">{job.contact}</span>
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Toggle button */}
//               <button
//                 onClick={() => toggleExpandedJob(job.jobname)}
//                 className="toggle-button"
//               >
//                 {expandedJob === job.jobname ? 'Show Less' : 'Show More'}
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="no-jobs">
//             No jobs found
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="pagination-button"
//           >
//             Previous
//           </button>
          
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`pagination-page ${currentPage === i + 1 ? 'active' : ''}`}
//             >
//               {i + 1}
//             </button>
//           ))}
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="pagination-button"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;


//----------7--------------------

'use client';

import { useEffect, useState } from 'react';
import "styles/global.css";

interface Job {
  id: string; // Yangi qo'shilgan unique identifikator
  jobname: string;
  location: string;
  work_type: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  work_days?: string;
  posted_date?: string; // Yangi maydon
}

interface JobListProps {
  selectedCity: string;
  searchQuery: string;
  toggleExpandedJob: (jobId: string) => void;
  expandedJob: string | null;
  showSearch?: boolean;
}

const JobList = ({ 
  selectedCity, 
  searchQuery, 
  toggleExpandedJob, 
  expandedJob 
}: JobListProps) => {
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
        // API dan kelgan ma'lumotlarni tekshirish
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
          posted_date: job.posted_date || new Date().toISOString()
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
          {
          return key !== 'id' &&
            typeof value === 'string' &&
            value.toLowerCase().includes(query);
        }
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Ish e'lonlari yuklanmoqda...</p>
      </div>
    );
  }

  // Xato holati
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Qayta urunish
        </button>
      </div>
    );
  }

  return (
    <div className="job-list-container">
      {/* Natijalar soni */}
      <div className="results-summary">
        <p>
          {filteredJobs.length} ta ish topildi •{' '}
          <span>
            Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
          </span>
        </p>
      </div>

      {/* Ish e'lonlari */}
      <div className="jobs-grid">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <article key={job.id} className="job-card">
              <header className="job-header">
                <h3 className="job-title">{job.jobname}</h3>
                <div className="job-meta">
                  <span className="job-location">
                    <LocationIcon /> {job.location}
                  </span>
                  <span className="job-type">{job.work_type}</span>
                </div>
              </header>

              <div className="job-body">
                <ul className="job-details">
                  <li>
                    <ClockIcon /> Ish vaqti: {job.work_hours}
                  </li>
                  <li>
                    <MoneyIcon /> Maosh: {job.salary}
                  </li>
                  <li>
                    <LanguageIcon /> Til: {job.language}
                  </li>
                </ul>

                {expandedJob === job.id && (
                  <div className="job-expanded">
                    <ul>
                      <li>
                        <CalendarIcon /> Ish kunlari: {job.work_days || 'Noma\'lum'}
                      </li>
                      <li>
                        <VisaIcon /> Viza turi: {job.visa_type}
                      </li>
                      <li>
                        <ContactIcon /> Bog'lanish: {job.contact}
                      </li>
                      {job.posted_date && (
                        <li className="post-date">
                          <TimeIcon /> E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <footer className="job-footer">
                <button
                  onClick={() => toggleExpandedJob(job.id)}
                  className="toggle-details-button"
                  aria-expanded={expandedJob === job.id}
                >
                  {expandedJob === job.id ? (
                    <>
                      <ChevronUpIcon /> Kamroq ko'rsatish
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon /> Batafsil ma'lumot
                    </>
                  )}
                </button>
              </footer>
            </article>
          ))
        ) : (
          <div className="no-results">
            <SearchOffIcon />
            <p>Hech qanday ish topilmadi</p>
            <p>Qidiruv parametrlarini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>

      {/* Paginatsiya */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button prev"
          >
            <ArrowLeftIcon /> Oldingi
          </button>
          
          <div className="page-numbers">
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
                  className={`page-button ${currentPage === pageNum ? 'active' : ''}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="page-ellipsis">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
              >
                {totalPages}
              </button>
            )}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button next"
          >
            Keyingi <ArrowRightIcon />
          </button>
        </nav>
      )}
    </div>
  );
};

// Ikonlar uchun komponentlar (ishlatilgan icon kutubxonasiga qarab o'zgartirishingiz mumkin)
const LocationIcon = () => <span>📍</span>;
const ClockIcon = () => <span>⏰</span>;
const MoneyIcon = () => <span>💵</span>;
const LanguageIcon = () => <span>🌐</span>;
const CalendarIcon = () => <span>📅</span>;
const VisaIcon = () => <span>🛂</span>;
const ContactIcon = () => <span>📞</span>;
const TimeIcon = () => <span>⏳</span>;
const ChevronDownIcon = () => <span>⬇️</span>;
const ChevronUpIcon = () => <span>⬆️</span>;
const SearchOffIcon = () => <span>🔍</span>;
const ArrowLeftIcon = () => <span>◀</span>;
const ArrowRightIcon = () => <span>▶</span>;

export default JobList;