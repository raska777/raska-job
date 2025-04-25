

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
      from: `"Raska 플랫폼" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`,
      priority: 'high',
    });

    console.log("✅ 이메일 성공적으로 전송됨!", info.messageId);
    return true;
  } catch (err: unknown) {
    console.error("이메일 전송 중 오류:", err);

    if (err instanceof Error) {
      throw new Error(`이메일 전송 중 오류: ${err.message}`);
    }

    throw new Error('알 수 없는 이메일 전송 오류가 발생했습니다.');
  }
};

/**
 * 이메일 인증
 */
export const sendVerificationEmail = async (email: string, verificationLink: string): Promise<boolean> => {
  const subject = '✅ 이메일을 인증해주세요 - Raska 플랫폼';
  const text = `안녕하세요,\n\nRaska 플랫폼에 가입해주셔서 감사합니다.\n\n계정을 활성화하려면 아래 링크를 클릭하세요:\n\n${verificationLink}\n\n링크가 작동하지 않으면 복사해서 브라우저에 붙여넣기 해주세요.\n\n감사합니다.\nRaska 팀 드림`;
  const html = `<p>안녕하세요,</p><p>Raska 플랫폼에 가입해주셔서 감사합니다!</p><p>계정을 활성화하려면 아래 버튼을 클릭하세요.</p><p><a href="${verificationLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">이메일 인증하기</a></p><p>버튼이 작동하지 않으면 아래 링크를 복사해서 붙여넣어 주세요:<br>${verificationLink}</p><p>감사합니다.<br>Raska 팀 드림</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * 비밀번호 재설정
 */
export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
  const subject = '🔑 비밀번호 재설정 요청 - Raska 플랫폼';
  const text = `안녕하세요,\n\n회원님의 계정에 대해 비밀번호 재설정 요청이 접수되었습니다.\n\n아래 링크를 클릭하여 새 비밀번호를 설정해 주세요:\n\n${resetLink}\n\n요청하지 않으셨다면 이 메일을 무시하셔도 됩니다.\n\n감사합니다.\nRaska 팀 드림`;
  const html = `<p>안녕하세요,</p><p>회원님의 계정에 대해 비밀번호 재설정 요청이 접수되었습니다.</p><p><a href="${resetLink}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">비밀번호 재설정</a></p><p>요청하지 않으셨다면 이 메일을 무시하셔도 됩니다.</p><p>감사합니다.<br>Raska 팀 드림</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * 환영 이메일
 */
export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  const subject = `👋 ${name}님, Raska 플랫폼에 오신 것을 환영합니다!`;
  const text = `안녕하세요 ${name}님,\n\nRaska 플랫폼에 가입해주셔서 진심으로 감사합니다!\n\n이제 다양한 기능을 자유롭게 이용하실 수 있습니다. 이메일 인증을 완료하지 않으셨다면 꼭 인증해 주세요.\n\n감사합니다.\nRaska 팀 드림`;
  const html = `<p>안녕하세요 ${name}님,</p><p>Raska 플랫폼에 오신 것을 환영합니다!</p><p>이제 다양한 서비스를 이용하실 수 있습니다. 이메일 인증을 완료하지 않으셨다면 꼭 진행해 주세요.</p><p>감사합니다.<br>Raska 팀 드림</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * 비밀번호 변경 완료
 */
export const sendPasswordChangedEmail = async (email: string): Promise<boolean> => {
  const subject = '🔒 비밀번호가 성공적으로 변경되었습니다 - Raska 플랫폼';
  const text = `안녕하세요,\n\n회원님의 비밀번호가 성공적으로 변경되었습니다.\n\n변경하신 적이 없다면 즉시 저희에게 알려주세요.\n\n감사합니다.\nRaska 팀 드림`;
  const html = `<p>안녕하세요,</p><p>회원님의 비밀번호가 성공적으로 변경되었습니다.</p><p><strong>주의:</strong> 본인이 변경하지 않으셨다면 즉시 연락해 주세요.</p><p>감사합니다.<br>Raska 팀 드림</p>`;

  return sendEmail(email, subject, text, html);
};

/**
 * 관리자에게 새 사용자 알림
 */
export const sendNewUserNotification = async (adminEmail: string, userEmail: string): Promise<boolean> => {
  const subject = '👤 새로운 사용자가 가입했습니다 - Raska 플랫폼';
  const text = `안녕하세요 관리자님,\n\n새로운 사용자가 가입했습니다:\n이메일: ${userEmail}\n\n관리자 페이지에서 자세한 정보를 확인해 주세요.`;
  const html = `<p>안녕하세요 관리자님,</p><p>새로운 사용자가 가입했습니다:<br><strong>${userEmail}</strong></p><p><a href="[ADMIN_PANEL_LINK]">관리자 페이지</a>에서 확인하실 수 있습니다.</p><p>감사합니다.<br>Raska 팀 드림</p>`;

  return sendEmail(adminEmail, subject, text, html);
};

export default sendEmail;



// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//   throw new Error('EMAIL_USER va EMAIL_PASS environment variablelari talab qilinadi');
// }

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   pool: true,
//   maxConnections: 1,
//   rateDelta: 20000,
//   rateLimit: 5,
// });

// /**
//  * Asosiy email yuborish funksiyasi
//  */
// export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<boolean> => {
//   try {
//     console.log(`Email yuborilmoqda: ${to}`);

//     const info = await transporter.sendMail({
//       from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`, // Agar html berilmasa, oddiy formatlash
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
//   const subject = '✅ Emailingizni tasdiqlang - Raska Platformasi';
//   const text = `Hurmatli foydalanuvchi,\n\nRaska platformasida ro'yxatdan o'tganingiz uchun tashakkur! Hisobingizni faollashtirish va platformadan to'liq foydalanishni boshlash uchun quyidagi havolani bosing:\n\n${verificationLink}\n\nAgar yuqoridagi tugma ishlamasa, quyidagi havolani brauzeringizga nusxalab o'tkazing:\n${verificationLink}\n\nHurmat bilan,\nRaska jamoasi`;
//   const html = `<p>Hurmatli foydalanuvchi,</p><p>Raska platformasida ro'yxatdan o'tganingiz uchun tashakkur! Hisobingizni faollashtirish va platformadan to'liq foydalanishni boshlash uchun quyidagi tugmani bosing:</p><p><a href="${verificationLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Emailni tasdiqlash</a></p><p>Agar yuqoridagi tugma ishlamasa, quyidagi havolani brauzeringizga nusxalab o'tkazing:<br>${verificationLink}</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

//   return sendEmail(email, subject, text, html);
// };

// /**
//  * Parolni tiklash uchun xabar yuborish
//  */
// export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
//   const subject = '🔑 Parolni tiklash so\'rovi - Raska Platformasi';
//   const text = `Hurmatli foydalanuvchi,\n\nSizning Raska platformasi hisobingiz uchun parolni tiklash so'rovi olindi. Parolingizni yangilash uchun quyidagi havolani bosing:\n\n${resetLink}\n\nAgar siz bu so'rovni yubormagan bo'lsangiz, ushbu emailni e'tiborsiz qoldiring. Sizning hisobingiz xavfsizligicha qoladi.\n\nHurmat bilan,\nRaska jamoasi`;
//   const html = `<p>Hurmatli foydalanuvchi,</p><p>Sizning Raska platformasi hisobingiz uchun parolni tiklash so'rovi olindi. Parolingizni yangilash uchun quyidagi tugmani bosing:</p><p><a href="${resetLink}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Parolni tiklash</a></p><p>Agar siz bu so'rovni yubormagan bo'lsangiz, ushbu emailni e'tiborsiz qoldiring. Sizning hisobingiz xavfsizligicha qoladi.</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

//   return sendEmail(email, subject, text, html);
// };

// /**
//  * Yangi foydalanuvchi ro'yxatdan o'tganda xush kelibsiz xabari
//  */
// export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
//   const subject = `👋 Raska platformasiga xush kelibsiz, ${name}!`;
//   const text = `Hurmatli ${name},\n\nRaska platformasiga muvaffaqiyatli ro'yxatdan o'tganingiz bilan tabriklaymiz! Endi siz platformamizning barcha imkoniyatlaridan foydalanishingiz mumkin. Ish boshlash uchun email manzilingizni tasdiqlashni unutmang (agar allaqachon tasdiqlamagan bo'lsangiz).\n\nHurmat bilan,\nRaska jamoasi`;
//   const html = `<p>Hurmatli ${name},</p><p>Raska platformasiga muvaffaqiyatli ro'yxatdan o'tganingiz bilan tabriklaymiz! Endi siz platformamizning barcha imkoniyatlaridan foydalanishingiz mumkin. Ish boshlash uchun email manzilingizni tasdiqlashni unutmang (agar allaqachon tasdiqlamagan bo'lsangiz).</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

//   return sendEmail(email, subject, text, html);
// };

// /**
//  * Parol muvaffaqiyatli o'zgartirilganda xabar yuborish
//  */
// export const sendPasswordChangedEmail = async (email: string): Promise<boolean> => {
//   const subject = '🔒 Parolingiz muvaffaqiyatli o\'zgartirildi - Raska Platformasi';
//   const text = `Hurmatli foydalanuvchi,\n\nSizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.\n\nAgar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.\n\nHurmat bilan,\nRaska jamoasi`;
//   const html = `<p>Hurmatli foydalanuvchi,</p><p>Sizning hisobingiz paroli muvaffaqiyatli o'zgartirildi.</p><p><b>Muhim:</b> Agar bu harakat siz tomonidan amalga oshirilmagan bo'lsa, iltimos, darhol biz bilan bog'laning.</p><p>Hurmat bilan,<br>Raska jamoasi</p>`;

//   return sendEmail(email, subject, text, html);
// };

// /**
//  * Adminlarga yangi foydalanuvchi haqida xabar berish
//  */
// export const sendNewUserNotification = async (adminEmail: string, userEmail: string): Promise<boolean> => {
//   const subject = '👤 Yangi foydalanuvchi ro\'yxatdan o\'tdi - Raska Platformasi';
//   const text = `Salom Admin,\n\nRaska platformasida yangi foydalanuvchi ro'yxatdan o'tdi:\nEmail: ${userEmail}\n\nPlatforma admin paneliga kirib, foydalanuvchi haqida batafsil ma'lumot olishingiz mumkin.`;
//   const html = `<p>Salom Admin,</p><p>Raska platformasida yangi foydalanuvchi ro'yxatdan o'tdi:<br>Email: ${userEmail}</p><p>Platforma <a href="[ADMIN PANEL HAVOLASI]">admin paneliga</a> kirib, foydalanuvchi haqida batafsil ma'lumot olishingiz mumkin.</p><p>Raska jamoasi</p>`; // [ADMIN PANEL HAVOLASI] ni o'zgartiring

//   return sendEmail(adminEmail, subject, text, html);
// };

// export default sendEmail;



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
