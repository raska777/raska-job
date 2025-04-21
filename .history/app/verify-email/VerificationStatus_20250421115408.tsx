// app/verify-email/VerificationStatus.tsx
'use client';

interface VerificationStatusProps {
  success: boolean;
  isLoading?: boolean;
}

export default function VerificationStatus({ 
  success, 
  isLoading = false 
}: VerificationStatusProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 animate-pulse">Tasdiqlanmoqda...</h1>
          <p className="text-gray-600">Iltimos, biroz kuting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 max-w-md mx-auto">
        {success ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Email Tasdiqlandi!</h1>
            <p className="text-gray-600">
              Email manzilingiz muvaffaqiyatli tasdiqlandi. Endi tizimga kirishingiz mumkin.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Xatolik Yuz Berdi</h1>
            <p className="text-gray-600">
              Email tasdiqlash jarayonida xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki
              texnik yordamga murojaat qiling.
            </p>
          </>
        )}
      </div>
    </div>
  );
}