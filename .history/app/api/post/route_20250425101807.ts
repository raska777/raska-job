

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import sendEmail from "@/lib/email";

// // POST metod (yangi ish e'lonini qo'shish)
// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user || !session.user.id) {
//       return NextResponse.json({ error: "Avval login qiling!" }, { status: 401 });
//     }

//     const body = await req.json();
//     const {
//       work_type,
//       work_days,
//       work_hours,
//       salary,
//       language,
//       visa_type,
//       contact,
//       location,
//       posted_date,
//     } = body;

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Yangi ish e'lonini bazaga saqlash
//     const newJob = {
//       work_type,
//       work_days,
//       work_hours,
//       salary,
//       language,
//       visa_type,
//       contact,
//       location,
//       posted_date,
//       creator: session.user.id,
//       createdAt: new Date(),
//     };

//     const result = await db.collection("jobs").insertOne(newJob);

//     // Foydalanuvchilarni "isSubscribed: true" statusiga qarab olish
//     const users = await db.collection("users").find({ isSubscribed: true }).toArray();

//     // Har bir foydalanuvchiga email yuborish
//     for (const user of users) {
//       const subject = `🔔 Yangi ish e’loni: ${newJob.work_type}`;
//       const html = `
//         <div>
//           <h2>Assalomu alaykum ${user.name || ''},</h2>
//           <p>Platformada yangi ish e’loni joylandi:</p>
//           <p><b>Ish turi:</b> ${newJob.work_type}</p>
//           <p><b>Joylashuv:</b> ${newJob.location}</p>
//           <p><b>Viza turi:</b> ${newJob.visa_type}</p>
//           <p>Batafsil: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
//           <p>Hurmat bilan,<br/>Raska Platformasi</p>
//         </div>
//       `;

//       // Email yuborish
//       try {
//         await sendEmail(user.email, subject, html);
//       } catch (emailErr) {
//         console.error(`Email yuborishda xato: ${user.email}`, emailErr);
//         // Davom etadi boshqa foydalanuvchilarga yuborish
//       }
//     }

//     return NextResponse.json(
//       { message: "Ish e’loni saqlandi ✅ va barcha obuna bo'lgan foydalanuvchilarga email yuborildi", insertedId: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// // GET metod (barcha e'lonlarni olish)
// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const jobs = await db
//       .collection("jobs")
//       .find({})
//       .sort({ createdAt: -1 })
//       .toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/post xatolik:", error);
//     return NextResponse.json({ error: "Ma'lumotlarni olishda xatolik!" }, { status: 500 });
//   }
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";

// POST metod (새로운 일자리 게시물 추가)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "로그인 먼저 해주세요!" }, { status: 401 });
    }

    const body = await req.json();
    const {
      work_type,
      work_days,
      work_hours,
      salary,
      language,
      visa_type,
      contact,
      location,
      posted_date,
    } = body;

    const client = await clientPromise;
    const db = client.db("raska");

    // 새로운 일자리 게시물을 데이터베이스에 저장
    const newJob = {
      work_type,
      work_days,
      work_hours,
      salary,
      language,
      visa_type,
      contact,
      location,
      posted_date,
      creator: session.user.id,
      createdAt: new Date(),
    };

    const result = await db.collection("jobs").insertOne(newJob);

    // "isSubscribed: true" 상태인 사용자 가져오기
    const users = await db.collection("users").find({ isSubscribed: true }).toArray();

    // 각 사용자에게 이메일 전송
    for (const user of users) {
      const subject = `🔔 새로운 일자리 공고: ${newJob.work_type}`;
      const html = `
        <div>
          <h2>안녕하세요 ${user.name || ''}님,</h2>
          <p>플랫폼에 새로운 일자리 공고가 게시되었습니다:</p>
          <p><b>직종:</b> ${newJob.work_type}</p>
          <p><b>위치:</b> ${newJob.location}</p>
          <p><b>비자 유형:</b> ${newJob.visa_type}</p>
          <p>자세한 내용: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
          <p>감사합니다,<br/>라스카 플랫폼</p>
        </div>
      `;

      // 이메일 전송
      try {
        await sendEmail(user.email, subject, html);
      } catch (emailErr) {
        console.error(`이메일 전송 오류: ${user.email}`, emailErr);
        // 다른 사용자에게 계속 전송
      }
    }

    return NextResponse.json(
      { message: "일자리 공고가 저장되었습니다 ✅ 그리고 모든 구독 사용자에게 이메일이 전송되었습니다", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/post 오류:", error);
    return NextResponse.json({ error: "서버 오류!" }, { status: 500 });
  }
}

// GET metod (모든 게시물 가져오기)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("raska");

    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET /api/post 오류:", error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류 발생!" }, { status: 500 });
  }
}
