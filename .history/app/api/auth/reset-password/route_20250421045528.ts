import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() }, // hali amal qilayotgan token
    });

    if (!user) {
      return NextResponse.json({ error: "Token yaroqsiz yoki muddati tugagan" }, { status: 400 });
    }

    const hashedPassword = await hash(newPassword, 10);

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpires: "" },
      }
    );

    return NextResponse.json({ message: "Parol muvaffaqiyatli tiklandi" });
  } catch (error: any) {
    console.error("Reset-password xatoligi:", error);
    return NextResponse.json({ error: "Server xatosi", details: error.message }, { status: 500 });
  }
}
