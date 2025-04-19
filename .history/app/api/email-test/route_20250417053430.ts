
// import nodemailer from 'nodemailer';

// async function sendTestEmail() {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',  
//       auth: {
//         user: 'rasuljonodiljanov9@gmail.com',
//         pass: 'aexdmptxtwfbodhh' 
//       }
//     });
    
  
//     const mailOptions = {
//       from: 'rasuljonodiljanov9@gmail.com',
//       to: 'abdurasulodiljanov@gmail.com',
//       subject: 'Test Email',
//       text: 'test Email! !'
//     };
  
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent: ' + info.response);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
  
//   sendTestEmail();
//-----2-------------
// lib/sendTestEmail.ts

import nodemailer from 'nodemailer';

export async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // ⛔ Xavfsizlik uchun .env fayldan olamiz
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'abdurasulodiljanov@gmail.com',
      subject: 'Test Email',
      text: 'Test Email!',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email yuborildi:', info.response);
  } catch (error) {
    console.error('❌ Email yuborishda xatolik:', error);
  }
}
