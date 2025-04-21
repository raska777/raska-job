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

'use client'; // Agar interaktivlik kerak bo'lsa

import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { useEffect } from 'react';

export default function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string | string[] };
}) {
  useEffect(() => {
    const verifyToken = async () => {
      const token = Array.isArray(searchParams.token)
        ? searchParams.token[0]
        : searchParams.token;

      if (!token) {
        redirect('/');
        return;
      }

      try {
        const client = await clientPromise;
        const db = client.db('raska');

        const user = await db.collection('users').findOne({
          verificationToken: token,
          verificationExpires: { $gt: new Date() },
        });

        if (!user) {
          // Xato holatini boshqarish
          console.error('Invalid or expired token');
          redirect('/auth/error?code=invalid_token');
          return;
        }

        await db.collection('users').updateOne(
          { _id: user._id },
          {
            $set: { emailVerified: true },
            $unset: { verificationToken: '', verificationExpires: '' },
          }
        );

        // Muvaffaqiyatli tasdiqlash
        redirect('/auth/success?message=email_verified');
      } catch (error) {
        console.error('Verification error:', error);
        redirect('/auth/error?code=verification_failed');
      }
    };

    verifyToken();
  }, [searchParams.token]);

  // Yuklanayotgan holatni ko'rsatish
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Email tasdiqlanmoqda...</h1>
        <p>Iltimos, kuting...</p>
      </div>
    </div>
  );
}