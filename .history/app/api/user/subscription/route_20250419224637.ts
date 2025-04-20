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

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import sendEmail from "@/lib/email"; // Email funksiyasini import qilamiz

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

//     // 👇 Email yuborish faqat obuna bo‘lganda (true)
//     if (newStatus) {
//       const subject = "🔔 Obunangiz faollashtirildi!";
//       const text = `Salom ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Endi siz yangiliklar haqida birinchilardan bo‘lib xabardor bo‘lasiz!`;

//       try {
//         await sendEmail(user.email, subject, text);
//         console.log("✅ Email yuborildi:", user.email);
//       } catch (emailError) {
//         console.error("📭 Email yuborishda xato:", emailError);
//         // ixtiyoriy: email xatoligini frontendga yubormasdan log qilish yetarli
//       }
//     }

//     return NextResponse.json({ isSubscribed: newStatus }, { status: 200 });
//   } catch (error: unknown) {
//     console.error("Obunani yangilashda xato:", error);
//     return NextResponse.json(
//       { error: "Server xatosi", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import sendEmail from "@/lib/email"; // Email funksiyasini import qilamiz

// export async function PATCH() {
//   try {
//     // Sessiyani olish
//     const session = await getServerSession(authOptions);

//     // Agar foydalanuvchi tizimga kirgan bo'lmasa
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { error: "Avtorizatsiya talab qilinadi" },
//         { status: 401 }
//       );
//     }

//     // MongoDB ulanishi
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Foydalanuvchini email orqali topish
//     const user = await db.collection("users").findOne({ email: session.user.email });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Foydalanuvchi topilmadi" },
//         { status: 404 }
//       );
//     }

//     // Obuna holatini teskari qilish
//     const newStatus = !(user.isSubscribed ?? false);

//     // Yangilangan obuna holatini MongoDB'ga saqlash
//     await db.collection("users").updateOne(
//       { email: session.user.email },
//       { $set: { isSubscribed: newStatus } }
//     );

//     // Obuna faollashgan bo'lsa, email yuborish
//     if (newStatus) {
//       const subject = "🔔 Obunangiz faollashtirildi!";
//       const text = `Salom ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Endi siz yangiliklar haqida birinchilardan bo‘lib xabardor bo‘lasiz!`;

//       try {
//         // Email yuborish
//         await sendEmail(user.email, subject, text);
//         console.log("✅ Email yuborildi:", user.email);
//       } catch (emailError) {
//         console.error("📭 Email yuborishda xatolik:", emailError);
//         // Email yuborishda xato bo'lsa, frontendga xatolikni yubormaslik
//         // Faqat log qilish
//       }
//     }

//     // Yangi obuna holatini frontendga qaytarish
//     return NextResponse.json({ isSubscribed: newStatus }, { status: 200 });
//   } catch (error: unknown) {
//     console.error("Obunani yangilashda xato:", error);
//     return NextResponse.json(
//       { error: "Server xatosi", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }


//zamonaviy
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import clientPromise from '@/lib/mongodb';

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { error: 'Avtorizatsiya talab qilinadi' },
//         { status: 401 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({ email: session.user.email });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Foydalanuvchi topilmadi' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ isSubscribed: user.isSubscribed ?? false });
//   } catch (error: any) {
//     console.error('Obuna holatini olishda xato:', error);
//     return NextResponse.json(
//       { error: 'Server xatosi', details: error.message },
//       { status: 500 }
//     );
//   }
// }


const session = await getServerSession(authOptions);
const email = session?.user?.email;

if (!email) {
  return NextResponse.json(
    { error: "Avtorizatsiya talab qilinadi" },
    { status: 401 }
  );
}

const client = await clientPromise;
const db = client.db("raska");

const user = await db.collection("users").findOne({ email });

if (!user) {
  return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
}

const newStatus = typeof user.isSubscribed === "boolean" ? !user.isSubscribed : true;
await db.collection("users").updateOne({ email }, { $set: { isSubscribed: newStatus } });

if (newStatus) {
  const subject = "🔔 Obunangiz faollashtirildi!";
  const text = `Salom ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz.`;

  try {
    await sendEmail(email, subject, text);
  } catch (err) {
    console.error("Email yuborishda xatolik:", err);
  }
}

return NextResponse.json({ isSubscribed: newStatus }, { status: 200 });
