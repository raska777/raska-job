'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from "./components/JobList";
import Link from 'next/link';
import Navbar from './components/Navbar';
import NotificationBell from './components/NotificayionBell';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();

  // Loading holati yoki tizimga kirgan foydalanuvchi bo'lmaganida
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Qidiruv va shahar bo'yicha filtrlash
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // API orqali ish e'lonlarini olish
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data); // Boshlanishda barcha ishlar ko'rsatiladi
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filtrlash
    const filtered = jobs.filter(job => {
      const matchesCity = selectedCity ? job.location.includes(selectedCity) : true;
      const matchesSearch = searchQuery ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return matchesCity && matchesSearch;
    });

    setFilteredJobs(filtered);
  }, [selectedCity, searchQuery, jobs]);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <NotificationBell />
      
      {/* Agar foydalanuvchi tizimga kirgan bo'lsa, profil sahifasiga link qo'shish */}
      {session ? (
        <div className="mb-4">
          <Link
            href="/profile"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Mening Profilim
          </Link>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
      <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
      
      {/* Navbar */}
      <Navbar 
        onCitySelect={setSelectedCity}
        onSearch={setSearchQuery}
      />

      {/* Ish qo'shish formasi */}
      <PostJob />

      <br />

      {/* Filtered Jobs */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Qidiruv natijalari</h3>
        <ul className="space-y-4">
          {filteredJobs.length === 0 ? (
            <p>Hech qanday ish e'lonlari topilmadi.</p>
          ) : (
            filteredJobs.map(job => (
              <li key={job._id} className="border p-4 rounded-lg shadow-md">
                <p><strong>Ish turi:</strong> {job.work_type}</p>
                <p><strong>Ish kunlari:</strong> {job.work_days}</p>
                <p><strong>Soatlar:</strong> {job.work_hours}</p>
                <p><strong>Maosh:</strong> {job.salary}</p>
                <p><strong>Shahar:</strong> {job.location}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
