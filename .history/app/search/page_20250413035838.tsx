'use client';

import { useSearchParams } from 'next/navigation';
import JobList from '../components/JobList';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Qidiruv natijalari</h1>
      <JobList searchQuery={title} selectedCity={location} />
    </main>
  );
}
