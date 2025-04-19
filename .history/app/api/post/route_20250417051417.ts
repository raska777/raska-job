// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

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
//     } = body;

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const newJob = {
//       work_type,
//       work_days,
//       work_hours,
//       salary,
//       language,
//       visa_type,
//       contact,
//       location,
//       creator: session.user.id,
//       createdAt: new Date(),
//     };

//     const result = await db.collection("jobs").insertOne(newJob);

//     return NextResponse.json(
//       { message: "Ish e’loni saqlandi ✅", insertedId: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // 🔥 barcha e'lonlarni olish
//     const jobs = await db.collection("jobs").find({}).sort({ createdAt: -1 }).toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// // POST metod (e'lon qo'shish)
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
//     } = body;

//     const client = await clientPromise;
//     const db = client.db("raska");

//     const newJob = {
//       work_type,
//       work_days,
//       work_hours,
//       salary,
//       language,
//       visa_type,
//       contact,
//       location,
//       creator: session.user.id,
//       createdAt: new Date(),
//     };

//     const result = await db.collection("jobs").insertOne(newJob);

//     return NextResponse.json(
//       { message: "Ish e’loni saqlandi ✅", insertedId: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// // GET metod (e'lonlarni olish)
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url); // URL parametrlarini olish
//     const query = searchParams.get('query')?.toLowerCase() || ''; // qidiruv so'zi
//     const city = searchParams.get('city')?.toLowerCase() || '';   // shahar

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // 🔥 barcha e'lonlarni olish va parametrlar bo'yicha filtr qo'yish
//     let jobsQuery = {};

//     // Qidiruv parametrlari bo'yicha filtr
//     if (query) {
//       jobsQuery = {
//         ...jobsQuery,
//         $or: [
//           { jobname: { $regex: query, $options: 'i' } }, // jobname bo'yicha qidirish
//           { location: { $regex: query, $options: 'i' } }, // location bo'yicha qidirish
//           { work_type: { $regex: query, $options: 'i' } }, // work_type bo'yicha qidirish
//         ],
//       };
//     }

//     // Shahar bo'yicha filtr
//     if (city) {
//       jobsQuery = {
//         ...jobsQuery,
//         location: { $regex: city, $options: 'i' }, // location bo'yicha shaharni tekshirish
//       };
//     }

//     // E'lonlarni so'rovga asoslanib olish
//     const jobs = await db.collection("jobs").find(jobsQuery).sort({ createdAt: -1 }).toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import { sendEmail } from "@/lib/email";  // Email yuborish funksiyasi

// // POST metod (e'lon qo'shish)
// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     // Foydalanuvchi tizimga kirganligini tekshirish
//     if (!session || !session.user || !session.user.id) {
//       return NextResponse.json({ error: "Avval login qiling!" }, { status: 401 });
//     }

//     // E'lon ma'lumotlarini olish
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
//     } = body;

//     // MongoDB bilan bog'lanish
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Yangi ish e'loni qo'shish
//     const newJob = {
//       work_type,
//       work_days,
//       work_hours,
//       salary,
//       language,
//       visa_type,
//       contact,
//       location,
//       creator: session.user.id,
//       createdAt: new Date(),
//     };

//     // E'lonni bazaga saqlash
//     const result = await db.collection("jobs").insertOne(newJob);

//     // Barcha obuna bo'lgan foydalanuvchilarga email yuborish
//     const users = await db.collection("users").find({ isSubscribed: true }).toArray();
//     const emailList = users.map(user => user.email);

//     for (const subscriberEmail of emailList) {
//       await sendEmail(
//         subscriberEmail,
//         "Yangi ish e'loningizni ko'ring!",
//         `Yangi e'lon: ${work_type}\n\n${location}\n\nSizni qiziqtirishi mumkin!`
//       );
//     }

//     // Javob qaytarish
//     return NextResponse.json(
//       { message: "Ish e’loni saqlandi ✅", insertedId: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from '@/lib/email';

// POST metod (e'lon qo'shish)  Type '{ sendEmail: (to: string, subject: string, content: string) => Promise<boolean>; sendWelcomeEmail: (email: string, name: string) => Promise<boolean>; sendNewPostNotification: (post: { ...; }) => Promise<...>; }' has no call signatures.ts(2349)

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Foydalanuvchi tizimga kirganligini tekshirish
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Avval login qiling!" }, { status: 401 });
    }

    // E'lon ma'lumotlarini olish
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
    } = body;

    // MongoDB bilan bog'lanish
    const client = await clientPromise;
    const db = client.db("raska");

    // Yangi ish e'loni qo'shish
    const newJob = {
      work_type,
      work_days,
      work_hours,
      salary,
      language,
      visa_type,
      contact,
      location,
      creator: session.user.id,
      createdAt: new Date(),
    };

    // E'lonni bazaga saqlash
    const result = await db.collection("jobs").insertOne(newJob);

    // Barcha obuna bo'lgan foydalanuvchilarga email yuborish
    const users = await db.collection("users").find({ isSubscribed: true }).toArray();
    const emailList = users.map(user => user.email);

    for (const subscriberEmail of emailList) {
      await sendEmail(
        subscriberEmail,
        "Yangi ish e'loningizni ko'ring!",
        "Yangi e'lon: ${work_type}\n\n${location}\n\nSizni qiziqtirishi mumkin!"
      );
    }

    // Javob qaytarish
    return NextResponse.json(
      { message: "Ish e’loni saqlandi ✅", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/post xatolik:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}

// GET metod (e'lonlarni olish)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); // URL parametrlarini olish
    const query = searchParams.get('query')?.toLowerCase() || ''; // qidiruv so'zi
    const city = searchParams.get('city')?.toLowerCase() || '';   // shahar

    // MongoDB bilan bog'lanish
    const client = await clientPromise;
    const db = client.db("raska");

    // 🔥 barcha e'lonlarni olish va parametrlar bo'yicha filtr qo'yish
    let jobsQuery = {};

    // Qidiruv parametrlari bo'yicha filtr
    if (query) {
      jobsQuery = {
        ...jobsQuery,
        $or: [
          { jobname: { $regex: query, $options: 'i' } }, // jobname bo'yicha qidirish
          { location: { $regex: query, $options: 'i' } }, // location bo'yicha qidirish
          { work_type: { $regex: query, $options: 'i' } }, // work_type bo'yicha qidirish
        ],
      };
    }

    // Shahar bo'yicha filtr
    if (city) {
      jobsQuery = {
        ...jobsQuery,
        location: { $regex: city, $options: 'i' }, // location bo'yicha shaharni tekshirish
      };
    }

    // E'lonlarni so'rovga asoslanib olish
    const jobs = await db.collection("jobs").find(jobsQuery).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET /api/post xatolik:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}