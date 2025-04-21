import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const client = await clientPromise;
    const db = client.db("raska");

    // Foydalanuvchini tekshirish
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email topilmadi" }, { status: 404 });
    }

    // Token yaratish (1 soatlik amal qiladi)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    // Tokenni bazaga saqlash
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          resetToken: token,
          resetTokenExpires: expires,
        },
      }
    );

    // Parolni tiklash havolasi
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    // Email jo'natish
    await sendEmail(
      email,
      "🔐 Parolni tiklash so'rovi",
      `Parolingizni tiklash uchun quyidagi havolani bosing:\n\n${resetUrl}\n\nAgar bu so'rov sizdan bo'lmagan bo'lsa, iltimos, bu emailni e'tiborsiz qoldiring.`
    );

    return NextResponse.json({ message: "Parolni tiklash havolasi yuborildi" });
  } catch (error: any) {
    console.error("Forgot-password xatoligi:", error);
    return NextResponse.json(
      { error: "Server xatosi", details: error.message },
      { status: 500 }
    );
  }
}