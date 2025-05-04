// app/redirect-after-google/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RedirectAfterGoogle() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user?.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  }, [session, status, router]);

  return <p>🔄 Kirishdan so'ng yo‘naltirilmoqda...</p>;
}
