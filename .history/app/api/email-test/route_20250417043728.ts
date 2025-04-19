// app/api/email-test/route.ts
import { NextResponse } from 'next/server';
import sendEmail from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { to = 'abdurasulodiljanov@gmail.com', 
            subject = 'Test Email', 
            text = 'This is test email' } = await request.json();
    
    await sendEmail(to, subject, text);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Full error:", error);
    return NextResponse.json(
      { error: error.message || 'Email yuborishda xatolik' },
      { status: 500 }
    );
  }
}