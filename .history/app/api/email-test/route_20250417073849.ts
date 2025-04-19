import { NextResponse } from 'next/server';
import sendEmail from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await sendEmail(body.to, body.subject, body.text);

    return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Email yuborilmadi' }, { status: 500 });
  }
}
