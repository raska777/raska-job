// 'use client';
// import { useState, useEffect } from 'react';

// export default function NotificationToggle() {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Boshlanishida foydalanuvchi holatini olish
//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       const res = await fetch('/api/user/subscription');
//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);
//       setLoading(false);
//     };
//     fetchSubscriptionStatus();
//   }, []);

//   const toggleSubscription = async () => {
//     setLoading(true);
//     const res = await fetch('/api/user/subscription', {
//       method: 'PATCH',
//     });
//     const data = await res.json();
//     setIsSubscribed(data.isSubscribed);
//     setLoading(false);
//   };

//   return (
//     <button
//       onClick={toggleSubscription}
//       disabled={loading}
//       className={`px-4 py-2 rounded ${
//         isSubscribed ? 'bg-red-600' : 'bg-green-600'
//       } text-white`}
//     >
//       {loading ? 'Yuklanmoqda...' : isSubscribed ? '🔕 Obunani bekor qilish' : '🔔 Obuna bo‘lish'}
//     </button>
//   );
// }
