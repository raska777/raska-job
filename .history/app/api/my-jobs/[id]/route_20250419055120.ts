import { NextResponse } from "next/server";

// PUT request: E’lonni yangilash
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // params id ni to'g'ri olish

    const body = await req.json();  // so'rovdan JSON ma'lumotlarini olish

    const client = await clientPromise;
    const db = client.db("raska");

    // _id maydonini yangilashni oldini olish
    const { _id, ...updateData } = body;  // _id'ni olib tashlash

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },  // ObjectId formatiga o'zgartirish
      { $set: updateData }  // faqat boshqa maydonlarni yangilash
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Yangilashda xatolik yuz berdi." }, { status: 400 });
    }

    return NextResponse.json({ message: "E’lon yangilandi ✅" }, { status: 200 });
  } catch (error) {
    console.error("Error during PUT:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}
