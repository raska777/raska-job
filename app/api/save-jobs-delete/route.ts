// app/api/save-jobs-delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
    }

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ error: "Job ID yo'q" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("saved_jobs").deleteOne({
      userId: session.user.id,
      jobId: jobId
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Saqlangan ish topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Ish saqlanganlardan olib tashlandi!",
      saved: false 
    }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/delete-saved-jobs xatolik:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
