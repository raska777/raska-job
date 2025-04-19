// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";

// // GET - obuna holatini olish
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ isSubscribed: false }, { status: 200 });
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");
//     const user = await db.collection("users").findOne({ email: session.user.email });

//     return NextResponse.json(
//       { isSubscribed: user?.isSubscribed ?? false },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error("Obuna holatini olishda xato:", error);
//     return NextResponse.json(
//       { error: "Server xatosi", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - obuna holatini almashtirish
// export async function PATCH() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { error: "Avtorizatsiya talab qilinadi" },
//         { status: 401 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const user = await db.collection("users").findOne({ email: session.user.email });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Foydalanuvchi topilmadi" },
//         { status: 404 }
//       );
//     }

//     const newStatus = !(user.isSubscribed ?? false);

//     await db.collection("users").updateOne(
//       { email: session.user.email },
//       { $set: { isSubscribed: newStatus } }
//     );

//     return NextResponse.json(
//       { isSubscribed: newStatus },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error("Obunani yangilashda xato:", error);
//     return NextResponse.json(
//       { error: "Server xatosi", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email"; // Email funksiyasini import qilamiz

export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Avtorizatsiya talab qilinadi" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    const newStatus = !(user.isSubscribed ?? false);

    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { isSubscribed: newStatus } }
    );

    // 👇 Email yuborish faqat obuna bo‘lganda (true)
    if (newStatus) {
      const subject = "🔔 Obunangiz faollashtirildi!";
      const text = `Salom ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Endi siz yangiliklar haqida birinchilardan bo‘lib xabardor bo‘lasiz!`;

      try {
        await sendEmail(user.email, subject, text);
        console.log("✅ Email yuborildi:", user.email);
      } catch (emailError) {
        console.error("📭 Email yuborishda xato:", emailError);
        // ixtiyoriy: email xatoligini frontendga yubormasdan log qilish yetarli
      }
    }

    return NextResponse.json({ isSubscribed: newStatus }, { status: 200 });
  } catch (error: unknown) {
    console.error("Obunani yangilashda xato:", error);
    return NextResponse.json(
      { error: "Server xatosi", details: (error as Error).message },
      { status: 500 }
    );
  }
}
