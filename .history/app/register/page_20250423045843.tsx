'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from 'styles/register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [googleError, setGoogleError] = useState('');

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!form.name.trim()) {
      newErrors.name = 'Ism kiritilishi shart';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email kiritilishi shart';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Noto‘g‘ri email formati';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Parol kiritilishi shart';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Parol kamida 6 belgidan iborat bo‘lishi kerak';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError('');

    if (!validateForm()) return;

    if (!agreedToTerms) {
      alert('Iltimos, shartlar va maxfiylik siyosatiga rozilik bering');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Ro‘yxatdan o‘tildi!');
        router.push('/login');
      } else {
        alert(data.error || 'Xatolik yuz berdi');
      }
    } catch (err) {
      console.error(err);
      alert('Server bilan bog‘lanishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleError('');
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error(err);
      setGoogleError('Google orqali kirishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Ro‘yxatdan o‘tish</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.togglePassword}
            >
              {showPassword ? 'Yashirish' : 'Ko‘rsatish'}
            </button>
          </div>
          {errors.password && <span className={styles.error}>{errors.password}</span>}
          <div className={styles.strengthMeter}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.strengthBar} ${
                  i <= passwordStrength
                    ? passwordStrength >= 3
                      ? 'filled'
                      : passwordStrength >= 2
                      ? 'filled medium'
                      : 'filled weak'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="terms">
            <a href="/terms" className={styles.loginLink}>Shartlar</a> va{' '}
            <a href="/privacy" className={styles.loginLink}>Maxfiylik siyosati</a>ga roziman
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreedToTerms || isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Yuklanmoqda...' : 'Ro‘yxatdan o‘tish'}
        </button>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>yoki</span>
          <div className={styles.dividerLine} />
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="google-button"
          disabled={isLoading}
        >
          {isLoading ? 'Yuklanmoqda...' : 'Google bilan kirish'}
        </button>
        {googleError && <p className={styles.error}>{googleError}</p>}

        <p className={styles.loginLink}>
          Hisobingiz bormi? <a href="/login">Tizimga kirish</a>
        </p>
      </form>
    </main>
  );
}
