

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";

// POST metod (yangi ish e'lonini qo'shish)
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
      posted_date,
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
      posted_date,
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
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
    <h2 style="color: #333; margin-top: 0;">Assalomu alaykum ${user.name || ''},</h2>
    <p style="color: #555; line-height: 1.6;">Siz uchun ajoyib yangilik! Raska platformasida sizning qiziqishlaringizga mos keladigan yangi ish e'loni paydo bo'ldi:</p>
    <div style="background-color: #fff; padding: 15px; border-radius: 3px; margin-bottom: 15px;">
      <p style="margin-top: 0; margin-bottom: 8px;"><b style="color: #2563eb;">Ish turi:</b> ${newJob.work_type}</p>
      <p style="margin-bottom: 8px;"><b style="color: #2563eb;">Joylashuv:</b> ${newJob.location}</p>
      <p style="margin-bottom: 8px;"><b style="color: #2563eb;">Viza turi:</b> ${newJob.visa_type}</p>
    </div>
    <p style="color: #555; margin-bottom: 15px;">Batafsil ma'lumot uchun havola: <a href="https://raska-job.vercel.app" style="color: #007bff; text-decoration: none;">raska-job.vercel.app</a></p>
    <p style="color: #777; margin-bottom: 0;">Hurmat bilan,<br/>Raska Platformasi jamoasi</p>
  </div>
`;

      // Email yuborish
      try {
        await sendEmail(user.email, subject, html);
      } catch (emailErr) {
        console.error(`Email yuborishda xato: ${user.email}`, emailErr);
        // Davom etadi boshqa foydalanuvchilarga yuborish
      }
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
    console.error("GET /api/post xatolik:", error);
    return NextResponse.json({ error: "Ma'lumotlarni olishda xatolik!" }, { status: 500 });
  }
}
