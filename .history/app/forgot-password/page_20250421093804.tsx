'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordRequest() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

 
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
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";
import crypto from "crypto";
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit tekshiruvi
    const ip = req.headers.get('x-forwarded-for') || req.socket?.remoteAddress;
    const { isRateLimited } = await rateLimit(ip || null);
    
    if (isRateLimited) {
      return NextResponse.json(
        { error: "Juda ko'p so'rovlar yuborildi. Iltimos, birozdan keyin urinib ko'ring." }, 
        { status: 429 }
      );
    }

    // Qolgan kod...
    const { email } = await req.json();
    // ...qolgan logika

  } catch (error) {
    console.error("Xato:", error);
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    );
  }
}
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