
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('EMAIL_USER va EMAIL_PASS environment variablelari talab qilinadi');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5,
});

/**
 * Asosiy email yuborish funksiyasi
 */
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<boolean> => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);

    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`, // Agar html berilmasa, oddiy formatlash
      priority: 'high',
    });

    console.log("✅ Email muvaffaqiyatli yuborildi!", info.messageId);
    return true;
  } catch (err: unknown) {
    console.error("Email yuborishda xato:", err);

    if (err instanceof Error) {
      throw new Error(`Email yuborishda xato: ${err.message}`);
    }

    throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
  }
};

/**
 * Email tasdiqlash uchun xabar yuborish
 */
export const sendVerificationEmail = async (email: string, verificationLink: string): Promise<boolean> => {
  const subject = '✅ Emailingizni tasdiqlang - Raska Platformasi';
  const text = `Hurmatli foydalanuvchi,\n\nRaska platformasida ro'yxatdan o'tganingiz uchun tashakkur! Hisobingizni faollashtirish va platformadan to'liq foydalanishni boshlash uchun quyidagi havolani bosing:\n\n${verificationLink}\n\nAgar yuqoridagi tugma ishlamasa, quyidagi havolani brauzeringizga nusxalab o'tkazing:\n${verificationLink}\n\nHurmat bilan,\nRaska jamoasi`;
  const html = `<p>Hurmatli foydalanuvchi,</p><p>Raska platformasida ro'yxatdan o'tganingiz uchun tashakkur! Hisobingizni faollashtirish va platformadan to'liq foydalanishni boshlash uchun quyidagi tugmani bosing:</p><p><a href="${verificationLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Emailni tasdiqlash</a></p><p>Agar yuqoridagi tugma ishlamasa, quyidagi havolani brauzeringizga nusxalab o'tkazing:<br>${verificationLink}</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * Parolni tiklash uchun xabar yuborish
 */
export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
  const subject = '🔑 Parolni tiklash so\'rovi - Raska Platformasi';
  const text = `Hurmatli foydalanuvchi,\n\nSizning Raska platformasi hisobingiz uchun parolni tiklash so'rovi olindi. Parolingizni yangilash uchun quyidagi havolani bosing:\n\n${resetLink}\n\nAgar siz bu so'rovni yubormagan bo'lsangiz, ushbu emailni e'tiborsiz qoldiring. Sizning hisobingiz xavfsizligicha qoladi.\n\nHurmat bilan,\nRaska jamoasi`;
  const html = `<p>Hurmatli foydalanuvchi,</p><p>Sizning Raska platformasi hisobingiz uchun parolni tiklash so'rovi olindi. Parolingizni yangilash uchun quyidagi tugmani bosing:</p><p><a href="${resetLink}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Parolni tiklash</a></p><p>Agar siz bu so'rovni yubormagan bo'lsangiz, ushbu emailni e'tiborsiz qoldiring. Sizning hisobingiz xavfsizligicha qoladi.</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * Yangi foydalanuvchi ro'yxatdan o'tganda xush kelibsiz xabari
 */
export const sendWelcomeEmail = async (email: string, name: string, verifyLink: string) => {
  const html = renderTemplate('welcome.html', { name, verifyLink });
  return sendEmail(email, `👋 Xush kelibsiz, ${name}`, html);
};

/**
 * Parol muvaffaqiyatli o'zgartirilganda xabar yuborish
 */
export const sendPasswordChangedEmail = async (email: string): Promise<boolean> => {
  const subject = '🔒 Parolingiz muvaffaqiyatli o\'zgartirildi - Raska Platformasi';
  const text = `Hurmatli foydalanuvchi,\n\nSizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.\n\nAgar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.\n\nHurmat bilan,\nRaska jamoasi`;
  const html = `<p>Hurmatli foydalanuvchi,</p><p>Sizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.</p><p><b>Muhim:</b> Agar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * Adminlarga yangi foydalanuvchi haqida xabar berish
 */
export const sendNewUserNotification = async (adminEmail: string, userEmail: string): Promise<boolean> => {
  const subject = '👤 Yangi foydalanuvchi ro\'yxatdan o\'tdi - Raska Platformasi';
  const text = `Salom Admin,\n\nRaska platformasida yangi foydalanuvchi ro'yxatdan o'tdi:\nEmail: ${userEmail}\n\nPlatforma admin paneliga kirib, foydalanuvchi haqida batafsil ma'lumot olishingiz mumkin.`;
  const html = `<p>Salom Admin,</p><p>Raska platformasida yangi foydalanuvchi ro'yxatdan o'tdi:<br>Email: ${userEmail}</p><p>Platforma <a href="[ADMIN PANEL HAVOLASI]">admin paneliga</a> kirib, foydalanuvchi haqida batafsil ma'lumot olishingiz mumkin.</p><p>Raska jamoasi</p>`; // [ADMIN PANEL HAVOLASI] ni o'zgartiring

  return sendEmail(adminEmail, subject, text, html);
};

export default sendEmail;




function renderTemplate(arg0: string, arg1: { name: string; verifyLink: string; }) {
  throw new Error('Function not implemented.');
}
// /**
//  * Asosiy email yuborish funksiyasi
//  */
// export const sendEmail = async (to: string, subject: string, text: string): Promise<boolean> => {
//   try {
//     console.log(`Email yuborilmoqda: ${to}`);

//     const info = await transporter.sendMail({
//       from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
//       priority: 'high',
//     });

//     console.log("✅ Email muvaffaqiyatli yuborildi!", info.messageId);
//     return true;
//   } catch (err: unknown) {
//     console.error("Email yuborishda xato:", err);
    
//     if (err instanceof Error) {
//       throw new Error(`Email yuborishda xato: ${err.message}`);
//     }
    
//     throw new Error('Email yuborishda noma\'lum xatolik yuz berdi');
//   }
// };

// /**
//  * Email tasdiqlash uchun xabar yuborish
//  */
// export const sendVerificationEmail = async (email: string, verificationLink: string): Promise<boolean> => {
//   const subject = 'Emailingizni tasdiqlang';
//   const text = `Email manzilingizni tasdiqlash uchun quyidagi havolani bosing:\n\n${verificationLink}\n\nAgar siz bu so'rovni yubormagan bo'lsangiz, bu xabarga e'tibor bermang.`;
  
//   return sendEmail(email, subject, text);
// };

// /**
//  * Parolni tiklash uchun xabar yuborish
//  */
// export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
//   const subject = 'Parolni tiklash so\'rovi';
//   const text = `Parolingizni tiklash uchun quyidagi havolani bosing:\n\n${resetLink}\n\nAgar bu so'rov sizdan bo'lmagan bo'lsa, iltimos, bu emailni e'tiborsiz qoldiring.`;
  
//   return sendEmail(email, subject, text);
// };

// /**
//  * Yangi foydalanuvchi ro'yxatdan o'tganda xush kelibsiz xabari
//  */
// export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
//   const subject = 'Raska platformasiga xush kelibsiz!';
//   const text = `Hurmatli ${name},\n\nRaska platformasiga ro'yxatdan o'tganingiz uchun tashakkur!\n\nPlatformadan to'liq foydalanish uchun email manzilingizni tasdiqlang.\n\nHurmat bilan,\nRaska jamoasi`;
  
//   return sendEmail(email, subject, text);
// };

// /**
//  * Parol muvaffaqiyatli o'zgartirilganda xabar yuborish
//  */
// export const sendPasswordChangedEmail = async (email: string): Promise<boolean> => {
//   const subject = 'Parolingiz o\'zgartirildi';
//   const text = `Hurmatli foydalanuvchi,\n\nSizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.\n\nAgar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.\n\nHurmat bilan,\nRaska jamoasi`;
  
//   return sendEmail(email, subject, text);
// };

// /**
//  * Adminlarga yangi foydalanuvchi haqida xabar berish
//  */
// export const sendNewUserNotification = async (adminEmail: string, userEmail: string): Promise<boolean> => {
//   const subject = 'Yangi foydalanuvchi ro\'yxatdan o\'tdi';
//   const text = `Admin,\n\nYangi foydalanuvchi ro'yxatdan o'tdi: ${userEmail}\n\nPlatforma admin panelidan batafsil ko'rishingiz mumkin.`;
  
//   return sendEmail(adminEmail, subject, text);
// };

// export default sendEmail;
