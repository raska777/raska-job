import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("jobId");
    if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });
  
    try {
      const client = await clientPromise;
      const db = client.db("raska");
  
      // 1. Target jobni topish
      const targetJob = await db.collection("jobs").findOne({ 
        _id: new ObjectId(jobId) 
      });
      if (!targetJob) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  
      // 2. Sahifani hisoblash
      const count = await db.collection("jobs").countDocuments({
        $or: [
          { createdAt: { $gt: targetJob.createdAt } },
          { 
            createdAt: targetJob.createdAt,
            _id: { $gt: new ObjectId(jobId) }
          }
        ]
      });
  
      const pageSize = 18;
      const page = Math.floor(count / pageSize) + 1;
  
      return NextResponse.json({ page });
    } catch (err) {
      console.error("Find-page API error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }