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

import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

// Properly define the searchParams type in the page props
interface VerifyEmailProps {
  searchParams: { token?: string };
}

export default async function VerifyEmail({ searchParams }: VerifyEmailProps) {
  // Redirect if token is not provided
  if (!searchParams.token) {
    redirect('/');
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    // Check if the token is valid
    const user = await db.collection("users").findOne({
      verificationToken: searchParams.token,
      verificationExpires: { $gt: new Date() },
    });

    // If no valid user found
    if (!user) {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
          <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
        </div>
      );
    }

    // Confirm email by updating the user document
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
