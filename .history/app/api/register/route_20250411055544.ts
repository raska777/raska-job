import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("raska"); // sening bazang nomi

    // Avval email mavjudmi tekshiramiz
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email allaqachon ro‘yxatdan o‘tgan!" },
        { status: 400 }
      );
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // Foydalanuvchini qo‘shish
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Ro‘yxatdan muvaffaqiyatli o‘tildi!", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register POST xatolik:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}
