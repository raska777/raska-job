// app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import JobList from '@/components/JobList';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  return (
    <main className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Qidiruv natijalari</h1>
      <JobList selectedCity={location} searchQuery={title} />
    </main>
  );
}
