// app/api/saved-jobs/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";


export async function GET() {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
      }
  
      const client = await clientPromise;
      const db = client.db("raska");
  
      // Foydalanuvchining saqlangan ishlarini olish
      const savedJobs = await db
        .collection("saved_jobs")
        .find({ userId: session.user.id })
        .toArray();
  
      // Saqlangan ishlar bilan birga yulduzcha holatini (saved) ham olamiz
      const jobList = savedJobs.map(job => ({
        jobId: job.jobId,
        saved: job.saved, // saved holatini olish
        jobData: job.jobData,
      }));
  
      return NextResponse.json(jobList, { status: 200 });
    } catch (error) {
      console.error("GET /api/saved-jobs xatolik:", error);
      return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
    }
  }
  