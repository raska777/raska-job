
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

export default function ForgotPasswordPage() {
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
