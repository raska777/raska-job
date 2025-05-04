import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    const cities = ["서울", "부산", "대구", "울산", "인천", "광주", "대전", "수원"];
    const workTypes = [
      {
        name: "공장",
        description: "공장에서의 제조 및 생산 관련 업무",
        salary: "2500000-3500000 원",
        hours: "08:00-17:00",
        days: "월~금",
        requirements: "체력이 좋으신 분 우대"
      },
      {
        name: "청소",
        description: "사무실 및 건물 청소 업무",
        salary: "시급 12000 원",
        hours: "18:00-22:00",
        days: "월~토",
        requirements: "청결에 관심이 많으신 분"
      },
      {
        name: "식당",
        description: "주방 보조 및 서빙 업무",
        salary: "2000000-2800000 원",
        hours: "10:00-21:00",
        days: "화~일",
        requirements: "음식 서비스 경험자 우대"
      },
      {
        name: "배송",
        description: "물품 배송 및 운반 업무",
        salary: "3000000-4000000 원",
        hours: "09:00-18:00",
        days: "월~금",
        requirements: "운전면허 소지자"
      },
      {
        name: "건설",
        description: "건축 현장 보조 업무",
        salary: "일당 150000 원",
        hours: "07:00-16:00",
        days: "월~토",
        requirements: "건설 경험자 우대"
      },
      {
        name: "사무보조",
        description: "문서 정리 및 행정 업무 보조",
        salary: "2200000-3000000 원",
        hours: "09:00-18:00",
        days: "월~금",
        requirements: "컴퓨터 활용 능력 필요"
      },
      {
        name: "고객서비스",
        description: "콜센터 및 고객 응대 업무",
        salary: "2400000-3200000 원",
        hours: "10:00-19:00",
        days: "월~금",
        requirements: "한국어 유창하신 분"
      },
      {
        name: "재고관리",
        description: "창고 재고 관리 및 정리",
        salary: "2300000-3100000 원",
        hours: "08:00-17:00",
        days: "월~금",
        requirements: "꼼꼼하신 분 우대"
      }
    ];

    const companyNames = [
      "한국산업", "대우건설", "삼성물산", "LG전자", "현대자동차",
      "롯데그룹", "SK텔레콤", "포스코", "KT", "CJ제일제당"
    ];

    const contactNumbers = [
      "010-1234-5678", "010-2345-6789", "010-3456-7890",
      "010-4567-8901", "010-5678-9012", "02-123-4567",
      "02-234-5678", "031-123-4567", "032-123-4567"
    ];

    const fakeJobs = Array.from({ length: 500 }, (_, i) => {
      const workType = workTypes[i % workTypes.length];
      const isHourly = workType.salary.includes("시급");
      const isDaily = workType.salary.includes("일당");

      return {
        work_name: `${companyNames[i % companyNames.length]} ${workType.name} 알바`,
        work_type: workType.name,
        work_days: workType.days,
        work_hours: workType.hours,
        salary: isHourly || isDaily ? workType.salary :
                 `${Math.floor(2500000 + Math.random() * 1000000)} 원`,
        salary_type: isHourly ? "시급" : isDaily ? "일당" : "월급",
        accepts_foreigners: i % 3 !== 0,
        contact: contactNumbers[i % contactNumbers.length],
        location: cities[i % cities.length],
        description: `${workType.description}\n\n${workType.requirements}\n\n테스트용으로 생성된 공고입니다.`,
        company: companyNames[i % companyNames.length],
        benefits: i % 2 === 0 ? "4대보험, 퇴직금" : "점심제공, 교통비지원",
        visa_sponsorship: i % 4 === 0,
        housing: i % 5 === 0 ? "기숙사 제공" : "없음",
        creator: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        views: Math.floor(Math.random() * 100),
        applications: Math.floor(Math.random() * 20)
      };
    });

    const result = await db.collection("jobs").insertMany(fakeJobs);

    // Add the generated Mongo _id to each job
    const insertedJobsWithIds = Object.values(result.insertedIds).map((id, i) => ({
      ...fakeJobs[i],
      _id: id
    }));

    return NextResponse.json({
      message: `${result.insertedCount} ta test e'lon yaratildi.`,
      jobs: insertedJobsWithIds,
      details: {
        workTypes: workTypes.map(w => w.name),
        cities,
        companies: companyNames
      }
    });

  } catch (err: unknown) {
    console.error("Fake e'lonlarni yaratishda xato:", err);

    let errorDetails = "Noma'lum xato";

    if (err instanceof Error) {
      errorDetails = err.message;
    } else if (err && typeof err === "object" && "message" in err) {
      errorDetails = String(err.message);
    } else if (typeof err === "string") {
      errorDetails = err;
    }

    return NextResponse.json(
      {
        error: "Server xatosi",
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
