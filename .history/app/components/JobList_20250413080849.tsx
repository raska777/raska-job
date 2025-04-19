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
