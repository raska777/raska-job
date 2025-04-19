// lib/email.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// .env faylini o'qish
dotenv.config();

// Transporterni sozlash
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,           // SMTP server manzili
  port: Number(process.env.SMTP_PORT),   // SMTP porti
  secure: process.env.SMTP_SECURE === 'true',  // Agar SSL/TLS kerak bo'lsa, true qilib qo'yiladi
  auth: {
    user: process.env.EMAIL_USER,        // Email foydalanuvchi nomi
    pass: process.env.EMAIL_PASS,        // Email paroli
  },
});

// Asosiy email yuborish funksiyasi
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);

    // Email yuborish
    await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,  // Yuboruvchi email manzili
      to,  // Qabul qiluvchi email manzili
      subject,  // Mavzu
      text,  // Oddiy matnli xabar
      html: `<p>${text.replace(/\n/g, '<br>')}</p>`,  // HTML formatida xabar
    });

    console.log("✅ Email muvaffaqiyatli yuborildi!");
    return true;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Email yuborishda xato:", err.message);  // Xatolik haqida aniq xabar
      throw new Error(`Email yuborishda xato: ${err.message}`);
    } else {
      console.error("Noma'lum xatolik:", err);  // Xatolik unknown bo'lsa
      throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
    }
  }
};

export default sendEmail;
