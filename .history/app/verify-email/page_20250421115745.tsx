// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';

// export default async function VerifyEmail({ searchParams }: { searchParams: { token?: string } }) {
//   if (!searchParams.token) {
//     redirect('/');
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Tokenni tekshirish
//     const user = await db.collection("users").findOne({
//       verificationToken: searchParams.token,
//       verificationExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//           <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
//         </div>
//       );
//     }

//     // Emailni tasdiqlash
//     await db.collection("users").updateOne(
//       { _id: user._id },
//       { 
//         $set: { emailVerified: true },
//         $unset: { verificationToken: "", verificationExpires: "" }
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

// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';

// export default async function VerifyEmail({ searchParams }: { searchParams: { token?: string } }) {
//   // Redirect if token is not provided
//   if (!searchParams.token) {
//     redirect('/');
//     return;
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Check if the token is valid
//     const user = await db.collection("users").findOne({
//       verificationToken: searchParams.token,
//       verificationExpires: { $gt: new Date() },
//     });

//     // If no valid user found
//     if (!user) {
//       return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//           <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
//         </div>
//       );
//     }

//     // Confirm email by updating the user document
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

// // ✅ server component — bu holatda .tsx faylda 'use client' YO‘Q!
// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';

// export default async function VerifyEmail({ searchParams }: { searchParams: { token?: string } }) {
//   const token = searchParams.token;

//   if (!token) {
//     redirect('/');
//     return;
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const user = await db.collection("users").findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: new Date() },
//     });

//     if (!user) {
//       return <div>Email token yaroqsiz yoki muddati tugagan</div>;
//     }

//     await db.collection("users").updateOne(
//       { _id: user._id },
//       {
//         $set: { emailVerified: true },
//         $unset: { verificationToken: "", verificationExpires: "" },
//       }
//     );

//     return <div>Email muvaffaqiyatli tasdiqlandi</div>;
//   } catch (error) {
//     console.error("Error:", error);
//     return <div>Serverda xatolik yuz berdi</div>;
//   }
// }

// app/verify-email/page.tsx
// 'use server'; // Yoki bu faylni server component qilib belgilang

// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';

// export default async function VerifyEmail({
//   searchParams,
// }: {
//   searchParams: { token?: string | string[] };
// }) {
//   const token = Array.isArray(searchParams.token)
//     ? searchParams.token[0]
//     : searchParams.token;

//   if (!token) {
//     redirect('/auth/error?code=missing_token');
//     return null;
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: new Date() },
//     });

//     if (!user) {
//       redirect('/auth/error?code=invalid_token');
//       return null;
//     }

//     await db.collection('users').updateOne(
//       { _id: user._id },
//       {
//         $set: { emailVerified: new Date() }, // Sana bilan belgilash yaxshiroq
//         $unset: { verificationToken: '', verificationExpires: '' },
//       }
//     );

//     redirect('/auth/success?message=email_verified');
//     return null;
//   } catch (error) {
//     console.error('Verification error:', error);
//     redirect('/auth/error?code=server_error');
//     return null;
//   }
// }

// app/verify-email/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();
        
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
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
            <p className="text-gray-600">Email tasdiqlash jarayonida xatolik yuz berdi.</p>
          </>
        )}
      </div>
    </div>
  );
}