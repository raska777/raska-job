
//app/api/user/subscription/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

// GET - obuna holatini olish
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ isSubscribed: false });

  const client = await clientPromise;
  const db = client.db("raska");
  const user = await db.collection("users").findOne({ email: session.user.email });

  return NextResponse.json({ isSubscribed: user?.isSubscribed ?? false });
}

// PATCH - obunani yoqish/o‘chirish
export async function PATCH() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db("raska");

  const user = await db.collection("users").findOne({ email: session.user.email });
  const newStatus = !(user?.isSubscribed ?? false);

  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { isSubscribed: newStatus } },
    { upsert: true }
  );

  return NextResponse.json({ isSubscribed: newStatus });
}
