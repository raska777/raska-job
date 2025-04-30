// // app/api/saved-jobs/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import clientPromise from "@/lib/mongodb";
// import { authOptions } from "@/lib/auth";


// export async function GET() {
//     try {
//       const session = await getServerSession(authOptions);
  
//       if (!session || !session.user || !session.user.id) {
//         return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
//       }
  
//       const client = await clientPromise;
//       const db = client.db("raska");
  
//       // Foydalanuvchining saqlangan ishlarini olish
//       const savedJobs = await db
//         .collection("saved_jobs")
//         .find({ userId: session.user.id })
//         .toArray();
  
//       // Saqlangan ishlar bilan birga yulduzcha holatini (saved) ham olamiz
//       const jobList = savedJobs.map(job => ({
//         jobId: job.jobId,
//         saved: job.saved, // saved holatini olish
//         jobData: job.jobData,
//       }));
  
//       return NextResponse.json(jobList, { status: 200 });
//     } catch (error) {
//       console.error("GET /api/saved-jobs xatolik:", error);
//       return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//     }
//   }
  
// app/api/saved-jobs/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 세션 확인
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "접근이 허용되지 않았습니다." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    // 저장된 일자리 목록 가져오기
    const savedJobs = await db
      .collection("saved_jobs")
      .find({ userId: session.user.id })
      .toArray();

    // 각 일자리에 저장 상태 추가
    const jobList = savedJobs.map(job => ({
      jobId: job.jobId,
      saved: job.saved, // 저장 여부
      jobData: job.jobData,
    }));

    return NextResponse.json(jobList, { status: 200 });
  } catch (error) {
    console.error("GET /api/saved-jobs 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
