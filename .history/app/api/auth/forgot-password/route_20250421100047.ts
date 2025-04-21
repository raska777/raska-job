

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";
import crypto from "crypto";

// Rate limit funksiyasini shu faylga qo'shamiz
const limits = new Map<string, { count: number; expiresAt: number }>();

async function rateLimit(ip: string | null) {
  // Agar IP bo'lmasa, cheklov qo'ymaymiz
  if (!ip) {
    return { isRateLimited: false };
  }

  // So'rovlar chegarasi (5 ta/1 daqiqa)
  const limit = 5;
  const window = 60 * 1000; // 1 daqiqa (millisekundlarda)

  const now = Date.now();
  const entry = limits.get(ip);

  if (entry) {
    // Agar hali vaqt o'tmagan bo'lsa
    if (now < entry.expiresAt) {
      // Agar chegaradan oshib ketgan bo'lsa
      if (entry.count >= limit) {
        return { isRateLimited: true };
      }
      // So'rovlar sonini oshiramiz
      limits.set(ip, { ...entry, count: entry.count + 1 });
    } else {
      // Vaqt o'tgan bo'lsa, eski yozuvni o'chiramiz
      limits.delete(ip);
      // Yangi yozuv qo'shamiz
      limits.set(ip, { count: 1, expiresAt: now + window });
    }
  } else {
    // Yangi IP uchun yozuv yaratamiz
    limits.set(ip, { count: 1, expiresAt: now + window });
  }

  return { isRateLimited: false };
}

export async function POST(req: Request) {
  try {
    // Rate limit tekshiruvi
    const ip = req.headers.get('x-forwarded-for');
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
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${encodeURIComponent(token)}`;

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