'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from "./components/JobList";
import Link from 'next/link';
import Navbar from './components/Navbar';
import NotificationBell from './components/NotificayionBell';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Loading holati yoki tizimga kirgan foydalanuvchi bo'lmaganida
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

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

      {/* Navbar komponentasini qo'shamiz */}
      <Navbar onSearch={handleSearch} onCitySelect={handleCitySelect} />

      {/* Ish qo'shish formasi */}
      <PostJob />

      <br />

      {/* JobList komponentasini searchQuery va selectedCity bilan yuboramiz */}
      <JobList searchQuery={searchQuery} selectedCity={selectedCity} />
    </main>
  );
}
