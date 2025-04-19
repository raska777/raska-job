// lib/email.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: `"RaskaJob" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,
  });
};

export default sendEmail;
