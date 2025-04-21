'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Token topilmadi');
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Tasdiqlashda xato');
        }

        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Tasdiqlash muvaffaqiyatsiz tugadi');
        }
      } catch (error: unknown) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi'
        );
        console.error('Verification failed:', error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 max-w-md mx-auto">
        {status === 'loading' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Tasdiqlanmoqda...</h1>
            <p className="text-gray-600">Iltimos, kuting...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Email Tasdiqlandi!</h1>
            <p className="text-gray-600">Email manzilingiz muvaffaqiyatli tasdiqlandi.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Xatolik Yuz Berdi</h1>
            <p className="text-gray-600">
              {errorMessage || 'Email tasdiqlash jarayonida xatolik yuz berdi.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}