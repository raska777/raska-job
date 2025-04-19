// // // app/api/post/email/route.ts

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


// -----------------
// app/api/post/email/route.ts

// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// // 🔍 1. Qidiruv uchun GET
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

// // 📧 2. Email yuborish (individual yoki ommaviy)
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const client = await clientPromise;
//     const db = client.db("raska");

//     if (body.to && body.subject && body.text) {
//       // 🔹 Faqat 1 kishiga yuborish
//       await sendEmail(body.to, body.subject, body.text);
//       return NextResponse.json({ message: "Email yuborildi!" }, { status: 200 });
//     }

//     if (body.job) {
//       // 🔸 Obunachilarga yuborish
//       const { job } = body;

//       const subscribers = await db
//         .collection("users")
//         .find({ subscribed: true })
//         .toArray();

//       const emailPromises = subscribers.map((user) => {
//         const to = user.email;
//         const subject = `🔔 Yangi ish e'loni: ${job.work_type}`;
//         const text = `Assalomu alaykum ${user.name || ''},

// Platformada yangi ish e’loni joylandi:

// 📌 Ish turi: ${job.work_type}
// 📍 Joylashuv: ${job.location}
// 🕒 Ish vaqti: ${job.work_time}

// Batafsil: https://raska-job.vercel.app

// Raska Platformasi`;

//         return sendEmail(to, subject, text);
//       });

//       await Promise.allSettled(emailPromises);

//       return NextResponse.json({ message: "Barcha obunachilarga email yuborildi!" }, { status: 200 });
//     }

//     return NextResponse.json({ error: "Noto‘g‘ri so‘rov" }, { status: 400 });
//   } catch (error) {
//     console.error("POST /api/post/email xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

//---------------
// app/api/post/email/route.ts
// app/api/post/email/route.ts

// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function POST(request: NextRequest) {
//   try {
//     const job = await request.json();
//     console.log("📨 Yangi ish e'loni qabul qilindi:", job);

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // To‘g‘ri filter qo‘llaymiz
//     const isSubscribed = await db
//       .collection("users")
//       .find({ isSubscribed: true }) // <<< MUHIM TO‘G‘RILASH
//       .toArray();

//     console.log("👥 Obunachilar soni:", isSubscribed.length);

//     const emailPromises = isSubscribed.map((user) => {
//       const to = user.email;
//       const subject = `🔔 Yangi ish e'loni: ${job.work_type}`;
//       const text = `Assalomu alaykum ${user.name || ''},

// Platformada yangi ish e’loni joylandi:

// 📌 Ish turi: ${job.work_type}
// 📍 Joylashuv: ${job.location}
// 🕒 Ish vaqti: ${job.work_time}

// Batafsil: https://raska-job.vercel.app

// Hurmat bilan,
// Raska Platformasi`;

//       return sendEmail(to, subject, text);
//     });

//     const results = await Promise.allSettled(emailPromises);
// results.forEach((result) => {
//   if (result.status === "rejected") {
//     console.error("Xatolik yuz berdi:", result.reason);
//   }
// });


//     return NextResponse.json({ message: "Emaillar yuborildi" }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Email yuborishda xato:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }
//-------ajoyib------
// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function POST(request: NextRequest) {
//   try {
//     const job = await request.json();
//     console.log("📨 Yangi ish e'loni qabul qilindi:", job);

//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Obuna bo'lgan foydalanuvchilarni olish
//     const isSubscribed = await db
//       .collection("users")
//       .find({ isSubscribed: true }) // <<< MUHIM TO‘G‘RILASH
//       .toArray();

//     console.log("👥 Obunachilar soni:", isSubscribed.length);

//     const emailPromises = isSubscribed.map((user) => {
//       const to = user.email;
//       const subject = `🔔 Yangi ish e'loni: ${job.work_type}`;
//       const text = `Assalomu alaykum ${user.name || ''},

// Platformada yangi ish e’loni joylandi:

// 📌 Ish turi: ${job.work_type}
// 📍 Joylashuv: ${job.location}
// 🕒 Ish vaqti: ${job.work_time}

// Batafsil: https://raska-job.vercel.app

// Hurmat bilan,
// Raska Platformasi`;
// const html = `
//   <div>
//     <h2>Assalomu alaykum ${user.name || ''},</h2>
//     <p>Platformada yangi ish e’loni joylandi:</p>
//     <p><b>Ish turi:</b> ${job.work_type}</p>
//     <p><b>Joylashuv:</b> ${job.location}</p>
//     <p><b>Ish vaqti:</b> ${job.work_time}</p>
//     <p>Batafsil: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
//     <p>Hurmat bilan,<br/>Raska Platformasi</p>
//   </div>
// `;
//       return sendEmail(to, subject,  html);
//     });

//     const results = await Promise.allSettled(emailPromises);
//     results.forEach((result) => {
//       if (result.status === "rejected") {
//         console.error("Xatolik yuz berdi:", result.reason);
//       }
//     });

//     return NextResponse.json({ message: "Emaillar yuborildi" }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Email yuborishda xato:", err);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }
//---------vauuuu-------
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const job = await request.json();
    console.log("📨 Yangi ish e'loni qabul qilindi:", job);

    const client = await clientPromise;
    const db = client.db("raska");

    // Get subscribed users
    const subscribedUsers = await db
      .collection("users")
      .find({ isSubscribed: true })
      .toArray();

    console.log("👥 Obunachilar soni:", subscribedUsers.length);

    const emailPromises = subscribedUsers.map((user) => {
      const to = user.email;
      const subject = `🔔 Yangi ish e'loni: ${job.work_type}`;
      const html = `
        <div>
          <h2>Assalomu alaykum ${user.name || ''},</h2>
          <p>Platformada yangi ish e'loni joylandi:</p>
          <p><b>Ish turi:</b> ${job.work_type}</p>
          <p><b>Joylashuv:</b> ${job.location}</p>
          <p><b>Ish vaqti:</b> ${job.work_time}</p>
          <p>Batafsil: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
          <p>Hurmat bilan,<br/>Raska Platformasi</p>
        </div>
      `;
      return sendEmail(to, subject, html);
    });

    await Promise.allSettled(emailPromises);
    return NextResponse.json({ message: "Emaillar obunachilarga yuborildi" }, { status: 200 });
  } catch (err) {
    console.error("❌ Email yuborishda xato:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}