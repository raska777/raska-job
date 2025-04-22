
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
export const sendEmail = async (to: string, subject: string, text: string): Promise<boolean> => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);

    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
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

/**
 * Email tasdiqlash uchun xabar yuborish
 */
export const sendVerificationEmail = async (email: string, verificationLink: string): Promise<boolean> => {
  const subject = '✅ Emailingizni tasdiqlang - Raska Platformasi';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h1 style="color: #4a6baf; text-align: center;">🔄 Email Tasdiqlash</h1>
      <p>Hurmatli foydalanuvchi,</p>
      <p>Raska platformasida ro'yxatdan o'tish uchun quyidagi tugmachani bosing:</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="${verificationLink}" style="background-color: #4a6baf; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Emailni Tasdiqlash</a>
      </div>
      <p>Agar siz bu so'rovni yubormagan bo'lsangiz, ushbu xabarga e'tibor bermang.</p>
      <p style="margin-top: 30px;">Hurmat bilan,<br><strong>Raska Jamoasi</strong> 👋</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">Agar tugmacha ishlamasa, quyidagi havolani brauzerga nusxalang: <br>${verificationLink}</p>
    </div>
  `;
  
  return sendEmail(email, subject, '', html);
};

/**
 * Parolni tiklash uchun xabar yuborish
 */
export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
  const subject = '🔑 Parolni tiklash so\'rovi - Raska';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h1 style="color: #d9534f; text-align: center;">🔐 Parolni Tiklash</h1>
      <p>Hurmatli foydalanuvchi,</p>
      <p>Biz sizning hisobingiz uchun parolni tiklash so'rovini oldik. Yangi parol o'rnatish uchun:</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetLink}" style="background-color: #d9534f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Parolni Tiklash</a>
      </div>
      <p>⚠️ Eslatma: Ushbu havola 1 soat davomida amal qiladi. Agar siz bu so'rovni yubormagan bo'lsangiz, iltimos, bu xabarga e'tibor bermang.</p>
      <p style="margin-top: 30px;">Hurmat bilan,<br><strong>Raska Xavfsizlik Jamoasi</strong> 🛡️</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">Agar tugmacha ishlamasa: ${resetLink}</p>
    </div>
  `;
  
  return sendEmail(email, subject, '', html);
};

/**
 * Yangi foydalanuvchi ro'yxatdan o'tganda xush kelibsiz xabari
 */
export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  const subject = '🎉 Raska Platformasiga Xush Kelibsiz!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #5cb85c; text-align: center;">🌟 Xush Kelibsiz, ${name}!</h1>
      <p style="text-align: center;">Raska hamjamiyatining bir qismi bo'lganingiz uchun tashakkur! 🎊</p>
      
      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #2e7d32; margin-top: 0;">🚀 Boshlash uchun:</h3>
        <ol>
          <li>Profilingizni to'ldiring</li>
          <li>Platforma imkoniyatlarini o'rganing</li>
          <li>Jamoamiz bilan bog'lanib, savollar bering</li>
        </ol>
      </div>
      
      <p>Har qanday savol yoki taklifingiz bo'lsa, javob berishdan mamnun bo'lamiz! 💌</p>
      <p style="margin-top: 30px;">Hurmat bilan,<br><strong>Raska Jamoasi</strong> ✨</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://raska.uz" style="display: inline-block; padding: 10px 20px; background-color: #5cb85c; color: white; text-decoration: none; border-radius: 5px;">Platformaga Kirish</a>
      </div>
    </div>
  `;
  
  return sendEmail(email, subject, '', html);
};

/**
 * Parol muvaffaqiyatli o'zgartirilganda xabar yuborish
 */
export const sendPasswordChangedEmail = async (email: string): Promise<boolean> => {
  const subject = '🔒 Parolingiz Muvaffaqiyatli O\'zgartirildi';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff8f8;">
      <h1 style="color: #d9534f; text-align: center;">🛡️ Parol Yangilandi</h1>
      <p>Hurmatli foydalanuvchi,</p>
      <p>Sizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.</p>
      
      <div style="background-color: #fde8e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #c9302c; margin-top: 0;">⚠️ Diqqat:</h3>
        <p>Agar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.</p>
      </div>
      
      <p>Xavfsizlik maqsadida parolingizni hech kim bilan ulashmang va muntazam ravishda yangilab turishni unutmang.</p>
      <p style="margin-top: 30px;">Hurmat bilan,<br><strong>Raska Xavfsizlik Jamoasi</strong> 🚨</p>
    </div>
  `;
  
  return sendEmail(email, subject, '', html);
};

/**
 * Adminlarga yangi foydalanuvchi haqida xabar berish
 */
export const sendNewUserNotification = async (adminEmail: string, userEmail: string): Promise<boolean> => {
  const subject = '👤 Yangi Foydalanuvchi Ro\'yxatdan O\'tdi';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f0f7ff;">
      <h1 style="color: #337ab7; text-align: center;">📈 Yangi Foydalanuvchi</h1>
      <p>Hurmatli admin,</p>
      <p>Platformada yangi foydalanuvchi ro'yxatdan o'tdi:</p>
      
      <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; font-weight: bold; margin: 0;">📧 ${userEmail}</p>
      </div>
      
      <p>Foydalanuvchi ma'lumotlarini admin panelidan ko'rishingiz mumkin:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://raska.uz/admin/users" style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: white; text-decoration: none; border-radius: 5px;">Admin Paneli</a>
      </div>
      
      <p style="margin-top: 30px;">Hurmat bilan,<br><strong>Raska Tizimi</strong> 🤖</p>
    </div>
  `;
  
  return sendEmail(adminEmail, subject, '', html);
};

// Asosiy sendEmail funksiyasini yangilaymiz (HTML qo'shamiz)
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<boolean> => {
  try {
    console.log(`Email yuborilmoqda: ${to}`);

    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: html ? undefined : text, // Agar html bo'lsa, textni yubormaymiz
      html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`,
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