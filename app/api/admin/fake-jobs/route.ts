// app/api/admin/fake-jobs/route.ts
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

    const cities = ["서울", "부산", "대구", "울산", "인천"];
    const workTypes = ["공장", "청소", "식당", "배송", "건설"];
    const contact = "010-1234-5678";

    const fakeJobs = Array.from({ length: 80 }, (_, i) => ({
      work_name: `Test Ish ${i + 1}`,
      work_type: workTypes[i % workTypes.length],
      work_days: "월~금",
      work_hours: "09:00-18:00",
      salary: `${3000000 + i * 10000} 원`,
      salary_type: "월급",
      accepts_foreigners: i % 2 === 0,
      contact,
      location: cities[i % cities.length],
      description: "Bu test uchun avtomatik yaratilgan ish e'loni.",
      creator: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      applications: 0,
    }));

    const result = await db.collection("jobs").insertMany(fakeJobs);

    return NextResponse.json({
      message: `${result.insertedCount} ta test e'lon yaratildi.`,
    });
  } catch (err) {
    console.error("Fake e'lonlarni yaratishda xato:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
