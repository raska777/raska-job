import nodemailer from "nodemailer";

// Transporterni sozlash
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",  // SMTP server manzili (masalan, Office 365 uchun)
  port: 587,  // Port
  secure: false,  // Portni xususiyatlariga qarab o'zgartiring
  auth: {
    user: "rasuljonodiljanov9@gmail.com",  // Yuboruvchi email
    pass: "qbez wyph lzrx gfoq",  // Yuboruvchi emailning paroli (Xavfsizlik uchun buni muhofaza qilish kerak)
  },
});

// Email yuborish funksiyasi
const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Raska Platformasi" <rasuljonodiljanov9@gmail.com>',  // Yuboruvchi nomi
      to: "abdurasulodiljanov@gmail.com",  // Qabul qiluvchi email manzili
      subject: "SMTP test",  // Mavzu
      text: "Bu test email xabari",  // Matnli xabar
    });

    console.log("✅ Email yuborildi:", info.response);
  } catch (error: any) {
    console.error("❌ Email yuborishda xato:", error.response || error);
  }
};

// Funksiyani chaqirish
sendTestEmail();
