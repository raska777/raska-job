

// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import styles from 'styles/settingform.module.css';

// export default function SettingsForm() {
//   const { data: session, status } = useSession();
//   const [editMode, setEditMode] = useState(false);
//   const [isGoogleUser, setIsGoogleUser] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [emailVerificationSent, setEmailVerificationSent] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     isSubscribed: false,
//     isEmailVerified: false,
//     createdAt: '',
//   });

//   // Foydalanuvchi ma'lumotlarini yuklash
//   useEffect(() => {
//     if (session?.user) {
//       setLoading(true);
      
//       fetch('/api/user-info')
//         .then(async (res) => {
//           if (!res.ok) throw new Error('Failed to fetch user info');
//           return await res.json();
//         })
//         .then((data) => {
//           setIsGoogleUser(data.provider === 'google');
          
//           setFormData({
//             name: data.name || session.user.name || '',
//             email: session.user.email || '',
//             password: '',
//             isSubscribed: data.isSubscribed || false,
//             isEmailVerified: data.isEmailVerified || false,
//             createdAt: data.createdAt || '',
//           });
//         })
//         .catch((err) => {
//           console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err);
//           // Fallback to session data
//           setFormData({
//             name: session.user.name || '',
//             email: session.user.email || '',
//             password: '',
//             isSubscribed: false,
//             isEmailVerified: false,
//             createdAt: '',
//           });
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [session]);

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch('/api/settings', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           ...(!isGoogleUser && { password: formData.password }),
//           isSubscribed: formData.isSubscribed,
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert('✅ Sozlamalar yangilandi');
//         setEditMode(false);
//         // Yangilangan ma'lumotlarni qayta yuklash
//         window.location.reload();
//       } else {
//         alert('❌ Xatolik: ' + (result.error || 'Noma\'lum xatolik'));
//       }
//     } catch (error) {
//       console.error("Sozlamalarni saqlashda xatolik:", error);
//       alert("⚠️ Sozlamalarni saqlab bo'lmadi");
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       const res = await fetch('/api/auth/verify-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (res.ok) {
//         setEmailVerificationSent(true);
//         alert('✅ Tasdiqlash havolasi emailingizga yuborildi');
//       } else {
//         const error = await res.json();
//         alert('❌ Xatolik: ' + (error.message || 'Email yuborib bo‘lmadi'));
//       }
//     } catch (error) {
//       console.error("Email tasdiqlash so'rovida xatolik:", error);
//       alert("⚠️ Email tasdiqlash so'rovini yuborib bo'lmadi");
//     }
//   };

//   if (status === 'loading' || loading) return <p className="text-center py-8">⏳ Yuklanmoqda...</p>;
//   if (!session) return <p className="text-center py-8">⛔ Tizimga kirmagansiz</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Sozlamalar</h2>

//       {/* Meta ma'lumotlar */}
//       <div className={styles.metaInfo}>
//         <p>
//           <strong>Ro‘yxatdan o‘tgan sana:</strong>{' '}
//           {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum'}
//         </p>

//         <p>
//           <strong>Email holati:</strong>{' '}
//           {formData.isEmailVerified ? (
//             <span className={styles.verified}>✅ Tasdiqlangan</span>
//           ) : (
//             <>
//               <span className={styles.notVerified}>❌ Tasdiqlanmagan</span>
//               {!emailVerificationSent && (
//                 <button className={styles.verifyBtn} onClick={handleVerifyEmail}>
//                   Emailni tasdiqlash
//                 </button>
//               )}
//               {emailVerificationSent && (
//                 <span className={styles.sentText}>Tasdiqlash havolasi yuborildi</span>
//               )}
//             </>
//           )}
//         </p>
//       </div>

//       {/* Ism */}
//       <div className={styles.inputGroup}>
//         <label className={styles.label}>Ism</label>
//         <input
//           type="text"
//           className={styles.input}
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           disabled={!editMode}
//         />
//       </div>

//       {/* Email */}
//       <div className={styles.inputGroup}>
//         <label className={styles.label}>Email</label>
//         <input
//           type="email"
//           className={styles.readonlyInput}
//           value={formData.email}
//           readOnly
//         />
//         {isGoogleUser && (
//           <p className={styles.hintText}>Google hisobi orqali ulanilgan</p>
//         )}
//       </div>

//       {/* Parol */}
//       {!isGoogleUser && (
//         <div className={styles.inputGroup}>
//           <label className={styles.label}>Yangi parol</label>
//           <input
//             type="password"
//             className={styles.input}
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             disabled={!editMode}
//             placeholder={editMode ? "O'zgartirmaslik uchun bo'sh qoldiring" : ""}
//           />
//           {editMode && (
//             <p className={styles.hintText}>Parolni o'zgartirmaslik uchun maydonni bo'sh qoldiring</p>
//           )}
//         </div>
//       )}

//       {/* Obuna holati */}
//       <div className={styles.checkboxGroup}>
//         <label className={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={formData.isSubscribed}
//             onChange={(e) => setFormData({ ...formData, isSubscribed: e.target.checked })}
//             disabled={!editMode}
//             className={styles.checkbox}
//           />
//           Yangiliklar va xabarnomalarga obuna bo'lish
//         </label>
//       </div>

//       {/* Harakat tugmalari */}
//       <div className={styles.actions}>
//         {!editMode ? (
//           <button className={styles.editBtn} onClick={() => setEditMode(true)}>
//             Tahrirlash
//           </button>
//         ) : (
//           <>
//             <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>
//               Bekor qilish
//             </button>
//             <button className={styles.saveBtn} onClick={handleUpdate}>
//               Saqlash
//             </button>
//           </>
//         )}
//       </div>
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

  useEffect(() => {
    if (error || successMsg) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMsg]);

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

  if (status === 'loading') return <div className="animate-pulse">로딩 중...</div>;
  if (!session) return (
    <div className="text-sm text-gray-500 italic">
      구독 기능을 이용하려면 로그인해주세요
    </div>
  );

  return (
    <div className="relative">
      <div className="absolute -top-8 left-0 right-0 flex justify-center">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
            {successMsg}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={toggleSubscription}
          disabled={loading}
          className={`relative flex items-center gap-2 px-6 py-3 rounded-full shadow-lg text-white font-medium transition-all duration-300 ease-in-out hover:shadow-md active:scale-95 ${
            isSubscribed
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>처리 중...</span>
            </>
          ) : isSubscribed ? (
            <>
              <span>🔕</span>
              <span>구독 취소</span>
            </>
          ) : (
            <>
              <span>🔔</span>
              <span>구독하기</span>
            </>
          )}
        </button>

        {!isSubscribed && (
          <p className="text-xs text-gray-500 text-center max-w-xs animate-fade-in">
            새로운 일자리 공고를 이메일로 받아보시려면 구독해주세요
          </p>
        )}
      </div>
    </div>
  );
}