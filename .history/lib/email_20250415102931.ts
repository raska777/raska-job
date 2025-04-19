import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.office365.com
  port: Number(process.env.SMTP_PORT), // 587
  secure: false, // TLS uchun false bo'lishi kerak (587 portda)
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Kimdan
      to, // Qabul qiluvchi
      subject,
      text,
    });
    console.log("✅ Email yuborildi!");
  } catch (error) {
    console.error("❌ Email yuborishda xato:", error);
  }
};
