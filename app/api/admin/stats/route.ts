import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    // Statistikalarni bir vaqtning o'zida olish
    const [totalUsers, subscribedUsers, totalJobs, todayJobs] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("users").countDocuments({ isSubscribed: true }),
      db.collection("jobs").countDocuments(),
      db.collection("jobs").countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      })
    ]);

    return NextResponse.json({
      totalUsers,
      subscribedUsers,
      totalJobs,
      todayJobs
    });

  } catch (err) {
    console.error("Statistika yuklanmadi:", err);
    return NextResponse.json(
      { error: "Server xatosi", details: err instanceof Error ? err.message : "Noma'lum xato" }, 
      { status: 500 }
    );
  }
}