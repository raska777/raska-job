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

// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';

// export default async function VerifyEmail({ searchParams }) {
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
//       return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//           <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
//         </div>
//       );
//     }

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

// import { redirect } from 'next/navigation';
// import clientPromise from '@/lib/mongodb';
// import { WithId, Document } from 'mongodb';

// // 1. To'g'ri PageProps tipini aniqlaymiz
// interface PageProps {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// // 2. User tipi
// interface User extends WithId<Document> {
//   verificationToken?: string;
//   verificationExpires?: Date;
//   emailVerified?: boolean;
// }

// export default async function VerifyEmail({ searchParams }: PageProps) {
//   // 3. Tokenni to'g'ri olish
//   const token = Array.isArray(searchParams.token)
//     ? searchParams.token[0]
//     : searchParams.token;

//   if (!token) {
//     redirect('/');
//     return null;
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // 4. Typelarni to'g'ri qo'llash
//     const user = await db.collection<User>("users").findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: new Date() },
//     });

//     if (!user) {
//       return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600">Xatolik</h2>
//           <p className="mt-2">Tasdiqlash havolasi yaroqsiz yoki muddati tugagan.</p>
//         </div>
//       );
//     }

//     await db.collection<User>("users").updateOne(
//       { _id: user._id },
//       {
//         $set: { 
//           emailVerified: true,
//           updatedAt: new Date() 
//         },
//         $unset: { 
//           verificationToken: "",
//           verificationExpires: "" 
//         },
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

// "use client"; // Client komponent uchun

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function VerifyEmail() {
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
async (params:type) => {
    
    "use client"; // Ushbu satrni saqlab qoling
    
    import { useSearchParams, useRouter } from 'next/navigation';
    import { useEffect, useState } from 'react';
    
    export default function VerifyEmail() {
      const router = useRouter();
      const searchParams = useSearchParams();
      const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
      const [message, setMessage] = useState('');
    
      useEffect(() => {
        const verifyToken = async () => {
          const token = searchParams.get('token');
    
          if (!token) {
            setStatus('error');
            setMessage('Tasdiqlash tokeni topilmadi');
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
              throw new Error(data.message || 'Tasdiqlash jarayonida xatolik');
            }
    
            // Agar muvaffaqiyatli bo'lsa, foydalanuvchini boshqa sahifaga yo'naltirish yaxshiroq bo'lishi mumkin
            setStatus('success');
            setMessage('Email muvaffaqiyatli tasdiqlandi!');
            // router.push('/dashboard'); // Misol uchun
          } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Nomaʼlum xatolik yuz berdi');
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
    
    // Yordamchi komponentlar (o'zgarishsiz qolishi mumkin)
    function LoadingView() {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold text-blue-600">Tasdiqlanmoqda...</h2>
          <p className="mt-2">Iltimos, kuting.</p>
        </div>
      );
    }
    
    function SuccessView({ message }: { message: string }) {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
          <h2 className="text-xl font-bold text-green-600">Muvaffaqiyatli!</h2>
          <p className="mt-2">{message}</p>
        </div>
      );
    }
    
    function ErrorView({ message }: { message: string }) {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600">Xatolik!</h2>
          <p className="mt-2">{message}</p>
        </div>
      );
    }
}