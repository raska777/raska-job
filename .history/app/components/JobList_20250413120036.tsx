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
  const jobsPerPage = 20;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/post');
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          console.error("❌ API error:", res.status);
        }
      } catch (error) {
        console.error("❌ Yuklashda xato:", error);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 Filter qilingan ishlar
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

  // 🧮 Pagination hisoblash
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentJobs.length > 0 ? (
        currentJobs.map((job: Job, idx: number) => (
          <div key={idx} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <h2 className="card h2 text-2xl font-semibold text-gray-900">📝 {job.work_type}</h2>
            <div className="card-grid card:hover text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <p><strong>📍 Shahar:</strong> {job.location}</p>
              <p><strong>⏰ Soat:</strong> {job.work_hours}</p>
              <p><strong>💵 Maosh:</strong> {job.salary}</p>
              <p><strong>🌐 Til:</strong> {job.language}</p>
              <p><strong>🛂 Viza turi:</strong> {job.visa_type}</p>
              <p><strong>📞 Kontakt:</strong> {job.contact}</p>

              {/* Kengaytirilgan ish e'lonini ko'rsatish */}
              {expandedJob === job.jobname ? (
                <div className="mt-4">
                  <p><strong>Yana ko'proq ma'lumot:</strong> {job.work_days}</p>
                  
                  {/* Boshqa kengaytirilgan ma'lumotlar */}
                </div>
              ) : null}
            </div>

            <button 
              onClick={() => toggleExpandedJob(job.jobname)} 
              className="card-button card-button:hover mt-2 text-blue-600 hover:text-blue-800"
            >
              {expandedJob === job.jobname ? 'Kamroq' : 'To‘liq'}
            </button>
          </div>
        ))
      ) : (
        <p className="card p text-center text-gray-600">🔍 E’lonlar topilmadi</p>
      )}

      {/* 📄 Pagination tugmalari */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-lg font-semibold ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-800'
              } transition-all hover:bg-blue-500`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
