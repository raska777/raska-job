
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";
import crypto from "crypto";

const rawToken = crypto.randomBytes(32).toString("hex");
const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
// Rate limit function (same as before)
const limits = new Map<string, { count: number; expiresAt: number }>();

async function rateLimit(ip: string | null) {
  if (!ip) {
    return { isRateLimited: false };
  }

  const limit = 5;
  const window = 60 * 1000;

  const now = Date.now();
  const entry = limits.get(ip);

  if (entry) {
    if (now < entry.expiresAt) {
      if (entry.count >= limit) {
        return { isRateLimited: true };
      }
      limits.set(ip, { ...entry, count: entry.count + 1 });
    } else {
      limits.delete(ip);
      limits.set(ip, { count: 1, expiresAt: now + window });
    }
  } else {
    limits.set(ip, { count: 1, expiresAt: now + window });
  }

  return { isRateLimited: false };
}

export async function POST(req: Request) {
  try {
    // Rate limit check
    const ip = req.headers.get('x-forwarded-for');
    const { isRateLimited } = await rateLimit(ip);
    if (isRateLimited) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
    }

    const { email } = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    // Check user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      // Security: same response whether user exists or not
      return NextResponse.json({ 
        message: "이 이메일이 등록되어 있다면, 비밀번호 재설정 링크가 발송되었습니다." 
      });
    }
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 soat

    // Clear previous tokens
    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken: hashedToken, resetTokenExpires: expires } }
    );

    // Create new token (valid for 1 hour)
    const token = crypto.randomBytes(32).toString("hex");

    // Save token to database
    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpires: expires } }
    );

    // Password reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${encodeURIComponent(token)}`;

    // Send email (only to registered users)
    await sendEmail(
      email,
      "🔐 비밀번호 재설정 요청",
      `비밀번호를 재설정하려면 아래 링크를 클릭하세요:\n\n${resetUrl}\n\n이 링크는 1시간 후에 만료됩니다.\n\n만약 이 요청을 하지 않으셨다면, 이 이메일을 무시해 주세요.`
    );

    return NextResponse.json({ 
      message: "이 이메일이 등록되어 있다면, 비밀번호 재설정 링크가 발송되었습니다." 
    });
  } catch (error) {
    console.error("오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}