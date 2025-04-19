// // app/api/post/email/route.ts

// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query")?.toLowerCase() || "";
//     const city = searchParams.get("city")?.toLowerCase() || "";

//     const client = await clientPromise;
//     const db = client.db("raska");

//     let jobsQuery: any = {};

//     const orConditions = [];

//     if (query) {
//       orConditions.push(
//         { work_type: { $regex: query, $options: "i" } },
//         { location: { $regex: query, $options: "i" } },
//         { language: { $regex: query, $options: "i" } },
//         { visa_type: { $regex: query, $options: "i" } }
//       );
//     }

//     if (orConditions.length > 0) {
//       jobsQuery.$or = orConditions;
//     }
    
//     if (city) {
//       jobsQuery.location = { $regex: city, $options: "i" };
//     }

//     const jobs = await db
//       .collection("jobs")
//       .find(jobsQuery)
//       .sort({ createdAt: -1 })
//       .toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   const { to, subject, text } = await request.json();

//   try {
//     // Email yuborish uchun `sendEmail` funksiyasini chaqirish
//     await sendEmail(to, subject, text);
//     return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
//   }
// }

//-------

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import emailService from "@/lib/email"; // Yangi email servis importi

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const city = searchParams.get("city")?.toLowerCase() || "";

    const client = await clientPromise;
    const db = client.db("raska");

    let jobsQuery: any = {};

    const orConditions = [];

    if (query) {
      orConditions.push(
        { work_type: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } },
        { visa_type: { $regex: query, $options: "i" } }
      );
    }

    if (orConditions.length > 0) {
      jobsQuery.$or = orConditions;
    }
    
    if (city) {
      jobsQuery.location = { $regex: city, $options: "i" };
    }

    const jobs = await db
      .collection("jobs")
      .find(jobsQuery)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET /api/post xatolik:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case 'welcome':
        // Xush kelibsiz emaili uchun
        const { email, name } = data;
        await emailService.sendWelcomeEmail(email, name);
        return NextResponse.json(
          { message: 'Xush kelibsiz emaili yuborildi!' }, 
          { status: 200 }
        );

      case 'notification':
        // Yangi post bildirishnomasi uchun
        const { postId, postTitle } = data;
        await emailService.sendNewPostNotification({ 
          _id: postId, 
          title: postTitle 
        });
        return NextResponse.json(
          { message: 'Bildirishnomalar yuborildi!' }, 
          { status: 200 }
        );

      case 'custom':
        // Oddiy email yuborish uchun
        const { to, subject, content } = data;
        await emailService.sendEmail(to, subject, content);
        return NextResponse.json(
          { message: 'Email muvaffaqiyatli yuborildi!' }, 
          { status: 200 }
        );

      default:
        return NextResponse.json(
          { error: 'Noto\'g\'ri so\'rov turi' }, 
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('POST /api/post xatolik:', error);
    return NextResponse.json(
      { error: 'Server xatosi', details: error instanceof Error ? error.message : 'Noma\'lum xato' }, 
      { status: 500 }
    );
  }
}