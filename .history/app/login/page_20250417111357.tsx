// // app/login/page.tsx
// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//       redirect: false,
//       email: form.email,
//       password: form.password,
//     });

//     if (result?.ok) {
//       router.push("/"); // yoki dashboard sahifasi
//     } else {
//       setError("Email yoki parol noto‘g‘ri!");
//     }
//   };

//   return (
//     <main className="p-8 max-w-md mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Tizimga kirish</h2>

//       {error && <p className="text-red-500 font-semibold">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//             placeholder="Foydalanuvchi emaili"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold">Parol</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//             placeholder="Parol"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
//         >
//           Kirish
//         </button>
//       </form>
//     </main>
//   );
// }

//app/login/page.tsx
// 'use client';
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import "styles/login.css";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!form.email || !form.password) {
//       setError('Iltimos, email va parolni kiriting');
//       return;
//     }
    
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       setError('Noto‘g‘ri email formati');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const result = await signIn('credentials', {
//         redirect: false,
//         email: form.email,
//         password: form.password,
//       });

//       if (result?.error) {
//         setError('Email yoki parol noto‘g‘ri!');
//       } else if (result?.ok) {
//         router.push('/');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       setIsLoading(true);
//       await signIn('google', { callbackUrl: '/' });
//     } catch (err) {
//       console.error('Google sign in error:', err);
//       setError('Google orqali kirishda xatolik');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2 className="login-title">
//             Tizimga kirish
//           </h2>
//           <p className="login-subtitle">
//             Yoki{' '}
//             <Link href="/register" className="login-link">
//               ro'yxatdan o'tish
//             </Link>
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

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-fields">
//             <div className="form-group">
//               <label htmlFor="email" className="form-label">
//                 Email manzil
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={form.email}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="email@example.com"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password" className="form-label">
//                 Parol
//               </label>
//               <div className="password-input-container">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   value={form.password}
//                   onChange={handleChange}
//                   className="form-input password-input"
//                   placeholder="Parolingiz"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="password-toggle"
//                 >
//                   {showPassword ? (
//                     <svg
//                       className="password-icon"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="password-icon"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                         clipRule="evenodd"
//                       />
//                       <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               <div className="forgot-password">
//                 <Link
//                   href="/forgot-password"
//                   className="forgot-password-link"
//                 >
//                   Parolni unutdingizmi?
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`login-button ${isLoading ? 'loading' : ''}`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="spinner"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="spinner-circle"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="spinner-path"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Kirish...
//                 </>
//               ) : (
//                 'Kirish'
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="social-login">
//           <div className="divider-container">
//             <div className="divider-line"></div>
//             <div className="divider-text">
//               <span>Yoki</span>
//             </div>
//           </div>

//           <div className="google-button-container">
//             <button
//               onClick={handleGoogleSignIn}
//               disabled={isLoading}
//               className="google-button"
//             >
//               <svg
//                 className="google-icon"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 488 512"
//                 fill="currentColor"
//               >
//                 <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
//               </svg>
//               Google orqali kirish
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// app/login/page.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "styles/login.css";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Noto'g'ri email formati"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError('Email yoki parol noto‘g‘ri!');
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error('Google sign in error:', err);
      setError('Google orqali kirishda xatolik');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            Tizimga kirish
          </h2>
          <p className="login-subtitle">
            Hisobingiz yo'qmi?{' '}
            <Link href="/register" className="login-link">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-content">
              <div className="error-icon">
                <svg
                  className="error-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="error-text">
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email manzil
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Parol
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  {...register("password")}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="Parolingiz"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <svg
                      className="password-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="password-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
              <div className="forgot-password">
                <Link
                  href="/forgot-password"
                  className="forgot-password-link"
                >
                  Parolni unutdingizmi?
                </Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`login-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="spinner-circle"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="spinner-path"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Kirish...
                </>
              ) : (
                'Kirish'
              )}
            </button>
          </div>
        </form>

        <div className="social-login">
          <div className="divider-container">
            <div className="divider-line"></div>
            <div className="divider-text">
              <span>Yoki</span>
            </div>
          </div>

          <div className="google-button-container">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="google-button"
            >
              <svg
                className="google-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                fill="currentColor"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Google orqali kirish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}