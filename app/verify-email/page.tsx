
// "use client";

// import { Suspense } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// function VerifyEmailContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = searchParams.get('token');

//       if (!token) {
//         setStatus('error');
//         setMessage('Tasdiqlash tokeni topilmadi');
//         router.push('/');
//         return;
//       }

//       try {
//         const response = await fetch('/api/auth/verify-email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ token }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Tasdiqlash jarayonida xatolik');
//         }

//         setStatus('success');
//         setMessage('Email muvaffaqiyatli tasdiqlandi!');
//       } catch (error) {
//         setStatus('error');
//         setMessage(error instanceof Error ? error.message : 'Nomaʼlum xatolik yuz berdi');
//       }
//     };

//     verifyToken();
//   }, [searchParams, router]);

//   if (status === 'loading') {
//     return <LoadingView />;
//   }

//   if (status === 'success') {
//     return <SuccessView message={message} />;
//   }

//   return <ErrorView message={message} />;
// }

// export default function VerifyEmail() {
//   return (
//     <Suspense fallback={<LoadingView />}>
//       <VerifyEmailContent />
//     </Suspense>
//   );
// }

// // Yordamchi komponentlar
// function LoadingView() {
//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
//       <h2 className="text-xl font-bold text-blue-600">Tasdiqlanmoqda...</h2>
//       <p className="mt-2">Iltimos, kuting.</p>
//     </div>
//   );
// }

// function SuccessView({ message }: { message: string }) {
//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
//       <h2 className="text-xl font-bold text-green-600">Muvaffaqiyatli!</h2>
//       <p className="mt-2">{message}</p>
//     </div>
//   );
// }

// function ErrorView({ message }: { message: string }) {
//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//       <h2 className="text-xl font-bold text-red-600">Xatolik!</h2>
//       <p className="mt-2">{message}</p>
//     </div>
//   );
// }

"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('인증 토큰을 찾을 수 없습니다');
        router.push('/');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '이메일 인증 과정에서 오류가 발생했습니다');
        }

        setStatus('success');
        setMessage('이메일이 성공적으로 인증되었습니다!');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  if (status === 'loading') {
    return <LoadingView />;
  }

  if (status === 'success') {
    return <SuccessView message={message} />;
  }

  return <ErrorView message={message} />;
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingView />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

// 보조 컴포넌트 (Yordamchi komponentlar)
function LoadingView() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-bold text-blue-600">인증 중...</h2>
      <p className="mt-2">잠시만 기다려 주세요.</p>
    </div>
  );
}

function SuccessView({ message }: { message: string }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
      <h2 className="text-xl font-bold text-green-600">성공!</h2>
      <p className="mt-2">{message}</p>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
      <h2 className="text-xl font-bold text-red-600">오류!</h2>
      <p className="mt-2">{message}</p>
    </div>
  );
}