// // // lib/email.ts

// // import nodemailer from 'nodemailer';
// // import dotenv from 'dotenv';

// // // .env faylini o'qish
// // dotenv.config();

// // // Transporterni sozlash
// // const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST,           // SMTP server manzili
// //   port: Number(process.env.SMTP_PORT),   // SMTP porti
// //   secure: process.env.SMTP_SECURE === 'false',  // Agar SSL/TLS kerak bo'lsa, true qilib qo'yiladi
// //   auth: {
// //     user: process.env.EMAIL_USER,        // Email foydalanuvchi nomi
// //     pass: process.env.EMAIL_PASS,        // Email paroli
// //   },
// // });

// // // Asosiy email yuborish funksiyasi
// // export const sendEmail = async (to: string, subject: string, text: string) => {
// //   try {
// //     console.log(`Email yuborilmoqda: ${to}`);

// //     // Email yuborish
// //     await transporter.sendMail({
// //       from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,  
// //       to,  
// //       subject,  
// //       text,  
// //       html: `<p>${text.replace(/\n/g, '<br>')}</p>`,  
// //     });

// //     console.log("✅ Email muvaffaqiyatli yuborildi!");
// //     return true;
// //   } catch (err: unknown) {
// //     if (err instanceof Error) {
// //       console.error("Email yuborishda xato:", err.message);  
// //       throw new Error(`Email yuborishda xato: ${err.message}`);
// //     } else {
// //       console.error("Noma'lum xatolik:", err);  
// //       throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
// //     }
// //   }
// // };

// // export default sendEmail;


/////////////// -------ishlaydgan qismi ///////////////////
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'rasuljonodiljanov9@gmail.com',
//     pass: process.env.EMAIL_PASS || 'aexdmptxtwfbodhh'
//   },
//   pool: true,
//   maxConnections: 1,
//   rateDelta: 20000, // 20 second delay
//   rateLimit: 5 // max 5 emails per minute
// });

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//     console.log(`Email yuborilmoqda: ${to}`);

//     const info = await transporter.sendMail({
//       from: `"Raska Platformasi" <${process.env.EMAIL_USER || 'rasuljonodiljanov9@gmail.com'}>`,
//       to,
//       subject,
//       text,
//       html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
//       priority: 'high'
//     });

//     console.log("✅ Email muvaffaqiyatli yuborildi!", info.messageId);
//     return true;
//   } catch (err: unknown) {
//     console.error("Email yuborishda xato:", err);
    
//     if (err instanceof Error) {
//       throw new Error(`Email yuborishda xato: ${err.message}`);
//     } else {
//       throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
//     }
//   }
// };

// export default sendEmail;

//// ---yangi qism//////
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rasuljonodiljanov9@gmail.com',
    pass: process.env.EMAIL_PASS || 'aexdmptxtwfbodhh'
  },
  pool: true,
  maxConnections: 1,
  rateDelta: 20000, // 20 second delay
  rateLimit: 5 // max 5 emails per minute
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);

    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER || 'rasuljonodiljanov9@gmail.com'}>`,
      to,
      subject,
      text,
      html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
      priority: 'high'
    });

    console.log("✅ Email muvaffaqiyatli yuborildi!", info.messageId);
    return true;
  } catch (err: unknown) {
    console.error("Email yuborishda xato:", err);
    
    if (err instanceof Error) {
      throw new Error(`Email yuborishda xato: ${err.message}`);
    } else {
      throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
    }
  }
};

// Yangi funksiya - foydalanuvchiga yangi ish e'loni haqida xabar yuborish
export const sendJobNotification = async (email: string, jobTitle: string) => {
  const subject = `Yangi ish e'loni: ${jobTitle}`;
  const text = `Hurmatli foydalanuvchi,\n\n"${jobTitle}" nomli yangi ish e'loni platformaga qo'shildi.\n\nBatafsil: ${process.env.NEXTAUTH_URL}/jobs`;
  
  return sendEmail(email, subject, text);
};

export default sendEmail;