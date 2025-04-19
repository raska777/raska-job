// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Asosiy o'zgarish shu: `export async function` deb yozilgan
export async function sendEmail(to: string, subject: string, text: string) {
  try {
    console.log("Email yuborilmoqda...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Email yuborildi!");
  } catch (error) {
    console.error("❌ Email yuborishda xato:", error);
    throw new Error("Email yuborishda xatolik yuz berdi");
  }
}
