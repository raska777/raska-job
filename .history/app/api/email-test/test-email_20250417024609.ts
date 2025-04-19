// app/api/email-test/test-email.ts
import nodemailer from "nodemailer";

const main = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "rasuljonodiljanov9@gmail.com ",
      pass: "qbez wyph lzrx gfoq ",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Raska Platformasi" <raskajob@outlook.kr>',
      to: "abdurasulodiljanov@gmail.com",
      subject: "SMTP test",
      text: "Bu test email xabari",
    });

    console.log("✅ Email yuborildi:", info.response);
  } catch (error: any) {
    console.error("❌ Email yuborishda xato:", error.response || error);
  }
};

main();
