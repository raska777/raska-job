// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useState } from 'react'; 
// import "styles/reset-password.css"

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       setStatus("Parollar mos emas");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword: password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus("✅ Parol muvaffaqiyatli yangilandi!");
//         setTimeout(() => router.push('/login'), 2000); // login sahifaga yo‘naltirish
//       } else {
//         setStatus(`❌ Xatolik: ${data.error}`);
//       }
//     } catch (err) {
//           console.error("Reset password error:", err);
//       setStatus("❌ Server bilan xatolik");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="reset-password-container">
//       <h1 className="reset-password-title">Yangi parol kiriting</h1>
//       <form onSubmit={handleSubmit} className="reset-password-form">
//         <input
//           type="password"
//           placeholder="Yangi parol"
//           className="reset-password-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Parolni takrorlang"
//           className="reset-password-input"
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading} className="reset-password-button">
//           {loading ? 'Yuborilmoqda...' : 'Parolni yangilash'}
//         </button>
//         {status && (
//           <p className={`reset-password-status ${status.includes('✅') ? 'success' : 'error'}`}>
//             {status}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import styles from "styles/reset-password.module.css"; // CSS Modules dan foydalanish tavsiya etiladi

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setStatus("Parollar mos emas");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword: password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus("✅ Parol muvaffaqiyatli yangilandi!");
//         setTimeout(() => router.push('/login'), 2000);
//       } else {
//         setStatus(`❌ Xatolik: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Parolni tiklashda xatolik:", error);
//       setStatus("❌ Server bilan xatolik");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className={styles.resetPasswordContainer}>
//       <h1 className={styles.resetPasswordTitle}>Yangi parol kiriting</h1>
//       <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
//         <input
//           type="password"
//           placeholder="Yangi parol"
//           className={styles.resetPasswordInput}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Parolni takrorlang"
//           className={styles.resetPasswordInput}
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={styles.resetPasswordButton}
//         >
//           {loading ? 'Yuborilmoqda...' : 'Parolni yangilash'}
//         </button>
//         {status && (
//           <p
//             className={`${styles.resetPasswordStatus} ${
//               status.includes('✅') ? styles.success : styles.error
//             }`}
//           >
//             {status}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }


"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from "styles/reset-password.module.css"; // CSS Modules dan foydalanish tavsiya etiladi

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("Parollar mos emas");
      return;
    }

    setLoading(true);
    setStatus(''); // Oldingi xabarlarni tozalash

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Parol muvaffaqiyatli yangilandi!");
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setStatus(`❌ Xatolik: ${data.error || 'Parolni yangilashda xatolik yuz berdi'}`);
      }
    } catch (error) {
      console.error("Parolni tiklashda xatolik:", error);
      setStatus("❌ Server bilan xatolik");
    }

    setLoading(false);
  };

  if (token === null) {
    return <p className={styles.resetPasswordStatus}>Parolni tiklash uchun token topilmadi.</p>;
  }

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className={styles.resetPasswordTitle}>Yangi parol kiriting</h1>
      <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
        <input
          type="password"
          placeholder="Yangi parol"
          className={styles.resetPasswordInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parolni takrorlang"
          className={styles.resetPasswordInput}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.resetPasswordButton}
        >
          {loading ? 'Yuborilmoqda...' : 'Parolni yangilash'}
        </button>
        {status && (
          <p
            className={`${styles.resetPasswordStatus} ${
              status.includes('✅') ? styles.success : styles.error
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}