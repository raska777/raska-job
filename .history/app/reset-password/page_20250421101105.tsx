'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
      setStatus("❌ Server bilan xatolik");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Yangi parol kiriting</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Yangi parol"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parolni takrorlang"
          className="border p-2 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 rounded">
          {loading ? 'Yuborilmoqda...' : 'Parolni yangilash'}
        </button>
        {status && <p className="mt-2 text-center">{status}</p>}
      </form>
    </div>
  );
}
