// app/verify-email/VerificationStatus.tsx
'use client';

export default function VerificationStatus({ success }: { success: boolean }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 max-w-md mx-auto">
        {success ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Email Tasdiqlandi!</h1>
            <p className="text-gray-600">Email manzilingiz muvaffaqiyatli tasdiqlandi.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Xatolik Yuz Berdi</h1>
            <p className="text-gray-600">Email tasdiqlash jarayonida xatolik yuz berdi.</p>
          </>
        )}
      </div>
    </div>
  );
}