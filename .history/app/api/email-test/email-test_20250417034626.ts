import * as nodemailer from 'nodemailer';

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,  // TLS
    secure: false, // TLS uchun false
    auth: {
      user: 'rasulodiljanov9@gmail.com',
      pass: 'qbezwyphlzrxgfoq', // App Password
    },
  });
  

  const mailOptions = {
    from: 'rasuljonodiljanov9@gmail.com',
    to: 'abdurasulodiljanov@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js!'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
