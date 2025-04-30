
// import { hash } from 'bcryptjs';
// import { NextResponse, NextRequest } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req: NextRequest) {
//   try {
//     const { token, newPassword } = await req.json();

//     if (!token || !newPassword) {
//       return NextResponse.json({ error: "Token yoki yangi parol yo'q" }, { status: 400 });
//     }

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

//     const result = await db.collection('users').updateOne(
//       { _id: user._id },
//       {
//         $set: { password: hashedPassword },
//         $unset: { resetToken: "", resetExpires: "" },
//       }
//     );

//     if (result.modifiedCount === 1) {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ error: "Parol yangilanmadi" }, { status: 500 });
//     }
//   } catch (error) {
//     console.error("Parolni tiklashda server xatosi:", error);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }

import { hash } from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "토큰 또는 새 비밀번호가 없습니다" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('raska');

    const user = await db.collection('users').findOne({ resetToken: token });

    if (!user) {
      return NextResponse.json({ error: "잘못된 토큰이거나 만료된 토큰입니다" }, { status: 400 });
    }

    if (user.resetExpires < new Date()) {
      return NextResponse.json({ error: "토큰이 만료되었습니다" }, { status: 400 });
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
      return NextResponse.json({ error: "비밀번호 업데이트에 실패했습니다" }, { status: 500 });
    }
  } catch (error) {
    console.error("비밀번호 재설정 서버 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}