// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user?.role !== "admin") {
//     return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Statistikalarni bir vaqtning o'zida olish
//     const [totalUsers, subscribedUsers, totalJobs, todayJobs] = await Promise.all([
//       db.collection("users").countDocuments(),
//       db.collection("users").countDocuments({ isSubscribed: true }),
//       db.collection("jobs").countDocuments(),
//       db.collection("jobs").countDocuments({
//         createdAt: {
//           $gte: new Date(new Date().setHours(0, 0, 0, 0)),
//           $lt: new Date(new Date().setHours(23, 59, 59, 999))
//         }
//       })
//     ]);

//     return NextResponse.json({
//       totalUsers,
//       subscribedUsers,
//       totalJobs,
//       todayJobs
//     });

//   } catch (err) {
//     console.error("Statistika yuklanmadi:", err);
//     return NextResponse.json(
//       { error: "Server xatosi", details: err instanceof Error ? err.message : "Noma'lum xato" }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    const [
      totalUsers,
      subscribedUsers,
      totalJobs,
      todayJobs,
      activeJobs,
      newUsersToday,
      avgSalaryResult
    ] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("users").countDocuments({ isSubscribed: true }),
      db.collection("jobs").countDocuments(),
      db.collection("jobs").countDocuments({ createdAt: { $gte: todayStart, $lt: todayEnd }}),
      db.collection("jobs").countDocuments({ status: "active" }),
      db.collection("users").countDocuments({ createdAt: { $gte: todayStart }}),
      db.collection("jobs").aggregate([
        { $match: { salary: { $exists: true, $ne: null }}},
        { $group: { _id: null, avg: { $avg: "$salary" }}}
      ]).toArray()
    ]);

    const avgSalary = avgSalaryResult[0]?.avg || 0;

    return NextResponse.json({
      totalUsers,
      subscribedUsers,
      totalJobs,
      todayJobs,
      activeJobs,
      newUsersToday,
      avgSalary,
      lastUpdated: new Date()
    });

  } catch (err) {
    console.error("Statistika yuklanmadi:", err);
    return NextResponse.json(
      { 
        error: "Server xatosi", 
        details: err instanceof Error ? err.message : "Noma'lum xato",
        timestamp: new Date()
      }, 
      { status: 500 }
    );
  }
}