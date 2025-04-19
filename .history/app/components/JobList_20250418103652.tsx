
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
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Ish e'lonlari yuklanmoqda...</p>
      </div>
    );
  }

  // Xato holati
  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 rounded-lg text-red-700">
        <p className="mb-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Qayta urunish
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Natijalar soni */}
      <div className="mb-6 text-gray-600">
        <p>
          {filteredJobs.length} ta ish topildi •{' '}
          <span>
            Sahifa {currentPage}/{totalPages > 0 ? totalPages : 1}
          </span>
        </p>
      </div>

      {/* Ish e'lonlari */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div key={job.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{job.work_type}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  br
                  <span>📍 {job.location}</span>
                </div>

                <ul className="space-y-2 text-sm">
                  <li>🕒 Ish vaqti: {job.work_hours}</li>
                  <li>💰 Maosh: {job.salary}</li>
                  <li>🌐 Til: {job.language}</li>
                </ul>

                {expandedJob === job.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <ul className="space-y-2 text-sm">
                      {job.work_days && <li>📅 Ish kunlari: {job.work_days}</li>}
                      <li>🛂 Viza turi: {job.visa_type}</li>
                      <li>📞 Bog'lanish: {job.contact}</li>
                      {job.posted_date && (
                        <li className="text-xs text-gray-400 mt-2">
                          E'lon qilingan: {new Date(job.posted_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleExpandedJob(job.id)}
                className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 border-t border-gray-100 text-sm"
              >
                {expandedJob === job.id ? 'Kamroq ko\'rsatish' : 'Batafsil ma\'lumot'}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p className="text-lg">🔍 Hech qanday ish topilmadi</p>
            <p className="mt-2">Qidiruv parametrlarini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>

      {/* Paginatsiya */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Oldingi
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
                className={`px-4 py-2 border rounded ${
                  currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : ''
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-4 py-2">...</span>
          )}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600' : ''
              }`}
            >
              {totalPages}
            </button>
          )}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Keyingi
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;