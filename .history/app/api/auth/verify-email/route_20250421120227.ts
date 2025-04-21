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

// app/api/verify-email/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get('token');

//   if (!token) {
//     return NextResponse.json({ error: 'Token yoq' }, { status: 400 });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db('raska');

//     const user = await db.collection('users').findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: new Date() },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'Yaroqsiz token' }, { status: 400 });
//     }

//     await db.collection('users').updateOne(
//       { _id: user._id },
//       {
//         $set: { emailVerified: new Date() },
//         $unset: { verificationToken: '', verificationExpires: '' },
//       }
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Server xatosi' }, { status: 500 });
//   }
// }

//-----
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token yoq' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('raska');

    const user = await db.collection('users').findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Yaroqsiz token' }, { status: 400 });
    }

    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { emailVerified: new Date() },
        $unset: { verificationToken: '', verificationExpires: '' },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Xatoni log qilish
    console.error('Verification error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: 'Server xatosi',
      details: error instanceof Error ? error.message : 'Noma\'lum xato'
    }, { status: 500 });
  }
}