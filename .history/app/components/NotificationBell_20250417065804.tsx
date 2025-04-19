// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Sessiya ma'lumotlaridan foydalanuvchi obuna holatini olish
//   useEffect(() => {
//     if (session) {
//       fetch(`/api/user/subscription?email=${session.user.email}`)
//         .then((res) => res.json())
//         .then((data) => setIsSubscribed(data.isSubscribed))
//         .catch((err) => console.error('Obuna holatini olishda xatolik', err));
//     }
//   }, [session]);

//   // Obunani o'zgartirish
//   const toggleSubscription = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: session?.user?.email,
//           subscribe: !isSubscribed,
//         }),
//       });

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       // Agar obuna bo'lsa, email yuborish
//       if (data.isSubscribed) {
//         await fetch('/api/user/subscription', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: session?.user?.email,
//             subject: 'Obunaga qo‘shildingiz',
//             text: 'Siz yangi e’lonlardan xabardor bo‘lish uchun obuna bo‘ldingiz!',
//           }),
//         });
//       }
//     } catch (error) {
//       console.error('Obuna holatini yangilashda xatolik:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <p>Yuklanmoqda...</p>;
//   if (!session) return <p>Tizimga kirmagansiz</p>;

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`p-2 focus:outline-none ${
//           isSubscribed ? 'bg-red-600' : 'bg-green-600'
//         }`}
//       >
//         {loading ? 'Yuklanmoqda...' : isSubscribed ? '🔕 Obunani bekor qilish' : '🔔 Obuna bo‘lish'}
//       </button>
//     </div>
//   );
// }
//
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        if (session?.user?.email) {
          const res = await fetch('/api/user/subscription');
          const data = await res.json();
          setIsSubscribed(data.isSubscribed);
        }
      } catch (err) {
        console.error('Obuna holatini olishda xato:', err);
        setError('Obuna holatini yuklab bo‘lmadi');
      }
    };

    fetchSubscriptionStatus();
  }, [session]);

  const toggleSubscription = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obuna holatini yangilash
      const res = await fetch('/api/user/subscription', {
        method: 'PATCH',
      });
      
      if (!res.ok) {
        throw new Error('Obunani yangilash muvaffaqiyatsiz tugadi');
      }

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      // Agar obuna bo'lsa, tasdiqlovchi email yuborish
      if (data.isSubscribed && session?.user?.email) {
        await fetch('/api/post/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: session.user.email,
            subject: 'Raska: Obunangiz faollashtirildi',
            text: `Hurmatli foydalanuvchi,\n\nSiz Raska platformasida yangi ish e'lonlariga obuna bo'ldingiz.\n\nHurmat bilan,\nRaska jamoasi`
          }),
        });
      }
    } catch (err: any) {
      console.error('Obunani yangilashda xato:', err);
      setError(err.message || 'Obunani yangilashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="p-2">Yuklanmoqda...</div>;
  }

  if (!session) {
    return <div className="p-2 text-gray-500">Tizimga kiring</div>;
  }

  return (
    <div className="relative">
      {error && (
        <div className="mb-2 text-red-500 text-sm">{error}</div>
      )}
      <button
        onClick={toggleSubscription}
        disabled={loading}
        className={`p-2 rounded-md focus:outline-none ${
          isSubscribed 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {loading ? (
          'Yuklanmoqda...'
        ) : isSubscribed ? (
          '🔕 Obunani bekor qilish'
        ) : (
          '🔔 Obuna bo‘lish'
        )}
      </button>
    </div>
  );
}