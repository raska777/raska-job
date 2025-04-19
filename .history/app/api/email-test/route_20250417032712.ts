// app/api/test-email/route.ts
import { NextResponse } from 'next/server';
import sendEmail from '@/lib/email'; // email funksiyasi shu yerda bo‘lishi kerak

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json();
    console.log(to, subject, text); // tekshirish uchun log
    const result = await sendEmail(to, subject, text);
    return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
  } catch (error) {
    console.error("Error:", error); // xatolik logi
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
