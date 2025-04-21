'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react'; 
import "styles/reset-password.css"

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus("Parollar mos emas");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Parol muvaffaqiyatli yangilandi!");
        setTimeout(() => router.push('/login'), 2000); // login sahifaga yo‘naltirish
      } else {
        setStatus(`❌ Xatolik: ${data.error}`);
      }
    } catch (err) {
          console.error("Reset password error:", err);
      setStatus("❌ Server bilan xatolik");
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h1 className="reset-password-title">Yangi parol kiriting</h1>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="password"
          placeholder="Yangi parol"
          className="reset-password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parolni takrorlang"
          className="reset-password-input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="reset-password-button">
          {loading ? 'Yuborilmoqda...' : 'Parolni yangilash'}
        </button>
        {status && (
          <p className={`reset-password-status ${status.includes('✅') ? 'success' : 'error'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
