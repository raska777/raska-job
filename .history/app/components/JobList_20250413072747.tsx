import { useEffect, useState } from 'react';

interface Job {
  jobname: string;
  location: string;
  work_type: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  work_days?: string; // work_days ni qo'shdik
}

interface JobListProps {
  selectedCity: string;
  searchQuery: string;
}

const JobList = ({ selectedCity, searchQuery }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("❌ Yuklashda xato:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const queryLowerCase = searchQuery.toLowerCase();
    const locationMatch = selectedCity
      ? job.location.toLowerCase().includes(selectedCity.toLowerCase())
      : true;

    // Qidiruvni va shaharni tekshirish
    return (
      locationMatch &&
      (
        job.jobname.toLowerCase().includes(queryLowerCase) ||
        job.location.toLowerCase().includes(queryLowerCase) ||
        job.work_type.toLowerCase().includes(queryLowerCase) ||
        job.work_hours.toLowerCase().includes(queryLowerCase) ||
        job.salary.toLowerCase().includes(queryLowerCase) ||
        job.language.toLowerCase().includes(queryLowerCase) ||
        job.visa_type.toLowerCase().includes(queryLowerCase) ||
        job.contact.toLowerCase().includes(queryLowerCase)
      )
    );
  });

  return (
    <div>
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job: Job, idx: number) => (
          <div key={idx} className="border p-4 rounded shadow mb-2">
            <h2 className="text-xl font-semibold">{job.jobname}</h2>
            <p>Shahar📍 {job.location}</p>
            <p>Turi📝 {job.work_type}</p>
            <p>Soati📍 {job.work_hours}</p>
            <p>Maosh💵 {job.salary}</p>
            <p>Til-bilishi🌐 {job.language}</p>
            <p>Viza🛂 {job.visa_type}</p>
            <p>Kontakt📞 {job.contact}</p>
          </div>
        ))
      ) : (
        <p>🔍 E’lonlar topilmadi</p>
      )}
    </div>
  );
};

export default JobList;
