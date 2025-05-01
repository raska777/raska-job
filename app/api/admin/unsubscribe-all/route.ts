import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("users").updateMany(
      { isSubscribed: true },
      { $set: { isSubscribed: false } }
    );

    return NextResponse.json({
      message: `${result.modifiedCount} ta foydalanuvchi unsubscribed qilindi.`,
    });
  } catch (err) {
    console.error("Unsubscribe xatolik:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
