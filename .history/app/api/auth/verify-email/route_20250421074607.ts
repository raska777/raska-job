import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    // Token yaratish
    const verificationToken = uuidv4();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 soat

    await db.collection("users").updateOne(
      { email: session.user.email },
      { 
        $set: { 
          verificationToken,
          verificationExpires
        } 
      }
    );

    // Email jo'natish
    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(session.user.email, verificationLink);

    return Response.json({ success: true });
  } catch (error) {
    console.error("POST /api/auth/verify-email error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}