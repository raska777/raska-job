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


// ///////////////
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
///-------uraaaaaa ishlagani /////////////////
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

// Transporter konfiguratsiyasi
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 5,
  rateDelta: 10000, // 10 soniya oralik
  rateLimit: 10 // daqiqada 10 ta email
});

// MongoDB ulanishi
const mongoClient = new MongoClient(process.env.MONGODB_URI || '');

// Asosiy email yuborish funksiyasi
const sendEmail = async (to: string, subject: string, content: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: content.replace(/<[^>]*>/g, ''),
      html: content
    });
    
    console.log(`✅ Email yuborildi (${to}): ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Email xatosi (${to}):`, error);
    throw error;
  }
};

// Xush kelibsiz emaili
export const sendWelcomeEmail = async (email: string, name: string) => {
  const subject = 'Raska Platformasiga Xush Kelibsiz!';
  const content = `
    <h2>Hurmatli ${name},</h2>
    <p>Raska platformasiga ro'yxatdan o'tganingiz bilan tabriklaymiz!</p>
    <p><a href="${process.env.SITE_URL}">Platformaga kirish</a></p>
    <small><a href="${process.env.UNSUBSCRIBE_URL}">Obunani bekor qilish</a></small>
  `;
  
  return sendEmail(email, subject, content);
};

// Yangi e'lon bildirishnomasi
export const sendNewPostNotification = async (post: {_id: string, title: string}) => {
  let client;
  try {
    client = await mongoClient.connect();
    const db = client.db(process.env.DB_NAME);
    
    // Faqat obuna bo'lgan va bildirishnoma yoqilgan foydalanuvchilar
    const users = await db.collection('users')
      .find({ 
        isSubscribed: true,
        notificationEnabled: true
      })
      .project({ email: 1 })
      .toArray();

    if (!users.length) return false;

    const subject = `Yangi e'lon: ${post.title}`;
    const content = `
      <h2>Yangi e'lon joylashdi!</h2>
      <p><strong>${post.title}</strong></p>
      <p><a href="${process.env.SITE_URL}/posts/${post._id}">E'loni ko'rish</a></p>
      <small><a href="${process.env.SITE_URL}/profile">Profil sozlamalari</a></small>
    `;

    // Parallel email yuborish (5 tadan ortiq emas)
    const batchSize = 5;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await Promise.all(
        batch.map(user => sendEmail(user.email, subject, content))
          .catch((err: any) => console.error('Batch xatosi:', err));
    }

    return true;
  } finally {
    if (client) await client.close();
  }
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendNewPostNotification
};