

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sendEmail from "@/lib/email";

// POST method (Add new job posting)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "로그인 먼저 해주세요!" }, { status: 401 });
    }

    const body = await req.json();
    const {
      work_name,
      work_type,
      work_days,
      work_hours,
      salary,
      salary_type,
      accepts_foreigners,
      contact,
      location,
      description,
      custom_work_hours,
    } = body;

    // Validate required fields
    if (!work_type || !work_days || !work_hours || !salary || !contact || !location || !work_name) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요!" }, { status: 400 });
    }

    // Validate phone number format
    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(contact)) {
      return NextResponse.json({ error: "올바른 전화번호 형식을 입력하세요! (예: 010-1234-5678)" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    // Create new job posting
    const newJob = {
      work_name,
      work_type,
      work_days,
      work_hours: work_hours === '직접입력' ? custom_work_hours : work_hours,
      salary: `${salary} ${salary_type}`,
      accepts_foreigners: accepts_foreigners || false,
      contact,
      location,
      description: description || '',
      creator: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      applications: 0
    };

    // Insert into database
    const result = await db.collection("jobs").insertOne(newJob);

    // Get subscribed users
    const users = await db.collection("users").find({ 
      isSubscribed: true,
      email: { $exists: true } 
    }).toArray();

    // Send email notifications
    for (const user of users) {
      const subject = `🔔 새로운 일자리 공고: ${newJob.work_type} (${newJob.location})`;
     const html = `
       <div>
                    <h2 style="color: #4CAF50;">안녕하세요 ${user.name || ''}님,</h2>

       <p>플랫폼에 새로운 일자리 공고가 게시되었습니다:</p>
                   <p><b>ish nomi:</b> ${newJob.work_name}</p>

        <p><b>직종:</b> ${newJob.work_type}</p>
       <p><b>위치:</b> ${newJob.location}</p>
          <p><b>비자 유형:</b> ${newJob.accepts_foreigners}</p>
         <p>자세한 내용: <a href="https://raska-job.vercel.app">raska-job.vercel.app</a></p>
         <p>감사합니다,<br/>라스카 플랫폼</p>
        </div>
       `;

      try {
        await sendEmail(user.email, subject, html);
      } catch (emailErr) {
        console.error(`이메일 전송 오류: ${user.email}`, emailErr);
      }
    }

    return NextResponse.json(
      { 
        message: "일자리 공고가 성공적으로 등록되었습니다 ✅",
        insertedId: result.insertedId,
        accepts_foreigners: newJob.accepts_foreigners
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/post 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다. 다시 시도해주세요." }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const location = searchParams.get('location');
    const workType = searchParams.get('work_type');
    const acceptsForeigners = searchParams.get('accepts_foreigners');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db("raska");

    // Build query filters
    const query: any = { isActive: true };

    if (location) query.location = location;
    if (workType) query.work_type = workType;
    if (acceptsForeigners) query.accepts_foreigners = acceptsForeigners === 'true';

    // 🔍 Qidiruv: work_name yoki work_type ichida bo‘lishi kerak
    if (search) {
      const regex = new RegExp(search, 'i'); // ignore case
      query.$or = [
        { work_name: { $regex: regex } },
        { work_type: { $regex: regex } }
      ];
    }

    const jobs = await db
      .collection("jobs")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalJobs = await db.collection("jobs").countDocuments(query);

    return NextResponse.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs
      }
    }, { status: 200 });
  } catch (error) {
    console.error("GET /api/post 오류:", error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류 발생!" }, { status: 500 });
  }
}
