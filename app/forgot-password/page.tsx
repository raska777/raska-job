// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import "styles/forgot-password.css"

// export default function ForgotPasswordRequest() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

 
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError('');
//   setSuccess('');

//   try {
//     const response = await fetch('/api/auth/forgot-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result.error || "Xatolik yuz berdi");
    
//     // Har doim bir xil xabar
//     setSuccess("Agar bu email ro'yxatdan o'tgan bo'lsa, parolni tiklash havolasi yuborildi. Iltimos emailingizni tekshiring.");
//   } catch (err: any) {
//     setError(err.message || "Xatolik yuz berdi");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <main className="auth-container">
//       <div className="auth-box">
//         <h2>Parolni Tiklash</h2>
//         <p>Parolni tiklash uchun email manzilingizni kiriting</p>

//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Manzil</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <button type="submit" disabled={isLoading} className="submit-btn">
//             {isLoading ? 'Yuborilmoqda...' : 'Havolani Yuborish'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <Link href="/login">Kirish Sahifasiga Qaytish</Link>
//         </div>
//       </div>
//     </main>
//   );
// }'use client';


// import { useState } from 'react';
// import Link from 'next/link';
// import "styles/forgot-password.css"

// export default function ForgotPasswordRequest() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || "오류가 발생했습니다.");

//       setSuccess("해당 이메일이 등록되어 있다면, 비밀번호 재설정 링크가 이메일로 발송되었습니다.");
//     } catch (err: any) {
//       setError(err.message || "오류가 발생했습니다.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="auth-container">
//       <div className="auth-box">
//         <h2>비밀번호 재설정</h2>
//         <p>비밀번호를 재설정하려면 이메일 주소를 입력하세요</p>

//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">이메일 주소</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <button type="submit" disabled={isLoading} className="submit-btn">
//             {isLoading ? '보내는 중...' : '링크 보내기'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <Link href="/login">로그인 페이지로 돌아가기</Link>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client'; // Add this line to mark the component as a client component

import { useState } from 'react';
import Link from 'next/link';
import "styles/forgot-password.css";

export default function ForgotPasswordRequest() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "오류가 발생했습니다.");

      setSuccess("해당 이메일이 등록되어 있다면, 비밀번호 재설정 링크가 이메일로 발송되었습니다.");
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h2>비밀번호 재설정</h2>
        <p>비밀번호를 재설정하려면 이메일 주소를 입력하세요</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일 주소</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? '보내는 중...' : '링크 보내기'}
          </button>
        </form>

        <div className="auth-footer">
          <Link href="/login">로그인 페이지로 돌아가기</Link>
        </div>
      </div>
    </main>
  );
}
