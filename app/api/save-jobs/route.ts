// // app/api/save-jobs/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import clientPromise from "@/lib/mongodb";
// import { authOptions } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     // Agar session yoki userId topilmasa, ruxsat berilmaydi
//     if (!session || !session.user || !session.user.id) {
//       return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
//     }

//     // Request tanasidan jobId va jobData ni olish
//     const { jobId, jobData } = await req.json();

//     if (!jobId || !jobData) {
//       return NextResponse.json({ error: "Job ma'lumotlari yo'q" }, { status: 400 });
//     }

//     // MongoDB'ga ulanish
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // savedJobs collection'iga qo‘shish
//     const savedJob = {
//       userId: session.user.id,
//       jobId: jobId,
//       jobData: jobData,
//       savedAt: new Date(),
//     };

//     // savedJobs collection'iga yangi ishni qo‘shish
//     await db.collection("saved_jobs").insertOne(savedJob);

//     return NextResponse.json({ message: "Ish muvaffaqiyatli saqlandi!" }, { status: 200 });
//   } catch (error) {
//     console.error("POST /api/save-job xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }

// app/api/save-jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // 세션 또는 사용자 ID가 없으면 접근 불가
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "접근이 허용되지 않았습니다." }, { status: 401 });
    }

    // 요청에서 jobId와 jobData 받기
    const { jobId, jobData } = await req.json();

    if (!jobId || !jobData) {
      return NextResponse.json({ error: "일자리 정보가 없습니다." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const savedJob = {
      userId: session.user.id,
      jobId: jobId,
      jobData: jobData,
      savedAt: new Date(),
    };

    await db.collection("saved_jobs").insertOne(savedJob);

    return NextResponse.json({ message: "⭐️ 즐겨찾기에 저장되었습니다!" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/save-job 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
