import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    const client = await clientPromise;
    const db = client.db("raska");

    // Foydalanuvchini token bo'yicha topish
    const user = await db.collection("users").findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Yaroqsiz yoki muddati o'tgan token" },
        { status: 400 }
      );
    }

    // Yangi parolni hash qilish
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Parolni yangilash va tokenni o'chirish
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword
        },
        $unset: {
          resetToken: "",
          resetTokenExpires: ""
        }
      }
    );

    return NextResponse.json({ message: "Parol muvaffaqiyatli o'zgartirildi" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Server xatosi", details: error.message },
      { status: 500 }
    );
  }
}