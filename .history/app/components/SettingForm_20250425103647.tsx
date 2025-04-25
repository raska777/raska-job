

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

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from 'styles/settingform.module.css';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isSubscribed: false,
    isEmailVerified: false,
    createdAt: '',
  });

  useEffect(() => {
    if (session?.user) {
      setLoading(true);

      fetch('/api/user-info')
        .then(async (res) => {
          if (!res.ok) throw new Error('사용자 정보를 불러오지 못했습니다.');
          return await res.json();
        })
        .then((data) => {
          setIsGoogleUser(data.provider === 'google');

          setFormData({
            name: data.name || session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: data.isSubscribed || false,
            isEmailVerified: data.isEmailVerified || false,
            createdAt: data.createdAt || '',
          });
        })
        .catch((err) => {
          console.error("사용자 정보를 가져오는 중 오류:", err);
          setFormData({
            name: session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: false,
            isEmailVerified: false,
            createdAt: '',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ...(!isGoogleUser && { password: formData.password }),
          isSubscribed: formData.isSubscribed,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ 설정이 성공적으로 저장되었습니다.');
        setEditMode(false);
        window.location.reload();
      } else {
        alert('❌ 오류: ' + (result.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error("설정을 저장하는 중 오류:", error);
      alert("⚠️ 설정을 저장할 수 없습니다.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setEmailVerificationSent(true);
        alert('✅ 이메일 확인 링크가 전송되었습니다.');
      } else {
        const error = await res.json();
        alert('❌ 오류: ' + (error.message || '이메일 전송 실패'));
      }
    } catch (error) {
      console.error("이메일 확인 요청 오류:", error);
      alert("⚠️ 이메일 확인 요청을 보낼 수 없습니다.");
    }
  };

  if (status === 'loading' || loading) return <p className="text-center py-8">⏳ 불러오는 중...</p>;
  if (!session) return <p className="text-center py-8">⛔ 로그인하지 않았습니다</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>계정 설정</h2>

      <div className={styles.metaInfo}>
        <p>
          <strong>가입 날짜:</strong>{' '}
          {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString('ko-KR') : '알 수 없음'}
        </p>

        <p>
          <strong>이메일 상태:</strong>{' '}
          {formData.isEmailVerified ? (
            <span className={styles.verified}>✅ 확인됨</span>
          ) : (
            <>
              <span className={styles.notVerified}>❌ 미확인</span>
              {!emailVerificationSent && (
                <button className={styles.verifyBtn} onClick={handleVerifyEmail}>
                  이메일 확인하기
                </button>
              )}
              {emailVerificationSent && (
                <span className={styles.sentText}>확인 링크가 전송되었습니다</span>
              )}
            </>
          )}
        </p>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>이름</label>
        <input
          type="text"
          className={styles.input}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>이메일</label>
        <input
          type="email"
          className={styles.readonlyInput}
          value={formData.email}
          readOnly
        />
        {isGoogleUser && (
          <p className={styles.hintText}>Google 계정으로 로그인되었습니다</p>
        )}
      </div>

      {!isGoogleUser && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>새 비밀번호</label>
          <input
            type="password"
            className={styles.input}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={!editMode}
            placeholder={editMode ? "비워두면 변경되지 않습니다" : ""}
          />
          {editMode && (
            <p className={styles.hintText}>비밀번호를 변경하지 않으려면 입력하지 마세요</p>
          )}
        </div>
      )}

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.isSubscribed}
            onChange={(e) => setFormData({ ...formData, isSubscribed: e.target.checked })}
            disabled={!editMode}
            className={styles.checkbox}
          />
          뉴스 및 알림 이메일 수신 동의
        </label>
      </div>

      <div className={styles.actions}>
        {!editMode ? (
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            수정하기
          </button>
        ) : (
          <>
            <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>
              취소
            </button>
            <button className={styles.saveBtn} onClick={handleUpdate}>
              저장
            </button>
          </>
        )}
      </div>
    </div>
  );
}
