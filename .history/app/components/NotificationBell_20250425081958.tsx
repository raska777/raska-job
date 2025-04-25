


// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('Obuna holatini olishda xato:', err);
//         setError('Obuna holatini yuklab bo‘lmadi');
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user?.id) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Obunani yoqish yoki o‘chirish
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: session.user.id }),
//       });

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       // Agar obuna faollashtirilgan bo‘lsa, email yuboramiz
//       if (data.isSubscribed) {
//         await fetch('/api/post/email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });
//       }
//     } catch (err: any) {
//       console.error('Xatolik:', err);
//       setError('Serverda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div>Tizimga kiring</div>;

//   return (
//     <div>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`notif-btn px-4 py-2 rounded text-white ${
//           isSubscribed ? 'bg-red-600' : 'bg-green-600'
//         }`}
//       >
//         {loading
//           ? 'Yuklanmoqda...'
//           : isSubscribed
//           ? '🔕 Obunani bekor qilish'
//           : '🔔 Obuna bo‘lish'}
//       </button>
//     </div>
//   );
// }









// 'use client';

// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import styles from 'styles/notification.module.css'

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleSubscription = () => {
//     setLoading(true);
//     // Bu yerda faqat UI ni o'zgartirish uchun simulatsiya
//     setTimeout(() => {
//       setIsSubscribed(!isSubscribed);
//       setLoading(false);
//     }, 500);
//   };

//   if (status === 'loading') return null;
//   if (!session) return null;

//   return (
//     <div className={styles.notificationContainer}>
//       <button 
//         className={`${styles.notificationButton} ${showDropdown ? 'active' : ''}`}
//         onClick={() => setShowDropdown(!showDropdown)}
//       >
//         🔔
//       </button>

//       {showDropdown && (
//         <div className={styles.notificationDropdown}>
//           <div className={styles.notificationHeader}>
//             <h3 className={styles.notificationTitle}>Bildirishnomalar</h3>
//             <button 
//               className={styles.notificationClose}
//               onClick={() => setShowDropdown(false)}
//             >
//               ×
//             </button>
//           </div>

//           <div className={styles.notificationContent}>
//             <div className={styles.notificationEmpty}>
//               Bildirishnomalar mavjud emas
//             </div>
//           </div>

//           <button
//             onClick={toggleSubscription}
//             disabled={loading}
//             className={`${styles.subscriptionToggle} ${
//               isSubscribed ? styles.unsubscribe : ''
//             }`}
//           >
//             {loading ? (
//               <>
//                 <span className={styles.loadingSpinner} />
//                 Yuklanmoqda...
//               </>
//             ) : isSubscribed ? (
//               '🔕 Obunani bekor qilish'
//             ) : (
//               '🔔 Obuna boʻlish'
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('Obuna holatini olishda xato:', err);
//         setError(" ");
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user?.id) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Obunani yoqish yoki o‘chirish
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: session.user.id }),
//       });

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       // Agar obuna faollashtirilgan bo‘lsa, email yuboramiz
//       if (data.isSubscribed) {
//         await fetch('/api/post/email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });
//       }
//     } catch (err: any) {
//       console.error('Xatolik:', err);
//       setError('Serverda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div>Tizimga kiring</div>;

//   return (
//     <div>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`notification-btn px-4 py-2 rounded text-white ${
//           isSubscribed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
//         } transition duration-300 ease-in-out transform active:scale-95`}
//       >
//         {loading
//           ? 'Yuklanmoqda...'
//           : isSubscribed
//           ? '🔕 Obunani bekor qilish'
//           : '🔔 Obuna bo‘lish'}
//       </button>
//     </div>
//   );
// }












// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       if (session?.user?.id) {
//         try {
//           const res = await fetch(`/api/user/subscription?userId=${session.user.id}`);
//           const data = await res.json();
//           setIsSubscribed(data.isSubscribed);
//         } catch (err) {
//           console.error('Obuna holatini olishda xatolik:', err);
//           setError('Obuna holatini yuklab bo‘lmadi');
//         }
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user?.id) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: session.user.id }),
//       });

//       if (!res.ok) {
//         throw new Error('Obuna holatini yangilashda xato');
//       }

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       // Agar obuna faollashgan bo‘lsa, email yuborish
//       if (data.isSubscribed) {
//         await fetch('/api/post/email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });
//       }
//     } catch (err: any) {
//       console.error('Xatolik:', err);
//       setError('Serverda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div>Tizimga kiring</div>;

//   return (
//     <div>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`notif-btn px-4 py-2 rounded text-white ${
//           isSubscribed ? 'bg-red-600' : 'bg-green-600'
//         }`}
//       >
//         {loading
//           ? 'Yuklanmoqda...'
//           : isSubscribed
//           ? '🔕 Obunani bekor qilish'
//           : '🔔 Obuna bo‘lish'}
//       </button>
//     </div>
//   );
// }



//-zamonaviy

// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         if (!res.ok) throw new Error('Maʼlumot olinmadi');

//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('Obuna holatini olishda xatolik:', err);
//         setError('Obuna holatini olishda muammo yuz berdi');
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user) return;

//     setLoading(true);
//     setError(null);
//     setSuccessMsg(null);

//     try {
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: session.user.id }),
//       });

//       if (!res.ok) throw new Error('Server xatosi');

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       if (data.isSubscribed) {
//         await fetch('/api/post/email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });
//         setSuccessMsg('Siz muvaffaqiyatli obuna bo‘ldingiz!');
//       } else {
//         setSuccessMsg('Obuna bekor qilindi.');
//       }
//     } catch (err) {
//       console.error('Toggle xatolik:', err);
//       setError('Amal bajarishda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div className="text-sm text-gray-600">Tizimga kiring</div>;

//   return (
//     <div className="flex flex-col items-start gap-2">
//       {error && <div className="text-red-500">{error}</div>}
//       {successMsg && <div className="text-green-600">{successMsg}</div>}

//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white transition duration-300 ease-in-out transform active:scale-95 ${
//           isSubscribed
//             ? 'bg-red-600 hover:bg-red-700'
//             : 'bg-green-600 hover:bg-green-700'
//         }`}
//       >
//         {loading ? (
//           '⏳ Yuklanmoqda...'
//         ) : isSubscribed ? (
//           <>
//             🔕 Obunani bekor qilish
//           </>
//         ) : (
//           <>
//             🔔 Obuna bo‘lish
//           </>
//         )}
//       </button>
//     </div>
//   );
// }



































// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         if (!res.ok) throw new Error('Maʼlumot olinmadi');

//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('Obuna holatini olishda xatolik:', err);
//         setError('Obuna holatini olishda muammo yuz berdi');
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user) return;

//     setLoading(true);
//     setError(null);
//     setSuccessMsg(null);

//     try {
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//       });

//       if (!res.ok) throw new Error('Server xatosi');

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       setSuccessMsg(
//         data.isSubscribed
//           ? 'Siz muvaffaqiyatli obuna bo‘ldingiz!'
//           : 'Obuna bekor qilindi.'
//       );
//     } catch (err) {
//       console.error('Toggle xatolik:', err);
//       setError('Amal bajarishda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div className="text-sm text-gray-600">Tizimga kiring</div>;

//   return (
//     <div className="flex flex-col items-start gap-2">
//       {error && <div className="text-red-500">{error}</div>}
//       {successMsg && <div className="text-green-600">{successMsg}</div>}

//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white transition duration-300 ease-in-out transform active:scale-95 ${
//           isSubscribed
//             ? 'bg-red-600 hover:bg-red-700'
//             : 'bg-green-600 hover:bg-green-700'
//         }`}
//       >
//         {loading ? (
//           '⏳ Yuklanmoqda...'
//         ) : isSubscribed ? (
//           <>🔕 Obunani bekor qilish</>
//         ) : (
//           <>🔔 Obuna bo‘lish</>
//         )}
//       </button>
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const res = await fetch('/api/user/subscription');
        if (!res.ok) throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');

        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      } catch (err) {
        console.error('구독 상태 가져오기 실패:', err);
        setError('구독 상태를 가져오는 중 문제가 발생했습니다.');
      }
    };

    if (session?.user) {
      fetchSubscriptionStatus();
    }
  }, [session]);

  const toggleSubscription = async () => {
    if (!session?.user) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/user/subscription', {
        method: 'PATCH',
      });

      if (!res.ok) throw new Error('서버 오류');

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      setSuccessMsg(
        data.isSubscribed
          ? '구독이 성공적으로 완료되었습니다!'
          : '구독이 취소되었습니다.'
      );
    } catch (err) {
      console.error('구독 토글 오류:', err);
      setError('작업 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <div>로딩 중...</div>;
  if (!session) return <div className="text-sm text-gray-600">로그인해주세요</div>;

  return (
    <div className="flex flex-col items-start gap-2">
      {error && <div className="text-red-500">{error}</div>}
      {successMsg && <div className="text-green-600">{successMsg}</div>}

      <button
        onClick={toggleSubscription}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white transition duration-300 ease-in-out transform active:scale-95 ${
          isSubscribed
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? (
          '⏳ 로딩 중...'
        ) : isSubscribed ? (
          <>🔕 구독 취소</>
        ) : (
          <>🔔 구독하기</>
        )}
      </button>
    </div>
  );
}
