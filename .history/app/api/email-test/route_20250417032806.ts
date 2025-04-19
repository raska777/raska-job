// app/api/test-email/route.ts

import { NextResponse } from 'next/server';
import sendEmail from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json();

    // Konsolga log chiqarish - test qilish uchun
    console.log("So'rov qabul qilindi:", { to, subject, text });

    await sendEmail(to, subject, text);

    return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
  } catch (error) {
    console.error("❌ Xatolik:", error);
    return NextResponse.json({ error: 'Email yuborishda xatolik yuz berdi' }, { status: 500 });
  }
}
