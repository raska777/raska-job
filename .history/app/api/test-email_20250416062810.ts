import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Email yuborish
      await sendEmail("abdurasulodiljanov@gmail.com", "Test Email", "Bu test email xabari");
      res.status(200).json({ message: "Email yuborildi!" });
    } catch (error) {
      console.error("Email yuborishda xato:", error);
      res.status(500).json({ message: "Email yuborishda xatolik yuz berdi" });
    }
  } else {
    res.status(405).json({ message: "Faqat POST so'rovlari qabul qilinadi" });
  }
}
