// app/api/test-email/route.ts (POST)
import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Email yuborish
    await sendEmail("abdurasulodiljanov@gmail.com", "Test Email", "Bu test email xabari");
    return NextResponse.json({ message: "Email yuborildi!" }, { status: 200 });
  } catch (error) {
    console.error("Email yuborishda xato:", error);
    return NextResponse.json({ message: "Email yuborishda xatolik yuz berdi" }, { status: 500 });
  }
}
