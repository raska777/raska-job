import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET request: Foydalanuvchining barcha e'lonlarini olish
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    // Foydalanuvchining e'lonlarini olish
    const jobs = await db
      .collection("jobs")
      .find({ userId: session.user.id })
      .toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET xatolik:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// PUT request: Foydalanuvchining e'lonini yangilash
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
    }

    const { jobId } = req.nextUrl.searchParams;
    if (!jobId) {
      return NextResponse.json({ error: "Job ID kerak" }, { status: 400 });
    }

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    // E'lonni yangilash
    const updatedJob = {
      ...body,
      userId: session.user.id,
      _id: new ObjectId(jobId),
    };

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(jobId), userId: session.user.id },
      { $set: updatedJob }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "E'lon yangilandi" }, { status: 404 });
    }

    return NextResponse.json({ message: "E’lon yangilandi ✅" }, { status: 200 });
  } catch (error) {
    console.error("PUT xatolik:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// DELETE request: Foydalanuvchining e'lonini o'chirish
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 401 });
    }

    const { jobId } = req.nextUrl.searchParams;
    if (!jobId) {
      return NextResponse.json({ error: "Job ID kerak" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    // E'lonni o'chirish
    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(jobId),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "E'lon topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ message: "E’lon o‘chirildi ✅" }, { status: 200 });
  } catch (error) {
    console.error("DELETE xatolik:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
