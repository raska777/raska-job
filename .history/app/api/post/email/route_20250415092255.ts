



import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url); // URL parametrlarini olish
      const query = searchParams.get('query')?.toLowerCase() || ''; // qidiruv so'zi
      const city = searchParams.get('city')?.toLowerCase() || '';   // shahar
  
      // MongoDB bilan bog'lanish
      const client = await clientPromise;
      const db = client.db("raska");
  
      // 🔥 barcha e'lonlarni olish va parametrlar bo'yicha filtr qo'yish
      let jobsQuery: any = {};
  
      // Qidiruv parametrlari bo'yicha filtr
      if (query) {
        jobsQuery.$or = [
          { work_type: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { language: { $regex: query, $options: 'i' } },
          { visa_type: { $regex: query, $options: 'i' } },
        ];
      }
  
      // Shahar bo'yicha qo‘shimcha filtr
      if (city) {
        jobsQuery.location = { $regex: city, $options: 'i' };
      }
  
      // Natijalarni olish
      const jobs = await db.collection("jobs").find(jobsQuery).sort({ createdAt: -1 }).toArray();
  
      return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
      console.error("GET /api/post xatolik:", error);
      return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
    }
  }
  