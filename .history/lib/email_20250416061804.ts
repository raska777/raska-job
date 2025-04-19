import nodemailer from "nodemailer";

// Transporterni sozlash
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Asosiy email yuborish funksiyasi
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);
    
    await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
    });
    
    console.log("✅ Email muvaffaqiyatli yuborildi!");
    return true;
  } catch (error) {
    console.error("❌ Email yuborishda xato:", error);
    throw error;
  }
};

// Fayl oxirida export qilish (agar kerak bo'lsa)
export default sendEmail;