
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
        setError('Email yoki parol notogri!');
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko&apos;ring.');
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
            Hisobingiz yoqmi?{' '}
            <Link href="/register" className="login-link">
              Royxatdan otish
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
            <div className="divider-text">Yoki</div>
            <div className="divider-line"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="google-button"
          >
            {isLoading ? (
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
            ) : (
              'Google bilan kirish'
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
