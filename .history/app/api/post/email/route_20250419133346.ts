
// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function POST(request: NextRequest) {
//   try {
//     const job = await request.json();
//     console.log("📨 obuna bo`lganiniz qabul qilindi:", job);

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Obuna bo'lgan foydalanuvchilarni olish
//     const isSubscribed = await db
//       .collection("users")
//       .find({ isSubscribed: true }) // <<< MUHIM TO‘G‘RILASH
//       .toArray();

//     console.log("👥 Obunachilar soni:", isSubscribed.length);

//     const emailPromises = isSubscribed.map((user) => {
//       const to = user.email;
//       const subject = `🔔 obuna: ${user.name}`;
//       const text = `Assalomu alaykum ${user.name || ''}, Raska Jobga obuna bolganingiz uchun minnatdormiz`;
// ;
//       return sendEmail(to, subject, text);
//     });

//     const results = await Promise.allSettled(emailPromises);
//     results.forEach((result) => {
//       if (result.status === "rejected") {
//         console.error("Xatolik yuz berdi:", result.reason);
//       }
//     });

//     return NextResponse.json({ message: "Emaillar yuborildi" }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Email yuborishda xato:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/lib/email";
import { ObjectId } from "mongodb"; // ObjectId kerak bo‘ladi

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json(); // Frontenddan userId keladi deb faraz qilamiz

    const client = await clientPromise;
    const db = client.db("raska");

    // Faqat shu userni topamiz
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    // User obuna bo'lgan bo‘lsa, email yuboramiz
    if (user.isSubscribed) {
      const subject = `🔔 Obuna faollashtirildi`;
      const text = `Assalomu alaykum ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Rahmat!`;

      await sendEmail(user.email, subject, text);

      return NextResponse.json({ message: "Email yuborildi" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User hali obuna bo‘lmagan" }, { status: 400 });
    }
  } catch (err) {
    console.error("❌ Email yuborishda xato:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}









// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";
// import { ObjectId } from "mongodb";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log("🧾 Kelgan request:", body);

//     const { userId } = body;

//     if (!userId || !ObjectId.isValid(userId)) {
//       return NextResponse.json({ error: "Noto‘g‘ri yoki yo‘q userId" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

//     if (!user) {
//       return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
//     }

//     if (user.isSubscribed) {
//       const subject = `🔔 Obuna faollashtirildi`;
//       const text = `Assalomu alaykum ${user.name || ""}, siz Raska Job xizmatiga muvaffaqiyatli obuna bo‘ldingiz. Rahmat!`;

//       await sendEmail(user.email, subject, text);

//       return NextResponse.json({ message: "Email yuborildi" }, { status: 200 });
//     } else {
//       return NextResponse.json({ message: "User hali obuna bo‘lmagan" }, { status: 400 });
//     }
//   } catch (err) {
//     console.error("❌ Email yuborishda xato:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }











// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await request.json();
//     console.log("📩 Obunani yoqqan userId:", userId);

//     if (!userId) {
//       return NextResponse.json({ error: "userId yuborilmadi" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

//     if (!user) {
//       return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
//     }

//     if (!user.email) {
//       return NextResponse.json({ error: "Foydalanuvchida email yo‘q" }, { status: 400 });
//     }

//     const to = user.email;
//     const subject = "Raska: Obunangiz faollashtirildi";
//     const text = `Assalomu alaykum ${user.name || "foydalanuvchi"},\n\nSiz Raska platformasida yangi ish e'lonlariga muvaffaqiyatli obuna bo‘ldingiz.\n\nHurmat bilan,\nRaska jamoasi`;

//     await sendEmail(to, subject, text);

//     return NextResponse.json({ message: "Email yuborildi ✅" }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Email yuborishda xato:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }








// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import sendEmail from '@/lib/email';
// import { ObjectId } from 'mongodb';

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await req.json();

//     if (!userId) {
//       return NextResponse.json({ error: 'userId kerak' }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

//     if (!user || !user.email) {
//       return NextResponse.json({ error: 'Foydalanuvchi topilmadi' }, { status: 404 });
//     }

//     const to = user.email;
//     const subject = 'Raska: Obunangiz faollashtirildi';
//     const text = `Hurmatli ${user.name || 'foydalanuvchi'},\n\nSiz Raska platformasida yangi ish e'lonlariga obuna bo'ldingiz.\n\nHurmat bilan,\nRaska jamoasi`;

//     await sendEmail(to, subject, text);

//     return NextResponse.json({ message: 'Email yuborildi' }, { status: 200 });
//   } catch (error) {
//     console.error('Email yuborishda xato:', error);
//     return NextResponse.json({ error: 'Server xatosi' }, { status: 500 });
//   }
// }

// ishlagan kod

// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import sendEmail from '@/lib/email';
// import { ObjectId } from 'mongodb';

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await req.json();

//     if (!userId) {
//       return NextResponse.json({ error: 'userId kerak' }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

//     if (!user || !user.email) {
//       return NextResponse.json({ error: 'Foydalanuvchi topilmadi' }, { status: 404 });
//     }

//     const to = user.email;
//     const subject = 'Raska: Obunangiz faollashtirildi';
//     const text = `Hurmatli ${user.name || 'foydalanuvchi'},\n\nSiz Raska platformasida yangi ish e'lonlariga obuna bo'ldingiz.\n\nHurmat bilan,\nRaska jamoasi`;

//     await sendEmail(to, subject, text);

//     return NextResponse.json({ message: 'Email yuborildi' }, { status: 200 });
//   } catch (error) {
//     console.error('Email yuborishda xato:', error);
//     return NextResponse.json({ error: 'Server xatosi' }, { status: 500 });
//   }
// }

