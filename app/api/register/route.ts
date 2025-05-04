// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import { sendWelcomeEmail } from "@/lib/email";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password, agreedToTerms } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { error: "모든 필드를 작성해 주세요" },
//         { status: 400 }
//       );
//     }

//     if (!agreedToTerms) {
//       return NextResponse.json(
//         { error: "이용약관에 동의해야 합니다." },
//         { status: 400 }
//       );
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "이 이메일은 이미 등록되어 있습니다!" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await db.collection("users").insertOne({
//       name: name.trim(),
//       email: normalizedEmail,
//       password: hashedPassword,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       agreedToTerms: true,
//       emailVerified: false,
//       role: "user",
//       provider: "credentials",
//       isSubscribed: false,
//     });

//     await sendWelcomeEmail(normalizedEmail, name);

//     return NextResponse.json(
//       {
//         message: "회원가입이 성공적으로 완료되었습니다!",
//         userId: result.insertedId,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("회원가입 POST 오류:", error);
//     return NextResponse.json(
//       { error: "서버 오류 발생!" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password, agreedToTerms }: {
      name: string;
      email: string;
      password: string;
      agreedToTerms: boolean;
    } = await req.json();

    // 1️⃣ Foydalanuvchi kiritmalarini tekshirish
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "모든 필드를 작성해 주세요" },
        { status: 400 }
      );
    }

    if (!agreedToTerms) {
      return NextResponse.json(
        { error: "이용약관에 동의해야 합니다." },
        { status: 400 }
      );
    }

    // 2️⃣ MongoDB client olish
    const client = await clientPromise;
    const db = client.db("raska");

    const normalizedEmail = email.trim().toLowerCase();

    // 3️⃣ Email allaqachon mavjudmi?
    const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "이 이메일은 이미 등록되어 있습니다! 로그인해 주세요." },
        { status: 400 }
      );
    }

    // 4️⃣ Parolni xeshlash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Yangi user yaratish
    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      agreedToTerms: true,
      emailVerified: false,
      role: "user",
      provider: "credentials",
      isSubscribed: false,
    });

    // 6️⃣ Welcome email yuborish (xato bersa xam to‘xtamaydi)
    try {
      await sendWelcomeEmail(normalizedEmail, name.trim());
    } catch (emailError) {
      console.warn("Welcome email yuborishda xatolik:", emailError);
    }

    // 7️⃣ Javob qaytarish
    return NextResponse.json(
      {
        message: "회원가입이 성공적으로 완료되었습니다!",
        userId: result.insertedId,
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
