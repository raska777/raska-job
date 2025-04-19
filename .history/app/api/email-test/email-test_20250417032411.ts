import nodemailer from 'nodemailer';

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Gmail xizmati
    auth: {
      user: 'rasulodiljanov9@gmail.com',  // Email manzilingiz
      pass: 'your-generated-app-password',  // Maxsus yaratilgan App Password
    },
  });

  const mailOptions = {
    from: 'rasulodiljanov9@gmail.com',  // Yuboruvchi manzil
    to: 'abdurasulodiljanov@gmail.com',  // Qabul qiluvchi manzil
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js!',  // Matnli xabar
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);  // Muvaffaqiyatli yuborilgan xabar
  } catch (error) {
    console.error('Error sending email:', error.message);  // Xato xabari
    console.error(error);  // Xato haqida batafsil ma'lumot
  }
}

sendTestEmail();
