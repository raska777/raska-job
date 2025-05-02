// app/api/admin/recent-jobs/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");
    
    const jobs = await db.collection("jobs")
      .find({}, {
        projection: { 
          work_name: 1, 
          work_type: 1, 
          location: 1, 
          salary: 1, 
          createdAt: 1,
          accepts_foreigners: 1,
          _id: 1
        }
      })
      .sort({ createdAt: -1 })
    //   .limit(5)
      .toArray();

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Recent jobs fetch error:", error);
    return NextResponse.json(
      { 
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}