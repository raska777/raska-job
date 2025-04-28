//
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from 'styles/login.module.css';
import { FcGoogle } from 'react-icons/fc'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';

const formSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
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
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error('Google sign in error:', err);
      setError('Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Raska Job</h1>
          <h2 className={styles.loginSubtitle}>로그인</h2>
          <p className={styles.loginPrompt}>
            계정이 없으신가요?{' '}
            <Link href="/register" className={styles.loginLink}>
              회원가입
            </Link>
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <div className={styles.errorContent}>
              <svg className={styles.errorIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
              </svg>
              <p className={styles.errorText}>{error}</p>
            </div>
          </div>
        )}

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              이메일 주소
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
              placeholder="email@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className={styles.errorText}>
                <svg className={styles.inlineErrorIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              비밀번호
            </label>
            <div className={styles.passwordContainer}>
              <input
                id="password"
                {...register("password")}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`${styles.formInput} ${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
                placeholder="비밀번호 입력"
                disabled={isLoading}
              />
               <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className={styles.togglePassword}
>
  {showPassword ? (
    <FiEyeOff size={20} />
  ) : (
    <FiEye size={20} />
  )}
</button>

            </div>
            {errors.password && (
              <p className={styles.errorText}>
                <svg className={styles.inlineErrorIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                </svg>
                {errors.password.message}
              </p>
            )}
            <div className={styles.forgotPassword}>
              <Link href="/forgot-password" className={styles.forgotPasswordLink}>
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 50 50">
                  <circle className={styles.spinnerPath} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                로그인 중...
              </>
            ) : (
              '로그인'
            )}
          </button>
        </form>

        <div className={styles.socialLogin}>
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>또는</div>
            <div className={styles.dividerLine}></div>
          </div>

             <button
  onClick={handleGoogleSignIn}
  type="button"
  className={styles.googleButton}
  disabled={isLoading}
>
  <FcGoogle className={styles.googleIcon} size={24} />
  Google 계정으로 가입
</button>
        </div>
      </div>
    </main>
  );
}