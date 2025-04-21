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

import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

export default async function VerifyEmail({ searchParams = "" }) {
  const token = searchParams.token;

  if (!token) {
    redirect('/');
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
          <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
        </div>
      );
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { emailVerified: true },
        $unset: { verificationToken: "", verificationExpires: "" },
      }
    );

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-bold text-green-600">Muvaffaqiyatli tasdiqlandi</h2>
        <p className="mt-2">Email manzilingiz muvaffaqiyatli tasdiqlandi.</p>
      </div>
    );
  } catch (error) {
    console.error("Email tasdiqlashda xatolik:", error);
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
        <p className="mt-2">Email tasdiqlash jarayonida xatolik yuz berdi.</p>
      </div>
    );
  }
}