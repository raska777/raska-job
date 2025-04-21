// 'use client';
// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import Link from 'next/link';

// // Form validation schema
// const formSchema = z.object({
//   password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
//   confirmPassword: z.string()
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Parollar mos kelmadi",
//   path: ["confirmPassword"]
// });

// type FormData = z.infer<typeof formSchema>;

// export default function ResetPasswordPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema)
//   });

//   const onSubmit = async (data: FormData) => {
//     if (!token) {
//       setError("Yaroqsiz token");
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           newPassword: data.password
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Parolni tiklashda xatolik yuz berdi");
//       }

//       setSuccess("Parol muvaffaqiyatli o'zgartirildi!");
//     } catch (err: any) {
//       console.error('Reset password error:', err);
//       setError(err.message || "Xatolik yuz berdi");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2 className="login-title">Parolni tiklash</h2>
//           <p className="login-subtitle">
//             Yangi parolingizni kiriting
//           </p>
//         </div>

//         {error && (
//           <div className="error-message">
//             <div className="error-content">
//               <div className="error-icon">
//                 <svg
//                   className="error-svg"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="error-text">
//                 <p>{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {success && (
//           <div className="success-message">
//             <div className="success-content">
//               <div className="success-icon">
//                 <svg
//                   className="success-svg"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="success-text">
//                 <p>{success}</p>
//               </div>
//             </div>
//             <Link href="/login" className="login-link">
//               Kirish sahifasiga qaytish
//             </Link>
//           </div>
//         )}

//         {!success && (
//           <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-fields">
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">
//                   Yangi parol
//                 </label>
//                 <input
//                   id="password"
//                   {...register("password")}
//                   type="password"
//                   className={`form-input ${errors.password ? 'input-error' : ''}`}
//                   placeholder="Yangi parol"
//                 />
//                 {errors.password && (
//                   <p className="error-text">{errors.password.message}</p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Parolni tasdiqlang
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   {...register("confirmPassword")}
//                   type="password"
//                   className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
//                   placeholder="Parolni takrorlang"
//                 />
//                 {errors.confirmPassword && (
//                   <p className="error-text">{errors.confirmPassword.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`login-button ${isLoading ? 'loading' : ''}`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg
//                       className="spinner"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="spinner-circle"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="spinner-path"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Yuklanmoqda...
//                   </>
//                 ) : (
//                   'Parolni tiklash'
//                 )}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </main>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import 'styles/reset-password.css';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Parollar mos kelmadi",
  path: ["confirmPassword"]
});

type FormData = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  

  const onSubmit = async (data: FormData) => {
    if (!token) {
      setError("Yaroqsiz token");
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Parolni tiklashda xatolik yuz berdi");
      setSuccess("Parol muvaffaqiyatli o'zgartirildi!");
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">Parolni tiklash</h2>
        <p className="reset-subtitle">Yangi parolingizni kiriting</p>

        {error && <div className="error-message">{error}</div>}

        {success ? (
          <div className="success-message">
            <p>{success}</p>
            <Link href="/login" className="success-link">
              Kirish sahifasiga qaytish
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            <div className="form-group">
              <label htmlFor="password">Yangi parol</label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Parolni tasdiqlang</label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Yuklanmoqda...' : 'Parolni tiklash'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
