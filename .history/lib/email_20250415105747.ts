// import nodemailer from "nodemailer";

// // Transporter yaratish
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST, // smtp.office365.com
//   port: Number(process.env.SMTP_PORT), // 587
//   secure: false, // TLS uchun false bo'lishi kerak (587 portda)
//   auth: {
//     user: process.env.EMAIL_USER, // Outlook email manzilingiz
//     pass: process.env.EMAIL_PASS, // Outlook email parolingiz
//   },
// });

// // Email yuborish funksiyasi
// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//     console.log("Email yuborilmoqda...");
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER, // Kimdan
//       to, // Qabul qiluvchi
//       subject,
//       text,
//     });
//     console.log("✅ Email yuborildi!");
//   } catch (error) {
//     console.error("❌ Email yuborishda xato:", error);
//   }import { useState } from 'react';

const EmailComponent = () => {
    const [status, setStatus] = useState<string>("");
  
    const sendEmail = async () => {
      try {
        // Email yuborish kodini qo'shing
        setStatus("✅ Email yuborildi!");
      } catch (error) {
        console.error("❌ Email yuborishda xato:", error);
        setStatus("❌ Email yuborishda xato!");
      }
    };
  
    return (
      <div>
        <button onClick={sendEmail}>Email yuborish</button>
        <p>{status}</p>
      </div>
    );
  };
  
  export default EmailComponent;
  
// };


