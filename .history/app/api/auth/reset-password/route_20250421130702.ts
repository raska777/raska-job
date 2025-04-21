// // import { NextResponse } from "next/server";
// // import clientPromise from "@/lib/mongodb";
// // import bcrypt from "bcryptjs";

// // export async function POST(req: Request) {
// //   try {
// //     const { token, newPassword } = await req.json();

// //     const client = await clientPromise;
// //     const db = client.db("raska");

// //     // Foydalanuvchini token bo'yicha topish
// //     const user = await db.collection("users").findOne({
// //       resetToken: token,
// //       resetTokenExpires: { $gt: new Date() }
// //     });

// //     if (!user) {
// //       return NextResponse.json(
// //         { error: "Yaroqsiz yoki muddati o'tgan token" },
// //         { status: 400 }
// //       );
// //     }

// //     // Yangi parolni hash qilish
// //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// //     // Parolni yangilash va tokenni o'chirish
// //     await db.collection("users").updateOne(
// //       { _id: user._id },
// //       {
// //         $set: {
// //           password: hashedPassword
// //         },
// //         $unset: {
// //           resetToken: "",
// //           resetTokenExpires: ""
// //         }
// //       }
// //     );

// //     return NextResponse.json({ message: "Parol muvaffaqiyatli o'zgartirildi" });
// //   } catch (error: any) {
// //     console.error("Reset password error:", error);
// //     return NextResponse.json(
// //       { error: "Server xatosi", details: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { hash } from 'bcryptjs';
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req: Request) {
//   const { token, newPassword } = await req.json();

//   if (!token || !newPassword) {
//     return NextResponse.json({ error: "Token yoki yangi parol yo'q" }, { status: 400 });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({ resetToken: token });

//     if (!user) {
//       return NextResponse.json({ error: "Token noto‘g‘ri yoki muddati tugagan" }, { status: 400 });
//     }

//     if (user.resetExpires < new Date()) {
//       return NextResponse.json({ error: "Token muddati tugagan" }, { status: 400 });
//     }

//     const hashedPassword = await hash(newPassword, 10);

//     await db.collection('users').updateOne(
//       { _id: user._id },
//       {
//         $set: { password: hashedPassword },
//         $unset: { resetToken: "", resetExpires: "" }
//       }
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server'; // NextRequest import qilindi

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ error: "Token yoki yangi parol yo'q" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('raska');

    const user = await db.collection('users').findOne({ resetToken: token });

    if (!user) {
      return NextResponse.json({ error: "Token noto‘g‘ri yoki muddati tugagan" }, { status: 400 });
    }

    if (user.resetExpires < new Date()) {
      return NextResponse.json({ error: "Token muddati tugagan" }, { status: 400 });
    }

    const hashedPassword = await hash(newPassword, 10);

    const result = await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetExpires: "" },
      }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      // Agar hech qanday foydalanuvchi yangilanmagan bo'lsa, bu kutilmagan holat
      return NextResponse.json({ error: "Parol yangilanmadi" }, { status: 500 });
    }
  } catch (error) {
    console.error("Parolni tiklashda server xatosi:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}