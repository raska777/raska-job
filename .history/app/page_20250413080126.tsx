// 'use client';

// import { useSession } from 'next-auth/react';
// import PostJob from "@/app/components/PostJob";
// import JobList from './components/JobList';
// import NotificationBell from './components/NotificayionBell';
// import { useSearchParams } from 'next/navigation';





// export default function Home() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();

//   const title = searchParams.get('title') || '';
//   const location = searchParams.get('location') || '';
  
//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="p-4 max-w-2xl mx-auto">
//       <NotificationBell />
      
//       {!session && (
//         <div className="mb-4">
//           <p className="text-gray-600">⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.</p>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
//       <p className="mb-6 text-gray-600">Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.</p>
//       <div>
//       {title || location ? (
//         <h1 className="text-xl font-bold mb-4">
//           🔍 “{title}” uchun {location ? location + 'da' : 'barcha shaharlarda'} qidiruv natijalari:
//         </h1>
//       ) : (
//         <h1 className="text-2xl font-bold mb-4">🧾 Barcha ish e’lonlari</h1>
//       )}
//       </div>
//       <PostJob />
//       <br />
//       <JobList selectedCity={''} searchQuery={''}/>
//     </main>
//   );
// }

'use client';

import { useSession } from 'next-auth/react';
import NotificationBell from './components/NotificayionBell';
import PostJob from './components/PostJob';
import JobList from './components/JobList';
import { useSearchParams, useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL parametrlaridan qidiruv so'zi va shaharni olish
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';

  // Agar foydalanuvchi qidiruv blokidan chiqib ketmoqchi bo'lsa (orqaga tugmasi),
  // URL parametrlarini olib tashlash uchun bu funktsiya ishlatiladi.
  const clearSearch = () => {
    router.push('/');
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <NotificationBell />

      {!session && (
        <div className="mb-4">
          <p className="text-gray-600">
            ⛔ Siz tizimga kirmagansiz. Iltimos, tizimga kiring.
          </p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">🛠 RaskaJob Ish e’lonlari</h1>
      <p className="mb-6 text-gray-600">
        Koreyadagi arbayt ishlarni shu yerda toping yoki joylang.
      </p>

      {/* Qidiruv parametrlar mavjud bo'lsa, qidiruv natijalari blokini ko'rsatamiz */}
      {(title || location) ? (
        <section className="mb-8 p-4 bg-blue-50 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              🔍 Qidiruv natijalari: {title && `"${title}"`} {location && `- ${location}`}
            </h2>
            <button
              onClick={clearSearch}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Orqaga
            </button>
          </div>
          <JobList selectedCity={location} searchQuery={title} />
        </section>
      ) : (
        <>
          {/* Agar qidiruv parametrlari bo'lmasa, odatiy kontent */}
          <PostJob />
          <br />
          <JobList selectedCity={''} searchQuery={''} />
        </>
      )}
    </main>
  );
}

