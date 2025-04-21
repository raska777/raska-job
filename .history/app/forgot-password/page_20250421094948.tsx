'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Xatolik yuz berdi");
    
    // Har doim bir xil xabar
    setSuccess("Agar bu email ro'yxatdan o'tgan bo'lsa, parolni tiklash havolasi yuborildi. Iltimos emailingizni tekshiring.");
  } catch (err: any) {
    setError(err.message || "Xatolik yuz berdi");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h2>Parolni Tiklash</h2>
        <p>Parolni tiklash uchun email manzilingizni kiriting</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Manzil</label>
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
            {isLoading ? 'Yuborilmoqda...' : 'Havolani Yuborish'}
          </button>
        </form>

        <div className="auth-footer">
          <Link href="/login">Kirish Sahifasiga Qaytish</Link>
        </div>
      </div>
    </main>
  );
}