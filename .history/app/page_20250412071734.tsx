'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from "./components/JobList";
import Link from 'next/link';
import Navbar from './components/Navbar';
import NotificationBell from './components/NotificayionBell';
export default function Home() {
  const { data: session, status } = useSession();

  // Loading holati yoki tizimga kirgan foydalanuvchi bo'lmaganida
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <NotificationBell/>
      
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
      <Navbar />

      {/* Ish qo'shish formasi */}
      <PostJob />
      
      <br />
      
      {/* Ish e’lonlarini ro‘yxatini chiqarish */}
      <JobList />
    </main>
  );
}
