// app/api/test-email/route.ts

import { NextResponse } from 'next/server';
import sendEmail from '@/lib/email';
export async function POST(request: Request) {
  const { to, subject, text } = await request.json();

  try {
    const result = await sendEmail(to, subject, text);
    return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
