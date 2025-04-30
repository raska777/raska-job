
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import clientPromise from "@/lib/mongodb";
// import { authOptions } from "@/lib/auth";

// // GET: Foydalanuvchining barcha ish e’lonlarini olish
// export async function GET({ }: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user || !session.user.id) {
//       return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
//     }

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const jobs = await db
//       .collection("jobs")
//       .find({ creator: session.user.id })
//       .toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/my-jobs xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

// GET: 사용자의 모든 채용 공고 가져오기
export async function GET({ }: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "권한이 없습니다" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const jobs = await db
      .collection("jobs")
      .find({ creator: session.user.id })
      .toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET /api/my-jobs 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}