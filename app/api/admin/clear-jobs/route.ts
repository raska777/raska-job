// app/api/admin/clear-jobs/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("jobs").deleteMany({});
    return NextResponse.json({ message: `${result.deletedCount} ta ish eʼloni o‘chirildi.` });
  } catch (err) {
    console.error("O'chirishda xatolik:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
