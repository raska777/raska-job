// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';
// import { useSearchParams } from 'next/navigation';

// export default async function VerifyEmail() {
//   const searchParams = useSearchParams(); // Query parametrlarini olish

//   // token ni querydan olish
//   const token = searchParams.get('token');

//   // Agar token bo'lmasa, redirect qilish
//   if (!token) {
//     redirect('/');
//     return;
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Tokenni tekshirish
//     const user = await db.collection("users").findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: new Date() },
//     });

//     // Agar foydalanuvchi topilmasa
//     if (!user) {
//       return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//           <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
//         </div>
//       );
//     }

//     // Emailni tasdiqlash va yangilash
//     await db.collection("users").updateOne(
//       { _id: user._id },
//       {
//         $set: { emailVerified: true },
//         $unset: { verificationToken: "", verificationExpires: "" },
//       }
//     );

//     return (
//       <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
//         <h2 className="text-xl font-bold text-green-600">Muvaffaqiyatli tasdiqlandi</h2>
//         <p className="mt-2">Email manzilingiz muvaffaqiyatli tasdiqlandi.</p>
//       </div>
//     );
//   } catch (error) {
//     console.error("Email tasdiqlashda xatolik:", error);
//     return (
//       <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//         <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//         <p className="mt-2">Email tasdiqlash jarayonida xatolik yuz berdi.</p>
//       </div>
//     );
//   }
// }


"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Tasdiqlash havolasi yaroqsiz');
      router.push('/');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Email muvaffaqiyatli tasdiqlandi!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Tasdiqlash jarayonida xatolik yuz berdi');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Server xatosi yuz berdi');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold text-blue-600">Tasdiqlanmoqda...</h2>
        <p className="mt-2">Iltimos, kuting.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-bold text-green-600">Muvaffaqiyatli tasdiqlandi</h2>
        <p className="mt-2">{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
      <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
      <p className="mt-2">{message}</p>
    </div>
  );
}