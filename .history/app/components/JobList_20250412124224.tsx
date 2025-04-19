"use client";

import { useEffect, useState } from "react";

const JobList = ({ selectedCity }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [query, setQuery] = useState("");

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
    const queryLowerCase = query.toLowerCase();
    const locationMatch = selectedCity ? job.location.toLowerCase().includes(selectedCity.toLowerCase()) : true;

    return (
      locationMatch &&
      ((job.work_type && job.work_type.toLowerCase().includes(queryLowerCase)) ||
      (job.work_days && job.work_days.toLowerCase().includes(queryLowerCase)) ||
      (job.work_hours && job.work_hours.toLowerCase().includes(queryLowerCase)) ||
      (job.salary && job.salary.toLowerCase().includes(queryLowerCase)) ||
      (job.language && job.language.toLowerCase().includes(queryLowerCase)) ||
      (job.visa_type && job.visa_type.toLowerCase().includes(queryLowerCase)) ||
      (job.contact && job.contact.toLowerCase().includes(queryLowerCase)) ||
      (job.location && job.location.toLowerCase().includes(queryLowerCase))
      )
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Ish yoki joy qidiring..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, idx) => (
          <div key={idx} className="border p-4 rounded shadow mb-2">
            <h2 className="text-xl font-semibold">{job.jobname}</h2>
            <p>shahar📍 {job.location}</p>
            <p>turi📝 {job.work_type}</p>
            <p>soati📍 {job.work_hours}</p>
            <p>maosh💵 {job.salary}</p>
            <p>til-bilishi🌐 {job.language}</p>
            <p>viza🛂 {job.visa_type}</p>
            <p>contact📞 {job.contact}</p>
          </div>
        ))
      ) : (
        <p>🔍 E’lonlar topilmadi</p>
      )}
    </div>
  );
};

export default JobList;
