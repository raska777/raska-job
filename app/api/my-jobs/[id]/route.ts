import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper function to sanitize update data (remove _id)

// PUT request: Update job listing
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const body = await req.json();

    // Faqat ruxsat berilgan fieldlarni yangilaymiz:
    const { work_name, work_type, location, salary, description } = body;
    const updateFields: Record<string, any> = {};
    if (work_name) updateFields.work_name = work_name;
    if (work_type) updateFields.work_type = work_type;
    if (location) updateFields.location = location;
    if (salary) updateFields.salary = salary;
    if (description) updateFields.description = description;

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id), creator: session.user.id }, // 👈 faqat o‘ziga tegishli job
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Job not found or no permission" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing job ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(id),
      creator: session.user.id,
    });

    return result.deletedCount === 1
      ? NextResponse.json(
          { success: true, message: "Job deleted successfully" },
          { status: 200 }
        )
      : NextResponse.json(
          { success: false, error: "Job not found" },
          { status: 404 }
        );
  } catch (error: unknown) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
