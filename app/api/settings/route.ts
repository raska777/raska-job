import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function PATCH(req: NextRequest) {
  try {
    const { email, isSubscribed } = await req.json();

    const db = await connectToDB();

    await db.collection("users").updateOne(
      { email },
      { $set: { isSubscribed } }
    );

    return NextResponse.json({ message: "Subscription status updated" });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
