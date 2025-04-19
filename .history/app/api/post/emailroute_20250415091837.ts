import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Job from '@/models/Job';
import User from '@/models/User'; // Obunachilarni olish uchun
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Yangi ish e’lonini saqlash
    const newJob = new Job(body);
    await newJob.save();

    // Barcha obunachilarni olish
    const subscribers = await User.find({ subscribed: true });

    if (!subscribers.length) {
      console.log('Obunachilar topilmadi');
    }

    // Nodemailer orqali email yuborish
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Har bir obunachiga email yuborish
    for (const user of subscribers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Yangi ish e’loni!',
        text: `Salom ${user.name || ''},\n\nYangi ish e’loni joylandi: ${body.title}\n\nBatafsil ko'rish uchun saytga kiring.`,
      };

      await transporter.sendMail(mailOptions)
        .then(() => console.log(`Email yuborildi: ${user.email}`))
        .catch((err) => console.error(`Xatolik: ${user.email}`, err));
    }

    return NextResponse.json({ message: 'Job created and emails sent' }, { status: 201 });

  } catch (error) {
    console.error("POST xatosi:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
