import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('EMAIL_USER va EMAIL_PASS kerak');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * HTML faylni o'qib, {{placeholder}} larni almashtirish
 */
const renderTemplate = (filename: string, variables: Record<string, string>) => {
  const filePath = path.join(__dirname, 'templates', filename);
  let html = fs.readFileSync(filePath, 'utf-8');

  Object.keys(variables).forEach((key) => {
    const pattern = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(pattern, variables[key]);
  });

  return html;
};

/**
 * Email yuborish
 */
export const sendEmail = async (to: string, subject: string, htmlContent: string): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: `"Raska Platformasi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log('✅ Email yuborildi:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email yuborishda xato:', error);
    return false;
  }
};

/**
 * Welcome Email yuborish
 */
export const sendWelcomeEmail = async (email: string, name: string, verifyLink: string) => {
  const html = renderTemplate('welcome.html', { name, verifyLink });
  return sendEmail(email, `👋 Xush kelibsiz, ${name}`, html);
};
