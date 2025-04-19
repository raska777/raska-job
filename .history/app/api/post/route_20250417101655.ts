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





// //-------------------------------
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


///-------------------

//-------------------------------
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
//           // { jobname: { $regex: query, $options: 'i' } }, // jobname bo'yicha qidirish
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
// import sendEmail from "@/lib/email";  // Email yuborish uchun yordamchi funksiyani import qilamiz

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
//       creator: session.user.id,
//       createdAt: new Date(),
//     };

//     const result = await db.collection("jobs").insertOne(newJob);

//     // Foydalanuvchilarni "isSubscribed: true" statusiga qarab olish
//     const users = await db.collection("users").find({ isSubscribed: true }).toArray();

//     // Har bir foydalanuvchiga email yuborish
//     for (const user of users) {
//       await sendEmail(
//         user.email,
//         `Assalomu alaykum ${user.name || ''},

// // Platformada yangi ish e’loni joylandi:

// // 📌 Ish turi: ${job.work_type}
// // 📍 Joylashuv: ${job.location}
// // 🕒 Ish vaqti: ${job.work_time}

// // Batafsil: https://raska-job.vercel.app

// // Hurmat bilan,
// // Raska Platformasi`
//       );
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



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";  // Email yuborish uchun yordamchi funksiyani import qilamiz

// POST metod (e'lon qo'shish)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Avval login qiling!" }, { status: 401 });
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
    } = body;

    const client = await clientPromise;
    const db = client.db("raska");

    // Yangi ish e'lonini bazaga saqlash
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

    const result = await db.collection("jobs").insertOne(newJob);

    // Foydalanuvchilarni "isSubscribed: true" statusiga qarab olish
    const users = await db.collection("users").find({ isSubscribed: true }).toArray();

    // Har bir foydalanuvchiga email yuborish
    for (const user of users) {
      const subject = `🔔 Yangi ish e’loni: ${newJob.work_type}`;
      const html = `
        <div>
          <h2>Assalomu alaykum ${user.name || ''},</h2>
          <p>Platformada yangi ish e’loni joylandi:</p>
          <p><b>Ish turi:</b> ${newJob.work_type}</p>
          <p><b>Joylashuv:</b> ${newJob.location}</p>
          <p><b>Ish vaqti:</b> ${newJob.work_days}, ${newJob.work_hours}</p>
          <p><b>Maosh:</b> ${newJob.salary}</p>
          <p><b>Til:</b> ${newJob.language}</p>
          <p><b>Viza turi:</b> ${newJob.visa_type}</p>
          <p><b>Kontakt:</b> ${newJob.contact}</p>
          <p>Batafsil: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
          <p>Hurmat bilan,<br/>Raska Platformasi</p>
        </div>
      `;

      // Email yuborish
      await sendEmail(user.email, subject, html);
    }

    return NextResponse.json(
      { message: "Ish e’loni saqlandi ✅ va barcha obuna bo'lgan foydalanuvchilarga email yuborildi", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/post xatolik:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}
// GET metod (barcha e'lonlarni olish)
export async function GET(req: NextRequest) {
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
    console.error("GET /api/post xatolik:", error);
    return NextResponse.json({ error: "Ma'lumotlarni olishda xatolik!" }, { status: 500 });
  }
}
