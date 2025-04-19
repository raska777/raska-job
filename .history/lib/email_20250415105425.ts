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
//   }
// };


const handleSendEmail = async () => {
    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
      });
  
      if (res.ok) {
        const data = await res.json();
        setStatus(data.message); // Statusni yangilash
      } else {
        const errorData = await res.json();
        setStatus(`Xatolik: ${errorData.message}`);
      }
    } catch (error) {
      setStatus("Xatolik yuz berdi");
    }
  };
  