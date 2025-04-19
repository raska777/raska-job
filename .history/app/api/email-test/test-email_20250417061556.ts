
//app/api/email-test/test-email.ts
import nodemailer from 'nodemailer';

async function sendTestEmail() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',   
      auth: {
        user: 'rasuljonodiljanov9@gmail.com',
        pass: 'aexdmptxtwfbodhh' 
      }
    });
    
  
    const mailOptions = {
      from: 'rasuljonodiljanov9@gmail.com',
      to: 'abdurasulodiljanov@gmail.com',
      subject: 'Test Email',
      text: 'test Email! !'
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  sendTestEmail(); 