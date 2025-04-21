// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import { v4 as uuidv4 } from 'uuid';
// import { sendVerificationEmail } from "@/lib/email";

// export async function POST() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Token yaratish
//     const verificationToken = uuidv4();
//     const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 soat

//     await db.collection("users").updateOne(
//       { email: session.user.email },
//       { 
//         $set: { 
//           verificationToken,
//           verificationExpires
//         } 
//       }
//     );

//     // Email jo'natish
//     const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
//     await sendVerificationEmail(session.user.email, verificationLink);

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("POST /api/auth/verify-email error:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { WithId, Document } from 'mongodb';

interface User extends WithId<Document> {
  verificationToken?: string;
  verificationExpires?: Date;
  emailVerified?: boolean;
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token talab qilinadi' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection<User>("users").findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Yaroqsiz yoki muddati tugagan token' },
        { status: 400 }
      );
    }

    await db.collection<User>("users").updateOne(
      { _id: user._id },
      {
        $set: { 
          emailVerified: true,
          updatedAt: new Date() 
        },
        $unset: { 
          verificationToken: "",
          verificationExpires: "" 
        },
      }
    );

    return NextResponse.json(
      { success: true, message: 'Email muvaffaqiyatli tasdiqlandi' }
    );
  } catch (error) {
    console.error('Email tasdiqlash xatosi:', error);
    return NextResponse.json(
      { success: false, message: 'Server xatosi' },
      { status: 500 }
    );
  }
}