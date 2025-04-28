

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";

// ✅ GET — Obuna holatini olish
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Avtorizatsiya talab qilinadi" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ isSubscribed: user.isSubscribed ?? false }, { status: 200 });
  } catch (error: any) {
    console.error("Obuna holatini olishda xato:", error);
    return NextResponse.json({ error: "Server xatosi", details: error.message }, { status: 500 });
  }
}

// ✅ PATCH — Obuna holatini almashtirish (siz yozgan)
export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Avtorizatsiya talab qilinadi" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    const oldStatus = user.isSubscribed ?? false;
    const newStatus = !oldStatus;

    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { isSubscribed: newStatus } }
    );

    // Faqat ilk obuna bo‘lsa email yuboriladi
    // if (!oldStatus && newStatus) {
    //   const subject = "🔔 Obunangiz faollashtirildi!";
    //   const text = `Salom ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Endi siz yangiliklar haqida birinchilardan bo‘lib xabardor bo‘lasiz!`;
    if (!oldStatus && newStatus) {
      const subject = "🔔 라스카 잡 구독 활성화 완료!";
      const text = `안녕하세요 ${user.name || "고객"}님, 라스카 잡 서비스 구독이 성공적으로 완료되었습니다 ✨
      
    이제 최신 일자리 정보를 가장 빠르게 받아보실 수 있습니다!
      
    [라스카 잡 바로가기] → https://raska-job.vercel.app
      
    감사합니다.
    라스카 팀 드림`;

      try {
        await sendEmail(user.email, subject, text);
        console.log("✅ Email yuborildi:", user.email);
      } catch (emailError) {
        console.error("📭 Email yuborishda xatolik:", emailError);
      }
    }

    return NextResponse.json({ isSubscribed: newStatus }, { status: 200 });
  } catch (error: any) {
    console.error("Obunani yangilashda xato:", error);
    return NextResponse.json({ error: "Server xatosi", details: error.message }, { status: 500 });
  }
}


