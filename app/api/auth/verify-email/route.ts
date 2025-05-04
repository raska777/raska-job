import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    // 📌 Token yaratish va hashlash
    const rawToken = uuidv4();
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 soat

    // 🔄 DBga saqlash
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          verificationToken: hashedToken,
          verificationExpires: expires,
        },
      }
    );

    // 🔗 Email link yaratish
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${rawToken}`;

    // 📬 Email yuborish
    await sendVerificationEmail(session.user.email, verifyUrl);

    return NextResponse.json({ success: true, message: "Tasdiqlash emaili yuborildi" });
  } catch (error) {
    console.error("verify-email POST xato:", error);
    return NextResponse.json({ error: "Server xatoligi" }, { status: 500 });
  }
}
