
// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json();

//     // Validatsiyalar (eski kod)
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { error: "Barcha maydonlarni to'ldirish shart" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Email tekshirish (eski kod)
//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Bu email allaqachon ro'yxatdan o'tgan!" },
//         { status: 400 }
//       );
//     }

//     // Parolni hash qilish (eski kod)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Yangi foydalanuvchi qo'shish (eski kod + yangi maydonlar)
//     const result = await db.collection("users").insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//       updatedAt: new Date(), // Yangi qo'shilgan
//       agreedToTerms: true,   // Frontenddan keladi, default true
//       emailVerified: false   // Yangi qo'shilgan
//     });

//     // Javob (eski kod)
//     return NextResponse.json(
//       { 
//         message: "Ro'yxatdan muvaffaqiyatli o'tildi!", 
//         userId: result.insertedId 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Register POST xatolik:", error);
//     return NextResponse.json(
//       { error: "Server xatosi!" }, 
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import { sendWelcomeEmail } from "@/lib/email"; // 💌 Import qilingan

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { error: "Barcha maydonlarni to'ldirish shart" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Bu email allaqachon ro'yxatdan o'tgan!" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await db.collection("users").insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       agreedToTerms: true,
//       emailVerified: false
//     });

//     // 💌 Welcome Email yuboriladi
//     await sendWelcomeEmail(email, name);

//     return NextResponse.json(
//       { 
//         message: "Ro'yxatdan muvaffaqiyatli o'tildi!", 
//         userId: result.insertedId 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Register POST xatolik:", error);
//     return NextResponse.json(
//       { error: "Server xatosi!" }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email"; // 💌 임포트 완료

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "모든 필드를 작성해 주세요" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "이 이메일은 이미 등록되어 있습니다!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      agreedToTerms: true,
      emailVerified: false
    });

    // 💌 환영 이메일 전송
    await sendWelcomeEmail(email, name);

    return NextResponse.json(
      { 
        message: "회원가입이 성공적으로 완료되었습니다!", 
        userId: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 POST 오류:", error);
    return NextResponse.json(
      { error: "서버 오류 발생!" }, 
      { status: 500 }
    );
  }
}