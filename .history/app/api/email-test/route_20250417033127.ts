// // app/api/test-email/route.ts

// import { NextResponse } from 'next/server';
// import sendEmail from '@/lib/email';

// export async function POST(request: Request) {
//   try {
//     const { to, subject, text } = await request.json();
//     console.log(to, subject, text);  // Tekshirish uchun

//     const result = await sendEmail(to, subject, text);
//     return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);  // Xatolik haqida batafsil ma'lumot
//     return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
//   }
// }
