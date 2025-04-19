'use client';

import { useSession } from 'next-auth/react';
import PostJob from "@/app/components/PostJob";
import JobList from "./components/JobList";
import NotificationBell from './components/NotificayionBell';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <NotificationBell />
      
      {!session && (
        <div className="mb-4">
          <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
      <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>

      <PostJob />
      <br />
      <JobList />
    </main>
  );
}
