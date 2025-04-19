'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import JobList from '../components/JobList';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  const router = useRouter();

  return (
    <main className="p-4 max-w-2xl mx-auto">
      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => router.back()}
        className="mb-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        Orqaga
      </button>
      
      <h1 className="text-2xl font-bold mb-4">🔍 Qidiruv natijalari</h1>
      <JobList selectedCity={location} searchQuery={title} />
    </main>
  );
}
