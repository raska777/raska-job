import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";
import crypto from "crypto";
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit tekshiruvi
    const ip = req.headers.get('x-forwarded-for') || req.ip;
    const { isRateLimited } = await rateLimit(ip);
    if (isRateLimited) {
      return NextResponse.json({ error: "Juda ko'p so'rovlar" }, { status: 429 });
    }

    const { email } = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    // Foydalanuvchini tekshirish (lekin xabar bermaslik)
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      // Xavfsizlik uchun har doim bir xil javob
      return NextResponse.json({ 
        message: "Agar bu email ro'yxatdan o'tgan bo'lsa, parolni tiklash havolasi yuborildi" 
      });
    }

    // Avvalgi tokenlarni tozalash
    await db.collection("users").updateOne(
      { email },
      { $unset: { resetToken: "", resetTokenExpires: "" } }
    );

    // Yangi token yaratish (1 soatlik)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    // Tokenni bazaga saqlash
    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpires: expires } }
    );

    // Parolni tiklash havolasi
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    // Email jo'natish (faqat ro'yxatdan o'tgan emailga)
    await sendEmail(
      email,
      "🔐 Parolni tiklash so'rovi",
      `Parolingizni tiklash uchun quyidagi havolani bosing:\n\n${resetUrl}\n\nHavola 1 soatdan keyin bekor bo'ladi.\n\nAgar bu so'rov sizdan bo'lmagan bo'lsa, iltimos, bu emailni e'tiborsiz qoldiring.`
    );

    return NextResponse.json({ 
      message: "Agar bu email ro'yxatdan o'tgan bo'lsa, parolni tiklash havolasi yuborildi" 
    });
  } catch (error) {
    console.error("Xato:", error);
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    );
  }
}