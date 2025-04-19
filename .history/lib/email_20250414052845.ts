// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Gmail orqali yuborish, boshqa provayderni ham ishlatish mumkin
  auth: {
    user: process.env.EMAIL_USER,  // .env.local faylidan o'qiladi
    pass: process.env.EMAIL_PASS,  // .env.local faylidan o'qiladi
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Email yuborildi!");
  } catch (error) {
    console.error("❌ Email yuborishda xato:", error);
  }
};
